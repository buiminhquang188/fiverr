import React from "react";
import Footer from "components/Footer/Footer";
import Header from "components/Header/Header";
import HomeBanner from "./HomeBanner/HomeBanner";
import HomeContent from "./HomeContent/HomeContent";
export default function Home() {
  return (
    <div>
      <HomeBanner />
      <HomeContent />
    </div>
  );
}
