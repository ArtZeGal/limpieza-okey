import { useState, useMemo } from 'react'
import {
  Boxes,
  Search,
  CheckCircle2,
  AlertTriangle,
  XCircle,
  Plus,
  Minus,
  RotateCcw,
  Share2,
  ClipboardCheck,
  PackageCheck,
  Layers,
  Sparkles,
  ArrowRight,
  TrendingUp,
  Tag,
  Check,
  Eye,
  SlidersHorizontal
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

  // Pestañas principales del módulo: 'audit' (Hacer Inventario) | 'overview' (Existencias y Valuación)
  const [activeTab, setActiveTab] = useState('audit')

  // Filtros para "Hacer Inventario"
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedCategory, setSelectedCategory] = useState('Todos')
  const [auditFilter, setAuditFilter] = useState('all') // 'all' | 'counted' | 'uncounted'
  const [confirmResetOpen, setConfirmResetOpen] = useState(false)

  // 1. Estadísticas globales
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

    const countedProductsCount = inStockCount + lowStockCount
    const progressPercent = Math.round((countedProductsCount / products.length) * 100)

    return {
      totalPieces,
      inStockCount,
      lowStockCount,
      outOfStockCount,
      totalCostValue,
      totalPriceValue,
      countedProductsCount,
      progressPercent,
    }
  }, [products])

  // 2. Conteo de productos por categoría
  const categoryStats = useMemo(() => {
    const counts = {}
    products.forEach((p) => {
      const cat = p.category || 'Otros'
      if (!counts[cat]) {
        counts[cat] = { total: 0, counted: 0 }
      }
      counts[cat].total += 1
      if ((p.stock || 0) > 0) {
        counts[cat].counted += 1
      }
    })
    return counts
  }, [products])

  // 3. Productos filtrados para la pantalla actual
  const filteredProducts = useMemo(() => {
    return products
      .filter((p) => {
        // Búsqueda rápida por SKU o nombre
        if (searchTerm.trim()) {
          const q = searchTerm.toLowerCase().trim()
          const matchSku = p.sku?.toLowerCase().includes(q)
          const matchName = p.name?.toLowerCase().includes(q)
          if (!matchSku && !matchName) return false
        }

        // Filtro por categoría seleccionada
        if (selectedCategory !== 'Todos' && p.category !== selectedCategory) {
          return false
        }

        // Filtro de estado en toma de inventario
        const stock = Number(p.stock) || 0
        if (auditFilter === 'counted' && stock === 0) return false
        if (auditFilter === 'uncounted' && stock > 0) return false

        return true
      })
      .sort((a, b) => {
        // En modo "Hacer inventario", si filtramos "todos", poner primero los que ya tienen stock o por nombre
        if (auditFilter === 'counted') {
          return (b.stock || 0) - (a.stock || 0)
        }
        return a.name.localeCompare(b.name)
      })
  }, [products, searchTerm, selectedCategory, auditFilter])

  // Copiar resumen de inventario a WhatsApp
  const handleCopyReport = () => {
    let report = `📦 *REPORTE DE INVENTARIO FÍSICO - LIMPIEZA OKEY*\n`
    report += `📅 *Fecha:* ${new Date().toLocaleDateString('es-MX')}\n`
    report += `------------------------------------\n`
    report += `🔢 *Piezas físicas contadas:* ${stats.totalPieces}\n`
    report += `🏷️ *Productos con existencia:* ${stats.countedProductsCount} de ${products.length}\n`
    report += `💵 *Inversión en mercancía (Costo Empleado):* ${formatCurrency(stats.totalCostValue)}\n`
    report += `⭐ *Valor comercial (Precio Público):* ${formatCurrency(stats.totalPriceValue)}\n`
    report += `------------------------------------\n`

    const countedItems = products.filter((p) => (p.stock || 0) > 0)
    if (countedItems.length > 0) {
      report += `📋 *PRODUCTOS EN EXISTENCIA:*\n`
      countedItems.forEach((p) => {
        report += `• [${p.sku}] ${p.name} (${p.presentation}): *${p.stock} pzas*\n`
      })
    } else {
      report += `(Aún no hay productos con existencia registrada)\n`
    }

    navigator.clipboard.writeText(report)
    showToast('Reporte de inventario copiado al portapapeles para WhatsApp')
  }

  return (
    <div className="space-y-6 animate-in fade-in duration-200">
      {/* Barra Superior del Módulo */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 bg-white p-5 rounded-3xl border border-slate-200/90 shadow-xs">
        <div>
          <div className="flex items-center gap-2.5">
            <div className="w-10 h-10 rounded-2xl bg-gradient-to-tr from-blue-600 to-cyan-600 text-white flex items-center justify-center font-bold shadow-md shadow-blue-500/20">
              <Boxes className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h1 className="text-xl sm:text-2xl font-black text-slate-900 tracking-tight">
                  Inventario Físico
                </h1>
                <span className="text-xs font-mono font-bold px-2 py-0.5 rounded-full bg-blue-100 text-blue-800">
                  {stats.totalPieces} pzas en bodega
                </span>
              </div>
              <p className="text-xs text-slate-500 mt-0.5">
                Conteo en bodega sin complicaciones. Las ventas se descuentan en automático.
              </p>
            </div>
          </div>
        </div>

        {/* Pestañas Principales: "Hacer Inventario" vs "Resumen y Valuación" */}
        <div className="flex items-center gap-1 bg-slate-100/90 p-1 rounded-2xl border border-slate-200 text-xs font-bold">
          <button
            type="button"
            onClick={() => setActiveTab('audit')}
            className={`flex items-center gap-2 px-4 py-2.5 rounded-xl transition-all ${
              activeTab === 'audit'
                ? 'bg-white text-blue-700 shadow-sm font-bold'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            <ClipboardCheck className="w-4 h-4 text-blue-600" />
            <span>Hacer Inventario</span>
            {stats.countedProductsCount > 0 && (
              <span className="text-[10px] px-1.5 py-0.2 rounded-full font-bold bg-blue-600 text-white">
                {stats.countedProductsCount}
              </span>
            )}
          </button>

          <button
            type="button"
            onClick={() => setActiveTab('overview')}
            className={`flex items-center gap-2 px-4 py-2.5 rounded-xl transition-all ${
              activeTab === 'overview'
                ? 'bg-white text-blue-700 shadow-sm font-bold'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            <TrendingUp className="w-4 h-4 text-slate-500" />
            <span>Resumen y Valuación</span>
          </button>
        </div>
      </div>

      {/* ============================================================== */}
      {/* VISTA 1: HACER INVENTARIO (TOMA FÍSICA FÁCIL Y NO ABRUMADORA)   */}
      {/* ============================================================== */}
      {activeTab === 'audit' && (
        <div className="space-y-5">
          {/* Banner Amigable de Progreso */}
          <div className="bg-gradient-to-r from-blue-50 via-cyan-50 to-white p-4 sm:p-5 rounded-3xl border border-blue-200/70 shadow-2xs flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div className="space-y-1">
              <div className="flex items-center gap-2 text-blue-900 font-extrabold text-sm sm:text-base">
                <Sparkles className="w-4 h-4 text-cyan-600" />
                <span>Toma de Inventario Físico en Bodega</span>
              </div>
              <p className="text-xs text-slate-600 max-w-xl">
                Karen, ve ingresando las cantidades de los productos que sí tienes en tus estantes. Todo se guarda al instante.
              </p>
            </div>

            {/* Resumen Rápido de lo Contado */}
            <div className="flex items-center gap-3 bg-white/90 px-4 py-2.5 rounded-2xl border border-blue-100 shadow-2xs shrink-0">
              <div className="text-right">
                <span className="text-[11px] font-bold text-slate-400 block uppercase">
                  Contados
                </span>
                <span className="text-lg font-black text-blue-700">
                  {stats.countedProductsCount} <span className="text-xs text-slate-500 font-normal">de {products.length}</span>
                </span>
              </div>
              <div className="h-8 w-px bg-slate-200" />
              <div>
                <span className="text-[11px] font-bold text-slate-400 block uppercase">
                  Total Piezas
                </span>
                <span className="text-lg font-black text-emerald-700">
                  {stats.totalPieces} <span className="text-xs text-slate-500 font-normal">pzas</span>
                </span>
              </div>
            </div>
          </div>

          {/* Barra de Filtros Amigable: Categoría y Búsqueda */}
          <div className="bg-white p-4 sm:p-5 rounded-3xl border border-slate-200/90 shadow-2xs space-y-4">
            {/* Buscador Prominente */}
            <div className="relative">
              <Search className="w-5 h-5 text-slate-400 absolute left-4 top-3.5" />
              <input
                type="text"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder="Busca por código o nombre del producto (ej. 15114 o Prelavador)..."
                className="w-full pl-12 pr-4 py-3 text-sm sm:text-base font-medium bg-slate-50 border border-slate-300 rounded-2xl focus:ring-2 focus:ring-blue-500 outline-none text-slate-900 placeholder:text-slate-400"
              />
              {searchTerm && (
                <button
                  type="button"
                  onClick={() => setSearchTerm('')}
                  className="absolute right-3.5 top-3 text-xs font-bold text-slate-400 hover:text-slate-700 bg-slate-200 px-2 py-1 rounded-lg"
                >
                  Limpiar
                </button>
              )}
            </div>

            {/* Selector de Categorías (Paso a Paso para no abrumarse) */}
            <div>
              <div className="flex items-center justify-between mb-2">
                <span className="text-xs font-extrabold text-slate-700 uppercase tracking-wider flex items-center gap-1.5">
                  <Layers className="w-3.5 h-3.5 text-blue-600" />
                  <span>Elige un estante / categoría para contar por partes:</span>
                </span>
                {selectedCategory !== 'Todos' && (
                  <button
                    type="button"
                    onClick={() => setSelectedCategory('Todos')}
                    className="text-xs font-bold text-blue-600 hover:underline"
                  >
                    Ver todas las categorías
                  </button>
                )}
              </div>

              {/* Píldoras de Categoría con Conteo */}
              <div className="flex items-center gap-1.5 overflow-x-auto pb-2 scrollbar-thin">
                {INITIAL_CATEGORIES.map((cat) => {
                  const isSelected = selectedCategory === cat
                  const catStat = categoryStats[cat]
                  const countedInCat = catStat?.counted || 0
                  const totalInCat = catStat?.total || 0

                  return (
                    <button
                      key={cat}
                      type="button"
                      onClick={() => setSelectedCategory(cat)}
                      className={`shrink-0 flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-bold transition-all ${
                        isSelected
                          ? 'bg-blue-600 text-white shadow-sm shadow-blue-500/20'
                          : 'bg-slate-100 text-slate-700 hover:bg-slate-200/80 border border-slate-200/60'
                      }`}
                    >
                      <span>{cat}</span>
                      {cat !== 'Todos' && (
                        <span
                          className={`text-[10px] px-1.5 py-0.2 rounded-full font-bold ${
                            isSelected
                              ? 'bg-blue-800 text-white'
                              : countedInCat > 0
                              ? 'bg-emerald-100 text-emerald-800'
                              : 'bg-slate-200 text-slate-500'
                          }`}
                        >
                          {countedInCat > 0 ? `${countedInCat}/${totalInCat}` : totalInCat}
                        </span>
                      )}
                    </button>
                  )
                })}
              </div>
            </div>

            {/* Filtro Rápido de Estado: Todos vs Ya Contados vs Pendientes */}
            <div className="pt-2 border-t border-slate-100 flex flex-wrap items-center justify-between gap-2">
              <div className="flex items-center gap-1 bg-slate-100 p-1 rounded-xl text-xs font-bold">
                <button
                  type="button"
                  onClick={() => setAuditFilter('all')}
                  className={`px-3 py-1.5 rounded-lg transition-colors ${
                    auditFilter === 'all'
                      ? 'bg-white text-slate-900 shadow-xs'
                      : 'text-slate-600 hover:text-slate-900'
                  }`}
                >
                  Todos los de este estante ({filteredProducts.length})
                </button>
                <button
                  type="button"
                  onClick={() => setAuditFilter('counted')}
                  className={`flex items-center gap-1 px-3 py-1.5 rounded-lg transition-colors ${
                    auditFilter === 'counted'
                      ? 'bg-white text-emerald-700 shadow-xs'
                      : 'text-slate-600 hover:text-slate-900'
                  }`}
                >
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                  <span>Solo los que tengo ({stats.countedProductsCount})</span>
                </button>
                <button
                  type="button"
                  onClick={() => setAuditFilter('uncounted')}
                  className={`px-3 py-1.5 rounded-lg transition-colors ${
                    auditFilter === 'uncounted'
                      ? 'bg-white text-slate-700 shadow-xs'
                      : 'text-slate-600 hover:text-slate-900'
                  }`}
                >
                  Pendientes en 0 ({stats.outOfStockCount})
                </button>
              </div>

              <span className="text-xs text-slate-400 font-medium hidden sm:inline">
                💡 Tip: Toca el número para escribir directo o usa +5 / +10
              </span>
            </div>
          </div>

          {/* ========================================================= */}
          {/* LISTA DE CONTEO RÁPIDO (TARJETAS GRANDES Y AMIGABLES)    */}
          {/* ========================================================= */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3.5">
            {filteredProducts.map((p) => {
              const currentStock = Number(p.stock) || 0
              const hasStock = currentStock > 0

              return (
                <div
                  key={p.id}
                  className={`p-4 rounded-3xl border transition-all flex flex-col justify-between gap-3 ${
                    hasStock
                      ? 'bg-emerald-50/40 border-emerald-300 shadow-xs'
                      : 'bg-white border-slate-200/90 shadow-2xs hover:border-slate-300'
                  }`}
                >
                  {/* Fila Superior: SKU, Categoría y Estado */}
                  <div className="flex items-start justify-between gap-2">
                    <div className="flex flex-wrap items-center gap-1.5">
                      <span className="font-mono text-xs font-black px-2.5 py-0.5 rounded-lg bg-slate-100 text-slate-800 border border-slate-200">
                        CÓD: {p.sku}
                      </span>
                      <span className="text-[11px] font-bold text-slate-400 uppercase">
                        {p.category}
                      </span>
                    </div>

                    {/* Badge de Conteo */}
                    {hasStock ? (
                      <span className="inline-flex items-center gap-1 text-xs font-extrabold px-2.5 py-0.5 rounded-full bg-emerald-100 text-emerald-800 border border-emerald-300">
                        <Check className="w-3.5 h-3.5 text-emerald-700" />
                        <span>¡Contado: {currentStock} pzas!</span>
                      </span>
                    ) : (
                      <span className="text-[11px] font-semibold px-2 py-0.5 rounded-full bg-slate-100 text-slate-400">
                        Sin existencia (0)
                      </span>
                    )}
                  </div>

                  {/* Nombre y Presentación */}
                  <div>
                    <h3 className="font-black text-slate-900 text-base leading-snug">
                      {p.name}
                    </h3>
                    <div className="flex items-center gap-2 mt-1">
                      <span className="text-xs font-bold text-cyan-800 bg-cyan-50 px-2 py-0.5 rounded-md border border-cyan-200/70">
                        {p.presentation}
                      </span>
                      <span className="text-xs text-slate-400">
                        Precio: {formatCurrency(p.price)}
                      </span>
                    </div>
                  </div>

                  {/* Controles de Conteo Físico Rápido */}
                  <div className="pt-2 border-t border-slate-200/60 flex items-center justify-between gap-2">
                    <span className="text-xs font-bold text-slate-600">
                      Cantidad física:
                    </span>

                    <div className="flex items-center gap-2">
                      {/* Control Numérico Principal */}
                      <div className="flex items-center border border-slate-300 rounded-2xl bg-white shadow-xs overflow-hidden">
                        <button
                          type="button"
                          onClick={() => adjustProductStock(p.id, -1)}
                          disabled={currentStock <= 0}
                          className="w-10 h-10 flex items-center justify-center text-slate-600 hover:bg-slate-100 transition-colors disabled:opacity-20"
                          title="Restar 1 pieza"
                        >
                          <Minus className="w-4 h-4" />
                        </button>

                        <input
                          type="number"
                          min="0"
                          value={currentStock}
                          onChange={(e) => updateProductStock(p.id, e.target.value)}
                          className={`w-16 h-10 text-center font-mono font-black text-lg outline-none ${
                            hasStock
                              ? 'text-emerald-800 bg-emerald-50/60'
                              : 'text-slate-400 bg-white'
                          }`}
                          title="Escribe la cantidad directamente"
                        />

                        <button
                          type="button"
                          onClick={() => adjustProductStock(p.id, 1)}
                          className="w-10 h-10 flex items-center justify-center text-slate-600 hover:bg-slate-100 transition-colors"
                          title="Sumar 1 pieza"
                        >
                          <Plus className="w-4 h-4" />
                        </button>
                      </div>

                      {/* Atajos de Lote */}
                      <div className="flex items-center gap-1">
                        <button
                          type="button"
                          onClick={() => adjustProductStock(p.id, 5)}
                          className="px-2.5 py-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-bold transition-colors"
                          title="Sumar 5 piezas"
                        >
                          +5
                        </button>
                        <button
                          type="button"
                          onClick={() => adjustProductStock(p.id, 10)}
                          className="px-2.5 py-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-bold transition-colors"
                          title="Sumar 10 piezas"
                        >
                          +10
                        </button>
                        {hasStock && (
                          <button
                            type="button"
                            onClick={() => updateProductStock(p.id, 0)}
                            className="px-2 py-2 rounded-xl text-slate-400 hover:text-rose-600 hover:bg-rose-50 text-xs font-bold transition-colors"
                            title="Poner en 0"
                          >
                            0
                          </button>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              )
            })}
          </div>

          {/* Estado Vacío */}
          {filteredProducts.length === 0 && (
            <div className="bg-white rounded-3xl border border-slate-200 p-12 text-center max-w-md mx-auto space-y-3">
              <Boxes className="w-10 h-10 text-slate-300 mx-auto" />
              <h3 className="font-extrabold text-slate-800 text-base">
                No hay productos con este filtro
              </h3>
              <p className="text-xs text-slate-500">
                Prueba buscando otro producto o seleccionando otra categoría.
              </p>
              <button
                type="button"
                onClick={() => {
                  setSearchTerm('')
                  setSelectedCategory('Todos')
                  setAuditFilter('all')
                }}
                className="px-4 py-2 rounded-xl bg-blue-600 text-white text-xs font-bold"
              >
                Ver todos los productos
              </button>
            </div>
          )}
        </div>
      )}

      {/* ============================================================== */}
      {/* VISTA 2: RESUMEN Y VALUACIÓN DE BODEGA                          */}
      {/* ============================================================== */}
      {activeTab === 'overview' && (
        <div className="space-y-6 animate-in fade-in duration-150">
          {/* Tarjetas KPI de Existencias y Dinero */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
            <div className="bg-white p-5 rounded-3xl border border-slate-200 shadow-2xs">
              <span className="text-[11px] font-bold uppercase tracking-wider text-slate-400 block mb-1">
                Piezas Contadas
              </span>
              <div className="text-3xl font-black text-slate-900 tracking-tight">
                {stats.totalPieces.toLocaleString('es-MX')}
              </div>
              <span className="text-xs text-slate-500 block mt-1">
                en {stats.countedProductsCount} productos con stock
              </span>
            </div>

            <div className="bg-white p-5 rounded-3xl border border-slate-200 shadow-2xs">
              <span className="text-[11px] font-bold uppercase tracking-wider text-emerald-700 block mb-1">
                Productos con Stock
              </span>
              <div className="text-3xl font-black text-emerald-700 tracking-tight">
                {stats.countedProductsCount} <span className="text-sm text-slate-400 font-semibold">/ {products.length}</span>
              </div>
              <span className="text-xs text-slate-500 block mt-1">
                ({stats.progressPercent}% del catálogo registrado)
              </span>
            </div>

            <div className="bg-white p-5 rounded-3xl border border-slate-200 shadow-2xs">
              <span className="text-[11px] font-bold uppercase tracking-wider text-blue-700 block mb-1">
                Inversión en Bodega
              </span>
              <div className="text-2xl sm:text-3xl font-black text-blue-900 tracking-tight">
                {formatCurrency(stats.totalCostValue)}
              </div>
              <span className="text-xs text-slate-400 block mt-1">
                Valuado a Costo Empleado
              </span>
            </div>

            <div className="bg-gradient-to-br from-blue-950 to-slate-900 text-white p-5 rounded-3xl shadow-md">
              <span className="text-[11px] font-bold uppercase tracking-wider text-cyan-300 block mb-1">
                Valor Comercial Venta
              </span>
              <div className="text-2xl sm:text-3xl font-black text-white tracking-tight">
                {formatCurrency(stats.totalPriceValue)}
              </div>
              <span className="text-xs text-slate-300 block mt-1">
                A Precio Oficial al Público
              </span>
            </div>
          </div>

          {/* Acciones de Resumen */}
          <div className="bg-white p-5 rounded-3xl border border-slate-200 shadow-2xs flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="space-y-0.5">
              <h3 className="font-extrabold text-slate-900 text-sm">
                Compartir o Exportar Inventario Físico
              </h3>
              <p className="text-xs text-slate-500">
                Envía por WhatsApp el reporte completo con los artículos contados y sus cantidades.
              </p>
            </div>

            <div className="flex items-center gap-2 w-full sm:w-auto">
              <button
                type="button"
                onClick={handleCopyReport}
                className="flex-1 sm:flex-none flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold shadow-sm transition-colors"
              >
                <Share2 className="w-4 h-4" />
                <span>Copiar para WhatsApp</span>
              </button>

              <button
                type="button"
                onClick={() => setConfirmResetOpen(true)}
                className="flex items-center justify-center gap-1.5 px-3 py-2.5 rounded-xl border border-slate-300 hover:bg-slate-50 text-slate-600 text-xs font-semibold transition-colors"
                title="Reiniciar todo a 0 piezas"
              >
                <RotateCcw className="w-3.5 h-3.5" />
                <span>Reiniciar a 0</span>
              </button>
            </div>
          </div>

          {/* Lista de Existencias Actuales */}
          <div className="bg-white rounded-3xl border border-slate-200 overflow-hidden shadow-2xs">
            <div className="p-4 bg-slate-50 border-b border-slate-200 flex items-center justify-between text-xs font-bold text-slate-700">
              <span>Listado de Artículos con Existencia ({stats.countedProductsCount})</span>
              <span className="text-slate-400">Descuento automático con cada recibo</span>
            </div>

            <div className="divide-y divide-slate-100">
              {products
                .filter((p) => (p.stock || 0) > 0)
                .map((p) => (
                  <div
                    key={p.id}
                    className="p-4 flex items-center justify-between gap-3 hover:bg-slate-50/60 transition-colors"
                  >
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="font-mono text-xs font-extrabold text-slate-700 bg-slate-100 px-2 py-0.5 rounded">
                          {p.sku}
                        </span>
                        <span className="text-xs text-slate-400 font-bold uppercase">
                          {p.category}
                        </span>
                      </div>
                      <h4 className="font-bold text-slate-900 text-sm mt-1">
                        {p.name}
                      </h4>
                      <span className="text-xs text-slate-500">
                        {p.presentation} &bull; Costo: {formatCurrency(p.cost)} &bull; Venta: {formatCurrency(p.price)}
                      </span>
                    </div>

                    <div className="text-right">
                      <span className="font-mono text-xl font-black text-emerald-700">
                        {p.stock}
                      </span>
                      <span className="text-xs text-slate-400 block font-medium">piezas</span>
                    </div>
                  </div>
                ))}

              {stats.countedProductsCount === 0 && (
                <div className="p-12 text-center text-slate-400 space-y-2">
                  <p className="text-sm font-semibold text-slate-600">
                    Aún no se ha registrado ningún producto con existencia.
                  </p>
                  <button
                    type="button"
                    onClick={() => setActiveTab('audit')}
                    className="px-4 py-2 rounded-xl bg-blue-600 text-white text-xs font-bold"
                  >
                    Ir a "Hacer Inventario"
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      )}

      {/* Modal de Confirmación para Reiniciar a 0 */}
      {confirmResetOpen && (
        <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4 animate-in fade-in duration-150">
          <div className="bg-white rounded-3xl max-w-md w-full p-6 shadow-2xl space-y-4 border border-slate-200">
            <div className="w-12 h-12 rounded-2xl bg-amber-100 text-amber-700 flex items-center justify-center mx-auto">
              <RotateCcw className="w-6 h-6" />
            </div>

            <div className="text-center space-y-1">
              <h3 className="font-extrabold text-slate-900 text-lg">
                ¿Poner todo el inventario en 0?
              </h3>
              <p className="text-xs text-slate-500">
                Esta acción restablece la existencia de todos los productos a 0 piezas para comenzar un conteo nuevo desde cero.
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
