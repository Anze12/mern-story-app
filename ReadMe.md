# Story App

A web application where users can write, read, save, and manage stories. The app is built using React on the frontend, with Node.js and Express on the backend, and MongoDB as the database.

## Features

- **User Authentication**: Register, log in, and manage user accounts.
- **Create and Publish Stories**: Write and publish stories with a title and content.
- **Browse and Search Stories**: View a list of all stories and search for stories by title.
- **Save to Library**: Add stories to your personal library for easy access.
- **CRUD Operations**: Create, read, update, and delete stories.
- **Responsive Design**: Optimized for both desktop and mobile devices for seamless use.

## Steps to Run the Project

### 1. Clone the Repository

Clone the repository to your local machine using Git:

git clone https://github.com/your-username/story-app.git
### 2. Install Dependencies

Navigate to the `backend` and `frontend` directories to install dependencies.

#### Backend

cd backend
npm install

#### Frontend

cd frontend
npm install

### 3. Set Up Environment Variables

Before you start the application, you need to set up some environment variables. Create a `.env` file in the root directory of your project.

Inside the `.env` file, add the following:

MONGO_URI=<your-mongo-uri>

### 4. Run the app

#### Backend

node server.js

#### Frontend

npm start

### 4. Access the app in browser

#### Backend

http://localhost:5000/api/

#### Frontend

http://localhost:3000