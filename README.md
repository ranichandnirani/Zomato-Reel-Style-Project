# Zomato Reel Style Project

A backend-focused project for a Zomato-style reel feed experience. This repository contains the server-side code for authentication and data handling, designed to support a reel-style food discovery UI.

## Overview

This project provides a Node.js backend for a food app inspired by Zomato's reel-style feed. It includes:

- Express.js server
- MongoDB connection via Mongoose
- User registration endpoint
- Cookie-based JWT token handling

## Features

- User registration (`POST /api/auth/user/register`)
- Password hashing with `bcryptjs`
- JWT token generation and cookie storage
- MongoDB persistence for user accounts

## Project Structure

- `backend/server.js` - entry point to start the Express server
- `backend/src/app.js` - Express app configuration and route registration
- `backend/src/db/db.js` - MongoDB connection logic
- `backend/src/routes/auth.routes.js` - authentication routes
- `backend/src/controllers/auth.controller.js` - registration controller logic
- `backend/src/models/user.model.js` - Mongoose user schema

## Requirements

- Node.js
- npm
- MongoDB running locally or accessible via connection string

## Installation

1. Open a terminal in the `backend` folder:
   ```bash
   cd backend
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

## Configuration

The backend currently connects to MongoDB at:

```text
mongodb://localhost:27017/food-view
```

If needed, update the connection string in `backend/src/db/db.js`.

## Running the Server

From the `backend` directory, start the server:

```bash
node server.js
```

The server listens on port `3000` by default.

## API Endpoints

- `GET /` - Health check route
- `POST /api/auth/user/register` - Register a new user

Example payload for registration:

```json
{
  "fullName": "Jane Doe",
  "email": "jane@example.com",
  "password": "securePassword"
}
```

## Notes

This repository currently contains only the backend service. The frontend reel-style feed UI can be added as a separate client application that consumes this API.

## License

This project is open source and available for extension.
