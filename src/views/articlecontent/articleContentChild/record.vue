<template>
    <div class="navRecord" :class="{'navShow':navShow}">
    
    <li class="el-icon-back" @click="$router.go(-1)"></li> 
     
     <div class="like" @click="getLike">
        <img src="~assets/img/like.png" alt="" v-show="!isLike" >
        <img src="~assets/img/likeRed.png" alt="" v-show="isLike">
        
     </div>
      <li class="el-icon-view"><span class="num">{{num}}</span></li>
      
    </div>
</template>

<script>
import {throttled} from '@/network/utils/throttled'
export default {
 name:'record',
 props:{
   num:'',
   height:{
    type:Number,
    default:200
   }
 },
 data(){
    return {
        isLike:false,
        navShow:true
    }
 },
 methods:{
    scrollListener() {
            let html = document.documentElement
            if (html.scrollTop >= this.height) {
                this.navShow = false
            } else {
                this.navShow = true
            }
            
        },
        getLike(){
           this.isLike=!this.isLike
          this.$parent.text.like+=this.isLike?1:-1;
        }

       
 },
 mounted(){
     window.addEventListener("scroll", throttled(this.scrollListener))
 },
  beforeDestroy() {
        window.removeEventListener("scroll", throttled(this.scrollListener))
    }
}
</script>

<style scoped>
 .navRecord{
    position: fixed;
    left:10%;
    top:150px;
    width: 40px;
    display: flex;
    flex-direction: column;
    justify-content: center;
    z-index: 3;
    transition: all 0.5s;
 }
 .navShow{
    opacity: 0;
   transition: all 0.2s;
 }
 .navRecord img{
    width: 100%;
    height: 100%;
 }
.like{
    margin: 30px 0;
}
 .like:hover{
  animation: rotate 1.2s ;
 }
 .el-icon-view,.el-icon-back{
    font-size: 32px;
   
 }
 .el-icon-view:hover,.el-icon-back:hover{
     color: rgb(16, 109, 230);
 }
 .num{
    font-size: 10px;
 }
 @keyframes rotate {
    0%{
        transform: rotateZ(0);
    }
    100%{
        transform: rotateZ(360deg);
    }
 }
</style>