<template>
  <navComponent />
  <listPokemonsComponent />
</template>

<script setup>
import navComponent from '@/components/ui/navComponent.vue'
import listPokemonsComponent from '@/components/pokemons/listPokemonsComponent.vue';
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
