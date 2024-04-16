export default function ( server, mongoose ) {

  // Skapar ett schema för "users", vilket definierar strukturen för varje "user"-dokument i databasen.
  const stepCountSchema = new mongoose.Schema( {
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    date: { type: Date, required: true },
    count: { type: Number, required: true }
  } );

  /* 
    Skapar en Mongoose-modell baserat på usersSchema.
    Detta möjliggör för oss att skapa, läsa, uppdatera och radera (CRUD) dokument i vår "users"-samling (collection).
  */
  const StepCount = mongoose.model( "stepCounts", stepCountSchema );

  // GET-route för att hämta alla stegräkningar
  server.get( "/api/stepCounts", async ( req, res ) => {
    try {
      const stepCounts = await StepCount.find()
      // .populate( 'authors' );
      res.status( 200 ).json( stepCounts );
    } catch ( error ) {
      console.error( error ); // Skriver ut felet till konsolen
      res.status( 500 ).json( { message: "Ett fel inträffade", error } );
    }
  } );


  // Skapar en GET-route för att hämta en specifik stegräkning med ett specifikt ID
  server.get( '/api/stepCounts/:id', async ( req, res ) => {
    try {
      const stepCounts = await StepCount.findById( req.params.id ); // Hämtar Antal steg med ID från databasen.
      if ( !goal ) {
        return res.status( 404 ).json( { message: "Antal steg hittades inte" } );
      }
      res.json( stepCounts );
    } catch ( error ) {
      res.status( 500 ).json( { message: "Ett fel uppstod på servern vid hämtning av antal steg." } );
    }
  } );


  // Skapar en POST-route för att lägga till en ny stegräkning
  server.post( '/api/stepCounts', async ( req, res ) => {
    try {
      const newStepCount = new StepCount( {
        userId: req.body.userId,
        date: req.body.date,
        count: req.body.count

      } ) // Skapar en ny bok med titel från request body.
      const savedStepCount = await newStepCount.save() // Sparar den nya antal steg i databasen.
      res.status( 201 ).json( savedStepCount ); // Skickar tillbaka den sparade antal steg som JSON.
    } catch ( error ) {
      console.error( error );
      res.status( 500 ).json( { message: "Ett fel uppstod på servern vid skapande av nytt antal steg." } );
    }
  } );

  // Skapar en PUT-route för att uppdatera en stegräkning med ett specifikt ID.
  server.put( '/api/stepCounts/:id', async ( req, res ) => {
    try {
      const updatedStepCount = await StepCount.findByIdAndUpdate( req.params.id, req.body )
      // .populate( {
      //   path: 'authors',
      //   select: '-books'
      // } );
      if ( !updatedStepCount ) {
        return res.status( 404 ).json( { message: 'Antal steg hittades inte' } );
      }
      res.json( updatedStepCount );
    } catch ( error ) {
      console.error( error );
      res.status( 500 ).json( { message: 'Ett fel uppstod på servern vid uppdatering av antal steg.' } );
    }
  } );

  //Skapar en DELETE-route för att radera en stegräkning med ett specifikt ID.
  server.delete( '/api/stepCounts/:id', async ( req, res ) => {
    try {
      const deletedStepCount = await StepCount.findByIdAndDelete( req.params.id );
      if (!deletedStepCount ) {
        return res.status( 404 ).json( { message: "Antal steg hittades inte" } );
      }
      res.json( { message: "Antal steg har raderats!" } ); // Bekräftelse på att antalet steg har raderats.
    } catch ( error ) {
      console.error( error );
      res.status( 500 ).json( { message: "Ett fel uppstod på servern vid radering av antal steg." } );
    }
  } );

}


