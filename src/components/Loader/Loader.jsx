import React, { memo } from "react";
import fiver__logo from "assets/images/fiver_logo.svg";
function Loader() {
  return (
    <div className="h-screen w-full mx-auto">
      <div className="flex items-center h-screen">
        <img src={fiver__logo} alt="Fiver Loading" className="w-full h-96" />
      </div>
    </div>
  );
}

export default memo(Loader);
