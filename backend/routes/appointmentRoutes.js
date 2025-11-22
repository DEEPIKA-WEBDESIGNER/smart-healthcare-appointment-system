const express = require('express');
const router = express.Router();
const appointmentController = require('../controllers/appointmentController');

router.get('/', appointmentController.getAllAppointments);
router.get('/:id', appointmentController.getAppointmentById);
router.get('/patient/:patientId', appointmentController.getAppointmentsByPatient);
router.get('/doctor/:doctorId', appointmentController.getAppointmentsByDoctor);
router.post('/', appointmentController.createAppointment);
router.put('/:id', appointmentController.updateAppointment);
router.patch('/:id/status', appointmentController.updateAppointmentStatus);
router.delete('/:id', appointmentController.deleteAppointment);

module.exports = router;
