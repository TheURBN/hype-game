<template>
  <div class='dashboard'>
    <leader-board timer='5' size='10'></leader-board>
    <timeline :messages="messages" v-if="messages.length"></timeline>
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
  // .dashboard {
  //   background: #fff;
  // }
</style>