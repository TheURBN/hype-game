<template>
  <transition name="fade" mode="out-in">
    <div class="score capture-flag" v-if="showCapture" key="flag">
      <h2>You capture the flag!</h2>
    </div>
    <div class="score" v-else key="score">
      <div class="score-title">Your score: {{ flags.length }} 🏳️</div>
      <div class="score-points">{{ points }}</div>
    </div>
  </transition>
</template>

<script>
import config from 'config/config.js';
import store from 'store';
import { observe } from 'mobx';
import delay from 'nanodelay';


export default {
  data() {
    return {
      showCapture: false,
      flags: store.user.flags,
    }
  },
  computed: {
    points() {
      return _.floor(store.user.points.get());
    },
  },
  mounted() {
    store.captureFlag = this.captureFlag;
  },
  methods: {
    captureFlag(flag, val = true) {
      if (val) {
        this.showCapture = true;
        delay(3000).then(() => { this.showCapture = false })
      }

      this.flags = store.user.flags;
    },
  },
};
</script>

<style lang="scss" scoped>
  .fade-enter-active {
    transition: opacity .5s
  }

  .fade-enter, .fade-leave-to {
    opacity: 0
  }

  .capture-flag {
    background-image: radial-gradient(ellipse farthest-side at 50% 0%, #2da04d, rgba(178,0,0,0));
    h2 {
      font-size: 32px;
      text-transform: uppercase;
    }
  }

  .score {
    position: absolute;
    top: 0;
    color: #fff;
    width: 450px;
    left: 50%;
    transform: translate(-50%);
    text-align: center;
    padding: 20px 20px 50px;

    &-title {
      color: #555;
      font-size: 12px;
    }

    &-points {
      font-size: 34px;
      padding: 5px;
    }
  }
</style>