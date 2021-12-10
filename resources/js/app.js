require('./bootstrap');

import {createApp} from "vue";

import App from './App'

import 'materialize-css/dist/js/materialize.min'


const app = createApp(App);

  app
      .mount('#app')




