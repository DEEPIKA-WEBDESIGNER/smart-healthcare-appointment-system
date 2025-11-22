# Smart Healthcare Appointment Management System

A full-stack web application for managing healthcare appointments built with HTML, CSS, JavaScript, Node.js, Express, and MySQL.

## Project Structure

```
Smart_Healthcare_Appointment_Management/
│
├── backend/
│   ├── config/
│   │   └── database.js          # Database configuration
│   ├── controllers/
│   │   ├── authController.js    # Authentication logic
│   │   ├── patientController.js # Patient operations
│   │   ├── doctorController.js  # Doctor operations
│   │   └── appointmentController.js # Appointment operations
│   ├── models/
│   │   ├── Patient.js           # Patient model
│   │   ├── Doctor.js            # Doctor model
│   │   └── Appointment.js       # Appointment model
│   ├── routes/
│   │   ├── authRoutes.js        # Authentication routes
│   │   ├── patientRoutes.js     # Patient routes
│   │   ├── doctorRoutes.js      # Doctor routes
│   │   └── appointmentRoutes.js # Appointment routes
│   └── server.js                # Main server file
│
├── frontend/
│   ├── css/
│   │   └── style.css            # Stylesheet
│   ├── js/
│   │   └── app.js               # Frontend JavaScript
│   └── index.html               # Main HTML file
│
├── .env                         # Environment variables
├── package.json                 # NPM dependencies
└── database_schema.sql          # Database schema

```

## Features

- 👤 Patient Registration & Authentication
- 🏥 Doctor Management
- 📅 Appointment Booking System
- 📊 Appointment Status Tracking
- 🔍 Doctor Search by Specialization
- 📱 Responsive Design

## Prerequisites

- Node.js (v14 or higher)
- MySQL (v5.7 or higher)
- npm or yarn

## Installation Steps

### 1. Database Setup

1. Install MySQL and start the MySQL server
2. Import the database schema:
   ```bash
   mysql -u root -p < database_schema.sql
   ```
   Or open MySQL Workbench and run the `database_schema.sql` file

### 2. Install Dependencies

```bash
npm install
```

### 3. Configure Environment Variables

Edit the `.env` file and update with your database credentials:

DB_HOST=localhost
DB_USER=root
DB_PASSWORD=Deepika@2006
DB_NAME=healthcare_db
PORT=3000
JWT_SECRET=healthcare123

### 4. Start the Application

For development:
```bash
npm run dev
```

For production:
```bash
npm start
```

### 5. Access the Application

Open your browser and navigate to:
```
http://localhost:3000
```

## API Endpoints

### Authentication
- POST `/api/auth/register` - Register new patient
- POST `/api/auth/login` - Patient login

### Patients
- GET `/api/patients` - Get all patients
- GET `/api/patients/:id` - Get patient by ID
- POST `/api/patients` - Create new patient
- PUT `/api/patients/:id` - Update patient
- DELETE `/api/patients/:id` - Delete patient

### Doctors
- GET `/api/doctors` - Get all doctors
- GET `/api/doctors/:id` - Get doctor by ID
- GET `/api/doctors/specialization/:specialization` - Get doctors by specialization
- POST `/api/doctors` - Create new doctor
- PUT `/api/doctors/:id` - Update doctor
- DELETE `/api/doctors/:id` - Delete doctor

### Appointments
- GET `/api/appointments` - Get all appointments
- GET `/api/appointments/:id` - Get appointment by ID
- GET `/api/appointments/patient/:patientId` - Get appointments by patient
- GET `/api/appointments/doctor/:doctorId` - Get appointments by doctor
- POST `/api/appointments` - Create new appointment
- PUT `/api/appointments/:id` - Update appointment
- PATCH `/api/appointments/:id/status` - Update appointment status
- DELETE `/api/appointments/:id` - Cancel appointment

## Database Schema

### Patients Table
- id (Primary Key)
- name, email, phone, password
- date_of_birth, gender, address
- created_at, updated_at

### Doctors Table
- id (Primary Key)
- name, email, phone
- specialization, qualification, experience
- consultation_fee
- created_at, updated_at

### Appointments Table
- id (Primary Key)
- patient_id (Foreign Key)
- doctor_id (Foreign Key)
- appointment_date, appointment_time
- symptoms, status
- created_at, updated_at

## Technologies Used

### Frontend
- HTML5
- CSS3
- Vanilla JavaScript
- Responsive Design

### Backend
- Node.js
- Express.js
- MySQL2
- bcrypt (Password Hashing)
- JWT (Authentication)
- dotenv (Environment Variables)
- CORS

## Usage

1. **Register as a Patient**: Click "Register" and fill in your details
2. **Login**: Use your email and password to login
3. **Browse Doctors**: View available doctors and filter by specialization
4. **Book Appointment**: Select a doctor, choose date/time, and describe symptoms
5. **View Appointments**: Check your upcoming and past appointments
6. **Cancel Appointment**: Cancel pending appointments if needed

## Security Features

- Password hashing using bcrypt
- JWT-based authentication
- SQL injection prevention using parameterized queries
- Input validation
- CORS enabled

## Future Enhancements

- Email notifications
- Doctor dashboard
- Prescription management
- Medical records
- Payment integration
- Video consultation

## License

ISC

## Author

Healthcare Management Team

## Support

For issues and questions, please create an issue in the repository.
