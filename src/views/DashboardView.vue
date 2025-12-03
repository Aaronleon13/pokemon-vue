<template>
  <section>
    <h1>Dashboard</h1>
    <p>Contenido del dashboard</p>

    <logoutComponent />
  </section>
</template>

<script setup>
import logoutComponent from '@/components/auth/logoutComponent.vue'
import { ref, onMounted } from 'vue'
import api from '@/api/axios.js'

const userInformation = ref({})

const getUserInformation = () => {
  api.get('/me')
    .then((response) => {
      console.log(response)
      userInformation.value = response.data
    })
    .catch(error => {
      console.error(error)
    })
}

onMounted(() => {
  getUserInformation()
})
</script>

<style scoped>
section {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: 100vh;
}
</style>
