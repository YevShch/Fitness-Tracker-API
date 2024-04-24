import User from './users.js'
import Goal from '../../model/Goals.js';

export default function ( server, mongoose ) {

  // GET-route för att hämta alla måll
  server.get( "/api/goals/all", async ( req, res ) => {
    try {
      const goals = await Goal.find()
      //  .populate( 'userId' );
      res.status( 200 ).json( goals );
    } catch ( error ) {
      console.error( error ); // Skriver ut felet till konsolen
      res.status( 500 ).json( { message: "Ett fel inträffade", error } );
    }
  } ); 

  // Skapar en GET-route för att hämta ett specifikt måll med ett specifikt ID
  server.get( '/api/goals/:id', async ( req, res ) => {
    try {
      const goal = await Goal.findById( req.params.id ); // Hämtar ett måll med ID från databasen.
      if ( !goal ) {
        return res.status( 404 ).json( { message: "Mål hittades inte" } );
      }
      res.json( goal );
    } catch ( error ) {
      res.status( 500 ).json( { message: "Ett fel uppstod på servern vid hämtning av ett mål." } );
    }
  } );


  // GET-route för att få alla mål med paginering 
  server.get( "/api/goals", async ( req, res ) => {
    try {
      const page = parseInt( req.query.page ) || 1; // aktuell sida
      const limit = parseInt( req.query.limit ) || 10; // antal elementer på en sida
      const sortField = req.query.sortField || "_id"; // fälten för sortering
      const sortOrder = req.query.sortOrder || "asc"; // sorteringsriktning

      const sortOptions = {};
      sortOptions[ sortField ] = sortOrder === "asc" ? 1 : -1;

      const totalGoals = await Goal.countDocuments();
      const totalPages = Math.ceil( totalGoals / limit );
      const skip = ( page - 1 ) * limit;

      const goals = await Goal.find()
        .sort( sortOptions )
        .skip( skip )
        .limit( limit );

      res.status( 200 ).json( { 
        goals,
        currentPage: page,
        totalPages,
        totalGoals
      } );
    } catch ( error ) {
      console.error( error );
      res.status( 500 ).json( { message: "Ett fel inträffade", error } );
    }
  } );

  // GET-route för att hämta en lista av måll för en specifik användare 
  server.get( "/api/goals/user/:userId", async ( req, res ) => {
    try {
      const userId = req.params.userId;
      const goals = await Goal.find( { userId: userId } )
      //.populate( 'userId' );

      res.status( 200 ).json( goals );
    } catch ( error ) {
      console.error( error ); // Skriver ut felet till konsolen
      res.status( 500 ).json( { message: "Ett fel uppstod på servern vid hämtning av måll", error } );
    }
  } );


  // GET-route för att hämta specifikt typ av måll för en specifik användare 
  server.get( "/api/goals/user/:userId/:type", async ( req, res ) => {
    try {
      const { userId, type } = req.params;
      const goals = await Goal.find( {
        userId: userId,
        type: type
      } );
      // Kontrollerar om goals har hittats
      if ( goals.length === 0 ) {
        return res.status( 404 ).json( { message: "Måll hittades inte" } );
      }
      res.status( 200 ).json( goals );
    } catch ( error ) {
      console.error( error ); // Skriver ut felet till konsolen
      res.status( 500 ).json( { message: "Ett fel uppstod på servern vid hämtning av måll", error } );
    }
  } ); 

  // GET route for goals for specific user by date of creation
  server.get( '/api/goals/user/:userId/createdAt/:startDate/:endDate', async ( req, res ) => {
    try {
      // Konvertera parametrarna startDate och endDate till Date-objekt
      const userId = req.params.userId;
      const startDate = new Date( req.params.startDate );
      const endDate = new Date( req.params.endDate );

      // Kontrollerar att datumen är korrekta
      if ( isNaN( startDate.getTime() ) || isNaN( endDate.getTime() ) ) {
        return res.status( 400 ).json( { message: "Fel datumformat. Använd format 'YYYY-MM-DD'." } );
      }

      // Hämtar måll skapade inom ett givet tidsintervall
      const goals = await Goal.find( { userId: userId, createdAt: { $gte: startDate, $lte: endDate } } );
      if ( goals.length === 0 ) {
        return res.status( 404 ).json( { message: 'Användare med konto skapade i angiven tidsperiod hittades inte' } );
      }
      res.status( 200 ).json( goals );
    } catch ( error ) {
      res.status( 500 ).json( { message: "Ett fel uppstod på servern vid hämtning av måll efter skapandedatum.", error } );
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
      } );
      const savedGoal = await newGoal.save();
      res.status( 201 ).json( savedGoal );
    } catch ( error ) {
      console.error( error );
      res.status( 500 ).json( { message: "Ett fel uppstod på servern vid skapande av nytt mål.", error } );
    }
  } );


  // Skapar en PUT-route för att uppdatera ett måll med ett specifikt ID.
  server.put( '/api/goals/:id', async ( req, res ) => {
    try {
      const updatedGoal = await Goal.findByIdAndUpdate( req.params.id, req.body );

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
