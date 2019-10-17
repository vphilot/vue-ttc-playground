<template>
  <div id="app">
    <Loading v-if="isLoading"></Loading>
    <Map
    :paths="reactivePaths"
    >
    </Map>
  </div>
</template>

<script>
import Map from './components/Map';
import Loading from './components/Loading'

export default {
  name: "app",
  components: { 
    Map,
    Loading
  },
  data() {
    return {
      staticPaths: {
        buses: [],
        streetcars: []
      },
      reactivePaths: {
        buses: [],
        streetcars: []
      },
      routeList: [],
      isLoading: true
    }
  },
  methods: {
    drawRoutes(routeList) {
    this.routeList.map((route, index, arr) => {
      this.fetchRouteFromAPI(route);
      if (arr.length -1 === index) {
        //after everything's fetched, push items into reactive path
        this.isLoading = false;
        this.reactivePaths = this.staticPaths;
      }
    })
    },
    fetchRouteFromAPI(args){
      fetch(`http://webservices.nextbus.com/service/publicJSONFeed?command=routeConfig&a=ttc&r=${args}`)
      .then (response => {
        if (response.status !== 200) {
          console.log(`we have a problem with status of ${response.status}`);
        } else {
        response.json().then(data => {
          if(data.route) {
            let singleRoute = [];
            //data.route.path[0].point[0].lon;
            data.route.path.map(path => singleRoute.push([path.point]));
              //pushing every value into this non reactive data
              //only push into reactive data after the last item (see drawRoutes)
              if(args >= 500 && args <= 600){
                this.staticPaths.streetcars.push(singleRoute);
              } else {
                this.staticPaths.buses.push(singleRoute);
              }
          } else {
              this.staticPaths.buses.push([0,0]);
          }
        });
        }
      })
      .catch(err => console.log(err));
    },
    populateRoutesList() {
      fetch(
        `http://webservices.nextbus.com/service/publicJSONFeed?command=routeList&a=ttc`
      )
        .then(response => {
          if (response.status !== 200) {
            console.log(`we have a problem with status of ${response.status}`);
          }
          response.json().then(data => {
            data.route.map( r => {
              this.routeList.push(r.tag)
            });
          })
          .then(response => this.drawRoutes(this.routeList));
        })
        .catch(err => console.log(err));
    }
    // fetchAPI() {
    //   fetch(
    //     `http://webservices.nextbus.com/service/publicJSONFeed?command=routeConfig&a=ttc&r=506`
    //   )
    //     .then(response => {
    //       if (response.status !== 200) {
    //         console.log(`we have a problem with status of ${response.status}`);
    //       }
    //       response.json().then(data => {
    //         data.route.path.map( p => {
    //           this.testPath.push(p.point)
    //         });
    //         console.log(this.coords);
    //       });
    //     })
    //     .catch(err => console.log(err));
    // }
  },
  mounted(){
    this.populateRoutesList();
  }
}
</script>

<style>
</style>
