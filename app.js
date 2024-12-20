const createError = require('http-errors');
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const hbs = require('express-handlebars');
const session = require('express-session')
const PROVIDER_URL = process.env.PROVIDER_URL;
const CONTRACT_ADDRESS = process.env.CONTRACT_ADDRESS;
const PRIVATE_KEY = process.env.PRIVATE_KEY;

const indexRouter = require('./routes/index');
const adminRouter = require('./routes/adminRoute')
const voterRouter = require('./routes/voterRoute')



const app = express();
// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.engine('hbs', hbs.engine({
  extname:'hbs',
  defaultLayout : 'main',
  layoutsDir : path.join(__dirname,'views','layouts'),
  partialsDir : path.join(__dirname, 'views', 'partials')
}))
app.set('view engine', 'hbs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(session({
  secret: 'secret',
  resave: false,
  saveUninitialized: false,
  cookie: { secure: false }
}))
app.use(cookieParser());

app.use(express.static(path.join(__dirname, 'public')));



app.use('/', indexRouter);
app.use('/admin', adminRouter);
app.use('/voter', voterRouter);

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
