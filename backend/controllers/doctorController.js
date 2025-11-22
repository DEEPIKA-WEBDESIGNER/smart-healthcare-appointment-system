const Doctor = require('../models/Doctor');

// Get all doctors
exports.getAllDoctors = async (req, res) => {
    try {
        const doctors = await Doctor.findAll();
        res.json({ success: true, data: doctors });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};

// Get doctor by ID
exports.getDoctorById = async (req, res) => {
    try {
        const doctor = await Doctor.findById(req.params.id);
        if (!doctor) {
            return res.status(404).json({ success: false, message: 'Doctor not found' });
        }
        res.json({ success: true, data: doctor });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};

// Get doctors by specialization
exports.getDoctorsBySpecialization = async (req, res) => {
    try {
        const doctors = await Doctor.findBySpecialization(req.params.specialization);
        res.json({ success: true, data: doctors });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};

// Create new doctor
exports.createDoctor = async (req, res) => {
    try {
        const doctorId = await Doctor.create(req.body);
        res.status(201).json({ 
            success: true, 
            message: 'Doctor added successfully',
            data: { id: doctorId }
        });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};

// Update doctor
exports.updateDoctor = async (req, res) => {
    try {
        const affectedRows = await Doctor.update(req.params.id, req.body);
        if (affectedRows === 0) {
            return res.status(404).json({ success: false, message: 'Doctor not found' });
        }
        res.json({ success: true, message: 'Doctor updated successfully' });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};

// Delete doctor
exports.deleteDoctor = async (req, res) => {
    try {
        const affectedRows = await Doctor.delete(req.params.id);
        if (affectedRows === 0) {
            return res.status(404).json({ success: false, message: 'Doctor not found' });
        }
        res.json({ success: true, message: 'Doctor deleted successfully' });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};
