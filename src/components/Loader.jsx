import React from "react";
import { RotatingLines } from "react-loader-spinner";

function Loader() {
  return (
    <div className="loading-meassage">
      Loading, Please wait{" "}
      <RotatingLines
        strokeColor="var(--slate-300)"
        strokeWidth="5"
        animationDuration="0.75"
        width="20"
        visible={true}
      />
    </div>
  );
}

export default Loader;
