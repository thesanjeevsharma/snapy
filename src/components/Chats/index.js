import React from "react";
import AvatarIcon from "@material-ui/core/Avatar";
import ChatBubbleIcon from "@material-ui/icons/ChatBubble";
import SearchIcon from "@material-ui/icons/Search";

import { db } from "../../firebase";
import { Chat } from "../";
import "./Chats.css";

const Chats = () => {
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

  return (
    <div className="Chats">
      <div className="Chats__Header">
        <AvatarIcon className="Chats__Avatar" />
        <div className="Chats__Search">
          <SearchIcon />
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
    </div>
  );
};

export default Chats;
