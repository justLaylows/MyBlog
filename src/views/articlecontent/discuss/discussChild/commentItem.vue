<template>
    <div class="comItem">
        <div class="header-img">
            <el-avatar :src="itemcomment.headImg" :size="50"></el-avatar>
        </div>
        <div class="baseinfo">
            <div class="author-info">
                <span class="author-name">{{ itemcomment.name }}</span>
                <span class="author-time">{{ itemcomment.time }}</span>
                <li class="el-icon-chat-dot-square" id="icon" @click.stop="showcombtn" ></li>
            </div>
            <div class="datainfo">
                <span> {{ itemcomment.comment }}</span>
            </div>
            <slot></slot>
        </div>
    </div>

</template>

<script>
import commentHeader from './commentHeader.vue'
export default {
    name: 'commentItem',
    components: {
        commentHeader
    },
    props: {
        itemcomment: {
            type: Object,
            default: {}
        },
        index: {
            type: String,
            default: '-1'
        }
    },

    data() {
        return {

        }
    },
    methods: {
        showcombtn() {
            this.$emit('getindex',this.itemcomment)
        },

    }
}
</script>

<style scoped>
.comItem {
    margin: 10px auto;
    padding-top: 5px;
    display: flex;
    border-top: 1px solid rgb(128, 125, 125);
}

.header-img {
    margin: 0 1%;
}


.baseinfo {
    flex: 18;
}

.author-info {
    display: flex;
    position: relative;
    flex-direction: column;
}

#icon {
    font-size: 20px;
    position: absolute;
    top: 10%;
    right: 20%
}

.author-name {
    font-size: 20px;
    font-weight: bold;

}

.datainfo {
    margin: 10px 30px 0 0;
    font-size: 18px;
    white-space: pre-line;
    word-break: break-all;
}
</style>