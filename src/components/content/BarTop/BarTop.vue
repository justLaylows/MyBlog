<template>
    <div class="bartop">
        <div class="nav">
            <nav-bar :content="content"></nav-bar>
        </div>
        <div id="icon">
            <div @click="change" class="theme">
                <i class="el-icon-moon-night" v-show="isSun"></i>
                <i class="el-icon-sunny" v-show="!isSun"></i>
            </div>
            <div class="self">
                <el-dropdown>
                    <el-avatar  :src="$store.state.headimg" :size="35"></el-avatar>
                    <el-dropdown-menu slot="dropdown" class="el-drop">
                        <el-dropdown-item @click.native="$router.push('/selfCenter')">个人中心</el-dropdown-item>
                        <el-dropdown-item @click.native="$router.push('/editor')">写文章</el-dropdown-item>
                        <el-dropdown-item  @click.native="quit">退出</el-dropdown-item>
                    </el-dropdown-menu>
                </el-dropdown>

            </div>

        </div>

    </div>

</template>

<script>
import NavBar from '@/components/common/Nav/NavBar.vue'

import { getuserInfo } from '@/network/getuserInfo'
export default {
    name: 'BarTop',
    components: {
        NavBar
    },
    created(){
        const username=sessionStorage.getItem('username')
        getuserInfo(username).then(res=>{
         this.$store.dispatch('updateHeadImg', res.data.userinfo.headPictureUrl)
         
       })
     
       
    },
    data() {
        return {
            content: [{
               name: '首页',
               path:'/home'
            },
            {
               name: '文章',
               path:'/searched'
            },
            {
               name: '留言板',
               path:'/messageBoard'
            },
            {
               name: '图集',
               path:'/atlas'
            },
            {
               
                name: '关于',
               path:'/about'
            },
            ],
         isSun: false,
         headPicture:''
    }
    },
    methods: {
        change() {
            this.isSun = !this.isSun
            this.$store.dispatch('changecolorpath', this.isSun);
        },
        quit(){
            this.$router.push('/login');
            sessionStorage.removeItem('username');
            this.$store.dispatch('updateHeadImg','https://cube.elemecdn.com/0/88/03b0d39583f48206768a7534e55bcpng.png')
        }

    },
}
</script>

<style scoped>
.bartop {
    width: 100%;
    position: fixed;
    top: 0px;
    left: 0px;
    display: flex;
    z-index: 99;
}

.nav {
    flex: 17
}

#icon {
    color: #fff;
    font-size: 20px;
    display: flex;
    justify-content: space-around;
    align-items: center;
    flex: 3;
    background-color: rgba(28, 28, 33, 0.2);
}

.theme:hover {
    color: rgb(32, 159, 223);
}

.self {
    margin-top: 5px;
}

.el-drop {
    background-color: rgba(200, 200, 208, 0.8);

}
</style>