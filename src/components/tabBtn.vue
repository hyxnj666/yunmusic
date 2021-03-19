<template>
  <!-- 底部导航栏 -->
  <van-tabbar v-model="tabActive" route active-color="#d43c33">
    <van-tabbar-item icon="home-o" :dot="true" to="/">发现</van-tabbar-item>
    <van-tabbar-item icon="fire-o" to="/boke">播客</van-tabbar-item>
    <van-tabbar-item icon="user-o" to="/myself">我的</van-tabbar-item>
    <van-tabbar-item icon="music-o" to="/Ksings">K歌</van-tabbar-item>
    <van-tabbar-item icon="friends-o" to="/yuncun">云村</van-tabbar-item>
  </van-tabbar>
</template>
<script>
export default {
  data() {
    return {
      tabActive: 0
    };
  },
  mounted() {
    switch (this.$route.path) {
      case "/":
        this.tabActive = 0;
        break;
      case "/boke":
        this.tabActive = 1;
        break;
      case "/myself":
        this.tabActive = 2;
        break;
      case "/Ksings":
        this.tabActive = 3;
        break;
      case "/yuncun":
        this.tabActive = 4;
        break;
    }
  }
};
</script>

<style lang="less" scoped></style>
