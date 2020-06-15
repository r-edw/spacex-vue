<template>
  <nav class="flex items-center justify-between flex-wrap bg-black-500 border-b-2 border-white p-6">
    <div class="w-full block flex-grow lg:flex lg:items-center lg:w-auto">
      <div class="text-sm lg:flex-grow">
        <button class="block mt-4 lg:inline-block lg:mt-0 text-teal-200 hover:text-white mr-4">
          <router-link to="/">LAUNCHES</router-link>
        </button>
        <button class="block mt-4 lg:inline-block lg:mt-0 text-teal-200 hover:text-white mr-4">
          <router-link to="/rockets">ROCKETS</router-link>
        </button>
        <button class="block mt-4 lg:inline-block lg:mt-0 text-teal-200 hover:text-white mr-4">
          <router-link to="/launch_sites">LAUNCH SITES</router-link>
        </button>
      </div>
    </div>
  </nav>
</template>

<script>
export default {
  name: 'Nav',
}
</script>

<style scoped>
  a {
    text-decoration: none;
    color: #ffffff
  }
</style>