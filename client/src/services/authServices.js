import api from "../config/api";

// !Whenever we use api with a req , it redirects our req to the server
async function registerUser(userInfo) {
  const response = await api.post("/users", userInfo);
  console.log("got user back from server", response);
  return response.data;
}

async function loginUser(userInfo) {
  const response = await api.post("/users/login", userInfo);
  console.log("got user back from server", response);
  return response.data;
}
export { registerUser, loginUser };
