import mongoose from "mongoose";

// Skapar ett schema för "stegräkningar", vilket definierar strukturen för varje "stegräkningen"-dokument i databasen.
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

export default StepCount
