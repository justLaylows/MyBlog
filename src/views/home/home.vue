<template>
    <div>
        <rotation-chart :imgs="topImg"></rotation-chart>
        <div class="home">
            <div class="articles">
                <div class="container">
                    <div class="nav">
                        <span>近期更新文章</span>
                        <span id="more" @click="toMore">更多...</span>
                    </div>
                    <articles></articles>
                </div>
            </div>
            <div class="sidebar">
                <div class="wearther">
                     <wearther></wearther>
                </div>
                
                <div class="music">
                    <span>听会音乐吧</span>
                    <music></music>
                </div>
                <div class="tags">
                    <tags></tags>
                </div>

            </div>
        </div>

        <back-top></back-top>
    </div>

</template>

<script>
import RotationChart from 'components/common/RotationChart/RotationChart'
import articles from 'views/article/articles'
import backTop from 'components/common/backtop/backTop'
import music from 'components/content/music/music.vue'
import wearther from './homeChild/wearther.vue'
import tags from './homeChild/tags.vue'

import { getbaseinfo } from '@/network/getbaseinfo'
export default {
    name: 'home',
    created() {
        getbaseinfo('/topimg').then(res => {
            this.topImg = res.data.data;
        })
    },
    data() {
        return {
            topImg: []
        }
    },
    components: {
        RotationChart,
        articles,
        backTop,
        music,
        wearther,
        tags
    },
    methods: {
        toMore() {
            this.$router.push('/searched')
            this.resetSetItem('activeIndex', '/searched')
        }

    }

}
</script>

<style scoped>
.home {
    width: 100%;
    display: flex;
    justify-content: center;

}

.articles {
    flex: 6;
}

.container {
    width: 80%;
    margin-left: 25%;
}

.nav {
    display: flex;
    justify-content: space-between;
    border: 2px solid rgb(174, 170, 170);
    border-radius: 5px;
    box-shadow: 0px 2px 2px 2px rgb(193, 191, 191);
    padding: 15px;
    margin: 40px;
    font-weight: bold;
}

#more:hover {
    color: rgb(17, 100, 210);
}

.sidebar {
    flex: 4;
    display: flex;
    flex-direction: column;
    align-items: center;
}
.wearther{
    margin: 100px 0;
}
.music span{
  font-size: 20px;
  font-weight: bold;
 
}
</style>