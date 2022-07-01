import { createApp } from 'vue';
import axios from 'axios';
import VueAxios from 'vue-axios';
import VueLoading from 'vue-loading-overlay';
import 'vue-loading-overlay/dist/vue-loading.css';
import 'bootstrap-icons/font/bootstrap-icons.css';

import App from './App.vue';
import router from './router';

const app = createApp(App);
app.component('VueLoading', VueLoading);
app.use(VueAxios, axios);
app.use(router);
app.mount('#app');
