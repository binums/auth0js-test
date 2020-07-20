import { useEffect, useState } from "react";
import auth0 from "auth0-js";
import {
	withSocial,
	handleEmailSignup,
	handleEmailLogin,
	resetPassword,
} from "../auth";

const Login = () => {
	const [email, setEmail] = useState();
	const [otp, setOtp] = useState();
	const [passwd, setPasswd] = useState();
	const [err, setErr] = useState();
	const [step, setStep] = useState(1);

	const auth0Client = new auth0.WebAuth({
		domain: "dev-get-local.auth0.com",
		clientID: "DascarCyX9s2nqWTjUhTwp7oiJke1kpK",
		redirectUri: "https://auth0js-test.vercel.app/logged/",
		scope: "openid profile email read:current_user",
		responseType: "code token id_token",
	});

	// const withSocial = async (social) => {
	// 	auth0Client.authorize({
	// 		connection: social,
	// 	});
	// };

	// const handleEmailSignup = async () => {
	// 	try {
	// 		await auth0Client.signup(
	// 			{
	// 				connection: "Username-Password-Authentication",
	// 				email,
	// 				password: passwd,
	// 			},
	// 			(err, res) => {
	// 				if (err) throw err;
	// 				console.log("handleEmailSignup -> res", res);
	// 			}
	// 		);
	// 		await auth0Client.login(
	// 			{
	// 				email,
	// 				password: passwd,
	// 			},
	// 			(res) => {
	// 				console.log("handleEmailLogin -> res", res);
	// 			}
	// 		);
	// 	} catch (err) {
	// 		console.log("handleEmailSignup -> err", err);
	// 	}
	// };

	// const handleEmailLogin = async () => {
	// 	try {
	// 		auth0Client.login(
	// 			{
	// 				email,
	// 				password: passwd,
	// 			},
	// 			(err, res) => {
	// 				if (err) throw err;
	// 				console.log("handleEmailLogin -> res", res);
	// 			}
	// 		);
	// 	} catch (err) {
	// 		console.log("handleEmailLogin -> err", err);
	// 	}
	// };

	// const resetPassword = () => {
	// 	auth0Client.changePassword(
	// 		{
	// 			connection: "Username-Password-Authentication",
	// 			email: email,
	// 		},
	// 		(err, res) => {
	// 			if (err) console.log("getInfo -> res", res);
	// 			else console.log("getInfo -> err", err);
	// 		}
	// 	);
	// };

	return (
		<div>
			Login Component Login page <br />
			<br />
			<button onClick={() => withSocial(auth0Client, "google-oauth2")}>
				Login with google
			</button>
			<br />
			<button onClick={() => withSocial(auth0Client, "facebook")}>
				Login with facebook
			</button>
			<br />
			<button onClick={() => withSocial(auth0Client, "windowslive")}>
				Login with microsoft
			</button>
			<br />
			<br />
			<form>
				<input type="email" onChange={(e) => setEmail(e.target.value)} />
				<br />
				<input type="password" onChange={(e) => setPasswd(e.target.value)} />
				<br />
			</form>
			{step === 1 ? (
				<>
					<button onClick={() => handleEmailSignup(auth0Client, email, passwd)}>
						SignUp
					</button>
					<br />
					<a onClick={() => setStep(2)}>login</a>
				</>
			) : (
				<>
					<button onClick={() => handleEmailLogin(auth0Client, email, passwd)}>
						LogIn
					</button>
					<button onClick={() => resetPassword(auth0Client, email)}>
						Forgot password
					</button>
					<br />
					<a onClick={() => setStep(1)}>signup</a>
				</>
			)}
		</div>
	);
};

export default Login;
