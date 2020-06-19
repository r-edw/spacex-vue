<template>
  <div class="launches">
    <NextLaunch /> 
    <h1 class="text-left">Previous launches</h1>
    <div>
      <div>
        <ul>
          <li v-for="launch in launches" :key="launch.flight_number">
            <LaunchSummary v-bind:launch="launch" />
          </li>
        </ul>
      </div>
    </div>
    <div v-if="loading" class="m-8">Loading previous launches...</div>
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
      end: false,
      loading: true,
      launches: [],
      limit: 10,
      offset: 0,
    }
  },
  created() {
    // fetch the data when the view is created and the data is
    // already being observed
    this.fetchData()
  },
  mounted() {
    this.scroll(this.fetchData, this.loading);
  },
  methods: {
    fetchData() {
      this.loading = true;

      if (this.end) {
        return;
      }

      fetch(`https://api.spacexdata.com/v3/launches/past?sort=flight_number&order=desc&limit=${this.limit}&offset=${this.offset}`)
        .then((response) => {
          response.json().then((data) => {
            if (data.length < 10) {
              this.end = true;
            }

            this.launches = [...this.launches, ...data];
            this.offset = this.offset + this.limit
            this.loading = false;
            this.scroll(this.fetchData, this.loading);
          });
        })
        .catch((err) => {
          console.log('Fetch error :', err);
        });
    },
    scroll(fetchData, loading) {
      window.onscroll = () => {
        let bottomOfWindow = Math.ceil(document.documentElement.scrollHeight - document.documentElement.scrollTop) === document.documentElement.clientHeight

        if (bottomOfWindow) {
          if (loading) {
            return;
          }

          fetchData();
        }
      };
    }
  }
}
</script>
