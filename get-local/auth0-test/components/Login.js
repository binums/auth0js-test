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
	
	return (
		<div>
			Login Component Login page <br />
			<br />
			<button onClick={() => withSocial( "google-oauth2")}>
				Login with google
			</button>
			<br />
			<button onClick={() => withSocial( "facebook")}>
				Login with facebook
			</button>
			<br />
			<button onClick={() => withSocial( "windowslive")}>
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
					<button onClick={() => handleEmailSignup( email, passwd)}>
						SignUp
					</button>
					<br />
					<a onClick={() => setStep(2)}>login</a>
				</>
			) : (
				<>
					<button onClick={() => handleEmailLogin( email, passwd)}>
						LogIn
					</button>
					<button onClick={() => resetPassword( email)}>
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
