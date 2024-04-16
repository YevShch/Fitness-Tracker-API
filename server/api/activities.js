import User from "./users.js"

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
      console.error( error ); // Выводим ошибку в консоль
      res.status( 500 ).json( { message: "Ett fel inträffade", error } );
    }
  } );


  // Skapar en GET-route för att hämta en specifik aktivitet med ett specifikt ID
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
      // Находим пользователя по его имени
      const users = await User.find( { username: { $regex: username, $options: "i" } } )

      if ( !users) {
        return res.status( 404 ).json( { message: "Användare hittades inte" } );
      }

      // Затем находим активности для найденного пользователя
      const activities = await Activity.find( { userId: user._id } );
      res.status( 200 ).json( activities );
    } catch ( error ) {
      console.error( error );
      res.status( 500 ).json( { message: "Произошла ошибка при получении активностей пользователя.", error } );
    }
  } );

  // Skapar en GET-route för att hämta en bok med en specifik IBAN.
  server.get( '/api/activities/type/:type', async ( req, res ) => {
    try {
      const activity = await Activity.findOne( { type: req.params.type } );
      if ( !activity ) {
        return res.status( 404 ).json( { message: "Aktivitet hittades inte" } );
      }
      res.json( activity );
    } catch ( error ) {
      res.status( 500 ).json( { message: "Ett fel uppstod på servern vid sökning efter en aktivitet med type." } );
    }
  } );


  // Skapar en GET-route för att hämta kategorier av aktiviteter baserat på år.
  server.get( '/api/activities/createdAt/:startDate/:endDate', async ( req, res ) => {
    try {
      const startDate = parseInt( req.params.startTime );
      const endDate = parseInt( req.params.startTime);

      if ( isNaN( startDate ) || isNaN( endDate ) ) {
        return res.status( 400 ).json( { message: "Ogiltiga årtal. Ange giltiga siffror." } );
      }

      const activity = await Activity.find( { startTime: { $gte: startDate, $lte: endDate } } )
        // .populate( '' );
      res.status( 200 ).json( activity );
    } catch ( error ) {
      res.status( 500 ).json( { message: "Ett fel uppstod på servern vid hämtning av aktiviteter efter datum av skapandet." } );
    }
  } );

  // // GET-route för att hämta böcker efter författarens efternamn
  // server.get( '/api/books/lastname/:lastname', async ( req, res ) => {
  //   try {
  //     const lastname = req.params.lastname;
  //     const booksByAuthorLastname = await Book.find( { 'authors.lastname': lastname } ).populate( 'authors' );
  //     res.status( 200 ).json( booksByAuthorLastname );
  //   } catch ( error ) {
  //     console.error( error );
  //     res.status( 500 ).json( { message: 'Ett fel inträffade', error } );
  //   }
  // } ); 

  // server.get( '/api/activities/ duration/: duration', async ( req, res ) => {
  //   try {
  //     const duration = req.params.duration;
  //     console.log( `Received request for books by activities with duration: ${ duration }` );
  //     const booksByAuthorLastname = await Book.find( { 'authors.lastname': { $regex: lastname, $options: "i" } } ).populate( 'authors' );
  //     console.log( `Found ${ booksByAuthorLastname.length } books for author with lastname ${ lastname }` );
  //     res.status( 200 ).json( booksByAuthorLastname );
  //   } catch ( error ) {
  //     console.error( error );
  //     res.status( 500 ).json( { message: 'Ett fel inträffade', error } );
  //   }
  // } );


  // // GET-route для поиска книги по слову или части названия (titel)
  // server.get( "/api/books/searchByTitle/:titel", async ( req, res ) => {
  //   try {
  //     const title = req.params.titel;
  //     // Используйте регулярное выражение для поиска книг по части названия
  //     const books = await Book.find( { titel: { $regex: title, $options: "i" } } );
  //     res.status( 200 ).json( books );
  //   } catch ( error ) {
  //     console.error( error );
  //     res.status( 500 ).json( { message: "Ett fel inträffade vid sökning efter böcker", error } );
  //   }
  // } );



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


