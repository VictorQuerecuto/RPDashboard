module.exports = function (app) {
  var order = require("../controller/appController");
  var shippingAddress = require("../controller/appController");

  // Order List Routes
  app.route("/orders/:orderStatusId").get(order.listOrdersbyStatusId);
  app.route("/orders").post(order.createAnOrder);
  // Shipping Routes
  app.route("/shippingaddress").get(shippingAddress.listShippingAddress);
};
