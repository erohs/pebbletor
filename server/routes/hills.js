const router = require('express').Router();
let Hill = require('../models/hill');

router.route('/').get((req, res) => {
    Hill.find()
        .then(hills => res.json(hills))
        .catch(error => res.status(400).json('Error: ' + error));
});

router.route('/add').post((req, res) => {
    const name = req.body.name;
    const description = req.body.description;
    const author = req.body.author;
    const markers = req.body.markers;
    const newHill = new Hill({
        name,
        description,
        author,
        markers,
    });

    newHill.save()
        .then(() => res.json('Hill added!'))
        .catch(error => res.status(400).json('Error: ' + error));
});

router.route('/:id').get((req, res) => {
    Hill.findById(req.params.id)
        .then(hill => res.json(hill))
        .catch(error => res.status(400).json('Error: ' + error));
});

router.route('/:id').delete((req, res) => {
    Hill.findByIdAndDelete(req.params.id)
        .then(() => res.json('Hill deleted.'))
        .catch(error => res.status(400).json('Error: ' + error));
});

router.route('/update/:id').post((req, res) => {
    Hill.findById(req.params.id)
        .then(hill => {
            hill.name = req.body.name;
            hill.description = req.body.description;
            hill.author = req.body.author;
            hill.markers = req.body.markers;

            hill.save()
                .then(() => res.json('Hill updated!'))
                .catch(error => res.status(400).json('Error: ' + error));
        })
        .catch(error => res.status(400).json('Error: ' + error));
});

module.exports = router;