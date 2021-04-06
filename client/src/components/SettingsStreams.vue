<template>
  <div class="settings-streams">
    <ul>
      <li class="settings-tags" @click="subscribeStream">#{{ tag }}<img class="settings-exit" @click="unsubscribeStream" src="@/assets/exit.svg" alt="exit">
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  name: 'SettingsStreams',
  props: {
      tag: String
  },
  methods: {
  subscribeStream(e){
  if(e.target.innerText !== ""){
  this.$store.dispatch('subscribe', e.target.innerText.replace("#", "") ) 
  }
  },
  unsubscribeStream(e){
  this.$store.dispatch('unsubscribe', e.target.parentNode.innerText.replace("#", "") ) 
  },
  }
}
</script>

<style scoped>
ul {
  list-style: none;
  color: white;
}
.settings-tags {
  float: left;
  margin-right: 1em;
  padding: 0.3em;
  background: rgba(255, 255, 255, 0.1);
  border-radius: 5%;
  cursor: pointer;
}
.settings-exit {
  background: rgba(255, 255, 255, 0.2);
  margin-left: 1.1em;
  margin-bottom: -0.2em;
  padding: 0.5em;
}
</style>