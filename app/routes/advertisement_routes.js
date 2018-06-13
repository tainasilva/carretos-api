const ObjectID = require('mongodb').ObjectID;
const utils = require('../services/utils');

module.exports = (app, db) => {
    app.post('/advertisement', (req, res) => {
        const expectedFields = ['idUser','title', 'description', 'nameCompany', 'telephone', 'regionServed'];

        if (!utils.isValidRequest(req.body, expectedFields)) {
            res.status(400).send({ 'error': 'Expected field is missing' });
            return;
        }

        const advertisement = {
            idUser: req.body.idUser,
            title: req.body.title,
            description: req.body.description,
            nameCompany: req.body.nameCompany,
            telephone: req.body.telephone,
            regionServed: req.body.regionServed
        };

        db.collection('advertisement').save(advertisement, (err, result) => {
            if (err) {
                res.status(500).send({ 'error': err });
                return;
            }
            res.status(200).send('Advertisement saved to database');
        });
    });

    app.get('/advertisement/:id', (req, res) => {
        const id = req.params.id;
        const details = { 'idUser' : id };
        
        db.collection('advertisement').find(details).toArray(function(err, result) {
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

    app.get('/advertisement', (req, res) => {

        db.collection('advertisement').find({}).toArray (function (err, result) {
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