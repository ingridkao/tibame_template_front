import { createStore } from 'vuex'

const baseURL = process.env.NODE_ENV === 'development' ? '/api': 'https://tibamef2e.com/cgd103/g1/api'
export default createStore({
  state: {
    siteLoad: false,
    userInfo: null,
    baseURL: baseURL
  },
  getters: {
  },
  mutations: {
    updateSiteLoad (state, toggle) {
      state.siteLoad = toggle
    },
    updateUseInfo (state, json) {
      if(json){
        // 👍 1. 只存token甚至再加密 2. 將使用者資訊加密後存在localStorage
        // 👎 存使用者明碼資訊在localStorage，在商用可能會被罰錢
        state.userInfo = json
        // localStorage.setItem('token', json.session_id)
      }else{
        state.userInfo = null
        // localStorage.removeItem('token')
      }
    },
  },
  actions: {
    checkUseLogin (store) {
      store.commit('updateSiteLoad', true)
      return fetch(`${store.state.baseURL}/getMember.php?type=front`).catch(error=>{
        console.error(error)
        return false
      }).then(res=>{
        return res.json()
      }).then(json=>{
        if(json.status === true){
          store.commit('updateUseInfo', json.list)
          return true
        }else{
          return false
        }
      }).finally(()=>{
        store.commit('updateSiteLoad', false)
      })
    },
    userLogout (store, vm) {
      store.commit('updateSiteLoad', true)
      fetch(`${store.state.baseURL}/postMemberLogout.php`,{
        method:'POST',
        credentials: "include"
      }).catch(error=>{
        console.error(error)
      }).then(res=>res.json())
      .then(json=>{
        if(json){
          if(json.status == 1){
            store.commit('updateUseInfo', null)
            vm.$router.push('/login')
          }
          alert(json.msg)
        }else{
          console.error('異常')
        }
      }).finally(()=>{
        store.commit('updateSiteLoad', false)
      })
    }
  },
  modules: {
  }
})
