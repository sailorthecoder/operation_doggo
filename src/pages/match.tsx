import React from "react";
import { useRouter } from "next/router";
import DogCard from "../components/DogCard";
import { Dog, MatchPageProps } from "../types";
import Streamers from "../../public/lottieFiles/Streamers.json";
import Lottie from "lottie-react";
import styles from "./css/match.module.css";

const MatchPage: React.FC<MatchPageProps> = ({ handleLogout }) => {
  const router = useRouter();
  const { dog: dogDataString } = router.query;
  const dog = dogDataString
    ? (JSON.parse(decodeURIComponent(dogDataString as string)) as Dog)
    : null;

  const onLogout = () => {
    handleLogout();
    router.push("/");
  };

  return (
    <div className={styles.matchPage}>
      <h1>You Matched with {dog?.name}!</h1>
      {dog && <DogCard dog={dog} />}
      <div className={styles.streamersBackground}>
        <Lottie animationData={Streamers} />
      </div>
      <button onClick={onLogout} className={styles.logoutButton}>
        Log Out
      </button>
    </div>
  );
};

export default MatchPage;
