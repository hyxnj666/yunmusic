<template>
  <div id="home">
    <div class="ready" v-if="ready">
      <img
        src="https://gimg2.baidu.com/image_search/src=http%3A%2F%2Fpic2.zhimg.com%2F50%2Fv2-73f8bc7a6882313331ff1b3d4b5b3b8d_hd.jpg&refer=http%3A%2F%2Fpic2.zhimg.com&app=2002&size=f9999,10000&q=a80&n=0&g=0n&fmt=jpeg?sec=1617625716&t=282ef30ab6dc89ea3e59510445bf45ca"
        alt=""
      />
      <div class="time">{{ time }}</div>
    </div>
    <div v-else class="main">
      <!-- 头部搜索 -->
      <div class="header">
        <van-cell id="cell" @click="showPopup">☰</van-cell>
        <van-popup v-model="show" position="left" :style="{ width: '60%' }"
          ><span @click="tologin" class="login">登录</span></van-popup
        >
        <van-search
          v-model="searchData"
          shape="round"
          background="#efefef"
          :placeholder="defaults"
          @click="rander"
        />
        <div class="icon">
          <!-- <van-icon name="service-o" /> -->
        </div>
      </div>

      <!-- 轮播图 -->
      <van-swipe class="my-swipe" :autoplay="3000" indicator-color="white">
        <van-swipe-item v-for="(item, index) in radio.data" :key="index">
          <van-image
            class="img5"
            fit="cover"
            lazy-load
            :src="item.pic"
            rel="external nofollow"
          />
        </van-swipe-item>
      </van-swipe>

      <!-- 滚动标签 -->
      <van-tabs :line-height="'3px'" :line-width="'50px'">
        <van-tab title="首页"></van-tab>
        <van-tab title="Mv" to="/Mvsquare"></van-tab>
        <!-- <van-tab title="私人FM"></van-tab> -->
        <van-tab title="歌单" to="/songsquare"></van-tab>
        <van-tab title="排行榜" to="/rankinglist"></van-tab>
        <van-tab title="歌手" to="/singer"></van-tab>
        <!-- <van-tab title="歌房"></van-tab> -->
        <!-- <van-tab title="游戏专区"></van-tab> -->
      </van-tabs>

      <!-- 推荐歌单 -->
      <div class="recommend" v-if="rec.length > 0">
        <list-title
          ><h3>推荐歌单</h3>
          <button @click="gosongsquare()">更多 ></button></list-title
        >
        <van-grid :column-num="3" :border="false">
          <van-grid-item
            class="grid"
            :to="'/songsdetail/' + item.id"
            v-for="item in rec"
            :key="item.id"
          >
            <van-image
              class="img"
              fit="cover"
              lazy-load
              :src="item.picUrl"
              rel="external nofollow"
            />
            <span class="count">{{ item.playCount | formatNum }}万</span>
            <p class="pra van-multi-ellipsis--l2">{{ item.name }}</p>
          </van-grid-item>
        </van-grid>
        <Loading v-if="rec.length == 0"></Loading>
      </div>

      <!-- 私人订制 -->
      <div class="self" v-if="selfs.length > 0">
        <list-title
          ><h3>私人订制</h3>
          <!-- <button>更多</button> -->
        </list-title>
        <van-swipe class="my-swipe1" :autoplay="6000" :show-indicators="false">
          <van-swipe-item v-for="(item1, index1) in selfs" :key="index1">
            <ul :column-num="1">
              <li v-for="items in item1" :key="items.id">
                <van-image
                  class="img1"
                  fit="cover"
                  lazy-load
                  :src="items.picUrl"
                  rel="external nofollow"
                />
                <span>{{ items.name }}</span>
                <span class="bo" @click="play(items)">▷</span>
              </li>
            </ul></van-swipe-item
          >
        </van-swipe>
      </div>

      <!-- 数字专辑  -->
      <div class="musicData" v-if="vedios.length > 0">
        <list-title
          ><h3>数字专辑</h3>
          <!-- <button>更多 ></button> -->
        </list-title>
        <van-grid :column-num="3" :border="false">
          <van-grid-item v-for="item3 in vedios" :key="item3.id">
            <van-image
              class="img2"
              fit="cover"
              lazy-load
              :src="item3.picUrl"
              rel="external nofollow"
              @click="plays(item3.id)"
            />
            <p class="van-multi-ellipsis--l2">
              {{ item3.name }}-{{ item3.artist.name }}
            </p>
          </van-grid-item>
        </van-grid>
      </div>

      <!-- 新碟上架 -->
      <div class="musicData newData" v-if="vedios.length > 0">
        <list-title
          ><h3>新碟上架</h3>
          <!-- <button>更多 ></button> -->
        </list-title>
        <van-grid :column-num="3" :border="false">
          <van-grid-item v-for="item4 in news" :key="item4.id">
            <van-image
              class="img2"
              fit="cover"
              lazy-load
              :src="item4.picUrl"
              rel="external nofollow"
              @click="plays(item4.id)"
            />
            <p class="van-ellipsis">{{ item4.name }}</p>
            <p class="van-ellipsis">{{ item4.artist.name }}</p>
          </van-grid-item>
        </van-grid>
      </div>

      <!-- 排行榜 -->
      <div
        class="comment"
        v-if="ranking1.length > 0"
        :style="{ marginBottom: $route.meta.showNav ? '50px' : '0px' }"
      >
        <list-title
          ><h3>排行榜</h3>
          <button @click="rankinglist()">更多 ></button></list-title
        >
        <van-swipe class="my-swipe3" :show-indicators="false">
          <van-swipe-item>
            <ul>
              <h4>云音乐新歌榜</h4>
              <li
                v-for="(item5, index) in ranking1"
                :key="item5.id"
                @click="play1(item5)"
              >
                <van-image
                  class="img4"
                  fit="cover"
                  lazy-load
                  :src="item5.al.picUrl"
                  rel="external nofollow"
                />
                <p>
                  <span>{{ index + 1 }}</span
                  ><span>{{ item5.name }}</span
                  ><span>{{ item5.ar[0].name }}</span>
                </p>
              </li>
            </ul>
          </van-swipe-item>
          <van-swipe-item>
            <ul>
              <h4>云音乐热歌榜</h4>
              <li
                v-for="(item5, index) in ranking2"
                :key="item5.id"
                @click="play(item5)"
              >
                <van-image
                  class="img4"
                  fit="cover"
                  lazy-load
                  :src="item5.al.picUrl"
                  rel="external nofollow"
                />
                <p>
                  <span>{{ index + 1 }}</span
                  ><span>{{ item5.name }}</span
                  ><span>{{ item5.ar[0].name }}</span>
                </p>
              </li>
            </ul>
          </van-swipe-item>
          <van-swipe-item>
            <ul>
              <h4>原创歌曲榜</h4>
              <li
                v-for="(item5, index) in ranking3"
                :key="item5.id"
                @click="play(item5)"
              >
                <van-image
                  class="img4"
                  fit="cover"
                  lazy-load
                  :src="item5.al.picUrl"
                  rel="external nofollow"
                />
                <p>
                  <span>{{ index + 1 }}</span
                  ><span>{{ item5.name }}</span
                  ><span>{{ item5.ar[0].name }}</span>
                </p>
              </li>
            </ul>
          </van-swipe-item>
          <van-swipe-item>
            <ul>
              <h4>云音乐飙升榜</h4>
              <li
                v-for="(item5, index) in ranking4"
                :key="item5.id"
                @click="play(item5)"
              >
                <van-image
                  class="img4"
                  fit="cover"
                  lazy-load
                  :src="item5.al.picUrl"
                  rel="external nofollow"
                />
                <p>
                  <span>{{ index + 1 }}</span
                  ><span>{{ item5.name }}</span
                  ><span>{{ item5.ar[0].name }}</span>
                </p>
              </li>
            </ul>
          </van-swipe-item>
        </van-swipe>
      </div>

      <!-- 电台 -->
      <!-- <div class="radio">
      <list-title
        ><h3>音乐电台</h3>
        <button>更多 ></button></list-title
      >
      <ul>
        <li v-for="(item, index) in radio.data" :key="index">
          <van-image
            class="img5"
            fit="cover"
            lazy-load
            :src="item.pic"
            rel="external nofollow"
          />
        </li>
      </ul>
    </div> -->

      <!-- 底部标签 -->
      <!-- <play-audio></play-audio> -->
    </div>
  </div>
</template>

<script>
import axios from "axios";
// import playAudio from "@/components/Play.vue";
import listTitle from "@/components/listTitle.vue";
import Loading from "@/components/Loading.vue";

import Vue from "vue";
import { Lazyload } from "vant";
Vue.use(Lazyload);
axios.defaults.baseURL = "http://music.kele8.cn";
// http://192.168.96.2:3000
// http://music.kele8.cn
// http://musicapi.leanapp.cn/
axios.interceptors.response.use(
  function (res) {
    return res.data;
  },
  function (error) {
    console.log(error);
  }
);
export default {
  data() {
    return {
      show: false,
      searchData: "",
      // 推荐歌单数据
      rec: {},
      // 私人订制数据
      self: {},
      // 数字专辑数据
      musicVedio: {},
      // 新碟
      newVedio: {},
      // 排行榜
      ranking1: {},
      ranking2: {},
      ranking3: {},
      ranking4: {},
      // 音乐电台
      radio: {},
      defaults: "",
      rangking: [],
      ready: false,
      time: 5,
    };
  },
  filters: {
    formatNum(val) {
      return (val / 10000).toFixed(2);
    },
  },
  computed: {
    // 私人订制
    selfs() {
      if (typeof this.self.result == "object") {
        let arr = [];
        let arr1 = this.self.result.slice(0, 3);
        let arr2 = this.self.result.slice(3, 6);
        let arr3 = this.self.result.slice(6, 9);
        arr.push(arr1);
        arr.push(arr2);
        arr.push(arr3);
        return arr;
      } else {
        return [];
      }
    },
    vedios() {
      if (typeof this.musicVedio.albums == "object") {
        let arr = [];
        for (let i = 0; i < 3; i++) {
          arr.push(this.musicVedio.albums[i]);
        }
        return arr;
      } else {
        return [];
      }
    },
    news() {
      if (typeof this.newVedio.albums == "object") {
        let arr = [];
        for (let i = 0; i < 6; i++) {
          arr.push(this.newVedio.albums[i]);
        }
        return arr;
      } else {
        return [];
      }
    },
  },
  methods: {
    tologin() {
      this.$router.push("/login");
    },
    // 前往歌单广场
    gosongsquare() {
      this.$router.push("/songsquare");
    },
    // 排行榜
    rankinglist() {
      this.$router.push("/rankinglist");
    },
    showPopup() {
      this.show = true;
    },
    onSearch() {},
    async get() {
      // 推荐歌单
      console.log(1);
      let res = await axios.get("/personalized?limit=6");
      this.rec = res.result;
      // console.log(this.rec);

      // 私人订制
      this.self = await axios.get("/personalized/newsong");
      // console.log(this.self.result);

      // 数字专辑
      this.musicVedio = await axios.get("/album/newest");
      console.log(this.musicVedio.albums);

      // 新碟上架
      this.newVedio = await axios.get("/top/album");
      console.log(this.newVedio.albums);

      // 音乐电台
      this.radio = await axios.get("/dj/banner");
      console.log(this.radio);

      let data2 = await axios.get("/search/default");
      // console.log(data2);
      this.defaults = data2.data.realkeyword;

      // 排行榜
      // let ranking1 = await axios.get("/top/list?idx=0");
      // console.log(ranking1);
      // this.ranking1 = ranking1.playlist.tracks;

      // let ranking2 = await axios.get("/top/list?idx=1");
      // // console.log(ranking2);
      // this.ranking2 = ranking2.playlist.tracks;

      // let ranking3 = await axios.get("/top/list?idx=2");
      // // console.log(ranking3);
      // this.ranking3 = ranking3.playlist.tracks;
      // console.log(this.ranking3);
      // let ranking4 = await axios.get("/top/list?idx=3");
      // // console.log(ranking4);
      // this.ranking4 = ranking4.playlist.tracks;
      // // console.log(this.ranking4);
      let that = this;
      let ranking1 = fetch("http://musicapi.leanapp.cn/top/list?idx=3")
        .then(function (data) {
          return data.text();
        })
        .then(function (data) {
          let obj = JSON.parse(data);
          // console.log(obj);
          that.ranking1 = obj.playlist.tracks;
        });

      let ranking2 = fetch("http://musicapi.leanapp.cn/top/list?idx=4")
        .then(function (data) {
          return data.text();
        })
        .then(function (data) {
          let obj = JSON.parse(data);
          // console.log(obj);
          that.ranking2 = obj.playlist.tracks;
        });

      let ranking3 = fetch("http://musicapi.leanapp.cn/top/list?idx=5")
        .then(function (data) {
          return data.text();
        })
        .then(function (data) {
          let obj = JSON.parse(data);
          // console.log(obj);
          that.ranking3 = obj.playlist.tracks;
        });

      let ranking4 = fetch("http://musicapi.leanapp.cn/top/list?idx=2")
        .then(function (data) {
          return data.text();
        })
        .then(function (data) {
          let obj = JSON.parse(data);
          // console.log(obj);
          that.ranking4 = obj.playlist.tracks;
        });
    },
    // // 歌单
    // detail(id){
    //   console.log(id);
    //   // this.$router.push('/songsdetail'+id)
    // },
    rander() {
      // console.log(1);
      this.$router.push("/search");
    },
    async plays(id) {
      let one = await axios.get("/album/detail?id=" + id);
      console.log(one);
      let val = one.songs[0];
      this.$store.commit("setmusicList", val);
      this.$store.commit("setID", val);
      this.$store.commit("setName", val.name);
      this.$store.commit("setPic", val.al.picUrl);
      this.$store.commit("setName1", val.ar[0].name);
    },
    // 播放
    play(val) {
      // console.log(val);
      this.$store.commit("setmusicList", val);
      this.$store.commit("setID", val);
      this.$store.commit("setName", val.name);
      this.$store.commit("setPic", val.picUrl);
      this.$store.commit("setName1", val.song.artists[0].name);

      // console.log(this.$store.state.musicList);
    },
    play1(val) {
      // console.log(val);
      this.$store.commit("setmusicList", val);
      this.$store.commit("setID", val);
      this.$store.commit("setName", val.name);
      this.$store.commit("setPic", val.al.picUrl);
      this.$store.commit("setName1", val.ar[0].name);
      // console.log(this.$store.state.name);
    },
  },
  created() {
    setTimeout(() => {
      this.time--;
      this.ready = false;
    }, 1000);
    this.get();
  },
  components: {
    listTitle,
    Loading,
    // playAudio
  },
};
</script>

<style lang="less" scoped>
#home {
  .ready {
    position: relative;
    z-index: 999;
    img {
      z-index: 999;
      width: 100%;
    }
  }
  .login {
    font-size: 20px;
  }
  .img5 {
    border-radius: 8px;
    overflow: hidden;
  }
  background-color: #efefef;
  margin: 0;
  padding: 0;
  .van-grid-item {
    overflow: hidden;
  }
  .header {
    width: 100%;
    z-index: 2;
    position: fixed;
    height: 54px;
    display: flex;
    #cell {
      background-color: #efefef;
    }
    .van-cell {
      width: 10%;
      padding-left: 0;
      padding-right: 0;
      .van-cell__value--alone {
        text-align: center;
        font-size: 24px;
        padding-top: 5px;
      }
    }
    .van-search {
      width: 83%;
      padding-right: 0;
      padding-left: 0;
      .van-search__content {
        background-color: #fff;
      }
    }
    .icon {
      line-height: 54px;
      font-size: 22px;
      padding-top: 3px;
      flex: 1;
      background-color: #efefef;
    }
  }
  .my-swipe .van-swipe-item {
    margin-top: 54px;
    color: #fff;
    font-size: 20px;
    text-align: center;
  }
  .van-tabs__nav--line {
    padding-bottom: 5px;
  }
  // 推荐歌单
  .recommend {
    overflow: hidden;
    border-bottom-left-radius: 8px;
    border-bottom-right-radius: 8px;
    width: 100%;
    border-top: 1px solid #ccc;

    .count {
      position: absolute;
      top: 20px;
      right: 12px;
      background-image: url(data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCAyMiAyMCI+PHBhdGggZmlsbC1ydWxlPSJldmVub2RkIiBmaWxsPSIjMDQwMDAwIiBkPSJNMjIgMTYuNzc3YzAgMS4yMzMtMS4xMjEgMi4yMzMtMi41MDYgMi4yMzMtMS4zODQgMC0yLjUwNi0xLTIuNTA2LTIuMjMzdi0yLjU1M2MwLTEuMjM0IDEuMTIyLTIuMjMzIDIuNTA2LTIuMjMzLjE3NCAwIC4zNDMuMDE3LjUwNi4wNDZ2LTEuMzdoLS4wMzNjLjAxNy0uMjIuMDMzLS40NDEuMDMzLS42NjZhOCA4IDAgMCAwLTE2IDBjMCAuMjI1LjAxNi40NDYuMDM0LjY2Nkg0djEuMzdjLjE2My0uMDI5LjMzMy0uMDQ2LjUwNS0uMDQ2IDEuMzg0IDAgMi41MDYuOTk5IDIuNTA2IDIuMjMzdjIuNTUzYzAgMS4yMzMtMS4xMjIgMi4yMzMtMi41MDYgMi4yMzNTMiAxOC4wMTEgMiAxNi43Nzd2LTIuNTUzYzAtLjI1OC4wNTktLjUwMS4xNDgtLjczQS45ODIuOTgyIDAgMCAxIDIgMTMuMDAxdi0yLjY2N2MwLS4wMjMuMDEyLS4wNDMuMDEzLS4wNjctLjAwNC0uMDg4LS4wMTMtLjE3Ni0uMDEzLS4yNjYgMC01LjUyMyA0LjQ3Ny0xMCAxMC0xMHMxMCA0LjQ3NyAxMCAxMGMwIC4wOS0uMDA5LjE3OC0uMDE0LjI2Ni4wMDIuMDI0LjAxNC4wNDQuMDE0LjA2N3YyYS45ODguOTg4IDAgMCAxLS4zNi43NTNjLjIyNC4zMzQuMzYuNzIuMzYgMS4xMzh2Mi41NTIiIG9wYWNpdHk9Ii4xNSIvPjxwYXRoIGZpbGwtcnVsZT0iZXZlbm9kZCIgZmlsbD0iI2ZmZiIgZD0iTTIwIDE2Ljc3N2MwIDEuMjMzLTEuMTIxIDIuMjMzLTIuNTA2IDIuMjMzLTEuMzg0IDAtMi41MDYtMS0yLjUwNi0yLjIzM3YtMi41NTNjMC0xLjIzNCAxLjEyMi0yLjIzMyAyLjUwNi0yLjIzMy4xNzQgMCAuMzQzLjAxNy41MDYuMDQ2di0xLjM3aC0uMDMzYy4wMTctLjIyLjAzMy0uNDQxLjAzMy0uNjY2YTggOCAwIDAgMC0xNiAwYzAgLjIyNS4wMTYuNDQ2LjAzNC42NjZIMnYxLjM3Yy4xNjMtLjAyOS4zMzMtLjA0Ni41MDUtLjA0NiAxLjM4NCAwIDIuNTA2Ljk5OSAyLjUwNiAyLjIzM3YyLjU1M2MwIDEuMjMzLTEuMTIyIDIuMjMzLTIuNTA2IDIuMjMzUzAgMTguMDExIDAgMTYuNzc3di0yLjU1M2MwLS4yNTguMDU5LS41MDEuMTQ4LS43M0EuOTgyLjk4MiAwIDAgMSAwIDEzLjAwMXYtMi42NjdjMC0uMDIzLjAxMi0uMDQzLjAxMy0uMDY3LS4wMDQtLjA4OC0uMDEzLS4xNzYtLjAxMy0uMjY2IDAtNS41MjMgNC40NzctMTAgMTAtMTBzMTAgNC40NzcgMTAgMTBjMCAuMDktLjAwOS4xNzgtLjAxNC4yNjYuMDAyLjAyNC4wMTQuMDQ0LjAxNC4wNjd2MmEuOTg4Ljk4OCAwIDAgMS0uMzYuNzUzYy4yMjQuMzM0LjM2LjcyLjM2IDEuMTM4djIuNTUyIi8+PC9zdmc+);
      background-repeat: no-repeat;
      background-size: 12px;
      font-size: 12px;
      color: #fff;
      text-shadow: 0px 0px 2px #000;
      padding-left: 14px;
      line-height: 10px;
    }

    .van-grid-item {
      overflow: hidden;
    }
    .van-grid-item__content::after {
      border-width: 0;
    }

    .van-image {
      overflow: hidden;
      border-radius: 10px;
    }
    .pra {
      margin: 0;
      font-size: 10px;
    }
  }
  // 私人订制
  .self {
    box-sizing: border-box;
    width: 100%;
    margin-top: 8px;
    border-radius: 8px;
    overflow: hidden;
    .van-image {
      overflow: hidden;
      border-radius: 10px;
    }
    ul {
      padding-left: 5px;
      background-color: #fff;
    }
    li {
      width: 100%;
      // height: 50px;
      text-align: left;
      padding-bottom: 5px;
      border-bottom: 1px solid #eee;
      .img1 {
        width: 50px;
        height: 50px;
        border-radius: 5px;
        vertical-align: middle;
      }
      span {
        margin-left: 10px;
        font-size: 12px;
      }
      .bo {
        padding-left: 2px;
        text-align: center;
        line-height: 20px;
        font-size: 18px;
        width: 20px;
        height: 20px;
        border: 1px solid #aaa;
        border-radius: 50%;
        float: right;
        margin-right: 10px;
        margin-top: 15px;
      }
    }
    .van-grid-item__content {
      padding: 0 im !important;
    }
  }
  // 专辑
  .musicData {
    overflow: hidden;
    margin-top: 8px;
    border-radius: 8px;
    width: 100%;
    .img2 {
      overflow: hidden;
      border-radius: 8px;
      // height: 120px;
    }
  }
  // 新碟
  .newData {
    p {
      font-size: 14px;
      margin: 0;
      width: 90%;
    }
  }
  // 排行榜
  .comment {
    margin-top: 8px;
    border-radius: 8px;
    overflow: hidden;
    background-color: #fff;
    h4 {
      font-weight: 400;
      margin-top: 12px;
    }
    ul {
      margin-left: 10px;
      margin-right: 10px;
      border: 1px solid #eee;
      border-radius: 10px;
      padding-left: 12px;
      padding-bottom: 8px;
      box-shadow: 2px 2px 2px #ccc;
      li {
        display: flex;
        width: 100%;
        height: 50px;
        text-align: left;
        padding-bottom: 5px;
        .img4 {
          overflow: hidden;
          width: 50px;
          height: 50px;
          border-radius: 5px;
          vertical-align: middle;
        }
        p {
          padding-left: 10px;
        }
        span {
          font-size: 14px;
          margin-left: 10px;
        }
      }
    }
  }
  // 音乐电台
  .radio {
    margin-top: 8px;
    border-radius: 8px;
    overflow: hidden;
    height: 800px;
    ul {
      background-color: #fff;
    }
    li {
      padding: 5px;
    }
  }
}
</style>
