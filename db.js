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
    mongoose.connect('mongodb://localhost/advertiz-me');
var db = mongoose.connection;
db.on('error', console.error.bind(console, "BDD error:"));
db.once('open', function () {
    console.log("DB Connected");
});
