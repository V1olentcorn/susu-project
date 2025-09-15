import DefaultTheme from 'vitepress/theme'
import ImageSlider from '../components/ImageSlider.vue'
import Gongge from '../components/gongge.vue'
import QRCode from '../components/qrcode.vue'
import ImageTrailCursor from '../components/Imagetrail/index.vue'
import video from '../components/video.vue'
import Story from '../components/story.vue'
import 'vue-amazing-ui/dist/style.css'
import { Flex, TextScroll } from 'vue-amazing-ui'
import Textlist from '../components/Textlist.vue'
import { List, ListItem, Avatar } from 'vue-amazing-ui'
import '../theme/style.css'
import timecount from '../components/timecount.vue'
import selfpic from '../components/selfpic.vue'
import EmailButton from '../components/emailbutton.vue'
import zhixie from '../components/zhixie.vue'
export default {
  extends: DefaultTheme,
  enhanceApp({ app }) {
    app.component('ImageSlider', ImageSlider)
    app.component('Gongge',Gongge)
    app.component('QRCode', QRCode)
    app.component('ImageTrailCursor', ImageTrailCursor) 
    app.component('video', video)
    app.component('story',Story)
    app.component('Flex', Flex)
    app.component('TextScroll', TextScroll)
    app.component('TextList',Textlist)
    app.component('selfpic',selfpic)
    app.component('timecount',timecount)
     app.component('EmailButton', EmailButton)
     app.component('zhixie',zhixie)
  },
  vite: {
    ssr: {
      noExternal: ['vue-amazing-ui']
    }
  }
}
