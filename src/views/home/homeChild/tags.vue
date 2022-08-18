<template>
       <div class="skulls">
         <div class="box">
        <span></span>
        <span></span>
        <span></span>
        <span></span>
        <div class="content">
          <div class="tag">
            <div v-for="(item,index) in tags" :key="index" 
            class="itemTag" @click="toArticle(index)">
             {{item}}
            </div>
       </div>
        </div>
        
      </div>
 </div>
   
</template>

<script>
import { getbaseinfo } from '@/network/getbaseinfo'
export default {
  name:'tags',
  data(){
    return {
        tags:[]
    }
  },
  methods:{
      toArticle(index){
          sessionStorage.setItem('choosed',this.tags[index])
          this.$router.push('/searched')
           this.resetSetItem('activeIndex', '/searched')
      }
  },
   created() {
        getbaseinfo('/tags').then(res => {
            this.tags = res.data.tags
            this.tags=this.tags.slice(0,30)
        })
    },

}
</script>

<style scoped>
.skulls{
    width: 60%;
    border-radius:10px ;
    position: relative;
    margin: 50px auto;


}
.tag{
    
    display: flex;
    flex-wrap: wrap;
}
.itemTag{
    padding:7px;
    font-size:18px ;
    margin: 20px;
    border: 3px solid rgb(138, 136, 136);
    border-radius: 7px ;
    box-shadow: 3px 3px 2px rgb(113, 110, 110);
    color: rgb(90, 185, 42);
    background-color: rgb(97, 101, 100);
    z-index: 2;
}
.itemTag:hover{
    transform: translate(-2px,-2px);
}
.box{
  position: relative;
  background: #111845a6;
  box-sizing: border-box;
  overflow: hidden;
  box-shadow: 0 20px 50px rgb(23, 32, 90);
  border: 2px solid #2a3cad;
  color: white;
  padding: 20px;
}


 .content{
  border:1px solid #f0a591;
  text-align:center;
  box-shadow: 0 5px 10px rgba(9,0,0,0.5);
  
}

.box span{
  position: absolute;
  width: 100%;
  height: 100%;
  display: block;
  box-sizing: border-box;
  z-index: 1;
  
}

.box span:nth-child(1)
{ 
  top: 0;
  left: 0;
  transform:rotate(0deg);
}

.box span:nth-child(2)
{

  top: 0;
  left: 50%;
  transform: rotate(90deg)   translateY(50%);  
}

.box span:nth-child(3)
{
  top: 0;
  left: 0;
  transform:rotate(180deg) ;
}

.box span:nth-child(4)
{
  top: 0;
  left: -50%;
  transform:rotate(270deg) translateY(50%);
}

.box span:before
{
  content: '';
  position: absolute;
  width:100%;
  height: 7px;
  background: #50dfdb;
  animation: animate 4s linear infinite;
}

@keyframes animate {
  0% {
  transform:scaleX(0);
  transform-origin: left;
  }
  50%
  {
    transform:scaleX(1);
  transform-origin: left;
  }
  50.1%
  {
    transform:scaleX(1);
  transform-origin: right;
    
  }
  
  100%
  {
    transform:scaleX(0);
  transform-origin: right;
    
  }
  
  
}  
</style>