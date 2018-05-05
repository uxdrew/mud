const dbName = "mudDatabase";
const dbCollection = "mudData";
const url = "mongodb://localhost:27017/";
let createGraph = require('./plot');

function getUserDataByName(username, callback) {

    connect(function(err,db, dbo) {

        let query = { user : username };

        dbo.collection(dbCollection).find(query).toArray(function(err, result) {
            if (err) throw err;

            db.close();

            createGraph(result, function(err,msg,translatedData) {
                callback(err,msg,translatedData);
            });

        });
    })
}


function save(data) {

    let s = data.timeStamp.split(' ');
    data.date = s[0];
    data.hour = s[1];
    delete data.timeStamp;

    connect(function (err, db, dbo) {
        dbo.collection(dbCollection).insertOne(data, function (err, res) {
            if (err) throw err;

            console.log("1 mud record inserted");

            db.close();

        });
    });
}

function connect(callback) {
    let MongoClient = require('mongodb').MongoClient;

    MongoClient.connect(url, function (err, db) {

        if (err) throw err;

        let dbo = db.db(dbName);

        callback(null, db, dbo);
    })
}

module.exports.getUserDataByName = getUserDataByName;
module.exports.save = save;