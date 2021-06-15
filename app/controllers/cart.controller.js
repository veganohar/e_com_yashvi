const db = require("../models");
const Cart =  db.cart;

exports.addItemToCart = (req,res)=>{
    let cart = new Cart();
    cart.qty = 1;
    cart.product = req.params.pid;
    cart.save((err,response)=>{
        if(err){
            return res.status(500).send({message:err});
        }
        res.status(201).send({
            data:response,
            message:"Item added to Cart successfully"
        })
    })
}

exports.getCartItems = (req,res)=>{
    Cart.find((err,response)=>{
        if(err){
            return res.status(500).send({message:err});
        }
        res.send({
            data:response
        })
    })
}