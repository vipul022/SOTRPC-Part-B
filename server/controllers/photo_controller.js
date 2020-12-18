const {
    addPhotoToDB,
    getPhotoFromDB,
    deletePhotoFromDB,
    getPhotosFromDB
} = require("../utils/photo_utilities");
// const {
//     signS3
// } = require("../utils/S3_utils");
const addPhoto = function (req, res) {

    var aws = require('aws-sdk');
    require('dotenv').config(); // Configure dotenv to load in the .env file// Configure aws with your accessKeyId and your secretAccessKey
    const S3_BUCKET = process.env.Bucket
    const s3 = new aws.S3();
    // Create a new instance of S3
    const fileName = req.body.fileName;
    const fileType = req.body.fileType;
    // Set up the payload of what we are sending to the S3 api
    const s3Params = {
        Bucket: S3_BUCKET,
        Key: fileName,
        Expires: 500,
        ContentType: fileType,
        ACL: 'public-read'
    };
    console.log('s3 Params', s3Params);
    // Make a request to the S3 API to get a signed URL which we can use to upload our file
    s3.getSignedUrl('putObject', s3Params, (err, data) => {
        if (err) {
            console.log(err);
            res.json({
                success: false,
                error: err
            })
        }
        // Data payload of what we are sending back, the url of the signedRequest and a URL where we can access the content after its saved. 
        const returnData = {
            signedRequest: data,
            url: `https://${S3_BUCKET}.s3.amazonaws.com/${fileName}`
        };

        // save to db 
        req.body.url = `https://${S3_BUCKET}.s3.amazonaws.com/${fileName}`
        addPhotoToDB(req).save((err, photo) => {
            if (err) {
                res.status(500)
                res.json({
                    error: err.message
                })
            }
            console.log("saving photo to DB:", photo)
        })

        // Send it all back    
        res.json({
            success: true,
            data: {
                returnData
            }
        });
    });
}




function getPhotos(req, res) {
    getPhotosFromDB().exec((err, classes) => {
        if (err) {
            res.status(404)
            res.json({
                error: err.message
            })
        } else {
            res.status(200)
            res.send(classes)
        }
    })
};

function deletePhoto(req, res) {
    deletePhotoFromDB(req.params.id).exec(err => {
        if (err) {
            res.status(500)
            res.json({
                error: err.message
            })
        }
        res.sendStatus(204)
    })
};


function getPhoto(req, res) {
    getPhotoFromDB(req.params.id).exec((err, photo) => {
        if (err) {
            res.status(404)
            res.json({
                error: err.message
            })
        } else {
            res.status(200)
            res.send(photo)
        }
    })
};






module.exports = {
    getPhoto,
    addPhoto,
    deletePhoto,
    getPhotos
}