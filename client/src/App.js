import React, { useReducer } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { StateContext } from "./config/globalState";
import stateReducer from "./config/stateReducer";
import Home from "./components/Home2/Home";
import Nav from "./components/Nav/Nav";
import Classes from "./components/PotteryClasses/Classes";
import NewClass from "./components/NewClass/NewClass";
import ClassRegister from "./components/ClassRegister/ClassRegister";
import Members from "./components/Members/Members";
import EditMember from "./components/EditMember/EditMember";
import Register from "./components/Register/Register";
// import SignIn from "./components/SignIn/SignIn";

const App = () => {
  const initialState = {
    classes: [],
    members: [],
    loggedInUser: null,
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
            <Route path="/classes/register" component={ClassRegister} />
            <Route exact path="/users" component={Members} />
            <Route path="/users/edit/:id" component={EditMember} />
            <Route exact path="/auth/register" component={Register} />
            {/* <Route path="/auth/login" component={SignIn} /> */}
          </Switch>
        </Router>
      </StateContext.Provider>
    </div>
  );
};
// `/users/edit/${m._id}`
export default App;
