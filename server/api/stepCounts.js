import StepCount from "../../model/StepCounts.js";

export default function ( server, mongoose ) {

  // GET-route för att hämta alla step counts
  server.get( "/api/stepCounts", async ( req, res ) => {
    try {
      const stepCounts = await StepCount.find()
      res.status( 200 ).json( stepCounts );
    } catch ( error ) {
      console.error( error ); // Skriver ut felet till konsolen
      res.status( 500 ).json( { message: "An error occurred on the server", error } );
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
        return res.status( 404 ).json( { message: 'Step count not found' } );
      }
      res.json( stepCounts );
    } catch ( error ) {
      res.status( 500 ).json( { message: 'An error occurred on the server' } );
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
      res.status( 500 ).json( { message: "An error occurred on the server", error } );
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
        return res.status( 400 ).json( { message: "Invalid date format. Use YYYY-MM-DD format." } );
      }

      const stepCounts = await StepCount.find( { userId: userId, date: { $gte: startDate, $lte: endDate } } );
      if ( stepCounts.length === 0 ) {
        return res.status( 404 ).json( { message: `Step counts not found` } );
      }
      res.status( 200 ).json( stepCounts );
    } catch ( error ) {
      console.error( error );
      res.status( 500 ).json( { message: "An error occurred on the server", error } );
    }
  } );


  // Skapar en POST-route för att lägga till en ny stegräkning
  server.post( '/api/stepCounts', async ( req, res ) => {
    try {
      // Check for the presence of required parameters
      const requiredFields = [ 'userId', 'date', 'count' ];
      const missingFields = requiredFields.filter( field => !req.body.hasOwnProperty( field ) );

      if ( missingFields.length > 0 ) {
        return res.status( 400 ).json( { message: `Missing required field(s): ${ missingFields.join( ', ' ) }` } );
      }
      // Kontrollerar om count är i rätt format
      if ( isNaN( req.body.count ) ) {
        return res.status( 400 ).json( { message: "Invalid count. Must be a number." } );
      }

      // Kontrollerar om startTime är ett giltigt datum
      if ( isNaN( Date.parse( req.body.date ) ) ) {
        return res.status( 400 ).json( { message: "Invalid date. Must be a valid date." } );
      }

      const newStepCount = new StepCount( {
        userId: req.body.userId,
        date: req.body.date,
        count: req.body.count

      } ) // Skapar ett nytt måll från request body.
      const savedStepCount = await newStepCount.save()
      res.status( 201 ).json( savedStepCount ); 
    } catch ( error ) {
      console.error( error );
      res.status( 500 ).json( { message: "An error occurred on the server" } );
    }
  } );

  // Skapar en PUT-route för att uppdatera en stegräkning med ett specifikt ID.
  server.put( '/api/stepCounts/:id', async ( req, res ) => {
    try {
      
      const updatedStepCount = await StepCount.findByIdAndUpdate( req.params.id, req.body )
  
      if ( !updatedStepCount ) {
        return res.status( 404 ).json( { message: 'Step count not found' } );
      }
      res.json( updatedStepCount );
    } catch ( error ) {
      console.error( error );
      res.status( 500 ).json( { message: 'An error occurred on the server' } );
    }
  } );

  //Skapar en DELETE-route för att radera en stegräkning med ett specifikt ID.
  server.delete( '/api/stepCounts/:id', async ( req, res ) => {
    try {
      const deletedStepCount = await StepCount.findByIdAndDelete( req.params.id );
      if (!deletedStepCount ) {
        return res.status( 404 ).json( { message: "Step count not found" } );
      }
      res.json( { message: "Step count deleted successfully." } ); 
    } catch ( error ) {
      console.error( error );
      res.status( 500 ).json( { message: "An error occurred on the server" } );
    }
  } );

}


