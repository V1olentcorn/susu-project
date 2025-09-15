<script setup lang="ts">
import { ref } from 'vue'
import type { TextScrollItem } from 'vue-amazing-ui'
const scrollItems = ref<TextScrollItem[]>([
  {
    title: '求吃的推荐',
   
    target: '_blank'
  },
  {
    title: '有什么好看的?',
    target: '_blank'
  },
  {
    title: '哪里好玩啊?'
  },
  {
    title: '你喜欢干啥?',
    target: '_blank'
  }
])
function onClick(item: TextScrollItem) {
  // 获取点击的 item
  console.log('item', item)
}
</script>
<template>
  <Flex vertical>
    <TextScroll :items="scrollItems" ellipsis pause-on-mouse-enter @click="onClick" />
    <!-- <TextScroll :items="scrollItems" ellipsis pause-on-mouse-enter vertical @click="onClick" /> -->
  </Flex>
</template>