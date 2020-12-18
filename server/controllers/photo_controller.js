const {
    addPhotoToDB,
    getPhotoFromDB,
    deletePhotoFromDB,
    getPhotosFromDB
} = require("../utils/photo_utilities");

const addPhoto = function(req, res) {
	addPhotoToDB(req).save((err, photo) => {
		if (err) {
			res.status(500)
			res.json({
				error: err.message
			})
		}
		res.status(201)
		res.send(photo)
	})
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