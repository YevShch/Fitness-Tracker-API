import StepCount from "../../model/StepCounts.js";

export default function ( server, mongoose ) {

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
    const stepCountId = req.params.id;

    if ( !mongoose.Types.ObjectId.isValid( stepCountId ) ) {
      return res.status( 400 ).json( { message: 'Invalid ID' } );
    }

    try {
      const stepCounts = await StepCount.findById( stepCountId );
      if ( !stepCounts ) {
        return res.status( 404 ).json( { message: 'Antal steg hittades inte' } );
      }
      res.json( stepCounts );
    } catch ( error ) {
      res.status( 500 ).json( { message: 'Ett fel uppstod på servern vid hämtning av antal steg.' } );
    }
  } );


  // GET-route för att hämta alla stegräkningar för specifik användare
  server.get( "/api/stepCounts/user/:userId/", async ( req, res ) => {
    try {
      const userId = req.params.userId;
      const stepCounts = await StepCount.find( { userId: userId } )
      // .populate( 'users' );
      res.status( 200 ).json( stepCounts );
    } catch ( error ) {
      console.error( error ); // Skriver ut felet till konsolen
      res.status( 500 ).json( { message: "Ett fel inträffade", error } );
    }
  } );


  // GET-rout för att hämta stegräkningar för angiven tidsperiod 
  server.get( "/api/stepCounts/user/:userId/:startDate/:endDate", async ( req, res ) => {
    try {
      const userId = req.params.userId;
      const startDate = new Date( req.params.startDate );
      const endDate = new Date( req.params.endDate );

      // kollar om datum är korekta
      if ( isNaN( startDate.getTime() ) || isNaN( endDate.getTime() ) ) {
        return res.status( 400 ).json( { message: "Ogiltig format. Använd formatet YYYY-MM-DD." } );
      }

      const stepCounts = await StepCount.find( { userId: userId, date: { $gte: startDate, $lte: endDate } } );
      if ( stepCounts.length === 0 ) {
        return res.status( 404 ).json( { message: `Steg-räkningar hittades inte under den angivna tidsperioden` } );
      }
      res.status( 200 ).json( stepCounts );
    } catch ( error ) {
      console.error( error );
      res.status( 500 ).json( { message: "Ett felinträffad", error } );
    }
  } );


  // Skapar en POST-route för att lägga till en ny stegräkning
  server.post( '/api/stepCounts', async ( req, res ) => {
    try {
      const newStepCount = new StepCount( {
        userId: req.body.userId,
        date: req.body.date,
        count: req.body.count

      } ) // Skapar ett nytt måll från request body.
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
      //   path: 'users',
      //   select: '-createdAt'
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
      res.json( { message: "Step count deleted successfully." } ); // Bekräftelse på att antalet steg har raderats.
    } catch ( error ) {
      console.error( error );
      res.status( 500 ).json( { message: "Ett fel uppstod på servern vid radering av antal steg." } );
    }
  } );

}


