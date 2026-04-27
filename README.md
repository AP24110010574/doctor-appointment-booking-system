# 🏥 DocBook — Doctor Appointment Booking System

A full-stack web application for booking doctor appointments built using the MERN Stack.

## 🌐 Live Demo
👉 [https://doctor-appointment-booking-system-bay.vercel.app](https://doctor-appointment-booking-system-bay.vercel.app)

## 🎥 Videos
- 📽️ Project Overview Video: [https://www.loom.com/share/64e07e270b9841cca765230b3538a422]
- 💻 Code Explanation Video: [https://www.loom.com/share/926ed9ad2c174a2c8026b7cc6fce2795]

## 👥 Team HealthBridge — SRMAP
| Name | Roll Number | Role |
|------|-------------|------|
| Kanishk Ravipati | AP24110010574 | Team Lead / Full Stack |
| K. Srikar | AP24110010705 | Backend Developer |
| Aishwarya | AP24110010608 | Frontend Developer |
| Ambadipudi Lakshmi Gayatri | AP24110010657 | Database & Testing |
| I. Bhavya Sri | AP24110010660 | UI/UX & Documentation |

## 🛠️ Tech Stack
- **Frontend:** React.js, Bootstrap 5, Redux Toolkit
- **Backend:** Node.js, Express.js
- **Database:** MongoDB Atlas
- **Authentication:** JWT, bcryptjs
- **Deployment:** Vercel (Frontend), Render (Backend)

## ✨ Features
- User Authentication (Patient, Doctor, Admin)
- Doctor Search by Specialization
- Appointment Booking with Slot Selection
- Patient Dashboard — View & Cancel Appointments
- Doctor Dashboard — Manage Appointments & Add Notes
- Admin Dashboard — Approve Doctors, Manage Users
- Notification System on Booking

## 📁 Project Structure
doctor-appointment-booking-system/
├── client/          # React.js Frontend
│   └── src/
│       ├── pages/   # All page components
│       ├── redux/   # State management
│       └── services/# API calls
└── server/          # Node.js Backend
├── models/      # MongoDB schemas
├── controllers/ # Business logic
├── routes/      # API routes
└── middleware/  # Auth middleware
## 🚀 How to Run Locally

### Backend
```bash
cd server
npm install
npm run dev
```

### Frontend
```bash
cd client
npm install
npm start
```

## 🔑 Environment Variables (server/.env)
PORT=8080
MONGO_URI=your_mongodb_atlas_connection_string
JWT_SECRET=your_jwt_secret
## 📊 API Endpoints
| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | /api/auth/register | Register user |
| POST | /api/auth/login | Login user |
| GET | /api/doctors | Get all doctors |
| POST | /api/appointments | Book appointment |
| GET | /api/appointments/my | Get my appointments |
| GET | /api/admin/doctors | Admin — all doctors |

## 🌍 Deployment
- Frontend: [Vercel](https://vercel.com)
- Backend: [Render](https://render.com)
- Database: [MongoDB Atlas](https://cloud.mongodb.com)