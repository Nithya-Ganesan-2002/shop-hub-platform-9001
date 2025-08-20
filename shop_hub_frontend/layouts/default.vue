<template>
  <div class="min-h-screen flex flex-col">
    <!-- Header -->
    <HeaderComponent />
    
    <!-- Main Content -->
    <main class="flex-1">
      <slot />
    </main>
    
    <!-- Footer -->
    <FooterComponent />
    
    <!-- Cart Drawer -->
    <CartDrawer />
    
    <!-- Mobile Menu -->
    <MobileMenu />
  </div>
</template>

<script setup>
const uiStore = useUiStore()

// Close drawers on route change
watch(() => useRoute().path, () => {
  uiStore.closeMobileMenu()
  uiStore.closeCartDrawer()
})
</script>
