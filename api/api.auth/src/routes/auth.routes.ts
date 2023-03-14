import { NextFunction, RequestHandler, Router } from "express";
import passport from "passport";
import {
	loginController,
	registerController,
	updatePasswordController,
	forgotPasswordController,
	resetPasswordController,
} from "../controllers/auth.controller";
import schemaValidator from "../middlewares/schemaValidar";
import { loginSchema, registerSchema, updatePasswordSchema } from "../schemas/auth.schemas";

const router = Router();

router.get("/me",
	passport.authenticate("jwt", { session: false }),
	(req, res) => {
		res.json({ user: req.user });
	}
)


router.post("/login",
	schemaValidator(loginSchema, "body"),
	passport.authenticate('local-login', { session: false }),
	loginController
);

router.post("/signup",
	schemaValidator(registerSchema, "body"),
	passport.authenticate('local-signup', { session: false }),
	registerController
);

router.post("/update-password", schemaValidator(updatePasswordSchema, "body"), updatePasswordController);

router.post("/forgot-password", forgotPasswordController);
router.put("/reset-password/:token", resetPasswordController);
export default router;