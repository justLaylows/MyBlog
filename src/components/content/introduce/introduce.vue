<template>
    <div class="introduce">
        <div class="left">
            <h3>Celebrity-Blog</h3>
            <h4>仅供学习使用 本博客为个人兴趣爱好 无任何盈利用途</h4>
        </div>
        <div class="right">
            <h3>基于vue+element-ui开发</h3>
            <h4>项目地址:  <a href="https://github.com/justLaylows" style="text-decoration: none;">https://github.com/justLaylows</a></h4>
           
        </div>
    </div>
</template>

<script>
export default {
 name:'introduce'
}
</script>

<style scoped>
   .introduce{
    margin:150px 0 0 0;
    display: flex;
    height: 70px;
    padding: 20px 40px;
    justify-content: space-between;
    border-top: 1px solid rgb(216,216,216) ;
    border-radius:30px ;
    color: rgb(167, 165, 165);
    box-shadow: 3px -3px 3px 3px rgb(166, 163, 163);
   }
</style>