/**
 * Created by roche_d on 14/03/15.
 */

var express = require('express'),
    app = express(),
    server = require('http').createServer(app);

app.use(express.static(__dirname + '/web/www'));

server.listen(80);