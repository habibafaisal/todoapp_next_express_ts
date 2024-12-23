# To-Do List Application - Full-Stack Developer Task

## Project Overview
This is a simple To-Do List application built using **Next.js**, **TypeScript**, **TailwindCSS**, **Node.js**, **Express.js**, **GraphQL**, **MongoDB**, and **JWT** authentication. The application includes user authentication, and basic CRUD functionality for managing To-Do items.

**Live Demo**: [To-Do App](https://todoapp-next-express-ts-2gvu.vercel.app/dashboard)

### Setup Instructions

#### 1. Clone the Repository

```bash
git clone https://github.com/habibafaisal/todoapp_next_express_ts.git
cd todo-app
```
#### 2. Install Frontend Dependencies and run locally

```bash
cd client
cd todo-app
npm install
npm run dev
```

#### 3. Install Backend Dependencies and run locally

```bash
cd server
cd todo-app
npm install
npm run dev
```

## API Documentation

### Backend Routes

#### Authentication Routes
- **POST /api/auth/signup**: Register a new user.
- **POST /api/auth/login**: Authenticate user and get JWT token.

#### To-Do Routes (Requires JWT Authentication)
- **POST /api/todos/create**: Create a new To-Do item.
- **GET /api/todos**: Get all To-Do items for the authenticated user.
- **PUT /api/todos/:id**: Update an existing To-Do item.
- **DELETE /api/todos/:id**: Delete a specific To-Do item.



