<template>
  <div>
    <router-view />
    <ul class="footer">
      <li class="icons">
        <router-link :to="{ name: 'list'}">便签列表</router-link>
      </li>
      <li class="icons">
        <router-link :to="{ name: 'user'}">个人中心</router-link>
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  data () {
    return {
    }
  }
}

</script>
<style lang="stylus" scoped>
.footer {
  position: fixed;
  width: 100%;
  height: 60px;
  line-height: 60px;
  left: 0;
  bottom: 0;
  display: flex;
  flex-flow: row nowrap;
  justify-content: space-around;
  margin: 0;
}

.icons {
  list-style: none;
  font-size: 16px;
  flex: 1;
  text-align: center;
  border-top: 1px solid #42b983;

  a {
    text-decoration: none;
    color: #42b983;
    display: block;

    &.active {
      color: #fff;
      background: #42b983;
    }
  }
}
</style>
