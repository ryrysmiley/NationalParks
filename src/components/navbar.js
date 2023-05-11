import styles from "../styles/Home.module.css";
import Link from "next/link";

export function Navbar() {
	return (
		<div className={styles.navbar}>
			<ul>
				<li>
					<Link href="/">HOME</Link>
				</li>
				<li>
					<Link href="/ExploreParks">EXPLORE PARKS</Link>
				</li>
				<li>
					<img className={styles.locationicon} src="https://www.pngkit.com/png/full/14-146161_white-location-icon-png-location-logo-png-white.png"></img>
				</li>
				<li>
					<Link href="/MyParks">MY PARKS</Link>
				</li>
				<li>
					<Link href="/Account">ACCOUNT</Link>
				</li>
			</ul>
		</div>
	);
}
