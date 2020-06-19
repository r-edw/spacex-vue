<template>
  <div class="launch-summary hover:bg-white hover:text-black h-64" v-bind:style="{backgroundImage: `url(${rocket.flickr_images[0]})`}">
    <router-link v-bind:to="rocketUrl">
      <div class="max-w-sm w-full lg:max-w-full lg:flex p-4">
        <div class="lg-flex text-left flex-col">
          <h2>{{rocket.rocket_name}}</h2>
        </div>
      </div>
    </router-link>
  </div>

</template>

<script>
export default {
  name: 'RocketSummary',
  props: ['rocket'],
  computed: {
    rocketUrl() {
      return `/rocket/${this.rocket?.id}`;
    }
  }
}
</script>

<style scoped>
  a {
    text-decoration: none;
    color: inherit;
  }
</style>