<template>
  <div class="journey-map-container">
    <h1 class="page-title">🗺️ 我们的足迹地图</h1>
    <p class="page-subtitle">记录走过的每一个地方，期待下一次相聚</p>

    <!-- 统计信息 -->
    <div class="stats-overview">
      <div class="stat-card visited">
        <div class="stat-icon">✅</div>
        <div class="stat-number">{{ visitedCities.length }}</div>
        <div class="stat-label">已到访城市</div>
      </div>
      <div class="stat-card planned">
        <div class="stat-icon">📍</div>
        <div class="stat-number">{{ plannedCities.length }}</div>
        <div class="stat-label">计划前往</div>
      </div>
     
    </div>

    <!-- 地图展示区 -->
    <div class="map-section">
      <div class="map-controls">
        <button 
          :class="['control-btn', { active: mapView === 'all' }]"
          @click="mapView = 'all'"
        >
          全部城市
        </button>
        <button 
          :class="['control-btn', { active: mapView === 'visited' }]"
          @click="mapView = 'visited'"
        >
          已到访
        </button>
        <button 
          :class="['control-btn', { active: mapView === 'planned' }]"
          @click="mapView = 'planned'"
        >
          计划中
        </button>
      </div>

      <div class="china-map-wrapper">
        <!-- 简化的中国地图背景 -->
        <div class="map-background">
          <svg viewBox="0 0 1000 800" class="china-map-svg">
            <!-- 中国地图轮廓 - 简化版 -->
            <path d="M 200 300 L 250 250 L 300 200 L 400 180 L 500 200 L 600 220 L 700 250 L 750 300 L 780 400 L 750 500 L 700 600 L 600 650 L 500 680 L 400 680 L 300 650 L 250 600 L 200 500 L 180 400 Z" 
                  fill="#f0f4f8" 
                  stroke="#cbd5e0" 
                  stroke-width="2"/>
          </svg>
        </div>

        <!-- 城市标记 -->
        <div class="cities-overlay">
          <!-- 已到访城市 -->
          <div 
            v-for="city in filteredVisitedCities" 
            :key="city.name"
            class="city-marker visited"
            :style="{ left: city.position.x + '%', top: city.position.y + '%' }"
            @click="selectCity(city)"
            :class="{ selected: selectedCity?.name === city.name }"
          >
            <div class="marker-pin visited-pin">
              <div class="pin-icon">📍</div>
            </div>
            <div class="marker-label">{{ city.name }}</div>
            <div class="marker-pulse"></div>
          </div>

          <!-- 计划前往城市 -->
          <div 
            v-for="city in filteredPlannedCities" 
            :key="city.name"
            class="city-marker planned"
            :style="{ left: city.position.x + '%', top: city.position.y + '%' }"
            @click="selectCity(city)"
            :class="{ selected: selectedCity?.name === city.name }"
          >
            <div class="marker-pin planned-pin">
              <div class="pin-icon">🎯</div>
            </div>
            <div class="marker-label">{{ city.name }}</div>
            <div class="marker-pulse planned-pulse"></div>
          </div>

          <!-- 路线连接 -->
          <svg class="route-lines" v-if="mapView === 'all' || mapView === 'visited'">
            <path 
              v-for="(route, index) in routes" 
              :key="index"
              :d="route"
              stroke="#ff6b6b"
              stroke-width="2"
              stroke-dasharray="5,5"
              fill="none"
              opacity="0.5"
            >
              <animate 
                attributeName="stroke-dashoffset" 
                from="0" 
                to="100" 
                dur="3s" 
                repeatCount="indefinite"
              />
            </path>
          </svg>
        </div>
      </div>

      <!-- 城市详情卡片 -->
      <transition name="slide-up">
        <div v-if="selectedCity" class="city-detail-card">
          <button class="close-btn" @click="selectedCity = null">✕</button>
          
          <div class="city-detail-header">
            <div class="city-detail-icon">
              {{ selectedCity.status === 'visited' ? '✅' : '🎯' }}
            </div>
            <div class="city-detail-info">
              <h3 class="city-detail-name">{{ selectedCity.name }}</h3>
              <p class="city-detail-date">{{ selectedCity.date }}</p>
            </div>
          </div>

          <div class="city-detail-content">
            <p class="city-detail-desc">{{ selectedCity.description }}</p>
            
            <div v-if="selectedCity.highlights" class="city-highlights">
              <div class="highlight-title">✨ 精彩瞬间</div>
              <div class="highlights-grid">
                <div 
                  v-for="(highlight, i) in selectedCity.highlights" 
                  :key="i" 
                  class="highlight-tag"
                >
                  {{ highlight }}
                </div>
              </div>
            </div>

            <div v-if="selectedCity.wishlist" class="city-wishlist">
              <div class="wishlist-title">💭 期待体验</div>
              <ul class="wishlist-items">
                <li v-for="(wish, i) in selectedCity.wishlist" :key="i">
                  {{ wish }}
                </li>
              </ul>
            </div>

            <div v-if="selectedCity.status === 'visited' && selectedCity.days" class="city-meta">
              <span class="meta-item">📅 停留 {{ selectedCity.days }} 天</span>
            </div>
            <div v-else-if="selectedCity.status === 'planned'" class="city-meta">
              <span class="meta-item planned-tag">🎯 计划中</span>
            </div>
          </div>
        </div>
      </transition>
    </div>

    <!-- 城市列表 -->
    <div class="cities-list-section">
      <div class="list-column">
        <h3 class="list-title">✅ 已到访的城市</h3>
        <div class="cities-cards">
          <div 
            v-for="city in visitedCities" 
            :key="city.name"
            class="city-list-card visited-card"
            @click="selectCity(city)"
          >
            <div class="card-header">
              <span class="card-icon">📍</span>
              <span class="card-name">{{ city.name }}</span>
            </div>
            <div class="card-date">{{ city.date }}</div>
            <div class="card-desc">{{ city.description }}</div>
          </div>
        </div>
      </div>

      <div class="list-column">
        <h3 class="list-title">🎯 计划前往的城市</h3>
        <div class="cities-cards">
          <div 
            v-for="city in plannedCities" 
            :key="city.name"
            class="city-list-card planned-card"
            @click="selectCity(city)"
          >
            <div class="card-header">
              <span class="card-icon">🎯</span>
              <span class="card-name">{{ city.name }}</span>
            </div>
            <div class="card-date">{{ city.date }}</div>
            <div class="card-desc">{{ city.description }}</div>
          </div>
        </div>
      </div>
    </div>

    <!-- 底部引用 -->
   
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'

const mapView = ref('all') // 'all', 'visited', 'planned'
const selectedCity = ref(null)

// 已到访的城市（带地图坐标）
const visitedCities = ref([
  {
    name: '墨尔本',
    date: '2024年',
    description: '最无忧无虑的时候',
    highlights: ['第一次聊天到深夜', '产生好感'],
    days: 30,
    status: 'visited',
    position: { x: 85, y: 75 } // 右下角表示澳洲
  },
  {
    name: '贵阳',
    date: '2025年4月',
    description: '东山寺表白，确定关系',
    highlights: ['毕业设计', '703教室', '东山寺的傍晚', '确定关系'],
    days: 30,
    status: 'visited',
    position: { x: 45, y: 55 } // 中南部
  },
  {
    name: '大理',
    date: '2025年6月',
    description: '第一次旅行',
    highlights: ['洱海骑行', '山上散步', '独一无二的石头'],
    days: 6,
    status: 'visited',
    position: { x: 35, y: 60 } // 云南位置
  },
  {
    name: '武汉',
    date: '2025年7月',
    description: '小苏来找我',
    highlights: ['民宿做饭', '芋头煮牛肉', '好想天天在一起'],
    days: 7,
    status: 'visited',
    position: { x: 52, y: 45 } // 华中
  },
  {
    name: '重庆',
    date: '2025年8月',
    description: '我去找小苏',
    highlights: ['无人机表演', '做陶瓷', '逛宜家', '想象未来的家'],
    days: 7,
    status: 'visited',
    position: { x: 42, y: 50 } // 西南
  },
  {
    name: '郑州',
    date: '2025年10月',
    description: '国庆相聚',
    highlights: ['只有河南', '开封游玩', '心疼的眼泪'],
    days: 7,
    status: 'visited',
    position: { x: 50, y: 40 } // 中原
  },
  {
    name: '北京',
    date: '2025年11月',
    description: '北京我来也',
    highlights: ['国科大校园', '一起写作业', '情人坡', '罐罐奶茶'],
    days: 2,
    status: 'visited',
    position: { x: 55, y: 25 } // 华北
  }
])

// 计划前往的城市
const plannedCities = ref([
  {
    name: '贵阳',
    date: '2026年寒假',
    description: '梦开始的地方~~~~快进快进快进',
    wishlist: [
      '吃吃吃',
      '逛逛逛',
      '贵阳我们又回来嘞'
    ],
    status: 'planned',
    position: { x: 45, y: 55 }
  },
  {
    name: '威海',
    date: '某个冬天',
    description: '要和宝宝看威海的冬天',
    wishlist: [
      '吃新鲜的海鲜',
      '沿着海岸线骑行',
      '看冬景'
    ],
    status: 'planned',
    position: { x: 60, y: 30 } // 山东半岛
  }
])

// 过滤显示的城市
const filteredVisitedCities = computed(() => {
  if (mapView.value === 'planned') return []
  return visitedCities.value
})

const filteredPlannedCities = computed(() => {
  if (mapView.value === 'visited') return []
  return plannedCities.value
})

// 计算总天数
const totalDays = computed(() => {
  return visitedCities.value.reduce((sum, city) => sum + (city.days || 0), 0)
})

// 生成路线（连接相邻的已访问城市）
const routes = computed(() => {
  if (visitedCities.value.length < 2) return []
  
  const paths = []
  for (let i = 0; i < visitedCities.value.length - 1; i++) {
    const from = visitedCities.value[i].position
    const to = visitedCities.value[i + 1].position
    
    // 创建SVG路径
    const path = `M ${from.x * 10} ${from.y * 8} Q ${(from.x + to.x) * 5} ${(from.y + to.y) * 4} ${to.x * 10} ${to.y * 8}`
    paths.push(path)
  }
  
  return paths
})

// 选择城市
function selectCity(city) {
  selectedCity.value = city
}
</script>

<style scoped>
.journey-map-container {
  max-width: 1600px;
  margin: 0 auto;
  padding: 2rem;
}

.page-title {
  text-align: center;
  font-size: 3rem;
  font-weight: bold;
  margin: 3rem 0 1rem;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
}

.page-subtitle {
  text-align: center;
  color: #666;
  font-size: 1.2rem;
  margin-bottom: 3rem;
}

/* 统计卡片 */
.stats-overview {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 2rem;
  margin: 3rem 0;
}

.stat-card {
  background: white;
  padding: 2rem;
  border-radius: 16px;
  text-align: center;
  box-shadow: 0 4px 16px rgba(0, 0, 0, 0.1);
  transition: all 0.3s ease;
}

.stat-card:hover {
  transform: translateY(-4px);
  box-shadow: 0 8px 24px rgba(0, 0, 0, 0.15);
}

.stat-card.visited {
  border-top: 4px solid #4CAF50;
}

.stat-card.planned {
  border-top: 4px solid #FF9800;
}

.stat-card.total {
  border-top: 4px solid #2196F3;
}

.stat-icon {
  font-size: 3rem;
  margin-bottom: 1rem;
}

.stat-number {
  font-size: 3rem;
  font-weight: bold;
  color: #333;
  margin-bottom: 0.5rem;
}

.stat-label {
  color: #666;
  font-size: 1.1rem;
}

/* 地图区域 */
.map-section {
  background: white;
  border-radius: 24px;
  padding: 2rem;
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.1);
  margin: 3rem 0;
  position: relative;
}

.map-controls {
  display: flex;
  justify-content: center;
  gap: 1rem;
  margin-bottom: 2rem;
}

.control-btn {
  padding: 0.8rem 2rem;
  background: white;
  border: 2px solid #e0e0e0;
  border-radius: 50px;
  font-size: 1rem;
  font-weight: 600;
  color: #666;
  cursor: pointer;
  transition: all 0.3s ease;
}

.control-btn:hover {
  border-color: #ff6b6b;
  color: #ff6b6b;
}

.control-btn.active {
  background: linear-gradient(135deg, #ff6b6b, #ff9e6b);
  border-color: transparent;
  color: white;
}

.china-map-wrapper {
  position: relative;
  width: 100%;
  height: 600px;
  background: linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%);
  border-radius: 16px;
  overflow: hidden;
}

.map-background {
  width: 100%;
  height: 100%;
  position: absolute;
  top: 0;
  left: 0;
}

.china-map-svg {
  width: 100%;
  height: 100%;
}

.cities-overlay {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
}

.route-lines {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  pointer-events: none;
}

/* 城市标记 */
.city-marker {
  position: absolute;
  transform: translate(-50%, -100%);
  cursor: pointer;
  z-index: 10;
  transition: all 0.3s ease;
}

.city-marker:hover,
.city-marker.selected {
  z-index: 20;
  transform: translate(-50%, -100%) scale(1.2);
}

.marker-pin {
  width: 40px;
  height: 40px;
  border-radius: 50% 50% 50% 0;
  transform: rotate(-45deg);
  display: flex;
  align-items: center;
  justify-content: center;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.2);
  position: relative;
}

.visited-pin {
  background: linear-gradient(135deg, #4CAF50, #66BB6A);
}

.planned-pin {
  background: linear-gradient(135deg, #FF9800, #FFA726);
}

.pin-icon {
  transform: rotate(45deg);
  font-size: 1.5rem;
}

.marker-label {
  position: absolute;
  top: 45px;
  left: 50%;
  transform: translateX(-50%);
  white-space: nowrap;
  background: rgba(0, 0, 0, 0.8);
  color: white;
  padding: 0.3rem 0.8rem;
  border-radius: 6px;
  font-size: 0.9rem;
  font-weight: 500;
  opacity: 0;
  transition: opacity 0.3s ease;
}

.city-marker:hover .marker-label,
.city-marker.selected .marker-label {
  opacity: 1;
}

.marker-pulse {
  position: absolute;
  width: 100%;
  height: 100%;
  border-radius: 50%;
  background: rgba(76, 175, 80, 0.4);
  animation: pulse-animation 2s infinite;
}

.planned-pulse {
  background: rgba(255, 152, 0, 0.4);
}

@keyframes pulse-animation {
  0% {
    transform: scale(1);
    opacity: 0.7;
  }
  50% {
    transform: scale(1.5);
    opacity: 0;
  }
  100% {
    transform: scale(1);
    opacity: 0;
  }
}

/* 城市详情卡片 */
.city-detail-card {
  position: absolute;
  bottom: 2rem;
  left: 50%;
  transform: translateX(-50%);
  width: 90%;
  max-width: 600px;
  background: white;
  border-radius: 16px;
  padding: 2rem;
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.2);
  z-index: 100;
}

.close-btn {
  position: absolute;
  top: 1rem;
  right: 1rem;
  width: 32px;
  height: 32px;
  border-radius: 50%;
  border: none;
  background: #f0f0f0;
  cursor: pointer;
  font-size: 1.2rem;
  transition: all 0.3s ease;
}

.close-btn:hover {
  background: #ff6b6b;
  color: white;
}

.city-detail-header {
  display: flex;
  align-items: center;
  gap: 1rem;
  margin-bottom: 1.5rem;
}

.city-detail-icon {
  font-size: 3rem;
}

.city-detail-name {
  font-size: 1.8rem;
  font-weight: bold;
  color: #333;
  margin: 0;
}

.city-detail-date {
  color: #999;
  font-size: 1rem;
  margin: 0.3rem 0 0 0;
}

.city-detail-desc {
  color: #666;
  font-size: 1.1rem;
  line-height: 1.6;
  margin-bottom: 1.5rem;
}

.city-highlights,
.city-wishlist {
  margin: 1.5rem 0;
}

.highlight-title,
.wishlist-title {
  font-weight: 600;
  color: #333;
  margin-bottom: 0.8rem;
  font-size: 1.1rem;
}

.highlights-grid {
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
}

.highlight-tag {
  background: linear-gradient(135deg, #e8f5e9, #c8e6c9);
  color: #2e7d32;
  padding: 0.4rem 1rem;
  border-radius: 20px;
  font-size: 0.9rem;
  border: 1px solid #a5d6a7;
}

.wishlist-items {
  list-style: none;
  padding: 0;
  margin: 0;
}

.wishlist-items li {
  padding: 0.5rem 0;
  padding-left: 1.5rem;
  position: relative;
  color: #666;
}

.wishlist-items li::before {
  content: '💭';
  position: absolute;
  left: 0;
}

.city-meta {
  margin-top: 1rem;
  padding-top: 1rem;
  border-top: 1px solid #f0f0f0;
}

.meta-item {
  color: #666;
  font-size: 0.95rem;
}

.planned-tag {
  background: linear-gradient(135deg, #fff3e0, #ffe0b2);
  color: #e65100;
  padding: 0.4rem 1rem;
  border-radius: 20px;
  border: 1px solid #ffb74d;
  display: inline-block;
}

/* 城市列表 */
.cities-list-section {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(500px, 1fr));
  gap: 3rem;
  margin: 4rem 0;
}

.list-column {
  background: white;
  padding: 2rem;
  border-radius: 16px;
  box-shadow: 0 4px 16px rgba(0, 0, 0, 0.1);
}

.list-title {
  font-size: 1.8rem;
  font-weight: bold;
  color: #333;
  margin-bottom: 1.5rem;
  padding-bottom: 1rem;
  border-bottom: 3px solid #f0f0f0;
}

.cities-cards {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

.city-list-card {
  padding: 1.5rem;
  border-radius: 12px;
  cursor: pointer;
  transition: all 0.3s ease;
}

.visited-card {
  background: linear-gradient(135deg, #e8f5e9, #f1f8e9);
  border-left: 4px solid #4CAF50;
}

.visited-card:hover {
  background: linear-gradient(135deg, #c8e6c9, #dcedc8);
  transform: translateX(4px);
}

.planned-card {
  background: linear-gradient(135deg, #fff3e0, #ffe0b2);
  border-left: 4px solid #FF9800;
}

.planned-card:hover {
  background: linear-gradient(135deg, #ffe0b2, #ffcc80);
  transform: translateX(4px);
}

.card-header {
  display: flex;
  align-items: center;
  gap: 0.8rem;
  margin-bottom: 0.5rem;
}

.card-icon {
  font-size: 1.5rem;
}

.card-name {
  font-size: 1.3rem;
  font-weight: bold;
  color: #333;
}

.card-date {
  color: #666;
  font-size: 0.95rem;
  margin-bottom: 0.5rem;
}

.card-desc {
  color: #666;
  font-size: 1rem;
  line-height: 1.4;
}

/* 底部引用 */
.journey-quote {
  text-align: center;
  padding: 3rem;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  border-radius: 16px;
  color: white;
  margin: 4rem 0;
}

.quote-text {
  font-size: 1.8rem;
  font-style: italic;
  margin-bottom: 1rem;
  font-weight: 300;
}

.quote-author {
  font-size: 1.1rem;
  opacity: 0.9;
}

/* 动画 */
.slide-up-enter-active,
.slide-up-leave-active {
  transition: all 0.3s ease;
}

.slide-up-enter-from {
  opacity: 0;
  transform: translateX(-50%) translateY(20px);
}

.slide-up-leave-to {
  opacity: 0;
  transform: translateX(-50%) translateY(20px);
}

/* 响应式 */
@media (max-width: 1200px) {
  .cities-list-section {
    grid-template-columns: 1fr;
  }
}

@media (max-width: 768px) {
  .page-title {
    font-size: 2rem;
  }

  .china-map-wrapper {
    height: 400px;
  }

  .city-detail-card {
    width: 95%;
    padding: 1.5rem;
  }

  .control-btn {
    padding: 0.6rem 1.2rem;
    font-size: 0.9rem;
  }
}
</style>