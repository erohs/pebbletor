const router = require('express').Router();
let Marker = require('../models/marker');
let Hill = require('../models/hill');

router.route('/').post((req, res) => {
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
    const currentPos = req.body.currentPos;
    const colour = req.body.colour;
    const image = req.body.image;
    const status = req.body.status;
    const newMarker = new Marker({
        hillId,
        name,
        percentage,
        isNewPercentage,
        currentPos,
        colour,
        image,
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

router.route('/:id').post((req, res) => {
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
            marker.currentPos = req.body.currentPos;
            marker.colour = req.body.colour;
            marker.image = req.body.image;
            marker.status = req.body.status;

            marker.save()
                .then(() => {
                    
                    res.json('Marker updated!');
                })
                .catch(error => res.status(400).json('Error: ' + error));
            
        })
        .catch(error => res.status(400).json('Error: ' + error));

});

router.route('/hill/:id').get((req, res) => {
    Marker.find({ hillId: req.params.id })
        .then(markers => res.json(markers))
        .catch(error => res.status(400).json('Error: ' + error));
});

module.exports = router;
