import { pool } from "../config/pool.js";

export const User = {
  async getAll() {
    const [rows] = await pool.query(
      "SELECT id, name, email, role, created_at, updated_at FROM users where deleted_at IS NULL",
    );
    return rows;
  },

  async getOne(id) {
    const [rows] = await pool.query(
      "SELECT id, name, email, role, created_at, updated_at FROM users WHERE id = ? AND deleted_at IS NULL",
      [id],
    );
    return rows[0];
  },

  async getByEmail(email) {
    const [rows] = await pool.query("SELECT * FROM users WHERE email = ? AND deleted_at IS NULL", [email]);
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

    const query = `UPDATE users SET ${fields.join(", ")} WHERE id = ? AND deleted_at IS NULL`;
    const [result] = await pool.query(query, values);

    return result.affectedRows > 0 ? { id, name: user.name, email: user.email, role: user.role } : null;
  },

  async delete(id) {
    const [result] = await pool.query("UPDATE users SET deleted_at = NOW() WHERE id = ? AND deleted_at IS NULL", [id]);
    return result.affectedRows > 0;
  },
};
