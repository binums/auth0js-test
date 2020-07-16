import Head from "next/head";
import Login from "../components/Login";

export default function Home() {
	return (
		<div className="container">
			<Head>
				<title>Create Next App</title>
				<link rel="icon" href="/favicon.ico" />
			</Head>

			<main>
        <Login />
      </main>
		</div>
	);
}
