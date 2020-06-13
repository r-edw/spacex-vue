<template>
  <div class="launch-sites">
    <div v-if="loading">Loading launch sites...</div>
    <div v-else>
      <pre>{{data}}</pre>
    </div>
  </div>
</template>

<script>
export default {
  name: 'LaunchSites',
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

      fetch('https://api.spacexdata.com/v3/launchpads')
        .then((response) => {
          this.loading = false;
          response.json().then((data) => {
            this.data = data;
          });
        })
        .catch((err) => {
          console.log('Fetch error :', err);
        });
    }
  }
}
</script>