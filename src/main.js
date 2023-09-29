import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import { createPinia } from 'pinia'
const pinia = createPinia()

// bootstrap
import 'bootstrap/dist/css/bootstrap.min.css'
import 'bootstrap'
import 'bootstrap-icons/font/bootstrap-icons.css'

// VueSweetalert
import VueSweetalert2 from 'vue-sweetalert2';
import 'sweetalert2/dist/sweetalert2.min.css';

//vue-json-excel3
import JsonExcel from 'vue-json-excel3'

const app = createApp(App)
app.component("downloadExcel", JsonExcel)
app.use(router)
app.use(pinia)
app.use(VueSweetalert2)
app.mount('#app')
