<script setup>
import { ref, onMounted } from 'vue'
import emailjs from 'emailjs-com'

const props = defineProps({
  // EmailJS 公钥（必填）
  publicKey: {
    type: String,
    required: true,
    default: 'RCqO2KpLVX9quuOQ8', // 你的 EmailJS 公钥
    validator: value => value.startsWith('RCqO2KpLVX9quuOQ8') // 验证公钥格式
  }
})

// 固定参数（根据你的需求预设）
const toEmail = '' // 目标邮箱
const emailSubject = '来自网站的联系消息' // 邮件主题
const emailBody = '你好' // 邮件内容

const isLoading = ref(false)
const isSent = ref(false)
const error = ref(null)

// 初始化 EmailJS
onMounted(() => {
  emailjs.init(props.publicKey)
})

const sendEmail = () => {
  isLoading.value = true
  error.value = null

  emailjs.send(
    'service_wamaduo',      // 你的 Service ID
    'template_p2v04jp',     // 你的 Template ID
    {
      to_email: toEmail,     // 固定目标邮箱
      subject: emailSubject, // 固定主题
      message: emailBody,    // 固定内容
      from_email: '',        // 发件人邮箱（可选）
      from_name: '网站访客'  // 发件人名称（可选）
    }
  )
  .then(() => isSent.value = true)
  .catch(err => {
    error.value = err.text || `发送失败: ${err.message}`
  })
  .finally(() => isLoading.value = false)
}
</script>

<template>
  <div class="email-sender">
    <button 
      @click="sendEmail"
      :disabled="isLoading || isSent"
      class="send-button"
      :class="{ 'loading': isLoading, 'sent': isSent }"
    >
      <span v-if="isLoading">发送中...</span>
      <span v-else-if="isSent">✓ 已发送</span>
      <span v-else>发送邮件</span>
    </button>
    <div v-if="error" class="error-message">
      {{ error }}
    </div>
  </div>
</template>

<style scoped>
.email-sender {
  margin: 1rem 0;
}

.send-button {
  padding: 0.6rem 1.2rem;
  background-color: #42b883;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  transition: background-color 0.2s;
}

.send-button:hover:not(:disabled) {
  background-color: #3aa876;
}

.send-button:disabled {
  opacity: 0.7;
  cursor: not-allowed;
}

.send-button.loading {
  background-color: #f1b44c;
}

.send-button.sent {
  background-color: #34a853;
}

.error-message {
  margin-top: 0.5rem;
  color: #ff4d4f;
  font-size: 0.9rem;
}
</style>