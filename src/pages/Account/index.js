import styles from "@/styles/Home.module.css";
import { useEffect, useState } from "react";
import { supabase } from "../../../util/util";

export default function Account({ user, setUser }) {
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const [confirmPassword, setConfirmPassword] = useState("");
	const [signInMode, setSignInMode] = useState(true);

	async function handleSignIn(e) {
		e.preventDefault();
		setEmail("");
		setPassword("");
		setConfirmPassword("");
		try {
			const { data, error } = await supabase.auth.signInWithPassword({
				email: email,
				password: password,
			});
			if (error) throw error;
			const {
				data: { session },
			} = await supabase.auth.getSession();
			const { user } = session;
			setUser(user);
		} catch (error) {
			console.log(error);
			alert("Incorrect email or password");
		}
	}

	async function handleSignUp(e) {
		try {
			const {
				data: { user },
				error,
			} = await supabase.auth.signInWithPassword({ email, password });

			if (error) throw error;
		} catch (error) {
			console.log(error);
		}
	}

	async function handleSignOut(e) {
		try {
			const { error } = await supabase.auth.signOut();
			if (error) throw error;
			setUser(null);
		} catch (error) {
			console.log(error);
		}
	}

	useEffect(() => {
		async () => {
			const {
				data: { session },
			} = await supabase.auth.getSession();
			const { user } = session;
			setUser(user);
		};
		console.log(user);
	});

	if (!user) {
		return (
			<div className={styles.account}>
				<button
					onClick={() => {
						setSignInMode(!signInMode);
						setEmail("");
						setPassword("");
						setConfirmPassword("");
					}}
				>
					{signInMode ? "Sign Up" : "Back to Sign In"}
				</button>
				{signInMode && (
					<div>
						<form onSubmit={handleSignIn}>
							<div>
								<label htmlFor="email">Email:</label>
								<input
									type="email"
									id="email"
									value={email}
									onChange={(e) => setEmail(e.target.value)}
									required
								/>
							</div>
							<div>
								<label htmlFor="password">Password:</label>
								<input
									type="password"
									id="password"
									value={password}
									onChange={(e) => setPassword(e.target.value)}
									required
								/>
							</div>
							<button type="submit">Sign In</button>
						</form>
					</div>
				)}
				{!signInMode && (
					<div>
						<form onSubmit={handleSignUp}>
							<div>
								<label htmlFor="email">Email:</label>
								<input
									type="email"
									id="email"
									value={email}
									onChange={(e) => setEmail(e.target.value)}
									required
								/>
							</div>
							<div>
								<label htmlFor="password">Password:</label>
								<input
									type="password"
									id="password"
									value={password}
									onChange={(e) => setPassword(e.target.value)}
									required
								/>
							</div>
							<div>
								<label htmlFor="password">Confirm Password:</label>
								<input
									type="password"
									id="confirmpassword"
									value={confirmPassword}
									onChange={(e) => setConfirmPassword(e.target.value)}
									required
								/>
							</div>
							<button type="submit" disabled={password !== confirmPassword}>
								Sign Up
							</button>
						</form>
					</div>
				)}
			</div>
		);
	}

	return (
		<div>
			You are signed in
			<button onClick={() => handleSignOut()}>Sign Out</button>
		</div>
	);
}
