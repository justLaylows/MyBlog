<template>
    <div class="messageBoard">
        <div style="height:80px"></div>
        <div class="main">
            <div class="msgTop">
                <li class="el-icon-edit-outline"></li>
                <span>留言板</span>
            </div>
            <div>有什么想说的话可以留言告诉我哦~</div>
            <div class="contacted">
                <span>留下您的联系方式</span>
                <el-input v-model="contact" placeholder="邮箱或QQ~~" class="el-input"></el-input>
            </div>
            <message-head></message-head>
            <div v-for="(item, index) in messages[currentIndex]" :key="index">
                <message-board-item :text="item"></message-board-item>
            </div>

            <div class="paging">
                <el-pagination layout="prev, pager, next" :total="messages.length*10" 
                background
            @current-change="updateIndex">
            </el-pagination>
            </div>
        </div>
       <back-top></back-top>
    </div>
</template>

<script>
import messageHead from './messageBoardChild/messageHead.vue'
import messageBoardItem from './messageBoardChild/messageBoardItem.vue'
import backTop from '@/components/common/backtop/backTop.vue'

import { getbaseinfo } from '@/network/getbaseinfo'
export default {
    name: 'messageBoard',
    components: {
        messageHead,
        messageBoardItem,
        backTop
    },
    data() {
        return {
            contact: '',
            messages: [],
            currentIndex:0,
        }
    },
    created() {
        getbaseinfo('/getmessageBoard').then(res => {
            const msg=res.data.msg;
            for(let i=0;i<msg.length;i+=10){
                this.messages.push([...msg.slice(i,i+10)])
            }
            
        }) 
    },
    methods:{
        updateIndex(index){
             this.currentIndex=index-1;
        }
    },
    mounted(){
        this.$store.dispatch('updateLoading', false)
    }
}
</script>

<style scoped>
.messageBoard {
    width: 60%;
    margin: auto;
    min-width: 70vh;
}

.main {
    border: 5px solid rgb(154, 151, 151);
    border-radius: 10px;
    padding: 30px;
    box-shadow: 0px 7px 7px 7px rgb(127, 125, 125);
}

.msgTop {
    display: flex;
    margin: 15px 0px;
    font-size: 25px;
}

.msgTop li {
    font-size: 45px;
}


.msgTop span {
    margin-left: 10px;
}

.contacted {
    display: flex;
    align-items: center;
    margin: 30px;
}

.el-input {
    width: 300px;
    margin-left: 30px;

}
.paging{
    display: flex;
    flex-direction: column;
    align-items: center;
}
</style>