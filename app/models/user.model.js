const mongoose = require("mongoose");

const User= mongoose.model(
    'User',
    new mongoose.Schema({
        name:String,
        username:String,
        password:String,
        createdOn:{
            type:Date,
            default:Date.now
        }
    })
)

module.exports = User;