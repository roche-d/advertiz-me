/**
 * Created by roche_d on 14/03/15.
 */

module.exports.startGame = function(game, models) {

var FindPlayer = function (nametofind, next) {
    console.log("try to find id player :" + nametofind + ";");
    models.Player.findById(nametofind, function (err, player) {
        console.log("err: " + err);
        if (err) return err;
        console.log("player " + nametofind + " founded");
        next(player);
    })
}; //plop

    var GameErrorHandling = function(err) {

    }

    var GameFormatData = function (res, player, game) {
        console.log("DATAFORMAT Game: " + game);
        if (typeof game === 'undefined') {
            return ;
        }
        var idJoueur = game.isInGame(player.id);
        var idOpponent = (idJoueur === 0) ? (1) : (0);
        res.json({
            'id': game.id,
            'player': {'id': player.id, 'name': player.name, 'selection': game.actions[ idJoueur ]},
            'competitor': (game.players[idOpponent] === null) ? ('null') : game.players[idOpponent].name
        });
    };


    // DETAIL MATCH
    game.post('/match/detail/:match_id', function (req, res) {
        if (typeof req.body.player_id === 'undefined') {
            res.send('Need a player id !');
            return;
        }
        var idPlayer = req.body.player_id;

        models.Play.findById(req.params.match_id, function (err, match) {
            console.log("Match id: " + req.params.match_id);
            if (err) res.send(err);
            if (match) {
                FindPlayer(idPlayer, function (player) {
                    console.log("detail : " + match);
                    GameFormatData(res, player, match);
                });
            } else {
                console.log("can't find match !");
                res.send('Impossible to find the match !' + err);
            }
        });
    });


    //REJOINDRE UN MATCH
    game.put('/match/join', function (req, res) {
        console.log("called join with " + req.body.playername);

        // UNE FOIS QU'ON A LE JOUEUR
        var suite = function(player) {

            if (player === null) {
                console.log("player not found !" + player);
                return;
            }
            console.log("player found !" + player);

            // Trouve une partie incomplete
            models.Play.findOne({'awaiting': 'true'}, function (err, match) {

                if (err) res.send(err);

                console.log("match found ! : " + match);

                if (match) {
                    match.Join(player, GameErrorHandling);
                    match.save();
                    GameFormatData(res, player, match);

                } else {
                    console.log("create new game !");
                    match = new models.Play({
                        players: [player, null],
                        results: [0, 0],
                        actions: [[0, 0, 0], [0, 0, 0]],
                        turn: 0,
                        awaiting: true
                    });
                    match.save();
                    GameFormatData(res, player, match);
                }


            });
        };

        var idPlayer;
        if (typeof req.body.player_id === 'undefined')
        {
            if (typeof req.body.playername === 'undefined' || req.body.playername === '')
            {
                console.log("no player name and no id in join !");
                res.send('Need a player name or an id !');
                return ;
            }
            var player = new models.Player({name: req.body.playername});
            player.save();
            console.log("player saved id:"+player.id);
            idPlayer = player.id;
            suite(player);
        } else {
            idPlayer = req.body.player_id;
            FindPlayer(idPlayer, suite);
        }



    });

    game.put('/match/:match_id/play', function (req, res) {
        console.log(req.body);

        FindPlayer(req.body.playername, function (player) {

            if (player === null) {
                console.log("PLAYER NOT FOUND IN PLAY !");
                return ;
            }
            console.log("player found !" + player);
            models.Play.findById(req.params.match_id, function (err, match) {


                if (err) res.send(err);
                //var query = models.Play.where({ 'players': { $size: 1}});
                console.log("match found ! : " + match);

                if (match) {
                    match.PlayAction(player, req.body.actions);
                    GameFormatData(res, player, match);
                    match.save();
                } else {
                    console.log("IMPOSSIBLE TO FIND THE GAME IN PLAY !");
                }
            });


        });
    });
}

    console.log("ended game js");
