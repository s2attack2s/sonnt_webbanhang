var express = require("express")
var notifi = express.Router()
var contacts = require("../models/contact.models")
notifi.get("/admin/notification",(req,res)=>{
  if(req.session.loggin){
      user = req.user
      if(user.role=="admin"){
        let perPage = 12; // số lượng sản phẩm xuất hiện trên 1 page
        let page = req.params.page || 1; 
      
        contacts
          .find() // find tất cả các data
          .sort({ngaygui: "descending"})
          .skip((perPage * page) - perPage) // Trong page đầu tiên sẽ bỏ qua giá trị là 0
          .limit(perPage)
          .exec((err, data) => {
            contacts.countDocuments((err, count) => { // đếm để tính có bao nhiêu trang
             
               res.render("admin/notification",{
                 list :data, 
                 current: page, // page hiện tại
                 pages: Math.ceil(count / perPage)
               }) // Trả về dữ liệu các sản phẩm theo định dạng như JSON, XML,...
            });
          });
      }else{
        res.redirect("/home");
      }
      
  }else{
    res.redirect("/home");
  }
  
    
});
notifi.get("/delete-contact/:id",(req,res)=>{
    if(req.session.loggin){
      contacts.deleteOne( {_id:req.params.id}, function(err){
        if(err){
          res.redirect("/admin/notification")
        
        }else{
         
          res.redirect("/admin/notification")
    }


    })
  }
    else{
      res.redirect("/home")
    }
 


  })
module.exports = notifi