# Backend Project Setup

This is the backend service for the WazeefaTechnologies student managment project. It is built with Node.js, Express, and MongoDB (via Mongoose).

## Prerequisites

- [Node.js](https://nodejs.org/) (v16 or higher recommended)
- [npm](https://www.npmjs.com/) (comes with Node.js)
- [MongoDB](https://www.mongodb.com/) instance (local or cloud)

## Getting Started

### 1. Clone the repository
```bash
git clone <repo-url>
cd backend
```

### 2. Install dependencies
```bash
npm install
```

### 3. Environment Variables
Create a `.env` file in the root directory with the following variables:

```
MONGO_URI=your_mongodb_connection_string
PORT= any port you prefer
NODE_ENV=development
```

- `MONGO_URI`: Your MongoDB connection string (local or cloud, e.g., MongoDB Atlas)
- `PORT`: (Optional) Port for the server (defaults to 3004)
- `NODE_ENV`: (Optional) Set to `development` for stack traces in error responses

### 4. Running the Server

#### Development (with auto-reload):
```bash
npm run dev
```

#### Production:
```bash
node server.js
```

The server will start on the port specified in your `.env` file (default: 3004).

## Project Structure

```
backend/
├── app.js                # Express app setup and middleware
├── server.js             # Entry point, loads env and starts server
├── config/
│   └── db.js             # MongoDB connection logic
├── src/
│   ├── controllers/      # Route controllers (superAdmin, staff, student)
│   ├── middleware/       # Custom middleware (auth, permissions, etc.)
│   ├── models/           # Mongoose models
│   ├── routes/           # Express route definitions
│   └── utils/            # Utility functions (error handling, tokens, etc.)
├── package.json          # Project metadata and scripts
└── .env                  # (Not committed) Your environment variables
```

## API Endpoints

- Super Admin:
  - `/superadmin/auth/*`
  - `/superadmin/student/*`
  - `/superadmin/staff/*`
- Staff:
  - `/staff/auth/*`
  - `/staff/student/*`

Each route group has its own authentication and resource management endpoints. See the respective controller and route files in `src/routes/` and `src/controllers/` for details.

## Error Handling
- Centralized error handler returns JSON with `status`, `message`, and (in development) `stack`.

## License

This project is licensed under the ISC License. 