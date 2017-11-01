<template>
  <div v-if="user">
    <user-panel></user-panel>
    <score v-if="user.points.get()"></score>
    <leader-board></leader-board>
    <timeline :messages="messages" v-if="messages.length"></timeline>
  </div>
</template>

<script>
import UserPanel from '@/UserPanel.vue';
import Leaderboard from '@/LeaderBoard.vue';
import Score from '@/Score.vue';
import Timeline from '@/TimeLine.vue';


export default {
  name: 'app',
  components: {
    'user-panel': UserPanel,
    'leader-board': Leaderboard,
    'score': Score,
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