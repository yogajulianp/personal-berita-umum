var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

var session = require('express-session')
const multer  = require('multer')

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var newsRouter= require('./routes/news')
var commentsRouter = require('./routes/comment')

var app = express();

app.use(session({
  secret: '12345',
  resave: false,
  saveUninitialized: true,
  cookie: { secure: true }
}))

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
//app.use(multer({dest: 'images'}).single('image'))
app.use(express.static(path.join(__dirname, 'public')));

const db = require("./models");
db.sequelize.sync()
.then(()=> {
    console.log("sync db")
})
.catch((err)=>{
    console.log("error: " + err.message);
})

app.use('/product', indexRouter);
app.use('/users', usersRouter);
app.use('/', newsRouter);
app.use('/comments', commentsRouter);

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
