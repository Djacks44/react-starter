var express = require('express');
var request = require('request');
var session = require('express-session');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var methodOverride = require('method-override');
var logger = require('morgan');
var twitter = require('twitter');
var Recipe = require('./models/user.js');




var app = express();
var PORT = process.env.PORT || 3000;


app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.text());
app.use(bodyParser.json({type:'application/vnd.api+json'}));

app.use(express.static('./public'));



//allow session
app.use(session({secret: 'app', cookie: { maxAge: 60000000000000000000000}}));
app.use(cookieParser());

// override with POST having ?_method=DELETE
app.use(methodOverride('_method'))


var users_controller = require('./controller/users_controller');

app.use('/users', users_controller);

app.get('/', function(req, res){
	res.sendFile('./public/index.html');
});

app.get('/sign-out', function(req, res){
	req.session.destroy();
});

var tapi = require('./apis/tapi.js');


app.use('/', tapi);



app.listen(PORT, function() {
	console.log("App listening on PORT: " + PORT);
});