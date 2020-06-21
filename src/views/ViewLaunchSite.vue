<template>
  <div class="rocket">
    <div v-if="loading">
      <span>Loading launch site...</span>
    </div>
    <section v-else class="w-full lg:max-w-full lg:flex rounded-md mb-2 ml-auto mr-auto">
      <div class="text-left">
        <h1 class="mb-2">
          {{data.site_name_long}} ({{data.name}})
        </h1>
        <div class="mb-2">
          {{data.details}}
        </div>
        <div class="mb-2 flex flex-col">
          <span>Attempted launches: {{data.attempted_launches}}</span>
          <span>Successful launches: {{data.successful_launches}}</span>
        </div>
        <div v-if="data.wikipedia" class="mb-2 rocket__links">
          <a rel="noopener noreferrer" target="_blank" v-bind:href="data.wikipedia">Wikipedia</a>
        </div>
        <div v-if="data.location" class="mb-2">
          <a rel="noopener noreferrer" target="_blank" v-bind:href="`https://www.google.com/maps/place/${data.location.latitude},${data.location.longitude}`">Google Maps</a>
        </div>
      </div>
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
    }
  },
  created() {
    // fetch the data when the view is created and the data is
    // already being observed
    this.fetchData()
  },
  methods: {
    fetchData() {
      this.loading = true;

      fetch(`https://api.spacexdata.com/v3/launchpads/${this.$route.params.id}`)
        .then((response) => {
          response.json().then((data) => {
            this.data = data;
            this.loading = false;
          });
        })
        .catch((err) => {
          console.log('Fetch error :', err);
        });
    }
  }
}
</script>