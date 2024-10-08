var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

var indexRouter = require('./routes/index');
var homeRouter = require('./routes/home'); //added in Project 2 in "Restructure routing (part 1)"
var aboutRouter = require('./routes/about'); //added in Project 2 in "Restructure routing (part 1)"
var servicesRouter = require('./routes/services'); //added in Project 2 in "Restructure routing (part 1)"
var recommendationsRouter = require('./routes/recommendations'); //added in Project 2 in "Restructure routing (part 1)"
var portfolioRouter = require('./routes/portfolio'); //added in Project 2 in "Restructure routing (part 1)"
var contactRouter = require('./routes/contact'); //added in Project 2 in "Restructure routing (part 1)"
var usersRouter = require('./routes/users');

var loginRouter = require('./routes/login');

var passport = require('passport')
var session = require('express-session');
var JsonStore = require('express-session-json')(session);
var app = express();



// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.static(__dirname + '/node_modules/bootstrap/dist')); //added in Project 1 in "Restructure - Dependencies" lesson
app.use(express.static(__dirname + '/node_modules/jquery/dist/')); //added in Project 1 in "Restructure - Dependencies" lesson
app.use(express.static(__dirname + '/node_modules/typed.js/lib')); //added in Project 1 in "Restructure - Dependencies" lesson
app.use(express.static(__dirname + '/node_modules/bootstrap-icons')); //added in Project 1 in "Restructure - Dependencies" lesson

app.use(session({
  secret: 'keyboard cat',
  resave: false,
  saveUninitialized: false,
  store: new JsonStore()
}));
app.use(passport.authenticate('session'));

app.use('/', indexRouter);
app.use('/home', homeRouter); //added in Project 2 in "Restructure routing (part 1)"
app.use('/about', aboutRouter); //added in Project 2 in "Restructure routing (part 1)"
app.use('/services', servicesRouter); //added in Project 2 in "Restructure routing (part 1)"
app.use('/recommendations', recommendationsRouter); //added in Project 2 in "Restructure routing (part 1)"
app.use('/portfolio', portfolioRouter); //added in Project 2 in "Restructure routing (part 1)"
app.use('/contact', contactRouter); //added in Project 2 in "Restructure routing (part 1)"
app.use('/users', usersRouter);

app.use('/login', loginRouter);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});



module.exports = app;
