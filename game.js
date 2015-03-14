/**
 * Created by roche_d on 14/03/15.
 */

game = express(),
    gameserver = require('http').createServer(game);
//app.use('/game', game);

game.get('/', function(req, res) {
    res.send('HELLOW :)');
    console.log("logged on game");
});

game.on('mount', function(parent) {
    console.log("game started !");
});

gameserver.listen(9000);