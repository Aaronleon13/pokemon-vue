<template>
  <div>
    <h1>Logout</h1>
    <button type="button" @click="logout">Logout</button>
  </div>
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
div {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}

button {
  padding: 1rem;
  background-color: red;
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;
}
</style>
