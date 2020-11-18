import React from "react";

import loading from "../assets/loading.gif";

export const Loading: React.FC = () => {
  return (
    <div className="">
      <img src={loading} alt="logo" />
    </div>
  );
};
