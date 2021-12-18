const mongoose = require('mongoose');

const userSchema = mongoose.Schema({
    firstName: String,
    lastName: String,
    email: String,
    createdDate: {
        type: Date,
        default: Date.now
    }
});

module.exports = mongoose.model('users', userSchema);