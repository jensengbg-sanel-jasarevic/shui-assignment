<template>
  <div class="flow">
    <FlowContent v-for="(flowMsg, index) in plainFlowData" :key="index" :flowMsg="flowMsg" />
    <img class="write-icon" src="@/assets/write.svg" alt="write" @click="$router.push('/writemsg')">   
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
  this.$store.dispatch('getFlow');
  },

  computed: {
  plainFlowData() {
  return this.$store.state.plainFlowData;
  }
  },

}
</script>

<style scoped>
.flow {
  padding: 5%;
}
.write-icon {
  position: fixed;
  bottom: 1%;
  right: 5%;
}
</style>