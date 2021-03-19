<template>
  <div id="videos">
    <video :src="mv"></video>
    <p>哈哈哈你被和谐了！！！</p>
  </div>
</template>

<script>
import axios from "axios";
export default {
  props: ["id"],
  data() {
    return {
        mv:{}
    };
  },
  methods: {
    async init() {
      let one = await axios.get(
        "/video/url?id="+this.id
      );
      this.mv = one.urls[0].url;
      console.log(one);
    }
  },
  created() {
    this.init();
  }
};
</script>

<style lang="less" scoped>
#videos {
    video {
        width: 100%;
    }
    p {
      font-size: 20px;
    }
}

</style>
