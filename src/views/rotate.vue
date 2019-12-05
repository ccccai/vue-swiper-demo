<template>
  <div class="swiper-content">
    <swiper ref="mySwiper" :options="swiperOption" class="show-swiper">
      <template v-for="(item, index) in list">
        <swiper-slide :key="index">
          <div class="swiper-item">
            <span>{{ item }}</span>
          </div>
        </swiper-slide>
      </template>
    </swiper>
  </div>
</template>
<script>
import { mapState } from 'vuex'
import store from '@/store'
export default {
  data() {
    return {
      list: [1, 2, 3, 4, 5, 6],
      swiperOption: {
        // 设置slider容器能够同时显示的slides数量，默认为1， 'auto'则自动根据slides的宽度来设定数量
        slidesPerView: 'auto',
        /*
        * 开启这个参数来计算每个slide的progress(进度、进程)
        * 对于slide的progress属性，活动的那个为0，其他的依次减1
        */
        watchSlidesProgress: true,
        // 默认active slide居左，设置为true后居中
        centeredSlides: true,
        // 当你创建一个Swiper实例时是否立即初始化，这里我们手动初始化
        init: false,
        longSwipesRatio: 0.1,
        touchReleaseOnEdges: true,
        observer: true, // 修改swiper自己或子元素时，自动初始化swiper
        observeParents: true, // 修改swiper的父元素时，自动初始化swiper
        on: {
          progress: function() {
            for (let i = 0; i < this.slides.length; i++) {
              const slide = this.slides.eq(i) // 指定匹配元素集缩减值
              const slideProgress = this.slides[i].progress // 当前元素集的progress值

              let modify = 0 // 偏移权重
              if (parseInt(Math.abs(slideProgress)) > 0) {
                modify = Math.abs(slideProgress) * 0.2 // 不一定要0.2，可自行调整
              }
              const translate = slideProgress * modify * 500 + 'px' // 500是swiper-slide的宽度
              const scale = 1 - Math.abs(slideProgress) / 5 // 缩放权重值，随着progress由中向两边依次递减，可自行调整
              const zIndex = 99 - Math.abs(Math.round(10 * slideProgress))
              slide.transform(`translateX(${translate}) scale(${scale})`)
              slide.css('zIndex', zIndex)
              slide.css('opacity', 1) // 是否可见
              if (parseInt(Math.abs(slideProgress)) > 1) { // 设置了只有选中的元素以及他两遍的显示，其他隐藏
                slide.css('opacity', 0)
              }
            }
          },
          slideChange: function() {
            store.commit('SET_ACTIVE_INDEX', this.activeIndex)
          }
        }
      }
    }
  },
  computed: {
    swiper() {
      return this.$refs.mySwiper.swiper
    },
    ...mapState({
      activeItemIndex: state => state.activeIndex
    })
  },
  mounted() {
    this.initSwiper()
  },
  methods: {
    initSwiper() {
      this.$nextTick(async() => {
        await this.swiper.init() // 现在才初始化
        await this.swiper.slideTo(this.activeItemIndex)
      })
    }
  }
}
</script>
<style lang="less">
@import '~@/styles/swiper';
</style>
