<template>

  <div id="app" :class="{ 'sun': theme, 'night': !theme }">
    <bar-top ref="barTop"></bar-top>
    <keep-alive>
      <router-view v-if="$route.meta.keepAlive">
      </router-view>
    </keep-alive>
    <router-view v-if="!$route.meta.keepAlive"></router-view>
    <introduce></introduce>
    <transition name="loading">
      <router-loading v-show="$store.state.isLoading"></router-loading>
    </transition>

  </div>

</template>

<script>
import BarTop from 'components/content/BarTop/BarTop.vue'
import introduce from './components/content/introduce/introduce.vue';
import routerLoading from './components/common/routerLoading/routerLoading.vue';

export default {
  name: 'App',
  components: {
    BarTop,
    introduce,
    routerLoading
  },
  data() {
    return {
      timer: null
    }
  },

  computed: {
    theme() {
      return this.$store.state.isSun;
    }
  },
  created() {
    this.$router.beforeEach((to, from, next) => {
    
      if (to.path == '/selfCenter' || to.path == '/editor') {
        if (sessionStorage.getItem('username')) {
          next()
        } else {
          this.$confirm('未登录，是否先去登录', '确认', {
            confirmButtonText: '好的呢',
            cancelButtonText: '不了，我先看看',
            type: 'warning'
          }).then(() => {
            next('/login')
          })
        }
      }
      else { 
          if(to.meta.Author){
            this.$store.dispatch('updateLoading', true)
            this.timer=setTimeout(()=>{
              next();
            },1000)
          }else{
             next();
          }
          
      }
    }),
     this.$router.afterEach((to,from)=>{
        document.title=to.meta.title||'博客'
     })

  
  },
  beforeDestroy() {
    clearTimeout(this.timer)
  }
}
</script>

<style lang="less" >
* {
  margin: 0;
  padding: 0;
}

.sun {
  background-color: #fff;
  color: #061925 !important;
}

.night {
  background-color: #061925;
  color: rgb(146, 148, 154) !important;
}

::-webkit-scrollbar {
  height: 10px;
  width: 12px;
}

::-webkit-scrollbar-thumb {
  border-radius: 10px;
  border-style: dashed;
  border-color: transparent;
  border-width: 2px;
  background: linear-gradient(#333336, #2a73cd, #2f3dd7);
  background-clip: padding-box;
}

.loading-enter-active {
  animation: loadingShow .5s ease-in;
}

.loading-leave-active {
  animation: loadingShow .5s reverse ease-in;
}


@keyframes loadingShow {
  0% {

    transform: scale(0, 0);
    border-radius: 100%;
  }

  100% {

    transform: scale(100%, 100%);
    border-radius: 0;
  }
}
</style>
