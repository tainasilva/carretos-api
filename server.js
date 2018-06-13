/*jshint esversion: 6 */
const express = require('express');
const bodyParser = require('body-parser');
const MongoClient = require('mongodb').MongoClient;
const db = require('./config/db');

const app = express();
var http = require('http').Server(app);

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(express.static('public'));
app.use((req, res, next) => {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Methods", 
                'POST, GET, PUT, DELETE, OPTIONS');
    res.header("Access-Control-Allow-Headers", 
                "Origin, X-Requested-With, Content-Type, Accept");
    next();
});

MongoClient.connect(db.url, (err, client) => {
    if (err) return console.log(err);
    const database = client.db('carretos');
    require('./app/routes')(app, database);

    http.listen(3000, () => {
        console.log('listening on 3000');
    });

});
