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

- `PUT /api/activities/{userId}` Update an activity.

- `POST /api/activities` Create a new activity.

- `DELETE /api/activities/{userId}`  Remove an activity.
