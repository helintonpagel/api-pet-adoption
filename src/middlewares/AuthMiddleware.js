import jwt from "jsonwebtoken";

export const AuthMiddleware = {
  async authenticate(req, res, next) {
    const authHeader = req.headers.authorization;

    if (!authHeader) {
      return res.status(401).json({ error: "AUTH_HEADER_MISSING" });
    }

    const token = authHeader.split(" ")[1];

    try {
      const decoded = jwt.verify(token, process.env.SECRET_KEY);
      req.user = { id: decoded.id, role: decoded.role };
      next();
    } catch (error) {
      return res.status(401).json({ error: `INVALID_TOKEN: ${error.message}` });
    }
  },
};
