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
        // 设定slide与左边框的预设偏移量（单位px）
        slidesOffsetBefore: 37,
        // 设置slide之间的距离（单位px）
        spaceBetween: 17,
        centeredSlides: true,
        init: false,
        on: {
          progress: function() {
            for (let i = 0; i < this.slides.length; i++) {
              const slide = this.slides.eq(i)
              const slideProgress = this.slides[i].progress

              const scale = 1 - Math.abs(slideProgress) / 5 // 缩放权重值，随着progress由中向两边依次递减，可自行调整
              slide.transform(`scale3d(${scale}, ${scale}, 1)`)
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
