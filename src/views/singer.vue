<template>
  <div id="singer">
   <!-- 头部  -->
    <div class="title">
      <span class="one" @click="going">‹</span><span class="two">云音乐歌手榜</span><span  class="three" @click="golabel()"><van-icon name="apps-o"/></span>
    </div>

    <!-- 内容  -->
    <div class="content">
      <!-- <p>{{data1.updateTime}}</p> -->
      <ul v-if="arlist.length > 0">
        <li v-for="(item1, index) in arlist" :key="item1.id" @click="gosinger(item1.id)">
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
            <span>{{ item1.score }}</span
            ><br />
            <span>{{ item1.topicPerson }}人已关注</span>
          </div>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
import axios from "axios";
export default {
  data() {
    return {
      data: {},
      arlist: {}
    };
  },
  methods: {
    //   返回
    going() {
      this.$router.go(-1);
    },
    // 歌手详情 
    gosinger(id){
        this.$router.push("/singerdetail/"+id)
    },
    // 歌手标签 
    golabel(){
      this.$router.push("singerlabel")
    },
    async init() {
      let data = await axios.get("toplist/artist");
      this.data1 = data.list;
      this.arlist = data.list.artists;
    //   console.log(this.arlist);
    }
  },
  created() {
    this.init();
  }
};
</script>

<style lang="less" scoped>
#singer {
  .van-grid-item {
    overflow: hidden;
  }
 // 头部
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
    .three {
      font-size: 20px;
      margin-left: 60%;
      position: absolute;
      top: 15px;
      right: 28px;
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
          padding-top: 25px;
          width: 50%;
          margin-left: 10px;
          vertical-align: top;
          display: inline-block;
          p {
            margin: 0;
            margin-bottom: 5px;
            font-size: 14px;
          }
          span {
            font-size: 12px;
            color: #999;
          }
        }
      }
    }
  }
}
</style>
