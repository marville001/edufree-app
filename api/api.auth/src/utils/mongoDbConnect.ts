import mongoose from "mongoose";
import { config } from "../config/config";
import Logger from "./logger";

const mongoDbConnect = () => {
	// Connect to Mongodb
	mongoose.Promise = global.Promise;
	mongoose
		.connect(config.DB_URL, { retryWrites: true, w: "majority" })
		.then(() => {
			Logger.info("DB Connection Successfull");
		})
		.catch((error) => {
			Logger.error(`DB Connection Errored : ${error.message}`);
			process.exit(error ? 1 : 0)
		})
}

export default mongoDbConnect