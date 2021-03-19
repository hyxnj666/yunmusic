<template>
  <div id="ranking">
    <!-- 头部  -->
    <div class="title">
      <span class="one" @click="going">‹</span><span class="two">排行榜</span>
    </div>
 
    <!-- 内容 -->
    <div class="content">
      <ul v-for="item in data1" :key="item.id" @click="godetail">
        <h4>{{ item.name }}</h4>
        <li>
          <van-image
            class="img4"
            fit="cover"
            lazy-load
            :src="item.coverImgUrl"
            rel="external nofollow"
          />
          <p v-for="(item1, index1) in item.tracks" :key="index1">
            <span>{{ index1 + 1 }}</span
            ><span>{{ item1.first }}</span> -<span>{{ item1.second }}</span>
          </p>
        </li>
      </ul>
    </div>
    <div class="bottom"></div>
  </div>
</template>

<script>
import axios from "axios";
export default {
  data() {
    return {
      // 摘要
      data1: []
    };
  },
  methods: {
    // 返回 {
    going() {
      this.$router.go(-1);
    },
    // 排行榜详情
    godetail() {
      this.$router.push("/rankingdetail");
    },
    async init() {
      let data = await axios.get("/toplist/detail");
      for (let i = 0; i < 4; i++) {
        this.data1.push(data.list[i]);
      }
      // this.data = data.list;
      console.log(data);
    }
  },
  created() {
    this.init();
  }
};
</script>

<style lang="less" scoped>
#ranking {
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
  .my-swipe .van-swipe-item {
    margin-top: 54px;
    color: #fff;
    font-size: 20px;
    text-align: center;
  }
  .van-tabs__nav--line {
    padding-bottom: 5px;
  }
  // 头部
  .title {
    height: 45px;
    width: 100%;
    background-color: #fff;
    z-index: 1;
    padding-left: 18px;
    position: fixed;
    text-align: left;
    // margin-bottom: 5px;
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
    border-bottom: 1px solid #eee;
  }
  // 内容
  .content {
    transform: translateY(45px);
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
      height: 220px;
      margin-bottom: 10px;
      &:nth-child(even) {
        background-color: rgb(248, 223, 227);
      }
      &:nth-child(odd) {
        background-color: rgb(214, 240, 250);
      }
      li {
        // display: flex;
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
  .bottom {
    height: 80px;
    background-color: #fff;
  }
}
</style>
