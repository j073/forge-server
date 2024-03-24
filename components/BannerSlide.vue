<template>
  <div class="container">
    <Carousel :autoplay="2000" :loop="true">
      <Slide v-for="(image, index) in imagesWithDuplicates" :key="index">
        <img :src="image.src" :alt="image.alt" class="carousel__item" loading="lazy"/>
      </Slide>
    </Carousel>
  </div>
</template>

<script>
import { defineComponent } from 'vue'
import { Carousel, Slide } from 'vue3-carousel'

export default defineComponent({
  name: 'ImageSlider',
  components: {
    Carousel,
    Slide,
  },
  data() {
    return {
      images: [
        { src: 'https://it-cgg.b-cdn.net/rtp/rmj/banner1.webp', alt: 'Image 1' },
        { src: 'https://it-cgg.b-cdn.net/rtp/rmj/banner2.webp', alt: 'Image 2' },
        { src: 'https://it-cgg.b-cdn.net/rtp/rmj/banner3.webp', alt: 'Image 3' },
      ],
    }
  },
  computed: {
    imagesWithDuplicates() {
      return [
        ...this.images.slice(-1), 
        ...this.images,
        ...this.images.slice(0, 1), 
      ]
    },
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