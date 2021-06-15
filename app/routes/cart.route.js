const controller = require("../controllers/cart.controller");
const {cartMiddleware} = require("../middlewares");
module.exports = function(app){
    app.use(function(req, res, next) {
        res.header(
          "Access-Control-Allow-Headers","x-access-token, Origin, Content-Type, Accept"
        );
        next();
      });
    app.post('/api/cart/addItemToCart/:pid',[cartMiddleware.checkForCartItem],controller.addItemToCart);
    app.post('/api/cart/getCartItems',controller.getCartItems);
}
