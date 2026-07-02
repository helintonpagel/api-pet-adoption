import { pool } from "../config/pool.js";

export const Pet = {
  async getAll() {
    const [rows] = await pool.query("SELECT * FROM pets");
    return rows;
  },

  async getOne(id) {
    const [rows] = await pool.query("SELECT * FROM pets WHERE id = ?", [id]);
    return rows[0];
  },

  async create(pet) {
    const { name, birth_date, gender, species, breed, color, size, weight, description } = pet;
    const [result] = await pool.query(
      "INSERT INTO pets (name, birth_date, gender, species, breed, color, size, weight, description) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)",
      [name, birth_date, gender, species, breed || null, color || null, size, weight || null, description || null],
    );
    return { id: result.insertId, ...pet, status: "available" };
  },

  async update(id, pet) {
    const fields = [];
    const values = [];

    for (const [key, value] of Object.entries(pet).filter((item) => item[1] !== undefined)) {
      fields.push(`${key} = ?`);
      values.push(value);
    }

    if (fields.length === 0) return null;

    values.push(id);

    const query = `UPDATE pets SET ${fields.join(", ")} WHERE id = ? AND deleted_at IS NULL`;
    const [result] = await pool.query(query, values);

    return result.affectedRows > 0 ? { id, ...pet } : null;
  },

  async delete(id) {
    const [result] = await pool.query("UPDATE pets SET deleted_at = NOW() WHERE id = ? AND deleted_at IS NULL", [id]);
    return result.affectedRows > 0;
  },
};
