## Automated Testing Documentation
Access the Postman collection for API testing at the following link: [Postman Collection](https://universal-trinity-236527-1.postman.co/workspace/Team-Workspace~f02dc3c9-cf61-4a68-859f-12f952372c2e/collection/33841208-94536aae-954b-41dd-a659-31841f79e949?action=share&creator=33841208)

### Test 1: Verify HTTP Status Code for GET Request
#### Purpose
To ensure that the API returns the correct HTTP status code (e.g., 200 OK) for a successful GET request.
#### Steps:
1. Send a GET request to `/api/activities`.
#### Expected Result
Status code: 200 OK
#### Actual Result
Status code: 200 OK
#### Test Notes
- Test Name: 1A. HTTP Status Code Validation
- Location: /Automated Tests

### Test 2. Verify API Response Data Format for JSON
#### Objective
Confirm that the API returns data in the expected format.
#### Steps to Test
1. Send a GET request to `/api/activities/661e330cbca6df6cdde0b7e5` 
and check if the response format matches the expected format JSON.
#### Expected Result
The response data is formatted as JSON.
#### Actual Result
The response data is formatted as JSON.
```json
{
    "_id": "661e330cbca6df6cdde0b7e5",
    "userId": "661e330cbca6df6cdde0b7e1",
    "type": "Cycling",
    "startTime": "2024-04-16T02:43:26.385Z",
    "duration": 221,
    "caloriesBurned": 444,
    "createdAt": "2024-04-16T03:33:39.290Z",
    "__v": 0
}
```
#### Test Notes
- Test Name: 2A. Data Format Validation
- Location: /Automated Tests  

### Test 3: Verify Correct HTTP Status Code for Invalid Request
#### Purpose
To ensure that the API returns the correct HTTP status code for an invalid request.
#### Steps:
1. Send an invalid request to `api/users/username/invalid_username`
2. Inspect the response to verify the returned HTTP status code.
#### Expected Result
The API returns status code 404 Not found.
#### Actual Result
The API returns status code 404 Not found.
```json
{
    "message": "User - invalid_username not found"
}
```
#### Test Notes
- Test Name: 3A. Verify Correct HTTP Status Code for Invalid Requests
- Location: /Automated Tests

### Test 4: Test API with Specific Filters
#### Purpose
To verify that the API returns the correct data when querying with specific filters or search criteria.
#### Steps:
1. Send a GET request to the endpoint `api/goals` with specific filters included in the query parameters.
   - Example: `/api/goals/user/661e34c1aa109d60e8257190/createdAt/2024-01-01/2024-05-01`
#### Expected Result
 The API returns goals that match the specified criteria:
Each goal has the following properties:
- _id: Unique identifier for the goal.
- userId: Matches '661e34c1aa109d60e8257190'.
- type: Type of the goal.
- target: Target or objective of the goal.
- createdAt: Date and time when the goal was created.
- The createdAt property of each goal falls within the range of '2024-01-01' to '2024-05-01'.
#### Actual Result
- The API returns goals that meet the specified filter criteria.
- Each goal in the response contains the required properties.
- The createdAt property of each goal is within the specified range.
#### Test Notes
- Test Name: 4A. Validate API Response with Specific Filters
- Location: /Automated Tests

### Test 5: Verify API Pagination
#### Purpose
To verify that the API returns paginated results when a large number of records are requested.
#### Steps:
1. Send a GET request to the endpoint `api/goals` with pagination parameters included in the query string.
   - Example: `api/goals?page=2&limit=5`
#### Expected Result
The API returns paginated results according to the specified pagination parameters:
- Page 2 of the results is returned.
- Each page contains a maximum of 5 records.
#### Actual Result
- The API returns paginated results as expected.
- Page 2 of the results is returned, with 5 records per page.
#### Test Notes
- Test Name: 5A. Verify Paginated Results for Large Number of Records
- Location: /Automated Tests  [Automated Tests #5](https://universal-trinity-236527-1.postman.co/workspace/Team-Workspace~f02dc3c9-cf61-4a68-859f-12f952372c2e/request/33841208-505e74e2-27cc-42d7-80bc-f932d1769d24?active-environment=c134afa8-911a-452d-bae2-c7bf63ae73dc)

# To Fix

### Test 6: Check API Handling of Special Characters and Non-English Text
#### Purpose
To verify that the API correctly handles special characters and non-English text in input data.
#### Steps:
1. Send a PUT request to the endpoint `/api/goals/661e34c6aa109d60e8257260` with input data containing special characters and non-English text.
   - Example body:
     ```json
     {
         "type": "åäöÅÄÖ",
         "target": "!@#$%^&*()_+<com"
     }
     ```
#### Expected Result
The API should handle the input data containing special characters and non-English text without errors. Specifically:
- The API should accept and update the 'type' field containing special characters and non-English text.
- The API should accept and update the 'target' field containing special characters.
#### Actual Result
- The API successfully handles the input data with special characters and non-English text.
- The 'type' field is updated with the provided value containing special characters and non-English text.
- The 'target' field is updated with the provided value containing special characters.
#### Test Notes
- Test Name: Handling of Special Characters and Non-English Text
- Location: /Manual Tests

### Test 7: Test API Response with Concurrent Requests
#### Purpose
To ensure that the API can handle multiple users and maintain data consistency when receiving concurrent requests.
#### Steps:
1. Send multiple concurrent requests to the API endpoints that involve data manipulation (e.g., creating, updating, deleting).
   - Example requests:
     - POST request to create a new user: `POST /api/users`
     - PUT request to update an existing user: `PUT /api/users/{userId}`
     - DELETE request to delete a user: `DELETE /api/users/{userId}`
#### Expected Result
The API should handle the concurrent requests gracefully and maintain data consistency. Specifically:
- Requests should be processed concurrently without data corruption or loss.
- Data should remain consistent across all requests, with no unexpected changes or inconsistencies.
#### Actual Result
- The API successfully handles concurrent requests without errors or data inconsistencies.
- Data remains consistent across all requests, with no unexpected changes.
#### Test Notes
- Test Name: Test API Response with Concurrent Requests
- Location: /Manual Tests/Concurrent Requests

### Test 8: Test API Handling of Different HTTP Methods
#### Purpose
To verify that the API correctly handles different HTTP methods (GET, POST, PUT, DELETE) for each endpoint and returns appropriate status codes and responses for each method.
#### Steps:
1. Create a collection for the tests.
1. Send a GET request to each endpoint and verify that the API returns the expected data.
2. Send a POST request to each endpoint with valid data and verify that the API creates new resources as expected.
3. Send a PUT request to each endpoint with valid data and verify that the API updates existing resources as expected.
4. Send a DELETE request to each endpoint and verify that the API deletes resources as expected.
#### Expected Result
For each HTTP method and endpoint:
- GET: The API should return the expected data and status code (e.g., 200 OK).
- POST: The API should create a new resource and return a status code indicating success (e.g., 201 Created).
- PUT: The API should update an existing resource and return a status code indicating success (e.g., 200 OK).
- DELETE: The API should delete the specified resource and return a status code indicating success (e.g., 200 OK).
#### Actual Result
- GET: The API returns the expected data and status codes 200 OK for each endpoint.
- POST: The API successfully creates new resources and returns status codes 201.
- PUT: The API successfully updates existing resources and returns status codes 200.
- DELETE: The API successfully deletes resources and returns status codes 200.
#### Test Notes
- Test Name: Test API Handling of Different HTTP Methods
- Location: /Manual Tests/HTTP Methods Handling

### Test 9: Test API Handling of Record Updates

#### Purpose
To verify that the API correctly handles updates to existing records, ensuring that changes are saved and reflected in subsequent requests.
#### Steps:
1. Create a collection for the tests.
2. Send a GET request to the endpoint to retrieve the existing record -  `api/goals/661e34c6aa109d60e8257250`
3. Note down the current state of the record. 
4. Send a PUT request to update the record with new data - `api/goals/661e34c6aa109d60e8257250`
 ```json
{
    "type": "boost_energy",
    "target": "Incorporate more fruits and vegetables into diet"
}
```
5. Send a GET request again to retrieve the updated record - `api/goals/661e34c6aa109d60e8257250`
6. Compare the updated record with the previous state to ensure that changes are reflected.
#### Expected Result
The API should update the existing record with the new data and return a status code 200 OK. The updated record should reflect the changes made.
#### Actual Result
PUT status code: 200 OK
The API successfully updated the existing record, and the changes were reflected in subsequent requests.
 ```json
{
    "_id": "661e34c6aa109d60e8257250",
    "userId": "661e34c0aa109d60e825717a",
    "type": "boost_energy",
    "target": "Incorporate more fruits and vegetables into diet",
    "createdAt": "2024-01-19T05:12:03.410Z",
    "__v": 0
}
 ```
#### Test Notes
- Test Name: Test API Handling of Record Updates
- Location: /Manual Tests/Record Updates Handling

### Test 10: Test API Performance Under Heavy Load
#### Purpose
Test the API’s performance under heavy load, simulating a large number of users making requests simultaneously.
#### Steps:
1. Create a collection with multiple GET requests.
2. Run the collection with 100 iterations.
#### Expected Result
The API should perform well under heavy load.
#### Actual Result
- All tests returned a status code of 200 OK.
- None of the requests failed.
- Iterations: 100
- All tests: 500
- Average Response Time: 54ms
- Duration: 1 minute 19 seconds 
#### Test Notes
- Test Name: Test API Performance Under Heavy Load
- Location: /Manual Tests/Test API Performance

### Test 11: Verify API Recovery from Failures
#### Purpose
To verify that the API can recover gracefully from failures, such as database connection issues, without compromising data integrity.
#### Steps:
1. Introduce a simulated database connection issue (stop the database service).
2. Send a request to the API endpoint that requires database access - `/api/stepCounts/661e330dbca6df6cdde0b803`
3. Observe the API's response.
#### Expected Result
The API should handle the database connection issue gracefully, returning an appropriate error response without compromising data integrity.
#### Actual Result
- The API returned an appropriate error response indicating the database connection issue.
- Data integrity was maintained; no data corruption or loss occurred.
#### Test Notes
- Test Name: Verify API Recovery from Failures
- Location: /Manual Tests

### Test 12: Test the API’s ability to handle edge cases
#### Purpose
To verify that the API handles edge cases, such as requests with missing or invalid parameters, and returns appropriate error messages.
#### Steps:
1. Send a POST request to `/api/users` with missing `username` parameter.
2. Send a POST request to `/api/users` with missing `email` parameter.
3. Send a POST request to `/api/users` with missing `password` parameter.
4. Send a POST request to `/api/users` with invalid email format.
5. Send a POST request to `/api/users` with a duplicate email value.

#### Expected Result
Each request should return the appropriate error message for the specific edge case.

#### Actual Results
- Request 1: Error message returned for missing `username` parameter.
 ```json
{
    "message": "An error occurred on the server while creating a new user",
    "error": "User validation failed: username: Path `username` is required."
}
 ```
- Request 2: Error message returned for missing `email` parameter.
 ```json
{
    "message": "An error occurred on the server while creating a new user",
    "error": "User validation failed: email: Path `email` is required."
}
 ```
- Request 3: Error message returned for missing `password` parameter.
 ```json
{
    "message": "An error occurred on the server while creating a new user",
    "error": "User validation failed: password: Path `password` is required."
}
 ```
- Request 4: Error message returned for invalid email format.
 ```json
 {
    "message": "Invalid email format"
}
  ```
- Request 5: Error message returned for duplicate email value.
```json
{
    "message": "Email already exists"
}
 ```
#### Test Notes
- Test Name: Verify API Rate Limiting
- Location: /Manual Tests/Edge cases

### Test 13: Verify API Rate Limiting
#### Purpose
To ensure that the API correctly implements rate limiting or throttling mechanisms to prevent abuse or excessive use of resources.
#### Steps:
1. Send multiple requests to an endpoint within a short time frame.
2. Observe the API's response to each request.
#### Expected Result
The API should limit the number of requests allowed within the specified time frame and return an appropriate error response (e.g., status code 429 - Too Many Requests) when the limit is exceeded.
#### Actual Result
- Requests beyond the allowed limit were met with an appropriate error response (status code 429).
- The API prevented abuse or excessive use of resources effectively.
#### Test Notes
- Test Name: Verify API Rate Limiting
- Location: /Manual Tests/API Rate Limiting

