var express = require("express")
var about = express.Router()

about.get("/about",checklogin,(req,res)=>{
  
    res.render("user/about")
    
});
function checklogin(req, res){
   if(req.session.login){
       user = req.user
       res.render("user/about")
   }else{
       user == null
       res.render("user/about")
   }
}
module.exports = about