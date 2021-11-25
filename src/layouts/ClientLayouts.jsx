import React from "react";
import withLayouts from "hoc/withLayout";
import Header from "components/Header/Header";
import Footer from "components/Footer/Footer";
import HomeNavigation from "containers/client/Home/HomeNavigation/HomeNavigation";

function ClientLayouts(props) {
  return (
    <>
      <Header />
      <HomeNavigation />
      {props.children}
      <Footer />
    </>
  );
}

export default withLayouts(ClientLayouts);
