<template>
    <div @click.stop>
        <div class="header">
            <div class="peopleicon">
                <el-avatar icon="el-icon-user-solid" :src="selfinfo.headPictureUrl"></el-avatar>
            </div>
            <div class="input">
                <el-input type="textarea" autosize placeholder="请输入评论..." v-model="inputContent">
                </el-input>
            </div>
        </div>
        <div class="btn">
            <el-button @click.native="submit" type="primary">发表评论</el-button>
        </div>
    </div>

</template>

<script>
import { getuserInfo } from '@/network/getuserInfo'
import moment from 'moment'

export default {
    name: 'commentHeader',
    props: {
        index: {
            type: String,
            default: '-1'
        }

    },
    data() {
        return {
            inputContent: '',
            selfinfo:{}
        }
    },
    created() {
        const username=sessionStorage.getItem('username')
        getuserInfo(username).then(res => {
            this.selfinfo = res.data.userinfo;
        })
    },
    methods: {
        submit() {
            if (this.inputContent == '') {
                this.$message({ message: '评论不能为空' });
            } else {
                this.$emit('subCommet', {
                    name: this.selfinfo.name,
                    prio:1,
                    to:this.selfinfo.name,
                    toId:this.index,
                    headImg:this.selfinfo.headPictureUrl,
                    comment: this.inputContent,
                    time: moment().format('YYYY年MM月DD日 HH:mm'),
                    reply: []
                });
                this.inputContent = '';
                this.$message({
                    showClose: true,
                    message: '评论成功',
                    type: 'success'
                });

            }
        }
    }
}
</script>

<style scoped>
.header {
    margin: 0 2%;
    display: flex;
    justify-content: space-around;
}

.peopleicon {
    flex: 2;

}

.input {
    flex: 20;
}

.btn {
    margin: 10px 3% 0 0;
    display: flex;
    justify-content: right;
}
</style>