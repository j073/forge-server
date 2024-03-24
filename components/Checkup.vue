<template>
    
    <div v-if="titleCheck !== null">
      <p style="color: white;">{{ titleCheck }}</p>
    </div>
  
  </template>
  
  <script setup>
  import { ref, onMounted } from 'vue';
  const titleCheck = ref('Server sedang dimuat...');
  
  const fetchCheckup = async () => {
    try {
      const response = await $fetch('https://152.42.160.119/data/nuxt/checkup', {
        method: 'GET',
      });
      const jsonData = await response;
      const getData = jsonData.checkSetup[0]?.title_updated ?? 'Server sedang dimuat...';
      titleCheck.value = getData;
    } catch (error) {
      console.error(error);
    }
  }
  onMounted(fetchCheckup);
  </script>