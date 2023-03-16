import passport from "passport";
import passportJwt from "passport-jwt";
import passportLocal from "passport-local"
import { config } from "../config/config";
import User from "../models/user.model";
import _ from "lodash"

const ExtractJwt = passportJwt.ExtractJwt;
const StrategyJwt = passportJwt.Strategy;
const LocalStrategy = passportLocal.Strategy;

passport.serializeUser((user: any, done) => {
	done(null, user?.id);
})

passport.deserializeUser((id: any, done) => {
	User.findById(id, (err: any, user: any) => {
		done(err, user);
	})
})

passport.use(
	"local-signup",
	new LocalStrategy(
		{
			usernameField: "email",
			passwordField: "password",
		},
		async (email: string, _password: string, done: any) => {
			try {
				// check if user exists
				const userExists = await User.findOne({ "email": email });
				if (userExists) {
					return done(null, false)
				}
				return done(null, { email });
			} catch (error) {
				done(error);
			}
		}
	)
);

passport.use(
	"local-login",
	new LocalStrategy(
		{
			usernameField: "email_username",
			passwordField: "password",
		},
		async (email, password, done) => {
			try {
				const user = await User.findOne({
					$or: [
						{ email },
						{ username: email },
					]
				});
				if (!user) return done(null, false, { message: "Invalid credentials provided" });
				const isMatch = await (user as any).matchPassword(password);
				if (!isMatch)
					return done(null, false, { message: "Invalid credentials provided" });
				// if passwords match return user
				return done(null, user);
			} catch (error) {
				console.log(error)
				return done(error, false);
			}
		}
	)
);

passport.use(
	new StrategyJwt(
		{
			jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
			// jwtFromRequest: cookieExtractor,
			secretOrKey: config.JWT_SECRET,
			// passReqToCallback: true,
			// ignoreExpiration: false
		},
		async (jwtPayload: any, done: any) => {
			console.log("dgjkdfjkghfjk");

			try {
				const user: any = await User.findById(jwtPayload?._id);
				if (user) {
					return done(null, _.pick(user, ["_id", "name", "email", "role", "avatar", "username", "status"]))
				} else {
					return done(null, false, { message: "Heey there" })
				}
			} catch (error) {
				// console.log(error);
				return done(error, false, { message: "Invalid" })
			}
		}
	)
);