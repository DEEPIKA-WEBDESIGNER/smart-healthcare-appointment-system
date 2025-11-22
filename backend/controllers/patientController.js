const Patient = require('../models/Patient');
const bcrypt = require('bcrypt');

// Get all patients
exports.getAllPatients = async (req, res) => {
    try {
        const patients = await Patient.findAll();
        res.json({ success: true, data: patients });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};

// Get patient by ID
exports.getPatientById = async (req, res) => {
    try {
        const patient = await Patient.findById(req.params.id);
        if (!patient) {
            return res.status(404).json({ success: false, message: 'Patient not found' });
        }
        res.json({ success: true, data: patient });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};

// Create new patient
exports.createPatient = async (req, res) => {
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
            message: 'Patient registered successfully',
            data: { id: patientId }
        });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};

// Update patient
exports.updatePatient = async (req, res) => {
    try {
        const affectedRows = await Patient.update(req.params.id, req.body);
        if (affectedRows === 0) {
            return res.status(404).json({ success: false, message: 'Patient not found' });
        }
        res.json({ success: true, message: 'Patient updated successfully' });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};

// Delete patient
exports.deletePatient = async (req, res) => {
    try {
        const affectedRows = await Patient.delete(req.params.id);
        if (affectedRows === 0) {
            return res.status(404).json({ success: false, message: 'Patient not found' });
        }
        res.json({ success: true, message: 'Patient deleted successfully' });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};
