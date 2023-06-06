<template>
	<div class="launch">
		<div v-if="loading">Loading launch...</div>
		<section
			v-else
			class="w-full lg:max-w-full lg:flex rounded-md mb-2 ml-auto mr-auto"
		>
			<div class="text-left lg-mr-4">
				<div class="mb-2 flex">
					<h1>
						{{ data.name }}
					</h1>
				</div>
				<div class="mb-2">
					<font-awesome-icon class="mr-1" icon="calendar-alt" />
					{{ launchDate }}
				</div>
				<div class="mb-2">
					<div>{{ data.details }}</div>
				</div>
				<div class="mb-2" v-if="data.success">
					Outcome: <span class="launch__success">SUCCESS</span>
				</div>
				<div class="mb-2" v-else>
					Outcome: <span class="launch__failure">UNSUCCESSFUL</span>
				</div>
				<div class="my-4">
					<div>
						<span>
							<router-link v-bind:to="rocketUrl">
								<a>Rocket</a>
							</router-link>
						</span>
					</div>
				</div>
				<div class="my-4">
					<div>
						<span>
							<router-link v-bind:to="siteUrl">
								<a>Launch site</a>
							</router-link>
						</span>
					</div>
				</div>
				<div v-if="data.links.wikipedia" class="mb-2 launch__links">
					<a
						rel="noopener noreferrer"
						target="_blank"
						v-bind:href="data.links.wikipedia"
						>Wikipedia</a
					>
				</div>
				<div v-if="data.links.article_link" class="mb-2 launch__links">
					<a
						rel="noopener noreferrer"
						target="_blank"
						v-bind:href="data.links.article"
						>Article</a
					>
				</div>
				<div v-if="data.links.reddit_launch" class="mb-2 launch__links">
					<a
						rel="noopener noreferrer"
						target="_blank"
						v-bind:href="data.links.reddit.launch"
						>Reddit launch thread</a
					>
				</div>
			</div>
			<img
				class="h-64 w-64 m-auto lg:ml-auto lg:mr-0 lg:mt-0"
				v-bind:src="data.links.patch.small"
			/>
		</section>
	</div>
</template>

<script>
import dayjs from "dayjs";

import localizedFormat from "dayjs/plugin/localizedFormat";
dayjs.extend(localizedFormat);

export default {
	name: "ViewLaunch",
	data() {
		return {
			loading: true,
			data: null,
		};
	},
	computed: {
		launchDate() {
			return dayjs(this.data?.date_unix * 1000).format("LLL");
		},
		siteUrl() {
			return `/launchpad/${this.data.launchpad}`;
		},
		rocketUrl() {
			return `/rocket/${this.data.rocket}`;
		},
	},
	created() {
		// fetch the data when the view is created and the data is
		// already being observed
		this.fetchData();
	},
	methods: {
		fetchData() {
			this.loading = true;

			fetch(`https://api.spacexdata.com/v5/launches/${this.$route.params.id}`)
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

<style scoped>
.launch__success {
	color: #00ff00;
}
.launch__failure {
	color: #bf0000;
}
</style>
