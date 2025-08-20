<template>
  <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
    <!-- Page Header -->
    <div class="mb-8">
      <h1 class="text-3xl font-bold text-gray-900 mb-4">All Products</h1>
      <p class="text-lg text-gray-600">
        Discover our complete collection of amazing products
      </p>
    </div>

    <!-- Filters and Search -->
    <div class="mb-8 grid grid-cols-1 lg:grid-cols-4 gap-6">
      <!-- Filters Sidebar -->
      <div class="lg:col-span-1">
        <div class="card">
          <div class="card-header">
            <h3 class="font-semibold">Filters</h3>
          </div>
          <div class="card-body space-y-6">
            <!-- Category Filter -->
            <div>
              <label class="form-label">Category</label>
              <select v-model="filters.category" class="form-input">
                <option value="">All Categories</option>
                <option v-for="category in productsStore.categories" :key="category.id" :value="category.name">
                  {{ category.name }} ({{ category.count }})
                </option>
              </select>
            </div>

            <!-- Price Range -->
            <div>
              <label class="form-label">Price Range</label>
              <div class="space-y-2">
                <input 
                  v-model.number="filters.minPrice" 
                  type="number" 
                  placeholder="Min Price" 
                  class="form-input"
                >
                <input 
                  v-model.number="filters.maxPrice" 
                  type="number" 
                  placeholder="Max Price" 
                  class="form-input"
                >
              </div>
            </div>

            <!-- In Stock Filter -->
            <div>
              <label class="flex items-center space-x-2">
                <input 
                  v-model="filters.inStock" 
                  type="checkbox" 
                  class="rounded border-gray-300 text-primary-600 focus:ring-primary-500"
                >
                <span class="text-sm font-medium text-gray-700">In Stock Only</span>
              </label>
            </div>

            <!-- Sort By -->
            <div>
              <label class="form-label">Sort By</label>
              <select v-model="filters.sortBy" class="form-input">
                <option value="">Default</option>
                <option value="name">Name</option>
                <option value="price_asc">Price: Low to High</option>
                <option value="price_desc">Price: High to Low</option>
                <option value="rating">Rating</option>
              </select>
            </div>

            <!-- Clear Filters -->
            <button @click="clearFilters" class="w-full btn btn-outline btn-sm">
              Clear Filters
            </button>
          </div>
        </div>
      </div>

      <!-- Products Grid -->
      <div class="lg:col-span-3">
        <!-- Search and Results Info -->
        <div class="mb-6">
          <div class="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
            <div class="flex-1 max-w-md">
              <div class="relative">
                <input
                  v-model="searchQuery"
                  type="text"
                  placeholder="Search products..."
                  class="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
                >
                <MagnifyingGlassIcon class="absolute left-3 top-2.5 h-5 w-5 text-gray-400" />
              </div>
            </div>
            
            <div class="text-sm text-gray-600">
              Showing {{ filteredProducts.length }} of {{ productsStore.products.length }} products
            </div>
          </div>
        </div>

        <!-- Loading State -->
        <div v-if="productsStore.isLoading" class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          <div v-for="i in 6" :key="i" class="animate-pulse">
            <div class="bg-gray-200 aspect-square rounded-lg mb-4"></div>
            <div class="h-4 bg-gray-200 rounded mb-2"></div>
            <div class="h-4 bg-gray-200 rounded w-2/3"></div>
          </div>
        </div>

        <!-- Products Grid -->
        <div v-else-if="filteredProducts.length > 0" class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          <ProductCard 
            v-for="product in paginatedProducts" 
            :key="product.id" 
            :product="product" 
          />
        </div>

        <!-- No Results -->
        <div v-else class="text-center py-16">
          <MagnifyingGlassIcon class="mx-auto h-16 w-16 text-gray-300" />
          <h3 class="mt-4 text-lg font-medium text-gray-900">No products found</h3>
          <p class="mt-2 text-gray-500">Try adjusting your search or filter criteria</p>
          <button @click="clearFilters" class="mt-4 btn btn-primary">
            Clear Filters
          </button>
        </div>

        <!-- Pagination -->
        <div v-if="totalPages > 1" class="mt-8 flex justify-center">
          <nav class="flex items-center space-x-2">
            <button 
              @click="currentPage--" 
              :disabled="currentPage === 1"
              class="btn btn-outline btn-sm"
              :class="{ 'opacity-50 cursor-not-allowed': currentPage === 1 }"
            >
              Previous
            </button>
            
            <span 
              v-for="page in visiblePages" 
              :key="page"
              :class="[
                'px-3 py-2 text-sm font-medium rounded-lg',
                page === currentPage ? 'bg-primary-800 text-white' : 'text-gray-700 hover:bg-gray-100 cursor-pointer'
              ]"
              @click="currentPage = page"
            >
              {{ page }}
            </span>
            
            <button 
              @click="currentPage++" 
              :disabled="currentPage === totalPages"
              class="btn btn-outline btn-sm"
              :class="{ 'opacity-50 cursor-not-allowed': currentPage === totalPages }"
            >
              Next
            </button>
          </nav>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { MagnifyingGlassIcon } from '@heroicons/vue/24/outline'

// SEO
useHead({
  title: 'Products - Shop Hub',
  meta: [
    { name: 'description', content: 'Browse our complete collection of products. Find exactly what you\'re looking for.' }
  ]
})

const route = useRoute()
const productsStore = useProductsStore()

// State
const searchQuery = ref(route.query.search || '')
const currentPage = ref(1)
const itemsPerPage = 12

const filters = reactive({
  category: route.query.category || '',
  minPrice: route.query.minPrice ? Number(route.query.minPrice) : undefined,
  maxPrice: route.query.maxPrice ? Number(route.query.maxPrice) : undefined,
  inStock: route.query.inStock === 'true',
  sortBy: route.query.sortBy || ''
})

// Computed
const filteredProducts = computed(() => {
  let products = productsStore.products

  // Apply search
  if (searchQuery.value) {
    const query = searchQuery.value.toLowerCase()
    products = products.filter(product =>
      product.name.toLowerCase().includes(query) ||
      product.description.toLowerCase().includes(query) ||
      product.category.toLowerCase().includes(query)
    )
  }

  // Apply filters
  return productsStore.filterProducts(filters)
})

const totalPages = computed(() => Math.ceil(filteredProducts.value.length / itemsPerPage))

const paginatedProducts = computed(() => {
  const start = (currentPage.value - 1) * itemsPerPage
  const end = start + itemsPerPage
  return filteredProducts.value.slice(start, end)
})

const visiblePages = computed(() => {
  const pages = []
  const maxVisible = 5
  const start = Math.max(1, currentPage.value - Math.floor(maxVisible / 2))
  const end = Math.min(totalPages.value, start + maxVisible - 1)
  
  for (let i = start; i <= end; i++) {
    pages.push(i)
  }
  
  return pages
})

// Methods
const clearFilters = () => {
  Object.assign(filters, {
    category: '',
    minPrice: undefined,
    maxPrice: undefined,
    inStock: false,
    sortBy: ''
  })
  searchQuery.value = ''
  currentPage.value = 1
  updateURL()
}

const updateURL = () => {
  const query = {}
  
  if (searchQuery.value) query.search = searchQuery.value
  if (filters.category) query.category = filters.category
  if (filters.minPrice !== undefined) query.minPrice = filters.minPrice
  if (filters.maxPrice !== undefined) query.maxPrice = filters.maxPrice
  if (filters.inStock) query.inStock = 'true'
  if (filters.sortBy) query.sortBy = filters.sortBy
  
  navigateTo({ query }, { replace: true })
}

// Watchers
watch([filters, searchQuery], () => {
  currentPage.value = 1
  updateURL()
}, { deep: true })

// Lifecycle
onMounted(async () => {
  if (productsStore.products.length === 0) {
    await productsStore.fetchProducts()
  }
  if (productsStore.categories.length === 0) {
    await productsStore.fetchCategories()
  }
})
</script>
