<template>
  <GmapMap :center="{ lat, lng }" :zoom="15" style="height: 300px">
    <GmapMarker
      :position="google && new google.maps.LatLng(lat, lng)"
      :clickable="true"
      :draggable="true"
    />
  </GmapMap>
</template>

<script>
import { gmapApi } from "vue2-google-maps";

export default {
  name: "Map",
  props: {
    lat: Number,
    lng: Number,
  },
  computed: {
    google: gmapApi,
  },
};
</script>

<style></style>
