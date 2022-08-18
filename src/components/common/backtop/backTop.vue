<template>
    <div :class="{ 'left': isShow, 'right': !isShow }" @click="backtop" id="backtop">
        <img src="~assets/img/backtopicon.png" alt="" class="icon">
    </div>
</template>

<script>
import {throttled} from '@/network/utils/throttled'
export default {
    name: 'backTop',
    mounted() {
        window.addEventListener("scroll",throttled(this.scrollListener) )
    },
    props: {
        h: {
            type: Number,
            default: 1500
        },
        time:{
            type:Number,
            default:1000
        }
    },
    data() {
        return {
            isShow: false
        }
    },
    methods: {
        backtop() {
            let top=document.documentElement.scrollTop
            const timeTop = setInterval(() => {
                document.body.scrollTop = document.documentElement.scrollTop = top -=30000/this.time
                if (top <= 0) {
                    clearInterval(timeTop)
                }
            }, 1)
        },
        scrollListener() {
            let html = document.documentElement
            if (html.scrollTop >= this.h) {
                this.isShow = true
            } else {
                this.isShow = false
            }
        }

    },
    beforeDestroy() {
        window.removeEventListener("scroll",throttled(this.scrollListener))
    }

}
</script>

<style scoped>
#backtop {
    width: 50px;
    position: fixed;
    bottom: 8%;
    font-size: 30px;
}

.left {
    right: 3%;
    transition: all 0.8s;
}

.right {
    right: -10%;
    transition: all 0.8s;
}

.icon {
    width: 100%;
    height: 100%;
}
</style>