// models/user.model.js
// load những thư viện chúng ta cần
var mongoose = require('mongoose');

// định nghĩ cấu trúc user model
var Schema = mongoose.Schema;
var contacts = new Schema({
    name: {type: String, required: true},
    email: {type: String, required: true},
    address: {type: String, required: true},   
    title: {type: String, required: true},
    note: {type: String, required: true},
    ngaygui: {type: Date, required:true}
});
module.exports = mongoose.model('contacts', contacts);