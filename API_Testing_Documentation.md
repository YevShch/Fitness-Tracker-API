## Manual Testing Documentation

### Manual Test 1: Verify HTTP Status Code for GET Request
#### Purpose
To ensure that the API returns the correct HTTP status code (e.g., 200 OK) for a successful GET request.
#### Steps:
1. Send a GET request to `/api/activities`.
#### Expected Result
Status code: 200 OK
#### Actual Result
Status code: 200 OK
#### Test Notes
- Test Name: Verify HTTP Status Code for GET Request
- Location: /Manual tests 

### Manual Test 2. Verify API Response Data Format for JSON
#### Objective
Confirm that the API returns data in the expected format.
#### Steps to Test
1. Send a GET request to `/api/stepCounts/661e330dbca6df6cdde0b7ff` 
and check if the response format matches the expected format JSON.
#### Expected Result
The response data is formatted as JSON.
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
- Location: /Manual tests  

### Manual Test 3: Verify Correct HTTP Status Code for Invalid Request
#### Purpose
To ensure that the API returns the correct HTTP status code (e.g., 400 Bad Request) for an invalid request.
#### Steps:
1. Send an invalid request to `/api/stepCounts/invalid_id`
2. Inspect the response to verify the returned HTTP status code.
#### Expected Result
The API returns status code 400 Bad Request.
#### Actual Result
The API returns status code 400 Bad Request.
```json
{
    "message": "Invalid ID"
}
```
#### Test Notes
- Test Name: Verify Correct HTTP Status Code for Invalid Request
- Location: /Manual tests 

### Manual Test 4: Test API with Specific Filters
#### Purpose
To verify that the API returns the correct data when querying with specific filters or search criteria.
#### Steps:
1. Send a GET request to the endpoint `api/activities` with specific filters included in the query parameters.
   - Example: `api/activities?userId=661e34c0aa109d60e825718c&minMinutes=20&maxMinutes=101`
#### Expected Result
The API returns activities that match the specified criteria:
- User ID matches '661e34c0aa109d60e825718c'.
- Duration of activities falls within the range of 20 to 101 minutes.
#### Actual Result
- The API returns activities that meet the specified filter criteria.
- The response contains activities where the user ID matches '661e34c0aa109d60e825718c' and the duration falls within the specified range.
#### Test Notes
- Test Name: Test API with Specific Filters
- Location: /Manual Tests

### Manual Test 5: Verify API Pagination
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
- Test Name: Verify API Pagination
- Location: /Manual Tests

### Manual Test 6: Check API Handling of Special Characters and Non-English Text
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

### Manual Test 7: Test API Response with Concurrent Requests
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
- Location: /Manual Tests/HTTP Methods Handling

