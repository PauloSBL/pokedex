const path = require('path')
const { Sequelize } = require('sequelize')
const mysql = require('mysql2')
const express = require('express')
const { engine } = require('express-handlebars')
const session = require('express-session')
const FileStore = require("session-file-store")(session)
const conn = require('./models/conn')
const Pokemon = require('./models/Pokemon')
const User = require('./models/User')
const pokemonRouters = require('./routers/index')
const app = express();
const flash = require('connect-flash');

app.use(
    express.urlencoded({
      extended: true,
    }),
  )

  app.use(
    session({
      name: 'session',
      secret: 'pokemon_pokedex',
      resave: false,
      saveUninitialized: false,
      store: new FileStore({
        logFn: function () {},
        path: require('path').join(require('os').tmpdir(), 'sessions'),
      }),
      cookie: {
        secure: false,
        maxAge: 3600000,
        expires: new Date(Date.now() + 3600000),
        httpOnly: true,
      },
    }),
  )

  app.use((req, res, next) => {
    res.locals.session = req.session;
  
    next();
  });
  
app.use(express.json())
app.engine('handlebars', engine());
app.set('view engine', 'handlebars');
app.use(express.static('public'))
app.use(express.static(path.join(__dirname, 'public/css/')));
app.use(express.static(path.join(__dirname, 'public/img/')));
app.set('views', 'views');
app.use(flash());
app.use('/', pokemonRouters)


conn.sync({force:true})
app.listen(3000);