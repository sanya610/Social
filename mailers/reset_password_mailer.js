const nodemailer = require('../config/nodemailer');
console.log('sanya');
// this is another way of exporting a method
exports.resetpassword = (change) => {
    console.log('inside reset password mailer', change);  

    let htmlString = nodemailer.renderTemplate({change: change} ,'/resetPassword/new_password.ejs');
    
    nodemailer.transporter.sendMail({
        from: 'sanya101715139@gmail.com',
        to: change.user.email,
        subject: "Password has to be changed !",
        html : htmlString
    },(err, info) => {
       
       if(err)
       {
         console.log('Error in sending mail',err);
         return;  
       }
     
       console.log('Message sent',info);
       return;
    });
}