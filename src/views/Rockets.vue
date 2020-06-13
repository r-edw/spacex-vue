<template>
  <div class="rockets">
    <h1 class="font-semibold">Rockets</h1>
    <div v-if="loading">Loading rockets...</div>
    <div v-else>
      <ul>
        <li v-for="rocket in rockets" :key="rocket.id">
          {{rocket.rocket_name}}
        </li>
        <!-- <Launch v-for="launch in launches" :key="launch.flight_number" v-bind="launch" /> -->
      </ul>
    </div>
  </div>
</template>

<script>
export default {
  name: "Rockets",
  data() {
    return {
      loading: true,
      rockets: null,
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

      fetch('https://api.spacexdata.com/v3/rockets')
        .then((response) => {
          this.loading = false;
          response.json().then((data) => {
            this.rockets = data;
          });
        })
        .catch((err) => {
          console.log('Fetch error :', err);
        });
    }
  }
}
</script>
