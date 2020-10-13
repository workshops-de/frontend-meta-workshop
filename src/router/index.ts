import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router';
import Home from '../views/Home.vue';

const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    name: 'Home',
    alias: '/home',
    component: Home,
  },
  {
    path: '/notes',
    name: 'Notes',
    component: () =>
      import(/* webpackChunkName: "notes" */ '../views/Notes.vue'),
  },
  {
    path: '/weather',
    name: 'Weather',
    component: () =>
      import(/* webpackChunkName: "weather" */ '../views/Weather.vue'),
  },
  {
    path: '/selfie',
    name: 'Selfie',
    component: () =>
      import(/* webpackChunkName: "selfie" */ '../views/Selfie.vue'),
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
  linkActiveClass: 'active',
});

export default router;
