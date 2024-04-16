import { faker } from '@faker-js/faker';
import mongoose from 'mongoose';
import User from '../model/Users.js';
import Activity from '../model/Activities.js';
import Goal from '../model/Goals.js';
import StepCount from '../model/StepCounts.js';

console.log( "Start seeding databse!" )

async function seedDB () {
  try {
    mongoose.connect( "mongodb+srv://yevheniiashcherbakova82:Max260822@cluster0.pnwopeg.mongodb.net/Fitness-Tracker" )
    const usersList = await createUsers( 3 )
    const activityList = await createActivities( 21,3 )
    const goalsList = await createGoals(3,3)
    const stepCountsList = await createStepCounts(12,3)
    console.log( "UsersList - ", usersList )
    console.log( "ActivityList- ", activityList );
    console.log( "GoalsList - ", goalsList );
    console.log( "StepCountsist - ",  stepCountsList);


  } catch ( error ) {
    console.log( `Errormessage: ${ error }` )
  }
}

async function createUsers ( amount ) {
  const usersList = []
  for ( let i = 0; i < amount; i++ ) {
    const newUser = new User( {
      username: faker.internet.userName(),
      email: faker.internet.email(),
      password: faker.internet.password( { length: 15 } ),
      createdAt: faker.date.past()
       
    } )
    await newUser.save()
    usersList.push( newUser )
    // console.log(`New user - ${newUser.username} - has been created.`)
  }
  // console.log(`${amount} users has been seeded.`)
  return usersList
}

async function createActivities ( amount, users ) {
  const activityList = [];
  for ( let i = 0; i < amount; i++ ) {
    const randomUser = users[ Math.floor( Math.random() * users.length ) ];
    const minCalories = 50;
    const maxCalories = 2500;
    const minMinutes = 15;
    const maxMinutes = 240;
    const newActivity = new Activity( {
      userId: randomUser._id,
      type: getRandomActivityType(),
      startTime: faker.date.recent(),
      duration: faker.random.number( { min: minMinutes, max: maxMinutes } ),
      caloriesBurned: faker.random.number( { min: minCalories, max: maxCalories } ),
      createdAt: faker.date.past()
    } );
    await newActivity.save();
    activityList.push( newActivity );
  }
  return activityList;
}

function getRandomActivityType () {
  const activityList = [
    "Running",
    "Cycling",
    "Swimming",
    "Weightlifting",
    "Yoga",
    "Hiking",
    "Boxing",
    "Pilates",
    "Rowing",
    "Dancing",
    "Martial Arts",
    "Jumping Rope"
  ];
  const randomIndex = Math.floor( Math.random() * activityList.length );
  return activityList[ randomIndex ];
}

// Функция для генерации таргета в зависимости от типа цели
const generateTargetByType = ( type ) => {
  switch ( type ) {
    case "lose_weight":
      return faker.random.arrayElement( [ "Lose 5-10 pounds", "Lose 10-20 pounds", "Lose 20+ pounds" ] );
    case "build_muscle":
      return faker.random.arrayElement( [ "Gain 5-10 pounds of muscle", "Gain 10-20 pounds of muscle", "Gain 20+ pounds of muscle" ] );
    case "get_healthier":
      return faker.random.arrayElement( [ "Improve overall health", "Lower blood pressure", "Lower cholesterol levels" ] );
    case "improve_endurance":
      return faker.random.arrayElement( [ "Run 5k in under 30 minutes", "Run 10k in under 1 hour", "Run a half marathon" ] );
    case "increase_flexibility":
      return faker.random.arrayElement( [ "Touch toes without bending knees", "Perform splits", "Improve backbend" ] );
    case "reduce_stress":
      return faker.random.arrayElement( [ "Practice meditation daily", "Take regular breaks during work hours", "Spend more time in nature" ] );
    case "improve_balance":
      return faker.random.arrayElement( [ "Stand on one foot for 30 seconds", "Improve yoga balance poses", "Try slacklining" ] );
    case "boost_energy":
      return faker.random.arrayElement( [ "Get 8 hours of sleep each night", "Incorporate more fruits and vegetables into diet", "Start regular exercise routine" ] );
    default:
      return "No target specified"; // Возвращаем значение по умолчанию, если тип цели не определен
  }
};


async function createGoals ( amount, users ) {
  const goalsList = [];
  const goalTypes = [
    "lose_weight",
    "build_muscle",
    "get_healthier",
    "improve_endurance",
    "increase_flexibility",
    "reduce_stress",
    "improve_balance",
    "boost_energy"
  ];

  for ( let i = 0; i < amount; i++ ) {
    const randomUser = users[ Math.floor( Math.random() * users.length ) ];
    const randomType = faker.random.arrayElement( goalTypes ); // Выбираем случайный тип цели из списка
    const randomTarget = generateTargetByType( randomType ); // Генерируем цель в зависимости от выбранного типа
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

async function createStepCounts ( amount, users ) {
  const stepCountsList = [];
  for ( let i = 0; i < amount; i++ ) {
    const randomUser = users[ Math.floor( Math.random() * users.length ) ];
    const newStepCount = new StepCount( {
      userId: randomUser._id,
      date: faker.date.recent(),
      count: faker.random.number( { min: minSteps, max: maxSteps } )
    } );
    await newStepCount.save();
    stepCountsListList.push( newStepCount );
  }
  return stepCountsList;
}
seedDB();

// async function createGoals ( amount, users ) {
//   const goalsList = [];
//   for ( let i = 0; i < amount; i++ ) {
//     const randomUser = users[ Math.floor( Math.random() * users.length ) ];
//     const newGoal = new Goal( {
//       userId: randomUser._id, 
//       type: { type: String, required: true },
//       target: { type: Number, required: true },
//       createdAt: { type: Date, default: Date.now }

//     } );
//     await newGoal.save();
//     goalList.push( newGoal );
//   }
//   const randomIndex = Math.floor( Math.random() * goalsList.length );
//   return goalsList[ randomIndex ];
// }

// async function createActivities ( amount ) {
//   const activitiesList = []
//   for ( let i = 0; i < amount; i++ ) {
//     const newActivity = new Activity( {
//       username: faker.internet.userName(),
//       age: faker.number.binary( { min: 0, max: 140 } ),
//       email: faker.internet.email(),
//       password: faker.internet.password( { length: 15 } )

//        userId: { type: mongoose.Schema.Types.ObjectId, ref: 'users', required: true },
//       type: { type: String, required: true },
//       startTime: { type: Date, required: true },
//       duration: { type: Number, required: true },
//       distance: { type: Number, required: true },
//       caloriesBurned: { type: Number, required: true },
//       createdAt: { type: Date, default: Date.now }
//     } )
//     await newUser.save()
//     usersList.push( newUser )
//     // console.log(`New user - ${newUser.username} - has been created.`)
//   }
//   // console.log(`${amount} users has been seeded.`)
//   return usersList
// }

seedDB();
