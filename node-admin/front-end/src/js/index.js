import "minireset.css";
import axios from "axios";
import ElementUI from "element-ui";
import Vue from "vue";
import '../../theme-default/index.css'
import Index from "../renders/index.vue";
import router from "../routes/router";
import store from "../state/vuex-store";
import "../assets/css/admin.scss";
import func from "../public/func";
import ajax from "../public/ajax"
import schoolInfo from '../public/schoolInfo'
import api from "../api/api";

Vue.use(ElementUI);
Vue.prototype.$http = axios;
Vue.prototype.api = api;
Vue.prototype.ajax = ajax;
Vue.prototype.func = func;
Vue.prototype.schoolInfo = schoolInfo

let vm = new Vue({
    el: '#app',
    router,
    store,
    render: h => h(Index),
});
