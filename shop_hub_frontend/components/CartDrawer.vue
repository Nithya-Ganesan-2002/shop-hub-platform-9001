<template>
  <div v-if="uiStore.isCartDrawerOpen" class="fixed inset-0 z-50 overflow-hidden">
    <!-- Overlay -->
    <div @click="uiStore.closeCartDrawer" class="absolute inset-0 bg-black bg-opacity-50"></div>
    
    <!-- Drawer -->
    <div class="absolute right-0 top-0 h-full w-96 max-w-full bg-white shadow-xl transform transition-transform duration-300 ease-in-out">
      <div class="flex flex-col h-full">
        <!-- Header -->
        <div class="flex items-center justify-between p-4 border-b border-gray-200">
          <h2 class="text-lg font-semibold text-gray-900">Shopping Cart</h2>
          <button @click="uiStore.closeCartDrawer" class="p-2 hover:bg-gray-100 rounded-lg">
            <XMarkIcon class="h-5 w-5" />
          </button>
        </div>

        <!-- Cart Items -->
        <div class="flex-1 overflow-y-auto p-4">
          <div v-if="cartStore.items.length === 0" class="text-center py-8">
            <ShoppingBagIcon class="mx-auto h-16 w-16 text-gray-300" />
            <p class="mt-4 text-gray-500">Your cart is empty</p>
            <NuxtLink to="/products" @click="uiStore.closeCartDrawer" class="mt-4 btn btn-primary">
              Start Shopping
            </NuxtLink>
          </div>

          <div v-else class="space-y-4">
            <div v-for="item in cartStore.items" :key="item.id" class="flex items-center space-x-4 p-4 bg-gray-50 rounded-lg">
              <img :src="item.image" :alt="item.name" class="w-16 h-16 object-cover rounded-lg">
              
              <div class="flex-1">
                <h3 class="font-medium text-gray-900">{{ item.name }}</h3>
                <p class="text-sm text-gray-500">${{ item.price }}</p>
                
                <!-- Quantity Controls -->
                <div class="flex items-center mt-2 space-x-2">
                  <button @click="cartStore.updateQuantity(item.id, item.quantity - 1)" 
                          class="w-8 h-8 flex items-center justify-center border border-gray-300 rounded-md hover:bg-gray-100">
                    <MinusIcon class="h-4 w-4" />
                  </button>
                  <span class="px-3 py-1 text-sm font-medium">{{ item.quantity }}</span>
                  <button @click="cartStore.updateQuantity(item.id, item.quantity + 1)" 
                          class="w-8 h-8 flex items-center justify-center border border-gray-300 rounded-md hover:bg-gray-100">
                    <PlusIcon class="h-4 w-4" />
                  </button>
                </div>
              </div>

              <button @click="cartStore.removeItem(item.id)" 
                      class="p-2 text-red-500 hover:bg-red-50 rounded-lg">
                <TrashIcon class="h-5 w-5" />
              </button>
            </div>
          </div>
        </div>

        <!-- Footer -->
        <div v-if="cartStore.items.length > 0" class="border-t border-gray-200 p-4 space-y-4">
          <div class="flex justify-between items-center text-lg font-semibold">
            <span>Total:</span>
            <span>${{ cartStore.total.toFixed(2) }}</span>
          </div>
          
          <div class="space-y-2">
            <NuxtLink to="/cart" @click="uiStore.closeCartDrawer" class="w-full btn btn-outline">
              View Cart
            </NuxtLink>
            <NuxtLink to="/checkout" @click="uiStore.closeCartDrawer" class="w-full btn btn-primary">
              Checkout
            </NuxtLink>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { 
  XMarkIcon, 
  ShoppingBagIcon, 
  MinusIcon, 
  PlusIcon, 
  TrashIcon 
} from '@heroicons/vue/24/outline'

const uiStore = useUiStore()
const cartStore = useCartStore()
</script>
