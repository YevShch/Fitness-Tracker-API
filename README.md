# Fitness Tracker API :bicyclist:
 This project serves as a school assignment for the development and testing of the API, aimed at utilizing MongoDB, mongoose, server and fakerjs.
 
 Additionally, the project focuses on API testing, featuring a Postman collection for testing purposes. You can access the Postman collection and documentation for API testing at the following links:

- **API Testing Documentation** [API Manual Testing Documentation](https://github.com/YevShch/Fitness-Tracker/blob/main/DOCUMENTATION/API_Manual_Testing_Documentation.md) and [API Automated Testing Documentation](https://github.com/YevShch/Fitness-Tracker/blob/main/DOCUMENTATION/API_AUTO_Testing_Documentation.md)  

- **Postman Collection** [Postman Collection](https://universal-trinity-236527-1.postman.co/workspace/Team-Workspace~f02dc3c9-cf61-4a68-859f-12f952372c2e/collection/33841208-94536aae-954b-41dd-a659-31841f79e949?action=share&creator=33841208)

- For comprehensive details on how to use the API, refer to the **API documentation** available at the following link: [API Documentation](https://github.com/YevShch/Fitness-Tracker/blob/main/DOCUMENTATION/API_Documentation.md)

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
5. **Database Connection:** In the server.js file, locate the mongoose.connect() function and replace the database connection string 
```javascript
(`mongoose.connect("mongodb+srv://<Username>:<Password>@cluster0.nyncb7g.mongodb.net/<DB-Name>")`) 
```
with the link to your MongoDB database. You can find this link in your MongoDB dashboard. 
Ensure that the format and structure of the connection string remain the same.

6. **Update package.json:** Open your "package.json" file and add the following line to specify the module type:
   ```json
   "type": "module"
   ```

7. **Run the server:** Start your server by running the following command in the terminal:
   ```bash
   node server.js
   ```

8. **Verify server status:** Once the server is running, you should see the message "Listening on port http://localhost:3000" in the terminal.

9. **Access API endpoints:** Navigate to "http://localhost:3000/api/users" in your browser to view all documents in the "users" collection of your database. If there is no data, you will see an empty array ("[]").

10. **Generate mock data:** To generate mock data, install Faker.js by running the following command in the terminal:
   ```bash
   npm install @faker-js/faker --save-dev
   ```
   You can find documentation for Faker.js on the official website: https://fakerjs.dev/

11. **Adjust mock data settings:** Customize the amount of mock data by modifying the number of objects for each model in the "seedDB.js" file:
```javascript
 // Generating data for users, activities, goals, and step counts
    const usersList = await createUsers( 30 );
    const activityList = await createActivities( 90, usersList );
    const goalsList = await createGoals( 50, usersList );
    const stepCountsList = await createStepCounts( 120, usersList );
```
12. **Run seed script:** Generate mock data by running the following command in the terminal:
    ```bash
    node seedDB.js
    ```

13. **Restart the server:** After generating mock data, restart the server by running:
    ```bash
    node server.js
    ```

14. **View database data:** You can now view the generated data in your database.

15. **Hash user passwords:** Utilize password hashing for user passwords by installing the bcrypt library. Run the following command in the terminal:
    ```bash
    npm install bcrypt --save-dev
    ```
16. **Rate limiting:** To implement rate limiting in your API, first install the `express-rate-limit` package by running the following command in your terminal:

```bash
npm install express-rate-limit
```

17. **Load testing:** To perform load testing for your application, you can use the loadtest package. Install it as a development dependency by running the following command in your terminal: 
```bash
npm install loadtest --save-dev
```
This will allow you to execute load tests to evaluate your server's performance under heavy load. 

18. **Automated Testing:** To conduct API testing directly from Postman collections, you can leverage Newman, a command-line collection runner for Postman. Install Newman globally on your system by running the following command:
```bash
npm install newman --save-dev
```

Following these steps will successfully set up your API and populate your database with mock data. :satellite:
