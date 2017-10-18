var fetch = require('node-fetch');
var bodyParser = require('body-parser');
var express = require('express');
var cors = require('cors')
var app = express();
var cloudinary = require('cloudinary');
var port = process.env.PORT || 4300;
var config = require('./config');

//Config Cloudinary
cloudinary.config({ 
    cloud_name: process.env.cloudName || config.config.cloud_name, 
    api_key: process.env.cloudKey || config.config.api_key, 
    api_secret: process.env.cloudSecret || config.config.api_secret
  });
//Use
app.use(bodyParser.json()); // support json encoded bodies
app.use(bodyParser.urlencoded({ extended: true })); // support encoded bodies
app.use(cors())



app.get('/', function (req, res) {

    fetch('https://www.cryptocompare.com/api/data/coinlist/')
        .then(function (res) {
            return res.json();
        }).then(function (json) {
            res.send({ data: json });
        });

});

app.get('/cloudinary', function (req, res) {

    cloudinary.v2.api.resources({ type: 'upload' }, function (error, result) {
        if (error) {
            res.send({ data: error });
        }
        res.send(result);
    });

});

app.listen(port, function () {
    console.log('Our app is running on Port: ' + port);
});
