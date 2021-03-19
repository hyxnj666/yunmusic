<template>
  <div id="day">
    <!-- 头部  -->
    <div class="title">
      <span class="one" @click="going">‹</span><span class="two">每日推荐</span>
    </div>
    哈哈哈你没了！！！
    <button @click="phone">获取验证码</button>
    <button @click="phonere">验证验证码</button>
    <button @click="register">注册</button>
    <button @click="logout">退出登录</button>
  </div>
</template>

<script>
import axios from "axios";
export default {
  data() {
    return {};
  },
  methods: {
    going() {
      this.$router.go(-1);
    },
    async init() {
      // let token =
      //   "ea77c387d5cf32670384f135013c9b3a0bfc59249e16da2a61a951678caa56080931c3a9fbfe3df2";
      // axios({
      //   method: "GET",
      //   data: {
      //     token: token
      //   },
      //   url: "/recommend/songs",
      //   headers: {
      //     // "Authori-zation": "Bearer" + token
      //     token: token
      //   }
      // }).then(d => {
      //   console.log(d);
      // });
      // let data = await axios.get("/recommend/resource?timestamp=1503019930000");
      // let data1 = await axios.get("/recommend/songs");
      // let login = await axios.get("/user/detail?uid=32953014");
      // console.log(data);
      // console.log(data1);
      // console.log(login);
    },
    // 获取验证码
    async phone() {
      let phone = await axios.get("/captcha/sent?phone=17673862865");
      console.log(phone);
    },
    // 验证验证码
    async phonere() {
      let phonere = await axios.get(
        "/captcha/verify?phone=17673862865&captcha=8175"
      );
      console.log(phonere);
    },
    // 注册
    async register() {
      let phone = await axios.get(
        "/cellphone/existence/check?phone=17673862865"
      );
      console.log(phone);
      let register = await axios.get(
        "/register/cellphone?phone=17673862865&password=lf19991121&captcha=8175&nickname=hyxnj666"
      );
      console.log(register);
    },

    // 退出登录
    async logout() {
      let logout = await axios.get("/logout");
      console.log(logout);
      sessionStorage.setItem("code", 400);
      this.$router.push("/")
    }
  },
  created() {
    this.init();
  }
};
</script>

<style lang="less" scoped>
#day {
  span {
    font-size: 38px;
    text-align: center;
    line-height: 40px;
    width: 40px;
    height: 40px;
  }
  // 头部
  .title {
    height: 45px;
    width: 100%;
    background-color: #fff;
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
    border-bottom: 1px solid #eee;
  }
}
</style>
