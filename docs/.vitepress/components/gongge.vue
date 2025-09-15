<template>
  <div class="gongge-container">
    <!-- 九宫格部分 -->
    <div class="gongge-row" v-for="(row, rowIndex) in chunkedImages" :key="rowIndex">
      <div 
        class="gongge-item" 
        v-for="(item, colIndex) in row" 
        :key="colIndex"
        @click="openModal(rowIndex * 3 + colIndex)"
      >
        <img 
          :src="item.image" 
          :alt="item.alt || '九宫格图片'"
          class="gongge-image"
        >
        <div class="gongge-caption" v-if="item.caption">{{ item.caption }}</div>
      </div>
    </div>

    <!-- 放大模态框 -->
    <div class="modal-overlay" v-if="showModal" @click.self="closeModal">
      <img 
        :src="currentImage.image" 
        :alt="currentImage.alt || '放大图片'"
        class="modal-image"
        @click.stop
      >
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'

const props = defineProps({
  images: {
    type: Array,
    required: true,
    validator: (value) => {
      return value.length === 9 || console.error('九宫格需要 exactly 9 张图片')
    }
  }
})

const showModal = ref(false)
const currentIndex = ref(0)

// 当前显示的图片
const currentImage = computed(() => props.images[currentIndex.value])

// 将一维数组转为 3x3 二维数组
const chunkedImages = computed(() => {
  const result = []
  for (let i = 0; i < props.images.length; i += 3) {
    result.push(props.images.slice(i, i + 3))
  }
  return result
})

function openModal(index) {
  currentIndex.value = index
  showModal.value = true
  document.body.style.overflow = 'hidden' // 禁止背景滚动
}

function closeModal() {
  showModal.value = false
  document.body.style.overflow = ''
}
</script>

<style scoped>
/* 九宫格基础样式 */
.gongge-container {
  display: flex;
  flex-direction: column;
  gap: 8px;
  max-width: 800px;
  margin: 0 auto;
}

.gongge-row {
  display: flex;
  justify-content: center;
  gap: 8px;
}

.gongge-item {
  position: relative;
  flex: 1;
  aspect-ratio: 1;
  overflow: hidden;
  border-radius: 4px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  transition: transform 0.3s ease;
  cursor: pointer;
}

.gongge-item:hover {
  transform: scale(1.03);
}

.gongge-image {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.gongge-caption {
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  background: rgba(0, 0, 0, 0.6);
  color: white;
  padding: 6px;
  font-size: 12px;
  text-align: center;
}

/* 放大模态框样式 */
.modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.8);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;
}

.modal-image {
  max-width: 90%;
  max-height: 90%;
  object-fit: contain;
  cursor: default;
}

/* 响应式设计 */
@media (max-width: 768px) {
  .gongge-row {
    gap: 4px;
  }
  
  .modal-image {
    max-width: 95%;
    max-height: 95%;
  }
}
</style>