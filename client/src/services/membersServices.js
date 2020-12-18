import api from "../config/api";

const getAllMembers = async () => {
  const response = await api.get("/users");
  console.log("response inside membersServices=>", response);
  return response.data;
};

export { getAllMembers };
