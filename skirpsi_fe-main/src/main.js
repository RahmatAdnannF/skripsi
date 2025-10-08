import { createApp } from 'vue';
import App from './App.vue';
import router from './router';
import axiosInstance from './plugins/axios';
import { createPinia } from 'pinia';
import vuetify from './plugins/vuetify';
import 'vue3-toastify/dist/index.css';
import { toast } from 'vue3-toastify';

const pinia = createPinia();
const app = createApp(App);

app.config.globalProperties.$axios = axiosInstance;

// app.config.errorHandler = (err) => {
//     console.error(err);
//     router.push({ name: '500' });
// };

app.config.globalProperties.$toast = toast;


app.use(router);
app.use(vuetify);
app.use(pinia);

app.mount('#app');
