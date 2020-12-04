import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import ClassData from "./data/class_data";
import Home from "./components/Home/Home";
import Nav from "./components/Nav/Nav";
import Classes from "./components/Classes/Classes";

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
