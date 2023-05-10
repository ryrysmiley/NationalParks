import styles from "@/styles/Home.module.css";
import Link from "next/link";
import { useEffect, useState } from "react";
import { stateCodes, supabase } from "../../../util/util";
export default function Home() {
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
					.select("parkCode, fullName")
					.ilike("states", `%${selectedState}%`);

				if (error) {
					throw error;
				}
				setParks(data);
			} catch (error) {
				console.log(error);
			}
		})();
	}, [selectedState]);

	return (
		<div className={styles.exploreparks}>
			<select
				defaultValue={"default"}
				onChange={(e) => setSelectedState(e.target.value)}
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
								{park.fullName}
							</Link>
						</li>
					))}
				</ul>
			)}
		</div>
	);
}
