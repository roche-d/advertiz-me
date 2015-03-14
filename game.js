/**
 * Created by roche_d on 14/03/15.
 */

game.get('/', function(req, res) {
    res.send('HELLOW :)');
    console.log("logged on game");
});

game.on('mount', function(parent) {
    console.log("game started !");
});