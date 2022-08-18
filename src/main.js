import Vue from 'vue'
import App from './App.vue'
import VueLazyLoad from 'vue-lazyload'
import store from './store/index'
import router from './router';
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';

Vue.config.productionTip = false

Vue.use(ElementUI)
Vue.use(VueLazyLoad,{
  error:require('assets/img/err.jpg'),                //报错时需要的图片
  loading:require('assets/img/load.gif')				  //加载时需要的图片
})

Vue.prototype.resetSetItem = function (key, newVal) {
  if (key === 'activeIndex') {

      // 创建一个StorageEvent事件
      var newStorageEvent = document.createEvent('StorageEvent');
      const storage = {
          setItem: function (k, val) {
              sessionStorage.setItem(k, val);

              // 初始化创建的事件
              newStorageEvent.initStorageEvent('setItem', false, false, k, null, val, null, null);

              // 派发对象
              window.dispatchEvent(newStorageEvent)
          }
      }
      return storage.setItem(key, newVal);
  }
}

new Vue({
  store,
  render: h => h(App),
  router,
}).$mount('#app')
