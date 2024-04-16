export default function ( server, mongoose ) {

  // Skapar ett schema för "users", vilket definierar strukturen för varje "user"-dokument i databasen.
  const goalSchema = new mongoose.Schema( {
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    type: { type: String, required: true },
    target: { type: String, required: true },
    createdAt: { type: Date, default: Date.now }
  } );


  /* 
    Skapar en Mongoose-modell baserat på usersSchema.
    Detta möjliggör för oss att skapa, läsa, uppdatera och radera (CRUD) dokument i vår "users"-samling (collection).
  */
  const Goal = mongoose.model( "goals", goalSchema );

  // GET-route för att hämta alla måll
  server.get( "/api/goals", async ( req, res ) => {
    try {
      const goals = await Goal.find()
      // .populate( 'authors' );
      res.status( 200 ).json( goals );
    } catch ( error ) {
      console.error( error ); // Skriver ut felet till konsolen
      res.status( 500 ).json( { message: "Ett fel inträffade", error } );
    }
  } );


  // Skapar en GET-route för att hämta ett specifikt måll med ett specifikt ID
  server.get( '/api/goals/:id', async ( req, res ) => {
    try {
      const goal = await Goal.findById( req.params.id ); // Hämtar boken med ID från databasen.
      if ( !goal ) {
        return res.status( 404 ).json( { message: "Mål hittades inte" } );
      }
      res.json( goal );
    } catch ( error ) {
      res.status( 500 ).json( { message: "Ett fel uppstod på servern vid hämtning av ett mål." } );
    }
  } );


  // Skapar en POST-route för att lägga till ett nytt måll
  server.post( '/api/goals', async ( req, res ) => {
    try {
      const newGoal = new Goal( {
        userId: req.body.userId,
        type: req.body.type,
        target: req.body.target,
        createdAt: req.body.createdAt  

      } ) // Skapar en ny bok med titel från request body.
      const savedGoal = await newGoal.save() // Sparar den nya boken i databasen.
      res.status( 201 ).json( savedGoal ); // Skickar tillbaka den sparade boken som JSON.
    } catch ( error ) {
      console.error( error );
      res.status( 500 ).json( { message: "Ett fel uppstod på servern vid skapande av nytt mål." } );
    }
  } );

  // Skapar en PUT-route för att uppdatera ett måll med ett specifikt ID.
  server.put( '/api/goals/:id', async ( req, res ) => {
    try {
      const updatedGoal = await Goal.findByIdAndUpdate( req.params.id, req.body )
      // .populate( {
      //   path: 'authors',
      //   select: '-books'
      // } );
      if ( !updatedGoal ) {
        return res.status( 404 ).json( { message: 'Mål hittades inte' } );
      }
      res.json( updatedGoal );
    } catch ( error ) {
      console.error( error );
      res.status( 500 ).json( { message: 'Ett fel uppstod på servern vid uppdatering av måll.' } );
    }
  } );

  //Skapar en DELETE-route för att radera ett måll med ett specifikt ID.
  server.delete( '/api/goals/:id', async ( req, res ) => {
    try {
      const deletedGoal = await Goal.findByIdAndDelete( req.params.id );
      if ( !deletedGoal ) {
        return res.status( 404 ).json( { message: "Målet hittades inte" } );
      }
      res.json( { message: "Målet har raderats!" } ); // Bekräftelse på att boken har raderats.
    } catch ( error ) {
      console.error( error );
      res.status( 500 ).json( { message: "Ett fel uppstod på servern vid radering av måll." } );
    }
  } );

}


