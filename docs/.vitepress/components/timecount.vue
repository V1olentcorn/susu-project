<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue'

const props = defineProps({
  startTime: {
    type: [Date, String, Number],
    required: true
  },
  title: {
    type: String,
    default: '⏳ 距离目标时间已经过去'
  },
  updateInterval: {
    type: Number,
    default: 1000
  },
  emoji: {
    type: Boolean,
    default: true
  }
})

const elapsedTime = ref('')
const emojis = ['⏳', '⌛', '⏰', '🕰️', '📅', '🗓️', '⏱️', '🕒']

const getRandomEmoji = () => {
  return emojis[Math.floor(Math.random() * emojis.length)]
}

const calculateTime = () => {
  const start = new Date(props.startTime)
  const now = new Date()
  const diff = now.getTime() - start.getTime()

  const days = Math.floor(diff / (1000 * 60 * 60 * 24))
  const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60))
  const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60))
  const seconds = Math.floor((diff % (1000 * 60)) / 1000)

  const currentEmoji = props.emoji ? getRandomEmoji() : ''
  elapsedTime.value = `${currentEmoji} ${days}天 ${hours}小时 ${minutes}分钟 ${seconds}秒`
}

let timer: NodeJS.Timeout

onMounted(() => {
  calculateTime()
  timer = setInterval(calculateTime, props.updateInterval)
})

onUnmounted(() => {
  clearInterval(timer)
})
</script>

<template>
  <div class="time-counter">
    <span class="title">{{ title }}</span>
    <span class="time">{{ elapsedTime }}</span>
  </div>
</template>

<style scoped>
.time-counter {
  font-family: var(--vp-font-family-base);
  padding: 12px 16px;
  background: var(--vp-c-bg-soft);
  border-radius: var(--vp-radius);
  display: inline-flex;
  align-items: center;
  border: 1px solid var(--vp-c-divider);
  transition: all 0.3s var(--vp-cubic-bezier);
  margin: 0 auto;
  box-shadow: var(--vp-shadow-1);
  backdrop-filter: blur(4px);
}

.time-counter:hover {
  background: var(--vp-c-bg-soft-up);
  box-shadow: var(--vp-shadow-2);
  transform: translateY(-1px);
}

.title {
  font-weight: 500;
  margin-right: 8px;
  color: var(--vp-c-text-1);
}

.time {
  color: var(--vp-c-brand);
  font-family: var(--vp-font-family-mono);
  font-weight: 600;
  text-shadow: 0 1px 1px var(--vp-c-bg);
}

.dark .time {
  text-shadow: 0 1px 1px var(--vp-c-black);
}

.emoji {
  display: inline-block;
  margin-right: 4px;
  animation: pulse 2s infinite;
}

@keyframes pulse {
  0% { transform: scale(1); }
  50% { transform: scale(1.1); }
  100% { transform: scale(1); }
}

@media (max-width: 640px) {
  .time-counter {
    padding: 10px 12px;
    font-size: 14px;
  }
}
</style>