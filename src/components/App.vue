<template>
  <div v-if="user">
    <user-panel></user-panel>
    <score timer='5' :counter="user.flags.length"></score>
    <leader-board timer='5' size='10'></leader-board>
    <timeline :messages="messages" v-if="messages.length"></timeline>
    <modal name="help" class="help-container" width="800" height="500">
      <div v-html="help"></div>
      <button class="help-close" @click="$modal.hide('help')">
        ❌
      </button>
    </modal>
  </div>
</template>

<script>
import UserPanel from '@/UserPanel.vue';
import Leaderboard from '@/LeaderBoard.vue';
import Score from '@/Score.vue';
import Timeline from '@/TimeLine.vue';
import template from "html-loader!./help.html";

export default {
  name: 'app',
  components: {
    'user-panel': UserPanel,
    'leader-board': Leaderboard,
    'score': Score,
    'timeline': Timeline,
  },
  mounted() {
    this.$modal.show('help', { foo: 'bar' })
  },
  data () {
    return {
      help: template,
      user: store.user,
      messages: store.messages,
    }
  },
};
</script>