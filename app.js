var express         = require('express'),
    session	        = require('express-session'),
    bodyParser      = require('body-parser'),
    compression	    = require('compression'),
    cookieParser    = require('cookie-parser'),
    flash           = require('connect-flash'),
    morgan          = require('morgan'),
    mysql           = require('mysql'),
    passport 	    = require('passport'),

    // Main Application Object
    app	            = express(),

    // Passport Strategy
    BearerStrategy	= require('passport-http-bearer').Strategy,
    LocalStrategy	= require('passport-local').Strategy,

    config			= require('./config')
	;

console.log();
console.log('Script executed at ' + (new Date()));
console.log();

/* Initialize connection to MySQL */
var connector = mysql.createConnection(config.mysql);

connector.connect(function(err) {
    if (err) {
        console.error('Error while connecting to MySQL: ' + err.stack);
        return;
    }

    console.log(config.app.name + ' has been connected to MySQL successfully.');
});

/* Setting Up Passport */
passport.use(new BearerStrategy(
    function(token, done) {
        var strQuery = 'SELECT * FROM users WHERE access_token = ' + token + ';';
        connector.query(strQuery, function(err, rows, fields) {
            if (err) { return done(err, false, {message: "Error."}); }
            if (rows.length == 0) { return done(null, false, {message: "Unauthorized."}); }
            return done(null, user, { scope: 'all' });
        });
    }
));

passport.use(new LocalStrategy(function(email, password, done) {
    var strQuery = 'SELECT * FROM users WHERE email = \'' + email + '\' AND password = \'' + password + ''\'';
    connector.query(strQuery, function(err, rows, fields) {
        if (err) { return done(err); }
        if (rows.length == 0) {
            return done(null, false, { message: 'Incorrect email or password.' });
        }
        var user = rows[0];
        return done(null, user);
    });
}));

app.use(passport.initialize());

/* Set views directory and engine. */
app.set('views', './views');
app.set('view engine', 'jade');

/* Set body parser for request sent to the server. */
app.use(bodyParser.urlencoded({
    extended: true
}));

/* Minify output. */
app.use(compression());

/* Set up logger. */
app.use(morgan(config.morgan.mode));

/* Set static file location. */
app.use(express.static(__dirname + '/public'));

/* Boot up! Set up all controllers. */
var commonPages = {
    ERROR       : '../../views/errors/500',
    FORBIDDEN   : '../../views/errors/403',
    NOT_FOUND   : '../../views/errors/404',
};
var args = {
    config      : config,
    connector   : connector,
    pages       : commonPages
};
require('./libs/boot')(app, args, { verbose: !module.parent });

/* Set global variables and functions for every controller actions. */
app.all('*', function(req, res, next) {
    if (typeof req.user != 'undefined') {
        res.locals.user = req.user;
    }

    res.locals.current = {
        url: req.protocol + '://' + req.get('host') + req.originalUrl
    };

    next();
});

/* Handle internal server error and render a view. */
app.use(function(err, req, res, next){
	if (!module.parent) console.error(err.stack);
	res.status(500).render('errors/5xx');
});

/* Handle not found error and render a view. */
app.use(function(req, res, next){
	res.status(404).render('errors/404', { url: req.originalUrl });
});

/* Run! */
var server = app.listen(config.app.port, function () {
    var host = server.address().address;
    var port = server.address().port;

    console.log(config.app.name + ' listening at localhost port ' + port);
    console.log();
});
