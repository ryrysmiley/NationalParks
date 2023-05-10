import styles from "../styles/Home.module.css";
import Link from "next/link";

export function Navbar() {
	return (
		<div className={styles.navbar}>
			<ul>
				<li>
					<Link href="/">Home</Link>
				</li>
				<li>
					<Link href="/ExploreParks">Explore Parks</Link>
				</li>
				<li>
					<Link href="/MyParks">My Parks</Link>
				</li>
				<li>
					<Link href="/Account">Account</Link>
				</li>
			</ul>
		</div>
	);
}
