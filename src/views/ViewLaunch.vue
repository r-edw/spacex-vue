<template>
  <div class="launch">
    <div v-if="loading">Loading launch...</div>
    <div v-else>
      <div class="max-w-sm w-full lg:max-w-full lg:flex border rounded-md my-2 p-2">
        <div class="text-left">
          <div class="mb-4 flex">
            <div>
              {{data.mission_name}}
            </div>
            <div class="ml-auto">
              {{launchDate}}
            </div>
          </div>
          <div>
            <div>{{data.details}}</div>
          </div>
          <div class="my-4">
            <router-link v-bind:to="launchUrl"></router-link>
            <div>Launch Site: 
              <span>
                <router-link v-bind:to="siteUrl">
                  <a>{{data.launch_site.site_name_long}}</a>
                </router-link>
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import dayjs from 'dayjs';

var localizedFormat = require('dayjs/plugin/localizedFormat')
dayjs.extend(localizedFormat)

export default {
  name: "ViewLaunch",
  data() {
    return {
      loading: true,
      data: null,
    }
  },
  computed: {
    launchDate() {
      return dayjs(this.data?.launch_date_unix * 1000).format('LLL');
    },
    siteUrl() {
      return `/launch_site/${this.data.launch_site.site_id}`;
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

      fetch(`https://api.spacexdata.com/v3/launches/${this.$route.params.id}`)
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