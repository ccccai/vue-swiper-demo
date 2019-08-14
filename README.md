# vue-swiper-demo
基于Vue-Awesome-Swiper实现的滑动轮播项目，有旋转叠加和平移两个效果


# Vue-Awesome-Swiper 介绍
[Swiper4](http://www.swiper.com.cn) component for Vue, support pc and mobile, SPA and SSR.

基于 [Swiper4](http://www.swiper.com.cn)、适用于 Vue 的轮播组件，支持服务端渲染和单页应用。

# Install
``` bash
npm install vue-awesome-swiper --save
```

### main.js

#### 全局引入

``` javascript
import VueAwesomeSwiper from 'vue-awesome-swiper'
import 'swiper/dist/css/swiper.css'

Vue.use(VueAwesomeSwiper, /* { default global options } */)
```

#### 组件内引入

```javascript
<script>
import 'swiper/dist/css/swiper.css'
import { swiper, swiperSlide } from 'vue-awesome-swiper'

export default {
  components: {
    swiper,
    swiperSlide
  }
}
</script>
```