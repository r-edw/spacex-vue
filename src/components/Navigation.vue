<template>
  <nav class="flex items-center justify-between flex-wrap bg-teal-500 p-6">
    <div class="flex items-center flex-shrink-0 text-white mr-6">
      <span class="font-semibold text-xl tracking-tight absolute">
        <countdown v-bind:timestamp="timestamp" />
      </span>
    </div>
    <div class="w-full block flex-grow lg:flex lg:items-center lg:w-auto">
      <div class="text-sm lg:flex-grow">
        <button class="block mt-4 lg:inline-block lg:mt-0 text-teal-200 hover:text-white mr-4">
          <router-link to="/">Home</router-link>
        </button>
        <button class="block mt-4 lg:inline-block lg:mt-0 text-teal-200 hover:text-white mr-4">
          <router-link to="/launches">Launches</router-link>
        </button>
      </div>
    </div>
  </nav>
</template>

<script>
import Countdown from './Countdown'

export default {
  name: 'Nav',
  components: {
    Countdown
  },
  props: ['timestamp'],
}
</script>