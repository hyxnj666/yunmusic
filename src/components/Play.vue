<template>
  <transition enter-active-class="animate__animated animate__bounceInLeft">
    <div
      id="play"
      v-if="musicID"
      :style="{ bottom: $route.meta.showNav ? '50px' : '0px' }"
    >
      <audio
        :src="`https://music.163.com/song/media/outer/url?id=${musicID}.mp3`"
        @timeupdate="timeUpdate"
        ref="audio"
        @pause="pause"
        @play="play"
        autoplay
        @ended="next()"
      ></audio>

      <div class="box">
        <!-- 控制播放器 -->
        <span class="one">
          <img
            @click="isFullPage = true"
            ref="randImg"
            class="img"
            width="40"
            height="40"
            :src="pic ? pic : 'https://img01.yzcdn.cn/vant/cat.jpeg'"
          />
        </span>
        <p>
          <span class="van-ellipsis two">{{ name }}</span> -
          <span class="van-ellipsis three">{{ name1 }}</span>
        </p>
        <span class="four" @click="changePlay()">
          <van-circle
            v-model="currentRate"
            :rate="total"
            text=""
            size="30px"
          ></van-circle>
          <i ref="i">||</i>
        </span>
        <span @click="isList = true" class="five"
          ><i class="fa fa-list" aria-hidden="true"></i
        ></span>
      </div>

      <!-- 列表 -->
      <transition
        enter-active-class=" animate__animated animate__fadeInUp"
        leave-active-class="animate__animated animate__fadeOutDown"
      >
        <div class="list" v-show="isList">
          <span @click="isList = false"><van-icon name="arrow-down"/></span>
          <h3>当前播放</h3>
          <p>
            <span @click="changeState"> {{ state }}</span
            ><span @click="dels"><van-icon name="delete-o" size="20"/></span>
          </p>
          <ul>
            <li
              v-for="item in musicList"
              :key="item.id"
              @click="playMusic(item)"
            >
              <span v-if="currentId == item.id" class="num"
                ><Loading></Loading
              ></span>
              <span :style="{ color: item.id == musicID ? 'red' : '#000' }"
                >{{ item.name }}
                <span class="singer"> - {{ item.ar[0].name }}</span>
              </span>
              <span @click="del(item.id, $event)" class="del">×</span>
            </li>
          </ul>
        </div>
      </transition>

      <!-- ------------------全屏------------------ -->
      <transition
        enter-active-class=" animate__animated animate__fadeInUp"
        leave-active-class="animate__animated animate__fadeOutDown"
      >
        <div
          class="fullPage"
          v-show="isFullPage"
          :style="{ marginBottom: $route.meta.showNav ? '-50px' : '0px' }"
        >
          <!-- 头部  -->
          <div class="title">
            <span class="back" @click="isFullPage = false">‹</span>
            <div class="content">
              <span class="van-ellipsis one">{{ name }}</span>
              <span class="van-ellipsis two">{{ name1 }}</span>
            </div>
          </div>
          <!-- 图片歌词区 -->
          <div class="lyc" @click="flag = !flag">
            <img
              ref="randImg1"
              v-show="flag"
              :src="pic ? pic : 'https://img01.yzcdn.cn/vant/cat.jpeg'"
              class="img1"
            />
            <!-- <transition enter-active-class=" animate__animated animate__fadeIn"> -->
            <ul
              v-show="!flag"
              :style="{
                transform: `translateY(-${moveTop}px)`
              }"
              v-if="lyric.length > 0"
            >
              <li
                ref="lyricLi"
                class="van-ellipsis"
                v-for="(item, index) in lyric"
                :key="index"
                :class="{ active: currentIndex == index }"
              >
                {{ item.lyric }}
              </li>
            </ul>
            <!-- </transition> -->
          </div>
          <div class="bottom">
            <!-- 喜欢 -->
            <!-- <div class="like">
              <van-icon name="like-o" />
              <van-icon name="down" />
              <van-icon name="comment-o" />
            </div> -->
            <!-- 进度条 -->
            <div class="line">
              <span class="one">{{ currentTime | ctt }}</span>
              <span class="two">
                <input
                  type="range"
                  min="0"
                  :max="total"
                  :value="currentTime"
                  @change="changeTime"
                />
                <i :style="{ width: `${(currentTime * 100) / total}%` }"></i>
              </span>
              <span class="three">{{ total | dtt }}</span>
            </div>
            <!-- 控制  -->
            <div class="control">
              <span @click="prep()"
                ><i class="fa fa-step-backward" aria-hidden="true"></i
              ></span>
              <span ref="span" @click="changePlay()">
                <van-icon class="o" :name="con"
              /></span>
              <span @click="next()"
                ><i class="fa fa-step-forward" aria-hidden="true"></i
              ></span>
            </div>
          </div>
        </div>
      </transition>
    </div>
  </transition>
</template>

<script>
import { mapState } from "vuex";
import axios from "axios";
import Loading from "@/components/Loading.vue";

// axios.defaults.baseURL = "http://musicapi.leanapp.cn/";
// axios.interceptors.response.use(
//   function(res) {
//     return res.data;
//   },
//   function(error) {
//     console.log(error);
//   }
// );
export default {
  // props: ['musicID'],
  data() {
    return {
      //   musicID: 33894312
      currentRate: 0,
      currentTime: 0,
      rate: 0,
      red: "red",
      // 播放状态
      isPlay: true,
      isList: false,
      isFullPage: false,
      // 歌词
      lyric: [],
      flag: true,
      con: "pause-circle-o",
      currentIndex: 0, //记录当前歌词播放的位置下标
      moveTop: 0,
      // 总时间
      total: 0,
      playMode: "leibiao",
      currentId: null,
      // 状态
      state: "列表循环",
      states: ["列表循环", "随机播放", "单曲播放"],
      i: 0
    };
  },
  watch: {
    async musicID() {
      this.currentId = this.musicID;
      // 获取歌词
      // console.log(this.musicID);
      let sing = await axios.get("/lyric?id=" + this.musicID);
      // console.log(sing);
      if (sing.nolyric) {
        this.lyric = [{ lyric: "本歌曲为纯音乐" }];
        return false;
      }
      let lyrArr = sing.lrc.lyric.split("\n");
      lyrArr.pop();
      let reg = /\[(\d+):(\d+\.\d+)\](.*)/;
      let newLyr = lyrArr.map(d => {
        if (reg.test(d)) {
          return {
            time: parseInt(RegExp.$1) * 60 + parseFloat(RegExp.$2),
            lyric: RegExp.$3
          };
        }
      });
      this.lyric = newLyr;
      // console.log(this.lyric);

      // ------------暂停播放
      if (this.$refs.i.innerText) {
        // console.log(this.$refs.i.innerText);
        // this.rate = 0
        // this.currentRate=0
        this.$refs.i.innerText = "||";
        this.$refs.randImg.style.animationPlayState = "running";
        this.isPlay = true;
      }

      let audio = this.$refs.audio;
      let randimg = this.$refs.randImg;
      let randimg1 = this.$refs.randImg1;
      let i = this.$refs.i;
      audio.play();
      // this.isPlay = true;
      i.innerText = "||";
      this.con = "pause-circle-o";
      randimg.style.animationPlayState = "running";
      randimg1.style.animationPlayState = "running";
    },
    i(index) {
      console.log(index);
      if (index == 1) {
        this.playMode = "random";
      }
      if (index == 0) {
        this.playMode = "liebiao";
      }
      if (index == -1) {
        this.playMode = "dan";
      }
    }
  },
  methods: {
    // 改变状态
    changeState() {
      // console.log(this.i);
      this.i++;
      this.state = this.states[this.i];
      if (this.i == 2) {
        this.i = -1;
      }
    },
    // 改变音乐
    playMusic(item) {
      // console.log(item);
      this.$store.commit("setID", item);
      this.$store.commit("setName", item.name);
      this.$store.commit("setPic", item.al.picUrl);
      this.$store.commit("setName1", item.ar[0].name);
    },
    // 上一首
    prep() {
      // console.log(this.musicList);
      let currentIndex = 0;
      // 循环列表
      if (this.playMode == "random") {
        currentIndex = parseInt(this.musicList.length * Math.random());
      } else if (this.playMode == "liebiao") {
        for (let i in this.musicList) {
          if (this.musicList[i].id === this.musicID) {
            currentIndex = i;
            break;
          }
        }
        currentIndex--; //找到上一曲
        if (currentIndex < 0) {
          currentIndex = this.musicList.length - 1;
        }
      } else {
        for (let i in this.musicList) {
          if (this.musicList[i].id === this.musicID) {
            currentIndex = i;
            break;
          }
        }
      }

      this.$store.commit("setID", this.musicList[currentIndex]);
      this.$store.commit("setName", this.musicList[currentIndex].name);
      this.$store.commit("setPic", this.musicList[currentIndex].al.picUrl);
      this.$store.commit("setName1", this.musicList[currentIndex].ar[0].name);
    },
    // 下一首
    next() {
      let currentIndex = 0;
      if (this.playMode == "random") {
        currentIndex = parseInt(this.musicList.length * Math.random());
      } else if (this.playMode == "liebiao") {
        // 循环列表
        for (let i in this.musicList) {
          if (this.musicList[i].id === this.musicID) {
            currentIndex = i;
            break;
          }
        }
        currentIndex++; //找到上一曲
        if (currentIndex > this.musicList.length - 1) {
          currentIndex = 0;
        }
      } else {
        currentIndex = currentIndex;
        this.$refs.audio.currentTime = 0;
      }

      this.$store.commit("setID", this.musicList[currentIndex]);
      this.$store.commit("setName", this.musicList[currentIndex].name);
      this.$store.commit("setPic", this.musicList[currentIndex].al.picUrl);
      this.$store.commit("setName1", this.musicList[currentIndex].ar[0].name);
      // console.log(1);
    },
    // 删除全部
    dels() {
      this.$store.commit("dels");
    },
    // 删除一首
    del(id, e) {
      console.log(e);
      e.stopPropagation();
      this.next();
      this.$store.commit("del", id);
    },
    // 改变进度
    changeTime(event) {
      // console.log(event);
      let time = event.target.value;
      this.currentTime = time;
      // console.log(time);
      this.$refs.audio.currentTime = time;
      // this.currentRate = time;
    },
    pause() {
      // console.log(1);
    },
    play() {
      // console.log(2);
    },
    // 改变播放状态
    changePlay() {
      // 播放暂停
      let audio = this.$refs.audio;
      let randimg = this.$refs.randImg;
      let randimg1 = this.$refs.randImg1;
      let i = this.$refs.i;
      if (this.isPlay) {
        audio.pause();
        this.isPlay = false;
        i.innerText = "▷";
        this.con = "play-circle-o";
        randimg.style.animationPlayState = "paused";
        randimg1.style.animationPlayState = "paused";
      } else {
        audio.play();
        this.isPlay = true;
        i.innerText = "||";
        this.con = "pause-circle-o";
        randimg.style.animationPlayState = "running";
        randimg1.style.animationPlayState = "running";
      }
      // console.log(e.target.innerText);
      // 图片旋转
    },
    // 歌曲播放时
    timeUpdate(event) {
      let audio = event.target; //获取audio元素
      let currentTime = audio.currentTime; //当前播放时间
      let duration = audio.duration; //获取音频总时长
      this.currentTime = currentTime;
      this.total = duration;
      this.rate = 100;
      // console.log(this.currentTime);
      // console.log(this.currentTime);
      // console.log(duration);
      // this.rate =  duration;
      this.currentRate = (this.currentTime / duration) * 100;
      // this.speed = parseInt(currentTime / duration);
      // this.speed = 100/duration;
      // console.log(this.rate);
      // console.log(this.currentRate);
      // console.log(duration);

      //-------------------------- 歌词
      if (this.lyric) {
        //得到当前的播放时间
        // let playTime=event.target.currentTime;
        for (var i = 0; i < this.lyric.length; i++) {
          //循环歌词  13秒
          if (i >= this.lyric.length - 1) {
            //循环到最后一条的,不需要和下一条匹配 直接显示为最后一条高亮
            this.currentIndex = i;
            break;
          }
          //当前播放时间 大于当前歌词时间 小于下一条歌词时间，当前这条歌词需要高亮
          if (
            this.lyric[i].time <= this.currentTime &&
            this.currentTime < this.lyric[i + 1].time
          ) {
            if (i >= 5) {
              //获取当前播放歌词上一条歌词距离父元素上面的距离.
              this.moveTop = this.$refs.lyricLi[i - 5].offsetTop;
              // console.log(i,this.$refs.lyricLi[i-1].offsetTop);
            } else {
              this.moveTop = 0;
            }
            this.currentIndex = i;
            break;
          }
        }
      }
    }
  },
  filters: {
    ctt(v) {
      let m = parseInt(v / 60);
      let s = parseInt(v % 60);
      if (m < 10) {
        m = "0" + m;
      }
      if (s < 10) {
        s = "0" + s;
      }
      return m + ":" + s;
    },
    dtt(v) {
      if (!v) {
        v = 0;
      }
      let m = parseInt(v / 60);
      let s = parseInt(v % 60);
      if (m < 10) {
        m = "0" + m;
      }
      if (s < 10) {
        s = "0" + s;
      }
      return m + ":" + s;
    }
  },
  components: {
    Loading
  },
  created() {},
  computed: {
    ...mapState(["musicitem", "musicList", "pic", "name", "name1"]),
    musicID() {
      return this.musicitem.id;
    }
    // speed() {
    //   return 100 / this.total;
    // }
  }
};
</script>

<style lang="less" scoped>
#play {
  .van-grid-item {
    overflow: hidden;
  }
  border-top: 1px solid #999;
  background-color: #fff;
  position: fixed;
  z-index: 9;
  width: 100%;
  line-height: 50px;
  audio {
    transform: translateY(-50px);
    height: 50px;
  }
  .box {
    height: 50px;
    display: flex;
    padding-right: 10px;
    padding-left: 10px;
    span {
      flex: 1;
      line-height: 50px;
      height: 50px;
    }
    .one {
      margin-top: -10px;
      .img {
        border: 6px solid rgba(0, 0, 0, 0.521);
        border-radius: 50%;
        overflow: hidden;
        animation: randImg 5s linear infinite;
      }
    }
    .two {
      overflow: hidden;
    }
    .three {
      font-size: 12px;
      color: #999;
      overflow: hidden;
    }
    .four {
      position: relative;
      flex: 0;
      display: block;
      // padding-top: 10px;
      width: 30px;
      height: 30px;
      margin-top: 10px;
      margin-right: 10px;
      margin-left: 10px;

      i {
        position: absolute;
        top: -11px;
        left: 11px;
        font-style: normal;
      }
    }
    .five {
      margin-right: 10px;
    }
    p {
      // flex: 1;
      width: 55%;
      margin: 0;
      text-align: left;
      padding-right: 30px;
      overflow: hidden;
    }
  }

  // 歌单
  .list {
    position: absolute;
    width: 90vw;
    top: -340px;
    height: 50vh;
    margin-left: 5%;
    background-color: #fff;
    border-radius: 20px;
    overflow-y: auto;
    img {
      width: 20px;
      height: 20px;
      vertical-align: middle;
    }
    h3 {
      margin: 0;
      text-align: left;
      font-weight: 400;
      padding-left: 10px;
    }
    p {
      padding-left: 10px;
      padding-right: 10px;

      margin: 0;
      display: flex;
      span {
        text-align: left;
        flex: 1;
        justify-content: space-between;
        &:last-child {
          text-align: right;
        }
      }
    }
    ul {
      padding-left: 10px;
      li {
        text-align-last: left;
        height: 40px;
        line-height: 30px;

        .singer {
          font-size: 12px;
          color: #999;
        }
        .num {
          color: #999;
          font-size: 20px;
          float: left;
          margin-right: 10px;
        }
        .del {
          float: right;
          font-size: 20px;
        }
        .active {
          color: red;
        }
      }
    }
  }
}
// 全屏
.fullPage {
  width: 100vw;
  height: 100vh;
  // margin-bottom: -50px;
  background-color: rgb(82, 81, 81);
  .title {
    .back {
      // float: left;
      color: #fff;
      position: absolute;
      left: 0;
      font-size: 40px;
      text-align: center;
      line-height: 50px;
      width: 40px;
      height: 54px;
    }
    .content {
      margin: 0 auto;
      display: flex;
      flex-direction: column;
      padding-top: 20px;
      span {
        height: 20px;
        overflow: hidden;
        line-height: 20px;
      }
      .one {
        color: #fff;
      }
      .two {
        font-size: 12px;
        color: #aaa;
      }
    }
  }
  .lyc {
    color: #fff;
    overflow: hidden;
    width: 100%;
    height: 55%;
    text-align: center;
    margin-top: 35px;
    .img1 {
      margin-top: 80px;
      z-index: 9;
      width: 250px;
      height: 250px;
      border-radius: 50%;
      transform: translateY(100px);
      animation: randImg 6s linear infinite;
    }
    .active {
      color: red;
    }
    ul {
      width: 80%;
      overflow: hidden;
      margin: auto;
      transition: all 0.5s linear;

      li {
        font-size: 14px;
        height: 30px;
        line-height: 30px;
      }
    }
  }
  .bottom {
    margin-top: 40px;
    padding: 10px;
    color: #fff;
    // 喜欢
    .like {
      font-size: 26px;
      display: flex;
      justify-content: space-around;
      margin-bottom: 30px;
    }
    // 线条
    .line {
      height: 30px;
      display: flex;
      .one {
        width: 30px;
        line-height: 25px;
        font-size: 14px;
      }
      .two {
        position: relative;
        height: 100%;
        flex: 1;
        line-height: 25px;
        padding-left: 3%;
        padding-top: 2px;
        input {
          width: 100%;
          appearance: none;
          -webkit-appearance: none;
          background: transparent;
          &::-webkit-slider-thumb {
            appearance: none;
            -webkit-appearance: none;
            width: 20px;
            height: 20px;
            margin-top: -5px;
            border-radius: 50%;
            background-color: #fff;
          }
          &::-webkit-slider-runnable-track {
            appearance: none;
            z-index: 9;
            height: 10px;
            -webkit-appearance: none;
            border-radius: 5px;
            background-color: rgba(red, 0, 0, 1);
            box-shadow: inset 0px 10px 10px rgba(255, 255, 255, 0.3);
          }
        }
        i {
          position: absolute;
          width: 50px;
          height: 10px;
          background-color: #fff;
          left: 10px;
          top: 9px;
          // z-index:0;
          border-top-left-radius: 5px;
          border-bottom-left-radius: 5px;
        }
      }
      .three {
        width: 30px;
        line-height: 25px;
        font-size: 14px;
      }
    }
    // 控制
    .control {
      margin-top: 5px;
      display: flex;
      span {
        flex: 1;
        i {
          font-size: 26px;
        }
        .o {
          margin-top: 0;
          font-size: 40px;
        }
      }
    }
  }
}
@keyframes randImg {
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
}
.animate__animated.animate__fadeInUp {
  --animate-duration: 0.5s;
}
.animate__animated.animate__fadeOutDown {
  --animate-duration: 0.5s;
}
</style>
