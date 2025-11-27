# MERN Todo App

A simple Todo Application built with the MERN stack that supports pagination, status updates, delete confirmation, loading spinner, and toast alerts.

---

## Features
- Add new todos
- Update todo status (Pending / In-Progress / Completed)
- Delete todo with confirmation popup
- Pagination support
- Loading spinner while fetching
- Page resets if last item is deleted
- Toast notifications

---

## Tech Stack
### Frontend
- React.js
- Axios
- Tailwind CSS
- React-Toastify
- React-Confirm-Alert
- React-Spinners

### Backend
- Node.js
- Express.js
- MongoDB + Mongoose
- CORS

---

## Installation
Create .env file:
MONGO_URI=your_mongo_db_url

### Setup
```bash
cd backend
npm install
npm start

```bash
cd frontend
npm install
npm run dev