<template>
  <div class="next-launch text-left">
    <div v-if="loading">Loading next launch...</div>
    <div v-else>
      <span>Next launch: {{launch}}</span>
    </div>
  </div>
</template>

<script>
import dayjs from 'dayjs';

var localizedFormat = require('dayjs/plugin/localizedFormat')
dayjs.extend(localizedFormat)

export default {
  name: 'NextLaunch',
  computed: {
    launch() {
      return dayjs(this.data?.launch_date_unix * 1000).format('LLL');
    }
  },
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

      fetch('https://api.spacexdata.com/v3/launches/next')
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
