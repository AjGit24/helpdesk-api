# Helpdesk API

A full-stack IT help desk ticket system built with Node.js, Express, MongoDB, and React. Features JWT authentication, role-based access control, ticket lifecycle management, and an analytics dashboard powered by MongoDB aggregation pipelines.

## Live Demo

- Frontend: https://helpdesk-client-3ye9.onrender.com
- Backend API: https://helpdesk-api-14k3.onrender.com

## Tech Stack

**Backend:** Node.js, Express, MongoDB, Mongoose  
**Auth:** JWT, bcrypt  
**Frontend:** React, Recharts, Axios

## Features

- Register and login with JWT authentication
- Role-based access: user / agent / admin
- Submit, assign, and resolve support tickets
- Filter tickets by status
- Analytics dashboard: ticket volume by status and category
- Average resolution time by priority (aggregation pipeline)

## Getting Started

### Prerequisites

- Node.js v18+
- MongoDB (local or Atlas)

### Installation

```bash
git clone https://github.com/AjGit24/helpdesk-api.git
cd helpdesk-api
npm install
cd client && npm install
```

Create a `.env` file in the root:

```
PORT=8080
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_secret_key
```

### Run the app

Backend:

```bash
npm run dev
```

Frontend (in a separate terminal):

```bash
cd client
npm start
```

### Seed the database

```bash
npm run seed
```

## API Endpoints

| Method | Route                          | Description                                 | Auth        |
| ------ | ------------------------------ | ------------------------------------------- | ----------- |
| POST   | /api/auth/register             | Register a user                             | No          |
| POST   | /api/auth/login                | Login + get token                           | No          |
| GET    | /api/tickets                   | List tickets                                | Yes         |
| POST   | /api/tickets                   | Create ticket                               | Yes         |
| GET    | /api/tickets/:id               | Get ticket by ID                            | Yes         |
| PATCH  | /api/tickets/:id               | Update ticket                               | Agent/Admin |
| GET    | /api/analytics/summary         | Ticket counts by status, priority, category | Yes         |
| GET    | /api/analytics/resolution-time | Avg resolution time by priority             | Yes         |

## Project Status

Built as a learning project to develop Node.js, MongoDB aggregation pipeline, REST API, and React skills.
