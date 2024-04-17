import User from "../../model/Users.js";
  
  // GET-route för att hämta alla användare
  server.get( "/api/users", async ( req, res ) => {
    try {
      const users = await User.find();
      res.status( 200 ).json( users );
    } catch ( error ) {
      console.error( error ); // Skriver ut felet till konsolen
      res.status( 500 ).json( { message: "Ett fel inträffade", error } );
    }
  } );


  // Skapar en GET-route för att hämta en specifik användare med ett specifikt ID
  server.get( '/api/users/:id', async ( req, res ) => {
    try {
      const user = await User.findById( req.params.id ); // Hämtar användare med ID från databasen.
      if ( !user ) {
        return res.status( 404 ).json( { message: "Användare hittades inte" } );
      }
      res.json( user );
    } catch ( error ) {
      res.status( 500 ).json( { message: "Ett fel uppstod på servern vid hämtning av en användare." } );
    }
  } );


  // GET-route för sökning av en användare efter användarnamn
  server.get( '/api/users/username/:username', async ( req, res ) => {
    try {
      const username = req.params.username;
      const user = await User.findOne( { username: username } );
      if ( !user ) {
        return res.status( 404 ).json( { message: "Användare hittades inte" } );
      }
      res.json( user );
    } catch ( error ) {
      res.status( 500 ).json( { message: "Ett fel uppstod på servern vid hämtning av en användare.", error } );
    }
  } );


  // GET-route för sökning av användare efter en del av användarnamn  (titel)
  server.get( "/api/users/searchByUsername/:username", async ( req, res ) => {
    try {
      const username = req.params.username;
      // Användук ett uttryck för att söka efter användare utifrån en del av deras namn
      const users = await User.find( { username: { $regex: username, $options: "i" } } );
      res.status( 200 ).json( users );
    } catch ( error ) {
      console.error( error );
      res.status( 500 ).json( { message: "Ett fel inträffade vid sökning efter användare", error } );
    }
  } );

  // GET-route för sökning av en användare efter email
  server.get( "/api/users/email/:email", async ( req, res ) => {
    try {
      const email = req.params.email;
      // Användук ett uttryck för att söka efter användare utifrån en del av deras namn
      const users = await User.find( { email: email } );
      res.status( 200 ).json( users );
    } catch ( error ) {
      console.error( error );
      res.status( 500 ).json( { message: "Ett fel inträffade vid sökning efter användare", error } );
    }
  } );

  // GET-route för sökning av en användare efter lösenord
  server.get( '/api/users/password/:password', async ( req, res ) => {
    try {
      const password = req.params.password;
      const user = await User.findOne( { password: password } );
      if ( !user ) {
        return res.status( 404 ).json( { message: "Användare hittades inte" } );
      }
      res.json( user );
    } catch ( error ) {
      res.status( 500 ).json( { message: "Ett fel uppstod på servern vid hämtning av en användare.", error } );
    }
  } );
  
  // GET-route för sökning av användare efter datumet av konto skapandet
  server.get( '/api/users/createdAt/:date', async ( req, res ) => {
    try {
      const date = req.params.date;
      // Kontrollerar att datumet i förfrågan är i rätt format
      if ( !isValidDate( date ) ) {
        return res.status( 400 ).json( { message: "Ogiltigt datumformat. Använd formatet YYYY-MM-DD." } );
      }
      // Söker en användare vars konto skapandes datum motsvarar det angivna datumet
      const users = await User.find( { createdAt: { $gte: new Date( date ), $lt: new Date( date + 'T23:59:59.999Z' ) } } );

      res.status( 200 ).json( users );
    } catch ( error ) {
      res.status( 500 ).json( { message: "Произошла ошибка при получении активностей." } );
    }
  } );

  // Funktion för att kontrollera att datumformatet är korrekt
  function isValidDate ( dateString ) {
    const regex = /^\d{4}-\d{2}-\d{2}$/;
    return regex.test( dateString );
  }

  // GET-route för sökning av användare som har skapat ett konto under ett visst tidsperiod
  server.get( '/api/users/createdAt/:startDate/:endDate', async ( req, res ) => {
    try {
      // Konvertera parametrarna startDate och endDate till Date-objekt
      const startDate = new Date( req.params.startDate );
      const endDate = new Date( req.params.endDate );

      // Kontrollerar att datumen är korrekta
      if ( isNaN( startDate.getTime() ) || isNaN( endDate.getTime() ) ) {
        return res.status( 400 ).json( { message: "Fel datumformat. Använd format 'YYYY-MM-DD'." } );
      }

      // Hämtar användare skapade inom ett givet tidsintervall
      const users = await User.find( { createdAt: { $gte: startDate, $lte: endDate } } );

      res.status( 200 ).json( users );
    } catch ( error ) {
      res.status( 500 ).json( { message: "Ett fel uppstod på servern vid hämtning av användare efter skapandedatum.", error } );
    }
  } );


  // Skapar en POST-route för att lägga till en ny användare
  server.post( '/api/users', async ( req, res ) => {
    try {
      const newUser = new User( {
        username: req.body.username,
        email: req.body.email,
        password: req.body.password,
        createdAt: req.body.createdAt

      } ) // Skapar en ny användare från request body.
      const savedUser = await newUser.save() // Sparar den nya användaren i databasen.
      res.status( 201 ).json( savedUser ); // Skickar tillbaka den sparade användare som JSON.
    } catch ( error ) {
      console.error( error );
      res.status( 500 ).json( { message: "Ett fel uppstod på servern vid skapande av ny användare." } );
    }
  } );


  // Skapar en PUT-route för att uppdatera en användare med ett specifikt ID.
  server.put( '/api/users/:id', async ( req, res ) => {
    try {
      const updatedUser = await User.findByIdAndUpdate( req.params.id, req.body )
        // .populate( {
        //   path: 'authors',
        //   select: '-books'
        // } );
      if ( !updatedUser ) {
        return res.status( 404 ).json( { message: 'Användare hittades inte' } );
      }
      res.json( updatedUser );
    } catch ( error ) {
      console.error( error );
      res.status( 500 ).json( { message: 'Ett fel uppstod på servern vid uppdatering av användare.' } );
    }
  } );


  //Skapar en DELETE-route för att radera en användare med ett specifikt ID.
  server.delete( '/api/users/:id', async ( req, res ) => {
    try {
      const deletedUser = await User.findByIdAndDelete( req.params.id );
      if ( !deletedUser ) {
        return res.status( 404 ).json( { message: "Användaren hittades inte" } );
      }
      res.json( { message: "Användaren har raderats!" } ); // Bekräftelse på att användaren har raderats.
    } catch ( error ) {
      console.error( error );
      res.status( 500 ).json( { message: "Ett fel uppstod på servern vid radering av användare." } );
    }
  } );



