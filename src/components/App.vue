<template>
  <div id="control-panel" v-on:mouseover="mouseOver" v-on:mouseleave="mouseLeave" v-if="user.name">
    <div class="user-toolbar">
      <img :src="user.photo">
      <div class="user-panel" v-if="active">
        <h2>{{ user.name }}</h2>
        <div class="user-panel--color">
          <span>Your color:</span>
          <span class="user-panel--cube" v-bind:style="{ backgroundColor: userColor }"></span>
        </div>
        <div class="user-panel--flag">
          <span class="flag">🚩🚩🚩</span>
          <span class="count">x {{ count }}</span>
        </div>
      </div>
      <div class="user-panel user-logout" v-if="!active">
        <button class="user-logout--button" v-on:click="logout">Logout</button>
      </div>
    </div>
  </div>
</template>

<script>
import store from '../store/gameStore.js';
import colors from '../config/materials.js';
import firebase from 'firebase';


export default {
  name: 'app',
  data () {
    return {
      user: store.user,
      active: true,
      count: 0,
    }
  },
  computed: {
    userColor() {
      return colors[store.user.color - 1];
    },
  },
  mounted() {
    setInterval(() => this.count = ++this.count, 100);
  },
  updated() {
    this.user = store.user;
  },
  methods: {
    logout() {
      return firebase.auth().signOut().then(() => {
        window.location.href=window.location.href;
      });
    },
    mouseOver() {
      this.active = false;   
    },
    mouseLeave() {
      this.active = true;
    }
  }
};
</script>

<style lang="scss" scoped>
  #control-panel {
    position: absolute;
    top: 20px;
    background: rgba(0, 0, 0, 0.69);
    color: #fff;
    left: 20px;
    border-radius: 5px;
  }


  .user-toolbar {
    min-width: 150px;
    img {
      width: 35px;
      height: 35px;
      border-radius: 20px;
      vertical-align: top;
      display: inline-block;
      margin: 10px 0px 0px 10px;
    }
    .user-logout {
      &--button{
        background: #fff;
        border: 1px solid #01040e;
        padding: 5px 10px;
        border-radius: 0;
        margin: 4px 5px;
      }
    }

    .user-panel {
      display: inline-block;
      padding: 10px;
      vertical-align: top;
      &--color {
        padding: 4px 0;
        font-size: 12px;
        color: #737373;
      }
      
      &--flag {
        padding: 5px 0;
        .flag {
          font-size: 10px;
          letter-spacing: 6px;
        }

        .count {
          padding-left: 4px;
        }
      }

      &--cube {
        height: 12px;
        width: 12px;
        background: #fff;
        display: inline-block;
        border: 1px solid #fff;
        vertical-align: middle;
        margin: 0px 5px;
      }
    }
  }
</style>
