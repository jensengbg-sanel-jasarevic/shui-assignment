<template>
    <div id="settings" >
        <SettingsIcon />
            <h1>streams</h1>
        <SettingsStreams v-for="(tag, index) in streams" :key="index" :tag="tag" />

        <form>
            <input type="text" id="tag" name="tag" autocomplete="off" v-model="tag">  
            <img class="checkmark" src="@/assets/checkmark.svg" alt="checkmark" @click.prevent="newStream">  
        </form>

        <a href="#" class="btn" @click="deleteUser">Shit, theyre on to me!</a>
    </div>
</template>

<script>
import SettingsIcon from '@/components/SettingsIcon'
import SettingsStreams from '@/components/SettingsStreams'

export default {
  name: 'Settings',  

  components: {
  SettingsIcon,
  SettingsStreams
  },

  data(){
  return {
  tag: '#',
  }
  },

  beforeMount(){
  this.$store.dispatch('getStreams')
  },

  computed: {    
  showSettings(){
  return this.$store.state.showSettings;
  },
  streams() {
  return this.$store.state.streams;
  },
  },

  methods: {
  newStream(){
  if(this.tag == "#") {
  return
  }
  this.$store.dispatch('newStream', { tag: this.tag.replace("#", "") } ) 
  this.$store.dispatch('getStreams') // Update page
  this.tag = '#'
  },      
  deleteUser(){
  this.$store.commit('toggle');
  this.$store.dispatch('deleteUser') 
  }
  },
  
}
</script>

<style lang="scss" scoped>
#settings {
    position: fixed;
    z-index: 9999;
    top: 0;
    left: 0;
    width: 100vw;
    height: 80vh;
    background: #EF4343;
    box-shadow: 0px 0px 0px 100vh rgba(0,0,0,0.69);
}
h1 {
    color: white;
}
form {
    display: inline-flex;
    min-width: 80%;
    margin-top: 70px;
}
input {
    height: 4rem;
    justify-content: center;
    align-items: center;
    font-size: 1.4rem;
    text-decoration: none;
    color: white;
    min-width: 80%;
    padding: 2%;
    border: 3px solid white;
    border-radius: 3px;
    background: #EF4343;
    outline: none;
}
input:focus {
    color: white;
}
.checkmark {
    background: white;
    cursor: pointer;
    padding: 10px;
    border-radius: 3px;
}
.btn {
    display: inline-flex;
    height: 4rem;
    display: flex;
    justify-content: center;
    align-items: center;
    font-size: 1.4rem;
    text-decoration: none;
    color: white;
    background: #19274A;
    min-width: 80%;
    margin-left: 10%;
    margin-right: 10%;
    margin-top: 2%;
}
</style>
