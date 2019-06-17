import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    lists: [],
    users: []
  },
  mutations: {
    setLocalUsers(state, users) {
      state.users = users;
    },
    setUser(state, user) {
      state.users.push(user);
    },
    setItem(state, item) {
      state.lists.push(item);
    },
    setLocalLists(state, lists) {
      state.lists = lists;
    },
    updateLists(state, index) {
      state.lists.splice(index, 1);
    }
  },
  actions: {
    getLocalUsers({ commit }) {
      if (localStorage.getItem('users')) {
        let users = JSON.parse(localStorage.getItem('users'));
        return commit('setLocalUsers', users);
      }
    },
    addUser({ commit }, user) {
      return commit('setUser', user);
    },
    addItem({ commit }, item) {
      return commit('setItem', item);
    },
    getLocalLists({ commit }) {
      if (localStorage.getItem('pageLists')) {
        let lists = JSON.parse(localStorage.getItem('pageLists'));
        return commit('setLocalLists', lists);
      }
    },
    delItem({ commit }, index) {
      return commit('updateLists', index);
    }
  },
  getters: {
    myLists: state => {
      return state.lists.filter(
        item => item.user === sessionStorage.getItem('currentUser')
      );
    }
  }
});
