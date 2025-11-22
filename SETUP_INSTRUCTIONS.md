# SETUP INSTRUCTIONS

## Quick Start Guide

Follow these steps to set up and run the Smart Healthcare Appointment Management System:

### Step 1: Install MySQL

1. Download and install MySQL from: https://dev.mysql.com/downloads/mysql/
2. During installation, remember your root password
3. Start the MySQL service

### Step 2: Create Database

Option A - Using MySQL Command Line:
```bash
mysql -u root -p
# Enter your password when prompted
# Then run:
source database_schema.sql
exit
```

Option B - Using MySQL Workbench:
1. Open MySQL Workbench
2. Connect to your local MySQL server
3. File > Open SQL Script
4. Select `database_schema.sql`
5. Execute the script (lightning bolt icon)

### Step 3: Install Node.js Dependencies

Open terminal/command prompt in the project directory:
```bash
npm install
```

This will install all required packages:
- express
- mysql2
- cors
- dotenv
- bcrypt
- jsonwebtoken
- nodemon (dev dependency)

### Step 4: Configure Database Connection

1. Open the `.env` file
2. Update the database credentials:

```
DB_HOST=localhost
DB_USER=root
DB_PASSWORD=YOUR_MYSQL_PASSWORD_HERE
DB_NAME=healthcare_db
PORT=3000
JWT_SECRET=change_this_to_random_secret_key
```

### Step 5: Start the Server

For development (with auto-restart):
```bash
npm run dev
```

For production:
```bash
npm start
```

You should see:
```
Server is running on port 3000
Frontend: http://localhost:3000
API: http://localhost:3000/api
Database connected successfully!
```

### Step 6: Access the Application

Open your web browser and go to:
```
http://localhost:3000
```

### Step 7: Test the Application

1. Click "Register" to create a patient account
2. Fill in all required information
3. Login with your credentials
4. Browse doctors by specialization
5. Book an appointment
6. View your appointments

## Default Sample Data

The database comes with 8 sample doctors:

1. Dr. John Smith - Cardiology
2. Dr. Sarah Johnson - Neurology
3. Dr. Michael Brown - Pediatrics
4. Dr. Emily Davis - Orthopedics
5. Dr. Robert Wilson - Dermatology
6. Dr. Jennifer Martinez - General Medicine
7. Dr. David Anderson - Cardiology
8. Dr. Lisa Taylor - Neurology

## Troubleshooting

### Database Connection Error
- Verify MySQL is running
- Check credentials in `.env` file
- Ensure database `healthcare_db` exists
- Test connection: `mysql -u root -p healthcare_db`

### Port Already in Use
- Change PORT in `.env` file to another port (e.g., 3001)
- Update API_URL in `frontend/js/app.js` accordingly

### Module Not Found Error
- Run `npm install` again
- Delete `node_modules` folder and run `npm install`

### CORS Error
- Ensure backend server is running
- Check that API_URL in frontend matches server port

## Project Structure Overview

```
├── backend/               # Server-side code
│   ├── config/           # Database configuration
│   ├── controllers/      # Business logic
│   ├── models/           # Database models
│   ├── routes/           # API routes
│   └── server.js         # Main entry point
├── frontend/             # Client-side code
│   ├── css/             # Stylesheets
│   ├── js/              # JavaScript files
│   └── index.html       # Main HTML page
├── .env                 # Environment variables
├── package.json         # Dependencies
└── database_schema.sql  # Database schema
```

## Development Tips

1. Use `npm run dev` for development (auto-restart on changes)
2. Check browser console for frontend errors
3. Check terminal for backend errors
4. Test API endpoints using Postman or similar tools

## Need Help?

- Check README.md for detailed documentation
- Verify all prerequisites are installed
- Ensure all steps were followed in order
- Check for error messages in terminal and browser console
