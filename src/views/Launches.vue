<template>
  <div class="launches">
    <NextLaunch /> 
    <h1 class="text-left font-semibold">Previous launches</h1>
    <div v-if="loading">Loading previous launches...</div>
    <div v-else>
      <div>
        <ul>
          <li v-for="launch in launches" :key="launch.flight_number">
            <LaunchSummary v-bind:launch="launch" />
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script>
import NextLaunch from '../components/NextLaunch';
import LaunchSummary from '../components/LaunchSummary';

export default {
  components: {
    LaunchSummary,
    NextLaunch,
  },
  name: 'Launches',
  data() {
    return {
      loading: true,
      launches: null,
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

      fetch('https://api.spacexdata.com/v3/launches/past')
        .then((response) => {
          this.loading = false;
          response.json().then((data) => {
            this.launches = data;
          });
        })
        .catch((err) => {
          console.log('Fetch error :', err);
        });
    }
  }
}
</script>
