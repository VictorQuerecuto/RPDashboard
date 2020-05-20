import http from "../http-common";

class ShippingDataService {
  getAll() {
    return http.get("/shippingaddress");
  }
}

export default new ShippingDataService();
