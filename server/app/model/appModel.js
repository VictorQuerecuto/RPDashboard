var sql = require("../config/db.js");

//Order object constructor
var Order = function (order) {
  this.orderStatusId = order.orderStatusId;
  this.orderDescription = order.orderDescription;
  this.createdDate = new Date();
  this.shippedDate; // Needs to be updated
  this.shippingAddressId = order.shippingAddressId;
};
//Shipping object constructor
var ShippingAddress = function (shippingAddress) {
  this.shippingAddressId = shippingAddress.shippingAddressId;
  this.address = shippingAddress.address;
  this.city = shippingAddress.city;
  this.state = shippingAddress.state;
  this.zip = shippingAddress.zip;
};
Order.getOrdersbyStatusId = function (orderStatusId, result) {
  sql.query(
    "SELECT * FROM Orders WHERE orderStatusId = ?",
    orderStatusId,
    function (err, res) {
      if (err) {
        console.log("error: ", err);
        result(err, null);
      } else {
        result(null, res);
      }
    }
  );
};
Order.createAnOrder = function (newOrder, result) {
  sql.query("INSERT INTO Orders SET ?", newOrder, function (err, res) {
    if (err) {
      console.log("error: ", err);
      result(err, null);
    } else {
      console.log(res.insertId);
      result(null, res.insertId);
    }
  });
};
ShippingAddress.getShippingAddress = function (result) {
  sql.query("SELECT * FROM ShippingAddress", function (err, res) {
    if (err) {
      console.log("error: ", err);
      result(null, err);
    } else {
      console.log("shipping address: ", res);
      result(null, res);
    }
  });
};

module.exports = {
  Order: Order,
  ShippingAddress: ShippingAddress,
};
