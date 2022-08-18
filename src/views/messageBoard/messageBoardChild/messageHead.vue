<template>
    <div class="messageHead">
        <div class="headimg">
        <el-avatar :src="userinfo.headPictureUrl" :size="80"></el-avatar>
         <span id="name">{{userinfo.name}}</span>
        </div>
        <el-input type="textarea" :rows="4" maxlength="150"  show-word-limit
        placeholder="请输入留言内容" v-model="text" class="input" >
        </el-input>
         <el-button type="success" class="btn" size="small" @click.native="submit">发送留言</el-button>
    </div>
</template>

<script>
import { updateMessage } from '@/network/updateMessage';
import { getuserInfo } from '@/network/getuserInfo';
import moment from 'moment'
export default {
    name: 'messageHead',
    data(){
        return {
            text:'',
            userinfo:{}
        }
    },
    methods:{
        submit(){
            if(this.text!==''){
                const msg={
                    headimg:this.userinfo.headPictureUrl,
                    date:moment().format('YYYY年MM月DD日 HH:mm'),
                    name:this.userinfo.name,
                    contact:this.$parent.contact,
                    text:this.text
                }
              updateMessage(msg).then(v=>{
                 this.$message({
                            type: 'success',
                            message: '留言成功!'
                        });
                   
                    this.dealData(msg);
              })
              
            }else{
                 this.$message({
                            type: 'warning',
                            message: '留言输入不能为空'
                        });
            }
         
            
        },
        dealData(msg){
            const len= this.$parent.messages.length-1;
             if(this.$parent.messages[len].length<10){
                     this.$parent.messages[len].push(msg)
             }else{
                  this.$parent.messages.push([msg])
             }
                this.text='';
                this.$parent.contact=''
        }
    },
    created(){
        const username=sessionStorage.getItem('username')||''
        getuserInfo(username).then(res => {
    
            this.userinfo = res.data.userinfo;
        })
    }
}
</script>

<style scoped>
.messageHead{
    display: flex;
    justify-content: center;
    align-items: center ;
}
.headimg{
    flex:1;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    
}
#name{
    margin-top:5px ;
}
.input{
    flex: 9;
    margin:0 30px;
}
.btn{
    margin-top:60px ;
}
</style>