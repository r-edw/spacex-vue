<template>
  <div class="home">
    <img alt="Vue logo" src="../assets/logo.png">
    <div v-if="loading" class="loading">
      loading...
    </div>
    <pre>Next launch: {{nextLaunch}}</pre>
  </div>
</template>

<script>
import dayjs from 'dayjs';

var localizedFormat = require('dayjs/plugin/localizedFormat')
dayjs.extend(localizedFormat)

export default {
  name: 'Home',
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
