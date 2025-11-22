const db = require('../config/database');

class Doctor {
    static async findAll() {
        const [rows] = await db.query('SELECT * FROM doctors ORDER BY name ASC');
        return rows;
    }

    static async findById(id) {
        const [rows] = await db.query('SELECT * FROM doctors WHERE id = ?', [id]);
        return rows[0];
    }

    static async findBySpecialization(specialization) {
        const [rows] = await db.query('SELECT * FROM doctors WHERE specialization = ?', [specialization]);
        return rows;
    }

    static async create(doctorData) {
        const { name, email, phone, specialization, qualification, experience, consultation_fee } = doctorData;
        const [result] = await db.query(
            'INSERT INTO doctors (name, email, phone, specialization, qualification, experience, consultation_fee) VALUES (?, ?, ?, ?, ?, ?, ?)',
            [name, email, phone, specialization, qualification, experience, consultation_fee]
        );
        return result.insertId;
    }

    static async update(id, doctorData) {
        const { name, email, phone, specialization, qualification, experience, consultation_fee } = doctorData;
        const [result] = await db.query(
            'UPDATE doctors SET name = ?, email = ?, phone = ?, specialization = ?, qualification = ?, experience = ?, consultation_fee = ? WHERE id = ?',
            [name, email, phone, specialization, qualification, experience, consultation_fee, id]
        );
        return result.affectedRows;
    }

    static async delete(id) {
        const [result] = await db.query('DELETE FROM doctors WHERE id = ?', [id]);
        return result.affectedRows;
    }
}

module.exports = Doctor;
