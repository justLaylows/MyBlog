<template>
    <div class="music">
        <div class="img">
            <img src="https://w.wallhaven.cc/full/28/wallhaven-287eg9.jpg" alt="" id="img">
        </div>
        <div class="songname">
            <p>{{ songList[currentIndex] && songList[currentIndex].name }}</p>
        </div>
        <div class="showtime">
            <div class="slider">
                <div class="slidertimer">
                    <div class="timer">
                        <span>
                            {{ currentduration }}
                        </span>
                        <span>
                            {{ songduration }}
                        </span>
                    </div>
                    <el-slider v-model="progress" :show-tooltip="false" @change="changecurrentime"></el-slider>
                </div>
                <div class="sound">
                    <el-slider v-model="volume" vertical :format-tooltip="formatTooltip" @input="changevolume"
                        height="100px" :style="{ 'opacity': opacity }">
                    </el-slider>
                    <i class="el-icon-mic" @click="opacity = -opacity"></i>

                </div>
            </div>
        </div>

        <div class="player">
            <li class="el-icon-caret-left" @click="backto"></li>
            <li class="el-icon-video-pause" v-show="isStop" @click="stop"></li>
            <li class="el-icon-video-play" v-show="!isStop" @click="play"></li>
            <li class="el-icon-caret-right" @click="nextto"></li>
        </div>
    </div>

</template>

<script>
import { getbaseinfo } from '@/network/getbaseinfo'
export default {
    name: 'music',
    created() {
       
        getbaseinfo('/getmusic').then(res => {
            this.songList = res.data;
            this.songslen = res.data.length;
            this.initsong()
            this.audio.addEventListener('timeupdate', this.updatetime)
            this.audio.addEventListener('ended', this.nextto)
            this.audio.addEventListener('canplay', this.getalltime)
        })
        this.currentIndex = localStorage.getItem('currentIndex') * 1 || 0;
        this.volume = localStorage.getItem('volume') * 1 || 20;

    },
    data() {
        return {
            songList: [],
            songslen: 0,
            currentIndex: 0,
            isStop: false,
            progress: 0,
            songduration: 0,
            currentduration: '0:00',
            audio: null,
            volume: 20,
            opacity: -1
        }
    },
    methods: {
        formateTime(time) {
            const minute = parseInt(time / 60 % 60)
            const second = Math.ceil(time % 60)
            const formatSecond = second > 59 ? 59 : second
            return `${minute}:${formatSecond < 10 ? '0' + formatSecond : formatSecond}`
        },
        play() {
            this.isStop = true
            this.audio.play();
        },
        stop() {
            this.isStop = false
            this.audio.pause();
        },
        backto() {
            this.currentIndex--;
            if (this.currentIndex === -1) {
                this.currentIndex = this.songslen - 1;
            }
            this.turn()
            this.play()
             this.preserve()
        },
        nextto() {
            this.currentIndex++;
            if (this.currentIndex === this.songslen) {
                this.currentIndex = 0;
            }
            this.turn()
            this.play();
             this.preserve()
        },

        initsong() {
            this.audio = document.createElement("audio")
            this.audio.volume = this.volume / 100
            this.turn()
        },
        turn() {
            this.audio.src = this.songList[this.currentIndex].path
        },
        updatetime() {
            this.currentduration = this.formateTime(this.audio.currentTime)
            this.progress = this.audio.currentTime / this.audio.duration * 100;

        },
        changecurrentime() {
            this.audio.currentTime = this.progress * this.audio.duration / 100
        },
        getalltime() {
            this.songduration = this.formateTime(parseInt(this.audio.duration))
        },

        changevolume() {
            if (this.audio) {
                this.audio.volume = this.volume / 100;
                this.preserve()
            }
        },
        formatTooltip(value) {
            return value + '%'
        },
        preserve() {
            localStorage.setItem('currentIndex', this.currentIndex);
            localStorage.setItem('volume', this.volume)
        }

    },
    beforeDestroy() {
        this.audio.removeEventListener('timeupdate', this.updatetime)
        this.audio.removeEventListener('ended', this.nextto)
        this.audio.removeEventListener('canplay', this.getalltime)
        this.audio.pause();
      

    },
    

}
</script>

<style scoped>
.music {
    margin: 25px;
    padding: 30px;
    border: 3px solid rgb(168, 165, 165);
    border-radius: 10px;
}

.img {
    width: 150px;
    height: 150px;
    margin: auto;
}

#img {
    width: 100%;
    height: 100%;
    border-radius: 50%;
    border: 5px solid rgb(156, 152, 152);
    animation: 20s rotateImg linear infinite;
}

#img:hover,
.songname p:hover {
    animation-play-state: paused;
}

.songname {
    width: 150px;
    margin: auto;
    font-size: 20px;
    font-weight: bold;
    padding: 30px 0 10px 0;
    overflow: hidden;
}

.songname p {
    float: left;
    word-break: keep-all;
    white-space: nowrap;
    animation: 10s wordsLoop linear infinite;
}



.showtime {
    position: relative;
    width: 70%;
    margin: auto;
}

.timer {
    display: flex;
    justify-content: space-between;
}

.player {
    display: flex;
    justify-content: space-around;
    align-items: center;
    margin: 30px;
    border: 3px solid rgb(196, 192, 192);
    box-shadow: 2px 2px rgb(183, 180, 180);
    border-radius: 29px;
}

.player li {
    margin: 5px;
    border-radius: 50%;
    border: 2px solid rgb(88, 87, 87);
    box-shadow: 1px 1px rgb(197, 193, 193);

}

.el-icon-caret-left,
.el-icon-caret-right {
    font-size: 30px;
}

.el-icon-mic {
    font-size: 24px;
    margin: 20px;
}

.el-icon-mic:hover {
    color: rgb(20, 192, 235);
}

.el-icon-video-pause,
.el-icon-video-play {
    font-size: 40px;
}

.sound {
    position: absolute;
    top: -92px;
    right: -50px;
    display: flex;
    flex-direction: column;
    align-items: center;

}


.player li:hover {
    color: rgb(199, 192, 192);
}


@keyframes rotateImg {
    from {
        transform: rotate(0deg);
    }

    to {
        transform: rotate(360deg);
    }
}

@keyframes wordsLoop {
    0% {
        transform: translateX(100%);

    }

    100% {
        transform: translateX(-100%);

    }
}
</style>