<template>
  <div>
    <div class="dashboard-header">
      <div class="dashboard-logo"></div>
      <a href="http://urbn.odn.pw">URBN.ODN.PW</a>
    </div>
    <div class="dashboard container">
      <leader-board :timer='5' :size='50' :dashboard='true'></leader-board>
      <timeline :messages="messages" :size='50' v-if="messages.length" :dashboard='true'></timeline>
      <section id="sign-in" style='display: none;'>
        <h2>Connect to the game</h2>
        <div id="firebaseui-auth-container"></div>
      </section>
    </div>
  </div>
</template>

<script>
import store from 'store';
import Leaderboard from '@/LeaderBoard.vue';
import Timeline from '@/TimeLine.vue';

export default {
  name: 'app',
  components: {
    'leader-board': Leaderboard,
    'timeline': Timeline,
  },
  data () {
    return {
      user: store.user,
      messages: store.messages,
    }
  },
};
</script>

<style lang="scss" scoped>

  .dashboard {
    background: #363638;
    display: flex;
    flex-direction: row;
    flex-wrap: nowrap;
    justify-content: space-around;
    align-items: stretch;
    align-content: stretch;
    
    #sign-in {
      height: 100vh;
      background: #363537;

      h2 {
        color: #fff;
        text-align: center;
      }

      #firebaseui-auth-container {
        margin: 0 auto;
        margin-top: 50px
      }
    }

    .leaderboard, .timeline, #sign-in {
      position: relative;
      top: inherit;
      right: inherit;
      min-width: 50vw;
      font-size: 2rem;
      box-sizing: border-box;
      padding: 7rem 2rem 2rem;
    }
    
    .timeline {
      background: #1d1d1d;
    }
  };

  .dashboard-header {
    display: block;
    width: 100vw;
    height: 80px;
    background: #000;
    z-index: 20;
    position: absolute;
    text-align: center;
    padding: 5px 0px;

    .dashboard-logo {
      background-image: url(/dist/img/urbn_logo.png);
      background-size: cover;
      width: 80px;
      height: 80px;
      z-index: 20;
      margin: 0 auto;
      display: inline-block;
    }

    a {
      display: inline-block;
      vertical-align: top;
      padding: 23px;
      font-size: 2rem;
      color: #fff;
      text-decoration: none;
    }
  }
</style>