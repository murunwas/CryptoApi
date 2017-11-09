var fetch = require('node-fetch');
var bodyParser = require('body-parser');
var express = require('express');
var cors = require('cors')
var app = express();
var cloudinary = require('cloudinary');
var port = process.env.PORT || 4300;
var _ = require('lodash');
//var config = require('./config');

//Config Cloudinary
cloudinary.config({
    cloud_name: process.env.cloudName,
    api_key: process.env.cloudKey,
    api_secret: process.env.cloudSecret
});
//Use
app.use(bodyParser.json()); // support json encoded bodies
app.use(bodyParser.urlencoded({
    extended: true
})); // support encoded bodies
app.use(cors())


app.get('/', function (req, res) {

    fetch('https://www.cryptocompare.com/api/data/coinlist/')
        .then(function (res) {
            return res.json();
        }).then(function (json) {
            res.send({
                data: json
            });
        });

});

app.get('/cloudinary', function (req, res) {

    cloudinary.v2.api.resources({
        type: 'upload'
    }, function (error, result) {
        if (error) {
            res.send({
                data: error
            });
        }
        res.send(result);
    });

});

app.get('/coins', function (req, res) {
    var coinName = req.query.coin;

    fetch('https://www.cryptocompare.com/api/data/coinlist/')
        .then(function (res) {
            return res.json();
        }).then(function (json) {
            // var result = _.find(json.Data, function(o) { return o.symbol  ==  coinName; });

            var result = _.filter(json.Data, function (obj) {
                return obj.Symbol == coinName.toUpperCase();
            });


            res.send(result);
        });

});

app.listen(port, function () {
    console.log('Our app is running on Port: ' + port);
});