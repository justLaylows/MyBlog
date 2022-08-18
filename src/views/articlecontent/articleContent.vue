<template>
    <div class="text">
        <record :num="text.visitor"></record>
        <div class="topImg">
            <img :src="text.fristImgUrl" alt="">
        </div>
        <div class="content">
            <h2 class="title">{{ text.title }}</h2>
            <div class="date">发布于 {{ text.date }}
            <li class="el-icon-thumb">{{text.like}}</li>
            </div>
            
            <div class="contentData">
                <mavon-editor :value="getHtML()" 
                :subfield="false" defaultOpen="preview" 
                :toolbarsFlag="false"
                :editable="false" 
                style="z-index:0"
                previewBackground="#ececec"
                ></mavon-editor>
            </div>
            <div class="middle"></div>
            <div class="discuss">
                <div class="explain">
                    <h3>评论区</h3>
                </div>
                <discuss :comments="text.comments"></discuss>
            </div>
        </div>
        <back-top></back-top>
    </div>
</template>

<script>

import record from './articleContentChild/record.vue'
import discuss from './discuss/discuss';
import backTop from '@/components/common/backtop/backTop.vue';

import { marked } from 'marked';
import { getArticleCotent } from '@/network/getArticleCotent';
import {saveArticle} from '@/network/saveArticle'

import { mavonEditor } from 'mavon-editor'
import 'mavon-editor/dist/css/index.css'
export default {
    name: 'articleContent',
    components: {
        discuss,
        backTop,
        mavonEditor,
        record
    },
    created() {
        getArticleCotent(this.$route.params.id).then(res => {
            this.text = res.data.result
            
        }),
        document.addEventListener('copy',this.dealCopy);

       
    },
    data() {
        return {
            text: {}
        }
    },
    methods:{
        getHtML(){
            return marked(this.text.content||'')
        },
        dealCopy(event){
          
        // clipboardData 对象是为通过编辑菜单、快捷菜单和快捷键执行的编辑操作所保留的，也就是你复制或者剪切内容
        let clipboardData = event.clipboardData || window.clipboardData;
        // 如果未复制或者未剪切，则return出去
        if (!clipboardData) { return; }
        // Selection 对象，表示用户选择的文本范围或光标的当前位置。
        //     声明一个变量接收 -- 用户输入的剪切或者复制的文本转化为字符串
        let text = window.getSelection().toString();
        if (text) {
            // 如果文本存在，首先取消文本的默认事件
            event.preventDefault();
            // 通过调用常clipboardData对象的 setData(format, data) 方法；来设置相关文本
 
            // setData(format, data);参数
            // format
            // 一个DOMString 表示要添加到 drag object的拖动数据的类型。
            // data
            // 一个 DOMString表示要添加到 drag object的数据。
            clipboardData.setData('text/plain', text + '\n-----------\n 文章版权归此博客所有，转载请注明来源');
        }
    
        }

    },
    beforeDestroy(){
        this.text.visitor+=1;
       saveArticle(this.text);
     document.removeEventListener('copy',this.dealCopy);
    },
    mounted(){
        this.$store.dispatch('updateLoading', false)
    }
   


}
</script>

<style scoped>
.text {
    position: relative;
}


.date {
    margin: auto;
    text-align: center;
}
.el-icon-thumb{
   margin-left:15px ;
}

.topImg {
    height: 350px;
    text-align: center;
    overflow: hidden;
    position: relative;
}

.topImg>img {
    position: absolute;
    left:0;
    top:50%;
    transform: translateY(-50%);
    height: auto;
    width: 100%;
}

.content {
    width: 60%;
    margin: 30px auto;
    padding-bottom: 50px;
    border-radius: 10px;
    border: 5px solid rgb(46, 45, 45);
    background-color:rgb(236,236,236);;

}

.listData {
    width: 80%;
    min-height: 500px;
    margin: 15% auto;
    text-align: center;
}


.title {
    margin: 30px;
    text-align: center;
}

.contentData {
    margin: 5% auto;

}

.middle {
    height: 100px;
}

.discuss {
    border-radius: 2px;
    width: 80%;
    margin: auto;
}

.explain {
    height: 100px;
    padding-top: 30px;
    text-align: center;

}
</style>