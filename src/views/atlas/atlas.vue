<template>
    <div class="container">
        <div style="height:50px"></div>
        <div class="atlas">
            <div class="nav">
                <div class="classify">
                    <span id="span">分类</span>
                    <el-radio-group v-model="classify" size="small" @change="choosed">
                        <el-radio-button v-for="(item, index) in classifyList"
                         :key="index" :label="item" 
                            class="radio-button">
                        </el-radio-button>
                    </el-radio-group>

                </div>
                <div class="tags">
                    <span id="span">Tags</span>
                    <el-checkbox-group v-model="tags" size="small" @change="choosed" class="group">
                        <el-checkbox-button v-for="item in tagList" :label="item" :key="item" class="checkbox-button">
                            {{ item }}
                        </el-checkbox-button>
                    </el-checkbox-group>


                </div>
            </div>
            <div class="main">
                <!-- <div v-for="(img, index) in currentList" :key="img.imgUrl" class="atla-item" @click="getImg(img,index)">
                    <img v-lazy="img.imgUrl" alt="" id="img">
                </div> -->
                
                    <waterfall  :imgLists="currentList" @submitImg="getImg"></waterfall>
               <div class="later"> {{loadedOver}}</div>
                
            </div>
            
        </div>
        <div class="mask" v-show="isShow" @click="isShow = false">
            <div class="viewPic" @click.stop>
                <div class="Pic">
                    <el-image :src="currentPic.imgUrl" :preview-src-list="srcList" 
                    style="height:100%;width:auto"  >
                    </el-image>
                </div>
                <div class="desc">
                    <navclassify :desc="currentPic">
                    </navclassify>
                    <div class="bottom-turn">
                        <div class="turn">
                            <img src="~assets/img/left.png" alt="" id="left" @click="turn(-1)">
                        </div>
                        <div class="turn">
                            <img src="~assets/img/right.png" alt="" id="right" @click="turn(1)">
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <back-top></back-top>
    </div>
</template>

<script>
import backTop from '@/components/common/backtop/backTop.vue'
import navclassify from '@/components/content/navclassify/navclassify.vue'
import waterfall from './waterfall.vue'

import { getAtlas } from '@/network/getAtlas'
import { throttled } from '@/network/utils/throttled'
import { getbaseinfo } from '@/network/getbaseinfo'
import {preLoad} from '@/network/utils/imgPreLoad'
export default {
    name: 'atlas',
    components: {
        backTop,
        navclassify,
        waterfall
    },
    data() {
        return {
            classify: '',
            tags: [],
            pictureList: [],
            classifyList: [],
            tagList: [],
            currentPage: 0,
            isShow: false,
            currentPic: {},
            srcList: [],
            currentList:[],
            preimgList:[],
            busy:false,
            loadedOver:'拼命加载中...',
            throttleLoadMore:throttled(this.Scrollbottom),

        }
    },
    methods: {
        getNewData(page) {
           this.preimgList=[];
           return new Promise((resolve,reject)=>{
              getAtlas(page).then(res => { 
                if (res.data.code === 200){
                    this.preimgList=res.data.result
                     preLoad(this.preimgList)
                    ++this.currentPage;
                }else{
                    this.loadedOver='被你看光了🙈'
                } 
            }).finally(()=>{
                
                resolve()
            })
           })
        },
        dealNewData(newData){
            if(newData.length===0) return;
            this.pictureList.push(...newData)
            this.choosed();
        },
        loadMore(page,preList){
         this.busy=true;
         this.dealNewData(preList)
         
          this.getNewData(page).then(()=>{
            this.busy=false; 
          });
          
        },
        getImg(item,index) {
            this.currentPic=item;
            this.currentPic.index=index
            this.srcList=[item.imgUrl]
            this.isShow = true
        },
        turn(key){
            const index=this.currentPic.index+key
            if(index>=0&&index<this.currentList.length){
                this.currentPic=this.currentList[index]
             this.srcList=[this.currentPic.imgUrl]
             this.currentPic.index=index;
            }

        },
        Scrollbottom() {
            
            if(this.busy===true) return
             
            let scrollTop = document.documentElement.scrollTop || document.body.scrollTop;
            let clientHeight = document.documentElement.clientHeight;
            let scrollHeight = document.documentElement.scrollHeight;
            const distance=70;
            if (scrollTop + clientHeight >= scrollHeight-distance) {
               
                this.loadMore(this.currentPage,this.preimgList)
            }
        },
        choosed(){
            this.currentList= this.pictureList.filter(item => {
                return this.match(item,this.tags,this.classify)
            });
           
        },
        match(item,tags,classify){
        return (classify==''|| item.classify==classify)&&tags.every(val=>item.tags.includes(val))
        }


    },
    created(){
        getbaseinfo('/atlasbaseinfo').then(res => {
            if (res.data != 'err') {
                this.classifyList = res.data.result.classifies;
                this.tagList = res.data.result.tags
            }

        })
        this.getNewData(this.currentPage).then(()=>{
         this.dealNewData(this.preimgList);
        this.getNewData(this.currentPage);
     });
     
    
    },
    mounted() {
    
        window.addEventListener('scroll', this.throttleLoadMore);

         this.$store.dispatch('updateLoading', false)
       
    },
    beforeDestroy() {
        
        window.removeEventListener('scroll', this.throttleLoadMore)//页面离开后销毁监听事件
    }
}
</script>

<style scoped>

.nav {
    margin: 20px;
    border-radius: 30px;
    border: 1px solid rgb(59, 58, 58);
    box-shadow: 5px 5px 3px rgb(87, 86, 86);
}

.tags,
.classify {
    display: flex;
    /* justify-content: center; */
    align-items: center;
    margin: auto;
}

#span {
    margin: 20px;
    font-size: 20px;
    font-weight: bold;
}

.group {
    display: flex;
    justify-content: flex-start;
    flex-wrap: wrap;
}

.radio-button {
    margin: 10px;
    border: 2px solid rgb(50, 48, 48);
    border-radius: 15px;
    overflow: hidden;
    font-weight: bold;
}

.checkbox-button {
    margin: 10px;
    border: 2px solid rgb(50, 48, 48);
    border-radius: 15px;
    overflow: hidden;
    font-weight: bold;
    flex: 0 0 0 0 20%;
}
.radio-button,.checkbox-button{
    box-shadow: 5px 5px 3px rgb(97, 95, 95);
}
.radio-button:hover,.checkbox-button:hover{
    transform: translate(-1px,-1px);
}

.main {
    margin: auto;
    min-height: 80vh;
    scroll-behavior: smooth;
    
}
.later{
    text-align: center;
    font-size: 24px;
}




.mask {
    position: fixed;
    left: 0;
    top: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, 0.8);
    display: flex;
    justify-content: center;
    align-items: center;
}

.viewPic {
    width: 85%;
    height: 80%;
    margin: auto;
    display: flex;
    background-color: azure;
    border-radius: 5%;

}

.Pic {
    flex: 7;
    margin: 3px;
    border-radius: 5%;
    overflow: hidden;
    display: flex;
    justify-content: center;
}

.desc {
    flex: 3;
    margin: 15px;
    font-size: 20px;
    position: relative;
}
.bottom-turn{
    position:absolute;
    right:50%;
    bottom:0;
    transform: translateX(50%);
    display: flex;

}
.turn{
   height: 60px;
   width: 80px;
   margin: 10px 30px;
}
.turn img{
    width: 100%;
    height: 100%;
}
#left:hover{
   transform: translateX(-2px);
}
#right:hover{
   transform: translateX(2px);
}

</style>