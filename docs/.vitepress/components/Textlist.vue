<script setup lang="ts">
import { ref } from 'vue'
import { List, ListItem, Avatar } from 'vue-amazing-ui'
const listData = ref([
  {
    title: '玉米',
    description: '我好喜欢你!',
    content: 'content'
  },
  {
    title: '张岩',
    description: '我好喜欢你!!',
    content: 'content'
  },
  {
    title: 'ROCKY',
    description: '我好喜欢你!!',
    content: 'content'
  }
])
</script>
<template>
  <List>
    <ListItem v-for="(data, index) in listData" :key="index" :title="data.title">
      <template #avatar>
        <Avatar src="../../touxiang.jpg" />
      </template>
      <template #description>
        {{ data.description }}
      </template>
    </ListItem>
  </List>
</template>