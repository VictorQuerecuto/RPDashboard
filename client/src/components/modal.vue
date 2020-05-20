<template>
  <div class="overlay">
    <v-flex xs8>
      <v-card>
        <v-alert v-if="submitted" type="success">
          Successfully Submitted Order
        </v-alert>
        <v-row>
          <v-card-title>
            <span>New Order</span>
          </v-card-title>
        </v-row>
        <form>
          <v-text-field
            v-model="form.description"
            :rules="[rules.required]"
            label="Description"
            required
          >
          </v-text-field>
          <v-select
            :items="addresses"
            v-model="form.selectedAddress"
            item-text="address"
            label="Shipping Address"
            item-value="shippingAddressId"
            auto
            required
          ></v-select>
        </form>
        <div class="text-center my-2">
          <v-btn v-on:click="submitForm" text color="primary">Submit </v-btn>
          <v-btn v-on:click="close" text>
            Cancel
          </v-btn>
        </div>
      </v-card>
    </v-flex>
  </div>
</template>

<script>
import OrderDataService from "../services/OrderDataService";

export default {
  name: "shippingAddress-list",
  data() {
    return {
      addresses: [
        {
          shippingAddressId: 1,
          address: "1400 International Pkwy S, Lake Mary, FL, 32746",
        },
        {
          shippingAddressId: 2,
          address: "2700 Westhall Ln, Maitland, FL, 32751",
        },
      ],
      form: {
        description: "",
        selectedAddress: { shippingAddressId: 0, address: "" },
      },
      rules: {
        required: (value) => !!value || "Required.",
      },
      submitted: false,
    };
  },
  methods: {
    submitForm() {
      var data = {
        orderStatusId: 1, //Order Status defaulted to 'Ordered'
        shippedDate: null,
        orderDescription: this.form.description,
        shippingAddressId: this.form.selectedAddress,
      };

      console.log(data);

      OrderDataService.create(data)
        .then((response) => {
          console.log(response.data);
          this.submitted = true;
        })
        .catch((e) => {
          console.log(e);
        });
    },
    close() {
      this.$emit("toggle-modal");
    },
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="postcss" scoped>
.overlay {
  position: fixed;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  background-color: rgba(0, 0, 0, 0.3);
  z-index: 100;
  display: flex;
  align-items: center;
  justify-content: center;
}
</style>
