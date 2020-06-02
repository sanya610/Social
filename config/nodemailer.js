const nodemailer = require("nodemailer");
const ejs = require('ejs');
const path = require('path');


let transporter = nodemailer.createTransport({
    service: 'gmail',
    host: 'smtp.gmail.com',
    port: 587,
    secure: false,
    auth: {
        user: 'sanya101715139@gmail.com',  //gmail id I'm using
        pass: '3destiny'
    }
});


let renderTemplate = (data, relativePath) => {
    console.log("tmplate for comment ",data);
    let mailHTML ;
    ejs.renderFile(
        path.join(__dirname,'../views/mailers',relativePath),
        data,
        function(err,template)
        {
         if(err)
         {
          console.log('Error in rendering template',err);
          return;   
         }
         
         mailHTML = template;
        }
    )

  return mailHTML;
}



module.exports = {
    transporter : transporter,
    renderTemplate : renderTemplate
}

//try now