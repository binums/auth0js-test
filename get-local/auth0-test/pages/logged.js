import auth0 from "auth0-js";
import { useState } from "react";
import { handleLogout, getInfo } from "../auth";

const Logged = (props) => {
	const [userDet, setUserDet] = useState();
	const [resp, setResp] = useState();

	return (
		<div>
			<h1>Logged in successfully</h1>
			<button onClick={() => handleLogout()}>logout</button>
			<button onClick={() => getInfo(resp, setResp, setUserDet)}>
				Get user info
			</button>
			{userDet && <div>{JSON.stringify(userDet)}</div>}
		</div>
	);
};

export default Logged;
