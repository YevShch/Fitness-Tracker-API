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
      res.status( 500 ).json( { message: "An error occurred on the server", error } );
    }
  } );


  //GET - route för att hämta alla aktiviteter med paginering, sortering och filtrering
  server.get( "/api/activities", async ( req, res ) => {
    try {
      const page = parseInt( req.query.page ) || 1; // aktuell sida
      const limit = parseInt( req.query.limit ) || 10; // antal elementer på en sida
      const sortField = req.query.sortField || "_id"; // fälten för sortering
      const sortOrder = req.query.sortOrder || "asc"; // sorteringsriktning
      const byType = req.query.byType || ""; // för att söka efter en del av aktivitetstypen
      const minMinutes = parseInt( req.query.minMinutes ); // Minimum number of minutes
      const maxMinutes = parseInt( req.query.maxMinutes ); // Maximum number of minutes
      const userId = req.query.userId || ""; // för att filtrera aktiviteter baserat på användar-ID
      const startTimeAfter = req.query.startTimeAfter ? new Date( req.query.startTimeAfter ) : null; // Start time of activity after
      const startTimeBefore = req.query.startTimeBefore ? new Date( req.query.startTimeBefore ) : null; // Start time of activity before
      const minCalories = parseInt( req.query.minCalories ); // Minimum number of burned calories
      const maxCalories = parseInt( req.query.maxCalories ); // Maximum number of burned calories
      const startDate = req.query.startDate ? new Date( req.query.startDate ) : null; // Start date of activity creation
      const endDate = req.query.endDate ? new Date( req.query.endDate ) : null; // End date of activity creation  

      const sortOptions = {};
      sortOptions[ sortField ] = sortOrder === "asc" ? 1 : -1;

      let query = {};

      // Filtrera aktiviteter baserat på användar-ID om det finns en sådan parameter
      if ( userId !== "" ) {
        query.userId = userId;
      }


      // Om byType är definierat, lägg till en sökning för delar av aktivitetstypen
      if ( byType !== "" ) {
        query.type = { $regex: byType, $options: "i" };
      }

      // Filter by minimum number of minutes
      if ( !isNaN( minMinutes ) ) {
        query.duration = { $gte: minMinutes };
      }

      // Filter by maximum number of minutes
      if ( !isNaN( maxMinutes ) ) {
        if ( query.duration ) {
          query.duration.$lte = maxMinutes;
        } else {
          query.duration = { $lte: maxMinutes };
        }
      }

      // Filter by start time of activity
      if ( startTimeAfter && startTimeBefore ) {
        query.startTime = { $gte: startTimeAfter, $lte: startTimeBefore };
      } else if ( startTimeAfter ) {
        query.startTime = { $gte: startTimeAfter };
      } else if ( startTimeBefore ) {
        query.startTime = { $lte: startTimeBefore };
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
        totalActivities
      } );
    } catch ( error ) {
      console.error( error );
      res.status( 500 ).json( { message: "An error occurred on the server", error } );
    }
  } );  


  // Skapar en GET-route för att hämta en specifik aktivitet med ID
  server.get( '/api/activities/:id', async ( req, res ) => {
    try {
      const activity = await Activity.findById( req.params.id ); 
      if ( !activity ) {
        return res.status( 404 ).json( { message: "Activity not found" } );
      }
      res.json( activity );
    } catch ( error ) {
      res.status( 500 ).json( { message: 'An error occurred on the server while fetching an activity' } );
    }
  } );

  // Skapar en POST-route för att lägga till en ny aktivitet
  server.post( '/api/activities', async ( req, res ) => {
    try {
      // Check for the presence of required parameters
      const requiredFields = [ 'userId', 'type', 'startTime', 'duration', 'caloriesBurned', 'createdAt' ];
      const missingFields = requiredFields.filter( field => !req.body.hasOwnProperty( field ) );

      if ( missingFields.length > 0 ) {
        return res.status( 400 ).json( { message: `Missing required field(s): ${ missingFields.join( ', ' ) }` } );
      }
      // Kontrollerar om caloriesBurned är i rätt format
      if ( isNaN( req.body.caloriesBurned ) ) {
        return res.status( 400 ).json( { message: "Invalid caloriesBurned. Must be a number." } );
      }

      // Kontrollerar om duration är i rätt format
      if ( isNaN( req.body.duration ) ) {
        return res.status( 400 ).json( { message: "Invalid duration. Must be a number." } );
      }

      // Kontrollerar om startTime är ett giltigt datum
      if ( isNaN( Date.parse( req.body.startTime ) ) ) {
        return res.status( 400 ).json( { message: "Invalid startTime. Must be a valid date." } );
      }
      const newActivity = new Activity( {
        userId: req.body.userId,
        type: req.body.type,
        startTime: req.body.startTime,
        duration: req.body.duration,
        caloriesBurned: req.body.caloriesBurned,
        createdAt: req.body.createdAt
      } ); // Skapar en ny aktivitet från request body.

      const savedActivity = await newActivity.save(); // Sparar den nya aktiviteten i databasen.

      res.status( 201 ).json( savedActivity ); // Skickar tillbaka den sparade aktiviteten som JSON.
    } catch ( error ) {
      console.error( error );
      res.status( 500 ).json( { message: 'An error occurred on the server while creating new activity' } );
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
      res.status( 500 ).json( { message: 'An error occurred on the server while updating an activity' } );
    }
  } );

  //Skapar en DELETE-route för att radera en aktivitet med ett specifikt ID.
  server.delete( '/api/activities/:id', async ( req, res ) => {
    try {
      const deletedActivity = await Activity.findByIdAndDelete( req.params.id );
      if ( !deletedActivity ) {
        return res.status( 404 ).json( { message: "Activity not found" } );
      }
      res.json( { message: "Activity deleted successfully." } ); // Bekräftelse på att boken har raderats.
    } catch ( error ) {
      console.error( error );
      res.status( 500 ).json( { message: "An error occurred on the server while removing activity" } );
    }
  } );

}


