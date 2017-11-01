import VModal from 'vue-js-modal';
import Vue from 'vue';
import App from './App.vue';


export default function initApp() {
  Vue.use(VModal);
  new Vue({ el: '#control-panel', render: h => h(App) });
};