<template>
  <div :class="{ noflex: noFlexBoxSupport() }">
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
  mounted() {
    console.log('mount', this.noFlexBoxSupport(document));
  },
  methods: {
    noFlexBoxSupport(d = document){
      const f = "flex", e = d.createElement('b');
      e.style.display = f;

      return e.style.display !== f;
    },
  }
};
</script>

<style lang="scss" scoped>
  .noflex {
    display: block;
    .dashboard {
      display: block;

      .leaderboard, .timeline, #sign-in {
        display: inline-block;
        vertical-align: top;
        margin-right: -4px;
      }
    }
  }
  .dashboard {
    background: #000;
    display: flex;
    flex-direction: row;
    flex-wrap: nowrap;
    justify-content: space-around;
    align-items: stretch;
    align-content: stretch;

    #firebaseui-auth-container {
      background: #000;

      .firebaseui-container {
        background: #000;
      }
    }
    
    #sign-in {
      height: 100vh;
      background: #000;

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
      background: #000;
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
      background-image: url(/dist/img/theurbn-logo.svg);
      background-size: cover;
      width: 70px;
      height: 70px;
      z-index: 20;
      margin: 0 auto;
      display: inline-block;
      margin-top: 5px;
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