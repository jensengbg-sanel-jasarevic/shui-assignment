<template>
  <div id="landing" @click="$router.push('/register')">
    <img id="shui-logo" src="@/assets/slogo.svg" alt="SHUI logo">
    
    <h2>FLOW FREELY</h2>

    <footer>
      <img src="@/assets/footer.svg">
    </footer> 
  </div>
</template>

<script>
export default {
  name: 'Landing',

}
</script>

<style scoped>
#landing {
  cursor: pointer;
}
#shui-logo {
    margin-top: 20vh;
}
h2 {
  color: #00B2FF;
}
footer > img {
  width: 100%;
  margin-top: 40%;
}
</style>