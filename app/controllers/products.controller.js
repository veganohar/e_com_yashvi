const db = require("../models");
const Product =  db.product;

exports.getAllProducts = (req,res)=>{
Product.find().sort("-createdOn").exec((err,products)=>{
    if(err){
        return res.status(500).send({message:err});
    }
    res.send({
        message:"Products Retrieved successfully",
        data:products
    })
})
}  

exports.getProductById = (req,res)=>{
    Product.findById(req.params.pid,(err,product)=>{
        if(err){
            return res.status(500).send({message:err});
        }
        res.send({
            message:"Product Retrieved successfully",
            data:product
        })  
    })
}

exports.createProduct = (req,res)=>{
    let body = req.body;
    let product  = new Product();
    for(let p in body){
        product[p] = body[p];
    } 
    product.save((err,response)=>{
        if(err){
            return res.status(500).send({message:err});
        }
        res.status(201).send({
            message:"Product Added successfully",
            data:response
        })
    })
}

exports.deleteProduct = (req,res)=>{
    let pid = req.params.pid;
    Product.deleteOne({_id:pid},(err,response)=>{
        if(err){
            return res.status(500).send({message:err});
        }
        res.status(204).send({
            message:"Product Deleted successfully",
            data:response
        })
    }) 
}

exports.updateProduct = (req,res)=>{
    let data = req.body;
    Product.updateOne({_id:data.id},data,(err,response)=>{
        if(err){
            return res.status(500).send({message:err});
        }
        res.status(204).send({
            message:"Product Updated successfully",
            data:response
        })
    })
}