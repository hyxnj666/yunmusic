<template>
  <div id="songs">
    <!-- 头部  -->
    <div class="title">
      <span class="one" @click="going">‹</span><span class="two">歌单广场</span><span class="three" @click="gosongslabel()"><van-icon name="apps-o" to="/songslabel"/></span>
    </div>

    <!-- 滚动标签 -->
    <div class="label">
      <van-tabs :line-height="'3px'" :line-width="'35px'" v-model="active">
        <van-tab title="推荐" class="rec">
          <h3>优质歌单甄选</h3>
          <van-grid :column-num="3" :border="false" v-if="data1.length > 0">
            <van-grid-item
              class="grid"
              :to="'/songsdetail/' + item.id"
              v-for="item in data1"
              :key="item.id"
            > 
              <van-image
                class="img"
                fit="cover"
                lazy-load
                :src="item.coverImgUrl"
                rel="external nofollow"
              />
              <span class="count">{{ item.playCount | formatNum }}万</span>
              <p class="pra van-multi-ellipsis--l2">{{ item.name }}</p>
            </van-grid-item>
          </van-grid>
          <Loading v-if="data1.length == 0"></Loading>

          <h3>必听的官方歌单</h3>
          <van-grid :column-num="3" :border="false" v-if="data2.length > 0">
            <van-grid-item
              class="grid"
              :to="'/songsdetail/' + item.id"
              v-for="item in data2"
              :key="item.id"
            >
              <van-image
                class="img"
                fit="cover"
                lazy-load
                :src="item.coverImgUrl"
                rel="external nofollow"
              />
              <span class="count">{{ item.playCount | formatNum }}万</span>
              <p class="pra van-multi-ellipsis--l2">{{ item.name }}</p>
            </van-grid-item>
          </van-grid>

          <h3>这些歌单你一定在找</h3>
          <van-grid :column-num="3" :border="false" v-if="data3.length > 0">
            <van-grid-item
              class="grid"
              :to="'/songsdetail/' + item.id"
              v-for="item in data3"
              :key="item.id"
            >
              <van-image
                class="img"
                fit="cover"
                lazy-load
                :src="item.coverImgUrl"
                rel="external nofollow"
              />
              <span class="count">{{ item.playCount | formatNum }}万</span>
              <p class="pra van-multi-ellipsis--l2">{{ item.name }}</p>
            </van-grid-item>
          </van-grid>
          <Loading v-if="data1.length == 0"></Loading>
        </van-tab>

        <van-tab
        
          v-for="item in data"
          :key="item.id"
          :title="item.name"
        >
          <van-grid :column-num="3" :border="false" v-if="datas.length > 0">
            <van-grid-item
              class="grid"
              :to="'/songsdetail/' + item.id"
              v-for="item in datas"
              :key="item.id"
            >
              <van-image
                class="img"
                fit="cover"
                lazy-load
                :src="item.coverImgUrl"
                rel="external nofollow"
              />
              <span class="count">{{ item.playCount | formatNum }}万</span>
              <p class="pra van-multi-ellipsis--l2">{{ item.name }}</p>
            </van-grid-item>
          </van-grid>
          <Loading v-if="datas.length == 0"></Loading>

        </van-tab>
      </van-tabs>
          <Loading v-if="datas.length == 0"></Loading>

          <div class="bottom">暂无更多歌单</div>

    </div>
    
          <Loading v-if="datas.length == 0"></Loading>

  </div>
</template>

<script>
import axios from "axios";
import Loading from "@/components/Loading.vue";

export default {
  data() {
    return {
      active: 0,
      // 头部十种热门分类
      data: {},
      // 推荐歌单  (详情)
      data1: {},
      data2: {},
      data3: {},
      // 其他歌单
      datas: {}
    };
  },
  methods: {
    going() {
      this.$router.go(-1);
    }, 
    gosongslabel(){
      this.$router.push("/songslabel")
    },
    async init() {
      // 十种热门分类
      let one = await axios.get("/playlist/hot");
      this.data = one.tags;
      // console.log(this.data);

      // 推荐歌单（详情）
      let two = await axios.get("/top/playlist?limit=6&order=hot");
      let two1 = await axios.get("/top/playlist?limit=6&cat=华语");
      let two3 = await axios.get("/top/playlist/highquality?limit=12");
      this.data1 = two.playlists;
      this.data2 = two1.playlists;
      this.data3 = two3.playlists;
      // console.log(this.data1);
      // console.log(this.data3);
    }
  },
  watch: {
    async active() {
      // 其他歌单
      let val = this.data[this.active - 1].name;
      // console.log(this.data[this.active-1].name);
      let songs = await axios.get("/top/playlist?&limit=60&cat=" + val);
      this.datas = songs.playlists;
      // console.log(this.datas);
    }
  },
  created() {
    this.init();
  },
  filters: {
    formatNum(val) {
      return (val / 10000).toFixed(2);
    }
  },
  components: {
    Loading
  }
};
</script>

<style lang="less" scoped>
#songs {
  .van-grid-item {
    overflow: hidden;
  }
  // 头部
  .title {
    height: 45px;
    width: 100%;
    background-color: #fff;
    position: fixed;
    z-index: 1;
    padding-left: 18px;
    text-align: left;
    margin-bottom: 5px;
    .one {
      font-size: 38px;
      text-align: center;
      line-height: 40px;
      width: 40px;
      height: 40px;
    }
    .two {
      margin-left: 10px;
      font-size: 20px;
    }
    .three {
      font-size: 20px;
      margin-left: 60%;
      position: absolute;
      top: 15px;
      right: 28px;
    }
  }
  // 标签
  .label {
    transform: translateY(45px);
    // 推荐
    h3 {
      font-weight: 400;
      text-align-last: left;
      margin: 15px;
      margin-bottom: 0;
      margin-left: 0;
      padding-left: 10px;
      border-left: 2px solid #ee0a24;
    }
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
      width: 90%;
    }
    .bottom {
      width: 100%;
      height: 80px;
      font-size: 14px;
    }
  }
}
</style>
