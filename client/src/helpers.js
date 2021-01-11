import React, { useState } from "react";
import { addNewPhoto, uploadPhotoToS3 } from "../src/services/photoServices";

const validatePhoto = (fileType, size, setErrorMessage) => {
  const typeLowerCase = fileType.toLowerCase();
  const TWOMEGABYTES = 2097152;
  console.log("selectedFile.size=>", size);
  console.log("fileType=>", fileType);
  if (size >= TWOMEGABYTES) {
    setErrorMessage("File Size needs to be below 2MB");
    return false;
  } else if (
    typeLowerCase !== "jpg" &&
    typeLowerCase !== "jpeg" &&
    typeLowerCase !== "png"
  ) {
    setErrorMessage("File type needs to be a jpg or png");
    return false;
  } else {
    setErrorMessage(null);
    console.log("inside validatePhoto=>");
    return true;
  }
};

const uploadFile = (state, setState, setErrorMessage) => {
  const { selectedFile, description } = state;
  console.log("selectedFile=>", selectedFile);
  let fileParts = selectedFile.name.split(".");
  let fileName = fileParts[0];
  let fileType = fileParts[1];
  console.log("fileType=>", fileType);
  // const { description, selectedFile } = PhotoState;
  console.log("Preparing the upload");
  addNewPhoto({ fileName, fileType, description })
    .then((response) => {
      const { returnData } = response.data.data;
      const { signedRequest } = returnData;
      const responsePhoto = response.data.photo;
      console.log("photo=>", responsePhoto);

      setState({
        ...state,
        photo: responsePhoto,
        url: returnData.url,
      });
      const id = responsePhoto._id;
      console.log("state now=>", state);
      console.log("Recieved a signed request=> " + signedRequest);
      //     // Put the fileType in the headers for the upload
      var options = {
        headers: {
          "Content-Type": fileType,
        },
      };
      //     // !upload the photo to s3 bucket and incase of error delete the photo from db
      uploadPhotoToS3(signedRequest, selectedFile, options, id)
        .then((result) => {
          console.log(result);
          setState({
            ...state,
            success: true,
          });
        })
        .catch((error) => {
          console.log(error);
          setErrorMessage("There was a problem saving the photo to S3");
        });
    })
    .catch((error) => {
      console.log(error);
      setErrorMessage("There was a problem saving the photo to the server");
    });
};

export { validatePhoto, uploadFile };
