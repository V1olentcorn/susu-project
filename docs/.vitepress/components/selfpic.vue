<script setup lang="ts">
import { ref } from 'vue'
import { Image } from 'vue-amazing-ui'
import type { ImageItem } from 'vue-amazing-ui'
const images = ref<ImageItem[]>([
  {
    src: '/Melbourne/111.jpg',
    name: 'image-1.jpg'
  },
  {
    src: '/Melbourne/222.jpg',
    name: 'image-2.jpg'
  },
  {
    src: '/Melbourne/333.jpg',
    name: 'image-3.jpg'
  },
  {
    src: '/Melbourne/444.jpg',
    name: 'image-4.jpg'
  },
  {
    src: '/Melbourne/555.jpg',
    name: 'image-5.jpg'
  },
  
])
</script>
<template>
  <Image
    :src="images"
    :width="[300, 400, 230, 200, 270]"
    :height="[300,300,400,400,350]"
    :space-props="{ width: 800 }"
    fit="cover"
    loop
  >
    <template #preview>
      <p class="preview-txt">preview</p>
    </template>
  </Image>
</template>
<style lang="less" scoped>
.preview-txt {
  display: inline-block;
  font-size: 16px;
}
</style>