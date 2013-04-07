var express = require('express');
var http = require('http');
var path = require('path');
var db = require("./db");

var app = express();

// setup server
app.configure(function(){
  app.set('port', process.env.PORT || 3000);
  app.set('db_host', 'localhost');
  app.set('views', __dirname + '/views');
  app.set('view engine', 'html');
  app.engine('html', require('./custom_hbs').__express);
  app.use(express.favicon(__dirname + '/public/favicon.ico'));
  app.use(express.logger('dev'));
  app.use(express.bodyParser());
  app.use(express.methodOverride());
  app.use(app.router);
  app.use(express.static(path.join(__dirname, 'public')));
});

app.configure('development', function(){
  app.use(express.errorHandler());
});

// establish DB connection
db.connect({
  host: app.get('db_host')
});

// set up routes
var routes = require('./routes')
app.get('/', routes.index);
app.get('/get_all', routes.get_all);
app.get('/get/:id', routes.get);
app.post('/create', routes.create);
app.post('/update/:id', routes.update);
app.post('/delete/:id', routes.delete);


// actually start server
http.createServer(app).listen(app.get('port'), function(){
  console.log("Express server listening on port " + app.get('port'));
});
