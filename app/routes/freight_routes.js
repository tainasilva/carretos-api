const ObjectID = require('mongodb').ObjectID;
const utils = require('../services/utils');

module.exports = (app, db) => {
    app.post('/freight', (req, res) => {
        const expectedFields = ['description', 'nameCompany', 'telephone', 'regionServed', 'email',
                                'password'];

        if (!utils.isValidRequest(req.body, expectedFields)) {
            res.status(400).send({ 'error': 'Expected field is missing' });
            return;
        }

        const freight = {
            title: req.body.title,
            description: req.body.description,
            nameCompany: req.body.nameCompany,
            telephone: req.body.telephone,
            regionServed: req.body.regionServed,
            email: req.body.email,
            password: req.body.password
        };

        db.collection('freight').save(freight, (err, result) => {
            if (err) {
                res.status(500).send({ 'error': err });
                return;
            }
            res.status(200).send('Freight saved to database');
        });
    });

    app.get('/freight/:id', (req, res) => {
        const id = req.params.id;
        const details = { '_id': new ObjectID(id) };
        
        db.collection('freight').findOne(details, (err, result) => {
            if (err) {
                res.json({ 'error': err });
                return;
            }
            if (!result) {
                res.status(401).json({ 'error': 'Invalid request' });
                return;
            }
            res.json(result);
        });
    });

    app.get('/freight', (req, res) => {

        db.collection('freight').find({}).toArray (function (err, result) {
            if (err) {
                res.json({ 'error': err });
                return;
            }
            if (!result) {
                res.status(401).json({ 'error': 'Invalid request' });
                return;
            }
            res.json(result);
        });
    });

}