import users from "./api/users.js";
import goals from "./api/goals.js"
import activities from "./api/activities.js";
import stepCounts from "./api/stepCounts.js";

export default function ( server, mongoose ) {

  users( server, mongoose );
  goals( server, mongoose );
  activities( server, mongoose );
  stepCounts( server, mongoose );
}




// import mongoose from 'mongoose';
// import express from 'express';
// import { rateLimit } from 'express-rate-limit';
// import users from "./api/users.js";
// import goals from "./api/goals.js";
// import activities from "./api/activities.js";
// import stepCounts from "./api/stepCounts.js";

// const server = express();

// /// Skapa en rate limiter med express-rate-limit
// const apiLimiter = rateLimit( {
//   windowMs: 15 * 60 * 1000, // Tidsfönstret för att begränsa förfrågningar i millisekunder
//   limit: 100, // Maximalt antal tillåtna förfrågningar per IP-adress under tidsfönstret
//   message: 'För många förfrågningar från denna IP, försök igen om en stund.' // Meddelande som sända tillbaka när gränsen är nådd
// } );

// /// Applicera rate limiter på alla API-förfrågningar
// server.use( '/api/', apiLimiter );

// // Подключаем роуты API
// users( server, mongoose );
// goals( server, mongoose );
// activities( server, mongoose );
// stepCounts( server, mongoose );

// export default server;
