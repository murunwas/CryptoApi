var fetch = require('node-fetch');
var bodyParser = require('body-parser');
var express = require('express');
var cors = require('cors')
var app = express();
var port = process.env.PORT || 4300;

//Use
app.use(bodyParser.json()); // support json encoded bodies
app.use(bodyParser.urlencoded({ extended: true })); // support encoded bodies
app.use(cors())



app.get('/', function (req, res) {

    fetch('https://www.cryptocompare.com/api/data/coinlist/')
    .then(function(res) {
        return res.json();
    }).then(function(json) {
        res.send({data: json});
    });
   
  });

  app.listen(port, function () {
    console.log('Our app is running on Port: ' + port);
  });
