<template>
  <div id="mvsquare">
    <!-- 头部  -->
    <div class="title">
      <span class="one" @click="going">‹</span><span class="two">MV排行榜</span>
    </div>

    <!-- 内容 -->
    <div class="label">
      <van-tabs :line-height="'3px'" :line-width="'35px'" v-model="active">
        <van-tab
          v-for="(item, index) in area"
          :key="index"
          :title="item"
          class="rec"
        >
          <h4>更新时间：{{ time }}</h4>
          <van-grid :column-num="2">
            <van-grid-item
              class="grid"
              v-for="(item) in dataone"
              :key="item.id"
              :to="'/Mv/' + item.id"
            >
              <van-image
                class="img"
                fit="cover"
                lazy-load
                :src="item.cover"
                rel="external nofollow"
              />
              <span class="count">{{ item.playCount | formatNum }}万</span>
              <div class="word">
                <p class="one van-ellipsis">{{ item.name }}</p>
                <p class="van-ellipsis">{{ item.artistName }}</p>
              </div>
            </van-grid-item>
          </van-grid>
        </van-tab>
      </van-tabs>
    </div>
    
    <!-- <Loading></Loading> -->
  </div>
</template>

<script>
import axios from "axios";
import Loading from "@/components/Loading.vue";
export default {
  data() {
    return {
      active: 0,
      area: ["内地", "港台", "欧美", "韩国", "日本"],
      dataone: {},
      time: ""
    };
  },
  created() {
    this.init();
  },
  watch: {
    async active(index) {
      console.log(index);
      let arr = this.area;
      let data = await axios.get("/mv/all?area=" + arr[index]);
      this.dataone = data.data;
    }
  },
  methods: {
    going() {
      this.$router.go(-1);
    },
    async init() {
      this.time = new Date().toLocaleDateString();
      let data = await axios.get("/mv/all?area=内地");
      this.dataone = data.data;
      console.log(this.dataone);
    }
  },
  components: {
    // Loading
  },
  filters: {
    formatNum(val) {
      return (val / 10000).toFixed(2);
    }
  }
};
</script>

<style lang="less" scoped>
#mvsquare {
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
  }
  //   内容
  .label {
    // position: relative;
    transform: translateY(45px);
    h4 {
      margin: 0;
      margin-top: 5px;
      text-align: left;
      font-weight: 400;
      padding-left: 10px;
    }
    .img {
      border-radius: 15px;
      overflow: hidden;
    }
    .count {
      position: absolute;
      top: 30px;
      right: 18px;
      background-image: url(data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCAyMiAyMCI+PHBhdGggZmlsbC1ydWxlPSJldmVub2RkIiBmaWxsPSIjMDQwMDAwIiBkPSJNMjIgMTYuNzc3YzAgMS4yMzMtMS4xMjEgMi4yMzMtMi41MDYgMi4yMzMtMS4zODQgMC0yLjUwNi0xLTIuNTA2LTIuMjMzdi0yLjU1M2MwLTEuMjM0IDEuMTIyLTIuMjMzIDIuNTA2LTIuMjMzLjE3NCAwIC4zNDMuMDE3LjUwNi4wNDZ2LTEuMzdoLS4wMzNjLjAxNy0uMjIuMDMzLS40NDEuMDMzLS42NjZhOCA4IDAgMCAwLTE2IDBjMCAuMjI1LjAxNi40NDYuMDM0LjY2Nkg0djEuMzdjLjE2My0uMDI5LjMzMy0uMDQ2LjUwNS0uMDQ2IDEuMzg0IDAgMi41MDYuOTk5IDIuNTA2IDIuMjMzdjIuNTUzYzAgMS4yMzMtMS4xMjIgMi4yMzMtMi41MDYgMi4yMzNTMiAxOC4wMTEgMiAxNi43Nzd2LTIuNTUzYzAtLjI1OC4wNTktLjUwMS4xNDgtLjczQS45ODIuOTgyIDAgMCAxIDIgMTMuMDAxdi0yLjY2N2MwLS4wMjMuMDEyLS4wNDMuMDEzLS4wNjctLjAwNC0uMDg4LS4wMTMtLjE3Ni0uMDEzLS4yNjYgMC01LjUyMyA0LjQ3Ny0xMCAxMC0xMHMxMCA0LjQ3NyAxMCAxMGMwIC4wOS0uMDA5LjE3OC0uMDE0LjI2Ni4wMDIuMDI0LjAxNC4wNDQuMDE0LjA2N3YyYS45ODguOTg4IDAgMCAxLS4zNi43NTNjLjIyNC4zMzQuMzYuNzIuMzYgMS4xMzh2Mi41NTIiIG9wYWNpdHk9Ii4xNSIvPjxwYXRoIGZpbGwtcnVsZT0iZXZlbm9kZCIgZmlsbD0iI2ZmZiIgZD0iTTIwIDE2Ljc3N2MwIDEuMjMzLTEuMTIxIDIuMjMzLTIuNTA2IDIuMjMzLTEuMzg0IDAtMi41MDYtMS0yLjUwNi0yLjIzM3YtMi41NTNjMC0xLjIzNCAxLjEyMi0yLjIzMyAyLjUwNi0yLjIzMy4xNzQgMCAuMzQzLjAxNy41MDYuMDQ2di0xLjM3aC0uMDMzYy4wMTctLjIyLjAzMy0uNDQxLjAzMy0uNjY2YTggOCAwIDAgMC0xNiAwYzAgLjIyNS4wMTYuNDQ2LjAzNC42NjZIMnYxLjM3Yy4xNjMtLjAyOS4zMzMtLjA0Ni41MDUtLjA0NiAxLjM4NCAwIDIuNTA2Ljk5OSAyLjUwNiAyLjIzM3YyLjU1M2MwIDEuMjMzLTEuMTIyIDIuMjMzLTIuNTA2IDIuMjMzUzAgMTguMDExIDAgMTYuNzc3di0yLjU1M2MwLS4yNTguMDU5LS41MDEuMTQ4LS43M0EuOTgyLjk4MiAwIDAgMSAwIDEzLjAwMXYtMi42NjdjMC0uMDIzLjAxMi0uMDQzLjAxMy0uMDY3LS4wMDQtLjA4OC0uMDEzLS4xNzYtLjAxMy0uMjY2IDAtNS41MjMgNC40NzctMTAgMTAtMTBzMTAgNC40NzcgMTAgMTBjMCAuMDktLjAwOS4xNzgtLjAxNC4yNjYuMDAyLjAyNC4wMTQuMDQ0LjAxNC4wNjd2MmEuOTg4Ljk4OCAwIDAgMS0uMzYuNzUzYy4yMjQuMzM0LjM2LjcyLjM2IDEuMTM4djIuNTUyIi8+PC9zdmc+);
      background-repeat: no-repeat;
      background-size: 12px;
      font-size: 12px;
      color: #fff;
      text-shadow: 0px 0px 2px #000;
      padding-left: 14px;
      line-height: 10px;
    }

    .word {
      width: 75%;
      font-size: 14px;
      margin-top: 5px;
      //   float: left;
      p {
        margin: 0;
      }
    }
  }
}
</style>
