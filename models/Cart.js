var mongoose = require('mongoose');
var Schema = mongoose.Schema;
mongoose.Promise = global.Promise;

var Cart = new Schema({
  userID : {type: String, required: false},
  name 		:  {type: String, required: false},
  address 	: {type: String, required: false},
  sdt 		: {type: String, required: false},
  msg 		: {type: String, required: false},
  cart 		: {type: Object, required: false},
  st 		: {type: Number, required: false},
  status 		:  {type: String, required: false, default:"Đang chờ xử lý"},
  date : {type: Date, required: false},

},{collection : 'cart'});

module.exports = mongoose.model('Cart', Cart);