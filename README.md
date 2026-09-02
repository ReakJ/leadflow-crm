# Leadora

> A full-stack CRM application for managing leads, users, assignments, and sales workflows.

Leadora is a full-stack Customer Relationship Management (CRM) application built with the MERN stack. It provides a centralized platform for managing leads, tracking their progress through a structured sales pipeline, assigning leads to team members, managing users, and viewing business metrics through an analytics dashboard.

The project was built to explore and demonstrate real-world full-stack application development, including authentication, role-based authorization, REST APIs, database design, responsive UI development, and production deployment.

## 🚀 Live Demo

**Live Application:** https://leadora-crm.vercel.app

> The backend is hosted separately and may take a short moment to respond after a period of inactivity because the project uses a free-tier deployment.

---

## ✨ Features

### 🔐 Authentication & Authorization

- Secure user authentication using JWT
- HTTP-only authentication cookies
- Password hashing with bcrypt
- Protected routes
- Role-based access control
- Automatic authentication state handling
- Logout functionality

### 👥 User Management

- Create and manage users
- Three user roles:
  - Admin
  - Manager
  - Member
- Activate/deactivate users
- Soft delete users
- Restore deleted users
- Search users
- Filter by role and status
- Sort users
- Paginated user listing

### 🎯 Lead Management

- Create and manage leads
- Assign leads to team members
- View detailed lead information
- Edit lead information
- Search leads
- Filter leads by status and assignee
- Sort leads
- Pagination
- Soft delete leads
- Restore deleted leads
- Role-based lead visibility

### 📈 Lead Pipeline

Leads can move through a structured sales workflow:

```text
New
 ↓
Assigned
 ↓
Contacted
 ↓
Qualified
 ↓
Proposal Sent
 ↓
Negotiation
 ↓
Won
```

A lead can also be marked as:

```text
Lost
```

`Lost` is treated as a terminal outcome rather than a step after `Won`.

### 📝 Lead Notes

- Add notes to individual leads
- Track the user who created each note
- View notes directly from the lead management page

### 📊 Dashboard & Analytics

The dashboard provides an overview of CRM activity, including:

- Total leads
- New leads
- In-progress leads
- Won leads
- Conversion rate
- Lead activity over time
- Lead distribution by status
- Recent leads
- Configurable reporting periods:
  - Last 7 days
  - Last 30 days
  - Last 90 days

### 🎨 UI & User Experience

- Responsive layout
- Mobile navigation drawer
- Light and dark themes
- Persistent theme selection
- Responsive dashboard cards
- Interactive charts
- Toast notifications
- Searchable dropdowns
- Responsive lead and user management interfaces
- Custom Leadora branding

### 📱 PWA Support

Leadora includes basic Progressive Web App support:

- Web app manifest
- Custom favicon and app icons
- Theme-aware browser UI
- Mobile-friendly experience

---

## 🛠️ Tech Stack

### Frontend

- React
- Vite
- React Router
- Axios
- Tailwind CSS
- DaisyUI
- Recharts
- Lucide React
- React Hot Toast

### Backend

- Node.js
- Express.js
- MongoDB
- Mongoose
- JWT
- bcrypt
- cookie-parser
- CORS
- dotenv
- validator

### Deployment

- **Frontend:** Vercel
- **Backend:** Render
- **Database:** MongoDB Atlas

---

## 🏗️ Architecture

Leadora follows a separated frontend/backend architecture.

```text
                    ┌──────────────────────┐
                    │      Leadora UI      │
                    │   React + Vite       │
                    └──────────┬───────────┘
                               │
                            Axios
                               │
                               ▼
                    ┌──────────────────────┐
                    │      REST API        │
                    │ Node.js + Express    │
                    └──────────┬───────────┘
                               │
                    ┌──────────▼───────────┐
                    │       MongoDB         │
                    │       Mongoose        │
                    └───────────────────────┘
```

Authentication is handled using JWT tokens stored in HTTP-only cookies.

The frontend communicates with the backend through RESTful API endpoints, while the backend handles authentication, authorization, business logic, validation, and database operations.

---

## 📁 Project Structure

```text
Leadora/
│
├── backend/
│   ├── config/
│   │   └── db.js
│   │
│   ├── controllers/
│   │   ├── authController.js
│   │   ├── dashboardController.js
│   │   ├── leadController.js
│   │   └── userController.js
│   │
│   ├── errors/
│   │   └── ...
│   │
│   ├── middleware/
│   │   ├── authMiddleware.js
│   │   ├── errorMiddleware.js
│   │   └── ...
│   │
│   ├── models/
│   │   ├── Lead.js
│   │   └── User.js
│   │
│   ├── routes/
│   │   ├── authRoutes.js
│   │   ├── dashboardRoutes.js
│   │   ├── leadRoutes.js
│   │   └── userRoutes.js
│   │
│   ├── scripts/
│   │   └── seedAdmin.js
│   │
│   ├── services/
│   │   ├── authService.js
│   │   ├── dashboardService.js
│   │   ├── leadService.js
│   │   └── userService.js
│   │
│   ├── utils/
│   │   └── ...
│   │
│   ├── validators/
│   │   └── ...
│   │
│   ├── server.js
│   └── package.json
│
├── frontend/
│   ├── public/
│   │   ├── favicon-16x16.png
│   │   ├── favicon-32x32.png
│   │   ├── favicon-48x48.png
│   │   ├── apple-touch-icon.png
│   │   ├── leadora-logo.png
│   │   └── site.webmanifest
│   │
│   ├── src/
│   │   ├── components/
│   │   │   ├── common/
│   │   │   ├── layout/
│   │   │   └── ...
│   │   │
│   │   ├── context/
│   │   ├── pages/
│   │   ├── services/
│   │   ├── App.jsx
│   │   └── main.jsx
│   │
│   ├── vercel.json
│   └── package.json
│
└── README.md
```

---

## 👤 User Roles

Leadora currently supports three roles.

| Role | Permissions |
|------|-------------|
| **Admin** | Full system access, including user management |
| **Manager** | Manage leads and users according to assigned permissions |
| **Member** | Work with leads assigned to them |

Role-based permissions are enforced on the **backend**, while the frontend also adapts its UI based on the user's role.

For example, members do not have access to the user-management interface.

---

## 🔄 Lead Status Workflow

The lead pipeline is designed around a typical sales process:

```text
                    ┌─────────────┐
                    │     New     │
                    └──────┬──────┘
                           ↓
                    ┌─────────────┐
                    │  Assigned   │
                    └──────┬──────┘
                           ↓
                    ┌─────────────┐
                    │  Contacted  │
                    └──────┬──────┘
                           ↓
                    ┌─────────────┐
                    │  Qualified  │
                    └──────┬──────┘
                           ↓
                    ┌─────────────┐
                    │  Proposal   │
                    │     Sent    │
                    └──────┬──────┘
                           ↓
                    ┌─────────────┐
                    │ Negotiation │
                    └──────┬──────┘
                           ↓
                    ┌─────────────┐
                    │     Won     │
                    └─────────────┘

                           OR

                    ┌─────────────┐
                    │    Lost     │
                    └─────────────┘
```

The backend controls valid status transitions to prevent invalid workflow changes.

---

## 🔌 API Overview

### Authentication

| Method | Endpoint | Description |
|--------|----------|-------------|
| `POST` | `/api/auth/login` | Authenticate a user |
| `POST` | `/api/auth/logout` | Log out the current user |
| `GET` | `/api/auth/me` | Get the currently authenticated user |

### Users

| Method | Endpoint | Description |
|--------|----------|-------------|
| `GET` | `/api/users` | Get users with filtering and pagination |
| `POST` | `/api/users` | Create a user |
| `GET` | `/api/users/:id` | Get a user |
| `PATCH` | `/api/users/:id` | Update a user |
| `PATCH` | `/api/users/:id/status` | Activate/deactivate a user |
| `PATCH` | `/api/users/:id/restore` | Restore a deleted user |
| `DELETE` | `/api/users/:id` | Soft delete a user |

### Leads

| Method | Endpoint | Description |
|--------|----------|-------------|
| `GET` | `/api/leads` | Get leads with filtering and pagination |
| `POST` | `/api/leads` | Create a lead |
| `GET` | `/api/leads/:id` | Get lead details |
| `PATCH` | `/api/leads/:id` | Update a lead |
| `PATCH` | `/api/leads/:id/assign` | Assign a lead |
| `PATCH` | `/api/leads/:id/status` | Update lead status |
| `POST` | `/api/leads/:id/notes` | Add a note |
| `PATCH` | `/api/leads/:id/restore` | Restore a deleted lead |
| `DELETE` | `/api/leads/:id` | Soft delete a lead |

### Dashboard

| Method | Endpoint | Description |
|--------|----------|-------------|
| `GET` | `/api/dashboard` | Get dashboard analytics |

---

## ⚙️ Getting Started

### 1. Clone the repository

```bash
git clone https://github.com/ReakJ/leadora-crm.git
cd leadora-crm
```

### 2. Install backend dependencies

```bash
cd backend
npm install
```

### 3. Configure backend environment variables

Create a `.env` file inside the `backend` directory:

```env
PORT=5000

MONGODB_URI=your_mongodb_connection_string

JWT_SECRET=your_jwt_secret
JWT_EXPIRES_IN=your_jwt_expiration

COOKIE_EXPIRES_IN=your_cookie_expiration

BCRYPT_SALT_ROUNDS=your_salt_rounds

NODE_ENV=development

CLIENT_URL=http://localhost:5173

ADMIN_NAME=your_admin_name
ADMIN_EMAIL=your_admin_email
ADMIN_PASSWORD=your_admin_password
```

### 4. Seed the initial admin

```bash
npm run seed
```

The seed script is idempotent. If an admin account with the configured email already exists, it will not create another account.

### 5. Start the backend

```bash
npm run dev
```

The backend will run on:

```text
http://localhost:5000
```

---

### 6. Install frontend dependencies

Open a new terminal:

```bash
cd frontend
npm install
```

### 7. Configure frontend environment variables

Create a `.env` file inside the `frontend` directory:

```env
VITE_API_URL=http://localhost:5000/api
```

### 8. Start the frontend

```bash
npm run dev
```

The frontend will be available at:

```text
http://localhost:5173
```

---

## 🌍 Production Deployment

Leadora uses a split deployment architecture:

```text
Vercel
   │
   │ React Frontend
   ▼
Leadora UI
   │
   │ REST API
   ▼
Render
   │
   │ Express Backend
   ▼
MongoDB Atlas
```

### Frontend

The React/Vite frontend is deployed on Vercel.

Production environment variable:

```env
VITE_API_URL=https://leadora-backend.onrender.com/api
```

The frontend uses a Vercel rewrite configuration so React Router routes work correctly when refreshing pages directly.

### Backend

The Express backend is deployed on Render.

The production backend uses:

```env
NODE_ENV=production
CLIENT_URL=https://leadora-crm.vercel.app
```

Authentication cookies use secure cross-site settings in production so that the separately hosted frontend and backend can communicate securely.

### Database

Production data is stored in MongoDB Atlas using a separate production database from the development database.

---

## 🎨 Themes

Leadora includes custom light and dark themes built using DaisyUI.

The application remembers the user's selected theme using local storage.

The browser's theme color is also synchronized with the active application theme for a more consistent experience on supported mobile browsers and installed PWAs.

---

## 📱 Responsive Design

The application is designed to work across desktop and mobile screen sizes.

On smaller screens:

- The desktop sidebar is replaced by a mobile navigation menu.
- The navigation opens with a slide-in animation.
- Clicking outside the navigation closes it.
- Selecting a navigation item automatically closes the menu.
- Dashboard cards adapt to smaller screen widths.
- Tables and management interfaces remain usable on smaller displays.

---

## 🧠 What I Learned

Building Leadora provided practical experience with several aspects of modern full-stack development:

- Designing REST APIs
- Structuring an Express backend
- Separating controllers, services, models, and routes
- MongoDB and Mongoose data modeling
- JWT authentication
- HTTP-only cookies
- Password hashing
- Role-based authorization
- Protected frontend routes
- React state management
- React Context
- React Router
- API integration with Axios
- Debounced search
- Filtering, sorting, and pagination
- Soft deletion and restoration
- Responsive UI design
- Light/dark theme systems
- Data visualization with Recharts
- Production environment variables
- CORS configuration
- Cross-origin authentication
- Deploying a full-stack application

---

## 🔮 Future Improvements

Some possible improvements for future versions include:

- Advanced dashboard analytics
- Activity history and audit logs
- More detailed lead activity tracking
- Email integration
- Lead import/export
- Additional CRM automation
- Improved notification system
- Automated testing
- Performance optimizations
- More granular permission management

---

<!-- ## 📸 Screenshots

> Screenshots of the application will be added here.

### Dashboard

<!-- Add dashboard screenshot -->

<!-- ### Lead Management -->

<!-- Add leads screenshot -->

<!-- ### Lead Details -->

<!-- Add lead details screenshot -->

<!-- ### User Management -->

<!-- Add users screenshot -->

<!-- ### Dark & Light Themes -->

<!-- Add theme screenshots -->

--- -->

## 📌 Project Status

**Leadora V1 — Completed and deployed**

The current version includes the core CRM functionality, authentication and authorization, lead and user management, dashboard analytics, responsive design, theming, and production deployment.

Future improvements will be developed incrementally as the project evolves.

---

## 📄 License

This project is currently intended as a personal learning and portfolio project.