import React from "react";
import { useSelector } from "react-redux";
import { useHistory } from "react-router-dom";

import { cameraState } from "../../features/cameraSlice";

import "./Preview.css";

const Preview = () => {
  const state = useSelector(cameraState);
  const history = useHistory();

  React.useState(() => {
    if (!state.imageSrc) {
      history.replace("/");
    }
  }, [history, state.imageSrc]);

  return (
    <div className="Preview">
      <h3>Preview</h3>
      <img alt="Preview" src={state.imageSrc} />
    </div>
  );
};

export default Preview;
