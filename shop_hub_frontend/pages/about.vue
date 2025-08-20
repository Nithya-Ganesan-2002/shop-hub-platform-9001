<template>
  <div>
    <!-- Hero Section -->
    <section class="bg-gray-50 py-16">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <h1 class="text-4xl font-bold text-gray-900 mb-6">About Shop Hub</h1>
        <p class="text-xl text-gray-600 max-w-3xl mx-auto">
          We're passionate about bringing you the best products at unbeatable prices. 
          Since our founding, we've been committed to exceptional customer service and quality.
        </p>
      </div>
    </section>

    <!-- Our Story -->
    <section class="py-16">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div>
            <h2 class="text-3xl font-bold text-gray-900 mb-6">Our Story</h2>
            <div class="space-y-4 text-gray-600">
              <p>
                Founded in 2020, Shop Hub began as a small online retailer with a big vision: 
                to make quality products accessible to everyone. What started as a passion project 
                has grown into a trusted destination for thousands of customers worldwide.
              </p>
              <p>
                We believe that shopping should be enjoyable, convenient, and worry-free. 
                That's why we've built our platform with the customer at the center of everything we do.
              </p>
              <p>
                Today, we're proud to offer an extensive catalog of products across multiple categories, 
                all backed by our commitment to quality and customer satisfaction.
              </p>
            </div>
          </div>
          <div>
            <img 
              src="https://images.unsplash.com/photo-1560472354-b33ff0c44a43?w=600" 
              alt="Our team"
              class="rounded-lg shadow-lg"
            >
          </div>
        </div>
      </div>
    </section>

    <!-- Our Values -->
    <section class="py-16 bg-gray-50">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="text-center mb-12">
          <h2 class="text-3xl font-bold text-gray-900 mb-4">Our Values</h2>
          <p class="text-lg text-gray-600 max-w-2xl mx-auto">
            These core values guide everything we do and help us serve you better
          </p>
        </div>

        <div class="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div class="text-center">
            <div class="w-16 h-16 bg-primary-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <HeartIcon class="h-8 w-8 text-primary-600" />
            </div>
            <h3 class="text-xl font-semibold mb-2">Customer First</h3>
            <p class="text-gray-600">
              Every decision we make is guided by what's best for our customers. 
              Your satisfaction is our success.
            </p>
          </div>

          <div class="text-center">
            <div class="w-16 h-16 bg-primary-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <ShieldCheckIcon class="h-8 w-8 text-primary-600" />
            </div>
            <h3 class="text-xl font-semibold mb-2">Quality Assurance</h3>
            <p class="text-gray-600">
              We carefully curate our product selection to ensure you receive 
              only the highest quality items.
            </p>
          </div>

          <div class="text-center">
            <div class="w-16 h-16 bg-primary-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <LightBulbIcon class="h-8 w-8 text-primary-600" />
            </div>
            <h3 class="text-xl font-semibold mb-2">Innovation</h3>
            <p class="text-gray-600">
              We're constantly improving our platform and services to provide 
              you with the best shopping experience.
            </p>
          </div>
        </div>
      </div>
    </section>

    <!-- Team Section -->
    <section class="py-16">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="text-center mb-12">
          <h2 class="text-3xl font-bold text-gray-900 mb-4">Meet Our Team</h2>
          <p class="text-lg text-gray-600 max-w-2xl mx-auto">
            The passionate people behind Shop Hub who work tirelessly to serve you
          </p>
        </div>

        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          <div v-for="member in teamMembers" :key="member.name" class="text-center">
            <img 
              :src="member.image" 
              :alt="member.name"
              class="w-32 h-32 rounded-full mx-auto mb-4 object-cover"
            >
            <h3 class="text-lg font-semibold text-gray-900">{{ member.name }}</h3>
            <p class="text-primary-600 mb-2">{{ member.role }}</p>
            <p class="text-sm text-gray-600">{{ member.bio }}</p>
          </div>
        </div>
      </div>
    </section>

    <!-- Stats Section -->
    <section class="py-16 bg-primary-800 text-white">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="text-center mb-12">
          <h2 class="text-3xl font-bold mb-4">Shop Hub by the Numbers</h2>
          <p class="text-xl text-primary-100">
            Here's what we've accomplished together
          </p>
        </div>

        <div class="grid grid-cols-1 md:grid-cols-4 gap-8 text-center">
          <div>
            <div class="text-4xl font-bold mb-2">50K+</div>
            <div class="text-primary-200">Happy Customers</div>
          </div>
          <div>
            <div class="text-4xl font-bold mb-2">10K+</div>
            <div class="text-primary-200">Products</div>
          </div>
          <div>
            <div class="text-4xl font-bold mb-2">100+</div>
            <div class="text-primary-200">Brands</div>
          </div>
          <div>
            <div class="text-4xl font-bold mb-2">99%</div>
            <div class="text-primary-200">Satisfaction Rate</div>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<script setup>
import { HeartIcon, ShieldCheckIcon, LightBulbIcon } from '@heroicons/vue/24/outline'

// SEO
useHead({
  title: 'About Us - Shop Hub',
  meta: [
    { name: 'description', content: 'Learn about Shop Hub\'s story, values, and the team behind your favorite shopping destination.' }
  ]
})

const teamMembers = [
  {
    name: 'Sarah Johnson',
    role: 'CEO & Founder',
    bio: 'Passionate about creating exceptional customer experiences.',
    image: 'https://images.unsplash.com/photo-1494790108755-2616b612b786?w=300'
  },
  {
    name: 'Mike Chen',
    role: 'CTO',
    bio: 'Technology enthusiast focused on platform innovation.',
    image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=300'
  },
  {
    name: 'Emily Rodriguez',
    role: 'Head of Customer Success',
    bio: 'Dedicated to ensuring every customer has a great experience.',
    image: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=300'
  },
  {
    name: 'David Kim',
    role: 'Product Manager',
    bio: 'Focused on curating the best products for our customers.',
    image: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=300'
  }
]
</script>
