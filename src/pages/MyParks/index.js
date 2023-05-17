import styles from "@/styles/Home.module.css";
import { supabase } from "../../../util/util";
import { useEffect, useState } from "react";
import Link from "next/link";

export default function MyParks({ user, setUser }) {
	const [userParks, setUserParks] = useState(undefined);
	const [loaded, setLoaded] = useState(false);

	async function getUserParks() {
		try {
			const {
				data: { session },
			} = await supabase.auth.getSession();
			if (!session) return;
			const { user } = session;
			const { data, error } = await supabase
				.from("User Parks")
				.select("user_parks")
				.eq("user_id", user.id);
			if (error) throw error;
			setUserParks(data[0]);
		} catch (error) {
			console.log(error);
		}
	}

	useEffect(() => {
		async function checkSession() {
			const {
				data: { session },
			} = await supabase.auth.getSession();
			if (!session) return;
			const { user } = session;
			setUser(user);
		}
		checkSession();
		setLoaded(false);
		getUserParks();
		setLoaded(true);
	}, []);

	if (!user)
		return (
			<div className={styles.myparks}>
				<h1>Log in to see your saved parks!</h1>
			</div>
		);
	return (
		<div className={styles.myparks}>
			<h1>My Parks</h1>
			{(userParks.user_parks === undefined ||
				Object.keys(userParks.user_parks).length === 0) &&
				loaded && <h2>You have no saved parks!</h2>}
			{userParks && (
				<ul>
					{Object.entries(userParks.user_parks).map(([key, value]) => (
						<li key={key}>
							<Link href={"/ExploreParks/" + key}>{value}</Link>
						</li>
					))}
				</ul>
			)}
		</div>
	);
}
