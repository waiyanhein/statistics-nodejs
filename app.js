var mongoose = require('mongoose');//Global variable. Singleton
var express = require('express');
var body_parser = require('body-parser');
var handlebars  = require('express-handlebars'), hbs;
var http = require('http');
var path = require('path');
var route = require('./route');
var validator = require('express-validator');
var flash = require('connect-flash');
var session = require('express-session');
var web_middleware = require('./middlewares/web_middleware');
var config = require('./config');
var cors = require('cors');


//api key - _E-Phravtk8xngVnXS1E86WiS2KRcx-2
//https://api.mlab.com/api/1/databases?apiKey=2E81PUmPFI84t7UIc_5YdldAp1ruUPKye
//'mongodb://waiyanhein:april.2241991@ds131137.mlab.com:31137/crud_db'
var app = express();

mongoose.connect('mongodb://waiyanhein:april.2241991@ds131137.mlab.com:31137/crud_db');


app.set('port', 3000);
app.set('views', path.join(__dirname, 'views'));
/* express-handlebars - https://github.com/ericf/express-handlebars
A Handlebars view engine for Express. */
hbs = handlebars.create({
   // defaultLayout: 'main'
});
app.engine('handlebars', hbs.engine);
app.set('view engine', 'handlebars');

app.use(express.static('public'));
app.use(body_parser.json())
app.use(body_parser.urlencoded({extended: true}))
app.use(flash());
app.use(validator());
app.use(web_middleware.retrieve_auth_token);
app.use(cors({
  'allowedHeaders': ['sessionId', 'Content-Type'],
  'exposedHeaders': ['sessionId'],
  'origin': '*',
  'methods': 'GET,HEAD,PUT,PATCH,POST,DELETE',
  'preflightContinue': false
}));
app.use(session({
    name : 'app.sid',
    secret: "1234567890QWERTY",
    resave: true,
    saveUninitialized: true
}));

// This usually happens when you stop your express server after login, your cookie still remains saved in the browser.
app.use((req, res, next) => {
    if (!req.session.user) {
        
    }
    next();
});



//regiser the route
// app.get('/', web_middleware.check_login_session, function(req, res){
// 	res.send('Home Page');
// });

route.register(app);

http.createServer(app).listen(app.get('port'), function(){
  console.log('Express server listening on port ' + app.get('port'));
});


//hashing password with bcrypt
//const salt = bcrypt.genSaltSync();
//user.password = bcrypt.hashSync(user.password, salt);

//bcrypt.compareSync(password, db_password);