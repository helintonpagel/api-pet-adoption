import { User } from "../models/User.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

export const AuthService = {
  async login(email, password) {
    const user = await User.getByEmail(email);

    if (!user) {
      throw new Error("USER_NOT_FOUND");
    }

    const pw = await bcrypt.hash(password, 10);
    console.log(pw);

    const isPasswordValid = await bcrypt.compare(password, user.password);

    if (!isPasswordValid) {
      throw new Error("INVALID_PASSWORD");
    }

    const token = jwt.sign({ id: user.id, role: user.role }, process.env.SECRET_KEY, { expiresIn: "1h" });
    return { token, user: { id: user.id, name: user.name, email: user.email, role: user.role } };
  },
};
