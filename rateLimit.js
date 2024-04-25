import express from 'express'
import { rateLimit } from 'express-rate-limit'

const server = express();

// Skapa en rate limiter med express-rate-limit
const apiLimiter = rateLimit( {
  windowMs: 15 * 60 * 1000, // Tidsfönstret för att begränsa förfrågningar i millisekunder
  limit: 100, // Maximalt antal tillåtna förfrågningar per IP-adress under tidsfönstret
  message: 'För många förfrågningar från denna IP, försök igen om en stund.' // Meddelande som sända tillbaka när gränsen är nådd
} );

// Applicera rate limiter på alla API-förfrågningar
server.use( '/api/', apiLimiter );
