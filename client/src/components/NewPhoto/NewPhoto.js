import React, { useState } from "react";
import { uploadPhotoToS3 } from "../../services/photoServices";
import Header from "../Header/Header";
import { addNewPhoto } from "../../services/photoServices";
import { Form, Container, Row, Col, Button, Alert } from "react-bootstrap";
import { validatePhoto } from "../../helpers";

// ! reference taken from https://medium.com/@khelif96/uploading-files-from-a-react-app-to-aws-s3-the-right-way-541dd6be689
const NewPhoto = ({ history }) => {
  const initialPhotoState = {
    success: false,
    url: "",
    description: "",
    photo: {},
    selectedFile: "",
  };
  const [PhotoState, setPhotoState] = useState(initialPhotoState);
  const [errorMessage, setErrorMessage] = useState(null);

  const uploadFile = (fileName, fileType) => {
    const { description, selectedFile } = PhotoState;
    console.log("Preparing the upload");
    addNewPhoto({ fileName, fileType, description })
      .then((response) => {
        const { returnData } = response.data.data;
        const { signedRequest } = returnData;
        const responsePhoto = response.data.photo;
        console.log("photo=>", responsePhoto);

        setPhotoState({
          ...PhotoState,
          photo: responsePhoto,
          url: returnData.url,
        });
        const id = responsePhoto._id;
        console.log("photoState now=>", PhotoState);
        console.log("Recieved a signed request=> " + signedRequest);
        // Put the fileType in the headers for the upload
        var options = {
          headers: {
            "Content-Type": fileType,
          },
        };
        // !upload the photo to s3 bucket and incase of error delete the photo from db
        uploadPhotoToS3(signedRequest, selectedFile, options, id)
          .then((result) => {
            console.log(result);
            setPhotoState({
              ...PhotoState,
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

  const handleDescriptionChange = (event) => {
    const { name, value } = event.target;
    setPhotoState({
      ...PhotoState,
      [name]: value,
      success: false,
      url: "",
    });
    // console.log("inside handleDescriptionChange, photoState=>", PhotoState);
  };

  const handleFileChange = (event) => {
    setPhotoState({
      ...PhotoState,
      selectedFile: event.target.files[0],
      success: false,
    });
    setErrorMessage(null);
    // console.log("inside handleFileChange, photoState=>", PhotoState);
  };

  const handleUpload = (event) => {
    event.preventDefault();
    const { selectedFile } = PhotoState;
    console.log("selectedFile=>", selectedFile);

    // //! Split the filename to get the name and type
    let fileParts = selectedFile.name.split(".");
    let fileName = fileParts[0];
    let fileType = fileParts[1];
    // !passing setErrorMessage as an argument to change the state of this component from helpers.js
    if (validatePhoto(fileType, selectedFile.size, setErrorMessage))
      uploadFile(fileName, fileType);
  };

  return (
    <Container className="small-container">
      <Header history={history}>Upload Photo</Header>
      {errorMessage && (
        <Alert variant="danger">
          <p>{errorMessage}</p>
        </Alert>
      )}
      {PhotoState.success && (
        <Alert variant="success">
          <p>Upload Successful!</p>
        </Alert>
      )}
      <Form onSubmit={handleUpload}>
        <Form.Group controlId="formBasicDescription">
          <Form.Label>Description</Form.Label>
          <Form.Control
            type="text"
            maxLength="60"
            name="description"
            placeholder="Enter description..."
            onChange={handleDescriptionChange}
          />
        </Form.Group>

        <Form.Group controlId="formBasicFile">
          <Form.Control required type="file" onChange={handleFileChange} />
        </Form.Group>
        <Button type="submit">Upload Photo</Button>
      </Form>
    </Container>
  );
};

export default NewPhoto;
