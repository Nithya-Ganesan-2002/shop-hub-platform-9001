<template>
  <div v-if="uiStore.isMobileMenuOpen" class="fixed inset-0 z-50 md:hidden">
    <!-- Overlay -->
    <div @click="uiStore.closeMobileMenu" class="absolute inset-0 bg-black bg-opacity-50"></div>
    
    <!-- Menu -->
    <div class="absolute left-0 top-0 h-full w-64 bg-white shadow-xl transform transition-transform duration-300 ease-in-out">
      <div class="flex flex-col h-full">
        <!-- Header -->
        <div class="flex items-center justify-between p-4 border-b border-gray-200">
          <div class="flex items-center space-x-2">
            <div class="w-8 h-8 bg-primary-800 rounded-lg flex items-center justify-center">
              <span class="text-white font-bold text-sm">SH</span>
            </div>
            <span class="text-lg font-bold text-primary-800">Shop Hub</span>
          </div>
          <button @click="uiStore.closeMobileMenu" class="p-2 hover:bg-gray-100 rounded-lg">
            <XMarkIcon class="h-5 w-5" />
          </button>
        </div>

        <!-- Navigation -->
        <nav class="flex-1 p-4">
          <div class="space-y-2">
            <NuxtLink 
              v-for="item in navigationItems" 
              :key="item.name"
              :to="item.href"
              @click="uiStore.closeMobileMenu"
              :class="[
                'flex items-center px-3 py-2 text-sm font-medium rounded-lg transition-colors duration-200',
                $route.path === item.href ? 'bg-primary-100 text-primary-800' : 'text-gray-600 hover:text-gray-900 hover:bg-gray-50'
              ]"
            >
              <component :is="item.icon" class="w-5 h-5 mr-3" />
              {{ item.name }}
            </NuxtLink>
          </div>

          <div class="mt-8 pt-8 border-t border-gray-200">
            <h3 class="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-4">Account</h3>
            <div class="space-y-2">
              <NuxtLink to="/wishlist" @click="uiStore.closeMobileMenu" 
                        class="flex items-center px-3 py-2 text-sm font-medium rounded-lg text-gray-600 hover:text-gray-900 hover:bg-gray-50">
                <HeartIcon class="w-5 h-5 mr-3" />
                Wishlist
                <span v-if="wishlistStore.itemCount > 0" class="ml-auto bg-accent text-white text-xs rounded-full px-2 py-1">
                  {{ wishlistStore.itemCount }}
                </span>
              </NuxtLink>
              <button @click="openCart" 
                      class="w-full flex items-center px-3 py-2 text-sm font-medium rounded-lg text-gray-600 hover:text-gray-900 hover:bg-gray-50">
                <ShoppingBagIcon class="w-5 h-5 mr-3" />
                Cart
                <span v-if="cartStore.itemCount > 0" class="ml-auto bg-accent text-white text-xs rounded-full px-2 py-1">
                  {{ cartStore.itemCount }}
                </span>
              </button>
            </div>
          </div>
        </nav>
      </div>
    </div>
  </div>
</template>

<script setup>
import { 
  XMarkIcon, 
  HomeIcon, 
  ShoppingBagIcon, 
  TagIcon, 
  InformationCircleIcon,
  PhoneIcon,
  HeartIcon
} from '@heroicons/vue/24/outline'

const uiStore = useUiStore()
const cartStore = useCartStore()
const wishlistStore = useWishlistStore()

const navigationItems = [
  { name: 'Home', href: '/', icon: HomeIcon },
  { name: 'Products', href: '/products', icon: ShoppingBagIcon },
  { name: 'Categories', href: '/categories', icon: TagIcon },
  { name: 'About', href: '/about', icon: InformationCircleIcon },
  { name: 'Contact', href: '/contact', icon: PhoneIcon },
]

const openCart = () => {
  uiStore.closeMobileMenu()
  uiStore.openCartDrawer()
}
</script>
