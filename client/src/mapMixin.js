import { GOOGLE_API_KEY } from "./exports";

const axios = require("axios");
const mapURL = "https://maps.googleapis.com/maps/api/geocode/json?address=";

export const mapMixin = {
  methods: {
    getLatLng(address) {
      return axios.get(
        `${mapURL}${encodeURIComponent(address)}&key=${GOOGLE_API_KEY}`
      );
    },
  },
};
