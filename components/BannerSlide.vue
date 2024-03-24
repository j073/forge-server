<template>
    <div class="container">
      <nuxt-img src="https://it-cgg.b-cdn.net/rtp/rajazeus/banner.webp" style="width: 100%; height: auto !important;"/>
    </div>
  </template>
  <script>
  import { defineComponent } from 'vue'
  import { Carousel, Pagination, Slide } from 'vue3-carousel'
  
  import 'vue3-carousel/dist/carousel.css'
  
  export default defineComponent({
    name: 'Autoplay',
    components: {
      Carousel,
      Slide,
      Pagination,
    },
  })
  </script>
  
  <style>
  .carousel__item {
    width: 100%;
    height: auto;
    border-radius: 15px;
    object-position: center;
    display: flex;
    justify-content: center;
    align-items: center;
  }
  </style>