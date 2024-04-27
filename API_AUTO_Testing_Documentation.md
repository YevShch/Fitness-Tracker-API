## Automated Testing Documentation
Access the Postman collection for API testing at the following link: [Postman Collection](https://universal-trinity-236527-1.postman.co/workspace/Team-Workspace~f02dc3c9-cf61-4a68-859f-12f952372c2e/collection/33841208-94536aae-954b-41dd-a659-31841f79e949?action=share&creator=33841208)

### Test 1: Verify HTTP Status Code for GET Request
#### Purpose
To ensure that the API returns the correct HTTP status code (e.g., 200 OK) for a successful GET request.
 #### Steps:
1. Send a GET request to `http://localhost:3000/api/activities`.
2. #### Expected Result
Status code: 200 OK
#### Actual Result
Status code: 200 OK
#### Test Notes
- Test Name: 1A. HTTP Status Code Validation
- Location: /Automated  [Automated Test #1](https://universal-trinity-236527-1.postman.co/workspace/Team-Workspace~f02dc3c9-cf61-4a68-859f-12f952372c2e/request/33841208-6b9cabff-f43b-4aeb-a6af-53b8ce06baea?tab=tests)


### Test 2. Verify API Response Data Format for JSON
#### Purpose
Confirm that the API returns data in the expected format.
#### Steps to Test
1. Send a GET request to `http://localhost:3000/api/activities/661e330cbca6df6cdde0b7e5` 
and check if the response format matches the expected format JSON.
#### Expected Result
The response data shoud be formatted as JSON.
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
- Location: /Automated Tests [Automated Test #2](https://universal-trinity-236527-1.postman.co/workspace/Team-Workspace~f02dc3c9-cf61-4a68-859f-12f952372c2e/request/33841208-f112ac8e-e839-48b6-981c-459b4e1d849a?tab=tests) 


### Test 3: Verify Correct HTTP Status Code for Invalid Request
#### Purpose
To ensure that the API returns the correct HTTP status code for an invalid request.
#### Steps:
1. Send an invalid request to `http://localhost:3000/api/users/username/invalid_username`
2. Inspect the response to verify the returned HTTP status code.
#### Expected Result
The API should return status code 404 Not found.
#### Actual Result
The API returns status code 404 Not found.
```json
{
    "message": "User - invalid_username not found"
}
```
#### Test Notes
- Test Name: 3A. Verify Correct HTTP Status Code for Invalid Requests
- Location: /Automated Tests [Automated Test #3](https://universal-trinity-236527-1.postman.co/workspace/Team-Workspace~f02dc3c9-cf61-4a68-859f-12f952372c2e/request/33841208-fa491968-6cf3-4820-b59d-e8a55f6da8ef?tab=tests)


### Test 4: Test API with Specific Filters
#### Purpose
To verify that the API returns the correct data when querying with specific filters or search criteria.
#### Steps:
1. Send a GET request to the endpoint `http://localhost:3000/api/goals` with specific filters included in the query parameters.
   - Example: `http://localhost:3000/api/goals/user/661e34c1aa109d60e8257190/createdAt/2024-01-01/2024-05-01`
#### Expected Result
The API should return goals that match the specified criteria:
Each goal should have the following properties:
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
- Location: /Automated Tests [Automated Test #4](https://universal-trinity-236527-1.postman.co/workspace/Team-Workspace~f02dc3c9-cf61-4a68-859f-12f952372c2e/request/33841208-02581d59-65fd-4248-8f24-f7e696632c7f?tab=tests)


### Test 5: Verify API Pagination
#### Purpose
To verify that the API returns paginated results when a large number of records are requested.
#### Steps:
1. Send a GET request to the endpoint `http://localhost:3000/api/goals` with pagination parameters included in the query string.
   - Example: `http://localhost:3000/api/goals?page=2&limit=5`
#### Expected Result
The API should return paginated results according to the specified pagination parameters:
- Page 2 of the results should be returned.
- Each page should contain a maximum of 5 records.
#### Actual Result
- The API returns paginated results as expected.
- Page 2 of the results is returned, with 5 records per page.
#### Test Notes
- Test Name: 5A. Verify Paginated Results for Large Number of Records
- Location: /Automated Tests  [Automated Tests #5](https://universal-trinity-236527-1.postman.co/workspace/Team-Workspace~f02dc3c9-cf61-4a68-859f-12f952372c2e/request/33841208-505e74e2-27cc-42d7-80bc-f932d1769d24?tab=tests)


### Test 6: Check API Handling of Special Characters and Non-English Text
#### Purpose
To verify that the API correctly handles special characters and non-English text in input data.
#### Steps:
1. Send a POST request to the endpoint `http://localhost:3000/api/goals/661e330bbca6df6cdde0b7dc` with input data containing special characters and non-English text.
   - Example body:
     ```json
    {
    "userId": "661e330bbca6df6cdde0b7dc",
    "type": "åäöÅÄÖ",
     "target": "!@#$%^&*()_+<com",
     "createdAt": "2023-07-04T00:16:07.218Z"
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
```json
{
    "userId": "661e330bbca6df6cdde0b7dc",
    "type": "åäöÅÄÖ",
    "target": "!@#$%^&*()_+<com",
    "createdAt": "2023-07-04T00:16:07.218Z",
    "_id": "662bfafedfddaefc7e4443f3",
    "__v": 0
}
```
#### Cleanup
Delete the created user by sending a DELETE request to the endpoint http://localhost:3000/api/goals/{goalsId}.
#### Test Notes
- Test Name: 6A. Test Handling of Special Characters and Non-English Text
- Location: /Automated Tests [Automated Test #6](https://universal-trinity-236527-1.postman.co/workspace/Team-Workspace~f02dc3c9-cf61-4a68-859f-12f952372c2e/request/33841208-7de4d05e-6757-4a4c-ab28-507429183a0e)


### Test 7: Test API Response with Concurrent Requests
#### Purpose
To ensure that the API can handle multiple users and maintain data consistency when receiving concurrent requests.
#### Steps:
1. Open the terminal in your Visual Studio Code environment.
2. Navigate to the directory containing the parallelRequests.js file.
3. Run the script using the command node parallelRequests.js
```bash
node parallelRequests.js.
```
4. Monitor the terminal for any errors or messages.
5. Ensure that the script is connected to the local server running on localhost:3000.
6. Observe the responses logged in the terminal.
#### Expected Result
- The script sends five parallel POST requests to the API endpoint /api/goals.
- Each request contains data to create a goal for the same user with the provided details: userId, type, target, and createdAt.
- The API successfully handles the concurrent requests without errors.
- All requests result in successful responses from the API, indicating that the goals were created.
- Each response contains information about the created goal, including userId, type, target, createdAt, and other relevant fields.
- The responses demonstrate that the API maintains data consistency and accurately creates goals for the specified user.
#### Actual Result
-The test script successfully sent five parallel requests to the API.
- Each request received a response from the API.
- The responses contain information about the created goals, including userId, type, target, and createdAt.
- Data consistency was maintained across all responses, indicating that the API handled multiple concurrent requests effectively.
```
Responses: [
  '{"userId":"661e34c1aa109d60e825719a","type":"lose_weight","target":"get_healthier","createdAt":"2024-03-28T06:31:09.162Z","_id":"662c05bbdfdb1d58e8407a74","__v":0}',
  '{"userId":"661e34c1aa109d60e825719a","type":"lose_weight","target":"get_healthier","createdAt":"2024-03-28T06:31:09.162Z","_id":"662c05bbdfdb1d58e8407a76","__v":0}',
  '{"userId":"661e34c1aa109d60e825719a","type":"lose_weight","target":"get_healthier","createdAt":"2024-03-28T06:31:09.162Z","_id":"662c05bbdfdb1d58e8407a7a","__v":0}',
  '{"userId":"661e34c1aa109d60e825719a","type":"lose_weight","target":"get_healthier","createdAt":"2024-03-28T06:31:09.162Z","_id":"662c05bbdfdb1d58e8407a78","__v":0}',
  '{"userId":"661e34c1aa109d60e825719a","type":"lose_weight","target":"get_healthier","createdAt":"2024-03-28T06:31:09.162Z","_id":"662c05bbdfdb1d58e8407a7c","__v":0}'
]
```
#### Test Notes
- Test Name: Test API Response with Concurrent Requests
- Location: /FITNESS-TRACKER/tests/parallelRequests.js [Automated Test #7]()


### Test 8: Test API Handling of Different HTTP Methods
#### Purpose
To verify that the API correctly handles different HTTP methods (GET, POST, PUT, DELETE) for each endpoint and returns appropriate status codes and responses for each method.
#### Steps:
1. Create a collection in Postman to contain the tests for verifying API responses.
   Include tests for sending GET, POST, PUT, and DELETE requests to each endpoint.
2. Export Collection and Environment:
3. Export the collection containing the verification tests from Postman.
4. Export the corresponding environment from Postman.
5. Open terminal in your Visual Studio Code environment.
6. Navigate to the directory containing the parallelRequests.js file.
7. Run Tests with Newman:
- Install Newman using the following command if it is not already installed:
```bash
 - npm install newman --save-dev
```
  - Use the newman run command to execute the tests, providing the exported collection and environment files as arguments:
   Example:
```bash
newman run 8A_Endpoints_validation.json -e environment.json
```
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
```bash

┌─────────────────────────┬───────────────────┬───────────────────┐
│                         │          executed │            failed │
├─────────────────────────┼───────────────────┼───────────────────┤
│              iterations │                 1 │                 0 │
├─────────────────────────┼───────────────────┼───────────────────┤
│                requests │                24 │                 0 │
├─────────────────────────┼───────────────────┼───────────────────┤
│            test-scripts │                23 │                 0 │
├─────────────────────────┼───────────────────┼───────────────────┤
│      prerequest-scripts │                 0 │                 0 │
├─────────────────────────┼───────────────────┼───────────────────┤
│              assertions │                43 │                 0 │
├─────────────────────────┴───────────────────┴───────────────────┤
│ total run duration: 4.5s                                        │
├─────────────────────────────────────────────────────────────────┤
│ total data received: 42.75kB (approx)                           │
├─────────────────────────────────────────────────────────────────┤
│ average response time: 91ms [min: 48ms, max: 420ms, s.d.: 74ms] │
└─────────────────────────────────────────────────────────────────┘
```
#### Test Notes
- Test Name: Test API Handling of Different HTTP Methods
- Location: 8A. API Endpoints Validation [Automated Test #8 Postman collection](https://universal-trinity-236527-1.postman.co/workspace/Team-Workspace~f02dc3c9-cf61-4a68-859f-12f952372c2e/collection/33841208-a47d322d-e3f0-417a-8726-c4d1983d80e0) [Automated Test #8 8A_Endpoints_validation.json]()


### Test 9: Test API Handling of Record Updates
#### Purpose
To verify that the API correctly handles updates to existing records, ensuring that changes are saved and reflected in subsequent requests.
#### Steps:
1. Create a test that will:
- Send a PUT request to update the record with new data - `http://localhost:3000/api/stepCounts/661e330dbca6df6cdde0b801`
 ```json
{
    "count": 20000
}
```
- Verify that the response status is 200.
- Verify that the step count value before update is not equal to the new value (20000).
2. Send a GET request again to retrieve the updated record - `http://localhost:3000/api/stepCounts/661e330dbca6df6cdde0b801`
 - Verify that the response status is 200.
- Verify that the updated record is equal to the new value (20000).
#### Expected Result
- The API should update the existing record with the new data and return a status code 200 OK. The updated record should reflect the changes made.
#### Actual Result
- PUT status code: 200 OK
- The API successfully updated the existing record, and the changes were reflected in subsequent requests.
 
#### Test Notes
- Test Name: 9A. Test for Step Count Record Update
- Location: /Automated Tests [Automated Test #9](https://universal-trinity-236527-1.postman.co/workspace/Team-Workspace~f02dc3c9-cf61-4a68-859f-12f952372c2e/request/33841208-0e776962-b987-4e22-b916-5d41161bda4f)


### Test 10: Test API Performance Under Heavy Load
#### Purpose
Test the API’s performance under heavy load, simulating a large number of users making requests simultaneously.
#### Steps:
Send 100 requests with the usage of 10 concurrent clients to the URL http://localhost:3000/api/users/all using the loadtest tool.
 - Install loadtest using the following command if it is not already installed:
 ```bash
npm install loadtest --save-dev
 ```
 - Use the loadtest run command to execute the test
 ```bash
 node_modules/.bin/loadtest -n 100 -c 10 http://localhost:3000/api/users/all
 ```
#### Expected Result
The API should perform well under heavy load.
#### Actual Result
- All requests were successfully completed without errors.
- Total iterations: 100
- Total requests: 100
- Average Response Time: 228.5 ms
- Duration: 1.504 seconds 
```bash
Target URL:          http://localhost:3000/api/users/all
Max requests:        100
Concurrent clients:  20
Running on cores:    2
Agent:               none

Completed requests:  100
Total errors:        0
Total time:          1.504 s
Mean latency:        228.5 ms
Effective rps:       66

Percentage of requests served within a certain time
  50%      181 ms
  90%      368 ms
  95%      508 ms
  99%      608 ms
 100%      608 ms (longest request)
 ```


### Test 11: Verify API Recovery from Failures
#### Purpose
To verify that the API can recover gracefully from failures, such as database connection issues, without compromising data integrity.
#### Steps:
1. Capture Initial Database State:
- Send the GET request: `http://localhost:3000/api/users/all?disconnect=false`
- Verify that there are no errors during the request.
- Verify that the response status code is 200.
- Capture the initial state of the database, including the length of data and specific details of the third user object.
2. Verify Database Disconnection:
 - Send the GET request: `http://localhost:3000/api/users/all?disconnect=true`
 - Verify that the response message indicates an error occurred while fetching users.
3. Verify Database Reconnection:
- Send the GET request: `http://localhost:3000/api/users/all?disconnect=false`
- Verify that there are no errors during the request.
- Verify that the response status code is 200.
4. Compare Database State Before and After Reconnection:
- Verify that the length of data remains the same before and after reconnection.
- Compare specific properties of the third user object before and after reconnection to ensure consistency.

#### Expected Result
The API should handle the database connection issue gracefully, returning an appropriate error response without compromising data integrity.
#### Actual Result
- The API returned an appropriate error response indicating the database connection issue.
- Data integrity was maintained; no data corruption or loss occurred.
#### Test Notes
- Test Name: 11A. Database Disconnect Test
- Location: /Automated Tests/11A. Database Disconnect Test [Automated Test #11](https://universal-trinity-236527-1.postman.co/workspace/Team-Workspace~f02dc3c9-cf61-4a68-859f-12f952372c2e/request/33841208-c59137c2-f78c-4924-b9e7-db1963581d99?tab=tests)


### Test 12: Test the API’s ability to handle edge cases
#### Purpose
To verify that the API handles edge cases, such as requests with missing or invalid parameters, and returns appropriate error messages.
#### Steps:
1. Create a collection in Postman to contain the tests for verifying API responses.
   Include tests for sending:
  - a POST request to `http://localhost:3000/api/users` with missing `username` parameter.
  - a POST request to `http://localhost:3000/api/users` with missing `email` parameter.
  - a POST request to `http://localhost:3000/api/users` with missing `password` parameter.
  - a POST request to `http://localhost:3000/api/users` with invalid email format.
  - a POST request to `http://localhost:3000/api/users` with a duplicate email value.

2. Export Collection and Environment:
- Export the collection containing the verification tests from Postman.
- Export the corresponding environment from Postman.
3. Open terminal in your Visual Studio Code environment.
- Install Newman using the following command if it is not already installed:
```bash
 - npm install newman --save-dev
```
4. Navigate to the directory containing postman collection file 8A_Endpoints_validation.json
5. Run Tests with Newman:
  - Use the newman run command to execute the tests, providing the exported collection and environment files as arguments:
   Example:
```bash
newman run 8A_Endpoints_validation.json -e environment.json 
```
#### Expected Result
Each request should return the appropriate error message for the specific edge case.

#### Actual Results
All request returnes the appropriate error message
 ```bash
12A_Edge_Cases

→ Verification of Handling Missing Username Paramete
  POST http://localhost:3000/api/users [400 Bad Request, 293B, 107ms]
  √  Verify 400 status code and error message for missing username

→ Verification of Handling Missing Email Parameter
  POST http://localhost:3000/api/users [400 Bad Request, 290B, 9ms]
  √  Verify 400 status code and error message for missing email

→ Verification of Handling Missing Password Parameter
  POST http://localhost:3000/api/users [400 Bad Request, 293B, 7ms]
  √  Verify 400 status code and error message for missing password

→ Verification Handling with invalid email format
  POST http://localhost:3000/api/users [400 Bad Request, 278B, 6ms]
  √  Verify 400 status code and error message for invalid email format

→ Verification of Handling Duplicate Email
  POST http://localhost:3000/api/users [400 Bad Request, 278B, 70ms]
  √  Verify 400 status code and error message for duplicate email
 ```
#### Test Notes
- Test Name: 12A_Edge_Cases
- Location: 12A_Edge_Cases [Automated Test #12](https://universal-trinity-236527-1.postman.co/workspace/Team-Workspace~f02dc3c9-cf61-4a68-859f-12f952372c2e/collection/33841208-9d61ac49-294e-4548-8e00-eec07242603b)


### Test 13: Verify API Rate Limiting
#### Purpose
To ensure that the API correctly implements rate limiting to prevent abuse or excessive use of resources.
#### Steps:
1. Create a test that will send 101 GET requests one by one to `http://localhost:3000/api/activitie`
2. Verify that the API correctly implements rate limiting.
- Expect a status code of 200 for the first 100 requests.
- Expect a status code of 429 and the error message "Too many requests from this IP, please try again in 15 minutes." for the 101st request.
#### Expected Result
- For the first 100 requests, expect a status code of 200.
- For the 101st request, expect a status code of 429 and the error message "Too many requests from this IP, please try again in 15 minutes."
#### Actual Result
- The first 100 requests return a status code of 200.
- The 101st request returns a status code of 429, indicating rate limiting, and includes the expected error message.
```json
Too many request from this IP, please try again in an 15 minutes.
```
#### Test Notes
- Test Name: 13A. Rate Limit test
- Location: / Automated Tests [Automated Test #13](https://universal-trinity-236527-1.postman.co/workspace/Team-Workspace~f02dc3c9-cf61-4a68-859f-12f952372c2e/request/33841208-a41c3013-f7ad-4a03-8349-26e6120c2d4b)
