# Fitness Tracker API Documentation

## Description
The Fitness Tracker API allows users to track their activities, step counts, and set goals to achieve fitness targets. It provides endpoints to manage user accounts, record activities, monitor step counts, and set goals. With this API, developers can build applications to help users stay fit and achieve their fitness goals.

## Models

### Activity
Represents an activity tracked by the Fitness Tracker.

- `userId` (Object ID): The ID of the user who performed the activity. Required.
- `type` (String): The type of activity. Required.
- `startTime` (Date): The start time of the activity. Required.
- `duration` (Number): The duration of the activity in minutes. Required.
- `caloriesBurned` (Number): The number of calories burned during the activity. Required.
- `createdAt` (Date): The date and time when the activity was created. Defaults to the current date and time.

### User
Represents a user of the Fitness Tracker.

- `username` (String): The username of the user. Required.
- `email` (String): The email address of the user. Required.
- `password` (String): The hashed password of the user. Required.
- `createdAt` (Date): The date and time when the user was created. Defaults to the current date and time.

### StepCount
Represents the step count data tracked by the Fitness Tracker.

- `userId` (Object ID): The ID of the user for whom the step count is recorded. Required.
- `date` (Date): The date for which the step count is recorded. Required.
- `count` (Number): The number of steps recorded for the specified date. Required.

### Goal
Represents a goal set by a user in the Fitness Tracker.

- `userId` (Object ID): The ID of the user who set the goal. Required.
- `type` (String): The type of goal. Required.
- `target` (String): The target set for the goal. Required.
- `createdAt` (Date): The date and time when the goal was created. Defaults to the current date and time.

# Endpoint Structure

The base URL for the Fitness Tracker API is `http://localhost:3000/api/`.

## /activities

Retrieve information about activities.

-  `GET /activities/all` Retrieve all activities.

- `GET /activities?page={}&limit={}` Retrieve activities with pagination.

- `GET /activities?page=2&limit=10&sortField=name&sortOrder=asc` Retrieve sorted activities with pagination and ascending order.

- `GET /activities?byType={type}` Retrieve activities by type.

- `GET /activities?userId={userId}&byType={type}` Retrieve activities for a specific user by type.

- `GET /activities?userId={userId}1&minCalories={Na}&maxCalories={Na}` Retrieve activities for a specific user by burned calories.

- `GET /activities?userId={userId}&startDate={YYYY-MM-DD}&endDate={YYYY-MM-DD}` Retrieve activities for a specific user by date of creation.

- `GET /activities?userId={userId}&startTimeBefore={YYYY-MM-DD}&startTimeAfter={YYYY-MM-DD}` Retrieve activities for a user by the date of start.

- `GET /activities?userId={userId}&minMinutes={Na}&maxMinutes={Na}` Retrieve activities for a user by duration.

- `PUT /activities/{userId}` Update an activity.

- `POST /activities` Create a new activity.

- `DELETE /activities/{userId}`  Remove an activity.

## /users 

Retrieve information about users.

-  `GET /users/all` Retrieve all users.

- `GET /users?page={}&limit={}` Retrieve users with pagination.

- `GET /users?page={Na}&limit={Na}&sortField={name}&sortOrder=asc` Retrieve sorted users with pagination and ascending order.

- `GET /users/{userId}`  Retrieve a user by Id.

- `GET /users/email/{email}` Retrieve a user by email.

- `GET /users/username/{username}` Retrieve a user by username.

- `GET /users/partOfUsername/{part of name}` Retrieve users by part of username.

- `GET /users/createdAt/YYYY-MM-DD` Retrieve users by date of account creation.

- `GET /users/createdAt/YYYY-MM-DD/YYYY-MM-DD` Retrieve users by date of account creation in certain period of time.

- `PUT /users/{userId}` Update a user.

- `POST /users` Create a new user.

- `DELETE /users/{userId}`  Remove a user.

## /goals 

Retrieve information about goals.

-  `GET /goals/all` Retrieve all goals.

- `GET goals?page={}&limit={}` Retrieve goals with pagination.

- `GET /goals?page={Na}&limit={Na}&sortField={name}&sortOrder=asc` Retrieve sorted goals with pagination and ascending order.

- `GET goals/{Id}`  Retrieve a goal by Id.

- `GET /goals/user/{userId}` Retrieve goals for a spesific user.

- `GET /goals/user/{userId}/{type_name}` Retrieve goals for specific user by type.

- `GET /goals/user/{userId}/createdAt/YYYY-MM-DD/YYYY-MM-DD` Retrieve goals for specific user by date of creation in certain period of time.

- `PUT /goals/{_id}` Update a goal.

- `POST /goals` Create a new goal.

- `DELETE /goals/{_id}`  Remove a goal.

## /stepCounts 

Retrieve information about step counts.

-  `GET /stepCounts` Retrieve all step counts.

- `GET stepCounts/{_id}`  Retrieve a step count by Id.

- `GET /stepCounts/user/{userId}` Retrieve step counts for a spesific user.

- `GET /stepCounts/user/{userId}/date/YYYY-MM-DD/YYYY-MM-DD` Retrieve step counts for specific user by date of creation in certain period of time.

- `PUT /stepCounts/{_id}` Update a step count.

- `POST /stepCounts` Create a step count.

- `DELETE /stepCounts/{_id}`  Remove a step count.

## /stepCounts 

Retrieve information about step counts.

### Endpoints:

- **GET /stepCounts**  
  Retrieve all step counts.

- **GET stepCounts/{_id}**  
  Retrieve a step count by Id.

- **GET /stepCounts/user/{userId}**  
  Retrieve step counts for a specific user.

- **GET /stepCounts/user/{userId}/date/YYYY-MM-DD/YYYY-MM-DD**  
  Retrieve step counts for a specific user by date of creation in a certain period of time.

- **PUT /stepCounts/{_id}**  
  Update a step count.

- **POST /stepCounts**  
  Create a step count.

- **DELETE /stepCounts/{_id}**  
  Remove a step count.

### Parameters:

- **userId:** The unique identifier of the user.
- **date:** The date of the step count record.

### Examples:

- Retrieve step counts for a specific user in a certain period of time:
  - `GET {{Host}}/stepCounts/user/661e330cbca6df6cdde0b7df/2024-04-01/2024-04-30`

- Retrieve a specific step count by ID:
  - `GET {{Host}}/stepCounts/661e330dbca6df6cdde0b801`

### Response Example:

```json
{
    "_id": "661e330dbca6df6cdde0b801",
    "userId": "661e330cbca6df6cdde0b7df",
    "date": "2024-04-16T03:23:42.984Z",
    "count": 17726,
    "__v": 0
}
