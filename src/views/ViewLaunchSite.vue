<template>
  <div class="rocket">
    <div v-if="loading">
      <span>Loading launch site...</span>
    </div>
    <section v-else class="max-w-sm w-full lg:max-w-full lg:flex rounded-md my-2 p-2 ml-auto mr-auto">
      <div class="text-left">
        <div class="mb-2 flex">
          <h1>
            {{data.site_name_long}}
          </h1>
        </div>
        <div class="mb-2">
          {{data.details}}
        </div>
        <div v-if="data.wikipedia" class="mb-2 rocket__links">
          <a rel="noopener noreferrer" target="_blank" v-bind:href="data.wikipedia">Wikipedia</a>
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