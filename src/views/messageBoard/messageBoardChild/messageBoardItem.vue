<template>
    <div class="messageBoardItem">
      <div class="userinfo">
            <el-avatar :src="text.headimg" :size="60"></el-avatar>
            <div class="descinfo">
                  <div class="name">{{text.name}}</div>
                  <div class="bottom">
                    <span>{{text.date}}</span>
                    <span>联系方式:{{text.contact}}</span>
                  </div>
            </div>
      </div>
       <div class="textshow">
           {{text.text}}
       </div>
    </div>
</template>

<script>
export default {
  name:'messageBoardItem',
  props:{
    text:{}
  }
 
}
</script>

<style scoped>
.userinfo{
 display: flex;
 align-items: center;
 margin: 30px;
 
}
.descinfo{
    margin:30px ;
    flex:1;
}
.name{
    font-size: 24px;
    font-weight: bold;
}
.bottom{
    display: flex;
    
    justify-content: space-between;
}
.textshow{
    margin: 30px;
    height: 190px;
    padding: 10px;
    overflow:auto;
    border: 5px solid rgb(119, 115, 115);
    border-radius: 10px ;
    font-size: 18px;
    white-space: pre-line;
}
</style>