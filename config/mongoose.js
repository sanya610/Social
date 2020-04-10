const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost/socialapp_development');

const db = mongoose.connection;

db.on('error',console.error.bind(console,"Error Connection to mongodB"));

db.once('open',function(){
   console.log("Connected to db :: Mongodb"); 
});

module.exports = db;


