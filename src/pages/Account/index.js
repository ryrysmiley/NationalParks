import styles from "@/styles/Home.module.css";
import { useEffect, useState } from "react";
import { supabase } from "../../../util/util";
import Head from "next/head";

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
      e.preventDefault();
      setEmail("");
      setPassword("");
      setConfirmPassword("");
      const { data, error } = await supabase.auth.signUp({
        email: email,
        password: password,
      });

      if (error) throw error;

      //add to database
      {
        const { error } = await supabase
          .from("User Parks")
          .insert([{ user_id: data.user.id, user_parks: {} }]);
        if (error) throw error;
      }

      setSignInMode(true);
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
    async function checkSession() {
      const {
        data: { session },
      } = await supabase.auth.getSession();
      if (!session) return;
      const { user } = session;
      setUser(user);
    }
    checkSession();
  });

  if (!user) {
    return (
      <div className={styles.account}>
        <Head>
          <title>Account</title>
          <meta name="description" content="Account page for National Parks" />
          <link rel="icon" href="https://www.pngkit.com/png/full/14-146161_white-location-icon-png-location-logo-png-white.png" />
			  </Head>
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
                <label>Password:</label>
                <input
                  type="password"
                  id="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
              </div>
              <button className={styles.signinbutton} type="submit">
                Sign In
              </button>
            </form>
            <button
              className={styles.signupbutton}
              onClick={() => {
                setSignInMode(!signInMode);
                setEmail("");
                setPassword("");
                setConfirmPassword("");
              }}
            >
              {signInMode ? "Sign Up" : "Back to Sign In"}
            </button>
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
                  minLength="10"
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
                  minLength="10"
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  required
                />
              </div>
              <button
                className={styles.signupbutton}
                type="submit"
                disabled={password !== confirmPassword}
              >
                Sign Up
              </button>
            </form>
          <button
            className={styles.signupbutton}
            onClick={() => {
              setSignInMode(!signInMode);
              setEmail("");
              setPassword("");
              setConfirmPassword("");
            }}
          >
            {signInMode ? "Sign Up" : "Back to Sign In"}
          </button>
          </div>
        )}
      </div>
    );
  }

  return (
    <div>
			<Head>
				<title>Account</title>
				<meta name="description" content="Account page for National Parks" />
				<link rel="icon" href="https://www.pngkit.com/png/full/14-146161_white-location-icon-png-location-logo-png-white.png" />
			</Head>
      <h1 className={styles.signedinmessage}>
        You are signed in with {user.email}
      </h1>
      <button className={styles.signoutbutton} onClick={() => handleSignOut()}>
        Sign Out
      </button>
    </div>
  );
}
