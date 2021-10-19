const router = require('express').Router();
let Hill = require('../models/hill');
let Marker = require('../models/marker');

router.route('/').all(paginatedResults(Hill)).get((req, res) => {
    res.json(res.paginatedResults);
});

router.route('/').post((req, res) => {
    const name = req.body.name;
    const description = req.body.description;
    const author = req.body.author;
    const newHill = new Hill({
        name,
        description,
        author
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
    Marker.deleteMany({hillId: req.params.id})
        .then(() => res.json('Markers deleted.'))
        .catch(error => {});
});

router.route('/:id').post((req, res) => {
    Hill.findById(req.params.id)
        .then(hill => {
            hill.name = req.body.name;
            hill.description = req.body.description;
            hill.author = req.body.author;

            hill.save()
                .then(() => res.json('Hill updated!'))
                .catch(error => res.status(400).json('Error: ' + error));
        })
        .catch(error => res.status(400).json('Error: ' + error));
});

module.exports = router;

function paginatedResults(model) {
    return async (req, res, next) => {
        const page = parseInt(req.query.page);
        const limit = parseInt( req.query.limit);

        const startIndex = (page - 1) * limit;
        const endIndex = page * limit;
        const results = {}

        if (endIndex < await model.countDocuments().exec()) {
            results.next = {
                page: page + 1,
                limit: limit
            }
        }
        
        if (startIndex > 0) {
            results.previous = {
                page: page - 1,
                limit: limit
            }
        }

        try {
            results.results = await model.find().limit(limit).skip(startIndex).sort({updatedAt: -1}).exec();
            res.paginatedResults = results;
            next();
        } catch (e) {
            res.status(400).json('Error: ' + error);
        }
    }
}