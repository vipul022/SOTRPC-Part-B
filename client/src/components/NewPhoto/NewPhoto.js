import React, { Component } from "react";
import { Link, withRouter } from "react-router-dom";
import { uploadPhotoToS3 } from "../../services/photoServices";

import { addNewPhoto } from "../../services/photoServices";
import ButtonComponent from "../Button/Button";

// ! reference taken from https://medium.com/@khelif96/uploading-files-from-a-react-app-to-aws-s3-the-right-way-541dd6be689
class NewPhoto extends Component {
  constructor(props) {
    super(props);
    this.state = {
      success: false,
      url: "",
      description: "",
      photo: {},
    };
    console.log("description=>", this.state.description);
  }

  handleChange = (ev) => {
    const { name, value } = ev.target;

    console.log("name==>", name);
    console.log("value=>", value);
    this.setState({ success: false, url: "", [name]: value });
    // console.log(this.state.description);
    console.log("inside handleChange=>");
  };

  handleUpload = (ev) => {
    const { history } = this.props;
    console.log("history=>", history);
    const { success, description } = this.state;
    console.log("success=>", success);

    console.log("uploadInput.files=>", this.uploadInput.files);
    let file = this.uploadInput.files[0];
    console.log("file=>", file);
    //! Split the filename to get the name and type
    let fileParts = file.name.split(".");
    console.log("fileParts=>", fileParts);
    let fileName = fileParts[0];
    let fileType = fileParts[1];
    console.log("Preparing the upload");

    addNewPhoto({ fileName, fileType, description })
      .then((response) => {
        console.log("response=>", response);
        var returnData = response.data.data.returnData;
        var signedRequest = returnData.signedRequest;
        // !Extracting id from response
        // const id = response.data.databaseId;
        this.setState({ photo: response.data.photo });
        const id = this.state.photo._id;
        // console.log("id=>", id);
        var url = returnData.url;
        this.setState({ url: url });
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
            this.setState({ success: true });
          })
          .catch((error) => console.log(error));
      })
      .catch((error) => {
        alert(JSON.stringify(error));
      });
    // history.push(`/photos`);
  };

  render() {
    const SuccessMessage = () => (
      <div style={{ padding: 50 }}>
        <h3 style={{ color: "green" }}>SUCCESSFUL UPLOAD</h3>

        <Link
          to={{
            pathname: `/photos/${this.state.photo._id}`,
            state: { photo: this.state.photo },
            // !sending photo as photo  to the pathname
          }}
        >
          Access the file here
        </Link>
        <br />
      </div>
    );
    return (
      <div>
        <center>
          <h1>UPLOAD A FILE</h1>
          {this.state.success ? <h3>SUCCESSFUL UPLOAD</h3> : null}
          <div>
            <label>Description</label>
            <input
              type="text"
              name="description"
              placeholder="Enter description..."
              maxLength="60"
              onChange={this.handleChange}
            ></input>
          </div>
          <div>
            <input
              onChange={this.handleChange}
              ref={(ref) => {
                this.uploadInput = ref;
              }}
              type="file"
            />
          </div>
          <br />
          <ButtonComponent clicked={this.handleUpload}>UPLOAD</ButtonComponent>
        </center>
      </div>
    );
  }
}
export default withRouter(NewPhoto);
