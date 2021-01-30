import React from "react";
import { useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import ReactTimeago from "react-timeago";
import AvatarIcon from "@material-ui/core/Avatar";
import StopRoundedIcon from "@material-ui/icons/StopRounded";

import { selectImage } from "../../features/appSlice";
import { db } from "../../firebase";

import "./Chat.css";

const Chat = ({ id, profilePic, username, timestamp, imageUrl, read }) => {
  const dispatch = useDispatch();
  const history = useHistory();

  const open = () => {
    if (!read) {
      dispatch(selectImage({ imageUrl }));
      db.collection("posts").doc(id).set(
        {
          read: true,
        },
        {
          merge: true,
        }
      );
      history.push("/chats/view");
    }
  };

  return (
    <div onClick={open} className="Chat">
      <AvatarIcon className="Chat__Avatar" src={profilePic} />
      <div className="Chat__Info">
        <h4>{username}</h4>
        <p>
          {!read && "Tap to view -"}{" "}
          <ReactTimeago date={new Date(timestamp?.toDate())?.toUTCString()} />
        </p>
      </div>
      {!read && <StopRoundedIcon className="Chat__ReadIcon" />}
    </div>
  );
};

export default Chat;
