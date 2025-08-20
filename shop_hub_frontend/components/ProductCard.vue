<template>
  <div class="card card-hover group">
    <div class="relative overflow-hidden">
      <img 
        :src="product.image" 
        :alt="product.name"
        class="w-full aspect-square object-cover group-hover:scale-105 transition-transform duration-300"
      >
      
      <!-- Wishlist Button -->
      <button 
        @click="toggleWishlist"
        :class="[
          'absolute top-2 right-2 p-2 rounded-full transition-colors duration-200',
          isInWishlist ? 'bg-red-500 text-white' : 'bg-white text-gray-400 hover:text-red-500'
        ]"
      >
        <HeartIcon :class="['h-5 w-5', isInWishlist ? 'fill-current' : '']" />
      </button>

      <!-- Quick Actions -->
      <div class="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/60 to-transparent p-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
        <div class="flex gap-2">
          <button 
            @click="addToCart"
            class="flex-1 btn btn-white btn-sm"
          >
            Add to Cart
          </button>
          <NuxtLink 
            :to="`/products/${product.id}`"
            class="btn btn-white btn-sm"
          >
            View Details
          </NuxtLink>
        </div>
      </div>
    </div>

    <div class="card-body">
      <div class="flex items-start justify-between mb-2">
        <h3 class="font-semibold text-gray-900 group-hover:text-primary-800 transition-colors duration-200">
          <NuxtLink :to="`/products/${product.id}`" class="hover:underline">
            {{ product.name }}
          </NuxtLink>
        </h3>
        <span class="badge badge-primary text-xs">{{ product.category }}</span>
      </div>
      
      <p class="text-sm text-gray-600 mb-3 line-clamp-2">{{ product.description }}</p>
      
      <div class="flex items-center justify-between">
        <span class="text-xl font-bold text-gray-900">${{ product.price }}</span>
        
        <div class="flex items-center space-x-1">
          <div class="flex text-yellow-400">
            <StarIcon 
              v-for="i in 5" 
              :key="i"
              :class="[
                'h-4 w-4',
                i <= Math.floor(product.rating) ? 'fill-current' : 'stroke-current fill-none'
              ]"
            />
          </div>
          <span class="text-sm text-gray-500">({{ product.reviews }})</span>
        </div>
      </div>

      <div class="mt-3 flex items-center justify-between">
        <span 
          :class="[
            'text-sm',
            product.stock > 0 ? 'text-green-600' : 'text-red-600'
          ]"
        >
          {{ product.stock > 0 ? `${product.stock} in stock` : 'Out of stock' }}
        </span>
        
        <button 
          v-if="!isInCart"
          @click="addToCart"
          :disabled="product.stock === 0"
          class="btn btn-primary btn-sm"
        >
          Add to Cart
        </button>
        
        <div v-else class="flex items-center space-x-2">
          <button @click="updateQuantity(-1)" class="btn btn-sm w-8 h-8 p-0">
            <MinusIcon class="h-4 w-4" />
          </button>
          <span class="text-sm font-medium">{{ cartQuantity }}</span>
          <button @click="updateQuantity(1)" class="btn btn-sm w-8 h-8 p-0">
            <PlusIcon class="h-4 w-4" />
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { HeartIcon, StarIcon, MinusIcon, PlusIcon } from '@heroicons/vue/24/outline'

const props = defineProps({
  product: {
    type: Object,
    required: true
  }
})

const cartStore = useCartStore()
const wishlistStore = useWishlistStore()
const uiStore = useUiStore()

const isInWishlist = computed(() => wishlistStore.isInWishlist(props.product.id))
const isInCart = computed(() => cartStore.isInCart(props.product.id))
const cartQuantity = computed(() => cartStore.getItemQuantity(props.product.id))

const addToCart = () => {
  if (props.product.stock > 0) {
    cartStore.addItem(props.product)
  }
}

const toggleWishlist = () => {
  wishlistStore.toggleItem(props.product)
}

const updateQuantity = (change) => {
  const newQuantity = cartQuantity.value + change
  cartStore.updateQuantity(props.product.id, newQuantity)
}
</script>

<style scoped>
.line-clamp-2 {
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
}

.btn-white {
  @apply bg-white text-gray-900 hover:bg-gray-100;
}
</style>
