import { useState, useMemo } from 'react'
import {
  Search,
  Plus,
  SlidersHorizontal,
  Package,
  Sparkles,
  Eye,
  EyeOff,
  RotateCcw,
  Gift,
  ShoppingCart,
  TrendingUp,
  Percent,
  CheckCircle2,
  Layers
} from 'lucide-react'
import { useApp } from '../../context/AppContext'
import { INITIAL_CATEGORIES } from '../../data/initialCatalog'
import ProductCard from './ProductCard'
import ProductModal from './ProductModal'
import { formatCurrency } from '../../utils/formatters'

export default function CatalogView() {
  const {
    products,
    viewMode,
    toggleViewMode,
    resetCatalog,
    cartTotalItems,
    cartSubtotal,
    setActiveTab,
    hasFreeShipping,
    amountForFreeShipping
  } = useApp()

  const [searchQuery, setSearchQuery] = useState('')
  const [selectedCategory, setSelectedCategory] = useState('Todos')
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [editingProduct, setEditingProduct] = useState(null)
  const [onlyPackages, setOnlyPackages] = useState(false)

  // Filtrado reactivo de productos
  const filteredProducts = useMemo(() => {
    return products.filter((prod) => {
      // Filtro de sólo paquetes si está activo
      if (onlyPackages && !prod.isPackage) return false

      // Filtro de categoría
      if (selectedCategory !== 'Todos' && prod.category !== selectedCategory) {
        return false
      }

      // Filtro de búsqueda
      if (searchQuery.trim()) {
        const query = searchQuery.toLowerCase().trim()
        const matchName = prod.name.toLowerCase().includes(query)
        const matchSku = prod.sku?.toLowerCase().includes(query)
        const matchPresentation = prod.presentation?.toLowerCase().includes(query)
        const matchGift = prod.suggestedGift?.toLowerCase().includes(query)
        const matchIncluded = prod.itemsIncluded?.some((item) =>
          item.toLowerCase().includes(query)
        )
        return matchName || matchSku || matchPresentation || matchGift || matchIncluded
      }

      return true
    })
  }, [products, selectedCategory, searchQuery, onlyPackages])

  const totalPackagesCount = products.filter((p) => p.isPackage).length
  const totalProductsCount = products.length

  const handleOpenNew = () => {
    setEditingProduct(null)
    setIsModalOpen(true)
  }

  const handleEdit = (product) => {
    setEditingProduct(product)
    setIsModalOpen(true)
  }

  return (
    <div className="space-y-6 animate-in fade-in duration-200">
      {/* Catalog Header & Stats */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 bg-white p-5 rounded-2xl border border-slate-200 shadow-xs">
        <div>
          <div className="flex items-center gap-2">
            <h1 className="text-xl sm:text-2xl font-black text-slate-900 tracking-tight">
              Catálogo de Paquetes y Productos
            </h1>
            <span className="text-xs font-bold px-2.5 py-0.5 rounded-full bg-blue-100 text-blue-800">
              {filteredProducts.length} de {totalProductsCount}
            </span>
          </div>
          <p className="text-xs text-slate-500 mt-1">
            Precios de venta, cálculo automático de márgenes y regalos sugeridos para Limpieza OKEY.
          </p>
        </div>

        {/* Action Controls */}
        <div className="flex flex-wrap items-center gap-2">
          {/* Toggle Modo Mostrador vs Modo Administrador */}
          <button
            type="button"
            onClick={toggleViewMode}
            className={`inline-flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs font-bold border transition-all ${
              viewMode === 'counter'
                ? 'bg-amber-500 text-white border-amber-600 shadow-sm'
                : 'bg-slate-100 text-slate-700 hover:bg-slate-200/80 border-slate-300'
            }`}
            title="Oculta los costos y márgenes de ganancia si estás mostrando la pantalla al cliente"
          >
            {viewMode === 'counter' ? (
              <>
                <EyeOff className="w-3.5 h-3.5" />
                <span>Modo Mostrador (Márgenes Ocultos)</span>
              </>
            ) : (
              <>
                <Eye className="w-3.5 h-3.5 text-blue-600" />
                <span>Modo Admin (Ver Márgenes & Costos)</span>
              </>
            )}
          </button>

          {/* Botón Nuevo Producto */}
          <button
            type="button"
            onClick={handleOpenNew}
            className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs font-bold bg-blue-600 hover:bg-blue-700 text-white shadow-sm shadow-blue-500/20 transition-all active:scale-98"
          >
            <Plus className="w-4 h-4" />
            <span>Nuevo Artículo</span>
          </button>
        </div>
      </div>

      {/* Quick Promotion & Free Shipping Notification Pill */}
      <div className="bg-gradient-to-r from-blue-50 via-cyan-50 to-emerald-50 border border-blue-200/80 p-3.5 rounded-2xl flex flex-col sm:flex-row items-center justify-between gap-3 text-xs">
        <div className="flex items-center gap-2.5">
          <div className="w-7 h-7 rounded-lg bg-emerald-600 text-white flex items-center justify-center shrink-0">
            <Gift className="w-4 h-4" />
          </div>
          <div>
            <span className="font-bold text-slate-800">
              Estrategia Comercial Limpieza OKEY:
            </span>
            <span className="text-slate-600 ml-1">
              Envío gratis a partir de <strong>$1,500 MXN</strong> y paquetes con regalos de cortesía incluidos.
            </span>
          </div>
        </div>

        {cartTotalItems > 0 && (
          <button
            onClick={() => setActiveTab('quoter')}
            className="shrink-0 px-3 py-1.5 rounded-xl bg-white border border-blue-200 font-bold text-blue-700 shadow-xs hover:bg-blue-50 transition-colors flex items-center gap-1.5"
          >
            <ShoppingCart className="w-3.5 h-3.5" />
            <span>Ver Carrito ({cartTotalItems} arts. &bull; {formatCurrency(cartSubtotal)})</span>
          </button>
        )}
      </div>

      {/* Filter and Search Bar */}
      <div className="space-y-3">
        <div className="flex flex-col sm:flex-row gap-3">
          {/* Search Input */}
          <div className="relative flex-1">
            <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-3" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Buscar por nombre, SKU, regalo sugerido o producto incluido..."
              className="w-full pl-10 pr-4 py-2.5 text-xs sm:text-sm bg-white border border-slate-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none shadow-2xs"
            />
            {searchQuery && (
              <button
                type="button"
                onClick={() => setSearchQuery('')}
                className="absolute right-3 top-2.5 text-xs text-slate-400 hover:text-slate-600 font-bold"
              >
                Limpiar
              </button>
            )}
          </div>

          {/* Only Packages Quick Filter */}
          <button
            type="button"
            onClick={() => setOnlyPackages((prev) => !prev)}
            className={`inline-flex items-center justify-center gap-1.5 px-3.5 py-2.5 rounded-xl text-xs font-bold border transition-all ${
              onlyPackages
                ? 'bg-blue-600 text-white border-blue-600 shadow-xs'
                : 'bg-white text-slate-700 border-slate-300 hover:bg-slate-50'
            }`}
          >
            <Sparkles className="w-3.5 h-3.5" />
            <span>Sólo Paquetes ({totalPackagesCount})</span>
          </button>
        </div>

        {/* Category Pills (Horizontal scrollable on mobile) */}
        <div className="flex items-center gap-1.5 overflow-x-auto pb-1 scrollbar-none text-xs">
          {INITIAL_CATEGORIES.map((cat) => {
            const isSelected = selectedCategory === cat
            return (
              <button
                key={cat}
                type="button"
                onClick={() => {
                  setSelectedCategory(cat)
                  if (onlyPackages && cat !== 'Paquetes Promocionales') {
                    setOnlyPackages(false)
                  }
                }}
                className={`whitespace-nowrap px-3.5 py-1.5 rounded-xl font-bold transition-all ${
                  isSelected
                    ? 'bg-slate-900 text-white shadow-xs'
                    : 'bg-white text-slate-600 border border-slate-200 hover:bg-slate-100 hover:text-slate-900'
                }`}
              >
                {cat}
              </button>
            )
          })}
        </div>
      </div>

      {/* Product Cards Grid */}
      {filteredProducts.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {filteredProducts.map((product) => (
            <ProductCard
              key={product.id}
              product={product}
              onEdit={handleEdit}
            />
          ))}
        </div>
      ) : (
        /* Empty State */
        <div className="text-center py-12 px-4 bg-white rounded-2xl border border-slate-200 space-y-3">
          <div className="w-12 h-12 mx-auto rounded-full bg-slate-100 flex items-center justify-center text-slate-400">
            <Package className="w-6 h-6" />
          </div>
          <h3 className="font-bold text-slate-800 text-sm">No se encontraron artículos</h3>
          <p className="text-xs text-slate-500 max-w-sm mx-auto">
            No hay productos que coincidan con los filtros o el término de búsqueda actual.
          </p>
          <div className="flex justify-center gap-2 pt-2">
            <button
              type="button"
              onClick={() => {
                setSearchQuery('')
                setSelectedCategory('Todos')
                setOnlyPackages(false)
              }}
              className="px-3 py-1.5 rounded-lg bg-slate-100 text-xs font-semibold text-slate-700 hover:bg-slate-200"
            >
              Restablecer filtros
            </button>
            <button
              type="button"
              onClick={handleOpenNew}
              className="px-3 py-1.5 rounded-lg bg-blue-600 text-xs font-semibold text-white hover:bg-blue-700"
            >
              Crear nuevo artículo
            </button>
          </div>
        </div>
      )}

      {/* Bottom helper action */}
      <div className="flex items-center justify-between text-xs text-slate-400 pt-4 border-t border-slate-200">
        <span>Datos guardados localmente en el navegador</span>
        <button
          type="button"
          onClick={() => {
            if (window.confirm('¿Deseas restablecer el catálogo a los paquetes y productos iniciales de muestra?')) {
              resetCatalog()
            }
          }}
          className="hover:text-slate-700 flex items-center gap-1 transition-colors"
        >
          <RotateCcw className="w-3 h-3" />
          <span>Restablecer catálogo inicial</span>
        </button>
      </div>

      {/* Product Creation / Edit Modal */}
      <ProductModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        productToEdit={editingProduct}
      />
    </div>
  )
}
