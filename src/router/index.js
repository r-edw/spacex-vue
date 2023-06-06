import { createRouter, createWebHistory } from "vue-router";
import Launches from "../views/Launches.vue";

const routes = [
	{
		path: "/",
		name: "Launches",
		component: Launches,
	},
	{
		path: "/launch/:id",
		name: "ViewLaunch",
		component: () => import("../views/ViewLaunch.vue"),
	},
	{
		path: "/launch_sites",
		name: "LaunchSites",
		component: () => import("../views/LaunchSites.vue"),
	},
	{
		path: "/launch_site/:id",
		name: "ViewLaunchSite",
		component: () => import("../views/ViewLaunchSite.vue"),
	},
	{
		path: "/rockets",
		name: "Rockets",
		component: () => import("../views/Rockets.vue"),
	},
	{
		path: "/rocket/:id",
		name: "ViewRocket",
		component: () => import("../views/ViewRocket.vue"),
	},
	{
		path: "/about",
		name: "About",
		component: () => import("../views/About.vue"),
	},
	{
		path: "/:pathMatch(.*)*",
		name: "NotFound",
		component: () => import("../views/NotFound.vue"),
	},
];

const router = createRouter({
	history: createWebHistory(),
	routes,
});

export default router;
