<template>
  <div class="removed" @click="$router.push('/')">
  <h1>deleted user</h1>
    <footer>
      <img src="@/assets/footer.svg">
    </footer>
  </div>
</template>

<script>
export default {
  name: 'Deleted',

}
</script>

<style lang="scss" scoped>
h1 {
  color: white;
}
.removed {
  cursor: pointer;
}
footer > img {
  width: 100%;
  margin-bottom: -130%;
}
</style>