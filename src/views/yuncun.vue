<template>
  <div id="yuncun">
    <div class="header">
      <van-cell id="cell" @click="showPopup">☰</van-cell>
      <van-tabs v-model="active" swipeable>
        <van-tab v-for="index in 4" :title="'选项 ' + index" :key="index">
        </van-tab>
      </van-tabs>
      <div class="icon">
        <img
          src="https://ss1.bdstatic.com/70cFvXSh_Q1YnxGkpoWK1HF6hhy/it/u=3136626573,2216251976&fm=26&gp=0.jpg"
          alt=""
        />
      </div>
    </div>
    <tab-btn></tab-btn>
  </div>
</template>

<script>
import axios from "axios";
import tabBtn from "@/components/tabBtn.vue";
export default {
  data() {
    return {
      active: 0
    };
  },
  methods: {
    showPopup() {}
  },
  components: {
    tabBtn
  }
};
</script>

<style lang="less" scoped>
#yuncun{
  img {
    margin-top: 100px;
    width: 100%;
}
}
</style>
