<template>
	<div class="rockets mb-4">
		<h1 class="text-left mb-2">Rockets</h1>
		<div v-if="loading">Loading rockets...</div>
		<div v-else>
			<ul>
				<li v-for="rocket in rockets" :key="rocket.id">
					<RocketSummary v-bind:rocket="rocket" />
				</li>
			</ul>
		</div>
	</div>
</template>

<script>
import RocketSummary from "../components/RocketSummary.vue";

export default {
	name: "Rockets",
	components: {
		RocketSummary,
	},
	data() {
		return {
			loading: true,
			rockets: null,
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

			fetch("https://api.spacexdata.com/v4/rockets")
				.then((response) => {
					this.loading = false;
					response.json().then((data) => {
						this.rockets = data.reverse();
					});
				})
				.catch((err) => {
					console.log("Fetch error :", err);
				});
		},
	},
};
</script>
