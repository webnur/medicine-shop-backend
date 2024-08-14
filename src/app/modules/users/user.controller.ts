import { Request, RequestHandler, Response } from "express";
import catchAsync from "../../../shared/catchAsync";
import { UserService } from "./user.service";
import sendResponse from "../../../shared/sendResponse";
import { IUser } from "./user.interface";
import httpStatus from "http-status";
// import { UserFilterableFields } from "./user.constants";
// import pick from "../../../shared/pick";
// import { paginationFields } from "../../../constants/pagination";

const createUser: RequestHandler = catchAsync(
  async (req: Request, res: Response) => {
    const userData = req.body;

    const result = await UserService.createUser(userData);

    sendResponse<IUser>(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: "created user successfully!",
      data: result,
    });
  }
);
const verifyEmail: RequestHandler = catchAsync(
  async (req: Request, res: Response) => {
    const { email } = req.query;
    const { code } = req.body;

    const result = await UserService.verifyEmail(email as string, code);

    sendResponse<IUser>(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: "created Student successfully!",
      data: result,
    });
  }
);

export const UserController = {
  createUser,
  verifyEmail,
};
