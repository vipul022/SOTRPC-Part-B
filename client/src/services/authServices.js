import api from "../config/api";

// !Whenever we use api with a req , it redirects our req to the server
async function registerUser(userInfo) {
  console.log("in registeruser");
  const response = await api.post("/users", userInfo);
  console.log("got user back from server", response);
  return response.data;
}

async function loginUser(userInfo) {
  console.log("inside loginUser");
  const response = await api.post("/users/login", userInfo);
  console.log("got user back from server", response);
  return response.data;
}

async function logoutUserFromBackend() {
  console.log("inside logoutUserFromBackend");
  const response = await api.get("/users/logout");
  console.log("got user back from server", response);
  return response.data;
}
export { registerUser, loginUser, logoutUserFromBackend };
