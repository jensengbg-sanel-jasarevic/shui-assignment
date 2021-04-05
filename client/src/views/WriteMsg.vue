<template>
  <div class="write-msg"> 
      
    <form @submit.prevent="newMsg">
      <textarea rows="15" autocomplete="off" v-model="content"/> 
      <br>
      <input type="text" id="stream" name="stream" autocomplete="off" v-model="tag"> 
      <br> 
      <button type="submit">Publicera</button>
    </form>
   
  </div>
</template>

<script>
export default {
  name: 'WriteMsg',

  data(){
  return {
  content: '',
  tag: ''
  }
  },

  methods: {
  newMsg(){
  this.$store.dispatch('newMsg', { content: this.content, tag: this.tag.split(" ") })
  }
  } 

}
</script>

<style scoped>
textarea{
  min-width: 25vw;
  display: block;
  margin : 0 auto;
  padding: 1.1em;
  border-radius: 8px;
  color: #555555;
  font-family: Avenir, Helvetica, Arial, sans-serif;
  font-size: 1em;
  line-height: 1.4em;
  overflow: auto;
  outline: none;
  -webkit-box-shadow: none;
  -moz-box-shadow: none;
  box-shadow: none;
  resize: none;    
}
</style>