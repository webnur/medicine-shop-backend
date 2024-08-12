import express from "express";

import { UserController } from "./user.controller";

const router = express.Router();

router.post("/create-user", UserController.createUser);
router.get("/verify", UserController.verifyEmail);

export const UserRoutes = router;
