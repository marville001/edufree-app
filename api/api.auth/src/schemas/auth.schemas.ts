import Joi from 'joi';

export const loginSchema = Joi.object().keys({
	email_username: Joi.string()
		.required()
		.error((errors: any) => {
			errors.forEach((err: any) => {
				switch (err.code) {
					case "string.empty":
						err.message = "Email or Username is required!";
						break;
					default:
						break;
				}
			});
			return errors;
		}),
	password: Joi.string().required(),
})

export const registerSchema = Joi.object().keys({
	name: Joi.string().min(3).max(20).required(),
	username: Joi.string().min(5).max(20).required(),
	email: Joi.string().email().required(),
	password: Joi.string().min(8).required(),
})

export const updatePasswordSchema = Joi.object().keys({
	old_password: Joi.string().min(8).required(),
	new_password: Joi.string().min(8).required(),
	email: Joi.string().email().required(),
})