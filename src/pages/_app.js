import { Navbar } from "@/components/navbar";
import { useState } from "react";
import "@/styles/globals.css";

export default function App({ Component, pageProps }) {
	const [user, setUser] = useState(null);
	const [index, setIndex] = useState(0);
	return (
		<>
			<Navbar />
			<Component
				{...pageProps}
				user={user}
				setUser={setUser}
				index={index}
				setIndex={setIndex}
			/>
		</>
	);
}
