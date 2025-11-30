<template>
  <section>
    <loginComponent />
    <registerComponent />
  </section>
</template>

<script setup>
import loginComponent from '../components/auth/loginComponent.vue'
import registerComponent from '../components/auth/registerComponent.vue'
</script>


<style scoped>
section {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
}

form {
  display: flex;
  flex-direction: column;
}
</style>
