var aws = require("aws-sdk");
require("dotenv").config(); // Configure dotenv to load in the .env file// Configure aws with your accessKeyId and your secretAccessKey
const S3_BUCKET = process.env.Bucket;

const {
  addPhotoToDB,
  getPhotoFromDB,
  deletePhotoFromDB,
  getPhotosFromDB,
} = require("../utils/photo_utilities");

const addPhoto = function (req, res) {
  console.log("req inside addPhoto=>", req.body);
  const s3 = new aws.S3();
  const fileName = req.body.fileName;
  const fileType = req.body.fileType;

  console.log("S3_BUCKET=>", S3_BUCKET);
  // Set up the payload of what we are sending to the S3 api
  const s3Params = {
    Bucket: S3_BUCKET,
    Key: `photos/${fileName}`,
    // Key: fileName,
    Expires: 500,
    ContentType: fileType,
    ACL: "public-read",
  };
  // Make a request to the S3 API to get a signed URL which we can use to upload our file
  s3.getSignedUrl("putObject", s3Params, (err, data) => {
    if (err) {
      console.log(err);
      res.json({
        signedURLSuccess: false,
        error: err,
      });
    }
    // Data payload of what we are sending back, the url of the signedRequest and a URL where we can access the content after its saved.
    const returnData = {
      signedRequest: data,
      url: `https://${S3_BUCKET}.s3.amazonaws.com/photos/${fileName}`,
    };
    console.log("returnData=>", returnData);
    // save to db with URL of final image
    req.body.url = returnData.url;
    console.log("req.body.url=>", req.body.url);
    addPhotoToDB(req).save((err, photo) => {
      if (err) {
        res.status(500);
        res.json({
          savedToDBSuccess: false,
          error: err.message,
        });
      }
      console.log("saving photo to DB:", photo);

      // Send it all back
      res.json({
        signedURLSuccess: true,
        savedToDBSuccess: true,
        photo: photo,
        data: {
          returnData,
        },
      });
    });
  });
};

function getPhotos(req, res) {
  getPhotosFromDB().exec((err, photos) => {
    if (err) {
      res.status(404);
      res.json({
        error: err.message,
      });
    } else {
      res.status(200);
      res.send(photos);
    }
  });
}

function deletePhoto(req, res) {
  // get the filename from the db
  getPhotoFromDB(req.params.id).exec((err, photo) => {
    if (err) {
      res.status(404);
      res.json({
        error: err.message,
      });
    } else if (!photo) {
      res.status(404).send({
        error: "Photo for deletion not found in DB",
      });
    } else {
      console.log("found photo for deletion, commencing S3 deletion");
      const fileName = photo.fileName;

      //delete from S3

      //Substantiate authority
      const s3 = new aws.S3({
        accessKeyId: process.env.AWSAccessKeyId,
        secretAccessKey: process.env.AWSSecretKey,
      });
      //prepare correct params
      var params = {
        Bucket: S3_BUCKET,
        Key: fileName,
      };
      //request deletion from S3
      s3.deleteObject(params, function (err, data) {
        if (err) {
          res.status(404);
          res.json({
            deleteFromS3Success: false,
            error: err.message,
          });
        } else {
          console.log(`deleted photo ${fileName} from S3`);

          //finally, remove photo record from DB
          deletePhotoFromDB(req.params.id).exec((err) => {
            if (err) {
              res.status(500);
              res.json({
                deleteFromS3Success: true,
                deleteFromDBSuccess: false,
                error: err.message,
              });
            }
            console.log(`deleted ${fileName} from DB`);
            res.status(204);
            res.json({
              deleteFromS3Success: true,
              deleteFromDBSuccess: true,
            });
          });
        }
      });
    }
  });
}

function getPhoto(req, res) {
  getPhotoFromDB(req.params.id).exec((err, photo) => {
    if (err) {
      res.status(404);
      res.json({
        error: err.message,
      });
    } else {
      res.status(200);
      res.send(photo);
    }
  });
}

module.exports = {
  getPhoto,
  addPhoto,
  deletePhoto,
  getPhotos,
};
