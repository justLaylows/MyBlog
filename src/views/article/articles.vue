<template>
  <div>
      <div v-for="(item, index) in artciles" :key="index">
        <art-item :singArtic="item"></art-item>
      </div>
  </div>
</template>

<script>
import artItem from './articleChild/artItem.vue'
import { getbaseinfo } from '@/network/getbaseinfo'
export default {
  naem: 'articles',
  components: {
    artItem,
  
  },
  data() {
    return {
      artciles: [],
    }
  },
  created() {
    getbaseinfo('/getarticle').then(res => {
      this.artciles = res.data.data
    })
  }

}
</script>

<style scoped>
</style>