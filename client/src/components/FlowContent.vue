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

}
</script>

<style scoped>
article {
  margin-top: 5%;
  padding: 1rem;
  text-align: left;
  background-color: white;
}
.date {
  font-size: 0.6em;
}
.username {
  font-weight: bold;
  font-style: italic;
}
</style>