import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    musicitem: {},
    musicList: [],
    pic: '',
    name: '',
    name1: '',
    search: ''
  },
  mutations: {
    setID(state, musicitem) {
      state.musicitem = musicitem
    },
    setPic(state, pic) {
      state.pic = pic
    },
    setName(state, name) {
      state.name = name
    },
    setName1(state, name1) {
      state.name1 = name1
    },
    setmusicList(state, item) {
      // state.musicList.unshift(item)
      let newArr = state.musicList;
      let find = false;
      for (let n of newArr) {
        if (n.id == item.id) {
          find = true;
        }
      }
      if (!find) state.musicList.push(item)
    },
    setmusicList1(state, items) {
      let newArr = state.musicList;
      for (let i = 0; i < items.length; i++) {
        let find = false;
        for (let n of newArr) {
          if (n.id == items[i].id) {
            find = true;
          }
        }
        if (!find) state.musicList.push(items[i])

      }
    },
    setsearch(state, search) {
      state.search = search
    },
    // 删除全部 
    dels(state) {
      state.musicList = []
    },
    // 删除一首
    del(state, id) {
      let index = state.musicList.findIndex(item =>  item.id === id )
      console.log(state.musicList);
      console.log(index);
      state.musicList.splice(index, 1);
    }
  },
  actions: {
  },
  modules: {
  }
})
