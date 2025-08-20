export const useWishlistStore = defineStore('wishlist', () => {
  // State
  const items = ref([])

  // Getters
  const itemCount = computed(() => items.value.length)

  const isEmpty = computed(() => items.value.length === 0)

  // Actions
  const addItem = (product) => {
    const exists = items.value.find(item => item.id === product.id)
    
    if (!exists) {
      items.value.push({
        id: product.id,
        name: product.name,
        price: product.price,
        image: product.image,
        category: product.category,
        addedAt: new Date().toISOString()
      })
      
      saveToStorage()
      
      // Show success notification
      const uiStore = useUiStore()
      uiStore.showSuccess(`${product.name} added to wishlist`)
    }
  }

  const removeItem = (productId) => {
    const index = items.value.findIndex(item => item.id === productId)
    if (index > -1) {
      const item = items.value[index]
      items.value.splice(index, 1)
      saveToStorage()
      
      // Show success notification
      const uiStore = useUiStore()
      uiStore.showSuccess(`${item.name} removed from wishlist`)
    }
  }

  const toggleItem = (product) => {
    if (isInWishlist(product.id)) {
      removeItem(product.id)
    } else {
      addItem(product)
    }
  }

  const clearWishlist = () => {
    items.value = []
    saveToStorage()
    
    // Show success notification
    const uiStore = useUiStore()
    uiStore.showSuccess('Wishlist cleared')
  }

  const isInWishlist = (productId) => {
    return items.value.some(item => item.id === productId)
  }

  const moveToCart = (productId) => {
    const item = items.value.find(item => item.id === productId)
    if (item) {
      const cartStore = useCartStore()
      cartStore.addItem(item)
      removeItem(productId)
    }
  }

  // Storage methods
  const saveToStorage = () => {
    if (process.client) {
      localStorage.setItem('wishlist', JSON.stringify(items.value))
    }
  }

  const loadFromStorage = () => {
    if (process.client) {
      const stored = localStorage.getItem('wishlist')
      if (stored) {
        try {
          items.value = JSON.parse(stored)
        } catch (error) {
          console.error('Error loading wishlist from storage:', error)
          items.value = []
        }
      }
    }
  }

  return {
    // State
    items,
    
    // Getters
    itemCount,
    isEmpty,
    
    // Actions
    addItem,
    removeItem,
    toggleItem,
    clearWishlist,
    isInWishlist,
    moveToCart,
    saveToStorage,
    loadFromStorage
  }
})
