import styles from "@/styles/Home.module.css";
import { getParks } from "../../util/util";
import Link from 'next/link';

export default function Home() {
	return (
		<div>
			<img className={styles.homepic} src="https://res.cloudinary.com/simpleview/image/upload/v1575997827/clients/utahddm/_6854ef3a-e563-4ae7-889b-03a7d34a8563.07eec82311.jpg"></img>
			<div className={styles.homecontainer}>
				<h1> Start Exploring</h1>
				<p>Experience the awe-inspiring beauty of national parks, where majestic landscapes and captivating wildlife awaits. Embark on an unforgettable journey of exploration and become immersed in the wonders of nature.</p>
				<h3><Link href="/ExploreParks">Explore Parks</Link></h3>
			</div>
		</div>
	)
}

