<template>
  <div class="slider-container">
    <div class="slider" :style="{ transform: `translateX(-${currentIndex * 100}%)` }">
      <div v-for="(slide, index) in slides" :key="index" class="slide">
        <img :src="slide.image" :alt="slide.alt">
        <div class="slide-caption">{{ slide.caption }}</div>
      </div>
    </div>
    <button class="slider-btn prev" @click="prevSlide">&lt;</button>
    <button class="slider-btn next" @click="nextSlide">&gt;</button>
    <div class="slider-nav">
      <div v-for="(dot, index) in slides" :key="index" 
           :class="['slider-dot', { active: index === currentIndex }]" 
           @click="currentIndex = index">
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from 'vue'

const props = defineProps({
  slides: {
    type: Array,
    required: true
  }
})

const currentIndex = ref(0)
let autoPlayInterval

function nextSlide() {
  currentIndex.value = (currentIndex.value + 1) % props.slides.length
}

function prevSlide() {
  currentIndex.value = (currentIndex.value - 1 + props.slides.length) % props.slides.length
}

function startAutoPlay() {
  autoPlayInterval = setInterval(nextSlide, 100000000)
}

function stopAutoPlay() {
  clearInterval(autoPlayInterval)
}

onMounted(() => {
  startAutoPlay()
})

onUnmounted(() => {
  stopAutoPlay()
})
</script>

<style scoped>
.slider-container {
  position: relative;
  width: 100%;
  overflow: hidden;
}

.slider {
  display: flex;
  transition: transform 0.5s ease;
}

.slide {
  min-width: 100%;
  position: relative;
}

.slide img {
 width: 70%; /* 调整为需要的百分比 */
  height: auto; /* 保持宽高比 */
  display: block;
  margin: 0 auto; /* 水平居中 */
}

.slide-caption {
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  background: rgba(0,0,0,0.5);
  color: white;
  padding: 10px;
  text-align: center;
}

.slider-btn {
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  background: rgba(0,0,0,0.5);
  color: white;
  border: none;
  padding: 10px;
  cursor: pointer;
  z-index: 10;
}

.prev {
  left: 10px;
}

.next {
  right: 10px;
}

.slider-nav {
  position: absolute;
  bottom: 20px;
  left: 0;
  right: 0;
  display: flex;
  justify-content: center;
  gap: 10px;
}

.slider-dot {
  width: 10px;
  height: 10px;
  border-radius: 50%;
  background: rgba(255,255,255,0.5);
  cursor: pointer;
}

.slider-dot.active {
  background: white;
}
/* 添加与之前相同的CSS样式 */
</style>