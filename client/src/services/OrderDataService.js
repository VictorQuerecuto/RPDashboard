import http from "../http-common";

class OrderDataService {
  findByOrderStatusId(orderStatusId) {
    return http.get(`/orders/${orderStatusId}`);
  }

  create(data) {
    return http.post("/orders", data);
  }
}

export default new OrderDataService();
