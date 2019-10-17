<template>
  <div id="hello"></div>
</template>

<script>

import mapboxgl from 'mapbox-gl';

export default {
  name: "HelloWorld",
  props: {
    msg: String
  },
  methods: {
    fetchAPI() {
      fetch(`http://webservices.nextbus.com/service/publicJSONFeed?command=routeConfig&a=ttc&r=501`)
        .then(response => {
          if (response.status !== 200) {
            console.log(`we have a problem with status of ${response.status}`);
          }
          response.json().then(data => {
            console.log(data);
          });
        })
        .catch(err => console.log(err));
    }
  },
  mounted(){
    // this.fetchAPI();
  },
    mounted() {
    mapboxgl.accessToken = 'pk.eyJ1IjoidnBoaWxvdCIsImEiOiJjazFncjBlNDUwMGZvM2RuMGwwdzBuMGJ1In0.cAbEufqgwg_lPBQW8d-GWg';
    const map = new mapboxgl.Map({
    container: 'hello',
    style: 'mapbox://styles/mapbox/streets-v9',
    center: [-74.50, 40], // starting position [lng, lat]
zoom: 9 // starting zoom
});
  }
};
</script>

<style>
/* Add "scoped" attribute to limit CSS to this component only */
</style>
