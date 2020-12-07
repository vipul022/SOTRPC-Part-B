import React, { useReducer } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { StateContext } from "./config/globalState";
import stateReducer from "./config/stateReducer";
import Home from "./components/Home/Home";
import Nav from "./components/Nav/Nav";
import Classes from "./components/Classes/Classes";
import NewClass from "./components/NewClass/NewClass";

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
            <Route path="/classes/new" component={NewClass} />
          </Switch>
        </Router>
      </StateContext.Provider>
    </div>
  );
};

export default App;
