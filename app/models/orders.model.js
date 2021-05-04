const mongoose = require("mongoose");

const Order= mongoose.model(
    'Order',
    new mongoose.Schema({
        orderTotal:Number,
        status:String,
        orderId:String,
        products:[],
        user:{
            type:mongoose.Schema.Types.ObjectId,
            ref:'User'
        },
        createdOn:{
            type:Date,
            default:Date.now
        }
    })
)

module.exports = Order;