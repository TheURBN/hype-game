<template>
  <div>
    <user-panel></user-panel>
    <score></score>
    <leader-board></leader-board>
    <timeline :messages="messages"></timeline>
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
      messages: store.messages,
    }
  },
};
</script>