import React, { memo } from "react";
import fiver__logo from "assets/images/fiver_logo.svg";
function Loader() {
  console.log("render loader");
  return (
    <div className="w-full max-h-screen">
      <img src={fiver__logo} alt="Fiver Loading" />
    </div>
  );
}

export default memo(Loader);
