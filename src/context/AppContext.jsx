import { createContext, useContext, useState, useEffect } from 'react'
import { INITIAL_PRODUCTS } from '../data/initialCatalog'

const AppContext = createContext(null)

const STORAGE_KEYS = {
  CATALOG: 'okey_catalog_v1',
  CART: 'okey_cart_v1',
  VIEW_MODE: 'okey_view_mode_v1',
}

export function AppProvider({ children }) {
  // 1. Estado del Catálogo de Productos y Paquetes
  const [products, setProducts] = useState(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEYS.CATALOG)
      if (saved) {
        const parsed = JSON.parse(saved)
        if (Array.isArray(parsed) && parsed.length > 0) return parsed
      }
    } catch (e) {
      console.error('Error al leer catálogo desde localStorage', e)
    }
    return INITIAL_PRODUCTS
  })

  // Sincronizar catálogo con localStorage
  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEYS.CATALOG, JSON.stringify(products))
    } catch (e) {
      console.error('Error al guardar catálogo en localStorage', e)
    }
  }, [products])

  // 2. Estado del Carrito / Cotizador
  const [cart, setCart] = useState(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEYS.CART)
      if (saved) return JSON.parse(saved)
    } catch (e) {
      console.error('Error al leer carrito', e)
    }
    return []
  })

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEYS.CART, JSON.stringify(cart))
    } catch (e) {
      console.error('Error al guardar carrito', e)
    }
  }, [cart])

  // 3. Modo de visualización: 'admin' (muestra márgenes y costos) vs 'counter' (modo mostrador para clientes)
  const [viewMode, setViewMode] = useState(() => {
    try {
      return localStorage.getItem(STORAGE_KEYS.VIEW_MODE) || 'admin'
    } catch {
      return 'admin'
    }
  })

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEYS.VIEW_MODE, viewMode)
    } catch (e) {
      console.error('Error al guardar viewMode', e)
    }
  }, [viewMode])

  // 4. Pestaña de navegación activa
  const [activeTab, setActiveTab] = useState('catalog')

  // 5. Notificación / Toast feedback
  const [toast, setToast] = useState(null)

  const showToast = (message, type = 'success') => {
    setToast({ message, type, id: Date.now() })
    setTimeout(() => {
      setToast((curr) => (curr && curr.message === message ? null : curr))
    }, 3200)
  }

  // Operaciones de Catálogo
  const addProduct = (newProductData) => {
    const id = `prod-${Date.now()}`
    const product = {
      ...newProductData,
      id,
      cost: Number(newProductData.cost) || 0,
      price: Number(newProductData.price) || 0,
      stock: Number(newProductData.stock) || 0,
    }
    setProducts((prev) => [product, ...prev])
    showToast(`"${product.name}" agregado al catálogo`)
    return product
  }

  const updateProduct = (id, updatedData) => {
    setProducts((prev) =>
      prev.map((p) =>
        p.id === id
          ? {
              ...p,
              ...updatedData,
              cost: Number(updatedData.cost ?? p.cost),
              price: Number(updatedData.price ?? p.price),
              stock: Number(updatedData.stock ?? p.stock),
            }
          : p
      )
    )
    showToast('Producto actualizado correctamente')
  }

  const deleteProduct = (id) => {
    const prod = products.find((p) => p.id === id)
    setProducts((prev) => prev.filter((p) => p.id !== id))
    // Remover también del carrito si existe
    setCart((prev) => prev.filter((item) => item.product.id !== id))
    showToast(`"${prod?.name || 'Artículo'}" eliminado del catálogo`, 'info')
  }

  const resetCatalog = () => {
    setProducts(INITIAL_PRODUCTS)
    showToast('Catálogo restablecido a valores iniciales', 'info')
  }

  // Operaciones de Carrito
  const addToCart = (product, quantity = 1) => {
    setCart((prev) => {
      const existingIndex = prev.findIndex((item) => item.product.id === product.id)
      if (existingIndex > -1) {
        const next = [...prev]
        next[existingIndex] = {
          ...next[existingIndex],
          quantity: next[existingIndex].quantity + quantity,
        }
        return next
      }
      return [...prev, { product, quantity, unitPrice: product.price }]
    })
    showToast(`+${quantity} "${product.name}" al cotizador`)
  }

  const updateCartQuantity = (productId, newQuantity) => {
    if (newQuantity <= 0) {
      removeFromCart(productId)
      return
    }
    setCart((prev) =>
      prev.map((item) =>
        item.product.id === productId ? { ...item, quantity: newQuantity } : item
      )
    )
  }

  const removeFromCart = (productId) => {
    setCart((prev) => prev.filter((item) => item.product.id !== productId))
    showToast('Artículo retirado del cotizador', 'info')
  }

  const clearCart = () => {
    setCart([])
  }

  // Cálculos financieros del Carrito
  const cartSubtotal = cart.reduce((acc, item) => acc + item.quantity * item.product.price, 0)
  const cartTotalItems = cart.reduce((acc, item) => acc + item.quantity, 0)
  const FREE_SHIPPING_THRESHOLD = 1500
  const hasFreeShipping = cartSubtotal >= FREE_SHIPPING_THRESHOLD
  const amountForFreeShipping = Math.max(0, FREE_SHIPPING_THRESHOLD - cartSubtotal)
  const freeShippingProgress = Math.min(100, (cartSubtotal / FREE_SHIPPING_THRESHOLD) * 100)

  return (
    <AppContext.Provider
      value={{
        // Catálogo
        products,
        addProduct,
        updateProduct,
        deleteProduct,
        resetCatalog,
        // Carrito
        cart,
        addToCart,
        updateCartQuantity,
        removeFromCart,
        clearCart,
        cartSubtotal,
        cartTotalItems,
        FREE_SHIPPING_THRESHOLD,
        hasFreeShipping,
        amountForFreeShipping,
        freeShippingProgress,
        // Preferencias & Navegación
        viewMode,
        setViewMode,
        toggleViewMode: () => setViewMode((m) => (m === 'admin' ? 'counter' : 'admin')),
        activeTab,
        setActiveTab,
        // Toast
        toast,
        showToast,
      }}
    >
      {children}
    </AppContext.Provider>
  )
}

export function useApp() {
  const context = useContext(AppContext)
  if (!context) {
    throw new Error('useApp debe usarse dentro de un AppProvider')
  }
  return context
}
