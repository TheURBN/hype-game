<template>
  <div class="leaderboard" v-if="users.length">
    <h2>Leaderboard</h2>
    <ul class="leaderboard--users">
      <li class="leader" v-for="(item, index) in users">
        <div v-bind:class="item.class" v-bind:style="{ color: item.color }">
          <span class="leader-number">#{{ index + 1 }}</span>
          <span class="leader-owner">owner: {{ item.owner }}</span>
          <span class="leader-points">{{ item.time }}</span>
        </div>
      </li>
    </ul>
  </div>
</template>

<script>
import config from 'config/config.js';
import store from 'store';
import _ from 'lodash';


export default {
  data () {
    return {
      users: [],
    }
  },
  created() {
    this.fetchData('leaderboard');
    setInterval(() => this.fetchData('leaderboard'), 5000);
  },
  methods: {
    fetchData(url, options = {}) {
      return fetch(`${config.url}/v1/${url}/`, options)
        .then(res => res.json())
        .then(this.updateLeaders);
    },
    updateLeaders(leaders) {
      this.users = _(leaders)
        .slice(0, 9)
        .map((value, key) => {
          value.time = _.floor(value.time);
          value.class = `leader-index-${key + 1}`;
          value.color = store.materials[value.owner];
        
          return value;
        }).value();
    }
  }
};
</script>


<style lang="scss" scoped>
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
      text-shadow: 0.5px 0.5px 0px #000;
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
        opacity: 1/$i + 0.25;
      }
    } 
  }
</style>