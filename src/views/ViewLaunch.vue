<template>
  <div class="launch">
    <div v-if="loading">Loading launch...</div>
    <section v-else class="max-w-sm w-full lg:max-w-full lg:flex rounded-md my-2 p-2 ml-auto mr-auto">
      <div class="text-left">
        <div class="mb-2 flex">
          <h1>
            {{data.mission_name}}
          </h1>
        </div>
        <div class="mb-2">
          {{launchDate}}
        </div>
        <div class="mb-2">
          <div>{{data.details}}</div>
        </div>
        <div class="mb-2" v-if="data.launch_success">
          Outcome: <span class="launch__success">SUCCESS</span>
        </div>
        <div class="mb-2" v-else>
          Outcome: <span class="launch__failure">UNSUCCESSFUL</span>
        </div>
        <div class="my-4">
          <div>Rocket: 
            <span>
              <router-link v-bind:to="rocketUrl">
                <a>{{data.rocket.rocket_name}}</a>
              </router-link>
            </span>
          </div>
        </div>
        <div class="my-4">
          <div>Launch Site: 
            <span>
              <router-link v-bind:to="siteUrl">
                <a>{{data.launch_site.site_name_long}}</a>
              </router-link>
            </span>
          </div>
        </div>
        <div v-if="data.links.wikipedia" class="mb-2 launch__links">
          <a rel="noopener noreferrer" target="_blank" v-bind:href="data.links.wikipedia">Wikipedia</a>
        </div>
        <div v-if="data.links.article_link" class="mb-2 launch__links">
          <a rel="noopener noreferrer" target="_blank" v-bind:href="data.links.article_link">Article</a>
        </div>
        <div v-if="data.links.reddit_launch" class="mb-2 launch__links">
          <a rel="noopener noreferrer" target="_blank" v-bind:href="data.links.reddit_launch">Reddit launch thread</a>
        </div>
      </div>
      <img class="h-64 w-64 m-auto lg:ml-auto lg:mr-0 lg:mt-0" v-bind:src="data.links.mission_patch"/>
    </section>
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
    },
    rocketUrl() {
      return `/rocket/${this.data.rocket.rocket_id}`;
    },
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

<style scoped>
  .launch__success {
    color: #00FF00;
  }
  .launch__failure {
    color: #BF0000;
  }
</style>