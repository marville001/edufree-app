import { RequestHandler } from "express";


const catchAsync = (fn: Function): RequestHandler => (req, res, next) => {
	Promise.resolve(fn(req, res, next)).catch((error) => {
		console.log(error);
		res.status(500).json({
			error: "Internal Server Error",
			message: error.message,
		});
	});
};

export default catchAsync