import styles from "@/styles/Home.module.css";
import { supabase } from "../../../util/util";
import { useEffect, useState } from "react";
import Link from "next/link";

export default function MyParks({ user }) {
	const [userParks, setUserParks] = useState(undefined);

	async function getUserParks() {
		try {
			const { data, error } = await supabase
				.from("User Parks")
				.select("user_parks")
				.eq("user_id", user.id);
			if (error) throw error;
			setUserParks(data);
		} catch (error) {
			console.log(error);
		}
	}

	useEffect(() => {
		if (user) {
			getUserParks();
		}
	}, []);

	return (
		<div>
			{userParks && (
				<ul>
					{Object.entries(userParks).map(([key, value]) => (
						<li>
							<Link href={"/ExploreParks/" + key}>{value}</Link>
						</li>
					))}
				</ul>
			)}
		</div>
	);
}
