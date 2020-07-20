const withSocial = async (auth0Client, social) => {
	auth0Client.authorize({
		connection: social,
	});
};

const handleEmailSignup = async (auth0Client, email, passwd) => {
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

const handleEmailLogin = async (auth0Client, email, passwd) => {
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

const resetPassword = (auth0Client, email) => {
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

const getInfo = async (auth0Client, resp, setResp, setUserDet) => {
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

const handleLogout = async (auth0Client) => {
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
