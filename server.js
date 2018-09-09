var express = require('express');
var bodyparser = require('body-parser');
var cors = require('cors');
var btoa = require('btoa');
var atob = require('atob');
var app = express();
var mongoose = require('mongoose');
var util = require('./public/utils/utility.js');

var schema = require('./Schema/Schema');
var URL = schema.URL;
var counter = schema.Counter;

var dbUri = 'mongodb://localhost/urlshortener';

mongoose.connect(dbUri, {
    useNewUrlParser: true,
});

mongoose.connection.on('connected', function () {
    console.log('Connected');
    counter.deleteMany({}, function (err) {
        if (err) return console.log(err);
        console.log('API: Counter Schema --> Deleted all entries');
    });
    URL.deleteMany({}, function (err) {
        if (err) console.log(err);
        console.log('API: URL Schema --> Deleted all entries');
    });

    var count_object = new counter({
        _id: 'url_count',
        count: 100000
    });
    count_object.save(count_object, function (err) {
        if (err) console.log(err);
        console.log('API : Counter Schema --> inserted the first count object');
    })
});

mongoose.connection.on('error', function () {
    console.log('API: mongoose could not connect to the db');
});


app.use(express.static(__dirname + '/public'));
app.use(bodyparser.json());
app.use(cors());

const port = process.env.port || 3000;

app.get('/', function (req, res) {
    res.send('index.html');
});


app.post('/shorten', function (req, res) {

    var testURL = req.body.target;

    URL.findOne({
        url: testURL
    }, function (err, doc) {
        if (doc === null) {
            var shortenUrl = new URL({
                url: testURL,
                createdAt: new Date()
            });

            shortenUrl.save(function (err, doc) {
                if (err) {
                    console.log('here' + err);

                }
                res.json({
                    doc: doc,
                    host: util.host
                });
            });
        } else {
            console.log("API: found a matching doc");
            res.json({
                doc: doc,
                host: util.host
            });
        }
    });
    4
});

app.get('/hash:id', function (req, res) {
    var param_id = req.params.id;
    
    URL.findOne({
        shortenUrl: param_id.substring(1)
    }, function (err, docs) {

        if (err) {
            console.log('API: --> error');
        }

        
        res.status(200).json({
            docs: docs
        })

    });
});

app.get('/findAll', function (req, res) {
    URL.find({}, function (err, doc) {

        if (err) {
            console.log(err);
            return console.error(err);
        }
        res.status(200).json({
            doc: doc,
            host: util.host
        });
    });
});



app.listen(port, () => console.log('server started on port: ' + port));
