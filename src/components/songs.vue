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
    </div>

    <van-tabs v-model="active" @click="onClick">
      <van-tab :title="item.name" v-for="(item, index) in datas" :key="index">
        <div class="list">
          <van-list
            v-model="loading"
            :finished="finished"
            finished-text="没有更多了"
            @load="onLoad"
          >
            <van-cell
              v-for="item1 in list"
              :key="item1.id"
              @click="play(item1)"
            >
              <div class="left">
                <span>{{ item1.name }}</span>
                <p class="van-ellipsis">
                  {{ item1.artists[0].name }} - {{ item1.album.name }}
                </p>
              </div>
              <div class="play"></div>
            </van-cell>
          </van-list>
        </div>
      </van-tab>
    </van-tabs>
  </div>
</template>

<script>
import axios from "axios";
import { mapState } from "vuex";
export default {
  data() {
    return {
      active: 0,
      value: "",
      //   默认值
      defaults: "",
      list: [],
      songs: [],
      loading: false,
      finished: false,
      num: 0,
      datas: [
        { type: 1, name: "单曲" },
        { type: 1000, name: "歌单" },
        { type: 1014, name: "视频" },
        { type: 100, name: "歌手" },
        { type: 10, name: "专辑" },
        { type: 1002, name: "用户" },
        { type: 1004, name: "MV" }
      ],
      n: 1
    };
  },
  methods: {
    onLoad() {
      // 异步更新数据
      // setTimeout 仅做示例，真实场景中一般为 ajax 请求
      let that = this;
      setTimeout(() => {
        // console.log(this.songs.result.songs);
        for (let i = 0; i < 10; i++) {
          this.list.push(this.songs.result.songs[this.num * 10 + i]);
        }
        // console.log(this.list);
        // 加载状态结束
        this.loading = false;

        // 数据全部加载完成
        if (this.list.length >= this.songs.result.songs.length) {
          this.num = 0;
          this.finished = true;
        }
        this.num = this.num + 1;
      }, 1000);
    },
    onSearch() {},
    async init() {
      // 默认搜索
      let data1 = await axios.get("/search/default");
      // console.log(data2);
      this.defaults = data1.data.realkeyword;

      // 搜索结果
      //   单曲
      this.songs = await axios.get(
        "/search?keywords= " + this.$store.state.search + "&type=1"
      );
      //   console.log(this.songs);

      //   // 专辑
      //   let data3 = await axios.get("/search?keywords= 吴哥窟&type=10");
      //   console.log(data3);

      //   // 歌手
      //   let data4 = await axios.get("/search?keywords= 吴哥窟&type=100");
      //   console.log(data4);

      //   // 歌单
      //   let data5 = await axios.get("/search?keywords= 吴哥窟&type=1000");
      //   console.log(data5);

      //   // 用户
      //   let data6 = await axios.get("/search?keywords= 吴哥窟&type=1004");
      //   console.log(data6);
    },
    going() {
      this.$router.go(-1);
    },
    // 播放
    play(id) {
      this.$store.commit("setID", id);
    },
    // 切换
    async onClick() {
      //   console.log(this.active);
      let type = this.datas[this.active].type;
      console.log(type);
      this.songs = await axios.get(
        "/search?keywords= " + this.$store.state.search + "&type=" + type
      );
    }
  },
  created() {
    //   console.log(this.$store.state.search);
    // console.log(this.search);
    this.init();
  },
  computed: {
    ...mapState(["search"])
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
      width: 75%;
      float: left;
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
}
</style>
