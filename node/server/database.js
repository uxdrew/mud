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
        let returnValue =  db.db(dbName).collection(dbCollection).find(query).toArray();
        db.close();
        return returnValue;

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
        let returnValue = db.db(dbName).collection(dbCollection).insertOne(data);
        db.close();
        return returnValue;
    }).then(function(res) {
        console.log('\n  Mood record added!\n');
    })

}
module.exports.getUserDataByName = getUserDataByName;
module.exports.save = save;