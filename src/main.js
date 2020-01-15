import Vue from "vue";
import App from "./App.vue";
import VueRouter from "vue-router";
import mainboard from "./mainboard.vue";
import Login from "./login.vue";
import Content from "./contents.vue";
import BootstrapVue from "bootstrap-vue";
import "bootstrap/dist/css/bootstrap.css";
import "bootstrap-vue/dist/bootstrap-vue.css";
import axios from "axios";
import moment from "moment";
import VueMomentJS from "vue-momentjs";

Vue.use(VueRouter);
Vue.use(BootstrapVue);
Vue.use(VueMomentJS, moment);

Vue.prototype.$http = axios;

var routes = [
  { path: "/mainboard", component: mainboard },
  { path: "/", component: Login },
  {
    path: "/mainboard/content",
    component: Content,
    name: "contents",
    props: true
  }
];

var router = new VueRouter({
  mode: "history",
  routes
});

new Vue({
  render: h => h(App),
  router
}).$mount("#app");
