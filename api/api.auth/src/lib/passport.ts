import passport from "passport";
import passportJwt from "passport-jwt";
import passportLocal from "passport-local"
import User from "../models/user.model";


const ExtractJwt = passportJwt.ExtractJwt;
const StrategyJwt = passportJwt.Strategy;
const LocalStrategy = passportLocal.Strategy;

// const cookieExtractor = function (req: Request) {
// 	let token = null;
// 	console.log(
// 		"Extracting: ",
// 		req.cookies["api-auth"],
// 		req.signedCookies["api-auth"]
// 	);
// 	if (req && req.cookies) token = req.cookies["api-auth"];
// 	// if (req && req.signedCookies && req.signedCookies.jwt) {
// 	//   token = req.signedCookies["jwt"]["token"];
// 	// }
// 	return token;
// };


passport.use(
	new StrategyJwt(
		{
			jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
			// jwtFromRequest: cookieExtractor,
			secretOrKey: process.env.JWT_SECRET,
			passReqToCallback: true,
			ignoreExpiration: false
		},
		async (jwtPayload: any, done: any) => {
			try {
				const user = await User.findById(jwtPayload?._id);
				if (user) {
					done(null, jwtPayload)
				} else {
					throw new Error("Invalid token payload")
				}
			} catch (error) {
				done(error, false)
			}
		}
	)
);

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
			usernameField: "email",
			passwordField: "password",
		},
		async (email, password, done) => {
			try {
				const user = await User.findOne({ email: email });
				if (!user) return done(null, false);
				const isMatch = await (user as any).matchPassword(password);
				if (!isMatch)
					return done(null, false);
				// if passwords match return user
				return done(null, user);
			} catch (error) {
				console.log(error)
				return done(error, false);
			}
		}
	)
);