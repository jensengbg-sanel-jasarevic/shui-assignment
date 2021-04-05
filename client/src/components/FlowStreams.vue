<template>
  <div class="flow-streams">
    <ul>
      <li> # {{ tag }} </li>
    </ul>
  </div>
</template>

<script>
export default {
  name: 'FlowStreams',
  props: {
      tag: String
  },
}
</script>

<style scoped>
ul {
  float: right;
  list-style: none;
  color: rgba(0, 178, 255, 0.8);
}
</style> 