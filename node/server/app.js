const express = require('express');
const app = express();
const port = 8080;

let databaseMethods = require('./database');
let getUserDataByName = databaseMethods.getUserDataByName;
let save = databaseMethods.save;
let bodyParser = require('body-parser');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));


app.post('/', function(req, res) {

	console.log(req.body);

    save(req.body);

    res.end();
  
});

app.get('/graph', function(req,res) {
    let user = req.query.user;

	console.log("Get request for: " + user);

    getUserDataByName(user).then(function(result) {
        res.end(JSON.stringify(result))

    }, function(err) {
        console.log(err);

    });

});


app.listen(port, () => console.log('App listening on port ' + port));





