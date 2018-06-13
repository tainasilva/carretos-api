const utils = require('../services/utils');

module.exports = function (app, db) {
    app.post('/login', (req, res) => {
        console.log('POST login');
        const expectedFields = ['email', 'password'];

        if(!utils.isValidRequest(req.body, expectedFields)) {
            res.json({ 'error': 'Expected field is missing' });
            return;
        }

        const user = {
            email: req.body.email,
            password: utils.hash(req.body.password)
        };
        
        db.collection('users').findOne(user, (err, result) => {
            if (err) {
                res.json({ 'error': err });
                return;
            }
            if (!result) {
                res.status(401).json({ 'error': 'Invalid email or password' });
                return;
            }

            res.json(result);
        });
    });
};