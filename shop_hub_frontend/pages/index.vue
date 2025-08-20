<template>
  <div>
    <!-- Hero Section -->
    <section class="bg-gradient-to-r from-primary-800 to-primary-600 text-white">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div class="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div>
            <h1 class="text-4xl lg:text-6xl font-bold mb-6">
              Discover Amazing
              <span class="text-accent-400">Products</span>
            </h1>
            <p class="text-xl text-primary-100 mb-8">
              Shop the latest trends and find exactly what you're looking for. 
              Quality products, great prices, and exceptional service.
            </p>
            <div class="flex flex-col sm:flex-row gap-4">
              <NuxtLink to="/products" class="btn btn-accent btn-lg">
                Shop Now
              </NuxtLink>
              <NuxtLink to="/categories" class="btn btn-outline btn-lg border-white text-white hover:bg-white hover:text-primary-800">
                Browse Categories
              </NuxtLink>
            </div>
          </div>
          <div class="hidden lg:block">
            <img 
              src="https://images.unsplash.com/photo-1472851294608-062f824d29cc?w=600" 
              alt="Shopping" 
              class="rounded-lg shadow-2xl"
            >
          </div>
        </div>
      </div>
    </section>

    <!-- Features Section -->
    <section class="py-16 bg-gray-50">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="text-center mb-12">
          <h2 class="text-3xl font-bold text-gray-900 mb-4">Why Choose Shop Hub?</h2>
          <p class="text-lg text-gray-600 max-w-2xl mx-auto">
            We provide exceptional shopping experience with these amazing features
          </p>
        </div>
        
        <div class="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div class="text-center">
            <div class="w-16 h-16 bg-accent-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <TruckIcon class="h-8 w-8 text-accent-600" />
            </div>
            <h3 class="text-xl font-semibold mb-2">Free Shipping</h3>
            <p class="text-gray-600">Free shipping on all orders over $50. Fast and reliable delivery.</p>
          </div>
          
          <div class="text-center">
            <div class="w-16 h-16 bg-accent-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <ShieldCheckIcon class="h-8 w-8 text-accent-600" />
            </div>
            <h3 class="text-xl font-semibold mb-2">Secure Payment</h3>
            <p class="text-gray-600">Your payment information is safe and secure with us.</p>
          </div>
          
          <div class="text-center">
            <div class="w-16 h-16 bg-accent-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <ChatBubbleLeftEllipsisIcon class="h-8 w-8 text-accent-600" />
            </div>
            <h3 class="text-xl font-semibold mb-2">24/7 Support</h3>
            <p class="text-gray-600">Our customer support team is here to help you anytime.</p>
          </div>
        </div>
      </div>
    </section>

    <!-- Featured Products -->
    <section class="py-16">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="flex justify-between items-center mb-12">
          <div>
            <h2 class="text-3xl font-bold text-gray-900 mb-4">Featured Products</h2>
            <p class="text-lg text-gray-600">Discover our most popular items</p>
          </div>
          <NuxtLink to="/products" class="btn btn-outline">
            View All Products
          </NuxtLink>
        </div>

        <div v-if="productsStore.isLoading" class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          <div v-for="i in 4" :key="i" class="animate-pulse">
            <div class="bg-gray-200 aspect-square rounded-lg mb-4"></div>
            <div class="h-4 bg-gray-200 rounded mb-2"></div>
            <div class="h-4 bg-gray-200 rounded w-2/3"></div>
          </div>
        </div>

        <div v-else class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          <ProductCard 
            v-for="product in productsStore.featuredProducts" 
            :key="product.id" 
            :product="product" 
          />
        </div>
      </div>
    </section>

    <!-- Newsletter Section -->
    <section class="py-16 bg-primary-800 text-white">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <h2 class="text-3xl font-bold mb-4">Stay Updated</h2>
        <p class="text-xl text-primary-100 mb-8 max-w-2xl mx-auto">
          Subscribe to our newsletter and be the first to know about new products and exclusive deals.
        </p>
        
        <form @submit.prevent="subscribeNewsletter" class="max-w-md mx-auto flex gap-4">
          <input 
            v-model="email"
            type="email" 
            placeholder="Enter your email" 
            required
            class="flex-1 px-4 py-3 rounded-lg text-gray-900 focus:outline-none focus:ring-2 focus:ring-accent-500"
          >
          <button type="submit" class="btn btn-accent">
            Subscribe
          </button>
        </form>
      </div>
    </section>
  </div>
</template>

<script setup>
import { TruckIcon, ShieldCheckIcon, ChatBubbleLeftEllipsisIcon } from '@heroicons/vue/24/outline'

// SEO
useHead({
  title: 'Shop Hub - Your Ultimate Shopping Destination',
  meta: [
    { name: 'description', content: 'Discover amazing products at Shop Hub. Browse, search, and shop with confidence.' }
  ]
})

const productsStore = useProductsStore()
const uiStore = useUiStore()

const email = ref('')

// Fetch data on mount
onMounted(async () => {
  if (productsStore.featuredProducts.length === 0) {
    await productsStore.fetchProducts()
  }
})

const subscribeNewsletter = () => {
  // Simulate newsletter subscription
  uiStore.showSuccess('Thank you for subscribing to our newsletter!')
  email.value = ''
}
</script>
