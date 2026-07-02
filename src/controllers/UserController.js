import { UserService } from "../services/UserService.js";

export const UserController = {
  async getAll(req, res) {
    try {
      const users = await UserService.getAll();
      res.json(users);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },

  async getOne(req, res) {
    try {
      const user = await UserService.getOne(req.params.id);
      res.json(user);
    } catch (error) {
      if (error.message === "USER_NOT_FOUND") {
        res.status(404).json({ error: error.message });
      } else {
        res.status(500).json({ error: error.message });
      }
    }
  },

  async create(req, res) {
    try {
      const user = await UserService.create(req.body);
      res.status(201).json(user);
    } catch (error) {
      if (error.message === "USER_ALREADY_EXISTS") {
        res.status(400).json({ error: error.message });
      } else {
        res.status(500).json({ error: error.message });
      }
    }
  },

  async update(req, res) {
    try {
      const user = await UserService.update(req.params.id, req.body);
      res.json(user);
    } catch (error) {
      if (error.message === "USER_NOT_FOUND" || error.message === "EMAIL_ALREADY_EXISTS") {
        res.status(400).json({ error: error.message });
      } else {
        res.status(500).json({ error: error.message });
      }
    }
  },

  async delete(req, res) {
    try {
      await UserService.delete(req.params.id);
      res.status(204).send();
    } catch (error) {
      if (error.message === "USER_NOT_FOUND") {
        return res.status(404).json({ error: error.message });
      }
      res.status(500).json({ error: error.message });
    }
  },
};
