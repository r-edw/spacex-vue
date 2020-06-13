<template>
  <router-link v-bind:to="launchUrl">
    <div class="max-w-sm w-full lg:max-w-full lg:flex border-b my-2 p-2">
      <span>{{launch.mission_name}}</span>
    </div>
  </router-link>
</template>

<script>
export default {
  name: 'LaunchSummary',
  props: ['launch'],
  computed: {
    launchUrl() {
      return `/launch/${this.launch.flight_number}`;
    }
  }
}
</script>