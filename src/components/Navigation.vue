<template>
  <nav class="flex items-center justify-between flex-wrap bg-teal-500 p-6">
    <div class="w-full block flex-grow lg:flex lg:items-center lg:w-auto">
      <div class="text-sm lg:flex-grow">
        <button class="block mt-4 lg:inline-block lg:mt-0 text-teal-200 hover:text-white mr-4">
          <router-link to="/">Launches</router-link>
        </button>
        <button class="block mt-4 lg:inline-block lg:mt-0 text-teal-200 hover:text-white mr-4">
          <router-link to="/rockets">Rockets</router-link>
        </button>
        <button class="block mt-4 lg:inline-block lg:mt-0 text-teal-200 hover:text-white mr-4">
          <router-link to="/launch_sites">Launch Sites</router-link>
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