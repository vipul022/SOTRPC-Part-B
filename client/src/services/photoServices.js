import api from "../config/api";

const addNewPhoto = async ({ fileName, fileType, description }) => {
  console.log("fileName=>", fileName);
  const response = await api.post("/photos", {
    fileName,
    fileType,
    description,
  });
  console.log("response inside addNewPhoto=>", response);
  return response;
};

const getAllPhotos = async () => {
  const response = await api.get("/photos");
  console.log("response inside getAllPhotos=>", response);
  return response.data;
};
export { addNewPhoto, getAllPhotos };
