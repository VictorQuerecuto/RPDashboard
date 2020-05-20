<template>
  <v-container>
    <v-col>
      <v-row>
        <v-tooltip top>
          <template v-slot:activator="{ on }">
            <div v-on="on">
              <v-select
                :items="orderStatus"
                v-model="currentFilter"
                item-text="name"
                label="Filter Order Status"
                item-value="orderStatusId"
                v-on:change="retrieveOrders(currentFilter)"
                dense
                solo
              ></v-select>
            </div>
          </template>
          <span>Filter Status</span>
        </v-tooltip>
        <v-spacer></v-spacer>
        <modal v-if="isVisibility" @toggle-modal="toggleModal"></modal>
        <v-btn @click.prevent="toggleModal">
          Create Order
        </v-btn>
      </v-row>
      <br />
      <v-data-table
        :headers="headers"
        :items="orders"
        item-key="orderId"
        :items-per-page="5"
        show-expand
      >
        <template v-slot:item.createdDate="{ item }">
          <span>{{ convertDateTime(item.createdDate) }}</span>
        </template>
        <template v-slot:top>
          <v-toolbar flat>
            <v-toolbar-title>Orders</v-toolbar-title>
            <v-spacer></v-spacer>
          </v-toolbar>
        </template>
        <template v-slot:expanded-item="{ headers, item }">
          <td>
            <strong>Order Status:</strong>
            {{ convertOrderStatusId(item.orderStatusId) }}
          </td>
          <td>
            <strong>Shipping Address:</strong>
            {{
              item.shippingAddressId
                ? convertShippingAddressId(item.shippingAddressId)
                : "No shipping address specified"
            }}
          </td>
          <td>
            <strong>Shipped On:</strong>
            {{
              item.shippedDate
                ? convertDateTime(item.shippedDate)
                : "Order has not shipped"
            }}
          </td>
          <td>
            <v-btn
              text
              small
              color="primary"
              v-if="item.shippingAddressId"
              v-on:click="
                toggleMap(convertShippingAddressId(item.shippingAddressId))
              "
            >
              Locate
            </v-btn>
          </td>
        </template>
      </v-data-table>
      <locationMap
        :lat="lat"
        :lng="lng"
        v-if="isMapVisible"
        @toggle-map="toggleMap"
      ></locationMap>
    </v-col>
  </v-container>
</template>

<script>
import OrderDataService from "../services/OrderDataService";
import { mapMixin } from "../mapMixin";
import locationMap from "../components/locationMap";
import modal from "../components/modal";

export default {
  components: {
    modal,
    locationMap,
  },
  mixins: [mapMixin],
  name: "orders-list",
  data() {
    return {
      isVisibility: false,
      isMapVisible: false,
      expanded: [],
      singleExpand: false,
      orders: [],
      currentOrder: null,
      currentIndex: -1,
      description: "",
      currentFilter: 1,
      lat: 0,
      lng: 0,
      orderStatus: [
        { orderStatusId: 1, name: "Ordered" },
        { orderStatusId: 2, name: "Processing" },
        { orderStatusId: 3, name: "Shipped" },
        { orderStatusId: 4, name: "Recieved" },
      ],
      headers: [
        {
          text: "Order Number",
          align: "start",
          sortable: false,
          value: "orderId",
        },
        { text: "Description", value: "orderDescription" },
        { text: "Created On", value: "createdDate", valueType: "date" },
        { text: "", value: "data-table-expand" },
      ],
    };
  },
  methods: {
    convertDateTime(dateTime) {
      return dateTime.split("T")[0];
    },
    convertShippingAddressId(id) {
      var address;
      switch (id) {
        case 1:
          address = "1400 International Pkwy S, Lake Mary, FL, 32746";
          break;
        case 2:
          address = "2700 Westhall Ln, Maitland, FL, 32751";
          break;
      }
      return address;
    },
    convertOrderStatusId(id) {
      var orderStatus;
      switch (id) {
        case 1:
          orderStatus = "Ordered";
          break;
        case 2:
          orderStatus = "Processing";
          break;
        case 3:
          orderStatus = "Shipped";
          break;
        case 4:
          orderStatus = "Recieved";
          break;
      }
      return orderStatus;
    },
    toggleModal() {
      this.isVisibility = !this.isVisibility;
    },
    async toggleMap(address) {
      try {
        const response = await this.getLatLng(address);
        const loc = response.data.results[0].geometry.location;
        this.lat = loc.lat;
        this.lng = loc.lng;
        this.isMapVisible = true;
      } catch (ex) {
        console.log(ex);
      }
    },
    retrieveOrders(filter) {
      this.currentFilter = filter;

      OrderDataService.findByOrderStatusId(this.currentFilter)
        .then((response) => {
          this.orders = response.data;
        })
        .catch((e) => {
          console.log(e);
        });
      this.isMapVisible = false;
    },
    refreshList() {
      this.retrieveOrders();
      this.currentOrder = null;
      this.currentIndex = -1;
    },
    setActiveOrder(order, index) {
      this.currentOrder = order;
      this.currentIndex = index;
    },
  },
  mounted() {
    this.retrieveOrders(this.currentFilter);
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h3 {
  margin: 40px 0 0;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
</style>
