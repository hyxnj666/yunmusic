<template>
  <div id="songslabel">
    <!-- 头部  -->
    <div class="title">
      <span class="one" @click="going">‹</span><span class="two">歌单标签</span>
    </div>

    <!-- 内容  -->
    <div class="box">
      <div class="content" >
        <ul v-for="(item, index) in obj" :key="index">
          <p>{{ item.name }}</p>
          <li @click="gosort(items.name)" v-for="(items, index) in item.content" :key="index">
            <span v-if="items.hot" class="hot">hot</span>{{items.name}}
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";
export default {
  data() {
    return {
      // 标签
      //   label: {},
      //   详情
      list: {},
      //   语种
      lang: [],
      // 风格
      style: [],
      // 场景
      scene: [],
      // 情感
      emotion: [],
      // 主题
      theme: [],
      obj: []
    };
  },
  methods: {
    // 返回 {
    going() {
      this.$router.go(-1);
    },
    // 前往歌单分类 
    gosort(name){
      this.$router.push('/songsort/'+name)
    },
    // 初始化
    async init() {
      let data = await axios.get("/playlist/catlist");
      //   this.label = data.categories
      this.list = data.sub;
      // console.log(data);
      for (let i = 0; i < this.list.length; i++) {
        if (this.list[i].category == 0) {
          this.lang.push(this.list[i]);
        }
        if (this.list[i].category == 1) {
          this.style.push(this.list[i]);
        }
        if (this.list[i].category == 2) {
          this.scene.push(this.list[i]);
        }
        if (this.list[i].category == 3) {
          this.emotion.push(this.list[i]);
        }
        if (this.list[i].category == 4) {
          this.theme.push(this.list[i]);
        }
      }

      // this.obj.name='情感'
      let o1 = {};
      o1.name = "语种";
      o1.content = this.lang;
      this.obj.push(o1);

      let o2 = {};
      o2.name = "风格";
      o2.content = this.style;
      this.obj.push(o2);

      let o3 = {};
      o3.name = "场景";
      o3.content = this.scene;
      this.obj.push(o3);

      let o4 = {};
      o4.name = "情感";
      o4.content = this.emotion;
      this.obj.push(o4);

      let o5 = {};
      o5.name = "主题";
      o5.content = this.theme;
      this.obj.push(o5);
      console.log(this.obj);

      // let o1 = {};
      // o1.name = "语种";
      // o1.content = this.lang;
      // this.obj.push(o1);
      // console.log(this.lang, this.style, this.scene, this.emotion, this.theme);
    }
  },
  created() {
    this.init();
  }
};
</script>

<style lang="less" scoped>
#songslabel {
  // 头部
  .title {
    height: 45px;
    width: 100%;
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
  // 内容
  .box {
    .content {
      p {
        font-size: 18px;
        text-align: left;
        padding-left: 20px;
        width: 100%;
        height: 20px;
      }
      ul {
        overflow: hidden;
        // background-color: pink;
        // width: 80%;
        padding-left: 25px;
        li {
          .hot {
            color: red;
            font-weight: 700;
            font-size: 12px;
            margin-right: 5px;
          }
          float: left;
          // width: 25%;
          width: 75px;
          margin-right: 10px;
          margin-bottom: 10px;
          background-color: rgba(230, 230, 230, 0.507);
          height: 35px;
          line-height: 35px;
          border-radius: 17px;
          font-size: 14px;
        }
      }
    }
  }
}
</style>
