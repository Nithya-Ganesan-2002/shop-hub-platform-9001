<template>
  <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
    <div class="flex justify-between items-center mb-8">
      <h1 class="text-3xl font-bold text-gray-900">My Wishlist</h1>
      <button 
        v-if="!wishlistStore.isEmpty"
        @click="clearWishlist" 
        class="btn btn-outline btn-sm"
      >
        Clear All
      </button>
    </div>

    <div v-if="wishlistStore.isEmpty" class="text-center py-16">
      <HeartIcon class="mx-auto h-16 w-16 text-gray-300" />
      <h2 class="mt-4 text-xl font-semibold text-gray-900">Your wishlist is empty</h2>
      <p class="mt-2 text-gray-600">Save items you love to your wishlist</p>
      <NuxtLink to="/products" class="mt-6 btn btn-primary">
        Start Shopping
      </NuxtLink>
    </div>

    <div v-else>
      <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        <div 
          v-for="item in wishlistStore.items" 
          :key="item.id"
          class="card card-hover group"
        >
          <div class="relative overflow-hidden">
            <img 
              :src="item.image" 
              :alt="item.name"
              class="w-full aspect-square object-cover group-hover:scale-105 transition-transform duration-300"
            >
            
            <!-- Remove from Wishlist -->
            <button 
              @click="wishlistStore.removeItem(item.id)"
              class="absolute top-2 right-2 p-2 bg-red-500 text-white rounded-full hover:bg-red-600 transition-colors"
            >
              <XMarkIcon class="h-4 w-4" />
            </button>

            <!-- Quick Actions -->
            <div class="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/60 to-transparent p-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
              <div class="flex gap-2">
                <button 
                  @click="addToCart(item)"
                  class="flex-1 btn btn-white btn-sm"
                >
                  Add to Cart
                </button>
                <NuxtLink 
                  :to="`/products/${item.id}`"
                  class="btn btn-white btn-sm"
                >
                  View
                </NuxtLink>
              </div>
            </div>
          </div>

          <div class="card-body">
            <div class="flex items-start justify-between mb-2">
              <h3 class="font-semibold text-gray-900 group-hover:text-primary-800 transition-colors duration-200">
                <NuxtLink :to="`/products/${item.id}`" class="hover:underline">
                  {{ item.name }}
                </NuxtLink>
              </h3>
              <span class="badge badge-primary text-xs">{{ item.category }}</span>
            </div>
            
            <div class="flex items-center justify-between">
              <span class="text-xl font-bold text-gray-900">${{ item.price }}</span>
              
              <div class="flex space-x-2">
                <button 
                  @click="addToCart(item)"
                  class="btn btn-primary btn-sm"
                >
                  Add to Cart
                </button>
                
                <button 
                  @click="wishlistStore.removeItem(item.id)"
                  class="btn btn-outline btn-sm p-2"
                >
                  <TrashIcon class="h-4 w-4" />
                </button>
              </div>
            </div>

            <div class="mt-2 text-xs text-gray-500">
              Added {{ formatDate(item.addedAt) }}
            </div>
          </div>
        </div>
      </div>

      <!-- Move All to Cart -->
      <div class="mt-8 text-center">
        <button @click="moveAllToCart" class="btn btn-accent">
          Move All to Cart
        </button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { HeartIcon, XMarkIcon, TrashIcon } from '@heroicons/vue/24/outline'

// SEO
useHead({
  title: 'Wishlist - Shop Hub',
  meta: [
    { name: 'description', content: 'View and manage your saved items in your wishlist.' }
  ]
})

const wishlistStore = useWishlistStore()
const cartStore = useCartStore()
const uiStore = useUiStore()

// Methods
const addToCart = (item) => {
  cartStore.addItem(item)
  wishlistStore.removeItem(item.id)
}

const clearWishlist = () => {
  if (confirm('Are you sure you want to clear your entire wishlist?')) {
    wishlistStore.clearWishlist()
  }
}

const moveAllToCart = () => {
  if (confirm('Move all items from wishlist to cart?')) {
    wishlistStore.items.forEach(item => {
      cartStore.addItem(item)
    })
    wishlistStore.clearWishlist()
    uiStore.showSuccess('All items moved to cart!')
  }
}

const formatDate = (dateString) => {
  const date = new Date(dateString)
  return date.toLocaleDateString()
}
</script>

<style scoped>
.btn-white {
  @apply bg-white text-gray-900 hover:bg-gray-100;
}
</style>
