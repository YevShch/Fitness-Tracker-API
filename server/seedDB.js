// Importing necessary modules
import { faker } from '@faker-js/faker';
import mongoose from 'mongoose';
import User from '../model/Users.js';
import Activity from '../model/Activities.js';
import Goal from '../model/Goals.js';
import StepCount from '../model/StepCounts.js';

console.log( "Start seeding database!" );

// Function to seed the database
async function seedDB () {
  try {
    // Connecting to the MongoDB database
    mongoose.connect( "mongodb+srv://yevheniiashcherbakova82:Max260822@cluster0.pnwopeg.mongodb.net/Fitness-Tracker" );

    // Generating data for users, activities, goals, and step counts
    const usersList = await createUsers( 30 );
    const activityList = await createActivities( 90, usersList );
    const goalsList = await createGoals( 50, usersList );
    const stepCountsList = await createStepCounts( 120, usersList );

    // Logging the generated data
    console.log( "UsersList - ", usersList );
    console.log( "ActivityList- ", activityList );
    console.log( "GoalsList - ", goalsList );
    console.log( "StepCountsList - ", stepCountsList );
  } catch ( error ) {
    // Handling errors
    console.log( `ErrorMessage: ${ error }` );
  }
}

// Function to create multiple users
async function createUsers ( amount ) {
  const usersList = [];
  for ( let i = 0; i < amount; i++ ) {
    const newUser = new User( {
      username: faker.internet.userName(),
      email: faker.internet.email(),
      password: faker.internet.password( { length: 15 } ),
      createdAt: faker.date.past()
    } );
    await newUser.save();
    usersList.push( newUser );
  }
  return usersList;
}

// Function to create multiple activities
async function createActivities ( amount, users ) {
  const activityList = [];
  for ( let i = 0; i < amount; i++ ) {
    const randomUser = users[ Math.floor( Math.random() * users.length ) ];
    const minCalories = 50;
    const maxCalories = 2500;
    const minMinutes = 15;
    const maxMinutes = 240;
    const startTime = faker.date.recent();
    const createdAt = faker.date.between( { from: startTime, to: new Date() } );
    const newActivity = new Activity( {
      userId: randomUser._id,
      type: getRandomActivityType(),
      startTime: startTime,
      duration: faker.number.int( { min: minMinutes, max: maxMinutes } ),
      caloriesBurned: faker.number.int( { min: minCalories, max: maxCalories } ),
      createdAt: createdAt,
    } );
    await newActivity.save();
    activityList.push( newActivity );
  }
  return activityList;
}

// Function to generate a random activity type
function getRandomActivityType () {
  const activityList = [
    "Running", "Cycling", "Swimming", "Weightlifting", "Yoga",
    "Hiking", "Boxing", "Pilates", "Rowing", "Dancing",
    "Martial Arts", "Jumping Rope"
  ];
  const randomIndex = Math.floor( Math.random() * activityList.length );
  return activityList[ randomIndex ];
}

// Function to create multiple goals
async function createGoals ( amount, users ) {
  const goalsList = [];
  const goalTypes = [
    "lose_weight", "build_muscle", "get_healthier", "improve_endurance",
    "increase_flexibility", "reduce_stress", "improve_balance", "boost_energy"
  ];

  for ( let i = 0; i < amount; i++ ) {
    const randomUser = users[ Math.floor( Math.random() * users.length ) ];
    const randomType = getRandomElement( goalTypes );
    const randomTarget = generateTargetByType( randomType );
    const newGoal = new Goal( {
      userId: randomUser._id,
      type: randomType,
      target: randomTarget,
      createdAt: faker.date.past()
    } );
    await newGoal.save();
    goalsList.push( newGoal );
  }

  return goalsList;
}

// Function to generate a random element from an array
function getRandomElement ( array ) {
  const randomIndex = Math.floor( Math.random() * array.length );
  return array[ randomIndex ];
}

// Function to generate a target based on the goal type
function generateTargetByType ( type ) {
  switch ( type ) {
    case "lose_weight":
      return getRandomElement( [ "Lose 5-10 pounds", "Lose 10-20 pounds", "Lose 20+ pounds" ] );
    case "build_muscle":
      return getRandomElement( [ "Gain 5-10 pounds of muscle", "Gain 10-20 pounds of muscle", "Gain 20+ pounds of muscle" ] );
    case "get_healthier":
      return getRandomElement( [ "Improve overall health", "Lower blood pressure", "Lower cholesterol levels" ] );
    case "improve_endurance":
      return getRandomElement( [ "Run 5k in under 30 minutes", "Run 10k in under 1 hour", "Run a half marathon" ] );
    case "increase_flexibility":
      return getRandomElement( [ "Touch toes without bending knees", "Perform splits", "Improve backbend" ] );
    case "reduce_stress":
      return getRandomElement( [ "Practice meditation daily", "Take regular breaks during work hours", "Spend more time in nature" ] );
    case "improve_balance":
      return getRandomElement( [ "Stand on one foot for 30 seconds", "Improve yoga balance poses", "Try slacklining" ] );
    case "boost_energy":
      return getRandomElement( [ "Get 8 hours of sleep each night", "Incorporate more fruits and vegetables into diet", "Start regular exercise routine" ] );
    default:
      return "No target specified";
  }
}

// Function to create step counts
async function createStepCounts ( amount, users ) {
  const stepCountsList = [];
  const minSteps = 1000;
  const maxSteps = 30000;
  for ( let i = 0; i < amount; i++ ) {
    const randomUser = users[ Math.floor( Math.random() * users.length ) ];
    const newStepCount = new StepCount( {
      userId: randomUser._id,
      date: faker.date.recent(),
      count: faker.number.int( { min: minSteps, max: maxSteps } )
    } );
    await newStepCount.save();
    stepCountsList.push( newStepCount );
  }
  return stepCountsList;
}

seedDB();
