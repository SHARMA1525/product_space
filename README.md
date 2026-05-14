# Futuristic Auth System

A premium, full-stack authentication system with a minimalist futuristic design.

## Features
- **Frontend**: React, Vite, Axios, React Router
- **Backend**: Node.js, Express, MongoDB
- **UI/UX**: Futuristic B&W theme, Glassmorphism, Smooth Animations
- **Security**: JWT Authentication, Password Hashing (Bcrypt)

## Prerequisites
- Node.js installed
- MongoDB Atlas account (for database)

## Setup Instructions

### 1. Backend Setup
1. Open a terminal and navigate to the `backend` folder:
   ```bash
   cd backend
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Create a `.env` file based on `.env.example` and add your MongoDB connection string:
   ```bash
   MONGO_URI=your_mongodb_atlas_connection_string
   JWT_SECRET=your_secret_key
   ```
4. Start the backend server:
   ```bash
   npm run dev
   ```

### 2. Frontend Setup
1. Open another terminal and navigate to the `frontend` folder:
   ```bash
   cd frontend
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Start the frontend development server:
   ```bash
   npm run dev
   ```

## API Endpoints
- `POST /api/auth/signup` - Register a new user
- `POST /api/auth/login` - Login user
- `GET /api/auth/profile` - Get user profile (Protected)

## Design Notes
The UI uses a custom CSS system in `frontend/src/styles/index.css`. It features:
- Dark gradients and glowing borders.
- Split-screen layout for authentication.
- Responsive design for mobile and tablet.
- Smooth CSS animations for entrance and interactions.
