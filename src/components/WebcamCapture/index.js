import React from "react";
import { useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import Webcam from "react-webcam";
import RadioButtonUncheckedIcon from "@material-ui/icons/RadioButtonUnchecked";
import { setCameraImage } from "../../features/cameraSlice";

import "./WebcamCapture.css";

const videoConstraints = {
  width: 250,
  height: 400,
  facingMode: "user",
};

const WebcamCapture = () => {
  const webcamRef = React.useRef(null);
  const dispatch = useDispatch();
  const history = useHistory();

  const capture = React.useCallback(() => {
    const imageSrc = webcamRef.current.getScreenshot();
    dispatch(setCameraImage({ imageSrc }));
    history.push("/preview");
  }, [dispatch, history, webcamRef]);

  return (
    <div className="WebcamCapture">
      <Webcam
        audio={false}
        height={videoConstraints.height}
        ref={webcamRef}
        screenshotFormat="image/jpeg"
        videoConstraints={videoConstraints}
        width={videoConstraints.width}
      />
      <RadioButtonUncheckedIcon
        className="WebcamCapture__Button"
        fontSize="large"
        onClick={capture}
      />
    </div>
  );
};

export default WebcamCapture;
