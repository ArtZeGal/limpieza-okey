import { createContext, useContext, useState, useEffect } from 'react'
import { INITIAL_PRODUCTS } from '../data/initialCatalog'
import { INITIAL_CUSTOMERS } from '../data/initialCustomers'

const AppContext = createContext(null)

const STORAGE_KEYS = {
  CATALOG: 'okey_catalog_v7',
  CART: 'okey_cart_v1',
  CUSTOMERS: 'okey_customers_v2',
  SELECTED_CUSTOMER: 'okey_selected_cust_v1',
  VIEW_MODE: 'okey_view_mode_v1',
  QUOTE_PARAMS: 'okey_quote_params_v1',
  RECEIPTS: 'okey_receipts_v1',
  FOLIO_SEQ: 'okey_folio_seq_v1',
}

export function AppProvider({ children }) {
  // 1. Catálogo de Productos y Paquetes
  const [products, setProducts] = useState(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEYS.CATALOG)
      if (saved) {
        const parsed = JSON.parse(saved)
        if (Array.isArray(parsed) && parsed.length > 0) return parsed
      }
    } catch (e) {
      console.error('Error al leer catálogo', e)
    }
    return INITIAL_PRODUCTS
  })

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEYS.CATALOG, JSON.stringify(products))
    } catch (e) {
      console.error('Error al guardar catálogo', e)
    }
  }, [products])

  // 2. Directorio de Clientes
  const [customers, setCustomers] = useState(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEYS.CUSTOMERS)
      if (saved) {
        const parsed = JSON.parse(saved)
        if (Array.isArray(parsed) && parsed.length > 0) return parsed
      }
    } catch (e) {
      console.error('Error al leer clientes', e)
    }
    return INITIAL_CUSTOMERS
  })

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEYS.CUSTOMERS, JSON.stringify(customers))
    } catch (e) {
      console.error('Error al guardar clientes', e)
    }
  }, [customers])

  // Cliente actualmente seleccionado
  const [selectedCustomer, setSelectedCustomer] = useState(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEYS.SELECTED_CUSTOMER)
      if (saved) return JSON.parse(saved)
    } catch (e) {
      console.error('Error al leer cliente seleccionado', e)
    }
    return null
  })

  useEffect(() => {
    try {
      if (selectedCustomer) {
        localStorage.setItem(STORAGE_KEYS.SELECTED_CUSTOMER, JSON.stringify(selectedCustomer))
      } else {
        localStorage.removeItem(STORAGE_KEYS.SELECTED_CUSTOMER)
      }
    } catch (e) {
      console.error('Error al guardar cliente seleccionado', e)
    }
  }, [selectedCustomer])

  // 3. Carrito de Compras
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

  // 4. Parámetros de Cotización
  const [quoteParams, setQuoteParams] = useState(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEYS.QUOTE_PARAMS)
      if (saved) return JSON.parse(saved)
    } catch (e) {
      console.error('Error al leer parámetros de cotización', e)
    }
    return {
      downPayment: '',
      shippingType: 'delivery',
      deliveryFee: 120,
      discount: '',
      notes: '',
    }
  })

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEYS.QUOTE_PARAMS, JSON.stringify(quoteParams))
    } catch (e) {
      console.error('Error al guardar parámetros de cotización', e)
    }
  }, [quoteParams])

  // 5. Historial de Recibos y Consecutivo de Folio
  const [receipts, setReceipts] = useState(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEYS.RECEIPTS)
      if (saved) return JSON.parse(saved)
    } catch (e) {
      console.error('Error al leer recibos', e)
    }
    return []
  })

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEYS.RECEIPTS, JSON.stringify(receipts))
    } catch (e) {
      console.error('Error al guardar recibos', e)
    }
  }, [receipts])

  const [folioSequence, setFolioSequence] = useState(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEYS.FOLIO_SEQ)
      if (saved) return Number(saved) || 1
    } catch {
      return 1
    }
    return 1
  })

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEYS.FOLIO_SEQ, folioSequence.toString())
    } catch (e) {
      console.error('Error al guardar secuencia de folio', e)
    }
  }, [folioSequence])

  // Generador de folio consecutivo (OK-001, OK-002...)
  const nextFolio = `OK-${String(folioSequence).padStart(3, '0')}`

  // Guardar un nuevo recibo oficial
  const saveReceipt = (receiptData) => {
    const id = `rec-${Date.now()}`
    const newReceipt = {
      ...receiptData,
      id,
      createdAt: new Date().toISOString(),
    }

    setReceipts((prev) => [newReceipt, ...prev])

    // Si el usuario editó el folio manualmente (ej. OK-045), continuar el consecutivo a partir de ahí
    const folioMatch = receiptData.folio ? receiptData.folio.match(/\d+/) : null
    if (folioMatch) {
      setFolioSequence(Number(folioMatch[0]) + 1)
    } else {
      setFolioSequence((prev) => prev + 1)
    }

    // Descontar automáticamente del inventario físico al realizar la venta
    if (Array.isArray(receiptData.items) && receiptData.items.length > 0) {
      setProducts((prev) => {
        return prev.map((product) => {
          const soldItem = receiptData.items.find(
            (it) =>
              (it.productId && it.productId === product.id) ||
              (it.sku && product.sku && it.sku === product.sku) ||
              (it.name && product.name && it.name.trim().toLowerCase() === product.name.trim().toLowerCase())
          )
          if (soldItem) {
            const qtySold = Number(soldItem.quantity) || 1
            const newStock = Math.max(0, (product.stock || 0) - qtySold)
            return { ...product, stock: newStock }
          }
          return product
        })
      })
    }

    // Incrementar conteo de pedidos del cliente si existe
    if (receiptData.customerId) {
      setCustomers((prev) =>
        prev.map((c) =>
          c.id === receiptData.customerId
            ? { ...c, ordersCount: (c.ordersCount || 0) + 1 }
            : c
        )
      )
    }

    showToast(`Recibo ${newReceipt.folio} emitido y descontado de inventario`)
    return newReceipt
  }

  // Operaciones de Inventario Físico
  const updateProductStock = (productId, newStock) => {
    const qty = Math.max(0, parseInt(newStock, 10) || 0)
    setProducts((prev) =>
      prev.map((p) => (p.id === productId ? { ...p, stock: qty } : p))
    )
  }

  const adjustProductStock = (productId, delta) => {
    setProducts((prev) =>
      prev.map((p) => {
        if (p.id === productId) {
          const updated = Math.max(0, (p.stock || 0) + delta)
          return { ...p, stock: updated }
        }
        return p
      })
    )
  }

  const resetAllStock = (defaultStock = 0) => {
    setProducts((prev) =>
      prev.map((p) => ({ ...p, stock: Math.max(0, defaultStock) }))
    )
    showToast(`Inventario físico establecido en ${defaultStock} para todos los artículos`, 'info')
  }

  const deleteReceipt = (id) => {
    setReceipts((prev) => prev.filter((r) => r.id !== id))
    showToast('Recibo eliminado del historial', 'info')
  }

  // 6. Modo de visualización: 'admin' vs 'counter'
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

  // 7. Pestaña de navegación activa
  const [activeTab, setActiveTab] = useState('catalog')

  // 8. Toast de notificaciones
  const [toast, setToast] = useState(null)

  const showToast = (message, type = 'success') => {
    setToast({ message, type, id: Date.now() })
    setTimeout(() => {
      setToast((curr) => (curr && curr.message === message ? null : curr))
    }, 3200)
  }

  // Operaciones de Clientes
  const addCustomer = (customerData) => {
    const id = `cust-${Date.now()}`
    const newCust = {
      ...customerData,
      id,
      ordersCount: 0,
      createdAt: new Date().toISOString().split('T')[0],
    }
    setCustomers((prev) => [newCust, ...prev])
    setSelectedCustomer(newCust)
    showToast(`Cliente "${newCust.name}" registrado`)
    return newCust
  }

  const updateCustomer = (id, updatedData) => {
    setCustomers((prev) =>
      prev.map((c) => (c.id === id ? { ...c, ...updatedData } : c))
    )
    if (selectedCustomer?.id === id) {
      setSelectedCustomer((prev) => ({ ...prev, ...updatedData }))
    }
    showToast('Datos del cliente actualizados')
  }

  const deleteCustomer = (id) => {
    const cust = customers.find((c) => c.id === id)
    setCustomers((prev) => prev.filter((c) => c.id !== id))
    if (selectedCustomer?.id === id) {
      setSelectedCustomer(null)
    }
    showToast(`Cliente "${cust?.name || 'Cliente'}" eliminado`, 'info')
  }

  const resetCustomers = () => {
    setCustomers(INITIAL_CUSTOMERS)
    showToast('Directorio de clientes restablecido', 'info')
  }

  const clearSelectedCustomer = () => {
    setSelectedCustomer(null)
    showToast('Cliente desvinculado de la orden', 'info')
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
    setQuoteParams((prev) => ({ ...prev, downPayment: '', discount: '', notes: '' }))
    showToast('Cotizador vaciado', 'info')
  }

  const updateQuoteParam = (key, value) => {
    setQuoteParams((prev) => ({ ...prev, [key]: value }))
  }

  // Cálculos Financieros del Cotizador
  const cartSubtotal = cart.reduce((acc, item) => acc + item.quantity * item.product.price, 0)
  const cartTotalItems = cart.reduce((acc, item) => acc + item.quantity, 0)
  
  // Regla de Negocio: Envío gratis a partir de $1,500 MXN
  const FREE_SHIPPING_THRESHOLD = 1500
  const hasFreeShipping = cartSubtotal >= FREE_SHIPPING_THRESHOLD
  const amountForFreeShipping = Math.max(0, FREE_SHIPPING_THRESHOLD - cartSubtotal)
  const freeShippingProgress = Math.min(100, (cartSubtotal / FREE_SHIPPING_THRESHOLD) * 100)

  // Costo efectivo de envío
  const effectiveShippingCost =
    quoteParams.shippingType === 'pickup'
      ? 0
      : hasFreeShipping
      ? 0
      : Number(quoteParams.deliveryFee) || 120

  const discountAmount = Math.max(0, Number(quoteParams.discount) || 0)
  const orderTotal = Math.max(0, cartSubtotal + effectiveShippingCost - discountAmount)

  // Anticipo y Saldo
  const downPaymentAmount = Math.min(orderTotal, Math.max(0, Number(quoteParams.downPayment) || 0))
  const pendingBalance = Math.max(0, orderTotal - downPaymentAmount)
  const isFullyPaid = orderTotal > 0 && downPaymentAmount >= orderTotal

  // Regalos sugeridos acumulados
  const accumulatedGifts = cart
    .filter((item) => item.product.suggestedGift)
    .map((item) => ({
      productName: item.product.name,
      gift: item.product.suggestedGift,
      quantity: item.quantity,
    }))

  return (
    <AppContext.Provider
      value={{
        // Catálogo
        products,
        addProduct,
        updateProduct,
        deleteProduct,
        resetCatalog,

        // Clientes
        customers,
        addCustomer,
        updateCustomer,
        deleteCustomer,
        resetCustomers,
        selectedCustomer,
        setSelectedCustomer,
        clearSelectedCustomer,

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

        // Cotizador
        quoteParams,
        updateQuoteParam,
        effectiveShippingCost,
        discountAmount,
        orderTotal,
        downPaymentAmount,
        pendingBalance,
        isFullyPaid,
        accumulatedGifts,

        // Recibos y Folios
        receipts,
        nextFolio,
        saveReceipt,
        deleteReceipt,

        // Inventario Físico
        updateProductStock,
        adjustProductStock,
        resetAllStock,

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
