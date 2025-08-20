<template>
  <div class="min-h-screen bg-gray-50">
    <!-- Admin Header -->
    <header class="bg-white shadow-sm border-b border-gray-200">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="flex justify-between items-center h-16">
          <div class="flex items-center">
            <NuxtLink to="/admin" class="flex items-center space-x-2">
              <div class="w-8 h-8 bg-primary-800 rounded-lg flex items-center justify-center">
                <span class="text-white font-bold text-sm">SH</span>
              </div>
              <span class="text-xl font-bold text-primary-800">Shop Hub Admin</span>
            </NuxtLink>
          </div>
          
          <div class="flex items-center space-x-4">
            <button @click="toggleMobileMenu" class="md:hidden p-2 rounded-lg hover:bg-gray-100">
              <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16"></path>
              </svg>
            </button>
            
            <NuxtLink to="/" class="btn btn-outline btn-sm">
              View Store
            </NuxtLink>
          </div>
        </div>
      </div>
    </header>

    <div class="flex">
      <!-- Sidebar -->
      <aside :class="[
        'fixed inset-y-0 left-0 z-50 w-64 bg-white shadow-lg transform transition-transform duration-300 ease-in-out md:relative md:translate-x-0',
        showMobileMenu ? 'translate-x-0' : '-translate-x-full'
      ]" style="top: 64px;">
        <nav class="mt-8 px-4">
          <div class="space-y-2">
            <NuxtLink 
              v-for="item in navigationItems" 
              :key="item.name"
              :to="item.href"
              :class="[
                'flex items-center px-3 py-2 text-sm font-medium rounded-lg transition-colors duration-200',
                $route.path === item.href ? 'bg-primary-100 text-primary-800' : 'text-gray-600 hover:text-gray-900 hover:bg-gray-50'
              ]"
            >
              <component :is="item.icon" class="w-5 h-5 mr-3" />
              {{ item.name }}
            </NuxtLink>
          </div>
        </nav>
      </aside>

      <!-- Overlay for mobile -->
      <div 
        v-if="showMobileMenu" 
        @click="closeMobileMenu"
        class="fixed inset-0 bg-black bg-opacity-50 z-40 md:hidden"
        style="top: 64px;"
      ></div>

      <!-- Main Content -->
      <main class="flex-1 p-6">
        <slot />
      </main>
    </div>
  </div>
</template>

<script setup>
import { 
  HomeIcon, 
  ShoppingBagIcon, 
  TagIcon, 
  ClipboardDocumentListIcon,
  ChartBarIcon,
  UsersIcon 
} from '@heroicons/vue/24/outline'

const showMobileMenu = ref(false)

const navigationItems = [
  { name: 'Dashboard', href: '/admin', icon: HomeIcon },
  { name: 'Products', href: '/admin/products', icon: ShoppingBagIcon },
  { name: 'Categories', href: '/admin/categories', icon: TagIcon },
  { name: 'Orders', href: '/admin/orders', icon: ClipboardDocumentListIcon },
  { name: 'Analytics', href: '/admin/analytics', icon: ChartBarIcon },
  { name: 'Customers', href: '/admin/customers', icon: UsersIcon },
]

const toggleMobileMenu = () => {
  showMobileMenu.value = !showMobileMenu.value
}

const closeMobileMenu = () => {
  showMobileMenu.value = false
}
</script>
