<template>
  <div class="map-container">
    <h2 class="map-title">🗺️ 我们的足迹</h2>
    <div class="map-wrapper">
      <div class="cities-grid">
        <div 
          v-for="(city, index) in cities" 
          :key="index"
          class="city-card"
          @mouseenter="hoveredCity = index"
          @mouseleave="hoveredCity = null"
          :class="{ 'active': hoveredCity === index }"
        >
          <div class="city-icon">📍</div>
          <div class="city-name">{{ city.name }}</div>
          <div class="city-info">
            <div class="visit-date">{{ city.date }}</div>
            <div class="visit-desc">{{ city.description }}</div>
          </div>
          <div v-if="city.highlights" class="city-highlights">
            <div v-for="(highlight, i) in city.highlights" :key="i" class="highlight-item">
              {{ highlight }}
            </div>
          </div>
        </div>
      </div>
      
      <div class="map-stats">
        <div class="map-stat">
          <span class="stat-value">{{ cities.length }}</span>
          <span class="stat-label">个城市</span>
        </div>
        <div class="map-stat">
          <span class="stat-value">5</span>
          <span class="stat-label">段旅行</span>
        </div>
        <div class="map-stat">
          <span class="stat-value">∞</span>
          <span class="stat-label">个回忆</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'

const hoveredCity = ref(null)

const cities = ref([
  {
    name: '墨尔本',
    date: '2024年',
    description: '最无忧无虑的时候',
    highlights: ['第一次聊天到深夜', '产生好感'],
    days: 30
  },
  {
    name: '贵阳',
    date: '2025年4月',
    description: '东山寺表白',
    highlights: ['毕业设计', '703教室', '东山寺的傍晚', '确定关系'],
    days: 30
  },
  {
    name: '大理',
    date: '2025年6月',
    description: '第一次旅行',
    highlights: ['洱海骑行', '山上散步', '独一无二的石头'],
    days: 6
  },
  {
    name: '武汉',
    date: '2025年7月',
    description: '小苏来找我',
    highlights: ['民宿做饭', '芋头煮牛肉', '好想天天在一起'],
    days: 7
  },
  {
    name: '重庆',
    date: '2025年8月',
    description: '我去找小苏',
    highlights: ['无人机表演', '做陶瓷', '逛宜家', '想象未来的家'],
    days: 7
  },
  {
    name: '郑州',
    date: '2025年10月',
    description: '国庆相聚',
    highlights: ['只有河南', '开封游玩', '心疼的眼泪', '更加思念'],
    days: 7
  },
  {
    name: '北京',
    date: '2025年11月',
    description: '北京我来也',
    highlights: ['国科大校园', '一起写作业', '情人坡', '罐罐奶茶'],
    days: 2
  }
])

const totalDays = computed(() => {
  return cities.value.reduce((sum, city) => sum + city.days, 0)
})
</script>

<style scoped>
.map-container {
  max-width: 1400px;
  margin: 4rem auto;
  padding: 2rem;
  width: 100%;
  box-sizing: border-box;
}

.map-title {
  text-align: center;
  font-size: 2.5rem;
  margin-bottom: 3rem;
  background: linear-gradient(135deg, #f093fb 0%, #f5576c 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  /* 修复：防止文字被截断 */
  padding: 0.5rem 0;
  line-height: 1.2;
  word-break: keep-all;
}

.map-wrapper {
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  border-radius: 24px;
  padding: 3rem;
  box-shadow: 0 20px 60px rgba(0, 0, 0, 0.2);
  /* 修复：确保内容不溢出 */
  width: 100%;
  box-sizing: border-box;
  overflow: hidden;
}

.cities-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
  gap: 1.5rem;
  margin-bottom: 3rem;
}

.city-card {
  background: white;
  padding: 1.5rem;
  border-radius: 16px;
  cursor: pointer;
  transition: all 0.3s ease;
  position: relative;
  overflow: hidden;
  /* 修复：确保卡片内容完整显示 */
  box-sizing: border-box;
}

.city-card::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: linear-gradient(135deg, rgba(255, 107, 107, 0.1), rgba(255, 158, 107, 0.1));
  opacity: 0;
  transition: opacity 0.3s ease;
}

.city-card:hover::before,
.city-card.active::before {
  opacity: 1;
}

.city-card:hover,
.city-card.active {
  transform: translateY(-8px) scale(1.03);
  box-shadow: 0 12px 40px rgba(0, 0, 0, 0.15);
}

.city-icon {
  font-size: 2.5rem;
  margin-bottom: 0.5rem;
  animation: pulse 2s infinite;
}

.city-name {
  font-size: 1.5rem;
  font-weight: bold;
  color: #333;
  margin-bottom: 0.5rem;
  /* 修复：防止长文字溢出 */
  word-break: keep-all;
  overflow-wrap: break-word;
}

.city-info {
  margin-bottom: 1rem;
}

.visit-date {
  color: #ff6b6b;
  font-weight: 600;
  margin-bottom: 0.3rem;
}

.visit-desc {
  color: #666;
  font-size: 0.95rem;
  line-height: 1.4;
  /* 修复：确保描述文字完整显示 */
  word-break: keep-all;
  overflow-wrap: break-word;
}

.city-highlights {
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
  margin-top: 1rem;
}

.highlight-item {
  background: linear-gradient(135deg, #fff5f5, #ffe5e5);
  color: #ff6b6b;
  padding: 0.3rem 0.8rem;
  border-radius: 20px;
  font-size: 0.85rem;
  border: 1px solid #ffcccb;
  /* 修复：防止标签文字溢出 */
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  max-width: 100%;
}

.map-stats {
  display: flex;
  justify-content: space-around;
  align-items: center;
  background: rgba(255, 255, 255, 0.95);
  padding: 2rem;
  border-radius: 16px;
  backdrop-filter: blur(10px);
  /* 修复：确保统计信息完整显示 */
  gap: 2rem;
  flex-wrap: wrap;
  box-sizing: border-box;
}

.map-stat {
  text-align: center;
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  /* 修复：确保每个统计项有足够空间 */
  min-width: 120px;
  flex: 1;
}

.stat-value {
  font-size: 3rem;
  font-weight: bold;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  /* 修复：确保数字完整显示 */
  line-height: 1.2;
  padding: 0.2rem 0;
  word-break: keep-all;
}

.stat-label {
  font-size: 1rem;
  color: #666;
  /* 修复：确保标签完整显示 */
  white-space: nowrap;
  line-height: 1.4;
}

@keyframes pulse {
  0%, 100% {
    transform: scale(1);
  }
  50% {
    transform: scale(1.1);
  }
}

@media (max-width: 768px) {
  .map-container {
    padding: 1rem;
  }

  .map-title {
    font-size: 2rem;
  }
  
  .map-wrapper {
    padding: 1.5rem;
  }
  
  .cities-grid {
    grid-template-columns: 1fr;
    gap: 1rem;
  }
  
  .map-stats {
    flex-direction: column;
    gap: 1.5rem;
    padding: 1.5rem;
  }

  .map-stat {
    min-width: auto;
    width: 100%;
  }
  
  .stat-value {
    font-size: 2.5rem;
  }

  .stat-label {
    font-size: 0.9rem;
  }
}

@media (max-width: 480px) {
  .map-title {
    font-size: 1.5rem;
  }

  .stat-value {
    font-size: 2rem;
  }

  .city-name {
    font-size: 1.2rem;
  }
}
</style>