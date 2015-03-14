/**
 * Created by roche_d on 14/03/15.
 */

var express = require('express'),
    app = express(),
    server = require('http').createServer(app);


var SubProcess = require('child_process').spawn,
    GameServiceProcess = SubProcess('node', ['game.js']);

GameServiceProcess.stdout.on('data', function(data) {
    console.log("Game PROCESS: " + data);
});

app.use('/', express.static(__dirname + '/web/www'));
//app.use(['/game', '/'], game, express.static(__dirname + '/web/www'));

server.listen(8080);
