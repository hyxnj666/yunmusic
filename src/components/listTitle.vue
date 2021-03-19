<template>
  <div id="title">
    <slot></slot>
  </div>
</template>

<script>
export default {};
</script>

<style lang="less" scoped>
#title {
  height: 48px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  background-color: #fff;
  padding-right: 5px;
  h3 {
    font-size: 18px;
    font-weight: 400;
    margin: 0;
    border-left: 2px solid #ee0a24;
    padding-left: 8px;
    padding-right: 5px;
  }
  button {
    font-size: 12px;
    height: 30px;
    width: 50px;
    border-radius: 15px;
    border: 1px solid #999;
    background-color: #fff;
  }
}
</style>
