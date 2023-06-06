<template>
	<div class="rocket">
		<div v-if="loading">
			<span>Loading rocket...</span>
		</div>
		<section
			v-else
			class="w-full lg:max-w-full lg:flex rounded-md mb-2 ml-auto mr-auto flex-col"
		>
			<div class="text-left">
				<h1>
					{{ data.name }}
				</h1>
				<h2 class="mb-2">First flight: {{ launchDate }}</h2>
				<div class="mb-2">
					{{ data.description }}
				</div>
				<div class="mb-2">
					Height: {{ data.height.meters }}m ({{ data.height.feet }} feet)
				</div>
				<div class="mb-2">
					Diameter: {{ data.diameter.meters }}m ({{ data.diameter.feet }} feet)
				</div>
				<div v-if="data.wikipedia" class="mb-2 rocket__links">
					<a
						rel="noopener noreferrer"
						target="_blank"
						v-bind:href="data.wikipedia"
						>Wikipedia</a
					>
				</div>
			</div>
			<div v-if="data.flickr_images.length > 0">
				<carousel class="my-2 pb-4" :perPageCustom="[[480, 2]]">
					<slide v-for="img in data.flickr_images" :key="img">
						<img v-bind:src="img" />
					</slide>
					<template #addons>
						<navigation />
					</template>
				</carousel>
			</div>
		</section>
	</div>
</template>

<script>
import dayjs from "dayjs";
import "vue3-carousel/dist/carousel.css";
import { Carousel, Slide, Pagination, Navigation } from "vue3-carousel";

export default {
	name: "Rocket",
	data() {
		return {
			loading: true,
			data: null,
		};
	},
	components: {
		Carousel,
		Slide,
		Pagination,
		Navigation,
	},
	computed: {
		launchDate() {
			return dayjs(this.data?.first_flight).format("LL");
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

			fetch(`https://api.spacexdata.com/v4/rockets/${this.$route.params.id}`)
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
