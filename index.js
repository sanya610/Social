const express = require('express');
const env = require('./config/environment');
const logger = require('morgan');

const cookieParser = require('cookie-parser');
const app = express();


const port = 8000;
const expresslayouts = require('express-ejs-layouts');
const db = require('./config/mongoose');

require('./config/view-helpers')(app);
//used for session cookie
const session = require('express-session');
const passport = require('passport');
const passportLocal = require('./config/passport-local-strategy');
const passportJWT = require('./config/passport-jwt-strategy');
const passportGoogle = require('./config/passport-google-oauth2-strategy');


const mongoStore = require('connect-mongo')(session);
const sassMiddleware = require('node-sass-middleware');
const flash = require('connect-flash');
const customMiddleWare = require('./config/middleware');



// setup the chat server to be used with socket.io
const chatServer = require('http').Server(app);
const chatSockets = require('./config/chat_socket').chatSockets(chatServer);
chatServer.listen(5000);
console.log('chat server is listening on port 5000');

const path = require('path');

if(env.name=='development')
{
  app.use(sassMiddleware({
    src: path.join(__dirname, env.asset_path, 'scss'),
    dest: path.join(__dirname, env.asset_path, 'css'),
    debug: true,
    outputStyle: 'extended',
    prefix: '/css'
  }));
}


//reading through post request
app.use(express.urlencoded({extended: false}));

//setting up cookie parser
app.use(cookieParser());

app.use(express.static(env.asset_path));

//make the uploads path available to the browser
app.use('/uploads',express.static(__dirname + '/uploads'));


//logger
app.use(logger(env.morgan.mode,env.morgan.options));

app.use(expresslayouts);

//Extract style & scripts from Sub pages into the layout
app.set('layout extractStyles',true);
app.set('layout extractScripts',true);


//set up view engine
app.set('view engine','ejs');
app.set('views','./views');


app.use(session({
  name: 'socialWeb',
  //TODO the change secret before deployment in production mode
  secret: env.session_cookie_key,
  saveUninitialized: false,
  resave: false,
  cookie: {
    maxAge: (1000*60*100)
  },
  store: new mongoStore(
    {
      mongooseConnection: db,
      autoRemove: 'disabled'
    },
    
    function(err)
    {
     console.log(err || 'connect mongo setup ok'); 
    }
  ) 
 }));
 
 
 app.use(passport.initialize());
 app.use(passport.session());

 app.use(passport.setAuthenticatedUser);

 
 app.use(flash());
 app.use(customMiddleWare.setFlash); 



//use express router
app.use('/',require('./routes'));




app.listen(port,function(err)
{
 if(err)
 {
  console.log(`Error in runing the server : ${err}`);   
 }  
  
  console.log(`Server is running on port : ${port}`);
}); 

