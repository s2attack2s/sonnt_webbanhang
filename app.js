require('dotenv').config()
var createError = require('http-errors');
var express = require('express');
var app = express();
var path = require('path');
var cookieParser = require('cookie-parser');
var session = require('express-session')
var logger = require('morgan');
var ejs = require("ejs");
var LocalStrategy = require("passport-local");
var passport = require('passport');
var flash = require('connect-flash');
var jwt =require("jsonwebtoken");

// link router
var cate = require("./routes/cate.js");
var view_user = require("./routes/view_user.js");
var cart = require("./routes/cart.js");
var detail_notifi = require("./routes/detail-notifi.js");
var notifi = require("./routes/notification.js");
var detail_product = require("./routes/detail-product.js");
var router = require("./routes/users.js")
var product = require('./routes/product.js');
var client = require('./routes/client.js');
var about = require('./routes/about.js');
var contact = require('./routes/contact.js');

//Link models
var products = require("./models/products.model");

// kết nối database
var config = require('./config/database.js');
var mongoose = require('mongoose');

mongoose.connect(config.url,{ useNewUrlParser: true , useUnifiedTopology: true });

require('./config/passport'); //vượt qua passport để config trang đăng nhâp/đăng ký
app.use(session({
  secret: 'adsa897adsa98bs',
  resave: false,
  saveUninitialized: false,
}))
app.use(flash());
app.use(passport.initialize())
app.use(passport.session());

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');


app.get('/', function(req,res){
  if(!req.session.loggin){
   user =null;
   let perPage = 12; // số lượng sản phẩm xuất hiện trên 1 page
   let page = req.params.page || 1;

   products
     .find() // find tất cả các data
     .sort({ date: "descending" })
     .skip(perPage * page - perPage) // Trong page đầu tiên sẽ bỏ qua giá trị là 0
     .limit(perPage)
     .exec((err, data) => {
       products.countDocuments((err, count) => {
         // đếm để tính có bao nhiêu trang
         if (err) return next(err);
         res.render("user/index", {
           danhsach: data,
           
           current: page, // page hiện tại
           pages: Math.ceil(count / perPage),
         }); // Trả về dữ liệu các sản phẩm theo định dạng như JSON, XML,...
       });
     });
}else{
  user =req.user;
  let perPage = 12; // số lượng sản phẩm xuất hiện trên 1 page
  let page = req.params.page || 1;

  products
    .find() // find tất cả các data
    .sort({ date: "descending" })
    .skip(perPage * page - perPage) // Trong page đầu tiên sẽ bỏ qua giá trị là 0
    .limit(perPage)
    .exec((err, data) => {
      products.countDocuments((err, count) => {
        // đếm để tính có bao nhiêu trang
        if (err) return next(err);
        res.render("user/index", {
          danhsach: data,
       
          current: page, // page hiện tại
          pages: Math.ceil(count / perPage),
        }); // Trả về dữ liệu các sản phẩm theo định dạng như JSON, XML,...
      });
    });
}
})

// app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

//get router
app.use("/", detail_notifi);
app.use("/", notifi);
app.use("/", router);
app.use("/", contact);
app.use("/", about);
app.use("/", client);
app.use("/", cart);
app.use("/", view_user);
app.use("/", product);
app.use("/", cate);
app.use("/", detail_product);
// catch 404 and forward to error handler

app.listen(process.env.PORT || 4000)

