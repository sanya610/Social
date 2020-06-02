const queue = require('../config/kue');

const reset_passwordMailer = require('../mailers/reset_password_mailer');

queue.process('emails1',function(job,done){

    console.log('email worker is processing the job',job.data);
    reset_passwordMailer.resetpassword(job.data);
    done();
});

