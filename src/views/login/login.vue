<template>
    <div class="container">
        <div class="dowebok"  :class="{ 'right-panel-active': isMove }">
            <div class="form-container sign-up-container">
                <div class="register">
                    <h1>注册</h1>
                    <input type="text" id="idcard" placeholder="用户名" v-model="registerinfo.user">

                    <input type="text" id="Username"  placeholder="密码" v-model="registerinfo.password">

                    <input type="password" id="Password2" placeholder="确认密码" v-model="registerinfo.repassword">
                    <button @click="regisetrSubmit">注册</button>
                </div>
            </div>
            <div class="form-container sign-in-container">

                <h1 class="login">登录</h1>
                <input id="name" type="text" placeholder="姓名" v-model="logininfo.user">
                <input id="password" type="password" placeholder="密码" v-model="logininfo.password">
                <a href="###">忘记密码？</a>
                <button id="login" @click="logincheck">登录</button>

            </div>
            <div class="overlay-container">
                <div class="overlay">
                    <div class="overlay-panel overlay-left">
                        <h1>已有帐号？</h1>
                        <p>请使用帐号进行登录</p>
                        <button class="ghost" id="signIn" @click="isMove = !isMove">登录</button>
                    </div>
                    <div class="overlay-panel overlay-right">
                        <h1>没有帐号？</h1>
                        <p>注册加入我们，和我们一起开始旅程吧</p>
                        <button class="ghost" id="signUp" @click="isMove = !isMove">注册</button>
                    </div>
                </div>
            </div>
        </div>
    </div>

</template>


<script>
import {login} from '@/network/login/login'
import { register } from '@/network/login/register'
export default {
    name: 'login',
    data() {
        return {
            isMove: false,
            logininfo:{
                user:'',
                password:''
            },
            registerinfo:{
                user:'',
                password:'',
                repassword:'',
            }
        }
    },
    methods: {
        logincheck(){
            login(this.logininfo).then(res=>{
                 if(res.data.statuscode==200){
                        this.$message({
                            type: 'success',
                            message: '登录成功'
                        });
                    sessionStorage.setItem('username',this.logininfo.user)
                       this.$router.push('/home')
                       this.$store.dispatch('updateHeadImg',res.data.headimg)
                       
                 }else{
                     this.$message({
                            type: 'error',
                            message: '密码或账号错误'
                        });
                 }
            })
        },
        regisetrSubmit(){
            if(this.checkregisetr(this.registerinfo)){
                register(this.registerinfo).then(res=>{
                   
                   if(res.data.statuscode==200){
                      this.$message({
                            type: 'success',
                            message: '注册成功'
                        });  
                        this.registerinfo.user='';
                        this.registerinfo.password=''
                        this.registerinfo.repassword=''
                   }else{
                      this.$message({
                            type: 'warning',
                            message: '用户名已存在'
                        });
                   }
            }) 
            }
        
            
        },
        checkregisetr(info){
             if(info.user.length<=1){
                this.$message({
                            type: 'warning',
                            message: '用户名长度不小于2'
                        });
                        return false;
             }
             if(info.password.length<=5){
                this.$message({
                            type: 'warning',
                            message: '密码至少6位'
                        });
                 return false;
             }
             if(info.password!==info.repassword){
                this.$message({
                            type: 'error',
                            message: '两次密码输入不一致'
                        });
                 return false;
             }
             return true;
        }

    },
     mounted(){
         this.resetSetItem('activeIndex', '/home')
        this.$store.dispatch('updateLoading', false);
        document.querySelector('body').style.overflow = 'hidden';
    
    },
    beforeDestroy(){
      document.querySelector('body').style.overflow = '';
    }
    

}
</script>

<style scoped>
* {
    box-sizing: border-box;
}
.container{
    position: fixed;
    left:0;
    top:0;
    width: 100%;
    height: 100vh;
    display: flex;
    justify-content: center;
    align-items: center;
    background: url(~assets/img/bag.png) no-repeat ;
    background-size:cover;
    color: #fff;
}
.container input{
    font-size: 18px ;
}

h1 {
    font-weight: bold;
    margin: 0;
}

p {
    font-size: 14px;
    line-height: 20px;
    letter-spacing: .5px;
    margin: 20px 0 30px;
}

span {
    font-size: 12px;
}

a {
    color: #fff;
    font-size: 14px;
    text-decoration: none;
    margin: 15px 0;
}

.dowebok {
    background: rgba(0, 0, 0, .25);
    border-radius: 10px;
    box-shadow: 0 14px 28px rgba(0, 0, 0, .25), 0 10px 10px rgba(0, 0, 0, .22);
    position: relative;
    overflow: hidden;
    width: 768px;
    max-width: 100%;
    min-height: 480px;
}

.form-container form {
    background:rgba(0, 0, 0, .25);
    display: flex;
    flex-direction: column;
    padding: 0 50px;
    height: 100%;
    justify-content: center;
    align-items: center;
    text-align: center;
}

.social-container {
    margin: 20px 0;
}

.social-container a {
    border: 1px solid #ddd;
    border-radius: 50%;
    display: inline-flex;
    justify-content: center;
    align-items: center;
    margin: 0 5px;
    height: 40px;
    width: 40px;
}

.social-container a:hover {
    background-color: #eee;
}

.form-container input {
    background: #eee;
    border: none;
    padding: 12px 15px;
    margin: 8px 0;
    width: 100%;
    outline: none;
}

button {
    border-radius: 20px;
    border: 1px solid rgba(0,0,0,0.3);
    background: rgba(0,0,0,0.3);;
    color:  #fff;
    font-size: 12px;
    font-weight: bold;
    padding: 12px 45px;
    letter-spacing: 1px;
    text-transform: uppercase;
    transition: transform 80ms ease-in;
    cursor: pointer;
}

button:active {
    transform: scale(.95);
}

button:focus {
    outline: none;
}

button.ghost {
    background: transparent;
    border-color:  #fff;
}

.form-container {
    position: absolute;
    top: 0;
    height: 100%;
    transition: all .6s ease-in-out;
    margin: 80px 50px 50px 50px;

}

#name,
#password {
    width: 65%;
    margin-right:10px;
}

.login {
    margin: 0 0 30px 90px;
}

#login {
    margin-left: 70px
}

.sign-in-container {
    left: 0;
    width: 50%;
    z-index: 2;
}

.sign-up-container {
    left: 0;
    width: 50%;
    z-index: 1;
    opacity: 0;
}

.register {
    width: 70%;
    display: flex;
    flex-direction: column;
    align-items: center;
}

.overlay-container {
    position: absolute;
    top: 0;
    left: 50%;
    width: 50%;
    height: 100%;
    overflow: hidden;
    transition: transform .6s ease-in-out;
    z-index: 100;
}

.overlay {
    background: rgba(0,0,0,0.3);
    color: #fff;
    position: relative;
    left: -100%;
    height: 100%;
    width: 200%;
    transform: translateY(0);
    transition: transform .6s ease-in-out;
}

.overlay-panel {
    position: absolute;
    top: 0;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    padding: 0 40px;
    height: 100%;
    width: 50%;
    text-align: center;
    /* transform: translateY(0); */
    transition: transform .6s ease-in-out;
}

.overlay-right {
    right: 0;
    transform: translateY(0);
}

.overlay-left {
    transform: translateY(-20%);
}

/* Move signin to right */
.dowebok.right-panel-active .sign-in-container {
    transform: translateY(100%);
}

/* Move overlay to left */
.dowebok.right-panel-active .overlay-container {
    transform: translateX(-100%);
}

/* Bring signup over signin */
.dowebok.right-panel-active .sign-up-container {
    transform: translateX(100%);
    opacity: 1;
    z-index: 5;
}

/* Move overlay back to right */
.dowebok.right-panel-active .overlay {
    transform: translateX(50%);
}

/* Bring back the text to center */
.dowebok.right-panel-active .overlay-left {
    transform: translateY(0);
}

/* Same effect for right */
.dowebok.right-panel-active .overlay-right {
    transform: translateY(20%);
}
</style>