export const useUiStore = defineStore('ui', () => {
  // State
  const isMobileMenuOpen = ref(false)
  const isCartDrawerOpen = ref(false)
  const isLoading = ref(false)
  const notifications = ref([])

  // Actions
  const toggleMobileMenu = () => {
    isMobileMenuOpen.value = !isMobileMenuOpen.value
  }

  const openMobileMenu = () => {
    isMobileMenuOpen.value = true
  }

  const closeMobileMenu = () => {
    isMobileMenuOpen.value = false
  }

  const toggleCartDrawer = () => {
    isCartDrawerOpen.value = !isCartDrawerOpen.value
  }

  const openCartDrawer = () => {
    isCartDrawerOpen.value = true
  }

  const closeCartDrawer = () => {
    isCartDrawerOpen.value = false
  }

  const setLoading = (loading) => {
    isLoading.value = loading
  }

  const addNotification = (notification) => {
    const id = Date.now()
    notifications.value.push({
      id,
      type: notification.type || 'info',
      title: notification.title,
      message: notification.message,
      duration: notification.duration || 5000
    })

    // Auto remove notification
    setTimeout(() => {
      removeNotification(id)
    }, notification.duration || 5000)

    return id
  }

  const removeNotification = (id) => {
    const index = notifications.value.findIndex(n => n.id === id)
    if (index > -1) {
      notifications.value.splice(index, 1)
    }
  }

  const showSuccess = (message, title = 'Success') => {
    addNotification({
      type: 'success',
      title,
      message
    })
  }

  const showError = (message, title = 'Error') => {
    addNotification({
      type: 'error',
      title,
      message
    })
  }

  const showWarning = (message, title = 'Warning') => {
    addNotification({
      type: 'warning',
      title,
      message
    })
  }

  const showInfo = (message, title = 'Info') => {
    addNotification({
      type: 'info',
      title,
      message
    })
  }

  return {
    // State
    isMobileMenuOpen,
    isCartDrawerOpen,
    isLoading,
    notifications,
    
    // Actions
    toggleMobileMenu,
    openMobileMenu,
    closeMobileMenu,
    toggleCartDrawer,
    openCartDrawer,
    closeCartDrawer,
    setLoading,
    addNotification,
    removeNotification,
    showSuccess,
    showError,
    showWarning,
    showInfo
  }
})
