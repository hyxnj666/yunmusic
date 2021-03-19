<template>
  <div id="rankingdetail"></div>
</template>

<script>
import axios from "axios";
export default {
  data() {
    return {};
  }, 
  methods: {
    async init() {
      let data = await axios.get("/toplist/detail?id=19723756");
      console.log(data);
    }
  },
  created() {
    this.init();
  }
};
</script>

<style lang="less" scoped></style>
