<template>
  <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
    <h1 class="text-3xl font-bold text-gray-900 mb-8">Checkout</h1>

    <div v-if="cartStore.isEmpty" class="text-center py-16">
      <ShoppingCartIcon class="mx-auto h-16 w-16 text-gray-300" />
      <h2 class="mt-4 text-xl font-semibold text-gray-900">Your cart is empty</h2>
      <p class="mt-2 text-gray-600">Add some items to your cart before checking out</p>
      <NuxtLink to="/products" class="mt-6 btn btn-primary">
        Continue Shopping
      </NuxtLink>
    </div>

    <div v-else class="grid grid-cols-1 lg:grid-cols-2 gap-8">
      <!-- Checkout Form -->
      <div class="space-y-8">
        <!-- Shipping Information -->
        <div class="card">
          <div class="card-header">
            <h2 class="text-lg font-semibold">Shipping Information</h2>
          </div>
          <div class="card-body space-y-4">
            <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label class="form-label">First Name</label>
                <input v-model="form.firstName" type="text" class="form-input" required>
              </div>
              <div>
                <label class="form-label">Last Name</label>
                <input v-model="form.lastName" type="text" class="form-input" required>
              </div>
            </div>
            
            <div>
              <label class="form-label">Email</label>
              <input v-model="form.email" type="email" class="form-input" required>
            </div>
            
            <div>
              <label class="form-label">Phone</label>
              <input v-model="form.phone" type="tel" class="form-input" required>
            </div>
            
            <div>
              <label class="form-label">Address</label>
              <input v-model="form.address" type="text" class="form-input" required>
            </div>
            
            <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <label class="form-label">City</label>
                <input v-model="form.city" type="text" class="form-input" required>
              </div>
              <div>
                <label class="form-label">State</label>
                <select v-model="form.state" class="form-input" required>
                  <option value="">Select State</option>
                  <option value="CA">California</option>
                  <option value="NY">New York</option>
                  <option value="TX">Texas</option>
                  <option value="FL">Florida</option>
                  <!-- Add more states as needed -->
                </select>
              </div>
              <div>
                <label class="form-label">ZIP Code</label>
                <input v-model="form.zipCode" type="text" class="form-input" required>
              </div>
            </div>
          </div>
        </div>

        <!-- Payment Information -->
        <div class="card">
          <div class="card-header">
            <h2 class="text-lg font-semibold">Payment Information</h2>
          </div>
          <div class="card-body space-y-4">
            <div>
              <label class="form-label">Card Number</label>
              <input 
                v-model="form.cardNumber" 
                type="text" 
                placeholder="1234 5678 9012 3456"
                class="form-input" 
                required
              >
            </div>
            
            <div class="grid grid-cols-2 gap-4">
              <div>
                <label class="form-label">Expiry Date</label>
                <input 
                  v-model="form.expiryDate" 
                  type="text" 
                  placeholder="MM/YY"
                  class="form-input" 
                  required
                >
              </div>
              <div>
                <label class="form-label">CVV</label>
                <input 
                  v-model="form.cvv" 
                  type="text" 
                  placeholder="123"
                  class="form-input" 
                  required
                >
              </div>
            </div>
            
            <div>
              <label class="form-label">Cardholder Name</label>
              <input v-model="form.cardholderName" type="text" class="form-input" required>
            </div>

            <!-- Billing Address Same as Shipping -->
            <div>
              <label class="flex items-center space-x-2">
                <input 
                  v-model="form.sameAsShipping" 
                  type="checkbox" 
                  class="rounded border-gray-300 text-primary-600 focus:ring-primary-500"
                >
                <span class="text-sm font-medium text-gray-700">
                  Billing address same as shipping
                </span>
              </label>
            </div>
          </div>
        </div>
      </div>

      <!-- Order Summary -->
      <div>
        <div class="card sticky top-8">
          <div class="card-header">
            <h2 class="text-lg font-semibold">Order Summary</h2>
          </div>
          
          <div class="card-body">
            <!-- Order Items -->
            <div class="space-y-3 mb-6">
              <div 
                v-for="item in cartStore.items" 
                :key="item.id"
                class="flex items-center space-x-3"
              >
                <img 
                  :src="item.image" 
                  :alt="item.name"
                  class="w-12 h-12 object-cover rounded-lg"
                >
                <div class="flex-1">
                  <p class="text-sm font-medium text-gray-900">{{ item.name }}</p>
                  <p class="text-sm text-gray-600">Qty: {{ item.quantity }}</p>
                </div>
                <p class="text-sm font-medium text-gray-900">
                  ${{ (item.price * item.quantity).toFixed(2) }}
                </p>
              </div>
            </div>

            <hr class="border-gray-200 mb-4">

            <!-- Order Totals -->
            <div class="space-y-2">
              <div class="flex justify-between text-sm">
                <span class="text-gray-600">Subtotal</span>
                <span class="font-medium">${{ cartStore.total.toFixed(2) }}</span>
              </div>
              
              <div class="flex justify-between text-sm">
                <span class="text-gray-600">Shipping</span>
                <span class="font-medium">
                  {{ shippingCost === 0 ? 'Free' : `$${shippingCost.toFixed(2)}` }}
                </span>
              </div>
              
              <div class="flex justify-between text-sm">
                <span class="text-gray-600">Tax</span>
                <span class="font-medium">${{ taxAmount.toFixed(2) }}</span>
              </div>
              
              <hr class="border-gray-200">
              
              <div class="flex justify-between items-center text-lg font-semibold">
                <span>Total</span>
                <span>${{ orderTotal.toFixed(2) }}</span>
              </div>
            </div>

            <!-- Place Order Button -->
            <button 
              @click="placeOrder"
              :disabled="isProcessing"
              class="w-full mt-6 btn btn-primary"
              :class="{ 'opacity-50 cursor-not-allowed': isProcessing }"
            >
              <span v-if="isProcessing">Processing...</span>
              <span v-else>Place Order</span>
            </button>

            <!-- Security Notice -->
            <div class="mt-4 flex items-center justify-center text-sm text-gray-600">
              <LockClosedIcon class="h-4 w-4 mr-1" />
              <span>Secure checkout with SSL encryption</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ShoppingCartIcon, LockClosedIcon } from '@heroicons/vue/24/outline'

// SEO
useHead({
  title: 'Checkout - Shop Hub',
  meta: [
    { name: 'description', content: 'Complete your purchase securely.' }
  ]
})

const cartStore = useCartStore()
const uiStore = useUiStore()
const router = useRouter()

const isProcessing = ref(false)

const form = reactive({
  firstName: '',
  lastName: '',
  email: '',
  phone: '',
  address: '',
  city: '',
  state: '',
  zipCode: '',
  cardNumber: '',
  expiryDate: '',
  cvv: '',
  cardholderName: '',
  sameAsShipping: true
})

// Computed
const shippingCost = computed(() => cartStore.total >= 50 ? 0 : 9.99)
const taxAmount = computed(() => cartStore.total * 0.08)
const orderTotal = computed(() => cartStore.total + shippingCost.value + taxAmount.value)

// Methods
const placeOrder = async () => {
  // Validate form
  if (!validateForm()) {
    uiStore.showError('Please fill in all required fields')
    return
  }

  isProcessing.value = true

  try {
    // Simulate order processing
    await new Promise(resolve => setTimeout(resolve, 2000))
    
    // Clear cart
    cartStore.clearCart()
    
    // Show success message
    uiStore.showSuccess('Order placed successfully!')
    
    // Redirect to success page
    router.push('/order-success')
  } catch (error) {
    uiStore.showError('Failed to process order. Please try again.')
  } finally {
    isProcessing.value = false
  }
}

const validateForm = () => {
  const requiredFields = [
    'firstName', 'lastName', 'email', 'phone', 'address', 
    'city', 'state', 'zipCode', 'cardNumber', 'expiryDate', 
    'cvv', 'cardholderName'
  ]
  
  return requiredFields.every(field => form[field] && form[field].trim() !== '')
}

// Redirect if cart is empty
watchEffect(() => {
  if (cartStore.isEmpty) {
    router.push('/cart')
  }
})
</script>
