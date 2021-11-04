import React from "react";
import withLayouts from "hoc/withLayout";
import Header from "components/Header/Header";
import Footer from "components/Footer/Footer";

function ClientLayouts(props) {
  return (
    <>
      <Header />
      {props.children}
      <Footer />
    </>
  );
}

export default withLayouts(ClientLayouts);
