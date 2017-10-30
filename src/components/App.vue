<template>
  <div>
    <user-panel></user-panel>
    <score></score>
    <leader-board></leader-board>
    <timeline :messages="messages"></timeline>
  </div>
</template>

<script>
import UserPanel from './UserPanel.vue';
import LeaderBoard from './LeaderBoard.vue';
import Timeline from './Timeline.vue';
import Score from './Score.vue';

export default {
  name: 'app',
  components: {
    'user-panel': UserPanel,
    'leader-board': LeaderBoard,
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