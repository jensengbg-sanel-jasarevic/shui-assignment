import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'
import CryptoJS from 'crypto-js';
import router from './../router'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    showSettings: false,
    plainFlowData: [],
    streams: [],
    deletedUserMsg: "",
  },

  mutations: {
    toggle(state) {
      state.showSettings = !state.showSettings;
    },
    setPlainFlow(state, flow){
      state.plainFlowData = flow;
    },
    setStreams(state, streams){
      state.streams = streams;
    },
    deletedUser(state){
      state.deletedUserMsg = "You no longer exists in Shui system";
    },
    
  },
  actions: {
    async newUser(ctx, newUser){
      let resp = await axios.post(`https://shui-server.herokuapp.com/api/user`, newUser, {
      });            
      console.log(resp) 
      router.push('/login')
    },

    async login(ctx, cred) {
      let resp = await axios.post(`https://shui-server.herokuapp.com/api/auth/login`, {
        username: cred.username,
        password: cred.password
      });
      // Get token & userkey (public key) from server response 
      sessionStorage.setItem('token', resp.data.token);
      sessionStorage.setItem('userkey', resp.data.userkey);

      router.push('/flow')
    },

    async deleteUser({ commit }) {
      let resp = await axios.delete(`/api/user`, {
        headers: {
          'authorization': `Bearer ${sessionStorage.getItem('token')}`
        }
      });
      console.log(resp) 

      commit('deletedUser')
      router.push('/deleted')
    },    

    async getFlow({ commit }){
      let resp = await axios.get(`https://shui-server.herokuapp.com/api/flow`, {
        // Set headers authorization to get data from server
        headers: {
          'authorization': `Bearer ${sessionStorage.getItem('token')}` 
        } 
      });
      console.log(resp) 

      // Create new array with results of decrypting content on original array
      const flow = resp.data.map((message) => {
        return {
          date: message.date,
          username: message.username,
          tags: message.tags,
          // Decrypt with userkey (public key)
          content: CryptoJS.AES.decrypt(message.text, sessionStorage.getItem('userkey')).toString(CryptoJS.enc.Utf8)
        };
      });

      commit('setPlainFlow', flow)
    },

    async getStreams({ commit }){
      let resp = await axios.get(`https://shui-server.herokuapp.com/api/stream`, {
        headers: {
          'authorization': `Bearer ${sessionStorage.getItem('token')}`
        } 
      });
      console.log(resp) 

      commit('setStreams', resp.data)
    },

    // With PUT & POST requests 2nd argument is request body
    // Pass object with headers property as the 3rd argument
    // Use token to prove that logged in as user (token contains user UUID, signed by server private "JWT KEY")
    async subscribe(ctx, subscribeStream) {
      let resp = await axios.put(`https://shui-server.herokuapp.com/api/subscription`, { tag: subscribeStream }, {
        headers: {
          'authorization': `Bearer ${sessionStorage.getItem('token')}`
        }
      });
      console.log(resp) // Error handle
    },  

    async unsubscribe(ctx, unsubscribeStream) {
      let resp = await axios.delete(`/api/subscription/${unsubscribeStream}`, {
        headers: {
          'authorization': `Bearer ${sessionStorage.getItem('token')}`
        }
      });
      console.log(resp) 
    },

    async newStream(ctx, newTag){
      let resp = await axios.post(`/api/stream`, newTag, {
       headers: {
          'authorization': `Bearer ${sessionStorage.getItem('token')}` 
        }
      });
      console.log(resp)
    },

    async newMsg(ctx, userMsg){
      let resp = await axios.post(`/api/message`, userMsg, {
       headers: {                                                       
          'authorization': `Bearer ${sessionStorage.getItem('token')}` 
        }
      });
      console.log(resp) 

      router.push('/flow')
    },  

  },
 
  modules: {
  }
})