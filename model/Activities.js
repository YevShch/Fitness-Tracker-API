import mongoose from "mongoose";

// Skapar ett schema för "users", vilket definierar strukturen för varje "user"-dokument i databasen.
const activitySchema = new mongoose.Schema( {
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'users', required: true },
  type: { type: String, required: true },
  startTime: { type: Date, required: true },
  duration: { type: Number, required: true },
  caloriesBurned: { type: Number, required: true },
  createdAt: { type: Date, default: Date.now }
} );

/* 
  Skapar en Mongoose-modell baserat på usersSchema.
  Detta möjliggör för oss att skapa, läsa, uppdatera och radera (CRUD) dokument i vår "users"-samling (collection).
*/
const Activity = mongoose.model( "activities", activitySchema );

export default Activity
