<template>
  <div id="app">
    <router-view v-if="computerShow"/>
    <h3 class="tip" v-if="phoneShow">
      为了给您更好的体验，请使用电脑进行访问！
    </h3>
  </div>
</template>

<script>
export default {
  data() {
    return {
      computerShow: true,
      phoneShow: false
    }
  }
  // mounted() {
  //   var w = document.documentElement.clientWidth
  //   console.log(w)
  //   if (w < 1000) {
  //     this.computerShow = false
  //     this.phoneShow = true
  //   }
  // }
}
</script>

<style scoped>
  .tip{
    /* 方法一: 需要有宽度和高度再能水平垂直居中 */
/*    position: absolute;
    left: 0;
    top: 0;
    right: 0;
    bottom: 0;
    margin: auto; */
    /* 方法二: */
    position: absolute;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
    color: #1ABC9C;
  }
</style>
