import styles from "@/styles/Home.module.css";
import { supabase } from "../../../util/util";
import { useState, useEffect } from "react";
import { compress } from "../../../next.config";

export default function parkcode({ user, setUser }) {
	const [parkData, setParkData] = useState(undefined);
	const [saved, setSaved] = useState(false);
	const [currImageIndex, setCurrImageIndex] = useState(0);

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
		async function checkSession() {
			const {
				data: { session },
			} = await supabase.auth.getSession();
			const { user } = session;
			setUser(user);
		}
		checkSession();
	}, []);
	if (!parkData) {
		return <div>loading...</div>;
	}
	console.log(parkData)

	const navImages = () => {
		setCurrImageIndex((prevIndex) => {
			const nextIndex = prevIndex + 1;
			if(nextIndex >= parkData[0].images.length) {
				return 0;
			}
			return nextIndex;
		});
	}

	
	return (
		<div>
			<div className={styles.parksheader}> 
				<img className={styles.parksimg} src={parkData[0].images[currImageIndex].url} />
				<button className={styles.parksarrow} onClick={navImages}> &rarr; </button>
			</div>
		
			<div className={styles.parkscontainer}>
				<h1 className={styles.parkstitle}>{parkData[0].fullName}</h1>
				{user && (
					<button onClick={() => handleParkSave()}>
						{saved ? "Unsave Park" : "Save Park"}
					</button>
				)}
			</div>

			<div className={styles.parksdescription}>
				<h2>ABOUT</h2>
				<p>{parkData[0].description}</p>
			</div>

			<div className={styles.parksinfo}>
				<h2> PARK INFORMATION</h2>
				<p>{parkData[0].standardHours[0].description}</p>
				<h2>HOURS</h2>
				<ul className={styles.parkshours}>
					<li> Sunday: {parkData[0].standardHours[0].standardHours.sunday}</li>
					<li> Monday: {parkData[0].standardHours[0].standardHours.monday}</li>
					<li> Tuesday: {parkData[0].standardHours[0].standardHours.tuesday}</li>
					<li> Wednesday: {parkData[0].standardHours[0].standardHours.wednesday}</li>
					<li> Thursday: {parkData[0].standardHours[0].standardHours.thursday}</li>
					<li> Friday: {parkData[0].standardHours[0].standardHours.friday}</li>
					<li> Saturday: {parkData[0].standardHours[0].standardHours.saturday}</li>
				</ul>
				<h2>Website</h2>
				<a href={parkData[0].url}>Visit {parkData[0].fullName} Official Website</a>
			</div>
		</div>

			
	);
}
