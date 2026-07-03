import { pool } from "../config/pool.js";

export const Adoption = {
  async getAll() {
    const [rows] = await pool.query(`
      SELECT a.id, a.adoption_date, u.name as adopter_name, u.email as adopter_email, p.name as pet_name
      FROM adoptions a
      JOIN users u ON a.user_id = u.id
      JOIN pets p ON a.pet_id = p.id
      WHERE a.deleted_at IS NULL
    `);
    return rows;
  },

  async create(userId, petId) {
    const connection = await pool.getConnection();

    try {
      await connection.beginTransaction();

      const [result] = await connection.query("INSERT INTO adoptions (user_id, pet_id) VALUES (?, ?)", [userId, petId]);

      await connection.query("UPDATE pets SET status = 'adopted' WHERE id = ? AND deleted_at IS NULL", [petId]);
      await connection.commit();
      return { id: result.insertId, user_id: userId, pet_id: petId, adoption_date: new Date() };
    } catch (error) {
      await connection.rollback();
      throw error;
    } finally {
      connection.release();
    }
  },
};
