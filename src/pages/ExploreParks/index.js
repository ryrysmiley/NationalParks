import styles from "@/styles/Home.module.css";
import Link from "next/link";
import { useEffect, useState } from "react";
import { stateCodes, supabase } from "../../../util/util";
export default function ExplporeParks() {
	
	const [selectedState, setSelectedState] = useState(undefined);
	const [parks, setParks] = useState([]);

	useEffect(() => {
		if (!selectedState) {
			return;
		}
		(async () => {
			try {
				let { data, error } = await supabase
					.from("Parks")
					.select("parkCode, fullName, images")
					.ilike("states", `%${selectedState}%`);

				if (error) {
					throw error;
				}
				setParks(data);
				console.log(data);
			} catch (error) {
				console.log(error);
			}
		})();
	}, [selectedState]);

	return (
		<div className={styles.exploreparks}>
			<div className={styles.exploreparksintro}>
				<h1>EXPLORE PARKS</h1>
				<p>Explore the breathtaking beauty of US national parks with our interactive 'Explore Parks' feature. Select a state of your choice and discover the stunning parks it has to offer. From towering mountains to serene lakes, embark on a virtual journey to explore the natural wonders of the United States.</p>
			</div>
			<select
				defaultValue={"default"}
				onChange={(e) => setSelectedState(e.target.value)}
				className={styles.selectparks}
			>
				<option value="default" disabled>
				-- select a state --
				</option>
				{stateCodes.map((state) => (
				<option key={state.stateCode} value={state.stateCode}>
					{state.name}
				</option>
				))}
			</select>

			{selectedState && (
				<ul>
				{parks.map((park) => (
					<li key={park.parkCode}>
					<Link href={"/ExploreParks/" + park.parkCode}>
						<div className={styles.exploreparkscontainer}>
						<img src={park.images[0].url} />
						<p>{park.fullName}</p>
						</div>
					</Link>
					</li>
				))}
				</ul>
			)}
		</div>
	  );
}
