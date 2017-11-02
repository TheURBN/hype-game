<template>
  <div v-if="user">
    <user-panel></user-panel>
    <score :timer='5' :counter="user.flags.length"></score>
    <leader-board :timer='5' :size='10'></leader-board>
    <timeline :messages="messages" :size='5' v-if="messages.length"></timeline>
    <help></help>
  </div>
</template>

<script>
import UserPanel from '@/UserPanel.vue';
import Leaderboard from '@/LeaderBoard.vue';
import Score from '@/Score.vue';
import Timeline from '@/TimeLine.vue';
import Help from '@/Help.vue';

export default {
  name: 'app',
  components: {
    'user-panel': UserPanel,
    'leader-board': Leaderboard,
    'score': Score,
    'timeline': Timeline,
    'help': Help,
  },
  data () {
    return {
      user: store.user,
      messages: store.messages,
    }
  },
};
</script>