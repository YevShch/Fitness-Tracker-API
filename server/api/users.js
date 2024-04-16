export default function ( server, mongoose ) {

  // Skapar ett schema för "users", vilket definierar strukturen för varje "user"-dokument i databasen.
  const userSchema = new mongoose.Schema( {
    username: { type: String, required: true },
    email: { type: String, required: true },
    password: { type: String, required: true },
    createdAt: { type: Date, default: Date.now }
  } );


  /* 
    Skapar en Mongoose-modell baserat på usersSchema.
    Detta möjliggör för oss att skapa, läsa, uppdatera och radera (CRUD) dokument i vår "users"-samling (collection).
  */
  const User = mongoose.model( "users", userSchema );

  // GET-route för att hämta alla användare
  server.get( "/api/users", async ( req, res ) => {
    try {
      const users = await User.find()
        // .populate( 'authors' );
      res.status( 200 ).json( users );
    } catch ( error ) {
      console.error( error ); // Skriver ut felet till konsolen
      res.status( 500 ).json( { message: "Ett fel inträffade", error } );
    }
  } );


  // Skapar en GET-route för att hämta en specifik användare med ett specifikt ID
  server.get( '/api/users/:id', async ( req, res ) => {
    try {
      const user = await User.findById( req.params.id ); // Hämtar boken med ID från databasen.
      if ( !user ) {
        return res.status( 404 ).json( { message: "Användare hittades inte" } );
      }
      res.json( user );
    } catch ( error ) {
      res.status( 500 ).json( { message: "Ett fel uppstod på servern vid hämtning av en användare." } );
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
      res.json( { message: "Användaren har raderats!" } ); // Bekräftelse på att boken har raderats.
    } catch ( error ) {
      console.error( error );
      res.status( 500 ).json( { message: "Ett fel uppstod på servern vid radering av användare." } );
    }
  } );

}


