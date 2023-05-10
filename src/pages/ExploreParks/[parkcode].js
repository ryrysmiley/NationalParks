import styles from "@/styles/Home.module.css";
import { supabase } from "../../../util/util";
import { useState, useEffect } from "react";

export default function Home() {
	const [parkData, setParkData] = useState(undefined);

	function getURL() {
		if (typeof window !== "undefined") {
			return window.location.href;
		}
		return "";
	}

	useEffect(() => {
		const url = getURL();
		const parkCode = url.split("/").pop();
		(async () => {
			try {
				let { data, error } = await supabase
					.from("Parks")
					.select("*")
					.eq("parkCode", parkCode);

				if (error) {
					throw error;
				}
				setParkData(data);
				console.log(parkData);
			} catch (error) {
				console.log(error);
			}
		})();
	}, []);
	if (!parkData) {
		return <div>loading...</div>;
	}

	return <div>{parkData[0].fullName}</div>;
}
