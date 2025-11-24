<script setup lang="ts">
import Giscus from '@giscus/vue'
import DefaultTheme from 'vitepress/theme'

// 1. 获取默认主题的 Layout 组件
const { Layout } = DefaultTheme
</script>

<template>
  <Layout>
    <template #doc-after>
      <div style="margin-top: 24px; padding-top: 24px; border-top: 1px solid var(--vp-c-divider);">
        <Giscus
          repo="V1olentcorn/susu-project"
          repo-id="R_kgDOPwLobg"
          category="Announcements"
          category-id="DIC_kwDOPwLobs4Cy3ak"
          mapping="pathname"
          strict="0"
          reactions-enabled="1"
          emit-metadata="0"
          input-position="bottom"
          theme="preferred_color_scheme"
          lang="zh-CN"
        />
      </div>
    </template>
  </Layout>
</template>