<template>
  <div>
    <div class="img">
      <img src="../assets/logo.png">
    </div>
    <div class="user">{{userName}}</div>
    <div class="welcome">欢迎来到个人中心</div>
    <div class="add">
      <router-link :to="{ name: 'add'}">添加</router-link>
      <a href="javascript:;"
         @click.prevent="logOut">退出登录</a>
    </div>
  </div>
</template>
<script>
export default {
  name: 'User',
  data () {
    return {
      userName: sessionStorage.getItem('currentUser')
    }
  },
  methods: {
    logOut () {
      sessionStorage['currentUser'] = '';
      this.$router.push('/');
    }
  }
}
</script>
<style lang="stylus" scoped>
.img {
  text-align: center;
}

.user {
  font-weight: bold;
  font-size: 30px;
  color #42b983;
}

.user, .welcome {
  text-align: center;
  margin: 5px;
}

.add {
  text-align: center;
  margin: 40px 20px;
  line-height: 35px;

  a {
    text-decoration: none;
    color: #fff;
    display: block;
    margin: 20px 0;
    background-color: #42b983;
    border: 1px solid #42b983;
    border-radius: 7px;

    &:last-child{
      background: buttonface;
      color: #42b983;
    }
  }
}
</style>
