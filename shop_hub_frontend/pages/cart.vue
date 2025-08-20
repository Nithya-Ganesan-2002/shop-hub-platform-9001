<template>
  <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
    <h1 class="text-3xl font-bold text-gray-900 mb-8">Shopping Cart</h1>

    <div v-if="cartStore.isEmpty" class="text-center py-16">
      <ShoppingCartIcon class="mx-auto h-16 w-16 text-gray-300" />
      <h2 class="mt-4 text-xl font-semibold text-gray-900">Your cart is empty</h2>
      <p class="mt-2 text-gray-600">Start shopping to add items to your cart</p>
      <NuxtLink to="/products" class="mt-6 btn btn-primary">
        Continue Shopping
      </NuxtLink>
    </div>

    <div v-else class="grid grid-cols-1 lg:grid-cols-3 gap-8">
      <!-- Cart Items -->
      <div class="lg:col-span-2">
        <div class="space-y-4">
          <div 
            v-for="item in cartStore.items" 
            :key="item.id"
            class="card"
          >
            <div class="card-body">
              <div class="flex items-center space-x-4">
                <!-- Product Image -->
                <img 
                  :src="item.image" 
                  :alt="item.name"
                  class="w-20 h-20 object-cover rounded-lg"
                >
                
                <!-- Product Info -->
                <div class="flex-1">
                  <h3 class="font-semibold text-gray-900">
                    <NuxtLink :to="`/products/${item.id}`" class="hover:text-primary-800">
                      {{ item.name }}
                    </NuxtLink>
                  </h3>
                  <p class="text-gray-600">${{ item.price }}</p>
                </div>

                <!-- Quantity Controls -->
                <div class="flex items-center space-x-3">
                  <button 
                    @click="cartStore.updateQuantity(item.id, item.quantity - 1)"
                    class="w-8 h-8 flex items-center justify-center border border-gray-300 rounded-md hover:bg-gray-100"
                  >
                    <MinusIcon class="h-4 w-4" />
                  </button>
                  
                  <span class="w-12 text-center font-medium">{{ item.quantity }}</span>
                  
                  <button 
                    @click="cartStore.updateQuantity(item.id, item.quantity + 1)"
                    class="w-8 h-8 flex items-center justify-center border border-gray-300 rounded-md hover:bg-gray-100"
                  >
                    <PlusIcon class="h-4 w-4" />
                  </button>
                </div>

                <!-- Item Total -->
                <div class="text-right">
                  <p class="font-semibold text-gray-900">
                    ${{ (item.price * item.quantity).toFixed(2) }}
                  </p>
                </div>

                <!-- Remove Button -->
                <button 
                  @click="cartStore.removeItem(item.id)"
                  class="p-2 text-red-500 hover:bg-red-50 rounded-lg"
                >
                  <TrashIcon class="h-5 w-5" />
                </button>
              </div>
            </div>
          </div>
        </div>

        <!-- Cart Actions -->
        <div class="mt-6 flex justify-between items-center">
          <NuxtLink to="/products" class="btn btn-outline">
            Continue Shopping
          </NuxtLink>
          
          <button @click="clearCart" class="btn btn-secondary">
            Clear Cart
          </button>
        </div>
      </div>

      <!-- Order Summary -->
      <div class="lg:col-span-1">
        <div class="card sticky top-8">
          <div class="card-header">
            <h3 class="font-semibold">Order Summary</h3>
          </div>
          
          <div class="card-body space-y-4">
            <div class="flex justify-between">
              <span class="text-gray-600">Subtotal ({{ cartStore.itemCount }} items)</span>
              <span class="font-medium">${{ cartStore.total.toFixed(2) }}</span>
            </div>
            
            <div class="flex justify-between">
              <span class="text-gray-600">Shipping</span>
              <span class="font-medium">
                {{ cartStore.total >= 50 ? 'Free' : '$9.99' }}
              </span>
            </div>
            
            <div class="flex justify-between">
              <span class="text-gray-600">Tax</span>
              <span class="font-medium">${{ (cartStore.total * 0.08).toFixed(2) }}</span>
            </div>
            
            <hr class="border-gray-200">
            
            <div class="flex justify-between items-center text-lg font-semibold">
              <span>Total</span>
              <span>${{ orderTotal.toFixed(2) }}</span>
            </div>

            <div class="space-y-3">
              <NuxtLink to="/checkout" class="w-full btn btn-primary">
                Proceed to Checkout
              </NuxtLink>
              
              <button class="w-full btn btn-outline">
                PayPal Express
              </button>
            </div>

            <!-- Shipping Notice -->
            <div v-if="cartStore.total < 50" class="text-sm text-gray-600 bg-yellow-50 p-3 rounded-lg">
              <strong>Free shipping</strong> on orders over $50. 
              Add ${{ (50 - cartStore.total).toFixed(2) }} more to qualify!
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { 
  ShoppingCartIcon, 
  MinusIcon, 
  PlusIcon, 
  TrashIcon 
} from '@heroicons/vue/24/outline'

// SEO
useHead({
  title: 'Shopping Cart - Shop Hub',
  meta: [
    { name: 'description', content: 'Review and manage items in your shopping cart.' }
  ]
})

const cartStore = useCartStore()
const uiStore = useUiStore()

// Computed
const orderTotal = computed(() => {
  const subtotal = cartStore.total
  const shipping = subtotal >= 50 ? 0 : 9.99
  const tax = subtotal * 0.08
  return subtotal + shipping + tax
})

// Methods
const clearCart = () => {
  if (confirm('Are you sure you want to clear your cart?')) {
    cartStore.clearCart()
  }
}
</script>
