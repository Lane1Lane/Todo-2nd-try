var mongoose = require('mongoose');

var User = mongoose.model('User',{
    name: {
        type: String,
        required: true,
        minlength: 1,
        trim: true,
        default: "noname"
    },
    email: {
        type: String,
        required: true,
        minlength: 1,
        trim: true,
        default: "null"
    }
});

module.exports = {User};