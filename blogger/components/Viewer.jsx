import React from "react";
import parse from "html-react-parser";
const Viewer = ({ htmlValue }) => {
  return <>{parse(htmlValue)}</>;
};

export default Viewer;
