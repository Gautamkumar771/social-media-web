//require the libary
const mongoose = require('mongoose');
mongoose.set('strictQuery', true);

//connect to the database
// mongoose.connect('mongodb://127.0.0.1:27017/gautam');
mongoose.connect('mongodb+srv://gautamkumar844506:<Gautam@12345>@cluster0.kanxjpq.mongodb.net/social-media');

// aqure the connection to check it is sucessful
const db = mongoose.connection;

//error
db.on('error',console.error.bind(console, "error connecting to mongodb"));

// up and running then print the msg
db.once('open',function(){
    console.log('connected to database :: mongodb');
});




// const mongoose = require("mongoose");
// // mongoose.set('strictQuery', false);
// const mongoDB = "mongodb://127.0.0.1/codeial"; 
// main().catch(err => console.log(err));
// async function main() {
//   await mongoose.connect(mongoDB);
//   console.log('connected to DB');
// }
