import api from "../config/api";

const addNewPhoto = async ({ fileName, fileType }) => {
  console.log("fileName=>", fileName);
  const response = await api.post("/photos", { fileName, fileType });
  console.log("response inside addNewPhoto=>", response);
  return response;
};
export { addNewPhoto };
