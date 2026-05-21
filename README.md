# Reserva Server - Sports Facility Booking API

## Server Live URL
https://reserva-server.vercel.app/

---

## Project Overview

Reserva Server powers the backend of the Reserva Sports Facility Booking Platform. It handles authentication, facility management, booking operations, protected APIs, and database communication securely using Express.js and MongoDB.

The server provides REST APIs for managing facilities, bookings, authentication, and secure user operations.

---

## Features

- RESTful API Architecture
- JWT Authentication
- HTTPOnly Cookie Support
- Secure Protected Routes
- MongoDB Database Integration
- CRUD Operations for Facilities
- Booking Management System
- Search & Filter APIs
- Environment Variable Security
- CORS Configuration

---

## Technologies Used

### Backend
- Node.js
- Express.js

### Database
- MongoDB

### Authentication
- JWT
- Better Auth

---

## NPM Packages Used

- express
- cors
- dotenv
- mongodb
- cjs

---

## API Functionalities

### Facility APIs
- Get All Facilities
- Get Single Facility
- Add Facility
- Update Facility
- Delete Facility
- Search Facilities
- Filter by Sport Type

### Booking APIs
- Create Booking
- Get User Bookings
- Cancel Booking

### Authentication APIs
- Generate JWT
- Verify JWT Middleware
- Store Token in HTTPOnly Cookies

---

## Environment Variables

Create a `.env` file:

```env
PORT=8000

MONGODB_URI=your_mongodb_uri

JWT_SECRET=your_jwt_secret
```

---

## Installation & Setup

### Clone Repository

```bash
https://github.com/rohan-bhau/reserva-server
```

### Install Dependencies

```bash
npm install
```

### Start Development Server

```bash
npm run dev
```

---

## Database Collections

### Facilities Collection
- name
- sportType
- location
- price
- capacity
- timeSlots
- description
- authorEmail
- image

### Bookings Collection
- facility_id
- user_email
- booking_date
- time_slot
- hours
- total_price
- status

---

## Security Features

- Protected Private APIs
- HTTPOnly Cookie Authentication
- Environment Variable Protection
- Secure MongoDB Credentials
- CORS Security

---

## Future Improvements

- Payment Integration
- Admin Dashboard
- Booking Approval System
- Facility Analytics
- Real-time Booking Updates

---

## Author

Developed by Rohan Mia
