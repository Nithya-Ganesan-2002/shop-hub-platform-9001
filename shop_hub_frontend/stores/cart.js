export const useCartStore = defineStore('cart', () => {
  // State
  const items = ref([])

  // Getters
  const itemCount = computed(() => {
    return items.value.reduce((total, item) => total + item.quantity, 0)
  })

  const total = computed(() => {
    return items.value.reduce((total, item) => total + (item.price * item.quantity), 0)
  })

  const isEmpty = computed(() => items.value.length === 0)

  // Actions
  const addItem = (product, quantity = 1) => {
    const existingItem = items.value.find(item => item.id === product.id)
    
    if (existingItem) {
      existingItem.quantity += quantity
    } else {
      items.value.push({
        id: product.id,
        name: product.name,
        price: product.price,
        image: product.image,
        quantity
      })
    }
    
    saveToStorage()
    
    // Show success notification
    const uiStore = useUiStore()
    uiStore.showSuccess(`${product.name} added to cart`)
  }

  const removeItem = (productId) => {
    const index = items.value.findIndex(item => item.id === productId)
    if (index > -1) {
      const item = items.value[index]
      items.value.splice(index, 1)
      saveToStorage()
      
      // Show success notification
      const uiStore = useUiStore()
      uiStore.showSuccess(`${item.name} removed from cart`)
    }
  }

  const updateQuantity = (productId, quantity) => {
    if (quantity <= 0) {
      removeItem(productId)
      return
    }

    const item = items.value.find(item => item.id === productId)
    if (item) {
      item.quantity = quantity
      saveToStorage()
    }
  }

  const clearCart = () => {
    items.value = []
    saveToStorage()
    
    // Show success notification
    const uiStore = useUiStore()
    uiStore.showSuccess('Cart cleared')
  }

  const isInCart = (productId) => {
    return items.value.some(item => item.id === productId)
  }

  const getItemQuantity = (productId) => {
    const item = items.value.find(item => item.id === productId)
    return item ? item.quantity : 0
  }

  // Storage methods
  const saveToStorage = () => {
    if (process.client) {
      localStorage.setItem('cart', JSON.stringify(items.value))
    }
  }

  const loadFromStorage = () => {
    if (process.client) {
      const stored = localStorage.getItem('cart')
      if (stored) {
        try {
          items.value = JSON.parse(stored)
        } catch (error) {
          console.error('Error loading cart from storage:', error)
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
    total,
    isEmpty,
    
    // Actions
    addItem,
    removeItem,
    updateQuantity,
    clearCart,
    isInCart,
    getItemQuantity,
    saveToStorage,
    loadFromStorage
  }
})
