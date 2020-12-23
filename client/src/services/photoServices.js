import api from "../config/api";
// import { useGlobalState } from "../config/globalState";

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
// ! this function will delete photo from db incase s3 bucket returns an error while saving the photo
const deletePhotoFromDb = (id) => {
  console.log("inside deletePhotoFromDb=>");

  deletePhoto(id)
    .then((response) => {
      console.log("response=>", response);
    })
    .catch((error) => console.log(error));
};
export { addNewPhoto, getAllPhotos, deletePhoto, deletePhotoFromDb };
