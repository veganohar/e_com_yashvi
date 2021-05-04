const mongoose = require("mongoose");

const Product= mongoose.model(
    'Product',
    new mongoose.Schema({
        name:String,
        mrp:Number,
        ram:Number,
        storage:Number,
        color:String,
        discuont:Number,
        createdOn:{
            type:Date,
            default:Date.now
        },
        isActive:{
            type:Boolean,
            default:true
        }
    })
)

module.exports = Product;