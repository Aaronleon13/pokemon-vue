<template>
  <section>
    <loginComponent v-if="switchForm" @switch="switchForm = false" />
    <registerComponent v-else @switch="switchForm = true" />
  </section>
</template>

<script setup>
defineEmits(['switch'])
import loginComponent from '../components/auth/loginComponent.vue'
import registerComponent from '../components/auth/registerComponent.vue'

import { ref } from 'vue'

const switchForm = ref(true);

</script>


<style scoped>
section {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
}
</style>
