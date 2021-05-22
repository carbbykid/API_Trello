const express = require('express')
var passport = require('passport');
const AuthController = require('../app/controllers/AuthController')
const UserController = require('../app/controllers/UserController')
const authenticate = require('../middleware/authenticate')
const router = express.Router()

router.post('/register', AuthController.register)
router.post('/login', AuthController.login)
router.get('/userinfo',authenticate, UserController.getUserInfo )

// Router Login Google
const isLoggedIn = (req, res, next)=>{
  if(req.user){
      next();
  }else{
      res.sendStatus(401);
  }
}
router.get('/google', passport.authenticate('google', { scope: ['profile','email'] }));
router.get('/google/callback', passport.authenticate('google', { failureRedirect: '/failed' }),
  function(req, res) {
    res.redirect('/api/good');
  });
//Router Login Facebook
router.get('/facebook', passport.authenticate('facebook', { scope: ['email'] }));
router.get('/facebook/callback', passport.authenticate('facebook', { failureRedirect: '/failed' }),
  function(req, res) { 
    res.redirect('/api/good');
  });

//Router test
router.get('/',(req, res)=>{
  res.send('You failed to login!')
})
router.get('/logout', (req,res)=>{
  req.session = null,
  req.logOut();
  res.redirect('/api/')
})
router.get('/failed',(req, res)=>{
  res.send('You are failed to log in!')
})
router.get('/good', isLoggedIn, (req, res)=>{
    res.send(`Welcome mr ${req.user.name}!`)
})

module.exports = router