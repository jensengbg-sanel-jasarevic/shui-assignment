<template>
  <div class="deleted" @click="$router.push('/')">
    <h1> {{ deletedUserMsg }} </h1>
    <footer class="deleted-footer">
      <img src="@/assets/footer.svg">
    </footer>
  </div>
</template>

<script>
export default {
  name: 'Deleted',

  computed: {
  deletedUserMsg() {
  return this.$store.state.deletedUserMsg;
  },
  },

}
</script>

<style lang="scss" scoped>
h1 {
  margin-top: 20vh;
  color: white;
}
.deleted {
  cursor: pointer;
}
.deleted-footer > img {
  margin-top: 60%;
  width: 100%;
}
</style>