<template>
  <div id="map">
      <l-map
      :zoom="zoom"
      :center="center"
      :options="mapOptions"
      style="height:100vh;"
      ref="myMap"
      >
      <l-tile-layer :url="url" :attribution="attribution" />

      <l-feature-group ref="buses">
        <l-polyline v-for="(item, index) in paths.buses" v-bind:key="`item=${index}`"
        :lat-lngs="item.path"
        :color="item.color"
        :weight="1"
        :opacity="0.2">
          <l-popup> {{ item.title }}</l-popup>
        </l-polyline>
      </l-feature-group>
      <l-feature-group ref="streetcars">
        <l-polyline v-for="(item, index) in paths.streetcars" v-bind:key="`item=${index}`"
        :lat-lngs="item.path"
        :color="item.color"
        :weight="isSelected ? 1 : 20"
        :opacity="0.7"
        @click="handlePolylineClick">
                  <l-popup> {{ item.title }}</l-popup>
        </l-polyline>
      </l-feature-group>
      <l-feature-group ref="subways">
        <l-polyline v-for="(item, index) in paths.subways" v-bind:key="`item=${index}`"
        :lat-lngs="item"
        :color="'#fff200'"
        :weight="2">
        </l-polyline>
      </l-feature-group>
    </l-map>
  </div>
</template>

<script>
import { latLng } from "leaflet";
import { LMap, LTileLayer, LPolyline, LFeatureGroup, LPopup } from "vue2-leaflet";
import { log } from 'util';
export default {
  name: "Map",
  props: {
      paths: Object,
  },
  components: {
    LMap,
    LTileLayer,
    LPolyline,
    LFeatureGroup,
    LPopup
  },
  data() {
    return {
      isSelected: true,
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
    handlePolylineClick(event) {
      console.log(event.target );
      // this.isSelected ? this.isSelected = false : this.isSelected = true;
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
/* style overrides for leaflet */

.leaflet-popup-content-wrapper, .leaflet-popup-tip {
    background: #424242;
    color: #ffffff;
}

.leaflet-pane {
  z-index: 0 !important;
}
</style>