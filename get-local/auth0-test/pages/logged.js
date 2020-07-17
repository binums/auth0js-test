import auth0 from "auth0-js";
import { useState } from "react";
const Logged = (props) => {
	const [userDet, setUserDet] = useState();
	const [resp, setResp] = useState();

	const auth0Client = new auth0.WebAuth({
		domain: "dev-get-local.auth0.com",
		clientID: "DascarCyX9s2nqWTjUhTwp7oiJke1kpK",
		redirectUri: "https://auth0js-test.vercel.app/logged/",
		scope: "openid profile email read:current_user",
		responseType: "code id_token",
	});
	auth0Client.parseHash({ hash: window.location.hash }, (err, res) => {
		if (err) {
			return console.log(err);
		}
		setResp({ ...res });
	});

	const getInfo = async () => {
		// const manageClient = auth0.Management({
		// 	domain: "dev-get-local.auth0.com",
		// 	token: props.history.
		// });
		// manageClient.getUser({}, (err, res) => {
		// 	if (err) console.log("getInfo -> res", res);
		// 	else console.log("getInfo -> err", err);
		// });
		auth0Client.client.userInfo(res.accessToken, (err, user) => {
			console.log("Logged -> user", user);
			setUserDet(user);
			// Now you have the user's information
		});
	};

	return (
		<div>
			<h1>Logged in successfully</h1>
			<button onClick={getInfo}>Get user info</button>
			{Object.keys(userDet).length && <div>{JSON.stringify(userDet)}</div>}
			<div>{JSON.stringify(userDet)}</div>
		</div>
	);
};

export default Logged;
