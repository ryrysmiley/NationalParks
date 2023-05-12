import styles from "@/styles/Home.module.css";
import { supabase } from "../../../util/util";
import { useState, useEffect } from "react";
import { compress } from "../../../next.config";

export default function parkcode({ user }) {
	const [parkData, setParkData] = useState(undefined);
	const [saved, setSaved] = useState(false);

	function getURL() {
		if (typeof window !== "undefined") {
			return window.location.href;
		}
		return "";
	}

	async function handleParkSave() {
		//save park unsave park
		try {
			//first get current object
			let { data, error } = await supabase
				.from("User Parks")
				.select("user_parks")
				.eq("user_id", user.id);
			if (error) throw error;
			let currentParks = data[0].user_parks;
			//unsave
			if (saved) {
				delete currentParks[parkData[0].parkCode];
				let { error } = await supabase
					.from("User Parks")
					.update({
						user_parks: currentParks,
					})
					.eq("user_id", user.id);
				if (error) throw error;
				setSaved(false);
			}
			//save
			else {
				currentParks[parkData[0].parkCode] = parkData[0].fullName;
				let { error } = await supabase
					.from("User Parks")
					.update({
						user_parks: currentParks,
					})
					.eq("user_id", user.id);
				if (error) throw error;
				setSaved(true);
			}
		} catch (error) {
			console.log(error);
		}
	}

	async function checkIfSaved(parkCode) {
		try {
			let { data, error } = await supabase
				.from("User Parks")
				.select("user_parks")
				.eq("user_id", user.id);
			if (error) throw error;
			if (typeof data[0].user_parks[parkCode] === "undefined") {
				return false;
			}
			return true;
		} catch (error) {
			console.log(error);
		}
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

				if (!user) {
					return;
				}
				setSaved(await checkIfSaved(parkCode));
			} catch (error) {
				console.log(error);
			}
		})();
	}, []);
	if (!parkData) {
		return <div>loading...</div>;
	}
	return (
		<div>
			{user && (
				<button onClick={() => handleParkSave()}>
					{saved ? "Unsave Park" : "Save Park"}
				</button>
			)}
			{parkData[0].fullName}
		</div>
	);
}
