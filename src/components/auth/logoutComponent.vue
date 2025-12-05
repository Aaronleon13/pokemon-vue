<template>
  <button type="button" @click="logout">Cerrar Sesión</button>
</template>

<script setup>
import api from '@/api/axios.js'
import router from '@/router'

const logout = () => {
  api.post('/auth/logout')
    .then(() => {
      localStorage.removeItem(import.meta.env.VITE_KEY_STORAGE)
      router.push('/')
    })
    .catch(error => {
      console.error(error)
    })
}
</script>

<style scoped>
button {
  padding: 10px 18px;
  background-color: red;
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;
}

button:hover {
  background-color: #cc0000;
}
</style>
