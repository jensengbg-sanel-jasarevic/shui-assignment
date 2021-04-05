<template>
    <nav class="settings-icon" @click="toggle">
      <img src="@/assets/settings.svg" alt="settings">
    </nav>
</template>

<script>
export default {
  name: 'SettingsIcon',

  methods: {
    toggle(){
    if(this.$route.path == ('/') || this.$route.path == '/register' || this.$route.path == '/login' || this.$route.path == '/deleted') {
    return
    }
    this.$store.commit('toggle');
    }
    }  

}
</script>

<style scoped>

</style>