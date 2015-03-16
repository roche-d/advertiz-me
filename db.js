/**
 * Created by roche_d on 15/03/15.
 */

var mongoose = require( 'mongoose' );

module.exports = function () {

    var Schema   = mongoose.Schema;
//updated_at : Date

    var PlayerSchema = new Schema({
        name: {type: String, unique: true}
    }) ;

    var PlaySchema = new Schema({
        players: [PlayerSchema],
        results: [Number],
        actions: Schema.Types.Mixed,
        turn: Number,
        winner: String,
        awaiting: Boolean
    });

    PlaySchema.methods.Winner = function () {
        if (this.results[0] > this.results[1]) {
            return this.players[0];
        }
        else if (this.results[1] != this.results[0]) {
            return this.players[1];
        }
        else {
            return null;
        }
    };

// Pierre 1
// Papier 2
// Ciseau 3
    var WhoWins = function (a, b) {
        if (a === b) {
            return 0;
        }
        if ((a === 2 && b === 1) || (a === 1 && b === 3) || (a === 3 && b === 2)) {
            return 1;
        }
        return -1;
    }

    PlaySchema.methods.PlayAction = function (playername, action) {
        console.log("play called !");
        var p = this.isInGame(playername);
        if (p === -1 || this.turn === 2 || this.WaitingForPlayer()) {
            console.log("FAIL IN PLAYACTION !");
            return;
        }
        if (this.actions[p][0] != 0)
        {
            console.log("FAIL already played !");
            return ;
        }
        this.actions[p] = action;
        for (var i = 0; i < 3; i++) {
            var r = WhoWins(this.actions[0][this.turn], this.actions[1][this.turn]);
            if (r === 1) {
                this.results[0]++;
            } else if (r === -1) {
                this.results[1]++;
            }
            this.turn++;
        }
        var w = this.Winner();
        if (w === null) {
            this.winner = null;
        } else {
            this.winner = w.name;
        }
    };

    PlaySchema.methods.WaitingForPlayer = function () {
        console.log("players: "+ this.players);
        return (this.players.length === 1);
    };

    PlaySchema.methods.Join = function (player, err) {
        if (this.awaiting) {
            this.players[1] = player;
            this.awaiting = false;
            if (err) return err(false);
        } else {
            if (err) return err(true);
        }
        this.save();
    };

    PlaySchema.methods.isInGame = function (playerid) {
        if (this.players[0].id === playerid) {
            return 0;
        } else if (!this.awaiting && this.players[1].id === playerid) {
            return 1;
        } else {
            return -1;
        }
    };

    var Models = {
        Player: mongoose.model('Player', PlayerSchema),
        Play : mongoose.model('Play', PlaySchema)
    };
    return Models;
};


// Clever Cloud connection
mongoose.connect('mongodb://uo3ki5n2z1wu53o:H9zetP5uuA4NFtpIqmWE@bbx9dqcu2it6mu0.mongodb.clvrcld.net/bbx9dqcu2it6mu0');
var db = mongoose.connection;
db.on('error', console.error.bind(console, "BDD error:"));
db.once('open', function () {
    db.db.dropDatabase();

    //var Player = mongoose.model('Player', PlayerSchema);
    //var Play =

    /*var pa = new Player({name: 'a'});
    var pb = new Player({name: 'b'});

    var g = new Play({players: [pa], results: [0, 0], actions: [ [0, 0, 0], [0, 0, 0]], turn: 0});
    g.Join(pb);
    g.PlayAction(pa.name, 2);
    //g.PlayAction(pa.name, 2);
    g.PlayAction(pb.name, 1);

    g.PlayAction(pa.name, 1);
    g.PlayAction(pb.name, 1);

    g.PlayAction(pa.name, 3);
    g.PlayAction(pb.name, 2);

    console.log(g + ' : ' +pa.name + ' ' + g.WaitingForPlayer() + ' : ' + g.Winner());*/
    //module.exports = Player;
    //module.exports.Play = Play;

    console.log("DB Connected");
});
