import jwt from "jsonwebtoken";
import userModel from '../Models/signinSigup.model';

const secret:string =  "All_is_Well"


const verifyRefreshToken = (refreshToken: string) => {
	const privateKey = process.env.REFRESH_TOKEN_PRIVATE_KEY;

	return new Promise((resolve, reject) => {
		userModel.findOne({ token: refreshToken }, (_err: any, doc: any) => {
			if (!doc)
				return reject({ error: true, message: "Invalid refresh token" });

			jwt.verify(refreshToken, secret, (err: any, tokenDetails: any) => {
				if (err)
					return reject({ error: true, message: "Invalid refresh token" });
				resolve({
					tokenDetails,
					error: false,
					message: "Valid refresh token",
				});
			});
		});
	});
};

export default verifyRefreshToken;
