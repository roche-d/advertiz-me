/**
 * Created by roche_d on 14/03/15.
 */

module.exports.startGame = function(game, models) {

var FindPlayer = function (nametofind, next) {
    var query = models.Player.where({'name': nametofind});
        query.findOne(function (err, player) {
            if (err) return err;
            next(player);
        });
    };

    var GameErrorHandling = function(err) {

    }

    var GameFormatData = function (res, player, game) {
        var idJoueur = game.isInGame(player.name);
        var idOpponent = (idJoueur === 0) ? (1) : (0);
        res.json({
            'id': game._id,
            'player': {'name': player.name, 'selection': game.actions[ idJoueur ]},
            'competitor': (game.WaitingForPlayer()) ? ('null') : game.players[idOpponent].name
        });
    };

    game.post('/match/:match_id', function (req, res) {
            models.Play.findById(req.params.match_id, function (err, match) {
                if (err) res.send(err);
                FindPlayer(req.body.playername, function (player) {
                    GameFormatData(res, player, match);
                });
            });
        });

    game.put('/match/join', function (req, res) {
        console.log(req.body);

        FindPlayer(req.body.playername, function (player) {

            if (player === null) {
                player = new models.Player({name: req.body.playername});
                player.save();
            }
            console.log("player found !" + player);
            models.Play.findOne({ turn: '0' }, function (err, match) {


                if (err) res.send(err);
                //var query = models.Play.where({ 'players': { $size: 1}});
                console.log("match found ! : " + match);

                if (match) {
                    match.Join(player, GameErrorHandling);
                    GameFormatData(res, player, match);
                    match.save();
                } else {
                    console.log("create new game !");
                    match = new models.Play({players: [player], results: [0, 0], actions: [ [0, 0, 0], [0, 0, 0]], turn: 0});

                    GameFormatData(res, player, match);
                    match.save();
                }
            });


        });
    });



   /* game.on('mount', function (parent) {
        console.log("game started !");
    })*/
}

    console.log("ended game js");
