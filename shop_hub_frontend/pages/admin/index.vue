<template>
  <div>
    <div class="mb-8">
      <h1 class="text-3xl font-bold text-gray-900">Dashboard</h1>
      <p class="text-gray-600">Welcome to your Shop Hub admin dashboard</p>
    </div>

    <!-- Stats Cards -->
    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
      <div class="card">
        <div class="card-body">
          <div class="flex items-center justify-between">
            <div>
              <p class="text-sm font-medium text-gray-600">Total Sales</p>
              <p class="text-3xl font-bold text-gray-900">${{ stats.totalSales.toLocaleString() }}</p>
              <p class="text-sm text-green-600">+12.5% from last month</p>
            </div>
            <div class="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
              <CurrencyDollarIcon class="h-6 w-6 text-green-600" />
            </div>
          </div>
        </div>
      </div>

      <div class="card">
        <div class="card-body">
          <div class="flex items-center justify-between">
            <div>
              <p class="text-sm font-medium text-gray-600">Orders</p>
              <p class="text-3xl font-bold text-gray-900">{{ stats.totalOrders }}</p>
              <p class="text-sm text-blue-600">+8.2% from last month</p>
            </div>
            <div class="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
              <ShoppingBagIcon class="h-6 w-6 text-blue-600" />
            </div>
          </div>
        </div>
      </div>

      <div class="card">
        <div class="card-body">
          <div class="flex items-center justify-between">
            <div>
              <p class="text-sm font-medium text-gray-600">Products</p>
              <p class="text-3xl font-bold text-gray-900">{{ stats.totalProducts }}</p>
              <p class="text-sm text-purple-600">+5 new this week</p>
            </div>
            <div class="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center">
              <CubeIcon class="h-6 w-6 text-purple-600" />
            </div>
          </div>
        </div>
      </div>

      <div class="card">
        <div class="card-body">
          <div class="flex items-center justify-between">
            <div>
              <p class="text-sm font-medium text-gray-600">Customers</p>
              <p class="text-3xl font-bold text-gray-900">{{ stats.totalCustomers }}</p>
              <p class="text-sm text-indigo-600">+15.3% from last month</p>
            </div>
            <div class="w-12 h-12 bg-indigo-100 rounded-lg flex items-center justify-center">
              <UsersIcon class="h-6 w-6 text-indigo-600" />
            </div>
          </div>
        </div>
      </div>
    </div>

    <div class="grid grid-cols-1 lg:grid-cols-2 gap-8">
      <!-- Recent Orders -->
      <div class="card">
        <div class="card-header">
          <h3 class="text-lg font-semibold">Recent Orders</h3>
        </div>
        <div class="card-body">
          <div class="space-y-4">
            <div 
              v-for="order in recentOrders" 
              :key="order.id"
              class="flex items-center justify-between p-3 bg-gray-50 rounded-lg"
            >
              <div>
                <p class="font-medium text-gray-900">Order #{{ order.id }}</p>
                <p class="text-sm text-gray-600">{{ order.customer }}</p>
              </div>
              <div class="text-right">
                <p class="font-medium text-gray-900">${{ order.total }}</p>
                <span :class="[
                  'inline-flex px-2 py-1 text-xs font-medium rounded-full',
                  order.status === 'completed' ? 'bg-green-100 text-green-800' :
                  order.status === 'processing' ? 'bg-blue-100 text-blue-800' :
                  'bg-yellow-100 text-yellow-800'
                ]">
                  {{ order.status }}
                </span>
              </div>
            </div>
          </div>
          <div class="mt-4">
            <NuxtLink to="/admin/orders" class="text-primary-600 hover:text-primary-700 text-sm font-medium">
              View all orders →
            </NuxtLink>
          </div>
        </div>
      </div>

      <!-- Top Products -->
      <div class="card">
        <div class="card-header">
          <h3 class="text-lg font-semibold">Top Products</h3>
        </div>
        <div class="card-body">
          <div class="space-y-4">
            <div 
              v-for="product in topProducts" 
              :key="product.id"
              class="flex items-center space-x-3"
            >
              <img 
                :src="product.image" 
                :alt="product.name"
                class="w-12 h-12 object-cover rounded-lg"
              >
              <div class="flex-1">
                <p class="font-medium text-gray-900">{{ product.name }}</p>
                <p class="text-sm text-gray-600">{{ product.sales }} sold</p>
              </div>
              <div class="text-right">
                <p class="font-medium text-gray-900">${{ product.revenue }}</p>
              </div>
            </div>
          </div>
          <div class="mt-4">
            <NuxtLink to="/admin/products" class="text-primary-600 hover:text-primary-700 text-sm font-medium">
              View all products →
            </NuxtLink>
          </div>
        </div>
      </div>
    </div>

    <!-- Quick Actions -->
    <div class="mt-8">
      <h3 class="text-lg font-semibold text-gray-900 mb-4">Quick Actions</h3>
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <NuxtLink to="/admin/products" class="card card-hover">
          <div class="card-body text-center">
            <PlusIcon class="h-8 w-8 text-primary-600 mx-auto mb-2" />
            <p class="font-medium text-gray-900">Add Product</p>
          </div>
        </NuxtLink>

        <NuxtLink to="/admin/categories" class="card card-hover">
          <div class="card-body text-center">
            <TagIcon class="h-8 w-8 text-primary-600 mx-auto mb-2" />
            <p class="font-medium text-gray-900">Manage Categories</p>
          </div>
        </NuxtLink>

        <NuxtLink to="/admin/orders" class="card card-hover">
          <div class="card-body text-center">
            <ClipboardDocumentListIcon class="h-8 w-8 text-primary-600 mx-auto mb-2" />
            <p class="font-medium text-gray-900">View Orders</p>
          </div>
        </NuxtLink>

        <NuxtLink to="/admin/analytics" class="card card-hover">
          <div class="card-body text-center">
            <ChartBarIcon class="h-8 w-8 text-primary-600 mx-auto mb-2" />
            <p class="font-medium text-gray-900">Analytics</p>
          </div>
        </NuxtLink>
      </div>
    </div>
  </div>
</template>

<script setup>
import { 
  CurrencyDollarIcon, 
  ShoppingBagIcon, 
  CubeIcon, 
  UsersIcon,
  PlusIcon,
  TagIcon,
  ClipboardDocumentListIcon,
  ChartBarIcon
} from '@heroicons/vue/24/outline'

// Set admin layout
definePageMeta({
  layout: 'admin'
})

// SEO
useHead({
  title: 'Admin Dashboard - Shop Hub',
  meta: [
    { name: 'description', content: 'Shop Hub admin dashboard for managing your store.' }
  ]
})

// Mock data
const stats = ref({
  totalSales: 125430,
  totalOrders: 1235,
  totalProducts: 456,
  totalCustomers: 2890
})

const recentOrders = ref([
  { id: '12345', customer: 'John Doe', total: '89.99', status: 'completed' },
  { id: '12346', customer: 'Jane Smith', total: '156.50', status: 'processing' },
  { id: '12347', customer: 'Bob Johnson', total: '75.25', status: 'pending' },
  { id: '12348', customer: 'Alice Brown', total: '210.00', status: 'completed' },
  { id: '12349', customer: 'Charlie Wilson', total: '95.75', status: 'processing' }
])

const topProducts = ref([
  { id: 1, name: 'Wireless Headphones', sales: 245, revenue: '19,607', image: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=100' },
  { id: 2, name: 'Smart Watch', sales: 189, revenue: '37,611', image: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=100' },
  { id: 3, name: 'Cotton T-Shirt', sales: 156, revenue: '3,894', image: 'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=100' },
  { id: 4, name: 'Leather Backpack', sales: 134, revenue: '12,056', image: 'https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=100' }
])
</script>
