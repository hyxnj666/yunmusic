<template>
  <div id="boke">
    <div class="header">
      <van-cell id="cell" @click="showPopup">☰</van-cell>
      <van-popup v-model="show" position="left" :style="{ width: '60%' }"
        ><span @click="tologin" class="login">登录/注册</span></van-popup
      >
      <van-search
        v-model="searchData"
        shape="round"
        background="#efefef"
        :placeholder="defaults"
        @click="rander"
      />
      <div class="icon">
        <van-icon name="service-o" />
      </div>
    </div>
    <div class="title">
      <van-tabs v-model="active">
        <van-tab title="听听">
          <div class="singer">
            <van-grid :column-num="2" :border="false">
              <van-grid-item v-for="item in singers" :key="item.id">
                <van-image
                  class="img2"
                  fit="cover"
                  lazy-load
                  :src="item.avatarUrl"
                  rel="external nofollow"
                  @click="plays(item.id)"
                />
                <p class="van-ellipsis">{{ item.nickName }}</p>
              </van-grid-item>
            </van-grid>
          </div>
        </van-tab>
        <van-tab title="推荐">
          <!-- 精选播单  -->
          <div class="dish">
            <list-title
              ><h3>精选播单</h3>
              <button @click="tosquare">更多 ></button></list-title
            >
            <van-grid :column-num="3" :border="false">
              <van-grid-item v-for="item in dish" :key="item.id">
                <van-image
                  class="img2"
                  fit="cover"
                  lazy-load
                  :src="item.picUrl"
                  rel="external nofollow"
                  @click="todetail(item.id)"
                />
                <p class="van-ellipsis">{{ item.name }}</p>
              </van-grid-item>
            </van-grid>
          </div>
          <!-- 热门电台  -->
          <div class="hot">
            <list-title><h3>热门电台</h3> </list-title>
            <van-grid :column-num="3" :border="false">
              <van-grid-item v-for="item in hots" :key="item.id">
                <van-image
                  class="img2"
                  fit="cover"
                  lazy-load
                  :src="item.picUrl"
                  rel="external nofollow"
                  @click="todetail(item.id)"
                />
                <p class="van-ellipsis">{{ item.name }}</p>
              </van-grid-item>
            </van-grid>
          </div>
          <!-- 情感调频  -->
          <div class="feel">
            <list-title><h3>情感调频 | 治愈你的每一种声音</h3> </list-title>
            <van-grid :column-num="3" :border="false">
              <van-grid-item v-for="item in feels" :key="item.id">
                <van-image
                  class="img2"
                  fit="cover"
                  lazy-load
                  :src="item.picUrl"
                  rel="external nofollow"
                  @click="todetail(item.id)"
                />
                <p class="van-ellipsis">{{ item.name }}</p>
              </van-grid-item>
            </van-grid>
          </div>
          <!-- 音乐故事  -->
          <div class="story">
            <list-title><h3>音乐故事 | 这有一个故事陪着你</h3> </list-title>
            <van-grid :column-num="3" :border="false">
              <van-grid-item v-for="item in storys" :key="item.id">
                <van-image
                  class="img2"
                  fit="cover"
                  lazy-load
                  :src="item.picUrl"
                  rel="external nofollow"
                  @click="todetail(item.id)"
                />
                <p class="van-ellipsis">{{ item.name }}</p>
              </van-grid-item>
            </van-grid>
          </div>
        </van-tab>
        <van-tab title="分类">内容 3</van-tab>
      </van-tabs>
    </div>
    <div class="bottom"></div>
  </div>
</template>

<script>
import axios from "axios";
import listTitle from "@/components/listTitle.vue";

export default {
  data() {
    return {
      active: 1,
      show: false,
      defaults: "",
      searchData: "",
      //   主播
      singers: [],
      //   精选播单
      dish: [],
      //   热门电台
      hots: [],
      //   情感
      feels: [],
      //   音乐故事
      storys: []
    };
  },
  methods: {
    //   前往播单详情
    todetail(id) {
      this.$router.push("/bodetail/"+id);
    },
    //   前往播单广场
    tosquare() {
      this.$router.push("/bosquare");
    },
    tologin() {
      this.$router.push("login");
    },
    async init() {
      let singer = await axios.get("/dj/toplist/popular?limit=30");
      this.singers = singer.data.list;
    //   console.log(this.singers);

      // 精选播单
      let power = await axios.get("/dj/recommend");
      for (let i = 0; i < 6; i++) {
        this.dish.push(power.djRadios[i]);
      }
      //   console.log(this.dish);

      // 热门电台
      let hot = await axios.get("/dj/hot");
      for (let i = 0; i < 6; i++) {
        this.hots.push(hot.djRadios[i]);
      }
      // console.log(this.hots);

      // 情感调频
      let feel = await axios.get("/dj/recommend/type?type=3");
      for (let i = 0; i < 3; i++) {
        this.feels.push(feel.djRadios[i]);
      }
      //   console.log(this.feels);

      // 音乐故事
      let story = await axios.get("/dj/recommend/type?type=2");
      for (let i = 0; i < 3; i++) {
        this.storys.push(story.djRadios[i]);
      }

     
    },
    showPopup() {
      this.show = true;
    },
    rander() {
      // console.log(1);
      this.$router.push("/search");
    }
  },
  created() {
    this.init();
  },
  components: {
    listTitle
  }
};
</script>

<style lang="less" scoped>
#boke {
  .login {
    font-size: 20px;
  }
  .van-grid-item {
    overflow: hidden;
  }
  background-color: #efefef;
  .header {
    width: 100%;
    z-index: 2;
    // position: fixed;
    height: 54px;
    display: flex;
    #cell {
      background-color: #efefef;
    }
    .van-cell {
      width: 10%;
      padding-left: 0;
      padding-right: 0;
      .van-cell__value--alone {
        text-align: center;
        font-size: 24px;
        padding-top: 5px;
      }
    }
    .van-search {
      width: 83%;
      padding-right: 0;
      padding-left: 0;
      .van-search__content {
        background-color: #fff;
      }
    }
    .icon {
      line-height: 54px;
      font-size: 22px;
      padding-top: 3px;
      flex: 1;
      background-color: #efefef;
    }
  }
  .title {
    .dish,
    .hot,
    .feel,
    .story,
    .singer {
      overflow: hidden;
      margin-top: 8px;
      border-radius: 8px;
      width: 100%;
      .img2 {
        overflow: hidden;
        border-radius: 8px;
        height: 120px;
      }
      p {
        font-size: 14px;
        margin: 0;
        width: 90%;
      }
    }
  }
  .bottom {
    height: 50px;
  }
}
</style>
