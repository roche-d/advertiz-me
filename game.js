/**
 * Created by roche_d on 14/03/15.
 */

var game = express();

game.get('/', function(req, res) {
    res.send('HELLOW :)');
    console.log("logged on game");
});

app.use(['/game'], game);

console.log("game started !");