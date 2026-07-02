export const RoleMiddleware = {
  requireAdmin(req, res, next) {
    if (req.user.role !== "admin") {
      return res.status(403).json({ error: "FORBIDDEN" });
    }
    next();
  },

  requireOwner(req, res, next) {
    if (req.user.id !== req.params.id && req.user.role !== "admin") {
      return res.status(403).json({ error: "FORBIDDEN" });
    }
    next();
  },
};
