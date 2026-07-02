import { Router } from "express";
import { PetController } from "../controllers/PetController.js";
import { AuthMiddleware } from "../middlewares/AuthMiddleware.js";
import { RoleMiddleware } from "../middlewares/RoleMiddleware.js";

export const petRouter = Router();

petRouter.get("/", PetController.getAll);
petRouter.get("/:id", PetController.getOne);

petRouter.post("/", AuthMiddleware.authenticate, RoleMiddleware.requireAdmin, PetController.create);
petRouter.put("/:id", AuthMiddleware.authenticate, RoleMiddleware.requireAdmin, PetController.update);
petRouter.delete("/:id", AuthMiddleware.authenticate, RoleMiddleware.requireAdmin, PetController.delete);
