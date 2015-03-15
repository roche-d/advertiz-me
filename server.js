/**
 * Created by roche_d on 14/03/15.
 */

var express = require('express'),
    app = express(),
    game = express.Router(),
    bodyParser= require('body-parser');
    server = require('http').createServer(app);

game.use(bodyParser.urlencoded({extended: true}));
game.use(bodyParser.json());



GameServiceProcess = require("./game.js");

var models = require('./db')();

GameServiceProcess.startGame(game, models);

//var p = new models.Play();

// CODE POUR HTTPS
var fs = require('fs');
var https = require('https');
try {
    var privateKey = fs.readFileSync('privateKey.key', 'utf8');
    var certificate = fs.readFileSync('certificate.crt', 'utf8');
} catch (err) {

}

var credentials = {key: privateKey, cert: certificate};

// Serveur HTTPS
var httpsServer = https.createServer(credentials, app);

// POST FACEBOOK
app.post('/fapp/*', function(req, res) {
    res.sendfile(__dirname + '/web/www/fapp/index.html');
});


app.use(function(req, res, next) {

    // log each request to the console
    console.log(req.method, req.url);

    // continue doing what we were doing and go to the route
    next();
});

app.use(['/game/'], game);
app.use(['/'], express.static(__dirname + '/web/www'));

try {
    //httpsServer.listen(443);
} catch (err) {
    console.log("HTTPS pas encore ready !");
}
try {
    server.listen(8080);
} catch (err) {

}
