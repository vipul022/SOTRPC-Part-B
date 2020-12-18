import api from "../config/api";

async function getAllClasses() {
  const response = await api.get("/classes");
  console.log("response inside classServices=>", response);
  return response.data;
}

async function addNewClass(newClass) {
  console.log("inside addNewClass");
  const response = await api.post("/classes", newClass);
  console.log("response inside addNewClass in classServices=>", response);
  return response.data;
}

async function deleteClass(id) {
  console.log("inside deleteClass");
  // !sending id as req.params.id to backend
  const response = await api.delete(`/classes/${id}`, { params: { id } });
  console.log("response inside deleteClass in class Services=>", response);
  return response;
}

async function updateClass(updatedClass) {
  console.log("inside updateClass=>");
  const response = await api.put(`/classes/${updatedClass._id}`, updatedClass);
  console.log("response inside updateClass in class Services=>", response);
  return response;
}
export { getAllClasses, addNewClass, deleteClass, updateClass };
