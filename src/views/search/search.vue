<template>
    <div class="search">
        <div style="height:80px">

        </div>
        <div class="box">
            <div class="header">
                <li class="el-icon-document"> 文章 Articles</li>
                <div>
                    <el-autocomplete v-model="inputvalue" 
                    :fetch-suggestions="selctedSearch" placeholder="请输入内容"
                        :trigger-on-focus="false" @select="inputSearch"
                        @input="clearRes"
                        >
                        <el-button slot="append" icon="el-icon-search" @click="inputSearch"></el-button>
                    </el-autocomplete>
                </div>
            </div>
            <div class="middle">
                <div class="tags">
                    <span id="span">Tags</span>
                    <el-checkbox-group v-model="choosed" size="small" @change="getNewData">
                        <el-checkbox-button v-for="item in tags" :label="item" :key="item" class="checkbox-button">
                            {{ item }}
                        </el-checkbox-button>
                    </el-checkbox-group>


                </div>
                <div class="choosed" v-show="choosed.length != 0">
                    <span id="span">Selected</span>
                    <div class="tagsitem">
                        <el-tag v-for="item in choosed" :key="item" closable @close="handleClose(item)" class="el-tag">
                            {{ item }}
                        </el-tag>
                    </div>


                </div>

                <div class="sorted">
                    <span id="span">Sort</span>
                    <el-radio-group v-model="sortWay" size="small" @change="getNewData">

                        <el-radio-button v-for="(item, index) in sortList" :key="index" :label="item"
                            class="checkbox-button">
                        </el-radio-button>

                    </el-radio-group>

                </div>

            </div>
            <div class="line">
                <span id="line">★,,♫◦★,,♫◦★,,♫◦★,,♫◦★,,♫◦★,,♫◦★,,♫◦★,,♫◦</span>
                <span id="textline">为你查询到{{ dataLength }}条数据</span>
                <span id="line">◦♫,,★◦♫,,★◦♫,,★◦♫,,★◦♫,,★◦♫,,★◦♫,,★◦♫,,★</span>
            </div>
            <el-empty :image-size="200" v-show="result.length == 0"></el-empty>
            <div class="searchresult">
                <div class="item" v-for="(item, index) in showData[currentPage]" :key="index">
                    <art-item :singArtic="item"></art-item>
                </div>

            </div>
            <div class="bottom">
                <el-pagination layout="prev, pager, next" :total="showData.length*10" @current-change="updateData">
                </el-pagination>
            </div>
            <back-top></back-top>
        </div>

    </div>
</template>

<script>
import artItem from '../article/articleChild/artItem.vue'
import backTop from '@/components/common/backtop/backTop.vue'

import { searchdata } from '@/network/searchdata'
import { getbaseinfo } from '@/network/getbaseinfo'
export default {
    name: 'search',
    data() {
        return {
            inputvalue: '',
            choosed: [],
            sortWay: '',
            tags: [],
            sortList: ['默认', '时间倒序', '时间正序', '评论数', '点赞量', '访客量'],
            currentPage: 0,
            result: [],
            showData: []

        }
    },
    components: {
        artItem,
        backTop
    },
    methods: {
        handleClose(vaule) {
            this.choosed.splice(this.choosed.indexOf(vaule), 1);
            this.getNewData()
        },
        getNewData() {
            searchdata({
                choosed: this.choosed,
                sortway: this.sortWay,
            }).then(res => {
                this.result = res.data.result
                this.paging(this.result)
            })
        },
        initData() {
            this.choosed = sessionStorage.getItem('choosed') || [];
            this.sortWay = sessionStorage.getItem('sortWay') || '默认';
        },
        saveData() {
            sessionStorage.setItem('choosed', this.choosed);
            sessionStorage.setItem('sortWay', this.sortWay);
        },
        updateData(page) {
            this.currentPage = page - 1;
        },
        paging(result) {
            this.showData = []
            let k = 0;
            for (let i = 0; i < result.length; i += 10) {
                this.showData[k] = [...result.slice(i, i + 10)]
                k++;
            }
        },
        selctedSearch(target, cb) {
            let selectRes = []
            this.result.forEach((item) => {
                if (item.title.toLowerCase().includes(target.toLowerCase())) {
                    selectRes.push({
                        value: item.title
                    })
                }
            })
            selectRes = selectRes.slice(0,7)
            cb(selectRes)
        },
        inputSearch() {
            const inputSearchtRes = this.result.filter((item) => {
                return item.title.includes(this.inputvalue)
            })
            this.paging(inputSearchtRes)
        },
        clearRes(){
            if(this.inputvalue==='')
            this.paging(this.result)
        }
        

    },
    computed:{
        dataLength(){
           return this.showData.reduce((pre,item)=>{
                  return  pre+item.length
            },0)
        }
    },
    created() {
        getbaseinfo('/tags').then(res => {
            this.tags = res.data.tags
        })
        this.sortWay = sessionStorage.getItem('sortWay') || '默认'
        let temp = sessionStorage.getItem('choosed')
        this.choosed = !temp || temp == '' ? [] : temp.split(',')
        this.getNewData()
    },
    beforeDestroy() {
        sessionStorage.setItem('sortWay', this.sortWay)
        sessionStorage.setItem('choosed', this.choosed.join())
    },
    mounted(){
        this.$store.dispatch('updateLoading', false)
    }
    



}
</script>

<style scoped>
.search {
    width: 65%;
    margin: auto;
}

.box {

    border: 3px solid rgb(46, 45, 45);
    border-radius: 20px;
    box-shadow: 5px 5px rgba(0, 0, 0, 0.3);
}

.header {
    display: flex;
    margin: 35px;
    justify-content: space-between;
    align-items: center;
}


.el-icon-document {
    font-size: 25px;
}

.middle {
    font-size: 24px;
    display: flex;
    flex-direction: column;
    justify-content: space-around;
    margin: 30px;
}

#span {
    margin-right: 20px;
}

#span:hover {
    animation: swing 2s;
}

.block,
.tags,
.sorted,
.choosed {
    display: flex;
    align-items: center;

}

.checkbox-button,
.el-tag {
    margin: 10px;
    border: 2px solid rgb(50, 48, 48);
    border-radius: 15px;
    overflow: hidden;
    font-weight: bold;
}

.tagsitem {
    display: flex;
    flex-wrap: wrap;
}

.el-tag {
    flex: 0 0 0 0 20%;
}


.line {

    margin: 10px;
    overflow: hidden;
    display: flex;
    justify-content: space-around;
}

#line {
    margin: 0 20px;
    color: rgb(96, 157, 236);
    flex: 1;
    text-align: center;
}

#textline {
    color: bisque;
    word-break: keep-all;
}

.bottom {
    display: flex;
    justify-content: center;
}

@keyframes swing {

    /*创建动画*/
    20% {
        -webkit-transform: rotate(10deg);
    }

    40% {
        -webkit-transform: rotate(-10deg);
    }

    60% {
        -webkit-transform: rotate(10deg);
    }

    80% {
        -webkit-transform: rotate(-10deg);
    }

    100% {
        -webkit-transform: rotate(10deg);
    }
}
</style>