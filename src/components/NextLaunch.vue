<template>
</template>

<script>
export default {
  name: 'NextLaunch',
  data() {
    return {
      loading: true,
      nextLaunch: null,
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

      fetch('https://api.spacexdata.com/v3/launches/next')
        .then((response) => {
          this.loading = false;
          response.json().then((data) => {
            this.nextLaunch = dayjs(data.launch_date_unix * 1000).format('LLL');
          });
        })
        .catch((err) => {
          console.log('Fetch error :', err);
        });
    }
  }
}
</script>