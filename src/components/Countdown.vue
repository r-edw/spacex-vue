<template>
  <div>{{launch}}</div>
</template>

<script>
import dayjs from 'dayjs';

var localizedFormat = require('dayjs/plugin/localizedFormat')
dayjs.extend(localizedFormat)

export default {
  computed: {
    launch() {
      return dayjs(this.timestamp * 1000).format('LL')
    }
  },
  name: 'Countdown',
  props: ['timestamp']
}
</script>