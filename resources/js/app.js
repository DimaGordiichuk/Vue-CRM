import router from "./router";

require('./bootstrap');

import {createApp} from "vue";

import App from './App'
import components from './components/UI';
import directives from "./directives";
import 'materialize-css/dist/js/materialize.min'
import 'vue-select/dist/vue-select.css'
import store from "./store";
import {Toaster} from "@meforma/vue-toaster";
import VueGeolocation from "vue3-geolocation/src";
import VueGoogleMaps from '@fawmi/vue-google-maps';
import useAuth from './composables/auth'
import axios from 'axios'

axios.defaults.withCredentials = true;

const { attempt } = useAuth()

attempt().then(() => {
    const app = createApp(App);
    components.forEach(component => {
        app.component(component.name, component)
    })

    directives.forEach(directive => {
        app.directive(directive.name, directive)
    })

    app
        .use(router)
        .use(store)
        .use(Toaster)
        .use(VueGeolocation)
        .use(VueGoogleMaps, {
            load: {
                apiKey: 'AIzaSyC4dy0jCnGR93UaZXb1K0IYrUrC37KgrIY',
            },
        })
        .mount('#app')
})








