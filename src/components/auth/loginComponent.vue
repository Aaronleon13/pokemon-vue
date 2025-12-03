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

    <p v-if="isUserValid">Usuario no encontrado</p>
    <p v-if="isServerError">Error del servidor</p>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import api from '@/api/axios.js'
import router from '@/router'

defineEmits(['switch'])
const email = ref('')
const password = ref('')

const isUserValid = ref(false)
const isServerError = ref(false)


const login = () => {
  api.post('auth/login', {
    email: email.value,
    password: password.value
  })
    .then((response) => {
      console.log(response)
      router.push('/dashboard')
      localStorage.setItem(import.meta.env.VITE_KEY_STORAGE, true)
    })
    .catch(error => {
      console.error(error)
      if (error.status === 400 || error.status === 404) {
        isUserValid.value = true

        setTimeout(() => {
          isUserValid.value = false
        }, 3000)

      }
      if (error.status === 403) {
        isUserValid.value = true
      }
      if (error.status === 500) {
        isServerError.value = true
      }
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
