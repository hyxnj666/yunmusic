<template>
    <div id="list">
      <span>×</span>
      <ul>
        <li>1</li>
        <li>1</li>
        <li>1</li>

      </ul>
    </div>
</template>

<script>
    export default {
        
    }
</script>

<style lang="less" scoped>
  // 歌单
  #list {
    position: absolute;
    width: 90vw;
    top: -340px;
    height: 50vh;
    background-color: skyblue;
    border-radius: 20px;
    left: 50%;
    transform: translateX(-50%);
  }
</style>