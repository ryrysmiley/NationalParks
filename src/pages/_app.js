import { Navbar } from "@/components/navbar";
import { useState } from "react";
import "@/styles/globals.css";

export default function App({ Component, pageProps }) {
	const [user, setUser] = useState(null);
	return (
		<>
			<Navbar />
			<Component {...pageProps} user={user} setUser={setUser} />
		</>
	);
}
