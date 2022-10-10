import "bootstrap/dist/css/bootstrap.min.css"
import "bootstrap"
import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'

store.dispatch('concerts/load').then(() => {
	createApp(App)
		.use(store)
		.use(router)
		.mount('#app');
});

