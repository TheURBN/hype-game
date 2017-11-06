<template>
  <div class="help-hint">
    <div class="help-desc">press "esc" to reveal mouse pointer</div>
    <modal name="help" class="help-container" width="800" height="450">
      <div v-html="help"></div>
      <button class="help-close" @click="$modal.hide('help')">
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