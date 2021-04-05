<template>
  <div id="app">
    <SettingsIcon @click.native="goTo('/register')" /> 
    <Settings v-if="showSettings" />
    <router-view />
  </div>
</template>

<script>
import SettingsIcon from './components/SettingsIcon'
import Settings from './components/Settings'

export default {
  name: 'App',
  
  components: {
  SettingsIcon,
  Settings
  },

  computed: {
  showSettings(){
  return this.$store.state.showSettings;
  }
  },

  methods: {
  goTo(route){
  if(this.$route.path == '/' || this.$route.path == '/login'){
  this.$router.push(route);
  }
  }
  }

}
</script>

<style>
html, * {
  box-sizing: border-box;
}
body {
  margin: 0;
  padding: 0;
  background-color: #19274A;
}
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}
</style>