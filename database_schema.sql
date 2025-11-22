-- Create Database
CREATE DATABASE IF NOT EXISTS healthcare_db;
USE healthcare_db;

-- Patients Table
CREATE TABLE IF NOT EXISTS patients (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    email VARCHAR(100) UNIQUE NOT NULL,
    phone VARCHAR(20) NOT NULL,
    password VARCHAR(255) NOT NULL,
    date_of_birth DATE NOT NULL,
    gender ENUM('Male', 'Female', 'Other') NOT NULL,
    address TEXT NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

-- Doctors Table
CREATE TABLE IF NOT EXISTS doctors (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    email VARCHAR(100) UNIQUE NOT NULL,
    phone VARCHAR(20) NOT NULL,
    specialization VARCHAR(100) NOT NULL,
    qualification VARCHAR(255) NOT NULL,
    experience INT NOT NULL,
    consultation_fee DECIMAL(10, 2) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

-- Appointments Table
CREATE TABLE IF NOT EXISTS appointments (
    id INT AUTO_INCREMENT PRIMARY KEY,
    patient_id INT NOT NULL,
    doctor_id INT NOT NULL,
    appointment_date DATE NOT NULL,
    appointment_time TIME NOT NULL,
    symptoms TEXT NOT NULL,
    status ENUM('pending', 'confirmed', 'completed', 'cancelled') DEFAULT 'pending',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (patient_id) REFERENCES patients(id) ON DELETE CASCADE,
    FOREIGN KEY (doctor_id) REFERENCES doctors(id) ON DELETE CASCADE
);

-- Insert Sample Doctors
INSERT INTO doctors (name, email, phone, specialization, qualification, experience, consultation_fee) VALUES
('Dr. John Smith', 'john.smith@hospital.com', '+91-98765-43210', 'Cardiology', 'MD, FACC', 15, 1200.00),
('Dr. Sarah Johnson', 'sarah.johnson@hospital.com', '+91-98765-43211', 'Neurology', 'MD, PhD', 12, 1500.00),
('Dr. Michael Brown', 'michael.brown@hospital.com', '+91-98765-43212', 'Pediatrics', 'MD, FAAP', 10, 1000.00),
('Dr. Emily Davis', 'emily.davis@hospital.com', '+91-98765-43213', 'Orthopedics', 'MD, FAAOS', 18, 1300.00),
('Dr. Robert Wilson', 'robert.wilson@hospital.com', '+91-98765-43214', 'Dermatology', 'MD, FAAD', 8, 1100.00),
('Dr. Jennifer Martinez', 'jennifer.martinez@hospital.com', '+91-98765-43215', 'General Medicine', 'MD', 14, 800.00),
('Dr. David Anderson', 'david.anderson@hospital.com', '+91-98765-43216', 'Cardiology', 'MD, FACC', 20, 1400.00),
('Dr. Lisa Taylor', 'lisa.taylor@hospital.com', '+91-98765-43217', 'Neurology', 'MD, PhD', 9, 1450.00);

-- Indexes for better performance
CREATE INDEX idx_patient_email ON patients(email);
CREATE INDEX idx_doctor_specialization ON doctors(specialization);
CREATE INDEX idx_appointment_date ON appointments(appointment_date);
CREATE INDEX idx_appointment_status ON appointments(status);
