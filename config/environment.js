const fs = require('fs');
const rfs = require('rotating-file-stream');
const path=require('path');

const logDirectory = path.join(__dirname,'../production_logs');
fs.existsSync(logDirectory) || fs.mkdirSync(logDirectory);

const accessLogStream = rfs.createStream('access.log', {
    interval: '1d',
    path: logDirectory
});


const development = {
    name: 'development',
    asset_path: './assets',
    session_cookie_key: 'blahsomething',
    db: 'socialapp_development',
    smtp: {
        
            service: 'gmail',
            host: 'smtp.gmail.com',
            port: 587,
            secure: false,
            auth: {
                user: 'sanya101715139@gmail.com',  //gmail id I'm using
                pass: '3destiny',
          }
    },

    google_client_id: "159667026561-tcn7or0ltcj753naed6e7tlo1qa0607e.apps.googleusercontent.com",
    google_client_secret: "-vZxwnjSm3Q_BeZhQqbhGb-t",
    google_call_back_url: "http://localhost:8000/users/auth/google/callback",
    jwt_secret: 'social',
    
    morgan:{
            mode: 'dev',
            options: {stream: accessLogStream}
    }        
 }


const production = {
    name: 'production',
    asset_path: process.env.SOCIAL_ASSET_PATH,
    session_cookie_key: process.env.SOCIAL_SESSION_COOKIE_KEY,
    db: process.env.SOCIAL_DB,
    smtp: {
            service: 'gmail',
            host: 'smtp.gmail.com',
            port: 587,
            secure: false,
            auth: {
                user: process.env.SOCIAL_GMAIL_USERNAME,  //gmail id I'm using
                pass: process.env.SOCIAL_GMAIL_PASSWORD,
          }
    },

    google_client_id: process.env.SOCIAL_GOOGLE_CLIENT_ID,
    google_client_secret: process.env.SOCIAL_GOOGLE_CLIENT_SECRET,
    google_call_back_url: process.env.SOCIAL_GOOGLE_CALL_BACK_URL,
    jwt_secret: process.env.SOCIAL_JWT_SECRET,    
    
    morgan:{
            mode: 'combined',
            options: {stream: accessLogStream}
    }        
}

 //module.exports = eval(process.env.SOCIAL_ENVIRONMENT) == undefined ? development: eval(process.env.SOCIAL_ENVIRONMENT);
   module.exports = development;
