<template>
  <div @click="seting">
    <comment-header @subCommet="addNewComment"></comment-header>
    <div v-for="(item,key) in comments" :key="key">
      <comment-item :itemcomment="item" :index="key" @getindex="getindex">
        <div v-show="item.prio == 1" class="reply">
          <div v-for="(singe, k) in item.reply" :key="k">
            <comment-item :itemcomment="singe" @getindex="getindex"></comment-item>
          </div>
        </div>
        <div class="commentbtn">
          <comment-header v-show="currentId == key" :index="key" @subCommet="subCommet"></comment-header>
        </div>
      </comment-item>

    </div>
    <h4 class="combottom">到底了~~</h4>
    <back-top></back-top>
  </div>
</template>

<script>
import commentHeader from './discussChild/commentHeader.vue'
import commentItem from './discussChild/commentItem.vue'
import backTop from '@/components/common/backtop/backTop'
import { nanoid } from "nanoid";
export default {
  name: 'discuss',
  components: {
    commentHeader,
    commentItem,
    backTop
  },
  props:{
   comments:{
    type:Object,
    default:()=>{}
   }
  },
  data() {
    return {
      currentId: -1,
      currentcomment: {},
  
    }
  },
  methods: {
    getindex(value) {
      this.currentcomment = value;
      this.currentId = value.toId;
    },
    subCommet(value) {
      if (this.currentcomment.prio == 2) {
         value=this.initcomment(value)
         value.comment = `@${this.currentcomment.name}: ${value.comment}`
        this.$parent.text.comments[this.currentId].reply.push(value)
      }
      else {
        this.$parent.text.comments[this.currentId].reply.push(this.initcomment(value))
      }

      this.seting();
    },
    seting() {
      this.currentId = -1;
      this.currentcomment = {}
    },
    addNewComment(value) {
      const id=nanoid()
      value.toId=id
      this.$set(this.$parent.text.comments,id,value);
    },
    initcomment(value) {
      value.prio = 2;
      value.to = this.currentcomment.name;
      value.toId = this.currentcomment.toId;
      return value;
    }
  }
  
}
</script>
<style scoped >
.reply {
  width: 90%;
  margin: auto;

}

.commentbtn {
  margin-top: 30px;
}

.combottom {
  margin-top: 30px;
  text-align: center;
}
</style>