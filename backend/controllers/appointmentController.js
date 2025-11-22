const Appointment = require('../models/Appointment');

// Get all appointments
exports.getAllAppointments = async (req, res) => {
    try {
        const appointments = await Appointment.findAll();
        res.json({ success: true, data: appointments });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};

// Get appointment by ID
exports.getAppointmentById = async (req, res) => {
    try {
        const appointment = await Appointment.findById(req.params.id);
        if (!appointment) {
            return res.status(404).json({ success: false, message: 'Appointment not found' });
        }
        res.json({ success: true, data: appointment });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};

// Get appointments by patient ID
exports.getAppointmentsByPatient = async (req, res) => {
    try {
        const appointments = await Appointment.findByPatientId(req.params.patientId);
        res.json({ success: true, data: appointments });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};

// Get appointments by doctor ID
exports.getAppointmentsByDoctor = async (req, res) => {
    try {
        const appointments = await Appointment.findByDoctorId(req.params.doctorId);
        res.json({ success: true, data: appointments });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};

// Create new appointment
exports.createAppointment = async (req, res) => {
    try {
        const appointmentId = await Appointment.create(req.body);
        res.status(201).json({ 
            success: true, 
            message: 'Appointment booked successfully',
            data: { id: appointmentId }
        });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};

// Update appointment
exports.updateAppointment = async (req, res) => {
    try {
        const affectedRows = await Appointment.update(req.params.id, req.body);
        if (affectedRows === 0) {
            return res.status(404).json({ success: false, message: 'Appointment not found' });
        }
        res.json({ success: true, message: 'Appointment updated successfully' });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};

// Update appointment status
exports.updateAppointmentStatus = async (req, res) => {
    try {
        const { status } = req.body;
        const affectedRows = await Appointment.updateStatus(req.params.id, status);
        if (affectedRows === 0) {
            return res.status(404).json({ success: false, message: 'Appointment not found' });
        }
        res.json({ success: true, message: 'Appointment status updated successfully' });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};

// Delete appointment
exports.deleteAppointment = async (req, res) => {
    try {
        const affectedRows = await Appointment.delete(req.params.id);
        if (affectedRows === 0) {
            return res.status(404).json({ success: false, message: 'Appointment not found' });
        }
        res.json({ success: true, message: 'Appointment cancelled successfully' });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};
