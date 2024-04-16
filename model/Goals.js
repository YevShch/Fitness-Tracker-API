import mongoose from "mongoose";

// Skapar ett schema för "users", vilket definierar strukturen för varje "user"-dokument i databasen.
const goalSchema = new mongoose.Schema( {
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  type: { type: String, required: true },
  target: { type: String, required: true },
  createdAt: { type: Date, default: Date.now }
} );


/* 
  Skapar en Mongoose-modell baserat på usersSchema.
  Detta tillåter oss att skapa, läsa, uppdatera, och ta bort (CRUD) dokument i vår "users"-collection.
*/
const Goal = mongoose.model( 'goals', goalSchema );

export default Goal
