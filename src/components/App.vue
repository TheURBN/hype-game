<template>
  <div>
    <user-panel></user-panel>
    <leader-board></leader-board>
  </div>
</template>

<script>
import UserPanel from './UserPanel.vue';
import LeaderBoard from './LeaderBoard.vue';

export default {
  name: 'app',
  components: {
    'user-panel': UserPanel,
    'leader-board': LeaderBoard,
  },
  data () {
    return {}
  },
};
</script>