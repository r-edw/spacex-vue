<template>
  <div id="app">
    <Navigation 
      v-bind:nextLaunchData="nextLaunchData"
      v-bind:timestamp="timestamp" 
      class="mb-6" 
    />
    <router-view/>
  </div>
</template>

<script>
import Navigation from './components/Navigation.vue';

export default {
  name: 'App',
  components: {
    Navigation
  },
  data() {
    return {
      loading: true,
      nextLaunchData: null,
      timestamp: null,
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
            //
            this.timestamp = data.launch_date_unix;
            //state management?
            this.nextLaunchData = data;
          });
        })
        .catch((err) => {
          console.log('Fetch error :', err);
        });
    }
  }
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

#nav {
  padding: 30px;
}

#nav a {
  font-weight: bold;
  color: #2c3e50;
}

#nav a.router-link-exact-active {
  color: #42b983;
}
</style>
