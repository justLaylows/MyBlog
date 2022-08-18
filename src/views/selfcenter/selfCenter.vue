<template>
    <div class="form">
        <div class="back" @click="$router.go(-1)">
            <i class="el-icon-d-arrow-left">返回</i>
        </div>
        <el-form ref="form" :model="dataForm" label-width="80px" 
        size="medium" class="datafrom" :disabled="isModify">
            <div class="img" @dblclick="checkHeadPic('hidden')">
                <el-avatar icon="el-icon-user-solid" :size="100" 
                :src="$store.state.headimg">
                </el-avatar>
            </div>
            <el-form-item label="昵称">
                <el-input v-model="dataForm.name"></el-input>
            </el-form-item>
            <el-form-item label="年龄">
                <el-input v-model="dataForm.age"></el-input>
            </el-form-item>
            <el-form-item label="地址">
                <el-input v-model="dataForm.address"></el-input>
            </el-form-item>
            <el-form-item label="邮箱">
                <el-input v-model="dataForm.mailbox"></el-input>
            </el-form-item>
            <el-form-item label="个人描述" prop="desc">
                <el-input type="textarea" v-model="dataForm.desc"></el-input>
            </el-form-item>
        </el-form>
        <div class="btn">
            <el-button type="primary" @click="modify">修改信息</el-button>
            <el-button type="primary" @click="onSubmit" :disabled="isModify">保存修改</el-button>
        </div>
        
        <transition name="fade">
            <div class="originalPic"  v-show="isEnlarge" >
            <img :src="$store.state.headimg" alt="" 
            class="originalImg" @dblclick="checkHeadPic('')">
            <input type="file" ref="inputfile"  accept=".png,.jpg,.svg,.gif,..jpeg" 
            v-show="false" @change="this.uploadImg">
            <el-button type="primary" class="btnHeadPic"
             @click="$refs.inputfile.click()" :loading="isloading">{{btntext}}</el-button>
        </div>
        </transition>
        
    </div>

</template>

<script>
import { getuserInfo } from '@/network/getuserInfo'
import { submitUserInfo } from '@/network/submitUserInfo'
import {uploadImg} from '@/network/uploadImg'
export default {
    name: 'selfCenter',
    created() {
        const username=sessionStorage.getItem('username')||''
        getuserInfo(username).then(res => {
    
            this.dataForm = res.data.userinfo;
        })
    },
    data() {
        return {
            dataForm: {},
            isModify: true,
            isEnlarge: false,
            imgFile:null,
            isloading:false,
            btntext:'更新头像'
        }
    },
    methods: {
        onSubmit() {
            this.$confirm('是否保存修改', '确认', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                iconClass: 'el-icon-user'
            }).then(() => {
                const username=sessionStorage.getItem('username')
                const datainfo={
                    username:username,
                    dataForm: this.dataForm
                }
                submitUserInfo(datainfo).then(() => {
                    this.$message({
                        type: 'success',
                        message: '保存成功!'
                    });
                }).catch(() => {
                    this.$message({
                        type: 'error',
                        message: '保存失败，稍后再试!'
                    });
                })

            }).catch(() => {
                this.$message({
                    type: 'info',
                    message: '取消保存'
                });
            });
            this.isModify = true;

        },

        modify() {
            this.isModify = false;
        },
        checkHeadPic(option) {
            document.querySelector('body').style.overflow = option
            this.isEnlarge = !this.isEnlarge
        },
        uploadImg(){
            this.imgFile= this.$refs.inputfile.files[0];
            if(!this.imgFile) return;
            if(this.imgFile.size>5*1024*1024){
             this.messagebox('warning','图片上传大小最大不超过5M')
             return;
            }
            this.updateButton(true)
           let  formData = new FormData();
           formData.append('file',this.imgFile)
           const username=sessionStorage.getItem('username');
            uploadImg(formData,username).then(res=>{
                if(res.data.code===200){
                this.$store.dispatch('updateHeadImg', res.data.newurl)
                     this.messagebox('success','上传成功')
                }else{
                    throw res;
                }
            }).catch(reason=>{
                this.messagebox('error','上传失败，请稍后再试')
            }).finally(()=>{
                this.updateButton(false)
            })

        },
        messagebox(type,message){
              this.$message({
                    type,
                    message
                 });
         },
         updateButton(flag){
             if(flag){
                this.isloading=true;
                this.btntext='上传中...'
                return
             }
             this.isloading=false;
             this.btntext='更新头像'
         }
         


    }
    


}
</script>

<style scoped>
.back {
    margin-bottom: 30px;
}

.back:hover {
    color: rgb(11, 63, 218);
}

.form {
    width: 50%;
    height: 100vh;
    margin: auto;
    padding: 5%
}

.datafrom {
    width: 60%;
    margin: auto;
}

.img {
    display: flex;
    margin: 50px 0 50px 30px;
    justify-content: center;
}

.btn {
    display: flex;
    justify-content: space-around;
    margin: 10px 10% 0 20%;
}

.fade-enter-active {
	transition: opacity 1s;
 }
 .fade-leave-active{
    transition: opacity 0.5s;

 }
.fade-enter, .fade-leave-to{
    opacity: 0;
}

.originalPic {
    position: fixed;
    top: 0;
    left: 0;
    background-color: rgba(0, 0, 0, 0.8);
    width: 100%;
    height: 100%;
    
}

.originalImg {
    width: 50%;
    height: 80%;
    margin: 5% 25% 0 25%;
    border-radius: 3%;
}
.btnHeadPic{
    margin: 10px 45%;
}
</style>