<script setup lang="ts">
import { ref } from 'vue'
const src = ref('https://cdn.jsdelivr.net/gh/themusecatcher/resources@0.1.2/ultra.mp4')
const poster = ref('https://cdn.jsdelivr.net/gh/themusecatcher/resources@0.1.2/ultra.jpg')
function onPlay() {
  console.log('play')
}
function onPause() {
  console.log('pause')
}
</script>
<template>
  <Video
    :src="src"
    :poster="poster"
    width="100%"
    height="56.25%"
    @play="onPlay"
    @pause="onPause"
  />
</template>