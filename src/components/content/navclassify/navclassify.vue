<template>
     <div class="main">
         <div class="classify">
             <span>{{desc.classify}}</span>
         </div>
         <div class="tags">
              <div v-for="(item,index) in desc.tags" :key="index" class="item">
              {{item}}</div>
         </div>
         <div class="sizedesc">
            <div class="size">
              size
            </div>
            <span>{{desc.size}}</span>
         </div>

         <div class="click">
              点击图片可查看原图
         </div>
     </div>
</template>

<script>
export default {
   name:'navclassify',
   props:{
     desc:{
        type:Object,
        default:{}
     }
   }
}
</script>

<style scoped>
 .main{
   margin: auto;
   display: flex;
   flex-direction: column;
 }
 .classify{
    margin: 10px;
 }
 .classify span{
   background-color: rgb(10, 130, 235);
   color: aliceblue;
   padding:7px;
 }
 .tags{
    display: flex;
    align-items: center;
    flex-wrap: wrap;
 }
 .item{
    padding: 5px;
    border-radius:10px;
    margin: 10px;
    background-color: rgb(237, 240, 205);
    color: rgb(7, 156, 57);
    overflow: hidden;
 }
 .sizedesc{
   display: flex;
   justify-content: space-between;
   align-items: center;
 }
 .size{
  color: rgb(12, 109, 227);
  font-size: 26px;
  margin: 10px;
}
.sizedesc span{
    margin:50px ;
}
.click{
   margin: 10px auto;
}
</style>