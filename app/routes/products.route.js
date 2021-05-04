const controller = require("../controllers/products.controller");
module.exports = function(app){
    app.get('/api/products/getAllProducts',controller.getAllProducts);
    app.post('/api/products/createProduct',controller.createProduct);
    app.put('/api/products/updateProduct',controller.updateProduct);
    app.delete('/api/products/deleteProduct/:pid',controller.deleteProduct);
}
