import styles from "@/styles/Home.module.css";
import { getParks } from "../../util/util";
import Link from "next/link";
import { useEffect, useState } from "react";
import Head from "next/head";

export default function Home({ index, setIndex }) {
	const [bgStyle, setBgStyle] = useState(styles.homepic);

	const images = [
		"https://assets3.thrillist.com/v1/image/3117871/2880x1620/crop;jpeg_quality=60;progressive.jpg",
		"https://res.cloudinary.com/simpleview/image/upload/v1575997827/clients/utahddm/_6854ef3a-e563-4ae7-889b-03a7d34a8563.07eec82311.jpg",
		"https://images.pexels.com/photos/461944/pexels-photo-461944.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
		"https://images.pexels.com/photos/1399195/pexels-photo-1399195.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
		"https://images2.alphacoders.com/458/458791.jpg",
	];

	useEffect(() => {
		const interval = setInterval(() => {
			// make set index wait for transition of images
			setBgStyle(styles.homepictrans);
			setTimeout(() => {
				setBgStyle(styles.homepic);
			}, 750);

			setTimeout(() => {
				setIndex((prevIndex) =>
					prevIndex === images.length - 1 ? 0 : prevIndex + 1
				);
			}, 300);
		}, 8000);

		return () => {
			clearInterval(interval);
		};
	}, []);
	return (
		<div>
			<Head>
				<title>Home</title>
				<meta name="description" content="Home page for National Parks" />
				<link rel="icon" href="https://www.pngkit.com/png/full/14-146161_white-location-icon-png-location-logo-png-white.png" />
			</Head>
			<img className={bgStyle} src={images[index]}></img>
			<div className={styles.homecontainer}>
				<h1> Start Exploring</h1>
				<p>
					Experience the awe-inspiring beauty of national parks, where majestic
					landscapes and captivating wildlife awaits. Embark on an unforgettable
					journey of exploration and become immersed in the wonders of nature.
				</p>
				<h3>
					<Link href="/ExploreParks">Explore Parks</Link>
				</h3>
			</div>
		</div>
	);
}
