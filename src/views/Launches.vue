<template>
	<div class="launches">
		<NextLaunch />
		<h1 class="text-left mb-2">Previous launches</h1>
		<div>
			<div>
				<ul>
					<li v-for="launch in launches" :key="launch.flight_number">
						<LaunchSummary v-bind:launch="launch" />
					</li>
				</ul>
			</div>
		</div>
		<div v-if="loading" class="m-8">Loading previous launches...</div>
	</div>
</template>

<script>
import NextLaunch from "../components/NextLaunch.vue";
import LaunchSummary from "../components/LaunchSummary.vue";

export default {
	components: {
		LaunchSummary,
		NextLaunch,
	},
	name: "Launches",
	data() {
		return {
			end: false,
			loading: true,
			launches: [],
			limit: 10,
			offset: 0,
		};
	},
	created() {
		// fetch the data when the view is created and the data is
		// already being observed
		this.fetchData();
	},
	mounted() {
		this.scroll(this.fetchData, this.loading);
	},
	methods: {
		fetchMore() {
			if (this.loading || this.end) return;

			this.fetchData();
		},
		fetchData() {
			this.loading = true;

			if (this.end) {
				return;
			}

			const requestOptions = {
				method: "POST",
				headers: { "Content-Type": "application/json" },
				body: JSON.stringify({
					options: {
						offset: this.offset,
						limit: this.limit,
						sort: {
							flight_number: -1,
						},
					},
				}),
			};

			fetch(`https://api.spacexdata.com/v5/launches/query`, requestOptions)
				.then((response) => {
					response.json().then((data) => {
						if (data.length < 10) {
							this.end = true;
						}

						console.log(data);

						this.launches = [...this.launches, ...data.docs];
						this.offset = this.offset + this.limit;
						this.loading = false;
						this.scroll(this.fetchData, this.loading);
					});
				})
				.catch((err) => {
					console.log("Fetch error :", err);
				});
		},
		scroll() {
			window.onscroll = () => {
				let bottomOfWindow =
					Math.ceil(
						document.documentElement.scrollHeight -
							document.documentElement.scrollTop
					) <= document.documentElement.clientHeight;

				if (bottomOfWindow) {
					this.fetchMore();
				}
			};
		},
	},
};
</script>
