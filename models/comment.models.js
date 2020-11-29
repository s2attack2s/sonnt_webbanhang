// models/user.model.js
// load những thư viện chúng ta cần
var mongoose = require('mongoose');

// định nghĩ cấu trúc user model
var Schema = mongoose.Schema;
var comments = new Schema({
    uname: {type: String, required: true},
    idsp:{type: String, required: true},
    note: {type: String, required: true},
    ngaygui: {type: Date, required:true}
});
module.exports = mongoose.model('comments', comments);