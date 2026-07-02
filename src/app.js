import express from "express";
import { authRouter } from "./routes/authRouter.js";
import { userRouter } from "./routes/userRouter.js";

export const app = express();
app.use(express.json());

app.use("/auth", authRouter);
app.use("/users", userRouter);
