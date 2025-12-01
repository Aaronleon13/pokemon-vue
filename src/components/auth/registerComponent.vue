<template>
  <div>
    <h1>Register</h1>
    <form action="">
      <label for="username">Username</label>
      <input type="text" id="username" name="username">

      <label for="password">Password</label>
      <input type="password" id="password" name="password">

      <button type="submit">Register</button>
    </form>
    <div class="login">
      <p>Ya tienes una cuenta?</p>
      <button type="button" @click="$emit('switch')">Login</button>
    </div>
  </div>
</template>

<script setup>
defineEmits(['switch'])
</script>

<style scoped>
form {
  display: flex;
  flex-direction: column;
}

.login {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}
</style>
