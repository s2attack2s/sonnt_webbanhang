var express = require("express")
var contacts = require("../models/contact.models")
const userModel = require("../models/user.model")
var client = express.Router()

client.get("/client",(req,res)=>{
    if(req.session.loggin){
      res.render('client', {   
        user : req.user   
    })
   
    }else{
      var message = req.flash('error');
      
     res.render("login",{
      message: message,
      hasErrors: message.length > 0,
     })
    }
})

  client.get("/admin/clientadmin",(req,res)=>{
    if(req.session.loggin){
      user = req.user
      if(user.role == "admin"){

        contacts
        .find().sort({ngaygui:"descending"}).exec(function(err,data){
          if(err){
            res.json({"kq":0, "errMsg":err});
          }else{
            res.render("admin/index-admin",{ danhsach:data });
          }
        })
       
      }else{
        res.render("client")
      }
    
  }else{
    res.render("login")
  }
  })
module.exports = client