<template>
  <div>
    <h1>Login</h1>
    <form @submit.prevent="login">
      <label for="email">Correo Electronico</label>
      <input type="email" id="email" name="email" v-model="email">

      <label for="password">Contraseña</label>
      <input type="password" id="password" name="password" v-model="password">

      <button type="submit">Login</button>
    </form>
    <div class="register">
      <p>No tienes una cuenta?</p>
      <button type="button" @click="$emit('switch')">Registrarse</button>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import axios from 'axios'

defineEmits(['switch'])
const email = ref('')
const password = ref('')

const login = () => {
  axios.post('https://api-curso-production.up.railway.app/auth/login', {
    email: email.value,
    password: password.value
  })
    .then(response => {
      console.log(response)
    })
    .catch(error => {
      console.error(error)
    })
}

</script>

<style scoped>
form {
  display: flex;
  flex-direction: column;
}

.register {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}
</style>
