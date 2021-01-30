import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

import { Chats, ChatView, Login, Preview, WebcamCapture } from "./components";
import { login, logout, selectApp } from "./features/appSlice";
import { auth } from "./firebase";

import "./App.css";

const App = () => {
  const state = useSelector(selectApp);
  const dispatch = useDispatch();

  React.useEffect(() => {
    auth.onAuthStateChanged((authUser) => {
      if (authUser) {
        dispatch(
          login({
            user: {
              username: authUser.displayName,
              profilePic: authUser.photoURL,
              id: authUser.uid,
            },
          })
        );
      } else {
        dispatch(logout());
      }
    });
  }, [dispatch]);

  return (
    <div className="App">
      <Router>
        {!state.user ? (
          <Login />
        ) : (
          <>
            <img
              alt="Snapy"
              className="App__Logo"
              src="https://scx2.b-cdn.net/gfx/news/2017/1-snapchat.jpg"
            />
            <div className="App__Body">
              <div className="App__BodyBackground">
                <Switch>
                  <Route exact path="/preview" component={Preview} />
                  <Route exact path="/chats" component={Chats} />
                  <Route exact path="/chats/view" component={ChatView} />
                  <Route path="/" component={WebcamCapture} />
                </Switch>
              </div>
            </div>
          </>
        )}
      </Router>
    </div>
  );
};

export default App;
