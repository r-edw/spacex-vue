<template>
	<div class="launch-sites mb-4">
		<h1 class="text-left mb-2">Launch Sites</h1>
		<div v-if="loading">Loading launch sites...</div>
		<div v-else>
			<ul>
				<li v-for="site in data" :key="site.id">
					<LaunchSiteSummary v-bind:site="site" />
				</li>
			</ul>
		</div>
	</div>
</template>

<script>
import LaunchSiteSummary from "../components/LaunchSiteSummary.vue";

export default {
	name: "LaunchSites",
	components: {
		LaunchSiteSummary,
	},
	data() {
		return {
			loading: true,
			data: null,
		};
	},
	created() {
		// fetch the data when the view is created and the data is
		// already being observed
		this.fetchData();
	},
	methods: {
		fetchData() {
			this.loading = true;

			fetch("https://api.spacexdata.com/v4/launchpads")
				.then((response) => {
					this.loading = false;
					response.json().then((data) => {
						this.data = data;
					});
				})
				.catch((err) => {
					console.log("Fetch error :", err);
				});
		},
	},
};
</script>
