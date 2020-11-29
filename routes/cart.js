var express = require("express");
var cart = express.Router();
var GioHang = require("../models/giohang.js");
var Cart = require("../models/Cart.js");
var products = require("../models/products.model.js");
var countJson = function (json) {
  var count = 0;
  for (var id in json) {
    count++;
  }

  return count;
};

cart.get("/shopping-cart", function (req, res) {
  if(req.session.loggin){
    user = req.user;
  }else{
    user = null;
  }
  var giohang = new GioHang(
    req.session.cart ? req.session.cart : { items: {} }
  );
  var data = giohang.convertArray();

  res.render("user/cart", { data: data });
});

cart.get("/add-to-cart/:id", function (req, res) {
  var id = req.params.id;

  var giohang = new GioHang(
    req.session.cart ? req.session.cart : { items: {} }
  );

  products.findById(id).then(function (data) {
    giohang.add(id, data);
    req.session.cart = giohang;
    console.log(giohang);
    res.redirect("/shopping-cart");
  });
});
cart.get("/order", function (req, res) {
  var giohang = new GioHang(
    req.session.cart ? req.session.cart : { items: {} }
  );
  //var data = giohang.convertArray();

  if (req.session.cart) {
    if (countJson(req.session.cart.items) > 0) {
      res.render("user/order", { errors: null });
    } else res.redirect("/");
  } else {
    res.redirect("/");
  }
});

cart.get("/xemhang/:id", (req, res) => {
  var id = req.params.id;
  Cart.findById(id).then(function (data) {
    console.log(data);
    res.render("user/view_order", { cart: data });
  });
});
cart.get("/checkout", (req, res) => {
  if (req.session.loggin) {
    userID = req.user.id;
    Cart.find({ userID }).then(function (data) {
      res.render("user/List_order", { data: data });
    });
  } else {
    res.redirect("/");
  }
});
cart.post("/updateCart", function (req, res) {
  var id = req.body.id;
  var soluong = req.body.soluong;
  var giohang = new GioHang(
    req.session.cart ? req.session.cart : { items: {} }
  );

  giohang.updateCart(id, soluong);
  req.session.cart = giohang;
  res.json({ st: 1 });
});
cart.post("/delCart", function (req, res) {
  var id = req.body.id;
  var giohang = new GioHang(
    req.session.cart ? req.session.cart : { items: {} }
  );

  giohang.delCart(id);
  req.session.cart = giohang;
  res.json({ st: 1 });
});
cart.get("/list_order", (req, res) => {
  if(req.session.loggin){
    user = req.user
    if(user.role == "admin"){
      Cart.find().sort({date: "ascending"}).then(function (data) {
        res.render("admin/list-order", { data: data });
      });
    }else{
      res.redirect("/")
    }
  }else{
    res.redirect("/")
  }
 
});
cart.get("/view/:id", (req, res) => {
  var id = req.params.id;
  Cart.findById(id).then(function (data) {
    console.log(data);
    res.render("admin/view-order", { cart: data });
  });
});
cart.get('/xacnhan/:id', function(req, res, next) {
  var id = req.params.id;
  Cart.findById(id, function(err, data){
    data.st = 1;
    data.save();
    req.flash('success_msg', 'Đã Thêm Thành Công');
    res.render("admin/view-order", { cart: data });
    
  });
});
cart.post("/menu", function (req, res) {
  if (req.session.loggin) {
    user = req.user;

    var giohang = new GioHang(
      req.session.cart ? req.session.cart : { items: {} }
    );
    var data = giohang.convertArray();

    var cart = new Cart({
      userID: user.id,
      name: req.body.name,
      address: req.body.address,
      sdt: req.body.phone,
      msg: req.body.message,
      cart: data,
      st: 0,
      
      date: Date.now()
    });
    console.log(cart);
    cart.save().then(function () {
      req.session.cart = { items: {} };
      res.redirect("/");
    });
  }
});
cart.get('/delete-order/:id', function(req, res) {
	var id = req.params.id;
	Cart.findOneAndRemove({_id: id}, function(err, offer){
		if(err){
console.log(err)
		}else{
		
		req.flash('success_msg', 'Đã Xoa Thành Công');
	   res.redirect('/checkout'); 
	}});
});
cart.get('/xoa/:id', function(req, res) {
	var id = req.params.id;
	Cart.findOneAndRemove({_id: id}, function(err, offer){
		if(err){
console.log(err)
		}else{
		
		req.flash('success_msg', 'Đã Xoa Thành Công');
	   res.redirect('/list_order'); 
	}});
});

module.exports = cart;
