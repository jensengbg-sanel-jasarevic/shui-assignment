import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'
import CryptoJS from 'crypto-js';
import router from './../router'

Vue.use(Vuex)

export default new Vuex.Store({
  state: { 
    API_URL: "https://shui-server-api.herokuapp.com", // Cloud server API
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
      let resp = await axios.post(`${ctx.state.API_URL}/api/user`, newUser, {
      });            
      console.log(resp) 
      router.push('/login')
    },

    async login(ctx, cred) {
      let resp = await axios.post(`${ctx.state.API_URL}/api/auth/login`, {
        username: cred.username,
        password: cred.password
      });
      // Get token & userkey sent from server. 
      sessionStorage.setItem('token', resp.data.token);
      sessionStorage.setItem('userkey', resp.data.userkey);

      router.push('/flow')
    },

    async deleteUser(ctx) {
      let resp = await axios.delete(`${ctx.state.API_URL}/api/user`, {
        headers: {
          'authorization': `Bearer ${sessionStorage.getItem('token')}`
        }
      });
      console.log(resp) 

      ctx.commit('deletedUser')
      router.push('/deleted')
    },    

    async getFlow(ctx){
      console.log("d")
      let resp = await axios.get(`${ctx.state.API_URL}/api/flow`, {
        // Set headers authorization to get data from server
        headers: {
          'authorization': `Bearer ${sessionStorage.getItem('token')}` 
        } 
      });
      console.log(resp) 

      // Create new array with decrypted content
      const flow = resp.data.map((message) => {
        return {
          date: message.date,
          username: message.username,
          tags: message.tags,
          // Decrypt with userkey 
          content: CryptoJS.AES.decrypt(message.text, sessionStorage.getItem('userkey')).toString(CryptoJS.enc.Utf8)
        };
      });

      ctx.commit('setPlainFlow', flow)
    },

    async getStreams(ctx){
      let resp = await axios.get(`${ctx.state.API_URL}/api/stream`, {
        headers: {
          'authorization': `Bearer ${sessionStorage.getItem('token')}`
        } 
      });
      console.log(resp) 

      ctx.commit('setStreams', resp.data)
    },

    // With PUT & POST requests 2nd argument is request body
    // Pass object with headers property as the 3rd argument
    // Use token to prove that a user is valid and logged in (token contains user UUID, signed by server private "JWT KEY")
    async subscribe(ctx, subscribeStream) {
      let resp = await axios.put(`${ctx.state.API_URL}/api/subscription`, { tag: subscribeStream }, {
        headers: {
          'authorization': `Bearer ${sessionStorage.getItem('token')}`
        }
      });
      console.log(resp) // Error handle
    },  

    async unsubscribe(ctx, unsubscribeStream) {
      let resp = await axios.delete(`${ctx.state.API_URL}/api/subscription/${unsubscribeStream}`, {
        headers: {
          'authorization': `Bearer ${sessionStorage.getItem('token')}`
        }
      });
      console.log(resp) 
    },

    async newStream(ctx, newTag){
      let resp = await axios.post(`${ctx.state.API_URL}/api/stream`, newTag, {
       headers: {
          'authorization': `Bearer ${sessionStorage.getItem('token')}` 
        }
      });
      console.log(resp)
    },

    async newMsg(ctx, userMsg){
      let resp = await axios.post(`${ctx.state.API_URL}/api/message`, userMsg, {
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
/* 
Symmetric-key algorithm (e.g. AES) can be used for the encryption of plaintext and the decryption of ciphertext.
Client & server can share same keys. Key should not be openly distributed from server to client or other way around. It has to be kept secret from unauthorized parties.
Keep secret keys for encoding and decoding data in both client & server in '.env' file.
Environment variables in Vue should look like this:
VUE_APP_MY_ENV_VARIABLE=value
VUE_APP_ANOTHER_VARIABLE=value
*/