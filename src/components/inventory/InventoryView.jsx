import { useState, useMemo } from 'react'
import {
  Boxes,
  Search,
  AlertTriangle,
  CheckCircle2,
  XCircle,
  Plus,
  Minus,
  RotateCcw,
  Download,
  Share2,
  Filter,
  DollarSign,
  Layers,
  ArrowUpDown,
  Sparkles,
  ClipboardList
} from 'lucide-react'
import { useApp } from '../../context/AppContext'
import { INITIAL_CATEGORIES } from '../../data/initialCatalog'
import { formatCurrency } from '../../utils/formatters'

export default function InventoryView() {
  const {
    products,
    updateProductStock,
    adjustProductStock,
    resetAllStock,
    showToast,
  } = useApp()

  const [searchTerm, setSearchTerm] = useState('')
  const [selectedCategory, setSelectedCategory] = useState('Todos')
  const [stockFilter, setStockFilter] = useState('all') // 'all' | 'in_stock' | 'low_stock' | 'out_of_stock'
  const [sortBy, setSortBy] = useState('name') // 'name' | 'sku' | 'stock_asc' | 'stock_desc'
  const [confirmResetOpen, setConfirmResetOpen] = useState(false)

  // 1. Estadísticas globales del inventario físico
  const stats = useMemo(() => {
    let totalPieces = 0
    let inStockCount = 0
    let lowStockCount = 0
    let outOfStockCount = 0
    let totalCostValue = 0
    let totalPriceValue = 0

    products.forEach((p) => {
      const stock = Number(p.stock) || 0
      totalPieces += stock

      if (stock > 3) {
        inStockCount += 1
      } else if (stock >= 1 && stock <= 3) {
        lowStockCount += 1
      } else {
        outOfStockCount += 1
      }

      totalCostValue += stock * (p.cost || 0)
      totalPriceValue += stock * (p.price || 0)
    })

    return {
      totalPieces,
      inStockCount,
      lowStockCount,
      outOfStockCount,
      totalCostValue,
      totalPriceValue,
    }
  }, [products])

  // 2. Filtrado y ordenamiento de productos
  const filteredProducts = useMemo(() => {
    return products
      .filter((p) => {
        // Filtro de búsqueda por SKU o nombre
        if (searchTerm.trim()) {
          const q = searchTerm.toLowerCase().trim()
          const matchSku = p.sku?.toLowerCase().includes(q)
          const matchName = p.name?.toLowerCase().includes(q)
          const matchCat = p.category?.toLowerCase().includes(q)
          if (!matchSku && !matchName && !matchCat) return false
        }

        // Filtro por categoría
        if (selectedCategory !== 'Todos' && p.category !== selectedCategory) {
          return false
        }

        // Filtro por estado de stock
        const stock = Number(p.stock) || 0
        if (stockFilter === 'in_stock' && stock === 0) return false
        if (stockFilter === 'low_stock' && (stock < 1 || stock > 3)) return false
        if (stockFilter === 'out_of_stock' && stock !== 0) return false

        return true
      })
      .sort((a, b) => {
        if (sortBy === 'sku') {
          return (Number(a.sku) || 0) - (Number(b.sku) || 0)
        }
        if (sortBy === 'stock_asc') {
          return (a.stock || 0) - (b.stock || 0)
        }
        if (sortBy === 'stock_desc') {
          return (b.stock || 0) - (a.stock || 0)
        }
        return a.name.localeCompare(b.name)
      })
  }, [products, searchTerm, selectedCategory, stockFilter, sortBy])

  // Copiar reporte a portapapeles para WhatsApp
  const handleCopyReport = () => {
    let report = `📦 *REPORTE DE INVENTARIO FÍSICO - LIMPIEZA OKEY*\n`
    report += `📅 *Fecha:* ${new Date().toLocaleDateString('es-MX')}\n`
    report += `------------------------------------\n`
    report += `🔢 *Piezas totales contadas:* ${stats.totalPieces}\n`
    report += `✅ *Artículos con stock:* ${stats.inStockCount + stats.lowStockCount} de ${products.length}\n`
    report += `⚠️ *Artículos con stock bajo (1 a 3):* ${stats.lowStockCount}\n`
    report += `❌ *Artículos agotados:* ${stats.outOfStockCount}\n`
    report += `💵 *Inversión en almacén (Costo Empleado):* ${formatCurrency(stats.totalCostValue)}\n`
    report += `------------------------------------\n`

    const lowStockItems = products.filter((p) => p.stock > 0 && p.stock <= 3)
    if (lowStockItems.length > 0) {
      report += `⚠️ *PRODUCTOS POR RESURTIR:*\n`
      lowStockItems.slice(0, 15).forEach((p) => {
        report += `• [${p.sku}] ${p.name}: ${p.stock} pza(s)\n`
      })
      if (lowStockItems.length > 15) {
        report += `...y ${lowStockItems.length - 15} productos más con stock bajo.\n`
      }
    }

    navigator.clipboard.writeText(report)
    showToast('Reporte de inventario copiado al portapapeles')
  }

  return (
    <div className="space-y-6 animate-in fade-in duration-200">
      {/* Encabezado del Módulo */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 bg-white p-5 rounded-2xl border border-slate-200 shadow-xs">
        <div>
          <div className="flex items-center gap-2">
            <div className="w-9 h-9 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center font-bold">
              <Boxes className="w-5 h-5" />
            </div>
            <div>
              <h1 className="text-xl sm:text-2xl font-black text-slate-900 tracking-tight">
                Inventario Físico de Productos
              </h1>
              <p className="text-xs text-slate-500 mt-0.5">
                Conteo físico en bodega. Las ventas de recibos se descuentan automáticamente del stock.
              </p>
            </div>
          </div>
        </div>

        {/* Acciones de Cabecera */}
        <div className="flex flex-wrap items-center gap-2">
          <button
            type="button"
            onClick={handleCopyReport}
            className="flex items-center gap-1.5 px-3 py-2 rounded-xl bg-emerald-50 hover:bg-emerald-100 text-emerald-800 border border-emerald-200 text-xs font-bold transition-colors"
          >
            <Share2 className="w-3.5 h-3.5 text-emerald-600" />
            <span>Copiar Resumen para WhatsApp</span>
          </button>

          <button
            type="button"
            onClick={() => setConfirmResetOpen(true)}
            className="flex items-center gap-1.5 px-3 py-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-semibold transition-colors"
            title="Reiniciar todos los productos a 0 piezas para iniciar conteo desde cero"
          >
            <RotateCcw className="w-3.5 h-3.5 text-slate-500" />
            <span>Iniciar Conteo en 0</span>
          </button>
        </div>
      </div>

      {/* KPI Cards / Tarjetas de Métricas */}
      <div className="grid grid-cols-2 lg:grid-cols-5 gap-3">
        <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-2xs">
          <div className="flex items-center justify-between text-slate-400 mb-1">
            <span className="text-[11px] font-bold uppercase tracking-wider text-slate-500">
              Piezas en Stock
            </span>
            <Boxes className="w-4 h-4 text-blue-600" />
          </div>
          <div className="text-2xl font-black text-slate-900 tracking-tight">
            {stats.totalPieces.toLocaleString('es-MX')}
          </div>
          <span className="text-[11px] text-slate-400 block mt-0.5">
            unidades físicas contadas
          </span>
        </div>

        <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-2xs">
          <div className="flex items-center justify-between text-slate-400 mb-1">
            <span className="text-[11px] font-bold uppercase tracking-wider text-emerald-700">
              Con Existencia
            </span>
            <CheckCircle2 className="w-4 h-4 text-emerald-600" />
          </div>
          <div className="text-2xl font-black text-emerald-700 tracking-tight">
            {stats.inStockCount}
          </div>
          <span className="text-[11px] text-slate-400 block mt-0.5">
            productos con buen stock
          </span>
        </div>

        <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-2xs">
          <div className="flex items-center justify-between text-slate-400 mb-1">
            <span className="text-[11px] font-bold uppercase tracking-wider text-amber-700">
              Stock Bajo (1-3)
            </span>
            <AlertTriangle className="w-4 h-4 text-amber-600" />
          </div>
          <div className="text-2xl font-black text-amber-600 tracking-tight">
            {stats.lowStockCount}
          </div>
          <span className="text-[11px] text-slate-400 block mt-0.5">
            por resurtir pronto
          </span>
        </div>

        <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-2xs">
          <div className="flex items-center justify-between text-slate-400 mb-1">
            <span className="text-[11px] font-bold uppercase tracking-wider text-rose-700">
              Agotados (0)
            </span>
            <XCircle className="w-4 h-4 text-rose-600" />
          </div>
          <div className="text-2xl font-black text-rose-600 tracking-tight">
            {stats.outOfStockCount}
          </div>
          <span className="text-[11px] text-slate-400 block mt-0.5">
            sin existencia en bodega
          </span>
        </div>

        <div className="col-span-2 lg:col-span-1 bg-gradient-to-br from-blue-900 to-slate-900 text-white p-4 rounded-2xl shadow-sm">
          <div className="text-[11px] font-bold uppercase tracking-wider text-cyan-300 mb-1">
            Inversión en Bodega
          </div>
          <div className="text-xl sm:text-2xl font-black tracking-tight text-white">
            {formatCurrency(stats.totalCostValue)}
          </div>
          <span className="text-[11px] text-slate-300 block mt-0.5">
            Venta: {formatCurrency(stats.totalPriceValue)}
          </span>
        </div>
      </div>

      {/* Barra de Búsqueda y Filtros */}
      <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-2xs space-y-3">
        <div className="flex flex-col sm:flex-row gap-3">
          {/* Buscador */}
          <div className="relative flex-1">
            <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-3" />
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Buscar por SKU (código) o nombre del producto..."
              className="w-full pl-10 pr-4 py-2.5 text-xs sm:text-sm bg-slate-50 border border-slate-300 rounded-xl focus:ring-2 focus:ring-blue-500 outline-none"
            />
          </div>

          {/* Filtro de Categoría */}
          <select
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
            className="px-3.5 py-2.5 text-xs font-semibold bg-slate-50 border border-slate-300 rounded-xl focus:ring-2 focus:ring-blue-500 outline-none text-slate-700"
          >
            {INITIAL_CATEGORIES.map((cat) => (
              <option key={cat} value={cat}>
                {cat === 'Todos' ? 'Todas las Categorías (19)' : cat}
              </option>
            ))}
          </select>

          {/* Ordenar */}
          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
            className="px-3.5 py-2.5 text-xs font-semibold bg-slate-50 border border-slate-300 rounded-xl focus:ring-2 focus:ring-blue-500 outline-none text-slate-700"
          >
            <option value="name">Ordenar: Nombre (A-Z)</option>
            <option value="sku">Ordenar: Código SKU</option>
            <option value="stock_asc">Menor Existencia Primero</option>
            <option value="stock_desc">Mayor Existencia Primero</option>
          </select>
        </div>

        {/* Píldoras de Filtro Rápido de Stock */}
        <div className="flex flex-wrap items-center gap-1.5 pt-1">
          <span className="text-[11px] font-bold text-slate-400 mr-1">Filtrar:</span>
          <button
            type="button"
            onClick={() => setStockFilter('all')}
            className={`px-3 py-1 rounded-lg text-xs font-bold transition-colors ${
              stockFilter === 'all'
                ? 'bg-slate-900 text-white'
                : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
            }`}
          >
            Todos ({products.length})
          </button>
          <button
            type="button"
            onClick={() => setStockFilter('in_stock')}
            className={`px-3 py-1 rounded-lg text-xs font-bold transition-colors ${
              stockFilter === 'in_stock'
                ? 'bg-emerald-600 text-white'
                : 'bg-emerald-50 text-emerald-800 hover:bg-emerald-100'
            }`}
          >
            Con Existencia ({stats.inStockCount + stats.lowStockCount})
          </button>
          <button
            type="button"
            onClick={() => setStockFilter('low_stock')}
            className={`px-3 py-1 rounded-lg text-xs font-bold transition-colors ${
              stockFilter === 'low_stock'
                ? 'bg-amber-600 text-white'
                : 'bg-amber-50 text-amber-800 hover:bg-amber-100'
            }`}
          >
            Stock Bajo ({stats.lowStockCount})
          </button>
          <button
            type="button"
            onClick={() => setStockFilter('out_of_stock')}
            className={`px-3 py-1 rounded-lg text-xs font-bold transition-colors ${
              stockFilter === 'out_of_stock'
                ? 'bg-rose-600 text-white'
                : 'bg-rose-50 text-rose-800 hover:bg-rose-100'
            }`}
          >
            Agotados ({stats.outOfStockCount})
          </button>

          {(searchTerm || selectedCategory !== 'Todos' || stockFilter !== 'all') && (
            <button
              type="button"
              onClick={() => {
                setSearchTerm('')
                setSelectedCategory('Todos')
                setStockFilter('all')
              }}
              className="ml-auto text-xs font-bold text-blue-600 hover:underline"
            >
              Restablecer filtros
            </button>
          )}
        </div>
      </div>

      {/* Lista Interactiva de Conteo Rápido */}
      <div className="bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-2xs">
        <div className="p-4 bg-slate-50 border-b border-slate-200 flex items-center justify-between text-xs font-bold text-slate-600">
          <span>Mostrando {filteredProducts.length} de {products.length} productos</span>
          <span className="hidden sm:inline text-slate-400">
            Toca el número para escribir directamente o usa los botones + / -
          </span>
        </div>

        <div className="divide-y divide-slate-100">
          {filteredProducts.map((p) => {
            const currentStock = Number(p.stock) || 0
            const isOutOfStock = currentStock === 0
            const isLowStock = currentStock >= 1 && currentStock <= 3

            return (
              <div
                key={p.id}
                className="p-3.5 sm:p-4 hover:bg-slate-50/70 transition-colors flex flex-col sm:flex-row sm:items-center justify-between gap-3"
              >
                {/* Info del Producto */}
                <div className="flex-1 min-w-0 space-y-1">
                  <div className="flex flex-wrap items-center gap-1.5">
                    <span className="font-mono text-[11px] font-extrabold px-2 py-0.5 rounded-md bg-slate-100 text-slate-800 border border-slate-200">
                      CÓD: {p.sku}
                    </span>
                    <span className="text-[10px] uppercase font-bold text-slate-400">
                      {p.category}
                    </span>

                    {/* Badge de Estado de Stock */}
                    {isOutOfStock ? (
                      <span className="inline-flex items-center gap-1 text-[10px] font-bold px-2 py-0.5 rounded-full bg-rose-100 text-rose-800">
                        <XCircle className="w-3 h-3 text-rose-600" />
                        <span>Sin existencias</span>
                      </span>
                    ) : isLowStock ? (
                      <span className="inline-flex items-center gap-1 text-[10px] font-bold px-2 py-0.5 rounded-full bg-amber-100 text-amber-800">
                        <AlertTriangle className="w-3 h-3 text-amber-600" />
                        <span>Stock bajo</span>
                      </span>
                    ) : (
                      <span className="inline-flex items-center gap-1 text-[10px] font-bold px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-800">
                        <CheckCircle2 className="w-3 h-3 text-emerald-600" />
                        <span>En existencia</span>
                      </span>
                    )}
                  </div>

                  <h3 className="font-bold text-slate-900 text-sm leading-snug">
                    {p.name}
                  </h3>

                  <div className="flex items-center gap-3 text-xs text-slate-500">
                    <span className="font-semibold text-cyan-800 bg-cyan-50 px-1.5 py-0.2 rounded border border-cyan-100">
                      {p.presentation}
                    </span>
                    <span>Costo: <strong>{formatCurrency(p.cost)}</strong></span>
                    <span>Precio: <strong>{formatCurrency(p.price)}</strong></span>
                  </div>
                </div>

                {/* Controles de Conteo Físico Rápido */}
                <div className="flex items-center gap-2 self-end sm:self-center">
                  {/* Selector Numérico Principal */}
                  <div className="flex items-center border border-slate-300 rounded-xl bg-white shadow-xs overflow-hidden">
                    <button
                      type="button"
                      onClick={() => adjustProductStock(p.id, -1)}
                      disabled={currentStock <= 0}
                      className="p-2.5 text-slate-600 hover:text-slate-900 hover:bg-slate-100 transition-colors disabled:opacity-30 disabled:hover:bg-white"
                      title="Restar 1 pieza"
                    >
                      <Minus className="w-4 h-4" />
                    </button>

                    <input
                      type="number"
                      min="0"
                      value={currentStock}
                      onChange={(e) => updateProductStock(p.id, e.target.value)}
                      className={`w-14 sm:w-16 py-1.5 text-center font-mono font-black text-base sm:text-lg outline-none ${
                        isOutOfStock
                          ? 'text-rose-600 bg-rose-50/50'
                          : isLowStock
                          ? 'text-amber-700 bg-amber-50/50'
                          : 'text-slate-900 bg-white'
                      }`}
                      title="Editar número directamente"
                    />

                    <button
                      type="button"
                      onClick={() => adjustProductStock(p.id, 1)}
                      className="p-2.5 text-slate-600 hover:text-slate-900 hover:bg-slate-100 transition-colors"
                      title="Sumar 1 pieza"
                    >
                      <Plus className="w-4 h-4" />
                    </button>
                  </div>

                  {/* Botones de Ajuste Rápido */}
                  <div className="flex items-center gap-1">
                    <button
                      type="button"
                      onClick={() => adjustProductStock(p.id, 5)}
                      className="px-2 py-1.5 rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-bold transition-colors"
                      title="Sumar 5 piezas"
                    >
                      +5
                    </button>
                    <button
                      type="button"
                      onClick={() => adjustProductStock(p.id, 10)}
                      className="hidden sm:inline-block px-2 py-1.5 rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-bold transition-colors"
                      title="Sumar 10 piezas"
                    >
                      +10
                    </button>
                    {currentStock > 0 && (
                      <button
                        type="button"
                        onClick={() => updateProductStock(p.id, 0)}
                        className="px-2 py-1.5 rounded-lg text-slate-400 hover:text-rose-600 hover:bg-rose-50 text-xs font-bold transition-colors"
                        title="Poner en 0 (Agotado)"
                      >
                        0
                      </button>
                    )}
                  </div>
                </div>
              </div>
            )
          })}

          {filteredProducts.length === 0 && (
            <div className="p-12 text-center text-slate-400 space-y-2">
              <Boxes className="w-8 h-8 mx-auto text-slate-300" />
              <p className="text-sm font-semibold text-slate-600">
                No se encontraron productos con los filtros seleccionados
              </p>
              <button
                type="button"
                onClick={() => {
                  setSearchTerm('')
                  setSelectedCategory('Todos')
                  setStockFilter('all')
                }}
                className="text-xs font-bold text-blue-600 hover:underline"
              >
                Limpiar filtros
              </button>
            </div>
          )}
        </div>
      </div>

      {/* Modal de Confirmación para Reiniciar a 0 */}
      {confirmResetOpen && (
        <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4 animate-in fade-in duration-150">
          <div className="bg-white rounded-3xl max-w-md w-full p-6 shadow-2xl space-y-4 border border-slate-200">
            <div className="w-12 h-12 rounded-2xl bg-amber-100 text-amber-700 flex items-center justify-center mx-auto">
              <RotateCcw className="w-6 h-6" />
            </div>

            <div className="text-center space-y-1">
              <h3 className="font-extrabold text-slate-900 text-lg">
                ¿Iniciar Conteo Físico en 0?
              </h3>
              <p className="text-xs text-slate-500">
                Esta acción pondrá la existencia de los 275 productos en 0 piezas. Es ideal para que Karen comience a contar producto por producto en los estantes sin valores ficticios previos.
              </p>
            </div>

            <div className="grid grid-cols-2 gap-3 pt-2">
              <button
                type="button"
                onClick={() => setConfirmResetOpen(false)}
                className="py-2.5 px-4 rounded-xl border border-slate-300 font-bold text-xs text-slate-700 hover:bg-slate-50 transition-colors"
              >
                Cancelar
              </button>
              <button
                type="button"
                onClick={() => {
                  resetAllStock(0)
                  setConfirmResetOpen(false)
                }}
                className="py-2.5 px-4 rounded-xl bg-amber-600 hover:bg-amber-700 text-white font-bold text-xs shadow-sm transition-colors"
              >
                Sí, Poner en 0
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
