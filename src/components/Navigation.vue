<template>
  <nav class="w-full fixed bg-black flex items-center justify-between flex-wrap bg-black-500 border-b-2 border-white p-6">
    <div class="w-full block flex-grow lg:flex lg:items-center lg:w-auto">
      <div class="lg:hidden text-left">
        <button v-on:click="toggleOpen">
          <font-awesome-icon class="lg:hidden" icon="bars" />
        </button>
      </div>
      <div class="text-sm hidden max-h-full lg:h-auto lg:flex-grow lg:block" v-bind:class="{'is-open': open, 'h-0': !open}">
        <button v-on:click="closeOpen" class="block mt-4 lg:inline-block lg:mt-0 text-teal-200 hover:text-white mr-4">
          <router-link to="/">LAUNCHES</router-link>
        </button>
        <button v-on:click="closeOpen" class="block mt-4 lg:inline-block lg:mt-0 text-teal-200 hover:text-white mr-4">
          <router-link to="/rockets">ROCKETS</router-link>
        </button>
        <button v-on:click="closeOpen" class="block mt-4 lg:inline-block lg:mt-0 text-teal-200 hover:text-white mr-4">
          <router-link to="/launch_sites">LAUNCH SITES</router-link>
        </button>
        <button v-on:click="closeOpen" class="lg:hidden block mt-4 lg:mt-0 text-teal-200 hover:text-white mr-4">
          <router-link to="/about">ABOUT</router-link>
        </button>
      </div>
      <div class="ml-auto hidden lg:flex">
        <button>
          <router-link to="/about"><font-awesome-icon icon="info-circle" /></router-link>
        </button>
      </div>
    </div>
  </nav>
</template>

<script>
export default {
  name: 'Nav',
  data() {
    return {
      open: false,
    }
  },
  methods: {
    toggleOpen() {
      this.open = !this.open;
    },
    closeOpen() {
      this.open = false;
    }
  },
}
</script>

<style scoped>
  a {
    text-decoration: none;
    color: #ffffff
  }
  .is-open {
    display: block !important;
  }
</style>