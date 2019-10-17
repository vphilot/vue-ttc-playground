<template>
  <div>
      <l-map
      :zoom="zoom"
      :center="center"
      :options="mapOptions"
      style="height:100vh;"
      ref="myMap"
      >
      <l-tile-layer :url="url" :attribution="attribution" />

      <l-feature-group ref="paths-buses">
        <l-polyline v-for="(item, index) in paths.buses" v-bind:key="`item=${index}`"
        :lat-lngs="item"
        :color="'#01ffea'"
        :weight="1"
        :opacity="0.2">
        </l-polyline>
      </l-feature-group>
      <l-feature-group ref="paths-streetcars">
        <l-polyline v-for="(item, index) in paths.streetcars" v-bind:key="`item=${index}`"
        :lat-lngs="item"
        :color="'#ff0030'"
        :weight="1">
        </l-polyline>
      </l-feature-group>
    </l-map>
    
  </div>
</template>

<script>
import { latLng } from "leaflet";
import { LMap, LTileLayer, LMarker, LPopup, LTooltip, LPolyline, LFeatureGroup } from "vue2-leaflet";
export default {
  name: "Map",
  props: {
      color: String,
      coords: Array,
      paths: Object
  },
  components: {
    LMap,
    LTileLayer,
    LMarker,
    LPopup,
    LTooltip,
    LPolyline,
    LFeatureGroup,
  },
  data() {
    return {
      zoom: 12,
      center: latLng(43.6999630, -79.3872070),
      url: "https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png",
      attribution:
        '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>',
      mapOptions: {
        zoomSnap: 0.5
      }
    };
  },
  methods: {
    getRandomColor(){
        let c = "000000".replace(/0/g,function(){return (~~(Math.random()*16)).toString(16);})
        // console.log(`#${c}`)
        return `#${c}`;
    },
    logNumber(num) {
      console.log(`${num} is ready`);
    }
  },
  mounted(){
     this.$nextTick(() => {
        this.$refs.myMap.mapObject.preferCanvas = true;
      })
  }
};
</script>

<style>
</style>