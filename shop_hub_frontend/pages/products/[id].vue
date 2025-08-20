<template>
  <div v-if="product" class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
    <!-- Breadcrumb -->
    <nav class="mb-8">
      <ol class="flex items-center space-x-2 text-sm">
        <li><NuxtLink to="/" class="text-gray-500 hover:text-gray-700">Home</NuxtLink></li>
        <li class="text-gray-400">/</li>
        <li><NuxtLink to="/products" class="text-gray-500 hover:text-gray-700">Products</NuxtLink></li>
        <li class="text-gray-400">/</li>
        <li class="text-gray-900 font-medium">{{ product.name }}</li>
      </ol>
    </nav>

    <div class="grid grid-cols-1 lg:grid-cols-2 gap-12">
      <!-- Product Images -->
      <div>
        <div class="aspect-square bg-gray-100 rounded-lg overflow-hidden mb-4">
          <img 
            :src="product.image" 
            :alt="product.name"
            class="w-full h-full object-cover"
          >
        </div>
        
        <!-- Thumbnail Images (placeholder for now) -->
        <div class="grid grid-cols-4 gap-2">
          <div v-for="i in 4" :key="i" class="aspect-square bg-gray-100 rounded-lg overflow-hidden">
            <img 
              :src="product.image" 
              :alt="`${product.name} view ${i}`"
              class="w-full h-full object-cover opacity-75 hover:opacity-100 cursor-pointer transition-opacity"
            >
          </div>
        </div>
      </div>

      <!-- Product Info -->
      <div>
        <div class="mb-4">
          <span class="badge badge-primary">{{ product.category }}</span>
        </div>
        
        <h1 class="text-3xl font-bold text-gray-900 mb-4">{{ product.name }}</h1>
        
        <!-- Rating -->
        <div class="flex items-center space-x-2 mb-4">
          <div class="flex text-yellow-400">
            <StarIcon 
              v-for="i in 5" 
              :key="i"
              :class="[
                'h-5 w-5',
                i <= Math.floor(product.rating) ? 'fill-current' : 'stroke-current fill-none'
              ]"
            />
          </div>
          <span class="text-sm text-gray-600">({{ product.reviews }} reviews)</span>
        </div>

        <!-- Price -->
        <div class="mb-6">
          <span class="text-3xl font-bold text-gray-900">${{ product.price }}</span>
        </div>

        <!-- Description -->
        <div class="mb-6">
          <h3 class="text-lg font-semibold mb-2">Description</h3>
          <p class="text-gray-600">{{ product.description }}</p>
        </div>

        <!-- Stock Status -->
        <div class="mb-6">
          <span 
            :class="[
              'inline-flex items-center px-3 py-1 rounded-full text-sm font-medium',
              product.stock > 0 ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
            ]"
          >
            {{ product.stock > 0 ? `${product.stock} in stock` : 'Out of stock' }}
          </span>
        </div>

        <!-- Quantity and Add to Cart -->
        <div class="mb-6">
          <div class="flex items-center space-x-4">
            <div class="flex items-center border border-gray-300 rounded-lg">
              <button 
                @click="quantity = Math.max(1, quantity - 1)"
                class="p-2 hover:bg-gray-50"
              >
                <MinusIcon class="h-5 w-5" />
              </button>
              <span class="px-4 py-2 font-medium">{{ quantity }}</span>
              <button 
                @click="quantity = Math.min(product.stock, quantity + 1)"
                class="p-2 hover:bg-gray-50"
                :disabled="quantity >= product.stock"
              >
                <PlusIcon class="h-5 w-5" />
              </button>
            </div>
            
            <button 
              @click="addToCart"
              :disabled="product.stock === 0"
              class="flex-1 btn btn-primary"
            >
              Add to Cart
            </button>
            
            <button 
              @click="toggleWishlist"
              :class="[
                'p-3 rounded-lg border transition-colors',
                isInWishlist ? 'border-red-500 bg-red-50 text-red-500' : 'border-gray-300 hover:border-gray-400'
              ]"
            >
              <HeartIcon :class="['h-6 w-6', isInWishlist ? 'fill-current' : '']" />
            </button>
          </div>
        </div>

        <!-- Features -->
        <div class="border-t border-gray-200 pt-6">
          <h3 class="text-lg font-semibold mb-4">Features</h3>
          <ul class="space-y-2">
            <li class="flex items-center text-sm text-gray-600">
              <CheckIcon class="h-4 w-4 text-green-500 mr-2" />
              Free shipping on orders over $50
            </li>
            <li class="flex items-center text-sm text-gray-600">
              <CheckIcon class="h-4 w-4 text-green-500 mr-2" />
              30-day return policy
            </li>
            <li class="flex items-center text-sm text-gray-600">
              <CheckIcon class="h-4 w-4 text-green-500 mr-2" />
              Secure payment processing
            </li>
            <li class="flex items-center text-sm text-gray-600">
              <CheckIcon class="h-4 w-4 text-green-500 mr-2" />
              24/7 customer support
            </li>
          </ul>
        </div>
      </div>
    </div>

    <!-- Related Products -->
    <section class="mt-16">
      <h2 class="text-2xl font-bold text-gray-900 mb-8">Related Products</h2>
      <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        <ProductCard 
          v-for="relatedProduct in relatedProducts" 
          :key="relatedProduct.id" 
          :product="relatedProduct" 
        />
      </div>
    </section>
  </div>

  <!-- Loading State -->
  <div v-else-if="pending" class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
    <div class="animate-pulse">
      <div class="grid grid-cols-1 lg:grid-cols-2 gap-12">
        <div>
          <div class="aspect-square bg-gray-200 rounded-lg mb-4"></div>
          <div class="grid grid-cols-4 gap-2">
            <div v-for="i in 4" :key="i" class="aspect-square bg-gray-200 rounded-lg"></div>
          </div>
        </div>
        <div class="space-y-4">
          <div class="h-8 bg-gray-200 rounded w-3/4"></div>
          <div class="h-6 bg-gray-200 rounded w-1/2"></div>
          <div class="h-10 bg-gray-200 rounded w-1/4"></div>
          <div class="h-20 bg-gray-200 rounded"></div>
        </div>
      </div>
    </div>
  </div>

  <!-- Error State -->
  <div v-else class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 text-center">
    <h1 class="text-2xl font-bold text-gray-900 mb-4">Product Not Found</h1>
    <p class="text-gray-600 mb-8">The product you're looking for doesn't exist or has been removed.</p>
    <NuxtLink to="/products" class="btn btn-primary">
      Browse All Products
    </NuxtLink>
  </div>
</template>

<script setup>
import { 
  StarIcon, 
  MinusIcon, 
  PlusIcon, 
  HeartIcon, 
  CheckIcon 
} from '@heroicons/vue/24/outline'

const route = useRoute()
const productsStore = useProductsStore()
const cartStore = useCartStore()
const wishlistStore = useWishlistStore()

const quantity = ref(1)

// Fetch product data
const { data: product, pending } = await useLazyAsyncData(
  `product-${route.params.id}`,
  () => productsStore.fetchProductById(route.params.id)
)

// SEO
useHead(() => ({
  title: product.value ? `${product.value.name} - Shop Hub` : 'Product - Shop Hub',
  meta: [
    { name: 'description', content: product.value?.description || 'Product details' }
  ]
}))

// Computed
const isInWishlist = computed(() => 
  product.value ? wishlistStore.isInWishlist(product.value.id) : false
)

const relatedProducts = computed(() => {
  if (!product.value) return []
  
  return productsStore.products
    .filter(p => p.category === product.value.category && p.id !== product.value.id)
    .slice(0, 4)
})

// Methods
const addToCart = () => {
  if (product.value && product.value.stock > 0) {
    cartStore.addItem(product.value, quantity.value)
  }
}

const toggleWishlist = () => {
  if (product.value) {
    wishlistStore.toggleItem(product.value)
  }
}

// Load products if not already loaded
onMounted(() => {
  if (productsStore.products.length === 0) {
    productsStore.fetchProducts()
  }
})
</script>
