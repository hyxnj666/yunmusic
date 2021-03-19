<template>
  <div id="singerlabel">
    <div class="title">
      <span class="one" @click="going">‹</span
      ><span class="two">歌手排行榜</span>
    </div>

    <div class="content">
      <van-tabs :line-height="'3px'" :line-width="'70px'" v-model="active">
        <van-tab v-for="item in data" :key="item.id" :title="item.name">
          <ul v-if="singers.length > 0">
            <li
              v-for="(item1, index) in singers"
              :key="item1.id"
              @click="gosinger(item1.id)"
            >
              <span class="num">{{ index + 1 }}</span>
              <div class="left">
                <van-image
                  class="img"
                  width="90"
                  height="90"
                  lazy-load
                  :src="item1.img1v1Url"
                />
              </div>
              <div class="right">
                <p class=" van-ellipsis">{{ item1.name }}</p>
              </div>
            </li>
          </ul>
        </van-tab>
      </van-tabs>
    </div>
  </div>
</template>

<script>
import axios from "axios";
export default {
  data() {
    return {
      data: [],
      singers: {},
      active: 0
    };
  },
  watch: {
    async active(id) {
      //   console.log(this.data);
      let ids = this.data[id].id;
      console.log(ids);
      let data1 = await axios.get("/artist/list?cat=" + ids);
      this.singers = data1.artists;
        console.log(this.singers);
    }
  },
  methods: {
    // 歌手详情
    gosinger(id) {
      this.$router.push("/singerdetail/" + id);
    },
    //   返回
    going() {
      this.$router.go(-1);
    },
    async init() {
      let id = [1001, 1002, 2001, 2002, 6001, 6002, 7001, 7002, 4001, 4002];
      let singer = [
        "华语男歌手",
        "华语女歌手",
        "欧美男歌手",
        "欧美女歌手",
        "日本男歌手",
        "日本女歌手",
        "韩国男歌手",
        "韩国女歌手"
      ];
      for (let i = 0; i < id.length; i++) {
        let obj = {};
        obj.id = id[i];
        obj.name = singer[i];
        this.data.push(obj);
      }
      //   console.log(this.data);
      let data1 = await axios.get("/artist/list?cat=1001");
      this.singers = data1.artists;
      console.log(this.singers);
    }
  },
  created() {
    this.init();
  }
};
</script>

<style lang="less" scoped>
#singerlabel {
  .title {
    height: 45px;
    // width: 100%;
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
  }
  .content {
    ul {
      .img {
        overflow: hidden;
        border-radius: 8px;
        vertical-align: middle;
      }
      li {
        &:nth-child(-n + 3) {
          .num {
            color: red;
          }
        }
        text-align-last: left;
        padding-left: 10px;
        margin-top: 8px;
        .num {
          font-size: 20px;
          margin-right: 10px;
        }
        .left {
          display: inline-block;
        }
        .right {
          padding-top: 30px;
          width: 50%;
          margin-left: 10px;
          vertical-align: top;
          display: inline-block;
          p {
            margin: 0;
            margin-bottom: 5px;
            font-size: 14px;
          }
        }
      }
    }
  }
}
</style>
