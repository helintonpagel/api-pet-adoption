export const RoleMiddleware = {
  requireAdmin(req, res, next) {
    if (req.user.role !== "admin") {
      return res.status(403).json({ error: "FORBIDDEN" });
    }
    next();
  },

  requireUser(req, res, next) {
    if (req.user.role !== "user") {
      return res.status(403).json({ error: "FORBIDDEN" });
    }
    next();
  },

  requireOwner(req, res, next) {
    const userId = parseInt(req.params.id, 10);
    if (req.user.id !== userId && req.user.role !== "admin") {
      return res.status(403).json({ error: "FORBIDDEN" });
    }
    next();
  },
};
