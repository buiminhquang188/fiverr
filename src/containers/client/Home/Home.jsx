import React, { useState, useEffect } from "react";
import Loader from "components/Loader/Loader";
import HomeBanner from "./HomeBanner/HomeBanner";
import HomeContent from "./HomeContent/HomeContent";
import HomeNavigation from "./HomeNavigation/HomeNavigation";
import clientApi from "apis/clientApi";
import { set } from "lodash";
import { USER_FIVER } from "containers/shared/Auth/module/types";

export default function Home() {
  // const user = JSON.parse(localStorage.getItem(`persist:${USER_FIVER}`));
  // console.log(JSON.parse(user.authReducer));

  let [typeJobs, setTypeJobs] = useState([]);
  let [loading, setLoading] = useState(true);

  useEffect(() => {
    clientApi
      .fetchTypeJobs()
      .then((result) => {
        let listTypeJobs = [];
        listTypeJobs = result.data;
        setTypeJobs({ listTypeJobs });
        setLoading(false);
      })
      .catch((err) => {
        alert(err);
      });
  }, []);
  if (loading) return <Loader />;
  console.log("render Home");
  return (
    <div>
      <HomeNavigation listTypeJobs={typeJobs.listTypeJobs} />
      <HomeBanner />
      <HomeContent />
    </div>
  );
}
