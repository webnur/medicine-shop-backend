import express, { NextFunction, Request, Response } from "express";

import { UserController } from "./user.controller";
import { FileUploadHelper } from "../../../helpers/FileUploadHelper";
import { UserValidation } from "./user.validation";
import validateRequest from "../../middlewares/validateRequest";

const router = express.Router();

router.post(
  "/create-user",
  UserController.createUser,
  validateRequest(UserValidation.createUser)

  //   FileUploadHelper.upload.single("file"),
  //   (req: Request, res: Response, next: NextFunction) => {
  //     req.body = UserValidation.createUser.parse(JSON.parse(req.body.data))
  //     return UserController.createUser(req, res, next)

  // }
  //   UserController.createUser
);
router.get("/verify", UserController.verifyEmail);

export const UserRoutes = router;
