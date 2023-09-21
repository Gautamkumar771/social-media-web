const express = require('express');
const cookieParser = require('cookie-parser');
const app = express();
const port = 8000;
const path = require('path');
const expressLayouts = require('express-ejs-layouts');
const db = require('./config/mongoose');
//used for session cookies
const session = require('express-session');
const passport = require('passport');
const passportLocal = require('./config/passport-local-strategy');
const passportJWT = require('./config/passport-jwt-strategy');
const passportGoogle = require('./config/passport-google-oauth2-strategy');
const MongoStore = require('connect-mongo');
const flash = require('connect-flash');
const customMware = require("./config/middleware");

app.use(express.urlencoded());

app.use(cookieParser());

//const app = express();
//const port = 8000;
const Contact = require('./models/user');
//const MongoStore = require('connect-mongo');
//app.use(express.static('./assets'));

app.use(express.static(path.join(__dirname,"assets")));
app.use('/uploads', express.static(__dirname + '/uploads'));

app.use(expressLayouts);

//stract style and scrit from subpage to the layout
//app.set('layout', './views/layout.ejs');
app.set('layout extractStyles', true);
app.set('layout extractScripts', true);




//set up the view engine 
app.set("view engine", "ejs");
app.set("views", "./views");
//app.set('view engine', 'ejs'); 
//it show that the we install the veiws engine that is (ejs) command is npm install ejs  
//app.set('views', './views');
//app.set("views", path.join(__dirname, "views"));
//app.use(express.static(__dirname + "/assets"));

// use express route



// mongo store is used to store the session cookie in the db
app.use(session({
    name: 'codeial',

    secret: 'blahsomething',
    saveUninitialized: false,
    resave:false,
    cookie: {
        maxAge: (1000*60*100)
    },
    store: MongoStore.create({
        mongoUrl: 'mongodb://127.0.0.1:27017/gautam',
        autoRemove:'disabled'
    }, function(err){
        console.log(err || "Connect-mongo Setup ok");
    })


}));

app.use(passport.initialize());
app.use(passport.session());

//app.set(passport.setAuthenticatedUser);
 app.use(passport.setAuthenticatedUser);

app.use(flash());
app.use(customMware.setFlash);

//use express router
app.use('/',require('./routes'));

app.listen(port,function(err){
    if(err){
        console.log(`error in running the server: ${err}`);
    }
    console.log(`server is running on port: ${port}`);
});