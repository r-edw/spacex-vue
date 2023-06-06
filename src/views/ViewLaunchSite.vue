<template>
	<div class="rocket">
		<div v-if="loading">
			<span>Loading launch site...</span>
		</div>
		<section
			v-else
			class="w-full lg:max-w-full lg:flex rounded-md mb-2 ml-auto mr-auto"
		>
			<div class="text-left lg:mr-4">
				<h1 class="mb-2">{{ data.full_name }} ({{ data.name }})</h1>
				<div class="mb-2">
					{{ data.details }}
				</div>
				<div class="mb-2 flex flex-col">
					<span>Attempted launches: {{ data.launch_attempts }}</span>
					<span>Successful launches: {{ data.launch_successes }}</span>
				</div>
				<div v-if="data.latitude" class="mb-2">
					<a
						rel="noopener noreferrer"
						target="_blank"
						v-bind:href="`https://www.google.com/maps/place/${data.latitude},${data.longitude}`"
						>Google Maps</a
					>
				</div>
			</div>
			<img
				class="h-64 w-64 m-auto lg:ml-auto lg:mr-0 lg:mt-0"
				v-bind:src="data.images.large[0]"
			/>
		</section>
	</div>
</template>

<script>
export default {
	name: "LaunchSite",
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

			fetch(`https://api.spacexdata.com/v4/launchpads/${this.$route.params.id}`)
				.then((response) => {
					response.json().then((data) => {
						this.data = data;
						this.loading = false;
					});
				})
				.catch((err) => {
					console.log("Fetch error :", err);
				});
		},
	},
};
</script>
