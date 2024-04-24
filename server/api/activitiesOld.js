import User from '../../model/Users.js';
import Activity from '../../model/Activities.js';

export default function ( server, mongoose ) {

  // GET-route för att hämta alla aktiviteter
  server.get( "/api/activities/all", async ( req, res ) => {
    try {
      const activities = await Activity.find()
      // .populate( 'users' );
      res.status( 200 ).json( activities );
    } catch ( error ) {
      console.error( error );
      res.status( 500 ).json( { message: "Ett fel inträffade", error } );
    }
  } );

  //GET-route for fetching activities with pagination, sorting, and filtering
  server.get( "/api/activities", async ( req, res ) => {
    try {
      const page = parseInt( req.query.page ) || 1; // Current page
      const limit = parseInt( req.query.limit ) || 10; // Number of items per page
      const sortField = req.query.sortField || "_id"; // Field for sorting
      const sortOrder = req.query.sortOrder || "asc"; // Sorting order
      const searchType = req.query.searchType || ""; // Search by activity type
      const userId = req.query.userId || ""; // Filter activities by user ID
  const minCalories = parseInt( req.query.minCalories ); // Minimum number of burned calories
  const maxCalories = parseInt( req.query.maxCalories ); // Maximum number of burned calories
  const startDate = req.query.startDate ? new Date( req.query.startDate ) : null; // Start date of activity creation
  const endDate = req.query.endDate ? new Date( req.query.endDate ) : null; // End date of activity creation
  const startTimeAfter = req.query.startTimeAfter ? new Date( req.query.startTimeAfter ) : null; // Start time of activity after
  const startTimeBefore = req.query.startTimeBefore ? new Date( req.query.startTimeBefore ) : null; // Start time of activity before

      const sortOptions = {};
      sortOptions[ sortField ] = sortOrder === "asc" ? 1 : -1;

      let query = {};

      // Filter activities by user ID
      if ( userId !== "" ) {
        query.userId = userId;
      }

      // Search by activity type
      if ( searchType !== "" ) {
        query.type = { $regex: searchType, $options: "i" };
      }

  // Filter by minimum number of burned calories
  if ( !isNaN( minCalories ) ) {
    query.caloriesBurned = { $gte: minCalories };
  }

  // Filter by maximum number of burned calories
  if ( !isNaN( maxCalories ) ) {
    if ( query.caloriesBurned ) {
      query.caloriesBurned.$lte = maxCalories;
    } else {
      query.caloriesBurned = { $lte: maxCalories };
    }
  }

  // Filter by activity creation date
  if ( startDate && endDate ) {
    query.createdAt = { $gte: startDate, $lte: endDate };
  } else if ( startDate ) {
    query.createdAt = { $gte: startDate };
  } else if ( endDate ) {
    query.createdAt = { $lte: endDate };
  }

  // Filter by start time of activity
  if ( startTimeAfter && startTimeBefore ) {
    query.startTime = { $gte: startTimeAfter, $lte: startTimeBefore };
  } else if ( startTimeAfter ) {
    query.startTime = { $gte: startTimeAfter };
  } else if ( startTimeBefore ) {
    query.startTime = { $lte: startTimeBefore };
  }

      const totalActivities = await Activity.countDocuments( query );
      const totalPages = Math.ceil( totalActivities / limit );
      const skip = ( page - 1 ) * limit;

      const activities = await Activity.find( query )
        .sort( sortOptions )
        .skip( skip )
        .limit( limit );

      res.status( 200 ).json( {
        activities,
        currentPage: page,
        totalPages,
        totalActivities,
      } );
    } catch ( error ) {
      console.error( error );
      res.status( 500 ).json( { message: "An error occurred", error } );
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


  // Skapar en GET-route för att hämta aktiviteter för en användare efter type
  server.get( '/api/activities/user/:userid/:type', async ( req, res ) => {
    try {
      // Extraherar parametrar från förfrågan
      const { userId, type } = req.params;
      // Söker efter aktiviteter för den angivna användaren med angiven type
      const activities = await Activity.find( {
        userId: userId,
        type: { $regex: type, $options: "i" }
      } )
      if ( !activities || activities.length === 0 ) {
        return res.status( 404 ).json( { message: "Aktiviteter hittades inte" } );
      }
      res.json( activities );
    } catch ( error ) {
      res.status( 500 ).json( { message: "Ett fel uppstod vid sökning efter aktivitet efter typ.", error } );
    }
  } );


  server.get( '/api/activities/type/:type/duration/:duration', async ( req, res ) => {
    try {
      const { type, duration } = req.params;
      const typeRegex = new RegExp( '^' + type + '$', 'i' );

      // Konvertera varaktigheten till en siffra
      const durationValue = parseInt( duration );

      // Kontrollera att varaktigheten är ett giltigt nummer
      if ( isNaN( durationValue ) ) {
        return res.status( 400 ).json( { message: "Ogiltig varaktighet. Varaktighet måste vara ett nummer." } );
      }

      const activities = await Activity.find( { type: typeRegex, duration: durationValue } )
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
      if ( !userId ) {
        return res.status( 404 ).json( { message: "Användare hittades inte" } );
      }
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
  server.get( '/api/activities/user/:userId/createdAt/:startDate/:endDate', async ( req, res ) => {
    try {
      const userId = req.params.userId
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


