import { AuthService } from "../services/AuthService.js";

export const AuthController = {
  async login(req, res) {
    try {
      const { email, password } = req.body;
      const result = await AuthService.login(email, password);
      res.json(result);
    } catch (error) {
      if (error.message === "USER_NOT_FOUND" || error.message === "INVALID_PASSWORD") {
        res.status(401).json({ error: error.message });
      } else {
        res.status(500).json({ error: error.message });
      }
    }
  },
};
