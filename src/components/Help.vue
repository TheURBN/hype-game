<template>
  <div class="help-hint">
    <div class="help-desc">press <strong>"esc"</strong> to reveal mouse pointer</div>
    <div class="help-desc">press <strong>"h"</strong> for game contols hint</div>

    <modal name="help" class="help-container" width="800" height="450">
      <div v-html="help"></div>
      <button class="help-close" @click="$modal.hide('help')">
        ❌
      </button>
    </modal>
    <modal name="helpContols" class="help-container" width="500" height="450">
      <img class="help-controls" src="/dist/img/game-controls.svg"/>
      <button class="help-close" @click="$modal.hide('helpContols')">
        ❌
      </button>
    </modal>
  </div>
</template>

<script>
import template from "html-loader!./help.html";


export default {
  mounted() {
    this.$modal.show('help')
  },
  data () {
    return {
      help: template,
    }
  },
  created() {
    window.addEventListener('keydown', (e) => {
      if (e.keyCode === 72) this.$modal.show('helpContols');
    });
  },
};
</script>


<style lang="scss" scoped>
  .help-hint {
    position: absolute;
    bottom: 10px;
    left: 10px;
    z-index: 20;
    color: #888;
    font-size: 10px;
    font-weight: 300;
  }
</style>