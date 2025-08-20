<template>
  <div>
    <div class="flex justify-between items-center mb-8">
      <div>
        <h1 class="text-3xl font-bold text-gray-900">Products</h1>
        <p class="text-gray-600">Manage your product catalog</p>
      </div>
      <button @click="showAddModal = true" class="btn btn-primary">
        <PlusIcon class="h-5 w-5 mr-2" />
        Add Product
      </button>
    </div>

    <!-- Filters and Search -->
    <div class="card mb-6">
      <div class="card-body">
        <div class="grid grid-cols-1 md:grid-cols-4 gap-4">
          <div>
            <input 
              v-model="searchQuery" 
              type="text" 
              placeholder="Search products..." 
              class="form-input"
            >
          </div>
          <div>
            <select v-model="selectedCategory" class="form-input">
              <option value="">All Categories</option>
              <option v-for="category in categories" :key="category" :value="category">
                {{ category }}
              </option>
            </select>
          </div>
          <div>
            <select v-model="selectedStatus" class="form-input">
              <option value="">All Status</option>
              <option value="active">Active</option>
              <option value="inactive">Inactive</option>
              <option value="out-of-stock">Out of Stock</option>
            </select>
          </div>
          <div>
            <button @click="clearFilters" class="btn btn-outline w-full">Clear Filters</button>
          </div>
        </div>
      </div>
    </div>

    <!-- Products Table -->
    <div class="card">
      <div class="card-body p-0">
        <div class="overflow-x-auto">
          <table class="table">
            <thead class="table-header">
              <tr>
                <th class="table-header-cell">Product</th>
                <th class="table-header-cell">Category</th>
                <th class="table-header-cell">Price</th>
                <th class="table-header-cell">Stock</th>
                <th class="table-header-cell">Status</th>
                <th class="table-header-cell">Actions</th>
              </tr>
            </thead>
            <tbody class="bg-white divide-y divide-gray-200">
              <tr v-for="product in filteredProducts" :key="product.id" class="table-row-hover">
                <td class="table-cell">
                  <div class="flex items-center space-x-3">
                    <img :src="product.image" :alt="product.name" class="w-12 h-12 object-cover rounded-lg">
                    <div>
                      <p class="font-medium text-gray-900">{{ product.name }}</p>
                      <p class="text-sm text-gray-600">{{ product.description.substring(0, 50) }}...</p>
                    </div>
                  </div>
                </td>
                <td class="table-cell">
                  <span class="badge badge-primary">{{ product.category }}</span>
                </td>
                <td class="table-cell font-medium">${{ product.price }}</td>
                <td class="table-cell">
                  <span :class="[
                    'font-medium',
                    product.stock > 10 ? 'text-green-600' : 
                    product.stock > 0 ? 'text-yellow-600' : 'text-red-600'
                  ]">
                    {{ product.stock }}
                  </span>
                </td>
                <td class="table-cell">
                  <span :class="[
                    'badge',
                    getStatusClass(product)
                  ]">
                    {{ getStatusText(product) }}
                  </span>
                </td>
                <td class="table-cell">
                  <div class="flex items-center space-x-2">
                    <button @click="editProduct(product)" class="btn btn-outline btn-sm">
                      <PencilIcon class="h-4 w-4" />
                    </button>
                    <button @click="deleteProduct(product.id)" class="btn btn-outline btn-sm text-red-600 hover:bg-red-50">
                      <TrashIcon class="h-4 w-4" />
                    </button>
                  </div>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>

    <!-- Add/Edit Product Modal -->
    <div v-if="showAddModal || editingProduct" class="modal-overlay">
      <div class="modal-container">
        <div class="modal-content">
          <div class="card-header">
            <h3 class="text-lg font-semibold">
              {{ editingProduct ? 'Edit Product' : 'Add New Product' }}
            </h3>
            <button @click="closeModal" class="p-2 hover:bg-gray-100 rounded-lg">
              <XMarkIcon class="h-5 w-5" />
            </button>
          </div>
          
          <div class="card-body space-y-4">
            <div>
              <label class="form-label">Product Name</label>
              <input v-model="productForm.name" type="text" class="form-input" required>
            </div>
            
            <div>
              <label class="form-label">Description</label>
              <textarea v-model="productForm.description" rows="3" class="form-input"></textarea>
            </div>
            
            <div class="grid grid-cols-2 gap-4">
              <div>
                <label class="form-label">Price</label>
                <input v-model.number="productForm.price" type="number" step="0.01" class="form-input" required>
              </div>
              <div>
                <label class="form-label">Stock</label>
                <input v-model.number="productForm.stock" type="number" class="form-input" required>
              </div>
            </div>
            
            <div>
              <label class="form-label">Category</label>
              <select v-model="productForm.category" class="form-input" required>
                <option value="">Select Category</option>
                <option v-for="category in categories" :key="category" :value="category">
                  {{ category }}
                </option>
              </select>
            </div>
            
            <div>
              <label class="form-label">Image URL</label>
              <input v-model="productForm.image" type="url" class="form-input" required>
            </div>
          </div>
          
          <div class="card-footer">
            <div class="flex justify-end space-x-3">
              <button @click="closeModal" class="btn btn-outline">Cancel</button>
              <button @click="saveProduct" class="btn btn-primary">
                {{ editingProduct ? 'Update' : 'Create' }} Product
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { 
  PlusIcon, 
  PencilIcon, 
  TrashIcon, 
  XMarkIcon 
} from '@heroicons/vue/24/outline'

// Set admin layout
definePageMeta({
  layout: 'admin'
})

// SEO
useHead({
  title: 'Products - Admin - Shop Hub',
  meta: [
    { name: 'description', content: 'Manage your product catalog.' }
  ]
})

const productsStore = useProductsStore()
const uiStore = useUiStore()

// State
const searchQuery = ref('')
const selectedCategory = ref('')
const selectedStatus = ref('')
const showAddModal = ref(false)
const editingProduct = ref(null)

const productForm = reactive({
  name: '',
  description: '',
  price: 0,
  stock: 0,
  category: '',
  image: ''
})

// Computed
const categories = computed(() => {
  const cats = [...new Set(productsStore.products.map(p => p.category))]
  return cats.sort()
})

const filteredProducts = computed(() => {
  let products = [...productsStore.products]
  
  if (searchQuery.value) {
    const query = searchQuery.value.toLowerCase()
    products = products.filter(p => 
      p.name.toLowerCase().includes(query) || 
      p.description.toLowerCase().includes(query)
    )
  }
  
  if (selectedCategory.value) {
    products = products.filter(p => p.category === selectedCategory.value)
  }
  
  if (selectedStatus.value) {
    products = products.filter(p => {
      const status = getStatusText(p).toLowerCase()
      return status === selectedStatus.value.replace('-', ' ')
    })
  }
  
  return products
})

// Methods
const getStatusClass = (product) => {
  if (product.stock === 0) return 'badge-error'
  if (product.stock <= 10) return 'badge-warning'
  return 'badge-success'
}

const getStatusText = (product) => {
  if (product.stock === 0) return 'Out of Stock'
  if (product.stock <= 10) return 'Low Stock'
  return 'Active'
}

const clearFilters = () => {
  searchQuery.value = ''
  selectedCategory.value = ''
  selectedStatus.value = ''
}

const editProduct = (product) => {
  editingProduct.value = product
  Object.assign(productForm, product)
  showAddModal.value = false
}

const deleteProduct = (productId) => {
  if (confirm('Are you sure you want to delete this product?')) {
    // Simulate deletion
    uiStore.showSuccess('Product deleted successfully')
  }
}

const closeModal = () => {
  showAddModal.value = false
  editingProduct.value = null
  Object.assign(productForm, {
    name: '',
    description: '',
    price: 0,
    stock: 0,
    category: '',
    image: ''
  })
}

const saveProduct = () => {
  if (editingProduct.value) {
    // Update existing product
    uiStore.showSuccess('Product updated successfully')
  } else {
    // Create new product
    uiStore.showSuccess('Product created successfully')
  }
  closeModal()
}

// Load products on mount
onMounted(() => {
  if (productsStore.products.length === 0) {
    productsStore.fetchProducts()
  }
})
</script>
