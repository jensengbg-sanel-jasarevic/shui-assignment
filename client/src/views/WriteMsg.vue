<template>
  <div class="write-msg"> 
      
    <form>
      <textarea rows="15" cols="30" autocomplete="off" v-model="content"/> 
      <br>
      <input type="text" id="stream" name="stream" autocomplete="off" v-model="tag"> 
      <br> 
      <a href="#" class="btn" @click="newMsg">Publicera</a>
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
  // Split space, create array of tags
  this.$store.dispatch('newMsg', { content: this.content, tag: this.tag.split(" ") })
  }
  } 

}
</script>

<style scoped>
textarea{
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
#stream {
  height: 4rem;
  font-size: 1.4rem;
  color: white;
  min-width: 90%;
  padding: 2%;
  border: 2px solid white;
  border-radius: 3px;
  background: #19274A;
  outline: none;
  margin-top: 2%;
}
.btn {
  height: 4rem;
  font-size: 1.4rem;
  display: flex;
  justify-content: center;
  align-items: center;
  text-decoration: none;
  color: black;
  background: #EF4343;
  margin-top: 2%;
  margin-left: 5%;
  margin-right: 5%;
}
</style>