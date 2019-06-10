import Vue from 'vue'
import App from './App.vue'
import VueAwesomeSwiper from 'vue-awesome-swiper'

import Card from './components/Card'
Vue.component('m-card', Card);

import ListCard from './components/ListCard'
Vue.component('m-list-card', ListCard);

Vue.config.productionTip = false
Vue.use(VueAwesomeSwiper);
new Vue({
  router,
  render: function (h) { return h(App) }
}).$mount('#app')

import router from './router'
import 'swiper/dist/css/swiper.css'
import './scss/styles.scss';
import './assets/iconfont/iconfont.css'




