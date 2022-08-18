<template>
  <el-menu
  :default-active="activeIndex"
  class="el-menu-demo"
  mode="horizontal"
  text-color="#fff"
  active-text-color="#ffd04b"
  @select="select"
  :router="true"
  >
    <el-menu-item v-for="(item,index) in content" :key="index" 
    :index="item.path" >
     {{item.name}}
  </el-menu-item>
  
</el-menu>

    
</template>

<script>
export default {
   name:'NavBar',
   props:{
     content:{
      type:Array,
      default:[]
     }
   },
   data(){
     return {
      activeIndex:sessionStorage.getItem('activeIndex')||'/home'
     }
   },
   methods:{
    select(index){
      sessionStorage.setItem('activeIndex',index)
      this.activeIndex=index
    },
    updateIndex(){
      this.activeIndex = sessionStorage.getItem('activeIndex');
    }
   },
   mounted(){
    window.addEventListener('setItem', this.updateIndex)
   },
   beforeDestroy(){
    window.removeEventListener('setItem', this.updateIndex)
   }
  

}
</script>

<style scoped>
.el-menu-demo{
  width: 100%;
  display: flex;
  justify-content: center;
  border: 0 !important;
  background-color:rgba(28, 28, 33, 0.2);
  
}
.el-menu-item:hover{
  background-color: rgba(69, 66, 66,0.1) !important;
}
.el-menu-item{
   background-color: rgba(26, 25, 25,0) !important;
}

 
</style>