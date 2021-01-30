import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import AvatarIcon from "@material-ui/core/Avatar";
import ChatBubbleIcon from "@material-ui/icons/ChatBubble";
import RadioButtonUncheckedIcon from "@material-ui/icons/RadioButtonUnchecked";
import SearchIcon from "@material-ui/icons/Search";

import { selectApp } from "../../features/appSlice";
import { resetCameraImage } from "../../features/cameraSlice";
import { auth, db } from "../../firebase";
import { Chat } from "../";

import "./Chats.css";

const Chats = () => {
  const state = useSelector(selectApp);
  const dispatch = useDispatch();
  const history = useHistory();
  const [posts, setPosts] = React.useState([]);

  React.useEffect(() => {
    db.collection("posts")
      .orderBy("timestamp", "desc")
      .onSnapshot((snapshot) => {
        setPosts(
          snapshot.docs.map((doc) => ({ id: doc.id, data: doc.data() }))
        );
      });
  }, []);

  const takeSnap = () => {
    dispatch(resetCameraImage());
    history.push("/");
  };

  return (
    <div className="Chats">
      <div className="Chats__Header">
        <AvatarIcon
          className="Chats__Avatar"
          onClick={() => auth.signOut()}
          src={state.user.profilePic}
        />
        <div className="Chats__Search">
          <SearchIcon className="Chats__SearchIcon" />
          <input placeholder="Friends" type="text" />
        </div>
        <ChatBubbleIcon className="Chats__ChatIcon" />
      </div>
      <div className="Chats__Posts">
        {posts.map(
          ({
            id,
            data: { profilePic, username, timestamp, imageUrl, read },
          }) => (
            <Chat
              key={id}
              id={id}
              username={username}
              timestamp={timestamp}
              imageUrl={imageUrl}
              read={read}
              profilePic={profilePic}
            />
          )
        )}
      </div>
      <RadioButtonUncheckedIcon
        className="Chats__CameraButton"
        fontSize="large"
        onClick={takeSnap}
      />
    </div>
  );
};

export default Chats;
