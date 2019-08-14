//Import the mongoose module
var mongoose = require('mongoose');

//Set up default mongoose connection
//var mongoDB = 'mongodb://localhost:27017/IonicDemo';
//var mongoDB = 'mongodb+srv://teja:mean@cluster0-37hv6.mongodb.net/Ca_Firm';
var mongoDB = 'mongodb+srv://dharmendra:dharmendra@cluster0-niymj.mongodb.net/newsapp';
mongoose.connect(mongoDB, { useNewUrlParser: true }, (err) => {
    if (err)
        console.log(err);
    else
        console.log('database connected');
});
// Get Mongoose to use the global promise library
mongoose.Promise = global.Promise;
//Get the default connection
var db = mongoose.connection;

//Bind connection to error event (to get notification of connection errors)
db.on('error', console.error.bind(console, 'MongoDB connection error:'));

module.exports = db;