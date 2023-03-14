import { config } from "./config/config";
import express from "express";
import cors from "cors";
import helmet from "helmet";
import morgan from "morgan";
import passport from "passport";

import authRoutes from "./routes/auth.routes"

import "./lib/passport";
import Logger from "./utils/logger";
import mongoDbConnect from "./utils/mongoDbConnect";

const app = express();

app.use(passport.initialize());
// app.use(passport.session());
app.use(cors())
app.use(express.urlencoded({ extended: true }))
app.use(express.json())
app.use(helmet());
app.use(morgan("dev"));

mongoDbConnect();

app.use("/api/auth", authRoutes);

app.listen(config.PORT, () => {
	Logger.info(`🔥 App running on PORT ${config.PORT} ==> http://localhost:${config.PORT}`);
})
