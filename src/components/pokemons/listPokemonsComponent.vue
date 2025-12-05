<template>
  <section>
    <h1>Super Pokédex</h1>
    <div class="container">
      <div class="card" v-for="pokemon in pokemons" :key="pokemon.id" @click="goToPokemon(pokemon.slug)">
        <img :src="pokemon.icon" :alt="`Esta icon es de ${pokemon.name}`">
        <h2>{{ pokemon.name }}</h2>
      </div>
    </div>
  </section>
</template>
<script setup>
import { ref, onMounted } from 'vue'
import api from '@/api/axios.js'
import router from '@/router'

const pokemons = ref([])

const getPokemons = async () => {
  try {
    const response = await api.get('/pokemons')
    pokemons.value = response.data
    console.log(pokemons.value);

  } catch (error) {
    console.error(error)
  }
}

const goToPokemon = (slug) => {
  router.push(`/pokemon/${slug}`)
}

// Version con promesas .then y .catch
// const getPokemons = () => {
//   api.get('/pokemons')
//     .then((response) => {
//       console.log(response.data)
//       pokemons.value = response.data
//     })
//     .catch(error => {
//       console.error(error)
//     })
// }

onMounted(() => {
  getPokemons()
})

</script>
<style scoped>
.container {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
}

.card {
  width: 150px;
  margin: 10px;
  text-align: center;
  border-radius: 10px;
  box-shadow: rgba(65, 62, 64, 0.4) 5px 5px, rgba(65, 62, 64, 0.3) 10px 10px, rgba(65, 62, 64, 0.2) 15px 15px, rgba(65, 62, 64, 0.1) 20px 20px, rgba(65, 62, 64, 0.05) 25px 25px;
  cursor: pointer;
}

.card img {
  width: 100px;
}

.card h2 {
  font-size: 16px;
  font-family: Cambria, Cochin, Georgia, Times, 'Times New Roman', serif;
}

img:hover {
  animation: jump 0.5s ease-in-out infinite;
}

@keyframes jump {
  0% {
    transform: translateY(0);
  }

  50% {
    transform: translateY(-10px);
  }

  100% {
    transform: translateY(0);
  }
}
</style>
