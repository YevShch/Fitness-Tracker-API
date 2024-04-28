## Manual Testing Documentation
Access the Postman collection for API testing at the following link: [Postman Collection](https://universal-trinity-236527-1.postman.co/workspace/Team-Workspace~f02dc3c9-cf61-4a68-859f-12f952372c2e/collection/33841208-94536aae-954b-41dd-a659-31841f79e949?action=share&creator=33841208)

### Manual Test 1: Verify HTTP Status Code for GET Request
#### Purpose
To ensure that the API returns the correct HTTP status code (e.g., 200 OK) for a successful GET request.
#### Steps:
1. Send a GET request to `http://localhost:3000/api/activities`.
#### Expected Result
Status code should be: 200 OK
#### Actual Result
Status code: 200 OK
#### Test Notes
- Test Name: Verify HTTP Status Code for GET Request
- Location: /Manual tests [ Verify HTTP Status Code for GET Request](https://universal-trinity-236527-1.postman.co/workspace/Team-Workspace~f02dc3c9-cf61-4a68-859f-12f952372c2e/request/33841208-4acfd850-7917-4d0f-8309-946f443619ad)

### Manual Test 2. Verify API Response Data Format for JSON
#### Objective
Confirm that the API returns data in the expected format.
#### Steps to Test
1. Send a GET request to `http://localhost:3000/api/stepCounts/661e330dbca6df6cdde0b7ff` 
and check if the response format matches the expected format JSON.
#### Expected Result
The response data should be formatted as JSON.
#### Actual Result
The response data is formatted as JSON.
```json
{
    "_id": "661e330dbca6df6cdde0b7ff",
    "userId": "661e330cbca6df6cdde0b7e1",
    "date": "2024-04-15T09:02:28.556Z",
    "count": 25285,
    "__v": 0
}
```
#### Test Notes
- Test Name: Verify API Response Data Format for JSON
- Location: /Manual tests [Verify API Response Data Format for JSON](https://universal-trinity-236527-1.postman.co/workspace/Team-Workspace~f02dc3c9-cf61-4a68-859f-12f952372c2e/request/33841208-2cffdeed-e3e6-4374-922c-0f0c7b6cdf62) 

### Manual Test 3: Verify Correct HTTP Status Code for Invalid Request
#### Purpose
To ensure that the API returns the correct HTTP status code (e.g., 400 Bad Request) for an invalid request.
#### Steps:
1. Send an invalid request to `http://localhost:3000/api/stepCounts/invalid_id`
2. Inspect the response to verify the returned HTTP status code.
#### Expected Result
The API should return a status code of 400 Bad Request
#### Actual Result
The API returns status code 400 Bad Request.
```json
{
    "message": "Invalid ID"
}
```
#### Test Notes
- Test Name: Verify Correct HTTP Status Code for Invalid Request
- Location: /Manual tests [Verify Correct HTTP Status Code for Invalid Request](https://universal-trinity-236527-1.postman.co/workspace/Team-Workspace~f02dc3c9-cf61-4a68-859f-12f952372c2e/request/33841208-430255cf-e27e-44fa-b5bc-ca0373afb888)

### Manual Test 4: Test API with Specific Filters
#### Purpose
To verify that the API returns the correct data when querying with specific filters or search criteria.
#### Steps:
1. Send a GET request to the endpoint `http://localhost:3000/api/activities` with specific filters included in the query parameters.
   - Example: `api/activities?userId=661e34c0aa109d60e825718c&minMinutes=20&maxMinutes=101`
#### Expected Result
The API should return activities that match the specified criteria:
- User ID should matche '661e34c0aa109d60e825718c'.
- Duration of activities should fall within the range of 20 to 101 minutes.
#### Actual Result
- The API returns activities that meet the specified filter criteria.
- The response contains activities where the user ID matches '661e34c0aa109d60e825718c' and the duration falls within the specified range.
#### Test Notes
- Test Name: Test API with Specific Filters
- Location: /Manual Tests [Test API with Specific Filters](https://universal-trinity-236527-1.postman.co/workspace/Team-Workspace~f02dc3c9-cf61-4a68-859f-12f952372c2e/request/33841208-9f38c366-35d1-42ba-8cff-31d60b118cd4)

### Manual Test 5: Verify API Pagination
#### Purpose
To verify that the API returns paginated results when a large number of records are requested.
#### Steps:
1. Send a GET request to the endpoint `api/goals` with pagination parameters included in the query string.
   - Example: `api/goals?page=2&limit=5`
#### Expected Result
The API returns paginated results according to the specified pagination parameters:
- Page 2 of the results should be returned.
- Each page should contain a maximum of 5 records.
#### Actual Result
- The API returns paginated results as expected.
- Page 2 of the results is returned, with 5 records per page.
#### Test Notes
- Test Name: Verify API Pagination
- Location: /Manual Tests [Verify API Pagination](https://universal-trinity-236527-1.postman.co/workspace/Team-Workspace~f02dc3c9-cf61-4a68-859f-12f952372c2e/request/33841208-cd006d42-31cb-426e-bc83-2962c935955e)

### Manual Test 6: Check API Handling of Special Characters and Non-English Text
#### Purpose
To verify that the API correctly handles special characters and non-English text in input data.
#### Steps:
1. Send a PUT request to the endpoint `http://localhost:3000/api/goals/661e34c6aa109d60e8257260` with input data containing special characters and non-English text.
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
- Location: /Manual Tests [Handling of Special Characters and Non-English Text](https://universal-trinity-236527-1.postman.co/workspace/Team-Workspace~f02dc3c9-cf61-4a68-859f-12f952372c2e/request/33841208-59f64e7a-17b8-4da3-b3dc-208089a14527)

### Manual Test 7: Test API Response with Concurrent Requests
#### Purpose
To ensure that the API can handle multiple users and maintain data consistency when receiving concurrent requests.
#### Steps:
1. Open multiple tabs in Postman and send requests simultaneously, 5 requests per URL
   - Example requests:
     - POST request to create a new activity: `http://localhost:3000/api/activities`
     - PUT request to update an existing goal: `http://localhost:3000/api/goals/661e34c6aa109d60e8257258`
     - GET request to fetch all goals: `http://localhost:3000/api/goals`
#### Expected Result
The API should handle the concurrent requests gracefully and maintain data consistency. Specifically:
- Requests should be processed concurrently without data corruption or loss.
- Data should remain consistent across all requests, with no unexpected changes or inconsistencies.
#### Actual Result
- The API successfully handles concurrent requests without errors or data inconsistencies.
- Data remains consistent across all requests, with no unexpected changes.
#### Test Notes
- Test Name: Test API Response with Concurrent Requests
- Location: /Manual Tests/[Concurrent Requests](https://universal-trinity-236527-1.postman.co/workspace/Team-Workspace~f02dc3c9-cf61-4a68-859f-12f952372c2e/folder/33841208-9be7b922-4a35-4707-8a1a-8a2209e304e3)

### Manual Test 8: Test API Handling of Different HTTP Methods
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
- Location: /Manual Tests/HTTP Methods Handling[Test API Handling of Different HTTP Methods](https://universal-trinity-236527-1.postman.co/workspace/Team-Workspace~f02dc3c9-cf61-4a68-859f-12f952372c2e/folder/33841208-b4e848e9-0e40-4b67-a73e-6a9c3b165389)

### Manual Test 9: Test API Handling of Record Updates

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
- The API should update the existing record with the new data and return a status code 200 OK. 
- The updated record should reflect the changes made.
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
- Location: /Manual Tests/[Record Updates Handling ](https://universal-trinity-236527-1.postman.co/workspace/Team-Workspace~f02dc3c9-cf61-4a68-859f-12f952372c2e/folder/33841208-0bec45b9-4143-4d3b-8210-242180283512)

### Manual Test 10: Test API Performance Under Heavy Load
#### Purpose
Test the API’s performance under heavy load, simulating a large number of users making requests simultaneously.
#### Steps:
1. Create a collection with multiple GET requests.
2. Run the collection with 100 iterations in the Postman Runner.
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
- Location: /Manual Tests/[Test API Performance](https://universal-trinity-236527-1.postman.co/workspace/Team-Workspace~f02dc3c9-cf61-4a68-859f-12f952372c2e/folder/33841208-0ef4e86c-27bd-465d-a3f3-56c3d7e8a09a)

### Manual Testing 11: Verify API Recovery from Failures
#### Purpose
To verify that the API can recover gracefully from failures, such as database connection issues, without compromising data integrity.
#### Steps:
1. Introduce a simulated database connection issue (stop the database service).
2. Send a request to the API endpoint that requires database access - `http://localhost:3000/api/stepCounts/661e330dbca6df6cdde0b803`
3. Observe the API's response.
#### Expected Result
The API should handle the database connection issue gracefully, returning an appropriate error response without compromising data integrity.
#### Actual Result
- The API returned an appropriate error response indicating the database connection issue.
- Data integrity was maintained; no data corruption or loss occurred.
#### Test Notes
- Test Name: Verify API Recovery from Failures
- Location: /Manual Tests [Disconnect](https://universal-trinity-236527-1.postman.co/workspace/Team-Workspace~f02dc3c9-cf61-4a68-859f-12f952372c2e/request/33841208-62e2b2ec-e172-47f4-bddd-3cf11ac0b05a)

### Manual Test 12: Test the API’s ability to handle edge cases
#### Purpose
To verify that the API handles edge cases, such as requests with missing or invalid parameters, and returns appropriate error messages.
#### Steps:
1. Send a POST request to `http://localhost:3000/api/users` with missing `username` parameter.
  Example body request:
```json
{
"email": "fytrudk@gmail.com",
"password": "ctb725RfgdRfLlNMD",
"createdAt": "2024-03-20T20:18:36.823Z"
}
```
2. Send a POST request to `http://localhost:3000/api/users` with missing `email` parameter.
3. Send a POST request to `http://localhost:3000/api/users` with missing `password` parameter.
4. Send a POST request to `http://localhost:3000/api/users` with invalid email format.
5. Send a POST request to `http://localhost:3000/api/users` with a duplicate email value.

#### Expected Result
Each request should return the appropriate error message for the specific edge case.

#### Actual Results
- Request 1: Error message returned for missing `username` parameter.
 ```json
{
    "message": "Missing required field(s): username"
}
 ```
- Request 2: Error message returned for missing `email` parameter.
 ```json
{
     "message": "Missing required field(s): email"
}
 ```
- Request 3: Error message returned for missing `password` parameter.
 ```json
{
   "message": "Missing required field(s): password"
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
- Location: /Manual Tests/[Edge cases](https://universal-trinity-236527-1.postman.co/workspace/Team-Workspace~f02dc3c9-cf61-4a68-859f-12f952372c2e/folder/33841208-6442b464-a167-4925-adfc-6f3d6df8a8fd)

### Manual Test 13: Verify API Rate Limiting
#### Purpose
To ensure that the API correctly implements rate limiting to prevent abuse or excessive use of resources.
#### Steps:
1. Send multiple requests to an endpoint within a short time frame - `http://localhost:3000/api/users/username/Natasha11`
2. Observe the API's response to each request.
#### Expected Result
The API should limit the number of requests allowed within the specified time frame and return an appropriate error response (e.g., status code 429 - Too Many Requests) when the limit is exceeded.
#### Actual Result
- Requests beyond the allowed limit were met with an appropriate error response (status code 429).
- The API prevented abuse or excessive use of resources effectively.
#### Test Notes
- Test Name: Verify API Rate Limiting
- Location: /Manual Tests/[API Rate Limiting Test](https://universal-trinity-236527-1.postman.co/workspace/Team-Workspace~f02dc3c9-cf61-4a68-859f-12f952372c2e/request/33841208-e5442f64-3cfb-4910-97b2-0f150b248db2)

