import { Router } from "express";
import { UserController } from "../controllers/UserController.js";
import { AuthMiddleware } from "../middlewares/AuthMiddleware.js";
import { RoleMiddleware } from "../middlewares/RoleMiddleware.js";

export const userRouter = Router();

userRouter.post("/", UserController.create);
userRouter.get("/", AuthMiddleware.authenticate, RoleMiddleware.requireAdmin, UserController.getAll);
userRouter.get("/:id", AuthMiddleware.authenticate, RoleMiddleware.requireOwner, UserController.getOne);
userRouter.put("/:id", AuthMiddleware.authenticate, RoleMiddleware.requireOwner, UserController.update);
userRouter.delete("/:id", AuthMiddleware.authenticate, RoleMiddleware.requireOwner, UserController.delete);
