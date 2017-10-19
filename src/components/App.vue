<template>
  <div id="control-panel">
    <div class="user-toolbar">
      <img :src="user.photo">
      <h2>{{ user.name }}</h2>
    </div>
  </div>
</template>

<script>
import store from '../store/gameStore.js';


export default {
  name: 'app',
  data () {
    return {
      user: store.user,
    }
  },
};
</script>

<style lang="scss" scoped>
  #control-panel {
    position: absolute;
    top: 20px;
    background: #000;
    color: #fff;
    left: 20px;
    border-radius: 20px;
  }

  .user-toolbar {
    img {
      width: 35px;
      height: 35px;
      border-radius: 20px;
      vertical-align: top;
      display: inline-block;
    }

    h2 {
      display: inline-block;
      padding: 10px;
      vertical-align: top;
    }
  }
</style>
