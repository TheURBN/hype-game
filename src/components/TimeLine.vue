<template>
  <div class="timeline">
    <h2 v-if="dashboard">Timeline</h2>
    <transition-group name="list" tag="ul" :class="{'timeline-dashboard': dashboard }">
      <li class="timeline-item" :class="item.class" v-for="item, key in timeline" v-bind:key="item.time">
        {{ item.text }}
      </li>
    </transition-group>
  </div>
</template>

<script>
import config from 'config/config.js';
import _ from 'lodash';


export default {
  props: {
    messages: {
      type: Array,
      default: [],
    },
    dashboard: Boolean,
  },
  computed: {
    timeline() {
      const items = _(this.messages)
        .slice(-this.size)
        .map((value, key) => {
          value.class = `timeline-positon--${key}`;
          value.text = value.text;

          return value;
        })
        .value();

      return this.dashboard ? _.reverse(items) : items;
    }
  },
};
</script>


<style lang="scss" scoped>
  .list-item {
    display: inline-block;
    margin-right: 10px;
  }
  .list-enter-active, .list-leave-active {
    transition: all 1s;
  }
  .list-enter {
    opacity: 0;
    transform: translateY(30px);
  }

  .list-leave-to {
    opacity: 0;
    transform: translateX(430px);
  }

  .timeline {
    position: absolute;
    bottom: 10px;
    right: 20px;
    z-index: 2;
    color: #b9b9b9;
    font-size: 12px;
    font-weight: normal;
    width: 250px;
    text-align: right;

    h2 {
      text-align: center;
      font-size: 2rem;
      margin-bottom: 2rem;
      color: #fff;
    }

    &-item {
      margin: 5px 0;
    }

    @for $i from 0 through 5 {
      &-positon--#{$i} {
        opacity: 0.2 + 0.2 * $i;
      }
    }

    .timeline-dashboard {
      padding: 0 4rem;
      margin: 0 auto;

      @for $i from 0 through 5 {
        .timeline-positon--#{$i} {
          opacity: 1;
        }
      }
      .list-enter {
        opacity: 0;
        transform: translateY(-30px);
      }

      li {
        text-align: left;
        line-height: 1.3;
        font-size: 1rem;
      }
    }
  }
</style>