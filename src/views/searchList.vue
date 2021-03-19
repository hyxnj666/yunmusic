<template>
  <div id="searchList">
    <!-- 搜索框 -->
    <div class="top">
      <span @click="going">‹</span
      ><van-search
        v-model="value"
        :placeholder="defaults"
        class="one"
        @search="onSearch"
      ></van-search>
      <ul v-if="list1.length > 0">
        <li @click="handle($event)" v-for="(item, index) in list1" :key="index">
          <van-icon class="sou" name="search" />{{ item.keyword }}
        </li>
      </ul>
    </div>

    <van-tabs v-model="active">
      <van-tab title="单曲">
        <div class="list" v-if="songs.length > 0">
          <van-list
            v-model="loading"
            :finished="finished"
            finished-text="没有更多了"
            @load="onLoad"
          >
            <van-cell
              v-for="(item, index) in list"
              :key="index"
              @click="play(item)"
            >
              <div class="left">
                <span
                  v-html="$options.filters.highLight(item.name, search)"
                ></span>
                <p class="van-ellipsis">
                  {{ item.artists[0].name }} - {{ item.album.name }}
                </p>
              </div>
              <div class="play"></div>
            </van-cell>
          </van-list>
        </div>
      </van-tab>
      <Loading v-if="list.length == 0"></Loading>

      <van-tab title="歌单" class="songlist">
        <ul v-if="data5.length > 0">
          <li @click="push(item1.id)" v-for="item1 in data5" :key="item1.id">
            <div class="left">
              <van-image
                class="img"
                width="50"
                height="50"
                lazy-load
                :src="item1.coverImgUrl"
              />
            </div>
            <div class="right">
              <p
                class=" van-ellipsis"
                v-html="$options.filters.highLight(item1.name, search)"
              ></p>
              <span>{{ item1.trackCount }}首</span>,
              <span>播放{{ item1.playCount | formatNum }}万次</span>
            </div>
          </li>
        </ul>
      </van-tab>

      <van-tab title="视频" class="video">
        <ul v-if="data3.length > 0">
          <li v-for="item in data3" :key="item.id" @click="govideos(item)">
            <van-image
              class="img"
              width="100%"
              lazy-load
              :src="item.coverUrl"
            />
            <p v-html="$options.filters.highLight(item.title, search)"></p>
            <p class="one">
              <span>{{ item.playTime | formatNum }}万次</span>
            </p>
          </li>
          <!-- <li>1</li>
          <li>2</li>
          <li>3</li>
          <li>4</li> -->
        </ul>
      </van-tab>

      <van-tab title="专辑" class="albums">
        <ul v-if="data4.length > 0">
          <li v-for="item1 in data4" :key="item1.id" @click="goalbum(item1.id)">
            <div class="left">
              <van-image
                class="img"
                width="50"
                height="50"
                lazy-load
                :src="item1.blurPicUrl"
              />
            </div>
            <div class="right">
              <p
                class=" van-ellipsis"
                v-html="$options.filters.highLight(item1.name, search)"
              ></p>
              <span>{{ item1.artist.name }} </span>,
              <span> {{ item1.publishTime | format("yyyy-MM-dd") }}</span>
            </div>
          </li>
        </ul>
      </van-tab>

      <van-tab title="歌手" class="singer">
        <ul v-if="data6.length > 0">
          <li v-for="item in data6" :key="item.id" @click="gosinger(item.id)">
            <img
              class="img"
              width="50"
              height="50"
              lazy-load
              :src="item.img1v1Url"
            />
            <span>{{ item.name }}</span>
          </li>
        </ul>
      </van-tab>
      <van-tab title="用户" class="user">
        <ul v-if="data7.length > 0">
          <li
            v-for="item1 in data7"
            :key="item1.id"
            @click="gouser(item1.userId)"
          >
            <div class="left">
              <van-image
                class="img"
                width="50"
                height="50"
                lazy-load
                :src="item1.avatarUrl"
              />
            </div>
            <div class="right">
              <p
                class=" van-ellipsis"
                v-html="$options.filters.highLight(item1.nickname, search)"
              ></p>
              <span class=" van-ellipsis">{{ item1.signature }} </span>
            </div>
          </li>
        </ul>
      </van-tab>
    </van-tabs>
  </div>
</template>

<script>
import axios from "axios";
import { mapState } from "vuex";
import Loading from "@/components/Loading.vue";

export default {
  data() {
    return {
      active: 0,
      value: "",
      //   默认值
      // 搜索列表
      list1: {},
      defaults: "",
      list: [],
      loading: false,
      finished: false,
      num: 0,
      // 单曲
      songs: [],
      //   歌单
      data5: {},
      // 视频
      data3: {},
      // 专辑
      data4: {},
      // 歌手
      data6: {},
      // 用户
      data7: {},
      mv: {}
    };
  },
  filters: {
    highLight(val, keywords) {
      let reg = new RegExp(keywords, "g");
      if (reg.test(val)) {
        return val.replace(
          reg,
          '<span style="color: red">' + keywords + "</span>"
        );
      }
      return val;
    },
    formatNum(val) {
      return (val / 10000).toFixed(2);
    }
  },
  watch: {
    active() {
      if ((this.active = 0)) {
        this.songs = data2.result.songs;

        // for (let i = 0; i < 10; i++) {
        //   this.list.push(this.songs[this.num * 10 + i]);
        // }
      }
    }
  },
  methods: {
    // 前往视频页面
    govideos(id) {
      this.$router.push("/videos/" + id);
      console.log(id);
    },
    // 前往专辑页面
    goalbum(id) {
      this.$router.push("/album/" + id);
    },
    async handle(e) {
      // console.log(e.target.innerText);
      this.$store.commit("setsearch", e.target.innerText);
      // console.log(this.$store.state.search);
      this.$router.push("/searchlist/" + e.target.innerText);
      // this.$router.go(0)
      // this.init()

      let data2 = await axios.get(
        "/search?keywords= " + e.target.innerText + "&type=1"
      );
      this.songs = data2.result.songs;
      this.$store.commit("setsearch", "");

      this.list = [];
      for (let i = 0; i < 10; i++) {
        this.list.push(this.songs[this.num * 10 + i]);
      }
    },
    async onSearch(val) {
      // console.log(1);
      console.log(val);
      this.$store.commit("setsearch", val);
      this.$router.push("/searchlist/" + val);

      let data2 = await axios.get(
        "/search?keywords= " + val + "&type=1"
      );
      this.songs = data2.result.songs;
      this.$store.commit("setsearch", "");

      this.list = [];
      for (let i = 0; i < 10; i++) {
        this.list.push(this.songs[this.num * 10 + i]);
      }
    },
    onLoad() {
      // 异步更新数据
      // setTimeout 仅做示例，真实场景中一般为 ajax 请求
      let that = this;
      setTimeout(() => {
        // console.log(this.songs.result.songs);
        for (let i = 0; i < 10; i++) {
          this.list.push(this.songs[this.num * 10 + i]);
        }
        // console.log(this.list);
        // 加载状态结束
        this.loading = false;

        // 数据全部加载完成
        if (this.list.length >= this.songs.length) {
          this.num = 0;
          this.finished = true;
        }
        this.num = this.num + 1;
      }, 1000);
    },

    async init() {
      // 默认搜索
      let data1 = await axios.get("/search/default");
      // console.log(data2);
      this.defaults = data1.data.realkeyword;

      // 搜索结果
      //   单曲
      let data2 = await axios.get(
        "/search?keywords= " + this.$store.state.search + "&type=1"
      );
      this.songs = data2.result.songs;
      // console.log(this.songs);

      // 视频
      let three = await axios.get(
        "/search?keywords=" + this.$store.state.search + "&type=1014"
      );
      this.data3 = three.result.videos;
      console.log(this.data3);

      // 专辑
      let four = await axios.get(
        "/search?keywords=" + this.$store.state.search + "&type=10"
      );
      // console.log(four);
      this.data4 = four.result.albums;
      // console.log(this.data4);

      // 歌手
      let six = await axios.get(
        "/search?keywords= " + this.$store.state.search + "&type=100"
      );
      this.data6 = six.result.artists;
      // console.log(this.data6);

      // 歌单
      let five = await axios.get(
        "/search?keywords=" + this.$store.state.search + "&type=1000"
      );
      this.data5 = five.result.playlists;
      // console.log(this.data5);

      // 用户
      let sev = await axios.get(
        "/search?keywords=" + this.$store.state.search + "&type=1002"
      );
      this.data7 = sev.result.userprofiles;
      console.log(this.data7);

      // MV
      //  let eit = await axios.get(
      //   "/search?keywords=" + this.$store.state.search + "&type=1009"
      // );
      // // this.data7 = sev.result.userprofiles;
      // console.log(eit);
    },
    going() {
      this.$router.push("/search");
    },
    // 歌手详情
    gosinger(id) {
      this.$router.push("/singerdetail/" + id);
    },
    // 用户详情
    gouser(id) {
      this.$router.push("/user/" + id);
    },
    // 播放
    play(val) {
      console.log(val);
      this.$store.commit("setID", val);
      this.$store.commit("setPic", val.artists[0].img1v1Url);
      this.$store.commit("setName", val.name);
      this.$store.commit("setName1", val.artists[0].name);
      this.$store.commit("setmusicList", val);
    },
    // 跳转页面
    push(id) {
      console.log(id);
      this.$router.push("/songsdetail/" + id);
    }
  },
  created() {
    //   console.log(this.$store.state.search);
    // console.log(this.search);
    this.init();
  },
  // beforeRouteUpdate(to, from, next) {
  //   this.init();
  //   //
  //   next();
  // },
  computed: {
    ...mapState(["search"])
  },
  watch: {
    // 搜索列表
    async value(val) {
      // console.log(val);
      // 如果搜索框值不为空
      if (val) {
        // 搜索框列表
        let data = await axios.get(
          "/search/suggest?keywords= " + val + "&type=mobile"
        );
        this.list1 = data.result.allMatch;
        // console.log(this.list1);
        // let data1 = await axios.get("/search?keywords= 海阔天空");
        // console.log(data1);
        let data2 = await axios.get("/search?keywords= " + val + "&type=1");
        this.songs = data2.result.songs;
        this.$store.commit("setsearch", "");

        this.list = [];
        for (let i = 0; i < 10; i++) {
          this.list.push(this.songs[this.num * 10 + i]);
        }
      } else {
        this.list1 = [];
      }
    }
  },
  components: {
    Loading
  }
};
</script>

<style lang="less" scoped>
#searchList {
  .van-grid-item {
    overflow: hidden;
  }
  // 搜索框
  .top {
    display: flex;
    position: relative;
    ul {
      z-index: 999;
      width: calc(95% - 55px);
      // border: 1px solid #999;
      background-color: #fff;
      position: absolute;
      top: 55px;
      left: 54px;
      box-shadow: 1px 1px 1px 1px #eee;
      li {
        color: #999;
        padding-left: 8px;
        z-index: 10;
        text-align-last: left;
        height: 35px;
        line-height: 35px;
        border-bottom: 1px solid #eee;
        &:last-child {
          border: 0;
        }
        .sou {
          font-size: 18px;
          margin-right: 5px;
          vertical-align: center;
        }
      }
    }
    span {
      font-size: 40px;
      text-align: center;
      line-height: 50px;
      width: 40px;
      height: 54px;
    }
    .one {
      flex: 1;
    }
    .van-search__content {
      padding: 0;
      background-color: #fff;
    }
    .van-cell {
      border-bottom: 1px solid #000;
    }
  }
  // 列表
  .list {
    .left {
      float: left;
      width: 75%;
      span {
        font-size: 14px;
      }
      p {
        width: 90%;
        // line-height: 14px;
        // height: 14px;
        font-size: 12px;
        color: #999;
        margin: 0;
      }
    }
    .play {
      float: right;
      width: 22px;
      height: 22px;
      margin-left: 20px;
      background: url(//s3.music.126.net/mobile-new/img/index_icon_2x.png?5207a28…=)
        no-repeat;
      background-size: 166px 97px;
      background-position: -24px 0;
    }
  }
  //   歌单
  .songlist {
    ul {
      .img {
        overflow: hidden;
        border-radius: 8px;
      }
      li {
        text-align-last: left;
        padding-left: 10px;
        margin-top: 8px;
        .left {
          display: inline-block;
        }
        .right {
          padding-top: 5px;
          width: 80%;
          margin-left: 10px;
          vertical-align: top;
          display: inline-block;
          p {
            margin: 0;
            margin-bottom: 5px;
            font-size: 14px;
          }
          span {
            font-size: 12px;
            color: #999;
          }
        }
      }
    }
  }
  // 视频
  .video {
    ul {
      display: flex;
      flex-wrap: wrap;
      justify-content: space-around;
      padding: 10px 20px;
      li {
        border: 1px solid #eee;
        box-shadow: 2px 2px 2px #ccc;
        border-radius: 10px;
        position: relative;
        flex: 40%;
        height: 165px;
        margin-bottom: 20px;
        &:nth-child(odd) {
          margin-right: 20px;
        }
        .img {
          border-radius: 10px;
          overflow: hidden;
        }
        p {
          padding-left: 5px;
          margin: 0;
          font-size: 12px;
          text-align-last: left;
        }
        .one {
          position: absolute;
          bottom: 5px;
          left: 3px;
          color: #999;
        }
      }
    }
  }
  // 专辑
  .albums {
    ul {
      .img {
        overflow: hidden;
        border-radius: 8px;
      }
      li {
        text-align: left;
        padding-left: 10px;
        margin-top: 8px;
        .left {
          display: inline-block;
        }
        .right {
          padding-top: 5px;
          width: 80%;
          margin-left: 10px;
          vertical-align: top;
          display: inline-block;
          p {
            margin: 0;
            margin-bottom: 5px;
            font-size: 14px;
          }
          span {
            font-size: 12px;
            color: #999;
          }
        }
      }
    }
  }
  // 歌手
  .singer {
    ul {
      padding: 10px;
      .img {
        overflow: hidden;
        border-radius: 50%;
        margin-right: 15px;
        vertical-align: middle;
      }
      li {
        text-align: left;
        border-bottom: 1px solid #eee;
        height: 75px;
        line-height: 75px;
      }
    }
  }
  // 用户
  .user {
    ul {
      .img {
        overflow: hidden;
        border-radius: 50%;
      }
      li {
        text-align: left;
        padding-left: 10px;
        margin-top: 8px;
        .left {
          display: inline-block;
        }
        .right {
          padding-top: 5px;
          width: 80%;
          margin-left: 10px;
          vertical-align: top;
          display: inline-block;
          p {
            margin: 0;
            margin-bottom: 5px;
            font-size: 14px;
          }
          span {
            font-size: 12px;
            color: #999;
          }
        }
      }
    }
  }
}
</style>
