<template>
  <div>{{diff.days}}:{{diff.hours}}:{{diff.minutes}}:{{diff.seconds}}</div>
</template>

<script>
import dayjs from 'dayjs';

let duration = require('dayjs/plugin/duration');
dayjs.extend(duration)

export default {
  computed: {
    diff() {
      const duration = dayjs.duration(dayjs(this.timestamp * 1000).diff(dayjs()));

      console.log(duration);
      
      return {
        days: duration.days(),
        hours: duration.hours(),
        minutes: duration.minutes(),
        seconds: duration.seconds(),
      }
    }
  },
  name: 'Countdown',
  props: ['timestamp']
}
</script>