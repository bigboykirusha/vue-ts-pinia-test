import { createApp } from "vue";
import { createPinia } from 'pinia';
import { createRouter, createWebHistory } from "vue-router";
import "@assets/styles/main.scss";

import App from "./App.vue";
import Home from "./pages/Home.vue";
import About from "./pages/About.vue";
import More from "./pages/More.vue";

const routes = [
   { path: "/", component: Home },
   { path: "/about", component: About },
   { path: "/more", component: More },
];

const router = createRouter({
   history: createWebHistory(),
   routes,
});

const pinia = createPinia();
const app = createApp(App);

app.use(router).use(pinia).mount("#app");
