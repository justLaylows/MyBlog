<template>
    <div class="card" @click="enterArticle">
        <div class="contents">
            <p id="title">{{ singArtic.title }}</p>
            <div id="describle">
                <span>
                    {{ singArtic.content.substring(0, 120) }}
                </span>
            </div>
            <div class="bottom">
                <div class="tags">
                    <span v-for="(item, index) in singArtic.classify" :key="index" class="label">
                        {{ item }}
                    </span>
                </div>

                <span>{{ singArtic.date }}</span>
            </div>
        </div>
        <div class="imgbox">
            <img :src="singArtic.fristImgUrl" class="image">
        </div>

    </div>


</template>

<script>

export default {
    name: 'artItem',
    props: {
        singArtic: ''
    },
    data() {
        return {
          
        };
    },
    methods: {
        enterArticle() {
            this.$router.push(`/articlecontent/${this.singArtic.id}`)
        }
       
    }

}
</script>

<style scoped>
.card {
    height: 300px;
    display: flex;
    border: 5px solid rgb(222, 217, 217);
    border-radius: 10px;

    margin: 30px;
}

.card:hover {
    transform: translate(1px, -3px);
    box-shadow: 5px 5px 0px 3px rgba(16, 16, 16, 0.1);
    border: 5px solid rgb(10, 153, 236)
}


.contents {
    flex: 6;
    margin: 15px;
    position: relative;

}

#title {
    height: 15%;
    margin: 10px;
    font-size: 27px;
    overflow: hidden;
    display: -webkit-box;
    -webkit-box-orient: vertical;
    -webkit-line-clamp: 1;
}

#describle {
    height: 50%;
    margin: 10px;
    font-size: 20px;
    overflow: hidden;
    display: -webkit-box;
    -webkit-box-orient: vertical;
    -webkit-line-clamp: 5;
}

.bottom {
    height: 20%;
    margin: 10px;
    display: flex;
    justify-content: space-between;
    align-items: center;

}
.tags{
    overflow: hidden;
    display: flex;
    flex-wrap: wrap;
}

.label {
    background-color: rgb(245, 248, 241);
    color: rgb(78, 201, 78);
    margin: 5px;
    padding:2px;
    border-radius:3px ;
}

.imgbox {
    flex: 4;
    margin: 30px;
    display: flex;
    justify-content: center;
}

.image {
    width: 100%;
    height: 100%;
    border-radius: 2px;
}
</style>