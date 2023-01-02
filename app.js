var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

var indexRouter = require('./routes/index');
const studentRouter = require('./routes/studentRoute');
const groupRouter = require('./routes/groupRoute');
const studyRouter = require('./routes/studyRoute');

var app = express();

var cors = require('cors');
app.use(cors);

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

//linking date formatting function
const fmt = require('./utils/dateFormatting');
app.use((req, res, next) => {
    res.locals.fmt = fmt;
    next();
});

//sesje użytkownika
const session = require('express-session');
app.use(session({
    secret: 'my_secret_password',
    resave: false
}));

app.use((req, res, next) => {
    res.locals.loggedUser = req.session.loggedUser;
    if(!res.locals.loginError) {
        res.locals.loginError = undefined;
    }
    next();
});

//internacjonalizacja
const i18n = require('i18n');
i18n.configure({
    locales: ['pl', 'en'], // języki dostępne w aplikacji. Dla każdego z nich należy utworzyć osobny słownik
    directory: path.join(__dirname, 'locales'), // ścieżka do katalogu, w którym znajdują się słowniki
    objectNotation: true, // umożliwia korzstanie z zagnieżdżonych kluczy w notacji obiektowej
    cookie: 'pjatk-stud-lang', //nazwa cookies, które nasza aplikacja będzie wykorzystywać do przechowania informacji o
});


app.use((req, res, next) => {
    if(!res.locals.lang) {
        const currentLang = req.cookies['pjatk-stud-lang'];
        res.locals.lang = currentLang;
    }
    next();
});

app.use(i18n.init);

const authUtils = require('./utils/authUtils');
app.use('/students', authUtils.permitAuthenticatedUser, studentRouter);
app.use('/studies', authUtils.permitAuthenticatedUser, studyRouter);
app.use('/groups', authUtils.permitAuthenticatedUser, groupRouter);

app.use('/', indexRouter);
app.use('/students', studentRouter);
app.use('/groups', groupRouter);
app.use('/studies', studyRouter);



// api
const studApiRouter = require('./routes/api/StudentApiRoute');
app.use('/api/students', studApiRouter);

const groupApiRouter = require('./routes/api/GroupApiRoute');
app.use('/api/groups', groupApiRouter);

const studyApiRouter = require('./routes/api/StudyApiRoute');
app.use('/api/studies', studyApiRouter);

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

const sequelizeInit = require('./config/sequelize/init');
sequelizeInit()
    .catch(err => {
        console.log(err);
    });
module.exports = app;


