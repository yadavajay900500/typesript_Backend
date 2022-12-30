import jwt from "jsonwebtoken";
import userModel from '../Models/signinSigup.model';

const secret:string =  process.env.secret_key as string



const verifyRefreshToken = async (refreshTokenFrontend: string, jwtToken: string) => {
	try {
		const decodedRefreshToken = jwt.verify(refreshTokenFrontend, secret)
		if (decodedRefreshToken) {
			try {
				const decodedAccessToken = jwt.verify(jwtToken, secret)
			} catch (err) {
				const { email } = decodedRefreshToken.data
				const userData = await userModel.findOne({ email: email })
				const { refreshToken } = userData 
				if (refreshToken === refreshTokenFrontend) {
					const { email, password, roles, refreshToken } = userData
					return {
						email, password, roles, refreshToken
					}
				}
			}
		}
		

	} catch (err) {
		return { message: 'Unauthorized! Refresh Token was expired!' };
	}
}

export default verifyRefreshToken;
