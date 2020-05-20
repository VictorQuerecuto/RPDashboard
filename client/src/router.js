import Vue from "vue";
import Router from "vue-router";

Vue.use(Router);

export default new Router({
  mode: "history",
  routes: [
    {
      path: "/",
      alias: "/orders",
      name: "orders",
      component: () => import("./components/OrderList"),
    },
    {
      path: "/",
      alias: "/shippingaddress",
      name: "shippingaddress",
      component: () => import("./components/modal"),
    },
  ],
});
