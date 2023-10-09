import React, { useState } from "react";
import { useRouter } from "next/router";
import { LoginPageProps } from "../types";
import LoginDog from "../../public/lottieFiles/LoginDog.json";
import Lottie from "lottie-react";
import styles from "./css/loginPage.module.css";

const LoginPage: React.FC<LoginPageProps> = ({ setAuthenticationStatus }) => {
  const [name, setName] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const router = useRouter();

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setAuthenticationStatus(true);
    localStorage.setItem("isAuthenticated", "true");
    router.push("/search");
  };

  return (
    <div className={styles.loginPage}>
      <h2>Pup Finder</h2>
      <Lottie
        animationData={LoginDog}
        style={{
          height: "15%",
          width: "33%",
          border: "1px solid",
          margin: "25px",
          marginTop: "0px",
          maxWidth: "225px",
        }}
      />
      <form onSubmit={handleLogin}>
        <div className={styles.inputContainer}>
          <input
            className={styles.textInput}
            type="text"
            placeholder="Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </div>
        <div className={styles.inputContainer}>
          <input
            className={styles.emailInput}
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <button className={styles.loginButton} type="submit">
          Login
        </button>
      </form>
    </div>
  );
};

export default LoginPage;
