// models/user.model.js
// load những thư viện chúng ta cần
var mongoose = require('mongoose');

// định nghĩ cấu trúc user model
var Schema = mongoose.Schema;
var cates = new Schema({
   
    namecate: {type: String, required: false}
   
}); 

module.exports = mongoose.model('cates', cates);
