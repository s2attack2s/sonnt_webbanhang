var express = require("express");
var detail_notifi = express.Router()
const contacts = require("../models/contact.models")

detail_notifi.get("/detail-notification/:id",(req,res)=>{
  
    contacts.findById( req.params.id, function(err,data){
    res.render("admin/detail-notifi",{
      list: data
    });
})
  });

module.exports = detail_notifi