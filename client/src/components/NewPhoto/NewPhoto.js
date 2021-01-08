import React, { useState } from "react";
import { Link } from "react-router-dom";
import { uploadPhotoToS3 } from "../../services/photoServices";
// import { useGlobalState } from "../../config/globalState";
import Header from "../Header/Header";
import { addNewPhoto } from "../../services/photoServices";
import ButtonComponent from "../Button/Button";
import { Form, Container, Row, Col, Button } from "react-bootstrap";

// ! reference taken from https://medium.com/@khelif96/uploading-files-from-a-react-app-to-aws-s3-the-right-way-541dd6be689
const NewPhoto = ({ history }) => {
  const initialPhotoState = {
    success: false,
    url: "",
    description: "",
    photo: {},
    // uploadInput: "",
    selectedFile: "",
  };
  const [PhotoState, setPhotoState] = useState(initialPhotoState);
  console.log("PhotoState=>", PhotoState);

  const handleDescriptionChange = (event) => {
    const { name, value } = event.target;

    console.log("name==>", name);
    console.log("value=>", value);
    // setPhotoState({ PhotoState.success: false, PhotoState.url: "", [name]: value });
    console.log("PhotoState=>", PhotoState);
    setPhotoState({
      ...PhotoState,
      [name]: value,
      success: false,
      url: "",
    });

    console.log("inside handleChange=>");
  };

  const handleFileChange = (event) => {
    console.log("event.target=>", event.target.files[0]);
    setPhotoState({
      ...PhotoState,
      selectedFile: event.target.files[0],
    });
  };
  const handleUpload = (event) => {
    event.preventDefault();
    const { success, description, selectedFile, photo } = PhotoState;
    console.log("success=>", success);

    let file = selectedFile;
    console.log("file=>", file);
    // //! Split the filename to get the name and type
    let fileParts = file.name.split(".");
    console.log("fileParts=>", fileParts);
    let fileName = fileParts[0];
    let fileType = fileParts[1];
    console.log("Preparing the upload");

    addNewPhoto({ fileName, fileType, description })
      .then((response) => {
        console.log("response=>", response);
        const { returnData } = response.data.data;
        const { signedRequest } = returnData;

        setPhotoState({
          ...PhotoState,
          photo: response.data.photo,
          url: returnData.url,
        });
        console.log("photoState=>", PhotoState);
        const id = photo._id;

        console.log("id=>", id);
        // var url = returnData.url;
        // this.setState({ url: url });
        console.log("Recieved a signed request=> " + signedRequest);
        // Put the fileType in the headers for the upload
        var options = {
          headers: {
            "Content-Type": fileType,
          },
        };
        // !upload the photo to s3 bucket and incase of error delete the photo from db
        uploadPhotoToS3(signedRequest, file, options, id)
          .then((result) => {
            console.log("result=>", result);
            // this.setState({ success: true });
            setPhotoState({
              ...PhotoState,
              success: true,
            });
          })
          .catch((error) => console.log(error));
      })
      .catch((error) => {
        alert(JSON.stringify(error));
      });
    // history.push(`/photos`);
  };

  return (
    <div>
      <Container className="small-container">
        <Header history={history}>Upload Photo</Header>

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
            {/* <Form.Label>Teacher</Form.Label> */}
            <Form.Control
              required
              type="file"
              // ref=
              // {(ref) => {
              //   uploadInput = ref;
              // }}
              // value={PhotoState.selectedFile}
              onChange={handleFileChange}
            />
          </Form.Group>
          <Button type="submit">Upload Photo</Button>
        </Form>
      </Container>
    </div>
  );
};
// class NewPhoto extends Component {
//   constructor(props) {
//     super(props);
//     this.state = {
//       success: false,
//       url: "",
//       description: "",
//       photo: {},
//     };
//     console.log("description=>", this.state.description);
//   }

//   handleChange = (ev) => {
//     const { name, value } = ev.target;

//     console.log("name==>", name);
//     console.log("value=>", value);
//     this.setState({ success: false, url: "", [name]: value });
//     // console.log(this.state.description);
//     console.log("inside handleChange=>");
//   };

//   handleUpload = (ev) => {
//     const { history } = this.props;
//     console.log("history=>", history);
//     const { success, description } = this.state;
//     console.log("success=>", success);

//     console.log("uploadInput.files=>", this.uploadInput.files);
//     let file = this.uploadInput.files[0];
//     console.log("file=>", file);
//     //! Split the filename to get the name and type
//     let fileParts = file.name.split(".");
//     console.log("fileParts=>", fileParts);
//     let fileName = fileParts[0];
//     let fileType = fileParts[1];
//     console.log("Preparing the upload");

//     addNewPhoto({ fileName, fileType, description })
//       .then((response) => {
//         console.log("response=>", response);
//         var returnData = response.data.data.returnData;
//         var signedRequest = returnData.signedRequest;
//         // !Extracting id from response
//         // const id = response.data.databaseId;
//         this.setState({ photo: response.data.photo });
//         const id = this.state.photo._id;
//         // console.log("id=>", id);
//         var url = returnData.url;
//         this.setState({ url: url });
//         console.log("Recieved a signed request=> " + signedRequest);
//         // Put the fileType in the headers for the upload
//         var options = {
//           headers: {
//             "Content-Type": fileType,
//           },
//         };
//         // !upload the photo to s3 bucket and incase of error delete the photo from db
//         uploadPhotoToS3(signedRequest, file, options, id)
//           .then((result) => {
//             console.log("result=>", result);
//             this.setState({ success: true });
//           })
//           .catch((error) => console.log(error));
//       })
//       .catch((error) => {
//         alert(JSON.stringify(error));
//       });
//     // history.push(`/photos`);
//   };

//   render() {
//     const SuccessMessage = () => (
//       <div style={{ padding: 50 }}>
//         <h3 style={{ color: "green" }}>SUCCESSFUL UPLOAD</h3>

//         <Link
//           to={{
//             pathname: `/photos/${this.state.photo._id}`,
//             state: { photo: this.state.photo },
//             // !sending photo as photo  to the pathname
//           }}
//         >
//           Access the file here
//         </Link>
//         <br />
//       </div>
//     );
//     return (
//       <div>
//         <center>
//           <h1>UPLOAD A FILE</h1>
//           {this.state.success ? <h3>SUCCESSFUL UPLOAD</h3> : null}
//           <div>
//             <label>Description</label>
//             <input
//               type="text"
//               name="description"
//               placeholder="Enter description..."
//               maxLength="60"
//               onChange={this.handleChange}
//             ></input>
//           </div>
//           <div>
//             <input
//               onChange={this.handleChange}
//               ref={(ref) => {
//                 this.uploadInput = ref;
//               }}
//               type="file"
//             />
//           </div>
//           <br />
//           <ButtonComponent clicked={this.handleUpload}>UPLOAD</ButtonComponent>
//         </center>
//       </div>
//     );
//   }
// }
export default NewPhoto;
