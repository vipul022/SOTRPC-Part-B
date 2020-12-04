import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Home from "./components/home/Home";
import Nav from "./components/nav/Nav";
import Classes from "./components/classes/Classes";

const App = () => {
  return (
    <div>
      <Router>
        <Nav />
        <Switch>
          <Route exact path="/" component={Home} />
          <Route exact path="/classes" component={Classes} />
        </Switch>
      </Router>
    </div>
  );
};

export default App;
