import api from "../config/api";

const getAllMembers = async () => {
  const response = await api.get("/users");
  console.log("response inside membersServices=>", response);
  return response.data;
};

const deleteMember = async (id) => {
  console.log("inside delete class=>");
  const response = await api.delete(`/users/${id}`, { params: { id } });
  console.log("response inside deleteMember in member services=> ", response);
  return response;
};
export { getAllMembers, deleteMember };
