import { defineConfig } from 'vitepress'

export default defineConfig({
   base: '/',
  head: [
    ['link', { rel: 'icon', href: '/111.jpg' }], // 保留原有的 favicon
    ['link', { rel: 'stylesheet', href: '/.vitepress/theme/style.css' }] // 新增 CSS 引入
  ],
//  appearance:'dark',
  locales: {
    root: {
      label: '简体中文',
      lang: 'zh-CN',
      // 为中文版本单独配置themeConfig
      // themeConfig: {
      //   nav: [
      //     { text: '首页', link: '/' },
      //     { text: '示例', link: '/markdown-examples' }
      //   ],
      //   sidebar: [
      //     {
      //       text: '示例',
      //       items: [
      //         { text: 'Markdown 示例', link: '/markdown-examples' },
      //         { text: 'API 示例', link: '/api-examples' }
      //       ]
      //     }
      //   ]
      // }
    }
    // en: {
    //   label: 'English',
    //   lang: 'en',
    //   link: '/en/',
    //   // 为英文版本单独配置themeConfig
    //   // themeConfig: {
    //   //   nav: [
    //   //     { text: 'Home', link: '/en/' },
    //   //     { text: 'Examples', link: '/en/markdown-examples' }
    //   //   ],
    //   //   sidebar: [
    //   //     {
    //   //       text: 'Examples',
    //   //       items: [
    //   //         { text: 'Markdown Examples', link: '/en/markdown-examples' },
    //   //         { text: 'API Examples', link: '/en/api-examples' }
    //   //       ]
    //   //     }
    //   //   ]
    //   // }
    // }
  },

  themeConfig: {
   
    logo: '/111.jpg',
    siteTitle: 'Susu project',
    
    // 全局的nav配置（用于语言切换菜单）
    nav: [
      // {
      //   text: '语言',
      //   items: [
      //     { text: '简体中文', link: '/' },
      //     { text: 'English', link: '/en/' }
      //   ]
      // },
      { text: '首页', link: '/' }, 
      { text: '回忆录', link: '/markdown-examples' },
      { text: '想你的证据', link: '/api-examples' },
    ],
     sidebar: [
      {
        text: 'Examples',
        items: [
          { text: '回忆录', link: '/markdown-examples' },
          { text: '想你的证据', link: '/api-examples' }
        ]
      }
    ],

    // socialLinks: [
    //   { icon: 'github', link: 'https://github.com/vuejs/vitepress' }
    // ]
  }
  
})