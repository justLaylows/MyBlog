<template>
  <el-carousel height="750px" :interval="5000">
    <el-carousel-item v-for="(item, index) in imgs" :key="index">
      <img :src="item.imgurl" alt="" class="itemimg">
    </el-carousel-item>
    <div class="info"><img src="~assets/img/decs.png" alt=""></div>
  </el-carousel>
</template>

<script>
export default {
  name: 'RotationChart',
  props: {
    imgs: {
      type: Array,
      default: []
    }

  },
  data() {
    return {

    }
  }
}
</script>

<style scoped>
.el-carousel__item:nth-child(2n) {
  background-color: #99a9bf;
}

.el-carousel__item:nth-child(2n+1) {
  background-color: #d3dce6;
}

.itemimg {
  height: 100%;
  width: 100%;
  ;
}

.info {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  z-index: 9;
}
</style>