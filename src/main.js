// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import '@/assets/styles/main.scss';
import vSelect from 'vue-select';
import VeeValidate from 'vee-validate';
import Loading from '@/components/loading';

import Vue from 'vue';
import App from './App';

Vue.config.productionTip = false;
Vue.use(VeeValidate, {
  locale: 'tr',
});

Vue.component('v-select', vSelect);
Vue.component('Loading', Loading);

/* eslint-disable no-new */
new Vue({
  el: '#app',
  components: { App },
  template: '<App/>',
});
