<template>
  <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
    <div class="text-center mb-12">
      <h1 class="text-3xl font-bold text-gray-900 mb-4">Product Categories</h1>
      <p class="text-lg text-gray-600 max-w-2xl mx-auto">
        Explore our wide range of product categories to find exactly what you're looking for
      </p>
    </div>

    <div v-if="productsStore.isLoading" class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      <div v-for="i in 6" :key="i" class="animate-pulse">
        <div class="bg-gray-200 aspect-video rounded-lg mb-4"></div>
        <div class="h-6 bg-gray-200 rounded mb-2"></div>
        <div class="h-4 bg-gray-200 rounded w-2/3"></div>
      </div>
    </div>

    <div v-else class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      <NuxtLink 
        v-for="category in productsStore.categories" 
        :key="category.id"
        :to="`/products?category=${encodeURIComponent(category.name)}`"
        class="card card-hover group"
      >
        <div class="aspect-video bg-gradient-to-br from-primary-500 to-primary-700 rounded-t-xl relative overflow-hidden">
          <div class="absolute inset-0 bg-black bg-opacity-20 group-hover:bg-opacity-10 transition-all duration-300"></div>
          <div class="absolute inset-0 flex items-center justify-center">
            <component 
              :is="getCategoryIcon(category.slug)" 
              class="h-16 w-16 text-white"
            />
          </div>
        </div>
        
        <div class="card-body text-center">
          <h3 class="text-xl font-semibold text-gray-900 group-hover:text-primary-800 transition-colors">
            {{ category.name }}
          </h3>
          <p class="text-gray-600 mt-2">{{ category.count }} products</p>
        </div>
      </NuxtLink>
    </div>

    <!-- Featured Categories Section -->
    <section class="mt-16">
      <h2 class="text-2xl font-bold text-gray-900 mb-8 text-center">Popular Categories</h2>
      <div class="grid grid-cols-2 md:grid-cols-4 gap-4">
        <NuxtLink 
          v-for="category in featuredCategories" 
          :key="category.slug"
          :to="`/products?category=${encodeURIComponent(category.name)}`"
          class="text-center p-6 rounded-lg border border-gray-200 hover:border-primary-300 hover:shadow-md transition-all duration-200"
        >
          <component 
            :is="getCategoryIcon(category.slug)" 
            class="h-8 w-8 mx-auto mb-2 text-primary-600"
          />
          <span class="text-sm font-medium text-gray-900">{{ category.name }}</span>
        </NuxtLink>
      </div>
    </section>
  </div>
</template>

<script setup>
import { 
  DevicePhoneMobileIcon,
  ShirtIcon,
  GiftIcon,
  HomeIcon,
  TrophyIcon,
  BookOpenIcon
} from '@heroicons/vue/24/outline'

// SEO
useHead({
  title: 'Categories - Shop Hub',
  meta: [
    { name: 'description', content: 'Browse our product categories to find exactly what you need.' }
  ]
})

const productsStore = useProductsStore()

// Featured categories for quick access
const featuredCategories = computed(() => 
  productsStore.categories.slice(0, 4)
)

// Map category slugs to icons
const getCategoryIcon = (slug) => {
  const iconMap = {
    'electronics': DevicePhoneMobileIcon,
    'clothing': ShirtIcon,
    'accessories': GiftIcon,
    'home-kitchen': HomeIcon,
    'sports': TrophyIcon,
    'books': BookOpenIcon
  }
  return iconMap[slug] || GiftIcon
}

// Load categories on mount
onMounted(async () => {
  if (productsStore.categories.length === 0) {
    await productsStore.fetchCategories()
  }
})
</script>
