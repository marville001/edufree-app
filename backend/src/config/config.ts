import dotenv from "dotenv";
dotenv.config();

const PORT = process.env.PORT || 8800
const DB_URL = process.env.DB_URL || "";

export const config = {
	PORT,
	DB_URL
}