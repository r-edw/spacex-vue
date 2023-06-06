<template>
	<div
		class="launch-summary hover:bg-white hover:text-black transition-colors ease-in duration-300"
	>
		<router-link v-bind:to="launchUrl">
			<div class="w-full max-w-full flex border-b p-4">
				<div class="lg-flex text-left flex-col">
					<div># {{ launch.flight_number }}</div>
					<div>{{ launch.name }}</div>
				</div>
				<div class="ml-auto">
					<span>{{ launchDate }}</span>
				</div>
			</div>
		</router-link>
	</div>
</template>

<script>
import dayjs from "dayjs";

export default {
	name: "LaunchSummary",
	props: ["launch"],
	computed: {
		launchDate() {
			return dayjs(this.launch?.date_unix * 1000).format("LLL");
		},
		launchUrl() {
			return `/launch/${this.launch?.id}`;
		},
	},
};
</script>

<style scoped>
a {
	text-decoration: none;
	color: inherit;
}
</style>
