import {User} from './users.js'

export default function ( server, mongoose ) {

  // Skapar ett schema för "users", vilket definierar strukturen för varje "user"-dokument i databasen.
  const activitySchema = new mongoose.Schema( {
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'users', required: true },
    type: { type: String, required: true },
    startTime: { type: Date, required: true },
    duration: { type: Number, required: true },
    caloriesBurned: { type: Number, required: true },
    createdAt: { type: Date, default: Date.now }
  } );

  /* 
    Skapar en Mongoose-modell baserat på usersSchema.
    Detta möjliggör för oss att skapa, läsa, uppdatera och radera (CRUD) dokument i vår "users"-samling (collection).
  */
  const Activity = mongoose.model( "activities", activitySchema );


  // GET-route för att hämta alla aktiviteter
  server.get( "/api/activities", async ( req, res ) => {
    try {
      const activities = await Activity.find()
        // .populate( 'users' );
      res.status( 200 ).json( activities );
    } catch ( error ) {
      console.error( error ); 
      res.status( 500 ).json( { message: "Ett fel inträffade", error } );
    }
  } );


  // Skapar en GET-route för att hämta en specifik aktivitet med ID
  server.get( '/api/activities/:id', async ( req, res ) => {
    try {
      const activity = await Activity.findById( req.params.id ); // Hämtar aktiviteten med ID från databasen.
      if ( !book ) {
        return res.status( 404 ).json( { message: "Aktivitet hittades inte" } );
      }
      res.json( activity );
    } catch ( error ) {
      res.status( 500 ).json( { message: "Ett fel uppstod på servern vid hämtning av en aktivitet." } );
    }
  } );


  // Skapar en GET-route för att hämta aktiviteter efter användarens ID
  server.get( "/api/activities/user/:userId", async ( req, res ) => {
    try {
      const userId = req.params.userId;
      const activities = await Activity.find( { userId: userId } );
      res.status( 200 ).json( activities );
    } catch ( error ) {
      console.error( error ); 
      res.status( 500 ).json( { message: "Ett fel uppstod på servern vid hämtning av en aktivitet.", error } );
    }
  } );


  // Skapar en GET-route för att hämta aktiviteter efter användarens namn
  server.get( "/api/activities/userByUsername/:username", async ( req, res ) => {
    try {
      const username = req.params.username;
      // Hämtar användren efter namn
      const user = await User.findOne( { username: { $regex: username, $options: "i" } } );

      if ( !user ) {
        return res.status( 404 ).json( { message: "Användare hittades inte" } );
      }
      // Hämtar alla aktiviteter vars användar-ID matchar användar-ID
      const activities = await Activity.find( { userId: user._id } );
      res.status( 200 ).json( activities );
    } catch ( error ) {
      console.error( error );
      res.status( 500 ).json( { message: "Ett fel uppstod på servern vid hämtning av användarens aktiviteter.", error } );
    }
  } );


  // Skapar en GET-route för att hämta en aktiviteter efter type
  server.get( '/api/activities/type/:type', async ( req, res ) => {
    try {
      const activities = await Activity.find( { type: req.params.type } )
        .populate( 'userId' );
      if ( !activities || activities.length === 0 ) {
        return res.status( 404 ).json( { message: "Aktiviteter hittades inte" } );
      }
      res.json( activities );
    } catch ( error ) {
      res.status( 500 ).json( { message: "Ett fel uppstod vid sökning efter aktivitet efter typ.", error } );
    }
  } );


  server.get( '/api/activities/type/:type/:duration', async ( req, res ) => {
    try {
      const { type, duration } = req.params;

      // Konvertera varaktigheten till en siffra
      const durationValue = parseInt( duration );

      // Kontrollera att varaktigheten är ett giltigt nummer
      if ( isNaN( durationValue ) ) {
        return res.status( 400 ).json( { message: "Ogiltig varaktighet. Varaktighet måste vara ett nummer." } );
      }

      const activities = await Activity.find( { type: type, duration: durationValue } )
        .populate( 'userId' );

      if ( !activities || activities.length === 0 ) {
        return res.status( 404 ).json( { message: "Aktiviteter hittades inte" } );
      }

      res.json( activities );
    } catch ( error ) {
      res.status( 500 ).json( { message: "Ett fel uppstod vid sökning efter aktivitet efter typ och varaktighet.", error } );
    }
  } );


  // GET-route för sökning av aktiviteter efter datumet de startades
  server.get( '/api/activities/startTime/:date', async ( req, res ) => {
    try {
      const date = req.params.date;
      // Kontrollerar att datumet i förfrågan är i rätt format
      if ( !isValidDate( date ) ) {
        return res.status( 400 ).json( { message: "Ogiltigt datumformat. Använd formatet YYYY-MM-DD." } );
      }
      // Skapar ett Date-objekt från en datumsträng
      const searchDate = new Date( date );
      // Söker efter aktiviteter som startade ett angivet datum
      const activities = await Activity.find( { startTime: { $gte: searchDate, $lt: new Date( searchDate.getTime() + 24 * 60 * 60 * 1000 ) } } );

      res.status( 200 ).json( activities );
    } catch ( error ) {
      res.status( 500 ).json( { message: "Ett fel uppstod vid sökning efter aktiviteter.", error } );
    }
  } );
  // Funktion för att kontrollera att datumformatet är korrekt
  function isValidDate ( dateString ) {
    const regex = /^\d{4}-\d{2}-\d{2}$/;
    return regex.test( dateString );
  }


  // GET-route för sökning av aktiviteter som har blivit utförda under ett visst tidsperiod
  server.get( '/api/activities/startTime/:startDate/:endDate', async ( req, res ) => {
    try {
      // Konvertera parametrarna startDate och endDate till Date-objekt
      const startDate = new Date( req.params.startDate );
      const endDate = new Date( req.params.endDate );

      // Kontrollerar att datumen är korrekta
      if ( isNaN( startDate.getTime() ) || isNaN( endDate.getTime() ) ) {
        return res.status( 400 ).json( { message: "Fel datumformat. Använd format 'YYYY-MM-DD'." } );
      }

      // Hämtar aktiviteter skapade inom ett givet tidsintervall
      const users = await Activity.find( { startTime: { $gte: startDate, $lte: endDate } } )
        .populate( userId );

      res.status( 200 ).json( users );
    } catch ( error ) {
      res.status( 500 ).json( { message: "Ett fel uppstod på servern vid hämtning av aktiviteter efter tidsperiod.", error } );
    }
  } );


  // Get-route för att söka efter aktiviteter för en användare baserat på förbrända kalorier
  server.get( '/api/activities/user/:userId/:minCalories/:maxCalories', async ( req, res ) => {
    try {
      // Extraherar parametrar från förfrågan
      const { userId, minCalories, maxCalories } = req.params;

      // Söker efter aktiviteter för den angivna användaren med förbrända kalorier inom det angivna intervallet
      const activities = await Activity.find( {
        userId: userId,
        caloriesBurned: { $gte: minCalories, $lte: maxCalories }
      } )
      // .populate( 'userId' );  // Fyller i användardata för varje hittad aktivitet

      // Kontrollerar om aktiviteter har hittats
      if ( activities.length === 0 ) {
        return res.status( 404 ).json( { message: "Aktiviteter hittades inte" } );
      }
      // Skickar de hittade aktiviteterna som svar
      res.status( 200 ).json( activities );
    } catch ( error ) {
      // Om ett fel inträffar, skicka felmeddelande
      console.error( "Fel vid sökning efter aktiviteter:", error );
      res.status( 500 ).json( { message: "Serverfel vid sökning efter aktiviteter" } );
    }
  } );


  // Skapar en GET-route för att hämta kategorier av aktiviteter baserat på datum av skapandet.
  server.get( '/api/activities/createdAt/:startDate/:endDate', async ( req, res ) => {
    try {
      const startDate = parseInt( req.params.startTime );
      const endDate = parseInt( req.params.startTime);

      if ( isNaN( startDate ) || isNaN( endDate ) ) {
        return res.status( 400 ).json( { message: "Ogiltiga årtal. Ange giltiga siffror." } );
      }

      const activity = await Activity.find( { createdAt: { $gte: startDate, $lte: endDate } } )
        // .populate( '' );
      res.status( 200 ).json( activity );
    } catch ( error ) {
      res.status( 500 ).json( { message: "Ett fel uppstod på servern vid hämtning av aktiviteter efter datum av skapandet." } );
    }
  } );


  // Skapar en POST-route för att lägga till en ny aktivitet
  server.post( '/api/activities', async ( req, res ) => {
    try {
      const newActivity = new Activity( {
        userId: req.body.userId,
        type: req.body.type,
        startTime: req.body.startTime,
        duration: req.body.duration,
        caloriesBurned: req.body.caloriesBurned,
        createdAt: req.body.createdAt

      } ) // Skapar en ny aktivitet från request body.
      const savedActivity = await newActivity.save() // Sparar den nya aktiviteten i databasen.
      res.status( 201 ).json( savedActivity ); // Skickar tillbaka den sparade aktiviteten som JSON.
    } catch ( error ) {
      console.error( error );
      res.status( 500 ).json( { message: "Ett fel uppstod på servern vid skapande av ny aktivitet." } );
    }
  } );

  // Skapar en PUT-route för att uppdatera en aktivitet med ett specifikt ID.
  server.put( '/api/activities/:id', async ( req, res ) => {
    try {
      const updatedActivity = await Activity.findByIdAndUpdate( req.params.id, req.body )
        // .populate( {
        //   path: 'authors',
        //   select: '-books'
        // } );
      if ( !updatedActivity ) {
        return res.status( 404 ).json( { message: 'Aktivitet hittades inte' } );
      }
      res.json( updatedActivity );
    } catch ( error ) {
      console.error( error );
      res.status( 500 ).json( { message: 'Ett fel uppstod på servern vid uppdatering av bok.' } );
    }
  } );

  //Skapar en DELETE-route för att radera en aktivitet med ett specifikt ID.
  server.delete( '/api/activities/:id', async ( req, res ) => {
    try {
      const deletedActivity = await Activity.findByIdAndDelete( req.params.id );
      if ( !deletedActivity ) {
        return res.status( 404 ).json( { message: "Aktivitet hittades inte" } );
      }
      res.json( { message: "Aktiviteten har raderats!" } ); // Bekräftelse på att boken har raderats.
    } catch ( error ) {
      console.error( error );
      res.status( 500 ).json( { message: "Ett fel uppstod på servern vid radering av aktiviteten." } );
    }
  } );

}


