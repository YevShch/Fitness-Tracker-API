# Fitness Tracker
 This project serves as a school assignment for the development and testing of the API, aimed at utilizing MongoDB, mongoose, fakerjs.dev, and a server.
 
 Additionally, the project focuses on API testing, featuring a Postman collection for testing purposes. You can access the Postman collection and documentation for API testing at the following links:

**[API Testing Documentation]**(https://github.com/YevShch/Fitness-Tracker/blob/dev/API_Testing_Documentation.md)

 **[Postman Collection]**(https://universal-trinity-236527-1.postman.co/workspace/Team-Workspace~f02dc3c9-cf61-4a68-859f-12f952372c2e/collection/33841208-94536aae-954b-41dd-a659-31841f79e949?action=share&creator=33841208
 )
For comprehensive details on how to use the API, refer to the API documentation available at the following link: **[API Documentation]**(https://github.com/YevShch/Fitness-Tracker/blob/dev/API_Documentation.md)

## API Installation Guide

To set up your API, follow these steps:

1. **Initialize a new project and download repository files:** Open your VSCode editor and create a new project directory. Before proceeding, download the necessary files from the repository. You can do this by cloning the repository to your local machine using the following command:

```bash
Copy code
git clone <https://github.com/YevShch/Fitness-Tracker.git>
```
Replace <https://github.com/YevShch/Fitness-Tracker.git> with the URL of your repository.

2. **Open the terminal:** Navigate to your project directory and open the terminal.

3. **Initialize npm:** Run the following command in the terminal to initialize npm and create a "package.json" file:
   ```bash
   npm init -y
   ```

4. **Install Express and Mongoose:** Install Express and Mongoose by running the following command in the terminal:
   ```bash
   npm install express mongoose
   ```

5. **Update package.json:** Open your "package.json" file and add the following line to specify the module type:
   ```json
   "type": "module"
   ```

6. **Run the server:** Start your server by running the following command in the terminal:
   ```bash
   node server.js
   ```

7. **Verify server status:** Once the server is running, you should see the message "Listening on port http://localhost:3000" in the terminal.

8. **Access API endpoints:** Navigate to "http://localhost:3000/api/users" in your browser to view all documents in the "users" collection of your database. If there is no data, you will see an empty array ("[]").

9. **Generate mock data:** To generate mock data, install Faker.js by running the following command in the terminal:
   ```bash
   npm install @faker-js/faker --save-dev
   ```
   You can find documentation for Faker.js on the official website: https://fakerjs.dev/

10. **Adjust mock data settings:** Customize the amount of mock data by modifying the number of objects/rows for each model in the "seedDB.js" file:
```javascript
 // Generating data for users, activities, goals, and step counts
    const usersList = await createUsers( 30 );
    const activityList = await createActivities( 90, usersList );
    const goalsList = await createGoals( 50, usersList );
    const stepCountsList = await createStepCounts( 120, usersList );
```
11. **Run seed script:** Generate mock data by running the following command in the terminal:
    ```bash
    node seedDB.js
    ```

12. **Restart the server:** After generating mock data, restart the server by running:
    ```bash
    node server.js
    ```

13. **View database data:** You can now view the generated data in your database.

14. **Hash user passwords:** Utilize password hashing for user passwords by installing the bcrypt library. Run the following command in the terminal:
    ```bash
    npm install bcrypt --save-dev
    ```

Following these steps will successfully set up your API and populate your database with mock data.
