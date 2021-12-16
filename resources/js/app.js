import router from "./router";

require('./bootstrap');

import {createApp} from "vue";

import App from './App'
import components from './components/UI';
import directives from "./directives";
import 'materialize-css/dist/js/materialize.min'
import store from "./store";
import {Toaster} from "@meforma/vue-toaster";

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
    .mount('#app')






