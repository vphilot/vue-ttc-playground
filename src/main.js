import Vue from 'vue';
import App from './App.vue';
import { Loading } from 'buefy';
import L from 'leaflet'
import './assets/styles/leaflet.css'
import 'buefy/dist/buefy.min.css'

Vue.use(Loading);

delete L.Icon.Default.prototype._getIconUrl

L.Icon.Default.mergeOptions({
  iconRetinaUrl: require('./assets/styles/images/marker-icon-2x.png'),
  iconUrl: require('./assets/styles/images/marker-icon.png'),
  shadowUrl: require('./assets/styles/images/marker-shadow.png')
})

Vue.config.productionTip = false

new Vue({
  render: h => h(App),
}).$mount('#app')

