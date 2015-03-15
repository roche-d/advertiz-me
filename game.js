/**
 * Created by roche_d on 14/03/15.
 */



app.get('/game', function(req, res) {
    res.send('HELLOW :)');
    console.log("logged on game");
});

game.on('mount', function(parent) {
    console.log("game started !");
});