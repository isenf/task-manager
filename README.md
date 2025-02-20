# Task Manager Website
This project is a simple way to test my knowledge of server-side development, including authentication, database communication, route management, cookies, and middleware. 

## ⚠️ Warning
> Before reading this, please note that English is not my native language, so there may be some grammatical mistakes in the files and commits.
> Additionally, I do not own any rights to the images, icons, or fonts used in this project. This project is for educational purposes only.

## 📖 Features
- **User authentication**: register and login functionality.
- **Task management**: create, edit, and delete tasks.
- **Password encryption**: securely hash passwords before storing them in the database.
- **JWT implementation**: generate and verify JSON Web Tokens for authentication.
- **Route and permission control**: middleware to verify access permissions.
- **Session management with cookies**: store authentication tokens in cookies for better security.
- **Database integration**: uses MongoDB with Mongoose for data storage and retrieval.

## 🚀 Main Technologies
- Node.js - JavaScript runtime for server-side devlopment.
- Express - minimal and flexible web framework for Node.js
- MongoDB - NoSQL database for storing app data.
- Mongoose - ODM (Object Data Modeling) lib for MongoDB.
- EJS - template engine for rendering dynamic HTML pages.
- BCrypt - lib for hash and securely storing password.
- JWT (Json Web Token) - authentication and authorization system.
- DotENV - loads environment variables from a `.env` file.

## Installation and uses

<hr>
1️⃣ **Prerequisites**
Before running this project, make sure you have the following installed:
- <a href="https://nodejs.org/pt">Node.js</a> (LTS version) - required to run backend.
- <a href="https://www.mongodb.com">MongoDB</a> - database for storing data app. You can install locally or use a cloud server like **MongoDB Atlas** (I used this one).
- **Git**(optional) - to clone this rep from GitHub.

<hr>
2️⃣ **Cloning the Repository**
To get a copy of this project on your local machine, follow these steps:
- 1. Open a terminal and run the following command to clone the rep: <br> `git clone git@github.com:isenf/task-manager.git`
- 2. Navigate into the project dir: <br> `cd task-manager`

<hr>
3️⃣ **Installing dependencies**
Once you've cloned the rep, run the following command to install the required dependencies:
<br>
`npm install`
<br>
This will install all the necessary lib and packages specified in the `package.json` file.

<hr>
4️⃣ **Setting Up the `.env` File**
Create a `env` file on the root dir of the project. This file will store you environment variables, such the MongoDB connection str and the JWT secret key.
Here's an example of the .env file: 
<br>
`DATABASE_URL = your_mongodb_connection_string
SECRET_KEY = your_jwt_secret_key
PORT=3001`
<br>
Make sure to replace 'your_mongodb_connection_string' with your MongoDB URL (whether local or from MongoDB Atlas), and the 'your_jwt_secret_key' with a secure str to sign your JWT tokens.

<hr>
5️⃣ **Running the project**
To start the project, use Nodemon to automatically restart the server when changes are made:
<br>
`nodemon app`
<br>
This will run the app and monitor for changes, making the development process smoother. If you don’t have Nodemon installed globally, you can install it by running:
<br>
`npm install -g nodemon`
<br>
Alternatively, you can add a script in your `package.json` to run the project:
<br>
`"scripts": {
  "dev": "nodemon app"
}`
<br>
Then, you can run the project with:
<br>
`npm run dev`
<br>

<hr>
6️⃣ **Accessing the project**
Once the server is running, you can access the project by opening your browser and going to:
<br>
`http://localhost:3000`
<br>
And this will load the app's main page.