import dotenv from "dotenv";
dotenv.config();

const PORT = process.env.PORT || 8800
const DB_URL = process.env.DB_URL || "";
const JWT_SECRET = process.env.JWT_SECRET as string

export const config = {
	PORT,
	DB_URL,
	JWT_SECRET
}