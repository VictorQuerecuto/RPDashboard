var { Order, ShippingAddress } = require("../model/appModel.js");

exports.listOrdersbyStatusId = function (req, res) {
  Order.getOrdersbyStatusId(req.params.orderStatusId, function (err, order) {
    if (err) res.send(err);
    res.json(order);
  });
};
exports.createAnOrder = function (req, res) {
  var newOrder = new Order(req.body);

  if (!newOrder.orderDescription) {
    res
      .status(400)
      .send({ error: true, message: "Please provide Order Description" });
  } else {
    Order.createAnOrder(newOrder, function (err, order) {
      if (err) res.send(err);
      res.json(order);
    });
  }
};
exports.listShippingAddress = function (req, res) {
  ShippingAddress.getShippingAddress(function (err, shippingAddress) {
    console.log("controller");
    if (err) res.send(err);
    console.log("res", shippingAddress);
    res.send(shippingAddress);
  });
};
