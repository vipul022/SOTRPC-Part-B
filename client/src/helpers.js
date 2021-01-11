import React, { useState } from "react";

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

export { validatePhoto };
