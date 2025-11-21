# Scalable Web App - Next.js (App Router) + Express.js Assignment
## Overview
This repository contains a minimal, functional starter for the Frontend Developer Intern task:
- Frontend: Next.js (App Router) + TailwindCSS (skeleton)
- Backend: Express.js + Mongoose (MongoDB)
- Auth: JWT (client stores token in localStorage)
- Sample entity: `items` (CRUD)

## Quickstart (local)
1. Install dependencies for both frontend and backend:
   - Frontend:
     ```
     cd frontend
     npm install
     ```
   - Backend:
     ```
     cd backend
     npm install
     ```
2. Create `.env` files:
   - Backend `.env` (in `backend` folder):
     ```
     PORT=4000
     MONGO_URI=mongodb://localhost:27017/next_express_assignment
     JWT_SECRET=your_jwt_secret_here
     ```
3. Run backend:
   ```
   cd backend
   npm run dev
   ```
4. Run frontend:
   ```
   cd frontend
   npm run dev
   ```
5. Open `http://localhost:3000`

## Notes
- This is a starter; you can expand UI, add server-side cookie auth, refresh tokens, production-ready CORS and rate-limiting.
- See `backend` and `frontend` folders for code and README.
