<template>
  <div id="register">
    <img src="@/assets/slogo.svg" alt="SHUI logo">
      <h2>FLOW FREELY</h2>

      <section>
        <input type="text" name="username" v-model="username" placeholder="Användarnamn" autocomplete="off">
        <input type="password" name="password" v-model="password" placeholder="Lösenord">
        <a href="#" class="btn" @click.prevent="newUser">Registrera</a>
      </section>

    <footer>
      <img src="@/assets/footer.svg">
    </footer>      
  </div>
</template>

<script>
export default {
  name: 'Register',

  data(){
  return {
  username: '',
  password: ''
  }
  },
  
  methods: {
  newUser(){
  this.$store.dispatch('newUser', { username: this.username, password: this.password })
  }
  }

}
</script>

<style scoped>
h2 {
  color: #00B2FF;
}
section {
  width: 100%;
  margin-top: auto;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
}
input {
  text-align: center;
  display: inline-flex;
  height: 4rem;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 1.4rem;
  text-decoration: none;
  color: white;
  background: #19274A;
  border-color: white;
  min-width: 80%;
  margin-left: 10%;
  margin-right: 10%;
  margin-bottom: 1%;
}
.btn {
  display: inline-flex;
  height: 4rem;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 1.4rem;
  font-weight: 800;
  text-decoration: none;
  color: black;
  background: white;
  min-width: 80%;
  margin-left: 10%;
  margin-right: 10%;
  margin-top: 2%;
  margin-bottom: 30%;
}
::placeholder {
  color: white;
}
footer > img {
  width: 100%;
}
</style>