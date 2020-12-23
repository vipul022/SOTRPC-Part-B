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

const deletePhoto = async (id) => {
  console.log("inside deletePhoto=>");
  const response = await api.delete(`/photos/${id}`, { params: { id } });
  console.log("response inside deletePhoto in photo services=> ", response);
  return response;
};
export { addNewPhoto, getAllPhotos, deletePhoto };
