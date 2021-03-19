<template>
  <div id="app">
    <div class="box">
      <play-audio></play-audio>
    </div>
    <tab-btn v-if="$route.meta.showNav"></tab-btn>
    <div class="ready" v-if="ready">
      <img
        src="https://gimg2.baidu.com/image_search/src=http%3A%2F%2Fpic2.zhimg.com%2F50%2Fv2-73f8bc7a6882313331ff1b3d4b5b3b8d_hd.jpg&refer=http%3A%2F%2Fpic2.zhimg.com&app=2002&size=f9999,10000&q=a80&n=0&g=0n&fmt=jpeg?sec=1617625716&t=282ef30ab6dc89ea3e59510445bf45ca"
        alt=""
      />
      <div class="time">{{ time }}</div>
    </div>
    <div v-else class="main">
      <router-view />
    </div>
  </div>
</template>
<script>
import playAudio from "@/components/Play.vue";
import tabBtn from "@/components/tabBtn.vue";

export default {
  data() {
    return {
      ready: false,
      time: 5
    };
  },
  created() {
    let i = sessionStorage.getItem("i");
    if (i !== 1) {
      setTimeout(() => {
        this.time--;
        this.ready = false;
      }, 5000);
    }
    // let i = 1;
    // sessionStorage.setItem('i', 1)
  },
  components: {
    playAudio,
    tabBtn
  }
};
</script>
<style lang="less">
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}
.ready {
  position: relative;
  z-index: 999;
  .time {
    position: absolute;
    right: 10px;
    top: 10px;
    z-index: 99;
  }
  img {
    // z-index: 999;
    width: 100%;
    z-index: -1;
    height: 100%;
  }
}
#nav {
  padding: 30px;
}

#nav a {
  font-weight: bold;
  color: #2c3e50;
}

#nav a.router-link-exact-active {
  color: #42b983;
}
</style>
