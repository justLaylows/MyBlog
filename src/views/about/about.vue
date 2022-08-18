<template>
    <div class="about">
        <div class="top"></div>
        <div class="container">
            <div class="headimg">
                <img src="~assets/img/self/self.jpg" alt="" class="img">
            </div>
            <div class="say">
                <p v-for="(item, index) in aboutme" 
                :style="{'animation-delay': index*0.5 +'s'}">
                    {{ item }}
                </p>
                <p :style="{'animation-delay': 9 +'s'}">
                    代码开源地址：
                    <a href="https://github.com/justLaylows" style="text-decoration: none;">
                        https://github.com/justLaylows</a>
                </p>
            </div>

        </div>

    </div>
</template>

<script>
import { getbaseinfo } from '@/network/getbaseinfo'
export default {
    name: 'about',
    created() {
        getbaseinfo('/aboutme.json').then(res => {
            this.aboutme = res.data;
        })
    },
    data() {
        return {
            aboutme: []
        }
    },
    mounted(){
        this.$store.dispatch('updateLoading', false)
    }

}
</script>

<style scoped>
.top {
    height: 150px;
}

.container {
    width: 90%;
    margin: auto;
    border: 2px solid rgb(51, 50, 50);
    box-shadow: 5px 5px rgb(86, 84, 84);
    border-radius: 30px;
}

.headimg {
    width: 15%;
    height: 15%;
    margin:50px auto;
}

.img {
    width: 100%;
    height: 100%;
    border-radius: 50%;
}

.say {
    margin: 50px;
    text-align: center;

}
.say p{
    line-height:35px;
    opacity: 0;
    animation: 1s show ease-out forwards;
}
@keyframes show {
     0% {
        opacity: 0;
    }
    100% {
        opacity: 1;
    }
}


</style>