import { config } from "./config/config";
import express from "express";
import cors from "cors";
import helmet from "helmet";
import morgan from "morgan";
import mongoose from "mongoose";


import "./lib/passport";

const app = express();

app.use(cors())
app.use(express.urlencoded({ extended: true }))
app.use(express.json())
app.use(helmet());
app.use(morgan("dev"));

// Connect to Mongodb
mongoose
	.connect(config.DB_URL, { retryWrites: true, w: "majority" })
	.then(() => {
		console.log("DB Connection Successfull");
	})
	.catch((error) => {
		console.log(`DB Connection Errored : ${error.message}`);
		process.exit(error ? 1 : 0)
	})

app.listen(config.PORT, () => {
	console.log(`🔥 App running on PORT : ${config.PORT} http://localhost:${config.PORT}`);
})
