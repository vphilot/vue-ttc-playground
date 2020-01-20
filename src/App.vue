<template>
  <div id="app">
    <b-loading :is-full-page="true" :active.sync="isLoading"></b-loading>
    <div class="map-legend">
      <h2 class="title is-4 has-text-white">Legend:</h2 >
      <div class="map-legend-item">
        <div class="map-legend-dot" v-bind:style="{ backgroundColor: '#fff200' }"></div>
        <p class="map-legend-copy">Subway</p>
      </div>
      <div class="map-legend-item">
        <div class="map-legend-dot" v-bind:style="{ backgroundColor: this.staticPaths.streetcars[0].color }"></div>
        <p class="map-legend-copy">Streetcars</p>
      </div>
      <div class="map-legend-item">
        <div class="map-legend-dot" v-bind:style="{ backgroundColor: this.staticPaths.buses[0].color }"></div>
        <p class="map-legend-copy">Buses</p>
      </div>
    </div>
    <Map :paths="reactivePaths"></Map>
  </div>
</template>

<script>
import Map from "./components/Map";

export default {
  name: "app",
  components: {
    Map
  },
  data() {
    return {
      staticPaths: {
        buses: [],
        streetcars: [],
        //prettier-ignore
        subways: [
          [[43.78076,-79.41622],[43.76861,-79.41329],[43.76117,-79.4114],[43.74443,-79.40591],[43.72483,-79.40213],[43.70833,-79.39836],[43.70635,-79.39922],[43.69778,-79.39767],[43.68798,-79.39338],[43.68227,-79.39098],[43.67693,-79.38892],[43.6706,-79.38583],[43.66539,-79.38359],[43.66116,-79.38257],[43.65632,-79.38068],[43.65247,-79.37913],[43.64936,-79.37776],[43.64725,-79.37725],[43.64635,-79.37776],[43.64576,-79.38034],[43.64567,-79.38257],[43.64598,-79.38356],[43.64762,-79.3848],[43.65098,-79.38652],[43.6547,-79.38823],[43.65954,-79.39029],[43.66712,-79.39338],[43.66812,-79.39424],[43.66861,-79.39544],[43.66824,-79.39853],[43.66725,-79.40231],[43.66799,-79.4042],[43.67023,-79.40522],[43.67482,-79.40746],[43.68202,-79.41037],[43.68314,-79.41175],[43.68388,-79.41467],[43.68686,-79.41535],[43.68866,-79.41707],[43.69071,-79.42137],[43.69096,-79.42823],[43.69356,-79.43115],[43.69543,-79.43441],[43.69865,-79.4363],[43.70945,-79.44197],[43.7159,-79.4447],[43.72434,-79.44779],[43.73402,-79.45037],[43.73686,-79.45175],[43.74406,-79.46016],[43.74604,-79.46187],[43.74927,-79.46291],[43.7523,-79.4796],[43.7637,-79.4912],[43.7740,-79.4997],[43.7755,-79.5086],[43.7759,-79.5096],[43.7826,-79.5232],[43.7939,-79.5271]],
          [[43.63769,-79.53689],[43.64477,-79.52831],[43.64576,-79.52436],[43.64862,-79.512],[43.6506,-79.50239],[43.65085,-79.49929],[43.65023,-79.49552],[43.64936,-79.49226],[43.64862,-79.48951],[43.64886,-79.48677],[43.65011,-79.48505],[43.65197,-79.47663],[43.65446,-79.46582],[43.65557,-79.4605],[43.65706,-79.45278],[43.65905,-79.44316],[43.66066,-79.43595],[43.66265,-79.42617],[43.66427,-79.41879],[43.66588,-79.41158],[43.66762,-79.40402],[43.66836,-79.3987],[43.67023,-79.39029],[43.6706,-79.38583],[43.67246,-79.3769],[43.67221,-79.37381],[43.67258,-79.3721],[43.6742,-79.36866],[43.67557,-79.36248],[43.67693,-79.35836],[43.67855,-79.35115],[43.67979,-79.34497],[43.68115,-79.33759],[43.68289,-79.32987],[43.68438,-79.32317],[43.68649,-79.31287],[43.68922,-79.30223],[43.69456,-79.28987],[43.69766,-79.28369],[43.69977,-79.28198],[43.70325,-79.28077],[43.71255,-79.27854],[43.72186,-79.27562],[43.73104,-79.26743],[43.73215,-79.2655]],
          [[43.73228,-79.2655],[43.73364,-79.26361],[43.75026,-79.27082],[43.76712,-79.27734],[43.76811,-79.27734],[43.76898,-79.27631],[43.7701,-79.27236],[43.77245,-79.26189],[43.77381,-79.25794],[43.77493,-79.25468],[43.77543,-79.25159]],
          [[43.77505,-79.3472],[43.77059,-79.36763],[43.76861,-79.37707],[43.7665,-79.38755],[43.76117,-79.4114]]
          ]
      },
      reactivePaths: {
        buses: [],
        streetcars: [],
        subways: []
      },

      routeList: [],
      isLoading: true
    };
  },
  methods: {
    drawRoutes(routeList) {
      this.routeList.map((route, index, arr) => {
        this.fetchRouteFromAPI(route);
        if (arr.length - 1 === index) {
          //after everything's fetched, push items into reactive path
          this.isLoading = false;
          this.reactivePaths = this.staticPaths;
        }
      });
    },
    fetchRouteFromAPI(args) {
      fetch(
        `http://webservices.nextbus.com/service/publicJSONFeed?command=routeConfig&a=ttc&r=${args}`
      )
        .then(response => {
          if (response.status !== 200) {
            console.log(`we have a problem with status of ${response.status}`);
          } else {
            response.json().then(data => {
              if (data.route) {
                // let singleRoute = [];
                let singleRoute = {
                  tag: Number,
                  title: String,
                  color: String,
                  path: []
                };
                //data.route.path[0].point[0].lon;
                //data.route.tag
                //data.route.title
                singleRoute.tag = data.route.tag;
                singleRoute.title = data.route.title;
                data.route.path.map(path =>
                  singleRoute.path.push([path.point])
                );
                //pushing every value into this non reactive data
                //only push into reactive data after the last item (see drawRoutes)
                if (args >= 500 && args <= 600) {
                  singleRoute.color = "#ff0030";
                  this.staticPaths.streetcars.push(singleRoute);
                } else {
                  singleRoute.color = "#01ffea";
                  this.staticPaths.buses.push(singleRoute);
                }
              } else {
                this.staticPaths.buses.push([0, 0]);
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
          response
            .json()
            .then(data => {
              data.route.map(r => this.routeList.push(r.tag));
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
  mounted() {
    this.populateRoutesList();
  }
};
</script>

<style>
#app {
  position: relative;
}

.map-legend {
  background-color: #000000;
  color: #ffffff;
  position: absolute;
  bottom: 0;
  left: 0;
  margin: 10px;
  z-index: 20;
  display: block;
  padding: 20px;
}

.map-legend-item {
  position: relative;
}

.map-legend-dot {
  width: 15px;
  height: 15px;
  position: absolute;
  left: 0;
  top: 0;
  transform: translate(0%, 25%);
  border-radius: 50%;
}

.map-legend-copy {
  margin-left: 25px;
}
</style>
