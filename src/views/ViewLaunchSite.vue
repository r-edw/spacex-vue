<template>
  <div>
    <span>Launch site go here</span>
    <pre>{{data}}</pre>
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
          this.loading = false;
          response.json().then((data) => {
            //remove
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