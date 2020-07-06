const express = require('express');
const router = express.Router();
const passport = require('passport');


const usersController = require('../controllers/users_controller');



router.use('/features',require('./features'));



router.get('/profile/:id',passport.checkAuthentication ,usersController.profile);
router.post('/update/:id',passport.checkAuthentication ,usersController.update);



router.get('/sign-up',usersController.signUp);
router.get('/sign-in',usersController.signIn);



router.post('/create',usersController.create);


//use passport as middle ware to authenticate
router.post('/create-session',passport.authenticate(
 'local',
 {failureRedirect: '/users/sign-in'},   
 ), usersController.createSession);



router.get('/sign-out',usersController.destroySession);


router.get('/auth/google',passport.authenticate('google',{scope: ['profile','email']}));
router.get('/auth/google/callback',passport.authenticate('google',{failureRedirect: 'users/sign-in'}),usersController.createSession);



module.exports = router;







//CODE ME KOI DIKKAT NHI HAI..BROWSER KI SSUE HAI BROWSR CSS FILES CACHE KR RHA HAI..HARD REFRESH KRNA..SAHI CHALEGA HARD REFRESH KAISE KRTE H I DON'T REMEMBER..CTRL+SHIFT+R OKAY/TRY KRLO EK BAAR
//YES IT IS WORKINF FINE RIGHT NOW..IT WILL WORK..IF U USE FIREFOX SUCH THINGS DONT HAPPEN..FIREFOX DONOT CHACHES THE FILES OHKAY
//AND WHAT DO I DO FOR LIKES ... DO I ADD POST._ID WITH SPAN ..YEAH..