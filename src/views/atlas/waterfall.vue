<template>
    <div id="waterfall" :style="{'height':boxHeight+'px'}">
        <transition-group  name="waterfallImg">
         <div v-for="(item, index) in divList" class="waterfallItem" :key="item.url" 
        :style="{
            'width': item.width + 'px',
            'height': item.height + 'px',
            'left': item.left + 'px',
            'top': item.top + 'px'
         }"
         @click="submitData(item.originalImg,index)"
         >
            <img alt="" v-lazy="item.url">
        </div>
        </transition-group>
        
    </div>
</template>

<script>

import { debounce } from '@/network/utils/debounce'
export default {
    name: 'waterfall',
    props: {
        imgLists: {
            type: Array,
            default: []
        },
        columns: {
            type: Number,
            default: 5
        }
    },
    data() {
        return {
            imgHeight: 0,
            imgWidth: 0,
            imgGrap: 15,
            observer: null,
            columnHeights: [],
            positionLeft: 0,
            positionTop: 0,
            divList: [],
            debounceResize: null,
            boxHeight:0

        }
    },
    methods: {
        preImgLoad() {
            this.initData();
            this.imgLists.forEach(item => {
                const { height, width, left, top } = this.getImgPosition(item.size)
                this.divList.push({
                    originalImg:item,
                    url: item.imgUrl,
                    height, width, left, top
                })

            })
        },

        getImgPosition(target) {

            const size = target.split('x');

            const w = size[0] * 1, h = size[1] * 1;
            const minHeightIndex = this.getMinHeight();

            const height = h * this.imgWidth / w;

            this.columnHeights[minHeightIndex] += height + this.imgGrap;
            return {
                height,
                width: this.imgWidth,
                left: minHeightIndex * this.positionLeft,
                top: this.positionTop
            }
        },
        getMinHeight() {
            this.positionTop = Math.min(...this.columnHeights)
            return this.columnHeights.indexOf(this.positionTop)
        },
        initData() {
            this.imgWidth = document.getElementById('waterfall').offsetWidth / this.columns - this.imgGrap;
            this.positionLeft = this.imgWidth + this.imgGrap;
            this.columnHeights = new Array(this.columns).fill(0);
            this.divList = []
        },
        submitData(img,index){
            this.$emit('submitImg',img,index)
        }
    

    },
    mounted() {
        this.debounceResize = debounce(this.preImgLoad);
        window.addEventListener('resize', this.debounceResize)
       
    },
    
    watch: {
        imgLists: { //可监听到对象、数组的变化
            handler(newV, oldV) {
                this.preImgLoad();
                this.boxHeight=Math.max(...this.columnHeights)
                
            },
        }
    },

}
</script>


<style scoped>
#waterfall {
    position: relative;
    width: 100%;
    height: 100%;
}

.waterfallItem {
    position: absolute;
    border: 1px solid rgb(97, 95, 95);
    border-radius: 5%;
    box-shadow: 10px 10px 7px rgba(31, 30, 30, 0.5);
    overflow: hidden;
    transform: toTopShow 2s;
}

.waterfallItem:hover {
    transform: translate(-3px, -3px);
}

.waterfallItem img {
    width: 100%;
    height: 100%;

}

.waterfallImg-enter-active {
    animation: all .5s ease;
}

.waterfallImg-enter {
    transform: translateY(50px);
    opacity: 0.5;
    
}

</style>