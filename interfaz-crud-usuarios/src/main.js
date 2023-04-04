import { createApp } from 'vue'
import { createPinia } from 'pinia'

import App from './App.vue'
import router from './router'

import './assets/main.css'

//Iconos
import '@mdi/font/css/materialdesignicons.css'


//Vuetify
import { createVuetify } from 'vuetify';
import * as components from 'vuetify/components';
import * as directives from 'vuetify/directives';

//vueSweetAlert2
import VueSweetalert2 from 'vue-sweetalert2';
import 'sweetalert2/dist/sweetalert2.min.css';

const vuetify = createVuetify({
  components,
  directives,
});

const app = createApp(App)
app.use(vuetify)
app.use(createPinia())
app.use(router)
app.use(VueSweetalert2);

app.mount('#app')
