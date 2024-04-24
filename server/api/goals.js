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

  // GET-route för att filtrera måll efter typ
  server.get( "/api/goals/type/:type", async ( req, res ) => {
    try {
      const type  = req.params.type;
      // const goals = await Goal.find( { type: type } );
      const goals = await Goal.find( { type: { $regex: new RegExp( type, "i" ) } } );
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

  // GET-route för att filtrera måll efter skapandet datum 
  server.get( "/api/goals/createdAt/:createdAt", async ( req, res ) => {
    try {
      const createdAt = req.params.createdAt;
      const goals = await Goal.find( { createdAt: createdAt } );
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

  // server.get( '/api/goals/createdAt/:date', async ( req, res ) => {
  //   try {
  //     const date = req.params.date;
  //     // Контроль корректного формата даты
  //     if ( !isValidDate( date ) ) {
  //       return res.status( 400 ).json( { message: "Неверный формат даты. Используйте формат YYYY-MM-DD." } );
  //     }
  //     // Создание объекта Date из строки даты
  //     const searchDate = new Date( date );
  //     // Поиск целей, созданных в указанную дату и сортировка по дате создания
  //     const goals = await Goal.find( { createdAt: { $gte: searchDate, $lt: new Date( searchDate.getTime() + 24 * 60 * 60 * 1000 ) } } )
  //       .sort( { createdAt: 'asc' } );

  //     res.status( 200 ).json( goals );
  //   } catch ( error ) {
  //     res.status( 500 ).json( { message: "Произошла ошибка при поиске и сортировке целей.", error } );
  //   }
  // } );

  // // Функция для проверки корректности формата даты
  // function isValidDate ( dateString ) {
  //   const regex = /^\d{4}-\d{2}-\d{2}$/;
  //   return regex.test( dateString );
  // }



  // server.get( '/api/goals/createdAt/:createdAt', async ( req, res ) => {
  //   try {

  //     const date = req.params.createdAt;
  //     // Kontrollerar att datumet i förfrågan är i rätt format
  //     if ( !isValidDate( date ) ) {
  //       return res.status( 400 ).json( { message: "Ogiltigt datumformat. Använd formatet YYYY-MM-DD." } );
  //     }
  //     // Skapar ett Date-objekt från en datumsträng
  //     const searchDate = new Date( date );
  //     // Söker efter aktiviteter som startade ett angivet datum
  //     const goals = await Goal.find( { createdAt: { $gte: searchDate, $lt: new Date( searchDate.getTime() + 24 * 60 * 60 * 1000 ) } } );

  //     res.status( 200 ).json( goals );
  //   } catch ( error ) {
  //     res.status( 500 ).json( { message: "Ett fel uppstod vid sökning efter aktiviteter.", error } );
  //   }
  // } );
  // // Funktion för att kontrollera att datumformatet är korrekt
  // function isValidDate ( dateString ) {
  //   const regex = /^\d{4}-\d{2}-\d{2}$/;
  //   return regex.test( dateString );
  // }


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

  

  // Skapar en POST-route för att lägga till ett nytt måll
  server.post( '/api/users/:userId/goals', async ( req, res ) => {
    try {
      const userId = req.params.userId;
      // kollar att anv'ndare med angiven userId existerar
      const userExists = await User.findOne( { _id: userId } );
      if ( !userExists ) {
        return res.status( 404 ).json( { message: "Användare hittades inte." } );
      }

      const newGoal = new Goal( {
        userId: userId,
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
