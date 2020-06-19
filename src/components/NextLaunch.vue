<template>
  <div class="next-launch text-left mb-8">
    <h1>Next Launch</h1>
    <div v-if="loading" class="text-center p-4">Loading next launch...</div>
    <div v-else>
      <div class="flex">
        <div class="flex flex-col">
          <div class="flex">
            <h2 class="my-1">{{launch}}</h2>
            <div class="ml-auto my-1">
              <Countdown v-bind:timestamp="data.launch_date_unix" />
            </div>
          </div>
          <h3 class="my-1">{{data.mission_name}}</h3>
          <span class="my-2">
            {{data.details}}
          </span>
          <span>
            Rocket: 
            <router-link v-bind:to="rocketUrl">
              <a>{{data.rocket.rocket_name}}</a>
            </router-link>
          </span>
          <span>
            Launch Site: 
            <router-link v-bind:to="siteUrl">
              <a>{{data.launch_site.site_name_long}}</a>
            </router-link>
          </span>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Countdown from './Countdown';
import dayjs from 'dayjs';

var localizedFormat = require('dayjs/plugin/localizedFormat')
dayjs.extend(localizedFormat)

export default {
  name: 'NextLaunch',
  components: {
    Countdown
  },
  computed: {
    launch() {
      return dayjs(this.data?.launch_date_unix * 1000).format('LLL');
    },
    siteUrl() {
      return `/launch_site/${this.data.launch_site.site_id}`;
    },
    rocketUrl() {
      return `/rocket/${this.data.rocket.rocket_id}`;
    },
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
