<template>
  <div class="leaderboard" v-if="users.length">
    <h2>Leaderboard</h2>
     <transition-group name="flip-list" tag="ul" class="leaderboard--users">
      <li class="leader" v-for="(item, index) in users" v-bind:key="index">
        <div v-bind:class="item.class" v-bind:style="{ color: item.owner }">
          <span class="leader-number">#{{ index + 1 }}</span>
          <span class="leader-owner">owner: {{ item.owner }}</span>
          <span class="leader-points">
            <i-count-up
              :start="item.time"
              :end="item.time"
              :decimals="0"
              :duration="5"
              :options="options"
            ></i-count-up>
      </span>
        </div>
      </li>
    </transition-group>
  </div>
</template>

<script>
import config from 'config/config.js';
import store from 'store';
import _ from 'lodash';


import ICountUp from 'vue-countup-v2';


export default {
  components: {
    ICountUp
  },
  data () {
    return {
      users: [],
      options: {
        useEasing: false,
        useGrouping: false,
        separator: ',',
        decimal: '.',
        prefix: '',
        suffix: '',
      },
    }
  },
  created() {
    this.fetchData('leaderboard');
    setInterval(() => this.fetchData('leaderboard'), config.leaderboard);
  },
  methods: {
    fetchData(url, options = {}) {
      return fetch(`${config.url}/v1/${url}/`, options)
        .then(res => res.json())
        .then(this.updateLeaders);
    },
    updateLeaders(leaders) {
      store.user.points.set(_.get(_.find(leaders, { owner: store.user.color }), 'time', 0));

      this.users = _(leaders)
        .slice(0, 9)
        .map((value, key) => {
          value.time = _.floor(value.time);
          value.class = `leader-index-${key + 1}`;
        
          return value;
        }).value();
    }
  }
};
</script>


<style lang="scss" scoped>
  .flip-list-move {
    transition: transform 1s;
  }

  .leaderboard {
    position: absolute;
    top: 20px;
    right: 20px;
    color: #fff;
    min-width: 200px;

    &--users {
      margin-top: 10px;
    }
    
    h2 {
      text-align: center;
    }

    .leader {
      display: table;
      font-weight: normal;
      font-size: 12px;
      line-height: 1.3;

      span {
        display: table-cell;
        width: 100%;
      }

      &-owner {
        text-align: center;
        overflow: hidden;
        min-width: 150px;
      }
    }

    @for $i from 1 through 10 {
      .leader-index-#{$i} {
        opacity: 1.1 - 0.1 * $i;
      }
    } 
  }
</style>