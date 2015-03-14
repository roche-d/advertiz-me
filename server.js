/**
 * Created by roche_d on 14/03/15.
 */

var express = require('express'),
    app = express(),
    game = express(),
    server = require('http').createServer(app);

GameServiceProcess = require("./game.js");

GameServiceProcess.startGame(game);



var fs = require('fs');
var https = require('https');
try {
    var privateKey = fs.readFileSync('privateKey.key', 'utf8');
    var certificate = fs.readFileSync('certificate.crt', 'utf8');
} catch (err) {

}

var credentials = {key: privateKey, cert: certificate};

// your express configuration here

var httpsServer = https.createServer(credentials, app);




app.use(['/game/*'], game);
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
