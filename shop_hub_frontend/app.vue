<template>
  <div id="app">
    <NuxtRouteAnnouncer />
    <NuxtLayout>
      <NuxtPage />
    </NuxtLayout>
  </div>
</template>

<script setup>
// Global meta tags
useHead({
  htmlAttrs: {
    lang: 'en'
  }
})

// Initialize stores on app startup
const cartStore = useCartStore()
const wishlistStore = useWishlistStore()

// Load persisted data
onMounted(() => {
  cartStore.loadFromStorage()
  wishlistStore.loadFromStorage()
})
</script>

<style>
html {
  scroll-behavior: smooth;
}

body {
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}
</style>
