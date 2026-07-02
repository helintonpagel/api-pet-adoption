import { User } from "../models/User.js";
import bcrypt from "bcryptjs";

export const UserService = {
  async getAll() {
    return await User.getAll();
  },

  async getOne(id) {
    const user = await User.getOne(id);

    if (!user) {
      throw new Error("USER_NOT_FOUND");
    }

    return user;
  },

  async create(user) {
    const existingUser = await User.getByEmail(user.email);

    if (existingUser) {
      throw new Error("USER_ALREADY_EXISTS");
    }

    user.password = await bcrypt.hash(user.password, 10);
    return await User.create(user);
  },

  async update(id, user) {
    const existingUser = await User.getOne(id);

    if (!existingUser) {
      throw new Error("USER_NOT_FOUND");
    }

    if (user.email && user.email !== existingUser.email) {
      const emailExists = await User.getByEmail(user.email);

      if (emailExists) {
        throw new Error("EMAIL_ALREADY_EXISTS");
      }
    }

    if (user.password) {
      user.password = await bcrypt.hash(user.password, 10);
    }

    return await User.update(id, user);
  },

  async delete(id) {
    const existingUser = await User.getOne(id);

    if (!existingUser) {
      throw new Error("USER_NOT_FOUND");
    }

    return await User.delete(id);
  },
};
