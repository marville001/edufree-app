import jwt from "jsonwebtoken";
import { config } from "../config/config";

const signToken = (data: { _id: string, role: string }) => {
	return jwt.sign(data, config.JWT_SECRET, {
		expiresIn: "24h"
	})
}

export default signToken;