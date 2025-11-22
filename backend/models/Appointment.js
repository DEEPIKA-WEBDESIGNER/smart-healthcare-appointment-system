const db = require('../config/database');

class Appointment {
    static async findAll() {
        const [rows] = await db.query(`
            SELECT a.*, p.name as patient_name, d.name as doctor_name, d.specialization 
            FROM appointments a 
            JOIN patients p ON a.patient_id = p.id 
            JOIN doctors d ON a.doctor_id = d.id 
            ORDER BY a.appointment_date DESC, a.appointment_time DESC
        `);
        return rows;
    }

    static async findById(id) {
        const [rows] = await db.query(`
            SELECT a.*, p.name as patient_name, p.email as patient_email, p.phone as patient_phone,
                   d.name as doctor_name, d.specialization, d.consultation_fee 
            FROM appointments a 
            JOIN patients p ON a.patient_id = p.id 
            JOIN doctors d ON a.doctor_id = d.id 
            WHERE a.id = ?
        `, [id]);
        return rows[0];
    }

    static async findByPatientId(patientId) {
        const [rows] = await db.query(`
            SELECT a.*, d.name as doctor_name, d.specialization 
            FROM appointments a 
            JOIN doctors d ON a.doctor_id = d.id 
            WHERE a.patient_id = ? 
            ORDER BY a.appointment_date DESC, a.appointment_time DESC
        `, [patientId]);
        return rows;
    }

    static async findByDoctorId(doctorId) {
        const [rows] = await db.query(`
            SELECT a.*, p.name as patient_name, p.phone as patient_phone 
            FROM appointments a 
            JOIN patients p ON a.patient_id = p.id 
            WHERE a.doctor_id = ? 
            ORDER BY a.appointment_date DESC, a.appointment_time DESC
        `, [doctorId]);
        return rows;
    }

    static async create(appointmentData) {
        const { patient_id, doctor_id, appointment_date, appointment_time, symptoms, status } = appointmentData;
        const [result] = await db.query(
            'INSERT INTO appointments (patient_id, doctor_id, appointment_date, appointment_time, symptoms, status) VALUES (?, ?, ?, ?, ?, ?)',
            [patient_id, doctor_id, appointment_date, appointment_time, symptoms, status || 'pending']
        );
        return result.insertId;
    }

    static async update(id, appointmentData) {
        const { appointment_date, appointment_time, symptoms, status } = appointmentData;
        const [result] = await db.query(
            'UPDATE appointments SET appointment_date = ?, appointment_time = ?, symptoms = ?, status = ? WHERE id = ?',
            [appointment_date, appointment_time, symptoms, status, id]
        );
        return result.affectedRows;
    }

    static async updateStatus(id, status) {
        const [result] = await db.query(
            'UPDATE appointments SET status = ? WHERE id = ?',
            [status, id]
        );
        return result.affectedRows;
    }

    static async delete(id) {
        const [result] = await db.query('DELETE FROM appointments WHERE id = ?', [id]);
        return result.affectedRows;
    }
}

module.exports = Appointment;
