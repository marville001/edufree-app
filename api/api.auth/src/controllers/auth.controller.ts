import { Request, Response } from "express";
import { ILoginUserBody, IRegisterUserBody } from "../interfaces/user.interfaces";
import User from "../models/user.model";
import catchAsync from "../utils/catchAsync";
import signToken from "../utils/signToken";
import _ from "lodash"

export const loginController = catchAsync(async (req: Request<{}, {}, ILoginUserBody>, res: Response) => {

	const user = req.user as any;

	const token = await signToken({ _id: user?._id._id, role: user?.role });

	res.status(200).json({
		success: true,
		message: `Login Successfull.`,
		user: _.pick(user, ["_id", "name", "email", "role", "avatar", "username", "status"]),
		token,
	});
})

export const registerController = catchAsync(async (req: Request<{}, {}, IRegisterUserBody>, res: Response) => {

	const { email, password, username, name } = req.body;

	const user = await User.create({
		email, password, username, name
	});

	user.save({ validateBeforeSave: false });

	res.status(200).json({
		success: true,
		message: `User Signup Successfull.`,
	});
})

export const updatePasswordController = catchAsync(async (req: Request<{}, {}, ILoginUserBody>, res: Response) => {
	console.log(req, res);

})

export const forgotPasswordController = catchAsync(async (req: Request<{}, {}, ILoginUserBody>, res: Response) => {
	console.log(req, res);
})

export const resetPasswordController = catchAsync(async (req: Request<{}, {}, ILoginUserBody>, res: Response) => {
	console.log(req, res);
})