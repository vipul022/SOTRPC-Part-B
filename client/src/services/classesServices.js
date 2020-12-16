import api from "../config/api";

async function getAllClasses() {
  const response = await api.get("/classes");
  console.log("response inside classServices=>", response);
  return response.data;
}

async function addNewClass(newClass) {
  console.log("inside addNewClass")
  const response = await api.post("/classes", newClass);
  console.log("response inside addNewClass in classServices=>", response);
  return response.data;
}
export { getAllClasses, addNewClass };
