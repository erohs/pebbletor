const router = require('express').Router();
const multer = require('multer');
const path = require('path');
let Marker = require('../models/marker');
let Hill = require('../models/hill');

const storage = multer.diskStorage({
    destination: "./uploads",
    filename: function(req, file, cb) {
        cb(null, `${file.fieldname}-${Date.now() + path.extname(file.originalname)}`);
    }
});

const upload = multer({
    storage: storage,
    limits: { fileSize: 100000 }
}).single('image');

router.route('/').all(upload).post((req, res) => {
    Hill.findById(req.body.hillId)
        .then(hill => {
            hill.updatedAt = undefined;
            hill.save();
        })
        .catch(error => res.status(400).json('Error: ' + error));
    const hillId = req.body.hillId;
    const name = req.body.name;
    const percentage = req.body.percentage;
    const isNewPercentage = req.body.isNewPercentage;
    const x = req.body.x;
    const y = req.body.y;
    const colour = req.body.colour;
    let imagePath = undefined;
    if (req.file !== undefined) {
        imagePath = req.file.path;
    }
    const status = req.body.status;
    const newMarker = new Marker({
        hillId,
        name,
        percentage,
        isNewPercentage,
        x,
        y,
        colour,
        imagePath,
        status
    });

    newMarker.save(function(error, marker) {
        res.json(marker);
    });
});

router.route('/:id').get((req, res) => {
    Marker.findById(req.params.id)
        .then(marker => {res.json(marker)})
        .catch(error => res.status(400).json('Error: ' + error));
});

router.route('/:id').delete((req, res) => {
    Marker.findById(req.params.id)
        .then(marker => {
            Hill.findById(marker.hillId)
                .then(hill => {
                    hill.updatedAt = undefined;
                    hill.save();
                })
                .catch(error => res.status(400).json('Error: ' + error));
            Marker.deleteOne({_id: req.params.id})
                .then(() => res.json('Marker deleted.'))
                .catch(error => res.status(400).json('Error: ' + error));
        })
        .catch(error => res.status(400).json('Error: ' + error));
});

router.route('/:id').all(upload).post((req, res) => {
    Hill.findById(req.body.hillId)
            .then(hill => {
                hill.updatedAt = undefined;
                hill.save();
            })
            .catch(error => res.status(400).json('Error: ' + error));
    Marker.findById(req.params.id)
        .then(marker => {
            marker.hillId = req.body.hillId;
            marker.name = req.body.name;
            marker.percentage = req.body.percentage;
            marker.isNewPercentage = req.body.isNewPercentage;
            marker.x = req.body.x;
            marker.y = req.body.y;
            marker.colour = req.body.colour;
            let imagePath = req.body.imagePath;
            if (req.file !== undefined) {
                imagePath = req.file.path;
            }
            marker.imagePath = imagePath;
            marker.status = req.body.status;

            marker.save(function(error, marker) {
                res.json(marker);
            });
        })
        .catch(error => res.status(400).json('Error: ' + error));

});

router.route('/hill/:id').get((req, res) => {
    Marker.find({ hillId: req.params.id })
        .then(markers => res.json(markers))
        .catch(error => res.status(400).json('Error: ' + error));
});

module.exports = router;
