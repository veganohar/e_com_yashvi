const db = require("../models");
const Cart =  db.cart;


checkForCartItem = (req,res,next)=>{
    let  pid = req.params.pid;
   
    Cart.countDocuments({product:pid},(err,count)=>{
        if(err){
            return res.status(500).send({message:err});
        }
        if(count>0){
            return res.status(400).send({message:"Item is already in cart"})
        }
        next();
    })
}

const cartMiddleware = {
    checkForCartItem
}

module.exports = cartMiddleware;