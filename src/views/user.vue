<template>
  <div id="user">
    <!-- 头部  -->
    <div class="title">
      <span class="one" @click="going">‹</span
      ><span class="two">{{ data.profile.nickname }}</span>
    </div>
    <van-image class="img" width="100%" :src="data.profile.backgroundUrl" />
    <div class="msg">
      <van-image
        class="img"
        width="80"
        height="80"
        lazy-load
        :src="data.profile.avatarUrl"
      />
      <ul class="total">
        <li>
          <span>{{ data.profile.followeds }}</span
          ><br /><span class="two">粉丝</span>
        </li>
        <li>
          <span>{{ data.profile.follows }}</span
          ><br /><span class="two">关注</span>
        </li>
        <li>
          <span>lv：{{ data.level }}</span
          ><br /><span class="two">等级</span>
        </li>
      </ul>
    </div>
    <div class="mes">
      <ul>
        <h3>基本信息</h3>
        <li>
          村龄：<span>{{ age }}年</span>
        </li>
        <li>性别：<span>{{gender}}</span></li>
      </ul>
    </div>
  </div>
</template>

<script>
import axios from "axios";
export default {
  props: ["id"],
  data() {
    return {
      data: {},
      age: "",
      gender: ""
    };
  },

  methods: {
    // 返回 {
    going() {
      this.$router.go(-1);
    },
    async init() {
     
      this.data = await axios.get("/user/detail?uid=" + this.id);

      let data1 = await axios.get("/user/playlist?uid=" + this.id);

      console.log(this.data);
      console.log(data1);
      this.age = parseInt(this.data.createDays / 365);
      this.gender = this.data.profile.gender;
      if (this.gender == 1) {
        this.gender = "男";
      } else {
        this.gender = "女";
      }
      console.log(this.gender);
    }
  },
  created() {
    this.init();
  }
};
</script>

<style lang="less" scoped>
#user {
  background-color: rgb(252, 247, 247);
  // 头部
  .title {
    color: #fff;
    height: 45px;
    width: 100%;
    // background-color: #fff;
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
  .msg {
    box-sizing: border-box;
    display: flex;
    padding-left: 15px;
    text-align: left;
    width: 100%;
    height: 120px;
    background-color: rgba(255, 255, 255, 0.8);
    transform: translateY(-50px);
    .img {
      overflow: hidden;
      border-radius: 50%;
      margin-right: 30px;
    }
    .total {
      padding-top: 20px;
      li {
        text-align: center;
        width: 80px;
        float: left;
        &:nth-child(-n + 2) {
          border-right: 1px solid #ccc;
        }
        span {
          font-weight: 700;
        }
        .two {
          font-size: 12px;
          color: #999;
          font-weight: 400;
        }
      }
    }
  }
  .mes {
    box-sizing: border-box;
    width: 100%;
    height: 150px;
    transform: translateY(-50px);
    padding-left: 15px;
    padding-right: 15px;
    overflow: hidden;
    ul {
      border-radius: 10px;
      background-color: #fff;
      width: 100%;
      height: 100%;
      padding-top: 5px;
      padding-left: 8px;
      h3 {
        font-weight: 400;
        text-align: left;
        margin: 0;
        margin-bottom: 5px;
      }
      li {
        text-align: left;
        font-size: 14px;
        color: #999;
        margin-bottom: 5px;
        span {
          color: #000;
        }
      }
    }
  }
}
</style>
