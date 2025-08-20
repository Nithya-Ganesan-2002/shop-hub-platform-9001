<template>
  <header class="bg-white shadow-sm sticky top-0 z-40">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div class="flex justify-between items-center h-16">
        <!-- Logo -->
        <div class="flex items-center">
          <NuxtLink to="/" class="flex items-center space-x-2">
            <div class="w-8 h-8 bg-primary-800 rounded-lg flex items-center justify-center">
              <span class="text-white font-bold text-sm">SH</span>
            </div>
            <span class="text-xl font-bold text-primary-800 hidden sm:block">Shop Hub</span>
          </NuxtLink>
        </div>

        <!-- Desktop Navigation -->
        <nav class="hidden md:flex items-center space-x-8">
          <NuxtLink 
            v-for="item in navigationItems" 
            :key="item.name"
            :to="item.href"
            :class="[
              'text-sm font-medium transition-colors duration-200',
              $route.path === item.href ? 'text-primary-800' : 'text-gray-600 hover:text-gray-900'
            ]"
          >
            {{ item.name }}
          </NuxtLink>
        </nav>

        <!-- Search Bar (Desktop) -->
        <div class="hidden md:flex flex-1 max-w-md mx-8">
          <div class="relative w-full">
            <input
              v-model="searchQuery"
              @input="handleSearch"
              @keyup.enter="performSearch"
              type="text"
              placeholder="Search products..."
              class="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
            >
            <MagnifyingGlassIcon class="absolute left-3 top-2.5 h-5 w-5 text-gray-400" />
            
            <!-- Search Suggestions -->
            <div v-if="showSuggestions && searchSuggestions.length > 0" 
                 class="absolute top-full left-0 right-0 bg-white border border-gray-200 rounded-lg shadow-lg mt-1 z-50">
              <div 
                v-for="suggestion in searchSuggestions" 
                :key="suggestion.id"
                @click="selectSuggestion(suggestion)"
                class="px-4 py-2 hover:bg-gray-50 cursor-pointer border-b border-gray-100 last:border-b-0"
              >
                <div class="flex items-center space-x-3">
                  <img :src="suggestion.image" :alt="suggestion.name" class="w-8 h-8 object-cover rounded">
                  <div>
                    <p class="text-sm font-medium text-gray-900">{{ suggestion.name }}</p>
                    <p class="text-xs text-gray-500">${{ suggestion.price }}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- Actions -->
        <div class="flex items-center space-x-4">
          <!-- Search Icon (Mobile) -->
          <button 
            @click="toggleMobileSearch" 
            class="md:hidden p-2 text-gray-600 hover:text-gray-900"
          >
            <MagnifyingGlassIcon class="h-6 w-6" />
          </button>

          <!-- Wishlist -->
          <NuxtLink to="/wishlist" class="relative p-2 text-gray-600 hover:text-gray-900">
            <HeartIcon class="h-6 w-6" />
            <span v-if="wishlistStore.itemCount > 0" 
                  class="absolute -top-1 -right-1 bg-accent text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
              {{ wishlistStore.itemCount }}
            </span>
          </NuxtLink>

          <!-- Cart -->
          <button @click="uiStore.toggleCartDrawer" class="relative p-2 text-gray-600 hover:text-gray-900">
            <ShoppingBagIcon class="h-6 w-6" />
            <span v-if="cartStore.itemCount > 0" 
                  class="absolute -top-1 -right-1 bg-accent text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
              {{ cartStore.itemCount }}
            </span>
          </button>

          <!-- Mobile Menu Toggle -->
          <button @click="uiStore.toggleMobileMenu" class="md:hidden p-2 text-gray-600 hover:text-gray-900">
            <Bars3Icon class="h-6 w-6" />
          </button>
        </div>
      </div>

      <!-- Mobile Search Bar -->
      <div v-if="showMobileSearch" class="md:hidden pb-4">
        <div class="relative">
          <input
            v-model="searchQuery"
            @input="handleSearch"
            @keyup.enter="performSearch"
            ref="mobileSearchInput"
            type="text"
            placeholder="Search products..."
            class="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
          >
          <MagnifyingGlassIcon class="absolute left-3 top-2.5 h-5 w-5 text-gray-400" />
        </div>
      </div>
    </div>
  </header>
</template>

<script setup>
import { 
  MagnifyingGlassIcon, 
  HeartIcon, 
  ShoppingBagIcon, 
  Bars3Icon 
} from '@heroicons/vue/24/outline'

const uiStore = useUiStore()
const cartStore = useCartStore()
const wishlistStore = useWishlistStore()
const productsStore = useProductsStore()

const searchQuery = ref('')
const showMobileSearch = ref(false)
const showSuggestions = ref(false)
const searchSuggestions = ref([])
const mobileSearchInput = ref(null)

const navigationItems = [
  { name: 'Home', href: '/' },
  { name: 'Products', href: '/products' },
  { name: 'Categories', href: '/categories' },
  { name: 'About', href: '/about' },
  { name: 'Contact', href: '/contact' },
]

const toggleMobileSearch = () => {
  showMobileSearch.value = !showMobileSearch.value
  if (showMobileSearch.value) {
    nextTick(() => {
      mobileSearchInput.value?.focus()
    })
  }
}

const handleSearch = useDebounceFn(async () => {
  if (searchQuery.value.length > 2) {
    showSuggestions.value = true
    searchSuggestions.value = await productsStore.searchProducts(searchQuery.value, 5)
  } else {
    showSuggestions.value = false
    searchSuggestions.value = []
  }
}, 300)

const performSearch = () => {
  if (searchQuery.value.trim()) {
    showSuggestions.value = false
    showMobileSearch.value = false
    navigateTo(`/products?search=${encodeURIComponent(searchQuery.value)}`)
  }
}

const selectSuggestion = (product) => {
  showSuggestions.value = false
  showMobileSearch.value = false
  navigateTo(`/products/${product.id}`)
}

// Close suggestions when clicking outside
onClickOutside(templateRef, () => {
  showSuggestions.value = false
})
</script>
