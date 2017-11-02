<template>
  <div class="dashboard container">
    <div class="dashboard-logo"></div>
    <leader-board :timer='5' :size='50' :dashboard='true'></leader-board>
    <timeline :messages="messages" :size='50' v-if="messages.length" :dashboard='true'></timeline>
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
    background: #000;
    display: flex;
    flex-direction: row;
    flex-wrap: nowrap;
    justify-content: space-around;
    align-items: stretch;
    align-content: stretch;

    .leaderboard, .timeline {
      position: relative;
      top: inherit;
      right: inherit;
      min-width: 50vw;
      font-size: 2rem;
      box-sizing: border-box;
      padding: 3rem 2rem;
    }
    
    .timeline {
      background: #1d1d1d;
    }
    
    .dashboard-logo {
      background-image: url('/dist/img/urbn_logo.png');
      background-size: cover;
      position: absolute;
      width: 80px;
      height: 80px;
      z-index: 20;
      margin: 10px 0;
    }
  };
</style>