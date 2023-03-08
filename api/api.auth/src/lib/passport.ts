import { Request } from "express";
import passport from "passport";
import passportJwt from "passport-jwt";


const ExtractJwt = passportJwt.ExtractJwt;
const StrategyJwt = passportJwt.Strategy;

const cookieExtractor = function (req: Request) {
	let token = null;
	console.log(
		"Extracting: ",
		req.cookies["api-auth"],
		req.signedCookies["api-auth"]
	);
	if (req && req.cookies) token = req.cookies["api-auth"];
	// if (req && req.signedCookies && req.signedCookies.jwt) {
	//   token = req.signedCookies["jwt"]["token"];
	// }
	return token;
};

console.log(process.env.JWT_SECRET);


passport.use(
	new StrategyJwt(
		{
			// jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
			jwtFromRequest: cookieExtractor,
			secretOrKey: process.env.JWT_SECRET,
			passReqToCallback: true,
			ignoreExpiration: false
		},
		async function (req: Request, jwtPayload: any, done: any) {
			return ({ id: 4, name: "Martin Mwangi" })
		}
	)
);