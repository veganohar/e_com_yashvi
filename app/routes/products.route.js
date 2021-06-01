const controller = require("../controllers/products.controller");
module.exports = function(app){
    app.use(function(req, res, next) {
        res.header(
          "Access-Control-Allow-Headers","x-access-token, Origin, Content-Type, Accept"
        );
        // res.append('Access-Control-Allow-Origin', '*');
        // res.append("Access-Control-Allow-Headers","x-access-token, Origin, Content-Type, Accept");
        // res.append('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
        next();
      });
    app.get('/api/products/getAllProducts',controller.getAllProducts);
    app.get('/api/products/getProductById/:pid',controller.getProductById);
    app.post('/api/products/createProduct',controller.createProduct);
    app.put('/api/products/updateProduct',controller.updateProduct);
    app.delete('/api/products/deleteProduct/:pid',controller.deleteProduct);
}
