<template>
  <Carousel loop
          v-model="value3"
          :autoplay="setting.autoplay"
          :autoplay-speed="setting.autoplaySpeed"
          :dots="setting.dots"
          :radius-dot="setting.radiusDot"
          :trigger="setting.trigger"
          :arrow="setting.arrow"
          :height="setting.height">
          <CarouselItem>
              <div class="demo-carousel">
                <img src="../assets/1.jpg" alt="">
              </div>
          </CarouselItem>
          <CarouselItem>
              <div class="demo-carousel">
                <img src="../assets/2.jpg" alt="">
              </div>
          </CarouselItem>
          <CarouselItem>
              <div class="demo-carousel">
                <img src="../assets/3.jpg" alt="">
              </div>
          </CarouselItem>
      </Carousel>
</template>

<script>
export default {
  data () {
    return {
      value3: 0,
      setting: {
        autoplay: true,
        autoplaySpeed: 2000,
        dots: 'inside',
        radiusDot: false,
        trigger: 'click',
        arrow: 'hover',
        height: 400
      }
    }
  }
}
</script>

<style>
</style>
