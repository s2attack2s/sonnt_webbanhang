// config/passport.js
// load các module
var passport = require('passport');
var jwt = require("jsonwebtoken");
// load  user model
var User = require('../models/user.model');
var LocalStrategy = require('passport-local').Strategy;

// passport session setup

// used to serialize the user for the session
passport.serializeUser(function(user, done){
    done(null, user.id);
})
 // used to deserialize the user
passport.deserializeUser(function(id, done){
    User.findById(id, function(err, user){
        done(err, user);
    })
})
// local sign-up
passport.use('local.signup',new LocalStrategy({
    usernameField:'email',
    passwordField:'password',
   
    passReqToCallback:true
},function(req, email, password, done) {
   
 User.findOne({ 'email': email }, function(err, user) {
        if (err) { return done(err); }
        if (user) {
          return done(null, false, { message : 'Email đã được sử dụng. Đăng nhập bằng ' + user.email+ '?'})
        }
       var newUser= new User();
       newUser.email= email;
       newUser.password=newUser.encryptPassword(password);
       newUser.name= req.body.name;
       newUser.role= "user";
       newUser.lock = 0;
       newUser.save(function(err, result){
         if(err){
           return done(err)
         }
         return done(null, newUser);
       })
      });
    }
  ));
// local sign-in
  passport.use('local.signin',new LocalStrategy({
   usernameField:'email',
   passwordField:'password',
   passReqToCallback:true
},function(req, email, password,done) {
  
User.findOne({ 'email': email }, function(err, user) {
       if (err) { return done(err); }
       if (!user) {
         return done(null, false, { message : 'Tài khoản không tồn tại'})
       }
       if(user.lock == 1){
        return done(null,false,{message:'Tài khoản của bạn đã bị khóa'})
       }
       if(!user.validPassword(password)){
      
           return done(null,false,{message:'Mật khẩu không đúng'})
       }else{
        req.session.loggin = true;
        req.session.role = true;
         return done(null, user );
       }
      
    
     });
   }
 ));
 //local-delete
 passport.use('local.delete',new LocalStrategy({
  usernameField:'email',
  passwordField:'password',
  passReqToCallback:true
},function(req, email, password,done) {
  User.deleteOne( {_id:req.params.id}, function(err,data){
    if(err){
      res.json({"kq":0, "errMsg": err});
    }else{
      res.redirect("../product");
    }
  })

  }
));
//local-update

