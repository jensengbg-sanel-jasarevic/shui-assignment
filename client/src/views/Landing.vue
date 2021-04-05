<template>
  <div id="landing" @click="$router.push('/register')">
    <img src="@/assets/slogo.svg" alt="SHUI logo">
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
h2 {
  color: #00B2FF;
}
img {
  cursor: pointer;
}
footer > img {
  width: 100%;
  margin-bottom: -110%;
}
</style>