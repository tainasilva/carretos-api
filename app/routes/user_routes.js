const utils = require('../services/utils');
const ObjectID = require('mongodb').ObjectID;

module.exports = function (app, db) {

    app.put('/users/:id', (req, res) => {
        console.log('PUT users');
        const id = req.params.id;
        const details = { '_id': new ObjectID(id) };
        const user = req.body;
        const expectedFields = ['email', 'password'];
        if (!utils.isValidRequest(user, expectedFields)) {
            res.status(400).send({ 'error': 'Expected field is missing' });
            return;
        }
        
        if (user._id) {
            delete user._id;
        }
        db.collection('users')
            .update(details, user, (err, result) => {
                if (err) {
                    res.status(500).send({ 'error': err });
                    return;
                }
                res.status(200).send('User updated');
            });
    });


    app.post('/users', (req, res) => {
        const expectedFields = ['email', 'password', 'name', 'address', 'district',
                                'city', 'zipcode', 'telephone', 'description'];

        if (!utils.isValidRequest(req.body, expectedFields)) {
            res.status(400).send({ 'error': 'Expected field is missing' });
            return;
        }

        const user = {
            email: req.body.email,
            password: utils.hash(req.body.password),
            name: req.body.name,
            address: req.body.address,
            district: req.body.district,
            city: req.body.city,
            zipcode: req.body.zipcode,
            telephone: req.body.telephone,
            description: req.body.description
        };

        db.collection('users').save(user, (err, result) => {
            if (err) {
                res.status(500).send({ 'error': err });
                return;
            }
            res.status(200).send('User saved to database');
        });
    });

    app.get('/users/:id', (req, res) => {
        const id = req.params.id;
        const details = { '_id': new ObjectID(id) };
        console.log("details");
        console.log(details);
        db.collection('users').findOne(details, (err, result) => {
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

    app.get('/users', (req, res) => {

        db.collection('users').find({}).toArray (function (err, result) {
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
    
};