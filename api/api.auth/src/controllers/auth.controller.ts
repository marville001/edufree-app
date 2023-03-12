import { Request, Response } from "express";
import { ILoginUserBody } from "../interfaces/user.interfaces";
import catchAsync from "../utils/catchAsync";
import signToken from "../utils/signToken";

export const loginController = catchAsync(async (req: Request<{}, {}, ILoginUserBody>, res: Response) => {

	const user = req.user as any;

	console.log(user);

	const token = await signToken({ _id: user?._id._id, role: user?.role });

	res.status(200).json({
		success: true,
		message: `Login Successfull.`,
		user: user,
		token,
	});
})

export const registerController = catchAsync(async (req: Request<{}, {}, ILoginUserBody>, res: Response) => {

	const user = req.user as any;

	console.log(user);


	const token = await signToken({ _id: user?._id._id, role: user?.role });

	res.status(200).json({
		success: true,
		message: `Login Successfull.`,
		user: user,
		token,
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