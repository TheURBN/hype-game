<template>
  <div class="leaderboard">
    <h2>Leaderboard</h2>
    <ul class="leaderboard--users">
      <li v-for="item in users">
        {{ item.message }}
      </li>
    </ul>
  </div>
</template>

<script>
import config from 'config/config.js';
export default {
  data () {
    return {
      users: [],
    }
  },
  created() {
    this.fetchData('leaderboard');
  },
  methods: {
    fetchData(url) {
      fetch(config.ws.rest + url + '/').then((res) => {
        console.log(res);
      });
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
    h2 {
      text-align: center;
    }
  }
</style>