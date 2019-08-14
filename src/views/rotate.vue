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
        slidesPerView: 'auto',
        watchSlidesProgress: true,
        centeredSlides: true,
        init: false,
        on: {
          progress: function() {
            for (let i = 0; i < this.slides.length; i++) {
              const slide = this.slides.eq(i)
              const slideProgress = this.slides[i].progress

              let modify = 0
              if (parseInt(Math.abs(slideProgress)) > 0) {
                modify = Math.abs(slideProgress) * 0.1 + 1
              }
              const translate = slideProgress * modify * 150 + 'px'
              const scale = 1 - Math.abs(slideProgress) / 5
              const zIndex = 99 - Math.abs(Math.round(10 * slideProgress))
              slide.transform(`translateX(${translate}) scale(${scale})`)
              slide.css('zIndex', zIndex)
              slide.css('opacity', 1)
              if (parseInt(Math.abs(slideProgress)) > 1) {
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
