<template>
  <div class="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8 py-16 text-center">
    <div class="mb-8">
      <div class="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
        <CheckCircleIcon class="h-12 w-12 text-green-600" />
      </div>
      
      <h1 class="text-3xl font-bold text-gray-900 mb-4">Order Confirmed!</h1>
      <p class="text-lg text-gray-600 mb-8">
        Thank you for your purchase. Your order has been successfully placed.
      </p>
    </div>

    <div class="card mb-8">
      <div class="card-body text-left">
        <h2 class="text-lg font-semibold mb-4">Order Details</h2>
        
        <div class="space-y-2 text-sm">
          <div class="flex justify-between">
            <span class="text-gray-600">Order Number:</span>
            <span class="font-medium">#{{ orderNumber }}</span>
          </div>
          
          <div class="flex justify-between">
            <span class="text-gray-600">Order Date:</span>
            <span class="font-medium">{{ orderDate }}</span>
          </div>
          
          <div class="flex justify-between">
            <span class="text-gray-600">Estimated Delivery:</span>
            <span class="font-medium">{{ estimatedDelivery }}</span>
          </div>
          
          <div class="flex justify-between">
            <span class="text-gray-600">Total Amount:</span>
            <span class="font-medium text-lg">${{ orderTotal }}</span>
          </div>
        </div>
      </div>
    </div>

    <div class="space-y-4">
      <p class="text-gray-600">
        A confirmation email has been sent to your email address with your order details and tracking information.
      </p>
      
      <div class="flex flex-col sm:flex-row gap-4 justify-center">
        <NuxtLink to="/products" class="btn btn-primary">
          Continue Shopping
        </NuxtLink>
        
        <button @click="trackOrder" class="btn btn-outline">
          Track Your Order
        </button>
      </div>
    </div>

    <!-- What's Next Section -->
    <div class="mt-12 text-left">
      <h3 class="text-lg font-semibold mb-4">What happens next?</h3>
      <div class="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
        <div class="flex items-start space-x-3">
          <div class="w-8 h-8 bg-primary-100 rounded-full flex items-center justify-center flex-shrink-0">
            <span class="text-primary-800 font-semibold">1</span>
          </div>
          <div>
            <p class="font-medium">Order Processing</p>
            <p class="text-gray-600">We'll prepare your items for shipment</p>
          </div>
        </div>
        
        <div class="flex items-start space-x-3">
          <div class="w-8 h-8 bg-primary-100 rounded-full flex items-center justify-center flex-shrink-0">
            <span class="text-primary-800 font-semibold">2</span>
          </div>
          <div>
            <p class="font-medium">Shipping</p>
            <p class="text-gray-600">Your order will be shipped within 1-2 business days</p>
          </div>
        </div>
        
        <div class="flex items-start space-x-3">
          <div class="w-8 h-8 bg-primary-100 rounded-full flex items-center justify-center flex-shrink-0">
            <span class="text-primary-800 font-semibold">3</span>
          </div>
          <div>
            <p class="font-medium">Delivery</p>
            <p class="text-gray-600">Receive your order at your doorstep</p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { CheckCircleIcon } from '@heroicons/vue/24/outline'

// SEO
useHead({
  title: 'Order Confirmed - Shop Hub',
  meta: [
    { name: 'description', content: 'Your order has been successfully placed.' }
  ]
})

const uiStore = useUiStore()

// Generate mock order details
const orderNumber = ref(Math.random().toString(36).substr(2, 9).toUpperCase())
const orderDate = ref(new Date().toLocaleDateString())
const orderTotal = ref((Math.random() * 500 + 50).toFixed(2))

const estimatedDelivery = computed(() => {
  const date = new Date()
  date.setDate(date.getDate() + 5) // 5 days from now
  return date.toLocaleDateString()
})

const trackOrder = () => {
  uiStore.showInfo('Order tracking feature coming soon!')
}
</script>
