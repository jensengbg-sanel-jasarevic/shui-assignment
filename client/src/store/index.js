import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'
import CryptoJS from 'crypto-js';
import router from './../router'

Vue.use(Vuex)

const API = 'http://localhost:1992';

export default new Vuex.Store({
  state: {
    showSettings: false,
    userFlow: [],
    streams: [],
    deletedUserMsg: "",
    plainView: Object
  },

  mutations: {
    toggle(state) {
      state.showSettings = !state.showSettings;
    },
    setFlow(state, flow){
      state.userFlow = flow;
    },
    setStreams(state, streams){
      state.streams = streams;
    },
    deletedUser(state){
      state.deletedUserMsg = "You no longer exists in Shui system";
    },
    setPlainView(state, plainView){
      state.plainView = plainView;
    },
    
  },
  actions: {
    async newUser(ctx, newUser){
      let resp = await axios.post(`${API}/user`, newUser, {
      });            
      console.log(resp) // Error handle
      router.push('/login')
    },

    async deleteUser({ commit }) {
      let resp = await axios.delete(`${API}/user`, {
        headers: {
          'authorization': `Bearer ${sessionStorage.getItem('loggedInToken')}`
        }
      });
      console.log(resp) // Error handle
      commit('deletedUser')
      router.push('/deleted')
    },    

    async login(ctx, cred) {
      let resp = await axios.post(`${API}/auth/login`, {
        username: cred.username,
        password: cred.password
      });
      sessionStorage.setItem('loggedInToken', resp.data.token);
      sessionStorage.setItem('loggedInUserKey', resp.data.userkey);
      router.push('/flow')
    },

    async getFlow({ commit }){
      let resp = await axios.get(`${API}/flow`, {
        headers: {
          'authorization': `Bearer ${sessionStorage.getItem('loggedInToken')}`
        } 
      });
      console.log(resp) // Error handle
      commit('setFlow', resp.data)
    },

    async decryptedFlow({ commit }, flowMsg){
      // Decrypted content data
      const content = CryptoJS.AES.decrypt(flowMsg.content, sessionStorage.getItem('loggedInUserKey')).toString(CryptoJS.enc.Utf8)

      commit('setPlainView', {    
        content: content
      });

      console.log("Decrypted", content)
    },    

    async getStreams({ commit }){
      let resp = await axios.get(`${API}/stream`, {
        headers: {
          'authorization': `Bearer ${sessionStorage.getItem('loggedInToken')}`
        } 
      });
      console.log(resp) // Error handle
      commit('setStreams', resp.data)
    },

    // With PUT & POST requests 2nd argument is request body
    // Pass object with headers property as the 3rd argument
    async subscribe(ctx, subscribeStream) {
      let resp = await axios.put(`${API}/subscription`, { tag: subscribeStream }, {
        headers: {
          'authorization': `Bearer ${sessionStorage.getItem('loggedInToken')}`
        }
      });
      location.reload()
      console.log(resp) // Error handler
    },  

    async unsubscribe(ctx, unsubscribeStream) {
      let resp = await axios.delete(`${API}/subscription/${unsubscribeStream}`, {
        headers: {
          'authorization': `Bearer ${sessionStorage.getItem('loggedInToken')}`
        }
      });
      location.reload()
      console.log(resp) // Error handle
    },

    async newStream(ctx, newTag){
      let resp = await axios.post(`${API}/stream`, newTag, {
       headers: {
          'authorization': `Bearer ${sessionStorage.getItem('loggedInToken')}` 
        }
      });
      location.reload()
      console.log(resp) // Error handle
    },
           
    async newMsg(ctx, userMsg){
      let resp = await axios.post(`${API}/message`, userMsg, {
       headers: {
          'authorization': `Bearer ${sessionStorage.getItem('loggedInToken')}` // User that request to make post (token contains user UUID)
        }
      });
      console.log(resp) // Error handle
      router.push('/flow')
    },  

  },
 
  modules: {
  }
})