const mongoose = require("mongoose");

const Cart= mongoose.model(
    'Cart',
    new mongoose.Schema({
        qty:String,
        // user:{
        //     type:mongoose.Schema.Types.ObjectId,
        //     ref:'User'
        // },
        product:{
            type:mongoose.Schema.Types.ObjectId,
            ref:'Product'
        },
        createdOn:{
            type:Date,
            default:Date.now
        }
    })
)

module.exports = Cart;