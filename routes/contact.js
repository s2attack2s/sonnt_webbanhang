var express = require("express")
var contacts = require("../models/contact.models")
var contact = express.Router()

contact.get("/contact",(req,res)=>{
    var message = req.flash('error');
    res.render("user/contact",{
        message: message,
        hasErrors: message.length > 0,
    })
    
});
contact.post("/add-contact",(req,res)=>{
    if(req.session.loggin){
    var contact = contacts({
name : req.body.name,
email : req.body.email,
address : req.body.address,
title : req.body.title,
note: req.body.note,
ngaygui: Date.now()
    });
    contact.save(function(err){
        if(!err){
          res.render("user/contact",{
              message: "Liên hệ thành công"
          });
        }else{
            console.log(err);
        }
      })

    }else{
        res.render("user/contact",{
            message: "Đăng nhập để gửi câu hỏi"
        });
    }
})
module.exports = contact