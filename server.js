/**
 * Created by roche_d on 14/03/15.
 */

var express = require('express'),
    app = express(),
    game = express(),
    server = require('http').createServer(app);

GameServiceProcess = require("./game.js");

GameServiceProcess.startGame(game);


app.use(['/game/*'], game);
app.use(['/'], express.static(__dirname + '/web/www'));

server.listen(8080);
