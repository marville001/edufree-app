import { model, Schema } from "mongoose";
import crypto from "crypto";

const userSchema = new Schema({
	email: {
		type: String,
		required: true,
		unique: true,
		trim: true,
		lowercase: true,
	},
	name: {
		type: String,
		required: true,
		trim: true,
	},
	username: {
		type: String,
		required: true,
		unique: true,
		lowercase: true,
		trim: true,
	},
	role: { type: String, default: "user" },
	password: {
		type: String,
		required: true,
		select: false,
	},
	avatar: {
		type: String,
		default:
			"https://www.kindpng.com/picc/m/207-2074624_white-gray-circle-avatar-png-transparent-png.png",
	},
	status: { type: String, enum: ["active", "inactive"], default: "active" },
	phone: String,
	gender: String,
	dob: Date,
	passwordResetToken: String,
	passwordResetExpires: Date,
	isDeleted: { type: Boolean, default: false }

}, {
	timestamps: true
})

// Method for generating a reset token
userSchema.methods.createPasswordResetToken = function () {
	const resetToken = crypto.randomBytes(32).toString("hex");

	this.passwordResetToken = crypto
		.createHash("sha256")
		.update(resetToken)
		.digest("hex");
	this.passwordResetExpires = Date.now() + 20 * 60 * 1000;
	return resetToken;
};


const User = model('User', userSchema)

export default User;