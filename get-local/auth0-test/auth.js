const auth0Client = new auth0.WebAuth({
	domain: "dev-get-local.auth0.com",
	clientID: "DascarCyX9s2nqWTjUhTwp7oiJke1kpK",
	redirectUri: "https://auth0js-test.vercel.app/logged/",
	scope: "openid profile email read:current_user",
	responseType: "code id_token",
	returnTo: "http://auth0js-test.vercel.app/",
});

/**
 * @param auth0Client {Object} - client object initialized with auth0
 * @param social {string} - name of the connection as mentioned in auth0 dashboard
 */
const withSocial = async (social) => {
	auth0Client.authorize({
		connection: social,
	});
};

/**
 * @param auth0Client {Object} - client object initialized with auth0
 * @param email {string} - email address
 * @param passwd {string} - password
 */

const handleEmailSignup = async (email, passwd) => {
	try {
		await auth0Client.signup(
			{
				connection: "Username-Password-Authentication",
				email,
				password: passwd,
			},
			(err, res) => {
				if (err) throw err;
				console.log("handleEmailSignup -> res", res);
			}
		);
		await auth0Client.login(
			{
				email,
				password: passwd,
			},
			(res) => {
				console.log("handleEmailLogin -> res", res);
			}
		);
	} catch (err) {
		console.log("handleEmailSignup -> err", err);
	}
};

/**
 * @param auth0Client {Object} - client object initialized with auth0
 * @param email {string} - email address
 * @param passwd {string} - password
 */

const handleEmailLogin = async (email, passwd) => {
	try {
		auth0Client.login(
			{
				email,
				password: passwd,
			},
			(err, res) => {
				if (err) throw err;
				console.log("handleEmailLogin -> res", res);
			}
		);
	} catch (err) {
		console.log("handleEmailLogin -> err", err);
	}
};

/**
 * @param auth0Client {Object} - client object initialized with auth0
 * @param email {string} - email address
 */

const resetPassword = (email) => {
	auth0Client.changePassword(
		{
			connection: "Username-Password-Authentication",
			email: email,
		},
		(err, res) => {
			if (err) console.log("getInfo -> res", res);
			else console.log("getInfo -> err", err);
		}
	);
};

/**
 * @param auth0Client {Object} - client object initialized with auth0
 * @param resp {Object} - response object from parseHash
 * @param setResp {function} - setter for resp
 * @param setUserDet {function} - setter for user details
 */

const getInfo = async (resp, setResp, setUserDet) => {
	let resp1;
	if (!resp) {
		await auth0Client.parseHash({ hash: window.location.hash }, (err, res) => {
			if (err) {
				return console.log(err);
			}
			setResp(res);
			resp1 = res;
			console.log("getInfo -> res", res);
		});
	}
	console.log("getInfo -> resp1", resp1);
	auth0Client.client.userInfo(
		Object.keys(resp).length ? resp.accessToken : resp1.accessToken,
		(err, user) => {
			console.log("Logged -> user", user);
			setUserDet(user);
		}
	);
};

/**
 * @param auth0Client {Object} - client object initialized with auth0
 */

const handleLogout = async () => {
	try {
		auth0Client.logout({});
	} catch (err) {
		console.log("handleLogout -> err", err);
	}
};

export {
	withSocial,
	handleEmailSignup,
	handleEmailLogin,
	resetPassword,
	getInfo,
	handleLogout,
};
