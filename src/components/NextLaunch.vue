<template>
	<div class="next-launch text-left mb-8">
		<h1>Next Launch</h1>
		<div v-if="loading" class="text-center p-4">Loading next launch...</div>
		<div v-else>
			<div class="flex">
				<div class="flex flex-col w-full">
					<div class="flex">
						<h2 class="my-1">
							<font-awesome-icon class="mr-2" icon="calendar-alt" />{{ launch }}
						</h2>
						<div class="ml-auto my-1">
							<Countdown v-bind:timestamp="data.date_unix" />
						</div>
					</div>
					<h3 class="my-1">{{ data.name }}</h3>
					<span class="my-2">
						{{ data.details }}
					</span>
					<span>
						<router-link v-bind:to="rocketUrl">
							<a>Rocket</a>
						</router-link>
					</span>
					<span>
						<router-link v-bind:to="launchpadUrl">
							<a>Launchpad</a>
						</router-link>
					</span>
				</div>
			</div>
		</div>
	</div>
</template>

<script>
import Countdown from "./Countdown.vue";
import dayjs from "dayjs";

import localizedFormat from "dayjs/plugin/localizedFormat";
dayjs.extend(localizedFormat);

export default {
	name: "NextLaunch",
	components: {
		Countdown,
	},
	computed: {
		launch() {
			return dayjs(this.data?.date_unix * 1000).format("LLL");
		},
		launchpadUrl() {
			return `/launchpad/${this.data.launchpad}`;
		},
		rocketUrl() {
			return `/rocket/${this.data.rocket}`;
		},
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

			fetch("https://api.spacexdata.com/v5/launches/next")
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
