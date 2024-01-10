import {createApp} from 'vue'
import './style.css'
import App from './App.vue'
import { router } from '../routes'
import { createPinia } from "pinia";
// Vuetify
import 'vuetify/styles'
import { createVuetify } from 'vuetify'
import * as components from 'vuetify/components'
import * as directives from 'vuetify/directives'

// Axios
import axios from 'axios'
import VueAxios from 'vue-axios'

const vuetify = createVuetify({
    components,
    directives,
})
const pinia = createPinia()
const app = createApp(App).use(router).use(pinia).use(vuetify)
app.use(VueAxios, axios)
app.provide('axios', app.config.globalProperties.axios)
app.mount('#app')
