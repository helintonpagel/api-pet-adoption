import { Router } from "express";
import { AdoptionController } from "../controllers/AdoptionController.js";
import { AuthMiddleware } from "../middlewares/AuthMiddleware.js";
import { RoleMiddleware } from "../middlewares/RoleMiddleware.js";

export const adoptionRouter = Router();

adoptionRouter.post("/", AuthMiddleware.authenticate, RoleMiddleware.requireUser, AdoptionController.create);
adoptionRouter.get("/", AuthMiddleware.authenticate, RoleMiddleware.requireAdmin, AdoptionController.getAll);
