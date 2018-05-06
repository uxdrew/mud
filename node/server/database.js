const dbName = "mudDatabase";
const dbCollection = "mudData";
const url = "mongodb://localhost:27017/";
let createGraph = require('./plot');
let MongoClient = require('mongodb');

function getUserDataByName(username) {

    return new Promise(function(resolve) {
        resolve( MongoClient.connect(url));

    }).then(function(db){
        let query = {user : username};
        return db.db(dbName).collection(dbCollection).find(query).toArray();

    }).then(function(result) {
        return createGraph(result);
    });
}


function save(data) {

    let s = data.timeStamp.split(' ');
    data.date = s[0];
    data.hour = s[1];
    delete data.timeStamp;

    return new Promise(function(resolve) {
        resolve( MongoClient.connect(url));

    }).then(function(db) {
        return db.db(dbName).collection(dbCollection).insertOne(data);
    }).then(function(res) {
        console.log('1 mud record inserted');
    })

}
module.exports.getUserDataByName = getUserDataByName;
module.exports.save = save;