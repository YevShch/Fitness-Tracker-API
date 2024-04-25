import mongoose from "mongoose";


// Skapar ett schema för "goals", vilket definierar strukturen för varje "goal"-dokument i databasen.
const goalSchema = new mongoose.Schema( {
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  type: { type: String, required: true },
  target: { type: String, required: true },
  createdAt: { type: Date, default: Date.now }
} );

const Goal = mongoose.model( 'goals', goalSchema );

export default Goal
