import React from "react";
import HomeBanner from "./HomeBanner/HomeBanner";
import HomeContent from "./HomeContent/HomeContent";
import { useSelector } from "react-redux";
import LandingUser from "../LandingUser/LandingUser";
export default function Home() {
  const { currentUser } = useSelector((state) => state.authReducer);
  if (currentUser) return <LandingUser />;
    return (
      <div>
        <HomeBanner />
        <HomeContent />
      </div>
    );
}
