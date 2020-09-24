// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import {requestAxios} from '../public/js/request/Axios'
import {ztdLocalStorage} from '../public/js/tool/localStorage'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import { $popBox } from '../public/js/tool/PopBox'


import VueClipboard from 'vue-clipboard2'
 Vue.use( VueClipboard )

Vue.config.productionTip = false
Vue.use(ElementUI);
Vue.prototype.$requestAxios = requestAxios.setAxios;
Vue.prototype.$ztdLocalStorage = ztdLocalStorage;
Vue.prototype.$ztdMessage = $popBox.message;
Vue.prototype.$ztdAlert = $popBox.alert;
Vue.prototype.$alertBox = $popBox.warningBox;
 

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
})