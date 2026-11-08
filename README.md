# Passport Consultancy Management System (PCMS)

## Project Overview

The **Passport Consultancy Management System (PCMS)** is a web-based application designed to simplify and manage passport consultancy services. It helps customers access passport-related guidance, check required documents, book consultations, and track their consultation requests.

The system also provides an admin dashboard to manage customer details, view consultation bookings, update request statuses, and organize customer follow-ups.

The main objective is to reduce manual work, improve customer communication, and make passport consultancy management more efficient.

##LiveDemo
https://amruthalahari2704-oss.github.io/amrutha-passport-consultancy/

## Objectives

- Provide passport-related consultancy guidance.
- Display document checklists for different passport services.
- Allow customers to book consultations online.
- Help customers track their consultation requests.
- Provide an admin dashboard to manage customer bookings.
- Reduce manual record maintenance and improve efficiency.

## Features

### Customer Module
- Home page with consultancy information.
- Passport consultancy services.
- Document checklist.
- Application guidance.
- Online consultation booking.
- Consultation request tracking.
- Contact and about pages.

### Admin Module
- Admin login.
- View consultation requests.
- Manage customer booking details.
- Update consultation request statuses.
- Organize customer follow-ups.

## Technologies Used

| Component | Technology |
|---|---|
| Frontend | React.js, JavaScript |
| Styling | HTML, CSS |
| Build Tool | Vite |
| Backend | Node.js, Express.js |
| Database | MongoDB |
| ODM | Mongoose |
| Authentication | JWT, bcryptjs |
| Version Control | Git and GitHub |

## Project Structure

```text
Passport-Consultancy-Management-System/
│
├── backend/
│   ├── models/
│   ├── routes/
│   ├── middleware/
│   ├── server.js
│   └── package.json
│
├── src/
│   ├── components/
│   ├── pages/
│   ├── styles/
│   ├── App.jsx
│   └── main.jsx
│
├── public/
├── docs/
├── index.html
├── package.json
├── vite.config.js
└── README.md
```

## Installation and Setup

### 1. Clone the Repository

```bash
git clone https://github.com/amruthalahari2704-oss/amrutha-passport-consultancy.git
```

### 2. Open the Project Folder

```bash
cd amrutha-passport-consultancy
```

### 3. Install Frontend Dependencies

```bash
npm install
```

### 4. Start the Frontend

```bash
npm run dev
```

Frontend runs at:

```text
http://localhost:5173
```

### 5. Install Backend Dependencies

Open another terminal:

```bash
cd backend
npm install
```

Configure the required environment variables in `backend/.env` according to the backend configuration.

### 6. Start the Backend

```bash
npm run dev
```

Backend runs at:

```text
http://localhost:5000
```

## Database

The application uses MongoDB to store consultation details and related information. Mongoose is used to interact with the database.

## Future Enhancements

- Email and SMS notifications.
- Online payment integration.
- Advanced customer tracking.
- Appointment reminders.
- Improved admin reports and analytics.

## Important Disclaimer

This is a private passport consultancy assistance system. It is not affiliated with the Government of India. It does not issue passports, make passport approval decisions, or guarantee passport approval.

## Author

**Puthi Amrutha Lahari**  
**Roll Number:** 24761A0547  
**Course:** B.Tech – Computer Science and Engineering  
**Project:** Full Stack Development (FSD-II)

## License

This project is developed for academic purposes.

