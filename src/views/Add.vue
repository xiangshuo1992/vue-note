<template>
  <div>
    <div class="main">
      <p>标题</p>
      <input class="title"
             type="text"
             v-model="title">
      <p>内容</p>
      <textarea class="content"
                v-model="content"></textarea>
    </div>
    <div class="button">
      <button @click="add()"
              type="button">完成</button>
      <button @click="cancel()"
              type="button">取消</button>
    </div>
  </div>
</template>
<script>
import store from '@/store'
export default {
  // store, // 这里很重要，不加会报错，不引入，加了也报错
  data () {
    return {
      title: '',
      content: ''
    }
  },
  methods: {
    add () {
      if (!this.title || !this.content) {
        alert("请输入标题和内容");
        return;
      }
      var newTime = new Date()
      var year = newTime.getFullYear()
      var month = ('0' + (newTime.getMonth() + 1)).slice(-2)
      var day = ('0' + newTime.getDate()).slice(-2)
      var hours = ('0' + newTime.getHours()).slice(-2)
      var minutes = ('0' + newTime.getMinutes()).slice(-2)
      var addTime = year + '-' + month + '-' + day + ' ' + hours + ':' + minutes
      store.dispatch('addItem', {
        title: this.title,
        content: this.content,
        time: addTime,
        user: sessionStorage.getItem('currentUser')
      })
      localStorage["pageLists"] = JSON.stringify(store.state.lists) //存到本地
      this.title = ''
      this.content = ''
      this.$router.push('/home/list')
    },
    cancel () {
      this.$router.push('/home/user')
    }
  }
}

</script>
<style lang="stylus" scoped>
.main {
  margin: 10px;

  p {
    margin-bottom: 5px;
  }

  input, textarea {
    border: 1px solid #d5d5d5;
    border-radius: 7px;
    width: 100%;
    box-sizing: border-box;
    font-size: 15px;
  }

  .title {
    padding: 0 10px;
    height: 30px;
    line-height: 30px;
  }

  .content {
    height: 400px;
    line-height: 25px;
    padding: 10px 10px;
  }
}

.button {
  display: flex;
  margin: 45px 20px;

  button {
    flex: 1;
    margin: 5px;
    height: 35px;
    line-height: 35px;
    border-radius: 7px;
    border: 1px solid #42b983;
    cursor: pointer;
  }

  button:nth-child(1) {
    background: #42b983;
    color: #fff;
  }

  button:nth-child(2) {
    color: #42b983;
  }
}
</style>
