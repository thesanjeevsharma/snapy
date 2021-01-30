import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import firebase from "firebase";
import AttachFileIcon from "@material-ui/icons/AttachFile";
import CloseIcon from "@material-ui/icons/Close";
import CreateIcon from "@material-ui/icons/Create";
import CropIcon from "@material-ui/icons/Crop";
import MusicNoteIcon from "@material-ui/icons/MusicNote";
import NoteIcon from "@material-ui/icons/Note";
import SendIcon from "@material-ui/icons/Send";
import TextFieldsIcon from "@material-ui/icons/TextFields";
import TimerIcon from "@material-ui/icons/Timer";
import { v4 as uuid } from "uuid";

import { selectApp } from "../../features/appSlice";
import { cameraState, resetCameraImage } from "../../features/cameraSlice";
import { db, storage } from "../../firebase";

import "./Preview.css";

const Preview = () => {
  const state = useSelector(cameraState);
  const appState = useSelector(selectApp);
  const dispatch = useDispatch();
  const history = useHistory();

  React.useEffect(() => {
    if (!state.imageSrc) {
      history.replace("/");
    }
  }, [history, state.imageSrc]);

  const closePreview = () => dispatch(resetCameraImage());

  const sendPost = () => {
    const id = uuid();
    const uploadTask = storage
      .ref(`posts/${id}`)
      .putString(state.imageSrc, "data_url");
    uploadTask.on(
      "state_changed",
      null,
      (err) => console.log(err),
      () => {
        storage
          .ref("posts")
          .child(id)
          .getDownloadURL()
          .then((url) => {
            db.collection("posts").add({
              imageUrl: url,
              username: appState.user.username,
              profilePic: appState.user.profilePic,
              read: false,
              timestamp: firebase.firestore.FieldValue.serverTimestamp(),
            });
            history.replace("/chats");
          });
      }
    );
  };

  return (
    <div className="Preview">
      <CloseIcon className="Preview__Close" onClick={closePreview} />
      <div className="Preview__Toolbar">
        <TextFieldsIcon />
        <CreateIcon />
        <NoteIcon />
        <MusicNoteIcon />
        <AttachFileIcon />
        <CropIcon />
        <TimerIcon />
      </div>
      <img alt="Preview" src={state.imageSrc} />
      <button className="Preview__SendButton" onClick={sendPost}>
        Send Now <SendIcon className="Preview__SendIcon" fontSize="small" />
      </button>
    </div>
  );
};

export default Preview;
