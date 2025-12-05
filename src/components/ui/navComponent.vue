<template>
  <nav>
    <div class="container-info">
      <h2>Bienvenido {{ user.name }}!</h2>
      <logoutComponent />
    </div>
  </nav>
</template>
<script setup>
import { ref, onMounted } from 'vue'
import api from '@/api/axios.js'
import logoutComponent from '@/components/auth/logoutComponent.vue'

const user = ref({})

const getUserInformation = async () => {
  try {
    const response = await api.get('/me')
    user.value = response.data
  } catch (error) {
    console.error(error)
  }
}

onMounted(() => {
  getUserInformation()
})
</script>
<style scoped>
nav {
  position: fixed;
  display: flex;
  justify-content: end;
  align-items: center;
  height: 60px;
  background-color: black;
  width: 100%;
}

ul {
  list-style: none;
}

li {
  margin: 0 1rem;
}

li a {
  text-decoration: none;
  color: green;
}

h2 {
  color: white;
  font-size: 14px;
}

.container-info {
  display: flex;
  align-items: center;
  gap: 1rem;
  width: 300px;
}
</style>
