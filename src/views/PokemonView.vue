<template>
  <section>
    <div class="container" v-if="!showEdit">
      <div class="card">
        <div class="card-header">
          <h1>{{ pokemon.name }}</h1>
          <img :src="pokemon.icon" :alt="pokemon.name">
        </div>
        <div class="card-body">
          <img :src="pokemon.image" :alt="`Esta es la imagen de ${pokemon.name}`">
        </div>
        <div class="card-footer">
          <p :class="pokemon.type">{{ pokemon.type }}</p>
        </div>
        <button class="btn-edit" @click="clickEdit">Editar</button>
      </div>
    </div>
    <div class="container" v-else>
      <form @submit.prevent="editPokemon">
        <label for="name">Nombre</label>
        <input type="text" id="name" name="name" v-model="pokemon.name">

        <label for="type">Tipo</label>
        <input type="text" id="type" name="type" v-model="pokemon.type">

        <label for="slug">Slug</label>
        <input type="text" id="slug" name="slug" v-model="pokemon.slug">

        <button type="submit">Editar Pokemon</button>
      </form>
      <button class="btn-edit" @click="clickEdit">Cancelar</button>
    </div>
  </section>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import api from '@/api/axios.js'
import router from '@/router'

const pokemon = ref({})
const showEdit = ref(false)

const clickEdit = () => {
  showEdit.value = !showEdit.value
}


const getPokemon = async () => {
  const slug = router.currentRoute.value.params.slug
  try {
    const response = await api.get(`/pokemons/${slug}`)
    pokemon.value = response.data
  } catch (error) {
    console.error(error)
  }
}

const editPokemon = async () => {
  try {
    await api.put(`/pokemons/${pokemon.value.id_pokemon}`, pokemon.value)
    showEdit.value = false
    router.push('/dashboard')
  } catch (error) {
    console.error(error)
  }
}

onMounted(() => {
  getPokemon()
})

</script>
<style scoped>
section {
  font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
}

.container {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
}

form {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}

.card {
  width: 500px;
  border-radius: 30px;
  box-shadow: rgba(65, 62, 64, 0.4) 5px 5px, rgba(65, 62, 64, 0.3) 10px 10px, rgba(65, 62, 64, 0.2) 15px 15px, rgba(65, 62, 64, 0.1) 20px 20px, rgba(65, 62, 64, 0.05) 25px 25px;
  text-align: center;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}

.card-header {
  display: flex;
  justify-content: center;
  align-items: center;
}

.Grass {
  color: green;
}

.Fire {
  color: red;
}

.Water {
  color: blue;
}

.Electric {
  color: yellow;
}

.btn-edit {
  padding: 10px 20px;
  background-color: green;
  color: white;
  border: none;
  border-radius: 5px;
  margin-bottom: 10px;
}
</style>
