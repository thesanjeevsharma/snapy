import React from "react";
import { useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import { CountdownCircleTimer } from "react-countdown-circle-timer";

import { selectApp } from "../../features/appSlice";

import "./ChatView.css";

const ChatView = () => {
  const state = useSelector(selectApp);
  const history = useHistory();

  const exit = React.useCallback(() => {
    history.replace("/chats");
  }, [history]);

  React.useEffect(() => {
    if (!state.selectedImage) {
      exit();
    }
  }, [exit, state.selectedImage]);

  return (
    <div className="ChatView">
      <img alt="Chat View" onClick={exit} src={state.selectedImage} />
      <div className="ChatView__Timer">
        <CountdownCircleTimer
          isPlaying
          duration={10}
          strokeWidth={3}
          size={50}
          colors={[
            ["#004777", 0.33],
            ["#F7B801", 0.33],
            ["#A30000", 0.33],
          ]}
        >
          {({ remainingTime }) => {
            if (remainingTime < 1) {
              exit();
            }
            return remainingTime;
          }}
        </CountdownCircleTimer>
      </div>
    </div>
  );
};

export default ChatView;
