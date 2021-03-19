<template>
  <div id="bodetail">
    <!-- 头部  -->
    <div class="title">
      <span class="one" @click="going">‹</span><span class="two">播单</span>
    </div>
    <van-image class="img" width="100%" :src="songs[0].coverUrl" />
    <div class="list" v-if="songs.length > 0">
      <van-list
        v-model="loading"
        :finished="finished"
        finished-text="没有更多了"
        @load="onLoad"
      >
        <van-cell
          v-for="item in list"
          :key="item.id"
          @click="play(item, list, item.id)"
        >
          <div v-if="currentId == item.id" class="num">
            <Loading></Loading>
          </div>
          <div v-else class="num">{{ item.serialNum }}</div>
          <div class="word">
            <p class="one van-ellipsis">
              <span>{{ item.name }}</span>
              <!-- <span v-if="item.alia[0]" class="three van-ellipsis"
                >({{ item.alia[0] }})</span
              > -->
            </p>
            <p class="two van-ellipsis">
              {{ item.listenerCount }} - {{ item.dj.nickname }}
            </p>
          </div>
          <div class="play"></div>
        </van-cell>
      </van-list>
      <Loading v-if="list.length == 0"></Loading>
    </div>
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
      songs: [],
      list: [],
      loading: false,
      finished: false,
      num: 0,
      currentId: null
    };
  },
    watch: {
    musicID() {
      console.log(this.musicID);
      this.currentId = this.musicID;
    }
  },
  methods: {
    going() {
      this.$router.go(-1);
    },
    onLoad() {
      // 异步更新数据
      // setTimeout 仅做示例，真实场景中一般为 ajax 请求
      let that = this;
      setTimeout(() => {
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
      let xiang = await axios.get("/dj/program?rid=" + this.id);
      this.songs = xiang.programs;
      console.log(this.songs);
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
      this.$store.commit("setPic", val.coverUrl);
      this.$store.commit("setName1", val.dj.nickname);
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
#bodetail {
  // 头部
  .title {
    color: #fff;
    height: 45px;
    width: 100%;
    z-index: 1;
    padding-left: 18px;
    text-align: left;
    position: fixed;
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
}
</style>
