<template>
  <div class="flow-content">
    <article> 
      <p class="date">{{ flowMsg.date }}</p>
      <p class="content">{{ flowMsg.content }}</p>
      <p class="username">━ {{ flowMsg.username }}</p>
    </article>
    <FlowStreams v-for="(tag, index) in flowMsg.tags" :key="index" :tag="tag" />
  </div>
</template>

<script>
import FlowStreams from '@/components/FlowStreams'

export default {
  name: 'DisplayFlow',
  props: {
      flowMsg: Object
  },
  components: {
  FlowStreams
  },

  beforeMount(){
  this.$store.dispatch('decryptedFlow', this.flowMsg);
  },

}
</script>

<style scoped>
article {
  background-color: white;
  margin-top: 11%;
  padding: 2%;
  text-align: left;
}
.date {
  font-size: 0.6em;
}
.username {
  font-weight: bold;
  font-style: italic;
}
</style>