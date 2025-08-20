export const useProductsStore = defineStore('products', () => {
  // State
  const products = ref([])
  const categories = ref([])
  const featuredProducts = ref([])
  const isLoading = ref(false)
  const error = ref(null)

  // Mock data for development
  const mockProducts = [
    {
      id: 1,
      name: 'Wireless Bluetooth Headphones',
      price: 79.99,
      image: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=500',
      category: 'Electronics',
      description: 'High-quality wireless headphones with noise cancellation.',
      stock: 50,
      rating: 4.5,
      reviews: 124,
      featured: true
    },
    {
      id: 2,
      name: 'Organic Cotton T-Shirt',
      price: 24.99,
      image: 'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=500',
      category: 'Clothing',
      description: 'Comfortable and sustainable organic cotton t-shirt.',
      stock: 100,
      rating: 4.2,
      reviews: 89,
      featured: true
    },
    {
      id: 3,
      name: 'Smart Fitness Watch',
      price: 199.99,
      image: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=500',
      category: 'Electronics',
      description: 'Advanced fitness tracking with heart rate monitor.',
      stock: 25,
      rating: 4.7,
      reviews: 203,
      featured: false
    },
    {
      id: 4,
      name: 'Leather Backpack',
      price: 89.99,
      image: 'https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=500',
      category: 'Accessories',
      description: 'Durable leather backpack perfect for work or travel.',
      stock: 30,
      rating: 4.4,
      reviews: 76,
      featured: true
    },
    {
      id: 5,
      name: 'Coffee Maker',
      price: 149.99,
      image: 'https://images.unsplash.com/photo-1544787219-7f47ccb76574?w=500',
      category: 'Home & Kitchen',
      description: 'Programmable coffee maker with thermal carafe.',
      stock: 15,
      rating: 4.3,
      reviews: 156,
      featured: false
    },
    {
      id: 6,
      name: 'Running Shoes',
      price: 119.99,
      image: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=500',
      category: 'Sports',
      description: 'Lightweight running shoes with superior cushioning.',
      stock: 40,
      rating: 4.6,
      reviews: 234,
      featured: true
    }
  ]

  const mockCategories = [
    { id: 1, name: 'Electronics', slug: 'electronics', count: 45 },
    { id: 2, name: 'Clothing', slug: 'clothing', count: 123 },
    { id: 3, name: 'Accessories', slug: 'accessories', count: 67 },
    { id: 4, name: 'Home & Kitchen', slug: 'home-kitchen', count: 89 },
    { id: 5, name: 'Sports', slug: 'sports', count: 56 },
    { id: 6, name: 'Books', slug: 'books', count: 234 }
  ]

  // Getters
  const getProductById = computed(() => {
    return (id) => products.value.find(product => product.id === parseInt(id))
  })

  const getProductsByCategory = computed(() => {
    return (category) => products.value.filter(product => 
      product.category.toLowerCase() === category.toLowerCase()
    )
  })

  const searchResults = computed(() => {
    return (query) => {
      if (!query) return []
      
      const lowercaseQuery = query.toLowerCase()
      return products.value.filter(product =>
        product.name.toLowerCase().includes(lowercaseQuery) ||
        product.description.toLowerCase().includes(lowercaseQuery) ||
        product.category.toLowerCase().includes(lowercaseQuery)
      )
    }
  })

  // Actions
  const fetchProducts = async () => {
    isLoading.value = true
    error.value = null
    
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000))
      products.value = mockProducts
      featuredProducts.value = mockProducts.filter(p => p.featured)
    } catch (err) {
      error.value = 'Failed to fetch products'
      console.error('Error fetching products:', err)
    } finally {
      isLoading.value = false
    }
  }

  const fetchCategories = async () => {
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 500))
      categories.value = mockCategories
    } catch (err) {
      error.value = 'Failed to fetch categories'
      console.error('Error fetching categories:', err)
    }
  }

  const fetchProductById = async (id) => {
    isLoading.value = true
    error.value = null
    
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 500))
      return mockProducts.find(product => product.id === parseInt(id))
    } catch (err) {
      error.value = 'Failed to fetch product'
      console.error('Error fetching product:', err)
      return null
    } finally {
      isLoading.value = false
    }
  }

  const searchProducts = async (query, limit = 10) => {
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 300))
      
      const lowercaseQuery = query.toLowerCase()
      const results = mockProducts.filter(product =>
        product.name.toLowerCase().includes(lowercaseQuery) ||
        product.description.toLowerCase().includes(lowercaseQuery) ||
        product.category.toLowerCase().includes(lowercaseQuery)
      ).slice(0, limit)
      
      return results
    } catch (err) {
      console.error('Error searching products:', err)
      return []
    }
  }

  const filterProducts = (filters) => {
    let filtered = [...products.value]
    
    if (filters.category) {
      filtered = filtered.filter(product => 
        product.category.toLowerCase() === filters.category.toLowerCase()
      )
    }
    
    if (filters.minPrice !== undefined) {
      filtered = filtered.filter(product => product.price >= filters.minPrice)
    }
    
    if (filters.maxPrice !== undefined) {
      filtered = filtered.filter(product => product.price <= filters.maxPrice)
    }
    
    if (filters.inStock) {
      filtered = filtered.filter(product => product.stock > 0)
    }
    
    if (filters.sortBy) {
      switch (filters.sortBy) {
        case 'price_asc':
          filtered.sort((a, b) => a.price - b.price)
          break
        case 'price_desc':
          filtered.sort((a, b) => b.price - a.price)
          break
        case 'rating':
          filtered.sort((a, b) => b.rating - a.rating)
          break
        case 'name':
          filtered.sort((a, b) => a.name.localeCompare(b.name))
          break
        default:
          break
      }
    }
    
    return filtered
  }

  return {
    // State
    products,
    categories,
    featuredProducts,
    isLoading,
    error,
    
    // Getters
    getProductById,
    getProductsByCategory,
    searchResults,
    
    // Actions
    fetchProducts,
    fetchCategories,
    fetchProductById,
    searchProducts,
    filterProducts
  }
})
