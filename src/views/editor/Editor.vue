<template>
    <div class="main">
        <div class="navtitle">
            <el-button type="primary" icon="el-icon-arrow-left" @click.native="$router.go(-1)">返回</el-button>
            <el-input placeholder="请输入内容" v-model="title" class="input">
                <template slot="prepend">标题</template>
            </el-input>
            <el-button type="primary" @click.native="submit">发布</el-button>
        </div>
        <div class="middle">
            <el-input placeholder="请输入地址" v-model="imgUrl" class="imputimg">
                <template slot="prepend">封面</template>
            </el-input>
            <el-select v-model="tag" multiple filterable allow-create default-first-option :multiple-limit="5"
                placeholder="标签类别(5)" class="select">
                <el-option v-for="(item, index) in options" :key="index" :label="item" :value="item">
                </el-option>
            </el-select>
        </div>
        <mavon-editor  ref="md" style="height:800px"/>

    </div>
</template>

<script>
import { mavonEditor } from 'mavon-editor'
import 'mavon-editor/dist/css/index.css'

import { nanoid } from "nanoid"
import moment from 'moment'

import { addArticle } from '@/network/addArticle'
export default {
    name: 'Editor',
    components: {
        mavonEditor
    },
    data() {
        return {
            title: '',
            options: ['前端', '后端', '数据结构'],
            tag: [],
            imgUrl: ''
        }
    },
    methods: {
  
        submit() {
            if (this.checked()) {
                this.$confirm('是否要发布此文章内容', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                }).then(() => {
                    addArticle(this.getinfo()).then(res => {
                        this.$message({
                            type: 'success',
                            message: '发布成功!'
                        });
                        this.$router.go(-1)
                    })
                }).catch(() => {
                    this.$message({
                        type: 'info',
                        message: '取消发布'
                    });
                });
            }


        },
        getinfo() {
            return {
                id: nanoid(),
                date: moment().format('YYYY/MM/DD'),
                title: this.title,
                content: this.$refs.md.d_value,
                like:0,
                visitor:0,
                classify: this.tag,
                fristImgUrl: this.imgUrl,
                comments: {}
            }
        },
        checked() {
            if (this.title == '') {
                this.$message({
                    message: '标题不能为空',
                    type: 'warning'
                });
                return false
            }
            if (this.$refs.md.d_render == '') {
                this.$message({
                    message: '文章内容为空喔~',
                    type: 'error'
                });
                return false
            }
            if (this.tag.length == 0) {
                this.$message({
                    message: '请添加标签类别',
                    type: 'warning'
                });
                return false
            }
            return true


        }
    }

}
</script>

<style scoped>
.main {
    margin: auto;
    width: 90%;
}

.v-note-wrapper {
    min-height: 600px;
}

.navtitle {
    padding: 10% 0 15px 0;
    display: flex;
    justify-content: space-between;
}

.input {
    margin: 0 15px;
    max-width: 800px;
}

.middle {
    display: flex;
    justify-content: space-between;
    align-items: center;
}

.select,
.imputimg {
    flex: 1;
    margin: 30px;
}
</style>