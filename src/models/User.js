import { pool } from "../config/pool.js";

export const User = {
  async getAll() {
    const [rows] = await pool.query("SELECT * FROM users");
    return rows;
  },

  async getOne(id) {
    const [rows] = await pool.query("SELECT * FROM users WHERE id = ?", [id]);
    return rows[0];
  },

  async getByEmail(email) {
    const [rows] = await pool.query("SELECT * FROM users WHERE email = ?", [email]);
    return rows[0];
  },

  async create(user) {
    const { name, email, password, role = "user" } = user;
    const [result] = await pool.query("INSERT INTO users (name, email, password, role) VALUES (?, ?, ?, ?)", [
      name,
      email,
      password,
      role,
    ]);

    return { id: result.insertId, name, email, role };
  },

  async update(id, user) {
    const fields = [];
    const values = [];

    for (const [key, value] of Object.entries(user).filter((item) => item[1] !== undefined)) {
      fields.push(`${key} = ?`);
      values.push(value);
    }

    if (fields.length === 0) return null;

    values.push(id);

    const query = `UPDATE users SET ${fields.join(", ")} WHERE id = ?`;
    const [result] = await pool.query(query, values);

    return result.affectedRows > 0 ? { id, ...user } : null;
  },

  async delete(id) {
    const [result] = await pool.query("DELETE FROM users WHERE id = ?", [id]);
    return result.affectedRows > 0;
  },
};
