<template>
  <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
    <div class="text-center mb-12">
      <h1 class="text-3xl font-bold text-gray-900 mb-4">Contact Us</h1>
      <p class="text-lg text-gray-600 max-w-2xl mx-auto">
        We'd love to hear from you. Send us a message and we'll respond as soon as possible.
      </p>
    </div>

    <div class="grid grid-cols-1 lg:grid-cols-2 gap-12">
      <!-- Contact Form -->
      <div class="card">
        <div class="card-header">
          <h2 class="text-xl font-semibold">Send us a message</h2>
        </div>
        <div class="card-body">
          <form @submit.prevent="submitForm" class="space-y-6">
            <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label class="form-label">First Name</label>
                <input 
                  v-model="form.firstName" 
                  type="text" 
                  class="form-input" 
                  required
                >
              </div>
              <div>
                <label class="form-label">Last Name</label>
                <input 
                  v-model="form.lastName" 
                  type="text" 
                  class="form-input" 
                  required
                >
              </div>
            </div>

            <div>
              <label class="form-label">Email</label>
              <input 
                v-model="form.email" 
                type="email" 
                class="form-input" 
                required
              >
            </div>

            <div>
              <label class="form-label">Subject</label>
              <select v-model="form.subject" class="form-input" required>
                <option value="">Select a subject</option>
                <option value="general">General Inquiry</option>
                <option value="order">Order Support</option>
                <option value="product">Product Question</option>
                <option value="technical">Technical Issue</option>
                <option value="feedback">Feedback</option>
              </select>
            </div>

            <div>
              <label class="form-label">Message</label>
              <textarea 
                v-model="form.message" 
                rows="5" 
                class="form-input" 
                placeholder="Tell us how we can help you..."
                required
              ></textarea>
            </div>

            <button 
              type="submit" 
              :disabled="isSubmitting"
              class="w-full btn btn-primary"
              :class="{ 'opacity-50 cursor-not-allowed': isSubmitting }"
            >
              <span v-if="isSubmitting">Sending...</span>
              <span v-else>Send Message</span>
            </button>
          </form>
        </div>
      </div>

      <!-- Contact Information -->
      <div class="space-y-8">
        <!-- Contact Details -->
        <div class="card">
          <div class="card-header">
            <h2 class="text-xl font-semibold">Get in touch</h2>
          </div>
          <div class="card-body space-y-6">
            <div class="flex items-start space-x-4">
              <PhoneIcon class="h-6 w-6 text-primary-600 mt-1" />
              <div>
                <h3 class="font-medium text-gray-900">Phone</h3>
                <p class="text-gray-600">+1 (555) 123-4567</p>
                <p class="text-sm text-gray-500">Mon-Fri 9am-6pm EST</p>
              </div>
            </div>

            <div class="flex items-start space-x-4">
              <EnvelopeIcon class="h-6 w-6 text-primary-600 mt-1" />
              <div>
                <h3 class="font-medium text-gray-900">Email</h3>
                <p class="text-gray-600">support@shophub.com</p>
                <p class="text-sm text-gray-500">We'll respond within 24 hours</p>
              </div>
            </div>

            <div class="flex items-start space-x-4">
              <MapPinIcon class="h-6 w-6 text-primary-600 mt-1" />
              <div>
                <h3 class="font-medium text-gray-900">Address</h3>
                <p class="text-gray-600">
                  123 Commerce Street<br>
                  Business District<br>
                  New York, NY 10001
                </p>
              </div>
            </div>

            <div class="flex items-start space-x-4">
              <ClockIcon class="h-6 w-6 text-primary-600 mt-1" />
              <div>
                <h3 class="font-medium text-gray-900">Business Hours</h3>
                <div class="text-gray-600 text-sm space-y-1">
                  <p>Monday - Friday: 9:00 AM - 6:00 PM</p>
                  <p>Saturday: 10:00 AM - 4:00 PM</p>
                  <p>Sunday: Closed</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- FAQ Section -->
        <div class="card">
          <div class="card-header">
            <h2 class="text-xl font-semibold">Frequently Asked Questions</h2>
          </div>
          <div class="card-body space-y-4">
            <div>
              <h3 class="font-medium text-gray-900 mb-2">How can I track my order?</h3>
              <p class="text-sm text-gray-600">
                You'll receive a tracking number via email once your order ships. 
                You can also check your order status in your account.
              </p>
            </div>

            <div>
              <h3 class="font-medium text-gray-900 mb-2">What's your return policy?</h3>
              <p class="text-sm text-gray-600">
                We offer a 30-day return policy for most items. 
                Items must be in original condition with tags attached.
              </p>
            </div>

            <div>
              <h3 class="font-medium text-gray-900 mb-2">Do you offer international shipping?</h3>
              <p class="text-sm text-gray-600">
                Currently, we only ship within the United States. 
                International shipping options are coming soon!
              </p>
            </div>

            <div class="pt-4">
              <NuxtLink to="/help" class="text-primary-600 hover:text-primary-700 text-sm font-medium">
                View all FAQs →
              </NuxtLink>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { 
  PhoneIcon, 
  EnvelopeIcon, 
  MapPinIcon, 
  ClockIcon 
} from '@heroicons/vue/24/outline'

// SEO
useHead({
  title: 'Contact Us - Shop Hub',
  meta: [
    { name: 'description', content: 'Get in touch with Shop Hub. We\'re here to help with any questions or concerns.' }
  ]
})

const uiStore = useUiStore()

const isSubmitting = ref(false)

const form = reactive({
  firstName: '',
  lastName: '',
  email: '',
  subject: '',
  message: ''
})

const submitForm = async () => {
  isSubmitting.value = true

  try {
    // Simulate form submission
    await new Promise(resolve => setTimeout(resolve, 1500))
    
    uiStore.showSuccess('Message sent successfully! We\'ll get back to you soon.')
    
    // Reset form
    Object.assign(form, {
      firstName: '',
      lastName: '',
      email: '',
      subject: '',
      message: ''
    })
  } catch (error) {
    uiStore.showError('Failed to send message. Please try again.')
  } finally {
    isSubmitting.value = false
  }
}
</script>
