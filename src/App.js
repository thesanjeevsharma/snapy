import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

import { Chats, Preview, WebcamCapture } from "./components";
import "./App.css";

function App() {
  return (
    <div className="App">
      <Router>
        <div className="App__Body">
          <Switch>
            <Route exact path="/preview" component={Preview} />
            <Route exact path="/chats" component={Chats} />
            <Route exact path="/" component={WebcamCapture} />
          </Switch>
        </div>
      </Router>
    </div>
  );
}

export default App;
