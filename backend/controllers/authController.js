const Patient = require('../models/Patient');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

// Patient login
exports.login = async (req, res) => {
    try {
        const { email, password } = req.body;

        // Find patient
        const patient = await Patient.findByEmail(email);
        if (!patient) {
            return res.status(401).json({ success: false, message: 'Invalid credentials' });
        }

        // Check password
        const isPasswordValid = await bcrypt.compare(password, patient.password);
        if (!isPasswordValid) {
            return res.status(401).json({ success: false, message: 'Invalid credentials' });
        }

        // Generate token
        const token = jwt.sign(
            { id: patient.id, email: patient.email },
            process.env.JWT_SECRET || 'your_jwt_secret_key',
            { expiresIn: '24h' }
        );

        res.json({
            success: true,
            message: 'Login successful',
            data: {
                token,
                patient: {
                    id: patient.id,
                    name: patient.name,
                    email: patient.email,
                    phone: patient.phone
                }
            }
        });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};

// Patient registration
exports.register = async (req, res) => {
    try {
        const { name, email, phone, password, date_of_birth, gender, address } = req.body;

        // Check if patient already exists
        const existingPatient = await Patient.findByEmail(email);
        if (existingPatient) {
            return res.status(400).json({ success: false, message: 'Email already registered' });
        }

        // Hash password
        const hashedPassword = await bcrypt.hash(password, 10);

        const patientId = await Patient.create({
            name,
            email,
            phone,
            password: hashedPassword,
            date_of_birth,
            gender,
            address
        });

        res.status(201).json({
            success: true,
            message: 'Registration successful',
            data: { id: patientId }
        });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};
