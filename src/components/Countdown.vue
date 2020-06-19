<template>
  <div>T - {{diff.days}}:{{diff.hours}}:{{diff.minutes}}:{{diff.seconds}}</div>
</template>

<script>
import dayjs from 'dayjs';

let duration = require('dayjs/plugin/duration');
dayjs.extend(duration);

export default {
  name: 'Countdown',
  props: ['timestamp'],
  data() {
    return {
      timeInterval: null
    };
  },
  computed: {
    diff() {
      if (this.timeInterval === 0) return;

      const milli = (this.timestamp * 1000);

      if (dayjs(milli).isBefore(dayjs())) {
        return {
          days: '00',
          hours: '00',
          minutes: '00',
          seconds: '00',
        }
      }

      const duration = dayjs.duration(dayjs(milli).diff(dayjs()));

      const days = duration.days();
      const hours = duration.hours();
      const minutes = duration.minutes();
      const seconds = duration.seconds();
      
      return {
        days: days < 10 ? `0${days}` : days,
        hours: hours < 10 ? `0${hours}` : hours,
        minutes: minutes < 10 ? `0${minutes}` : minutes,
        seconds: seconds < 10 ? `0${seconds}` : seconds,
      }
    }
  },
  methods: {
    startTimer() {
      setInterval(() => {
        this.timeInterval = this.timeInterval + 1;
      }, 1000);
    },
  },

  mounted() {
    this.startTimer();
  },
}
</script>