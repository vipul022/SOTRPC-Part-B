// ! The state that is passed as argument to the function below is the initial state which is defined in app.js
export default function StateReducer(state, action) {
  switch (action.type) {
    case "setClasses":
      return {
        ...state,
        classes: action.data,
      };
    case "setMembers":
      return {
        ...state,
        members: action.data,
      };
    case "setLoggedInUser":
      return {
        ...state,
        loggedInUser: action.data.name,
        loggedInUserRole: action.data.role,
      };

    // eslint-disable-next-line
    case "setClasses":
      return {
        ...state,
        classes: action.data,
      };
    default:
      return state;
  }
}
