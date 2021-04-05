<template>
  <div class="flow">
    <FlowContent v-for="(flowMsg, index) in flowData" :key="index" :flowMsg="flowMsg" />
    <img class="write-logo" src="@/assets/write.svg" alt="write" @click="$router.push('/writemsg')">   
  </div>
</template>

<script>
import FlowContent from '@/components/FlowContent'
export default {
  name: 'Flow',

  components: {
  FlowContent
  },

  beforeMount(){
  this.$store.dispatch('getFlow')
  },

  computed: {
  flowData() {
  return this.$store.state.userFlow;
  },
  },

}
</script>

<style scoped>
.flow {
  padding: 5%;
}
.write-logo {
  position: fixed;
  bottom: 1%;
  right: 5%;
}
</style>