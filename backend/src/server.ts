import dotenv from "dotenv";
dotenv.config();

import express from "express";
import cors from "cors";
import helmet from "helmet";
import morgan from "morgan";


import "./lib/passport";

const app = express();

app.use(cors())
app.use(express.urlencoded({ extended: true }))
app.use(express.json())
app.use(helmet());
app.use(morgan("dev"));


const PORT = process.env.PORT || 8800
app.listen(PORT, () => {
	console.log(`🔥 App running on PORT : ${PORT} http://localhost:${PORT}`);
})
