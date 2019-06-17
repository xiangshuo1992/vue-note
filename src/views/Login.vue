<template>
  <div>
    <form v-if="!isReg">
      <div class="header">欢迎登录</div>
      <div class="form">
        <label>用户名</label>
        <input type="text"
               v-model="name">
      </div>
      <div class="form">
        <label>密码</label>
        <input type="password"
               v-model="password">
      </div>
      <div class="button">
        <button class="first"
                @click="login"
                type="button">登录</button>
        <button class="second"
                @click="reg"
                type="button">注册</button>
      </div>
    </form>
    <form v-else>
      <div class="header">请输入以下信息</div>
      <div class="form">
        <label>用户名</label>
        <input type="text"
               v-model="name">
      </div>
      <div class="form">
        <label>密码</label>
        <input type="password"
               v-model="password">
      </div>
      <div class="form">
        <label>确认密码</label>
        <input type="password"
               v-model="repeat">
      </div>
      <div class="button">
        <button class="first"
                @click="addUser"
                type="button">确定</button>
        <button class="second"
                @click="cancel"
                type="button">取消</button>
      </div>
    </form>
  </div>
</template>

<script>
import store from '@/store'
// import { createHash } from 'crypto';
export default {
  name: 'Login',
  data () {
    return {
      isReg: false, //是否注册
      name: '',
      password: '',
      repeat: ''
    }
  },
  mounted () {
    store.dispatch('getLocalUsers');
  },
  computed: {
    users () {
      return store.state.users
    },
    checkUser () {
      // 查找当前store中是否存在该用户
      return this.users.find(user => user.name === this.name && user.password === this.password)
    }
  },
  methods: {
    login () {
      if (this.name === '' || this.password === '') {
        alert('请输入用户名和密码')
      } else if (this.checkUser) {
        sessionStorage.setItem('currentUser', this.checkUser.name)
        this.resetUser();
        this.$router.push('/home/user')
      } else {
        alert('用户名密码不正确')
      }
    },
    resetUser () {
      this.name = '';
      this.password = '';
      this.repeat = '';
    },
    reg () {
      this.resetUser();
      this.isReg = true
    },
    cancel () {
      this.resetUser();
      this.isReg = false
    },
    addUser () {
      if (this.name === '' || this.password === '' || this.repeat === '') {
        alert('请输入用户名和密码')
      } else if (this.checkUser) {
        alert('用户已存在')
        this.resetUser();
      } else if (this.password !== this.repeat) {
        alert('两次输入密码不一致')
      } else {
        store.dispatch('addUser', {
          name: this.name,
          password: this.password
        })
        localStorage.setItem('users', JSON.stringify(store.state.users)) //存到本地
        this.name = ''
        this.password = ''
        this.repeat = ''
        this.isReg = false
        alert('注册成功')
      }
    }
  }
}

</script>
<style lang="stylus" scoped>
.header {
  margin: 25px;
  margin-left: 45px;
  font-weight: bold;
}

.form {
  display: flex;
  justify-content: flex-end;
  margin: 10px;
  margin-right: 15px;

  label {
    height: 30px;
    line-height: 30px;
    margin-right: 10px;
  }

  input {
    width: 75%;
    height: 30px;
    line-height: 30px;
    border-radius: 7px;
    border: 1px solid #d5d5d5;
    padding: 0 10px;
    box-sizing: border-box;
  }
}

// .button
// margin 30px 10px
// text-align center
// font-size 14px
// span
// display inline-block
// margin 3px
// width 45%
// height 35px
// line-height 35px
// border-radius 7px
// border 1px solid #42b983
// cursor pointer
// &.first
// background #42b983
// color #fff
// &.second
// background-color #d5d5d5
// color #42b983
.button {
  display: flex;
  margin: 30px 20px;

  button {
    flex: 1;
    margin: 5px;
    height: 35px;
    line-height: 35px;
    border-radius: 7px;
    border: 1px solid #42b983;
    cursor: pointer;

    &.first {
      background: #42b983;
      color: #fff;
    }

    &.second {
      color: #42b983;
    }
  }
}
</style>
