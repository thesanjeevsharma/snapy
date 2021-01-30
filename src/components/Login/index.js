import React from "react";
import { useDispatch } from "react-redux";
import { Button } from "@material-ui/core";

import { login } from "../../features/appSlice";
import { auth, provider } from "../../firebase";

import "./Login.css";

const Login = () => {
  const dispatch = useDispatch();

  const signIn = () => {
    auth
      .signInWithPopup(provider)
      .then((res) => {
        console.log(res);
        dispatch(
          login({
            user: {
              username: res.user.displayName,
              profilePic: res.user.photoURL,
              id: res.user.uid,
            },
          })
        );
      })
      .catch((err) => {
        alert(err.message);
      });
  };

  return (
    <div className="Login">
      <div className="Login__Container">
        <img
          alt="Snapy"
          src="https://scx2.b-cdn.net/gfx/news/2017/1-snapchat.jpg"
        />
        <Button onClick={signIn} variant="outlined">
          Sign In
        </Button>
      </div>
    </div>
  );
};

export default Login;
