const express = require('express');
const cookieParser = require('cookie-parser');
const app = express();
const port = 8000;

const expresslayouts = require('express-ejs-layouts');
const db = require('./config/mongoose');

//reading through post request
app.use(express.urlencoded());

//setting up cookie parser
app.use(cookieParser());


app.use(express.static('./assets'));

app.use(expresslayouts);

//Extract style & scripts from Sub pages into the layout
app.set('layout extractStyles',true);
app.set('layout extractScripts',true);


//use express router
app.use('/',require('./routes'));

//set up view
app.set('view engine','ejs');
app.set('views','./views');





app.listen(port,function(err)
{
 if(err)
 {
  console.log(`Error in runing the server : ${err}`);   
 }  
  
  console.log(`Server is running on port : ${port}`);
});