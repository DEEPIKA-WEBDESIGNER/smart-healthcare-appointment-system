const db = require('../config/database');

class Patient {
    static async findAll() {
        const [rows] = await db.query('SELECT * FROM patients ORDER BY created_at DESC');
        return rows;
    }

    static async findById(id) {
        const [rows] = await db.query('SELECT * FROM patients WHERE id = ?', [id]);
        return rows[0];
    }

    static async findByEmail(email) {
        const [rows] = await db.query('SELECT * FROM patients WHERE email = ?', [email]);
        return rows[0];
    }

    static async create(patientData) {
        const { name, email, phone, password, date_of_birth, gender, address } = patientData;
        const [result] = await db.query(
            'INSERT INTO patients (name, email, phone, password, date_of_birth, gender, address) VALUES (?, ?, ?, ?, ?, ?, ?)',
            [name, email, phone, password, date_of_birth, gender, address]
        );
        return result.insertId;
    }

    static async update(id, patientData) {
        const { name, email, phone, date_of_birth, gender, address } = patientData;
        const [result] = await db.query(
            'UPDATE patients SET name = ?, email = ?, phone = ?, date_of_birth = ?, gender = ?, address = ? WHERE id = ?',
            [name, email, phone, date_of_birth, gender, address, id]
        );
        return result.affectedRows;
    }

    static async delete(id) {
        const [result] = await db.query('DELETE FROM patients WHERE id = ?', [id]);
        return result.affectedRows;
    }
}

module.exports = Patient;
