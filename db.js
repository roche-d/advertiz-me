/**
 * Created by roche_d on 15/03/15.
 */

var mongoose = require( 'mongoose' );
var Schema   = mongoose.Schema;

/*
var Todo = new Schema({
    user_id    : String,
    content    : String,
    updated_at : Date
});

mongoose.model( 'Todo', Todo );
*/
// Clever Cloud connection
// mongoose.connect( 'mongodb://db_username:db_password@db_host/db_name' );
    mongoose.connect('mongodb://uo3ki5n2z1wu53o:H9zetP5uuA4NFtpIqmWE@bbx9dqcu2it6mu0.mongodb.clvrcld.net/bbx9dqcu2it6mu0');
var db = mongoose.connection;
db.on('error', console.error.bind(console, "BDD error:"));
db.once('open', function () {
    console.log("DB Connected");
});
