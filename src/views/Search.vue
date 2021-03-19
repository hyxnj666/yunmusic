<template>
  <div id="search">
    <!-- 搜索框 -->
    <div class="top">
      <span @click="going">‹</span
      ><van-search
        v-model="value"
        :placeholder="defaults"
        class="one"
        @search="onSearch"
      ></van-search>
      <ul v-if="list.length > 0">
        <li @click="handle($event)" v-for="(item, index) in list" :key="index">
          <van-icon class="sou" name="search" />{{ item.keyword }}
        </li>
      </ul>
    </div>

    <!-- 历史记录 -->
    <div class="history">
      <ul>
        <!-- <li>1</li>
        <li>1</li> -->
        <li v-for="(item, index) in his" :key="index">{{ item }}</li>
      </ul>
    </div>
    <!-- 热搜榜 -->

    <div class="list">
      <ul>
        <li v-for="(item, index) in hot" :key="index">
          <span>{{ index + 1 }}</span>
          <span class="font" @click="handle1(item.searchWord)">{{
            item.searchWord
          }}</span
          ><b><img :src="item.iconUrl" alt="" /></b>
        </li>
      </ul>
    </div>
    <Loading v-if="list.length == 0"></Loading>
  </div>
</template>

<script>
import axios from "axios";
import Loading from "@/components/Loading.vue";

export default {
  data() {
    return {
      value: "",
      //   热搜
      hot: {},
      // 默认
      defaults: "",
      // 搜索列表
      list: {},
      his: [],
    };
  },
  computed: {
    // lists(){
    //    if (typeof this.list.result.allMatch == 'object') {
    //     return this.list.result.allMatch
    //   } else {
    //     return []
    //   }
    // }
  },
  methods: {
    // 搜索
    // 跳转搜索结果页面并传值
    onSearch(val) {
      // console.log(val);

      // let his = sessionStorage.getItem("his"||[]);
      // hises.push(his)
      // console.log(hises);

      this.$store.commit("setsearch", val);
      this.$router.push("/searchlist/" + val);
      console.log(val);
      // sessionStorage.setItem("his", his);
      // console.log(this.$store.state.search);
    },
    going() {
      this.$router.push("/");
    },
    handle(e) {
      // console.log(e.target.innerText);
      // let his = sessionStorage.getItem("his"||[]);
      // his.push(val);

      this.$store.commit("setsearch", e.target.innerText);
      this.$router.push("/searchlist/" + e.target.innerText);
      // sessionStorage.setItem("his", his);
    },
    handle1(val) {
      // console.log(val);
      // let his = sessionStorage.getItem("his") || [];
      // //  his.push(val)
      // console.log(his);

      this.$store.commit("setsearch", val);
      this.$router.push("/searchlist/" + val);
      // his.push(val)
      // sessionStorage.setItem("his", val);
    },
    async init() {
      // this.his = sessionStorage.getItem("his");
      // console.log(this.his);
      // 热搜
      let data = await axios.get("/search/hot/detail");
      this.hot = data.data;
      // console.log(this.hot);
      // let data1 = await axios.get("http://musicapi.leanapp.cn/search/hot/detail")
      // console.log(data);

      // 默认搜索
      let data2 = await axios.get("/search/default");
      // console.log(data2);
      this.defaults = data2.data.realkeyword;
    },
    // 播放
    // play(val) {
    //   console.log(val);
    // }
  },
  watch: {
    // 搜索列表
    async value(val) {
      // console.log(val);
      // 如果搜索框值不为空
      if (val) {
        // sessionStorage.setItem("his", val)
        // 搜索框列表
        let data = await axios.get(
          "/search/suggest?keywords= " + val + "&type=mobile"
        );
        this.list = data.result.allMatch;
        // console.log(this.list);
        // let data1 = await axios.get("/search?keywords= 海阔天空");
        // console.log(data1);
      } else {
        this.list = [];
      }
    },
  },
  created() {
    this.init();
  },
  components: {
    Loading,
  },
};
</script>

<style lang="less" scoped>
#search {
  #play {
    bottom: 0;
  }
  box-sizing: border-box;
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
  // 历史记录
  .history {
    ul {
      display: flex;
      flex-wrap: wrap;
      li {
        width: 20%;
        background-color: #eee;
        margin: 10px 20px;
        color: 000;
        font-size: 16px;
        border-radius: 5px;
      }
    }
    margin-bottom: 10px;
  }
  // 热搜榜
  .list {
    ul {
      padding-left: 8px;
      display: flex;
      flex-wrap: wrap;
      li {
        margin-top: 8px;
        font-size: 14px;
        flex: 50%;
        text-align: left;
        &:nth-child(-n + 3) {
          font-weight: 700;
        }

        span {
          color: #999;
          margin-right: 10px;
        }
        .font {
          color: #000;
        }
        b {
          margin-left: 5px;
          display: inline-block;
          width: 18px;
          img {
            width: 100%;
            height: 100%;
            vertical-align: middle;
          }
        }
      }
    }
  }
}
</style>
