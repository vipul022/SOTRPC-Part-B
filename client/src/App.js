import React, { useReducer } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { StateContext } from "./config/globalState";
import Home from "./components/Home/Home";
import Nav from "./components/Nav/Nav";
import Classes from "./components/Classes/Classes";

const App = () => {
  const initialState = {
    classes: [],
  };

  const [store, dispatch] = useReducer(stateReducer, initialState);
  return (
    <div>
      <StateContext.Provider value={{ store, dispatch }}>
        <Router>
          <Nav />
          <Switch>
            <Route exact path="/" component={Home} />
            <Route exact path="/classes" component={Classes} />
          </Switch>
        </Router>
      </StateContext.Provider>
    </div>
  );
};

export default App;
