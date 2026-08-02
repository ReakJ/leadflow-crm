# LeadFlow CRM

> 🚧 Frontend is currently under development. The backend is feature-complete.

## Overview

LeadFlow CRM is a full-stack Customer Relationship Management (CRM) application designed to help businesses and teams manage users and sales leads through a secure role-based system.

The project is being developed using the MERN stack (MongoDB, Express.js, React, and Node.js). The backend is fully implemented with authentication, user management, lead management, and advanced querying features, while the React frontend is currently under development.

## Project Status

### ✅ Backend

- JWT Authentication
- Role-Based Authorization (Admin, Manager, Member)
- User Management
- Lead Management
- Lead Assignment & Status Workflow
- Notes
- Search, Filtering, Sorting & Pagination
- Soft Delete & Restore
- Centralized Error Handling

### 🚧 Frontend

- React + Vite project initialized
- UI development in progress

## Tech Stack

### Backend

- Node.js
- Express.js
- MongoDB
- Mongoose

### Frontend

- React
- Vite

### Authentication & Security

- JWT
- bcrypt
- cookie-parser

### Validation

- express-validator
- validator.js

### Development

- Git
- GitHub
- Postman

## Project Structure

LeadFlow-CRM/
│
├── backend/
│   ├── src/
│   │   ├── config/
│   │   ├── controllers/
│   │   ├── errors/
│   │   ├── middleware/
│   │   ├── models/
│   │   ├── routes/
│   │   ├── services/
│   │   ├── utils/
│   │   └── validators/
│   │
│   └── package.json
│
├── frontend/
│   ├── src/
│   └── package.json
│
└── README.md

## Backend Highlights

- Layered Architecture
- JWT Authentication
- Role-Based Access Control
- Service Layer Business Logic
- Soft Delete & Restore
- Lead Assignment Workflow
- Status Transition Rules
- Search, Filtering, Sorting & Pagination
- Centralized Error Handling

## Roadmap

### ✅ Completed

- Backend API
- Authentication
- User Management
- Lead Management

### 🚧 In Progress

- React Frontend

### 📌 Planned

- React Frontend
- Dashboard & Analytics
- Email Notifications
- Unit & Integration Tests
- Docker Support

## Getting Started

### 1. Clone the repository

```bash
git clone <repository-url>
cd LeadFlow-CRM
```

### 2. Set up the backend

```bash
cd backend
npm install
```

### 3. Configure environment variables

Create a `.env` file inside the `backend` directory and add:

```env
PORT=
MONGODB_URI=
JWT_SECRET=
JWT_EXPIRES_IN=
COOKIE_EXPIRES_IN=
BCRYPT_SALT_ROUNDS=
NODE_ENV=
```

### 4. Seed the database

```bash
npm run seed
```

### 5. Start the backend server

```bash
npm run dev
```

### 6. Frontend (Coming Soon)

The React + Vite frontend has been initialized and is currently under development.

## Why LeadFlow?

LeadFlow was built to strengthen my understanding of backend application development using the MERN stack. The project focuses on designing clean REST APIs, implementing authentication and authorization, enforcing business rules through a service layer, and building a maintainable backend architecture that can be extended with a React frontend.

## API Overview

### Authentication

- POST /login
- POST /logout

### Users

- POST /users
- GET /users
- GET /users/:id
- PATCH /users/:id
- PATCH /users/:id/status
- PATCH /users/:id/restore
- DELETE /users/:id

### Leads

- POST /leads
- GET /leads
- GET /leads/:id
- PATCH /leads/:id
- PATCH /leads/:id/assign
- PATCH /leads/:id/status
- POST /leads/:id/notes
- PATCH /leads/:id/restore
- DELETE /leads/:id
