<template>
  <div id="album">
    <!-- 头部  -->
    <div class="title">
      <span class="one" @click="going">‹</span><span class="two">专辑</span>
    </div>
    <van-image class="img" width="100%" :src="data.album.blurPicUrl" />
    <div class="box">
      <h4>{{ this.data.album.name }}</h4>
      <p @click="gosinger()">歌手: {{ this.data.album.artist.name }} ></p>
      <p class="two van-multi-ellipsis--l2">
        {{ this.data.album.description }}
      </p>
    </div>
    <div class="list" v-if="songs.length > 0">
      <van-list
        v-model="loading"
        :finished="finished"
        finished-text="没有更多了"
        @load="onLoad"
      >
        <van-cell
          v-for="(item, index) in list"
          :key="item.id"
          @click="play(item, list, item.id)"
        >
          <div v-if="currentId == item.id" class="num">
            <Loading></Loading>
          </div>
          <div v-else class="num">{{ index + 1 }}</div>
          <div class="word">
            <p class="one van-ellipsis">
              <span>{{ item.name }}</span>
              <span v-if="item.alia[0]" class="three van-ellipsis"
                >({{ item.alia[0] }})</span
              >
            </p>
            <p class="two van-ellipsis">
              {{ item.ar[0].name }} - {{ item.name }}
            </p>
          </div>
          <div class="play"></div>
        </van-cell>
      </van-list>
    </div>
    <Loading v-if="list.length == 0"></Loading>
  </div>
</template>

<script>
import axios from "axios";
import { mapState } from "vuex";
import Loading from "@/components/Loading.vue";

export default {
  props: ["id"],
  data() {
    return {
      data: {},
      songs: [],
      list: [],
      loading: false,
      finished: false,
      num: 0,
      currentId: null
    };
  },

  methods: {
    // 歌手详情
    gosinger() {
      console.log(1);
      this.$router.push("/singerdetail/" + this.data.album.artist.id);
    },
    // 返回 {
    going() {
      this.$router.go(-1);
    },
    onLoad() {
      // 异步更新数据
      // setTimeout 仅做示例，真实场景中一般为 ajax 请求
      let that = this;
      setTimeout(() => {
        if (this.songs.length < 10) {
          this.list = this.songs;
          this.loading = false;
          this.finished = true;
          return false;
        }
        // console.log(this.songs.songs);
        for (let i = 0; i < 10; i++) {
          this.list.push(this.songs[this.num * 10 + i]);
        }
        // console.log(this.list);
        // 加载状态结束
        this.loading = false;

        // 数据全部加载完成
        if (this.list.length >= this.songs.length) {
          this.num = 0;
          this.finished = true;
        }
        this.num = this.num + 1;
      }, 1000);
    },
    async init() {
      // 专辑信息
      this.data = await axios.get("/album?id=" + this.id);
      this.songs = this.data.songs;
      console.log(this.data);
    },
    // 播放
    play(val, items, id) {
      // console.log(this.currentId);
      // console.log(this.list);
      // console.log(items);
      // this.$store.commit("setID", val);
      // this.$store.commit("setmusicList1", items);
      // console.log(this.$store.state.musicList);
      this.$store.commit("setmusicList", val);
      this.$store.commit("setmusicList1", this.list);
      this.$store.commit("setID", val);
      this.$store.commit("setName", val.name);
      this.$store.commit("setPic", val.al.picUrl);
      this.$store.commit("setName1", val.ar[0].name);
    }
  },
  created() {
    this.init();
  },
  components: {
    Loading
  },
  computed: {
    ...mapState(["musicitem"]),
    musicID() {
      return this.musicitem.id;
    }
  }
};
</script>

<style lang="less" scoped>
#album {
  position: relative;
  // 头部
  .title {
    color: #fff;
    position: fixed;
    height: 45px;
    width: 100%;
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
  .list {
    background-color: #fff;
    transform: translateY(-80px);
    .num {
      width: 8%;
      height: 42px;
      line-height: 42px;
      color: #999;
      font-size: 20px;
      float: left;
    }
    .word {
      width: 75%;
      float: left;
      p {
        line-height: 0;
        height: 5px;
        margin: 0;
      }
      .one {
        height: 20px;
        line-height: 20px;
        font-size: 16px;
        .three {
          color: #999;
          padding-left: 8px;
          overflow: hidden;
          width: 80%;
        }
      }
      .two {
        color: #999;
        font-size: 12px;
        height: 20px;
        line-height: 20px;
      }
    }
    .play {
      float: left;
      width: 22px;
      height: 22px;
      margin-left: 20px;
      background: url(//s3.music.126.net/mobile-new/img/index_icon_2x.png?5207a28…=)
        no-repeat;
      background-size: 166px 97px;
      background-position: -24px 0;
    }
  }
  .box {
    position: absolute;
    width: 100%;
    height: 100px;
    background-color: rgba(37, 32, 33, .3);
    top: 33%;
    left: 50%;
    transform: translateX(-50%);
    h4 {
      margin: 0;
      color: #fff;
    }
    p {
      margin: 0;
      font-size: 14px;
      color: rgb(255, 249, 249);
      margin-bottom: 10px;
    }
    .two {
      width: 50%;
      margin-left: 50%;
      transform: translateX(-50%);
    }
  }
}
</style>
