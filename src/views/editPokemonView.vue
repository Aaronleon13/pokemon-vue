<template>
  <section>
    <h1>Editar Pokemon</h1>
    <form @submit.prevent="editPokemon">
      <label for="name">Nombre</label>
      <input type="text" id="name" name="name" v-model="name">

      <label for="type">Tipo</label>
      <input type="text" id="type" name="type" v-model="type">

      <button type="submit">Editar Pokemon</button>
    </form>
  </section>
</template>

<script setup>
import { ref } from 'vue'
import api from '@/api/axios.js'
import router from '@/router'

const name = ref('')
const type = ref('')

const editPokemon = () => {
  api.put(`/pokemons/${router.currentRoute.value.params.id}`, {
    name: name.value,
    type: type.value
  })
    .then(() => {
      router.push('/dashboard')
    })
    .catch(error => {
      console.error(error)
    })
}
</script>

<style scoped></style>
