import React from "react";
import { addNewPhoto, uploadPhotoToS3 } from "../src/services/photoServices";

const validatePhoto = (fileType, size, dispatch) => {
  const typeLowerCase = fileType.toLowerCase();
  const TWOMEGABYTES = 2097152;
  console.log("selectedFile.size=>", size);
  console.log("fileType=>", fileType);
  if (size >= TWOMEGABYTES) {
    dispatch({
      type: "setErrorMessage",
      data: "File Size needs to be below 2MB",
    });
    return false;
  } else if (
    typeLowerCase !== "jpg" &&
    typeLowerCase !== "jpeg" &&
    typeLowerCase !== "png"
  ) {
    dispatch({
      type: "setErrorMessage",
      data: "File type needs to be a jpg or png",
    });
    return false;
  } else {
    dispatch({
      type: "setErrorMessage",
      data: null,
    });
    console.log("inside validatePhoto=>");
    return true;
  }
};

const uploadFile = (fileState, dispatch) => {
  const { selectedFile, description } = fileState;

  console.log("selectedFile=>", selectedFile);

  let fileParts = selectedFile.name.split(".");
  let fileName = fileParts[0];
  let fileType = fileParts[1];
  console.log("fileType=>", fileType);

  console.log("Preparing the upload");
  addNewPhoto({ fileName, fileType, description })
    .then((response) => {
      const { returnData } = response.data.data;
      const { signedRequest } = returnData;
      const responsePhoto = response.data.photo;
      console.log("photo=>", responsePhoto);
      let updatedData = {
        ...fileState,
        file: responsePhoto,
        url: returnData.url,
      };
      console.log("updatedData=>", updatedData);
      dispatch({
        type: "setFileState",
        data: updatedData,
      });

      const id = responsePhoto._id;

      console.log("Recieved a signed request=> " + signedRequest);

      var options = {
        headers: {
          "Content-Type": fileType,
        },
      };

      uploadPhotoToS3(signedRequest, selectedFile, options, id)
        .then((result) => {
          console.log(result);
          updatedData = {
            ...fileState,
            success: true,
          };
          dispatch({
            type: "setFileState",
            data: updatedData,
          });
          // setState({
          //   ...state,
          //   success: true,
          // });
        })
        .catch((error) => {
          console.log(error);
          // setErrorMessage("There was a problem saving the photo to S3");
          dispatch({
            type: "setErrorMessage",
            data: "There was a problem saving the photo to S3",
          });
        });
    })
    .catch((error) => {
      console.log(error);
      dispatch({
        type: "setErrorMessage",
        data: "There was a problem saving the photo to the server",
      });
    });
};

export { validatePhoto, uploadFile };
