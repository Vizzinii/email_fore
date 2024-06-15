import { createApp } from 'vue';
import App from './App.vue';
import store from './store';
import router from './router';

const app = createApp(App);

router.beforeEach(async (to, from, next) => {
    if (store.getters.isAuthenticated) {
        try {
            await store.dispatch('fetchUnreadCount');
        } catch (error) {
            console.error('Failed to fetch unread count:', error);
        }
    }
    next();
});

app.use(store);
app.use(router);

app.mount('#app');