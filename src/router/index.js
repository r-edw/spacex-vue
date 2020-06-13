import Vue from "vue";
import VueRouter from "vue-router";
import Launches from "../views/Launches.vue";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "Launches",
    component: Launches
  },
  {
    path: "/launch/:id",
    name: "ViewLaunch",
    component: () =>
      import(/* webpackChunkName: "about" */ "../views/ViewLaunch.vue")
  },
  {
    path: "/launch_sites",
    name: "LaunchSites",
    component: () =>
      import(/* webpackChunkName: "about" */ "../views/LaunchSites.vue")
  },
  {
    path: "/launch_site/:id",
    name: "ViewLaunchSite",
    component: () =>
      import(/* webpackChunkName: "about" */ "../views/ViewLaunchSite.vue")
  },
  {
    path: "/rockets",
    name: "Rockets",
    component: () =>
      import(/* webpackChunkName: "about" */ "../views/Rockets.vue")
  }
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes
});

export default router;
