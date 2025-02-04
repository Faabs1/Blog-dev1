const mongoose = require("mongoose");

const Schema = new mongoose.Schema({
    username: { 
        type: String, 
        required: true, 
        unique: true 
    },
    email: { 
        type: String, 
        required: true, 
        unique: true 
    },
    password: { 
        type: String, 
        required: true
     },
    isAdmin: { 
        type: Boolean, 
        default: false 
    },
    isActive: { 
        type: Boolean, 
        default: true 
    },
}, { 
    timestamps: true 
});

const User = mongoose.model('User', Schema);
module.exports = User;
