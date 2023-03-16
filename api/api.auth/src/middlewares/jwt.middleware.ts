import { RequestHandler } from "express";
import passport from "passport";

const jwtMiddleware: RequestHandler = (req, res, next) =>
	passport.authenticate("jwt", { session: false },
		(_error: any, user: any, _info: { message: string }) => {

			if (!user)
				res.status(401).json({ message: "Invalid or expired token" })

			req.user = user;

			next()
		})(req, res)

export default jwtMiddleware