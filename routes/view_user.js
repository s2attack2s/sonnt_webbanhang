var express = require("express");
var view_user = express.Router();
var userModel = require("../models/user.model.js");

view_user.get("/view_user",(req,res)=>{
    if(req.session.loggin){

    
    userModel.find({role:"user"}).then(function(data){
        res.render("admin/user",{
            user: data
        })
    })
}else{
    res.redirect("/")
}
})
module.exports = view_user