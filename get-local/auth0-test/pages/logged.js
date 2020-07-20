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
		returnTo: "http://auth0js-test.vercel.app/",
	});

	const getInfo = async () => {
		let resp1;
		if (!resp) {
			console.log("inside");
			await auth0Client.parseHash(
				{ hash: window.location.hash },
				(err, res) => {
					if (err) {
						return console.log(err);
					}
					setResp(res);
					resp1 = res;
					console.log("getInfo -> res", res);
				}
			);
		}
		console.log("getInfo -> resp1", resp1);
		console.log("Logged -> resp", resp);
		auth0Client.client.userInfo(
			Object.keys(resp).length ? resp.accessToken : resp1.accessToken,
			(err, user) => {
				console.log("Logged -> user", user);
				setUserDet(user);
			}
		);
	};

	const handleLogout = async () => {
		try {
			auth0Client.logout({});
		} catch (err) {
			console.log("handleLogout -> err", err);
		}
	};

	return (
		<div>
			<h1>Logged in successfully</h1>
			<button onClick={() => handleLogout()}>logout</button>
			<button onClick={getInfo}>Get user info</button>
			{userDet && <div>{JSON.stringify(userDet)}</div>}
		</div>
	);
};

export default Logged;
