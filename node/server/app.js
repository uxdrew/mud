const express = require('express');
const app = express();
let port = 8080;
let databaseMethods = require('./database');
let getUserDataByName = databaseMethods.getUserDataByName;
let save = databaseMethods.save;

//better JSON parsing
let bodyParser = require('body-parser');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));


app.post('/', function(req, res) {

	console.log(req.query);

    save(req.query);

    res.end();
  
});

app.get('/graph', function(req,res) {
    let user = req.query.user;

	console.log("Get request for: " + user);

    getUserDataByName(user, function(err, data, count) {
	    if (err) throw err;

        res.end(JSON.stringify([{
            count: count,
            data: data
        }]));

    });
});



app.listen(port, () => console.log('App listening on port ' + port));





