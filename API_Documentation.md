# Fitness Tracker API Documentation 
:muscle: :running: :biking_man: :dancer: :athletic_shoe:
## Description
The Fitness Tracker API allows users to track their activities, step counts, and set goals to achieve fitness targets. It provides endpoints to manage user accounts, record activities, monitor step counts, and set goals. With this API, developers can build applications to help users stay fit and achieve their fitness goals.

## Authentication

While this API currently does not require user authentication for accessing its endpoints, there is potential for authentication to be implemented or further developed in the future to enhance the security of user data.

Authentication can be achieved using access tokens or other authentication mechanisms. This would require clients to include authentication credentials in their requests to access protected endpoints. Typically, these credentials are obtained through a login process, where users provide their username and password to authenticate themselves.


## Models:
Information about the structure of each model in the API helps users utilize the API more effectively and accurately. It allows users to understand the data expected from or provided to the API, validate the correctness of data, perform data manipulations like creation, reading, updating, and deleting, and integrate the API with other services.

### Activity :runner: 
Represents an activity tracked by the Fitness Tracker.
- `userId` (Object ID): The ID of the user who performed the activity. Required.
- `type` (String): The type of activity. Required.
- `startTime` (Date): The start time of the activity. Required.
- `duration` (Number): The duration of the activity in minutes. Required.
- `caloriesBurned` (Number): The number of calories burned during the activity. Required.
- `createdAt` (Date): The date and time when the activity was created. Defaults to the current date and time.

### User :bust_in_silhouette:
Represents a user of the Fitness Tracker.
- `username` (String): The username of the user. Required.
- `email` (String): The email address of the user. Required.
- `password` (String): The hashed password of the user. Required.
- `createdAt` (Date): The date and time when the user was created. Defaults to the current date and time.

### StepCount :footprints:
Represents the step count data tracked by the Fitness Tracker.
- `userId` (Object ID): The ID of the user for whom the step count is recorded. Required.
- `date` (Date): The date for which the step count is recorded. Required.
- `count` (Number): The number of steps recorded for the specified date. Required.

### Goal :dart:
Represents a goal set by a user in the Fitness Tracker.

- `userId` (Object ID): The ID of the user who set the goal. Required.
- `type` (String): The type of goal. Required.
- `target` (String): The target set for the goal. Required.
- `createdAt` (Date): The date and time when the goal was created. Defaults to the current date and time.

## Endpoint Structure

The base URL for the Fitness Tracker API is `http://localhost:3000/api/`.

## /activities
Retrieve information about activities.
-  `GET /activities/all` Retrieve all activities.
- `GET /activities?page={pageNumber}&limit={limitNumber}` Retrieve activities with pagination.
- `GET /activities?page={pageNumber}&limit={limitNumber}&sortField={name}&sortOrder=asc` Retrieve sorted activities with pagination and ascending order.
- `GET /activities?byType={type}` Retrieve activities by type.
- `GET /activities?userId={userId}&byType={type}` Retrieve activities for a specific user by type.
- `GET /activities?userId={userId}1&minCalories={Na}&maxCalories={Na}` Retrieve activities for a specific user by burned calories.
- `GET /activities?userId={userId}&startDate={YYYY-MM-DD}&endDate={YYYY-MM-DD}` Retrieve activities for a specific user by date of creation.
- `GET /activities?userId={userId}&startTimeBefore={YYYY-MM-DD}&startTimeAfter={YYYY-MM-DD}` Retrieve activities for a user by the date of start.
- `GET /activities?userId={userId}&minMinutes={minutesNumber}&maxMinutes={minutesNumber}` Retrieve activities for a user by duration.
- `PUT /activities/{userId}` Update an activity.
- `POST /activities` Create a new activity.
- `DELETE /activities/{userId}`  Remove an activity. 

### "acttivities" parameters:
- **userId:** The unique identifier of the user.
- **type:** The type of the activity.
- **minCalories:** The minimum number of burned calories.
- **maxCalories:** The maximum number of burned calories.
- **startDate:** The start date of the activity.
- **endDate:** The end date of the activity.
- **startTimeBefore:** The start time before a certain date.
- **startTimeAfter:** The start time after a certain date.
- **minMinutes:** The minimum duration of the activity in minutes.
- **maxMinutes:** The maximum duration of the activity in minutes.

## /users 
Retrieve information about users.
-  `GET /users/all` Retrieve all users.
- `GET /users?page={pageNumber}&limit={limitNumber}` Retrieve users with pagination.
- `GET /users?page={pageNumber}&limit={limitNumber}&sortField={name}&sortOrder=asc` Retrieve sorted users with pagination and ascending order.
- `GET /users/{userId}`  Retrieve a user by Id.
- `GET /users/email/{email}` Retrieve a user by email.
- `GET /users/username/{username}` Retrieve a user by username.
- `GET /users/partOfUsername/{part_of_name}` Retrieve users by part of username.
- `GET /users/createdAt/YYYY-MM-DD` Retrieve users by date of account creation.
- `GET /users/createdAt/YYYY-MM-DD/YYYY-MM-DD` Retrieve users by date of account creation in certain period of time.
- `PUT /users/{userId}` Update a user.
- `POST /users` Create a new user.
- `DELETE /users/{userId}`  Remove a user.

### "users" parameters:
- **userId:** The unique identifier of the user.
- **email:** The email address of the user.
- **username:** The username of the user.
- **part of name:** Part of the username for partial matching.
- **createdAt:** The date of the account creation.


## /goals 
Retrieve information about goals.
-  `GET /goals/all` Retrieve all goals.
- `GET goals?page={pageNumber}&limit={limitNumber}` Retrieve goals with pagination.
- `GET /goals?page={pageNumber}&limit={limitNumber}&sortField={name}&sortOrder=asc` Retrieve sorted goals with pagination and ascending order.
- `GET goals/{Id}`  Retrieve a goal by Id.
- `GET /goals/user/{userId}` Retrieve goals for a spesific user.
- `GET /goals/user/{userId}/{type_name}` Retrieve goals for specific user by type.
- `GET /goals/user/{userId}/createdAt/YYYY-MM-DD/YYYY-MM-DD` Retrieve goals for specific user by date of creation in certain period of time.
- `PUT /goals/{_id}` Update a goal.
- `POST /goals` Create a new goal.
- `DELETE /goals/{_id}`  Remove a goal.

### "goals" parameters:
- **_id:** The unique identifier of the goal.
- **userId:** The unique identifier of the user.
- **type_name:** The type of the goal.
- **createdAt:** The date of the goal creation.

## /stepCounts 
Retrieve information about step counts.
-  `GET /stepCounts` Retrieve all step counts.
- `GET stepCounts/{_id}`  Retrieve a step count by Id.
- `GET /stepCounts/user/{userId}` Retrieve step counts for a spesific user.
- `GET /stepCounts/user/{userId}/date/YYYY-MM-DD/YYYY-MM-DD` Retrieve step counts for specific user by date of creation in certain period of time.
- `PUT /stepCounts/{_id}` Update a step count.
- `POST /stepCounts` Create a step count.
- `DELETE /stepCounts/{_id}`  Remove a step count.

### "stepCounts" parameters:
- **userId:** The unique identifier of the user.
- **date:** The date of the step count record.


## Examples for GET, POST, PUT and DELETE requests:

### GET Request Example - Retrieve a specific step count by ID.
  - `GET http://localhost:3000/api/stepCounts/661e330dbca6df6cdde0b801`
### Response Example:
**Status Code:** 200 OK
```json
{
    "_id": "661e330dbca6df6cdde0b801",
    "userId": "661e330cbca6df6cdde0b7df",
    "date": "2024-04-16T03:23:42.984Z",
    "count": 17726,
    "__v": 0
} 
```

### PUT Request Example - Update the user.
  - `PUT http://localhost:3000/api/users/661e34c0aa109d60e825717c`

**Body:**
```json
{
    "username": "Wyman75"
} 
``` 
### Response Example:
**Status Code:** 200 OK
```json
{
    "_id": "661e34c0aa109d60e825717c",
    "username": "Enola84",
    "email": "Sydni.Kiehn3@hotmail.com",
    "password": "t1Uf9guVjvOTyVr",
    "createdAt": "2023-08-30T13:37:28.041Z",
    "__v": 0
}
```

### POST Request Example - Create a new activity.
  - `GET http://localhost:3000/api/activities`

**Body:**
```json
{
"userId": "661e330bbca6df6cdde0b7dc",
"type": "Hiking",
"startTime": "2024-05-16T09:00:45.061Z",
"duration": 104,
"caloriesBurned": 574,
"createdAt": "2024-04-24T03:58:42.652Z"
}
```
### Response Example:
**Status Code:** 201 OK
```json
{
    "userId": "661e330bbca6df6cdde0b7dc",
    "type": "Hiking",
    "startTime": "2024-05-16T09:00:45.061Z",
    "duration": 104,
    "caloriesBurned": 574,
    "createdAt": "2024-04-24T03:58:42.652Z",
    "_id": "66293e4a6b4412fd99994c46",
    "__v": 0
}
```

### DELETE Request Example - Remove the user.
  - `DELETE http://localhost:3000/api/users/661e330cbca6df6cdde0b7e1`

### Response Example:
**Status Code:** 200 OK
```json
{
    "message": "User deleted successfully."
}
```
## Status Codes  
The **Fitness Tracker API** returns the following status codes:
 1. **200 OK**: This status code indicates that the request was successful. The server has processed the request and returned the expected data. For example, when retrieving user information or exercise logs, a successful response will have a status code of 200. 
 2. **201 Created**: This status code is used when a new resource has been successfully created. For example, when adding a new exercise log entry, the server will respond with a 201 status code to indicate that the log has been successfully created.
 3. **404 Not Found**: This status code indicates that the requested resource was not found on the server. For example, if a user tries to retrieve an exercise log that does not exist, the server will respond with a 404 status code. 
 4. **500 Internal Server Error**: This status code indicates that there was an unexpected error on the server side. It is a generic error response for any unhandled exception. If the server encounters an issue while processing a request, it will respond with a 500 status code.
  ## Error Handling 
  In addition to the status codes mentioned above, the **Fitness Tracker API** provides detailed error messages in the response body. When an error occurs, the response will include a JSON object with an "error" field containing relevant information about the error. Clients can use this information to troubleshoot and handle errors appropriately.
  ### Examples error response: 
  ```json 
  { "error": "User not found." }
   ``` 

```json 
  { "error": "An error occurred on the server while fetching users" }
   ``` 
## API Rate Limiting

To maintain the stability and performance of the API, rate limiting is implemented. The current rate limit configuration is set to allow a maximum of **100 requests per IP address within a 15-minute window**. This helps prevent abuse or excessive use of resources, ensuring fair access to all users.
