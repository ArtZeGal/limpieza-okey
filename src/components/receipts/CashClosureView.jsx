import { useState, useMemo } from 'react'
import {
  Calendar,
  DollarSign,
  TrendingUp,
  Receipt,
  Eye,
  EyeOff,
  Share2,
  Copy,
  Package,
  CheckCircle2,
  Clock,
  ArrowRight,
  Sparkles,
  BarChart3
} from 'lucide-react'
import { formatCurrency, formatPercentage } from '../../utils/formatters'
import { useApp } from '../../context/AppContext'

export default function CashClosureView() {
  const { receipts, products, showToast } = useApp()

  // Filtro de rango de fechas
  const [rangePreset, setRangePreset] = useState('month') // 'today' | 'week' | 'month' | 'all' | 'custom'
  const [showProfits, setShowProfits] = useState(true)

  // Fechas por defecto
  const today = new Date()
  const todayStr = today.toISOString().split('T')[0]

  const firstDayOfMonth = new Date(today.getFullYear(), today.getMonth(), 1)
  const firstDayStr = firstDayOfMonth.toISOString().split('T')[0]

  const [customStartDate, setCustomStartDate] = useState(firstDayStr)
  const [customEndDate, setCustomEndDate] = useState(todayStr)

  // Función para parsear cualquier fecha de recibo a objeto Date normalizado
  const parseReceiptDate = (receipt) => {
    if (receipt.createdAt) {
      const d = new Date(receipt.createdAt)
      if (!isNaN(d.getTime())) return d
    }
    if (receipt.date) {
      if (receipt.date.includes('/')) {
        const [day, month, year] = receipt.date.split('/')
        return new Date(Number(year), Number(month) - 1, Number(day))
      }
      const d = new Date(receipt.date)
      if (!isNaN(d.getTime())) return d
    }
    return new Date(2026, 8, 1) // default fallback
  }

  // Rango activo de fechas
  const activeDateRange = useMemo(() => {
    const now = new Date()
    const startOfToday = new Date(now.getFullYear(), now.getMonth(), now.getDate(), 0, 0, 0)
    const endOfToday = new Date(now.getFullYear(), now.getMonth(), now.getDate(), 23, 59, 59)

    if (rangePreset === 'today') {
      return { start: startOfToday, end: endOfToday, label: 'Hoy' }
    }

    if (rangePreset === 'week') {
      const startOfWeek = new Date(now)
      const day = startOfWeek.getDay() || 7
      startOfWeek.setDate(startOfWeek.getDate() - day + 1)
      startOfWeek.setHours(0, 0, 0, 0)
      return { start: startOfWeek, end: endOfToday, label: 'Esta Semana' }
    }

    if (rangePreset === 'month') {
      const startOfMonth = new Date(now.getFullYear(), now.getMonth(), 1, 0, 0, 0)
      return { start: startOfMonth, end: endOfToday, label: 'Este Mes' }
    }

    if (rangePreset === 'all') {
      return { start: new Date(2025, 0, 1), end: endOfToday, label: 'Todo el Histórico' }
    }

    // Custom
    const start = customStartDate ? new Date(customStartDate + 'T00:00:00') : new Date(2025, 0, 1)
    const end = customEndDate ? new Date(customEndDate + 'T23:59:59') : endOfToday
    return {
      start,
      end,
      label: `${customStartDate || 'Inicio'} al ${customEndDate || 'Fin'}`
    }
  }, [rangePreset, customStartDate, customEndDate])

  // Filtrar recibos en el rango
  const periodReceipts = useMemo(() => {
    return (receipts || []).filter((r) => {
      const d = parseReceiptDate(r)
      return d >= activeDateRange.start && d <= activeDateRange.end
    })
  }, [receipts, activeDateRange])

  // Cálculos financieros del periodo
  const stats = useMemo(() => {
    let totalSales = 0
    let totalCost = 0
    let totalCollected = 0
    let totalPending = 0
    const productSalesMap = {}

    periodReceipts.forEach((r) => {
      totalSales += Number(r.total) || 0
      totalCollected += Number(r.downPayment) || (r.isFullyPaid ? Number(r.total) || 0 : 0)
      totalPending += Number(r.pendingBalance) || 0

      // Calcular costo de cada producto vendido
      if (Array.isArray(r.items)) {
        r.items.forEach((it) => {
          const qty = Number(it.quantity) || 1
          const matchProduct = products.find(
            (p) =>
              (it.productId && p.id === it.productId) ||
              (it.sku && p.sku && p.sku === it.sku) ||
              (it.name && p.name && p.name.trim().toLowerCase() === it.name.trim().toLowerCase())
          )

          // Costo unitario: si está en catálogo usar su cost oficial, sino estimar 55%
          const unitCost = matchProduct?.cost ?? (Number(it.price) * 0.55 || 0)
          totalCost += unitCost * qty

          // Acumular ranking de productos
          const pName = it.name || 'Producto sin nombre'
          if (!productSalesMap[pName]) {
            productSalesMap[pName] = { name: pName, quantity: 0, revenue: 0 }
          }
          productSalesMap[pName].quantity += qty
          productSalesMap[pName].revenue += (Number(it.price) || 0) * qty
        })
      }
    })

    const grossProfit = Math.max(0, totalSales - totalCost)
    const profitMargin = totalSales > 0 ? (grossProfit / totalSales) * 100 : 0
    const averageTicket = periodReceipts.length > 0 ? totalSales / periodReceipts.length : 0

    // Top productos ordenados por cantidad vendida
    const topProducts = Object.values(productSalesMap)
      .sort((a, b) => b.quantity - a.quantity)
      .slice(0, 5)

    return {
      totalSales,
      totalCost,
      grossProfit,
      profitMargin,
      totalCollected,
      totalPending,
      averageTicket,
      topProducts,
    }
  }, [periodReceipts, products])

  // Copiar o Enviar Reporte de Cierre por WhatsApp
  const handleShareClosure = () => {
    const text = `📊 *CIERRE DE CAJA & RESULTADOS OKEY*
🗓️ *Periodo:* ${activeDateRange.label}
🧾 *Órdenes Emitidas:* ${periodReceipts.length} pedidos

💵 *Ventas Totales:* ${formatCurrency(stats.totalSales)}
🏷️ *Costo Mercancía (OKEY):* ${formatCurrency(stats.totalCost)}
💎 *Ganancia Bruta:* *${formatCurrency(stats.grossProfit)}* (${stats.profitMargin.toFixed(1)}% margen)
🎯 *Ticket Promedio:* ${formatCurrency(stats.averageTicket)}

💰 *ESTATUS DE COBRANZA:*
• Cobrado / Anticipos: ${formatCurrency(stats.totalCollected)}
• Saldo por Cobrar: ${formatCurrency(stats.totalPending)}

${
  stats.topProducts.length > 0
    ? `⭐ *TOP PRODUCTOS MÁS VENDIDOS:*\n` +
      stats.topProducts.map((p, idx) => `  ${idx + 1}. ${p.name}: ${p.quantity} pzas (${formatCurrency(p.revenue)})`).join('\n')
    : ''
}

_Generado automáticamente con Limpieza OKEY · limpieza-okey.vercel.app_`

    const url = `https://wa.me/?text=${encodeURI(text)}`
    window.open(url, '_blank')
  }

  const handleCopySummary = async () => {
    const summary = `CIERRE DE CAJA LIMPIEZA OKEY (${activeDateRange.label})
Ventas: ${formatCurrency(stats.totalSales)}
Costo Mercancía: ${formatCurrency(stats.totalCost)}
Ganancia: ${formatCurrency(stats.grossProfit)} (${stats.profitMargin.toFixed(1)}%)
Órdenes: ${periodReceipts.length} | Ticket Promedio: ${formatCurrency(stats.averageTicket)}`

    try {
      await navigator.clipboard.writeText(summary)
      showToast('¡Resumen de caja copiado al portapapeles!', 'success')
    } catch {
      showToast('No se pudo copiar el resumen', 'error')
    }
  }

  return (
    <div className="space-y-6 animate-fadeIn">
      {/* Controles de Rango de Fechas */}
      <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-xs space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div>
            <div className="flex items-center gap-2">
              <h2 className="text-base sm:text-lg font-black text-slate-900 tracking-tight">
                Cierre de Caja y Ganancia Neta
              </h2>
              <span className="text-xs font-bold px-2.5 py-0.5 rounded-full bg-emerald-100 text-emerald-800">
                {periodReceipts.length} órdenes en periodo
              </span>
            </div>
            <p className="text-xs text-slate-500 mt-0.5">
              Consulta las ventas, costo de empleado OKEY y margen neto obtenido en cualquier periodo.
            </p>
          </div>

          {/* Toggle de Privacidad (Ocultar/Ver Ganancia) */}
          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={() => setShowProfits(!showProfits)}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-bold border border-slate-300 bg-slate-50 hover:bg-slate-100 text-slate-700 transition-colors shadow-2xs"
              title="Oculta o muestra las cifras de utilidad por si estás frente a un cliente"
            >
              {showProfits ? (
                <>
                  <EyeOff className="w-3.5 h-3.5 text-slate-500" />
                  <span>Ocultar Utilidad</span>
                </>
              ) : (
                <>
                  <Eye className="w-3.5 h-3.5 text-blue-600" />
                  <span>Ver Utilidad</span>
                </>
              )}
            </button>

            <button
              type="button"
              onClick={handleShareClosure}
              className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl text-xs font-bold bg-emerald-600 hover:bg-emerald-700 text-white shadow-2xs transition-all"
            >
              <Share2 className="w-3.5 h-3.5" />
              <span>Enviar Reporte</span>
            </button>
          </div>
        </div>

        {/* Selector de Rangos */}
        <div className="flex flex-wrap items-center gap-1.5 text-xs">
          {[
            { id: 'today', label: 'Hoy' },
            { id: 'week', label: 'Esta Semana' },
            { id: 'month', label: 'Este Mes' },
            { id: 'all', label: 'Todo el Histórico' },
            { id: 'custom', label: 'Personalizado' },
          ].map((preset) => (
            <button
              key={preset.id}
              type="button"
              onClick={() => setRangePreset(preset.id)}
              className={`px-3 py-1.5 rounded-xl font-bold transition-all ${
                rangePreset === preset.id
                  ? 'bg-slate-900 text-white shadow-xs'
                  : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
              }`}
            >
              {preset.label}
            </button>
          ))}
        </div>

        {/* Inputs de fecha para rango personalizado */}
        {rangePreset === 'custom' && (
          <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200 flex flex-wrap items-center gap-3 text-xs animate-fadeIn">
            <div className="flex items-center gap-2">
              <span className="font-bold text-slate-600">Desde:</span>
              <input
                type="date"
                value={customStartDate}
                onChange={(e) => setCustomStartDate(e.target.value)}
                className="px-3 py-1.5 bg-white border border-slate-300 rounded-lg font-semibold text-slate-800"
              />
            </div>
            <div className="flex items-center gap-2">
              <span className="font-bold text-slate-600">Hasta:</span>
              <input
                type="date"
                value={customEndDate}
                onChange={(e) => setCustomEndDate(e.target.value)}
                className="px-3 py-1.5 bg-white border border-slate-300 rounded-lg font-semibold text-slate-800"
              />
            </div>
          </div>
        )}
      </div>

      {/* Grid de 4 Métricas Principales */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* 1. Ventas Totales */}
        <div className="p-5 rounded-2xl bg-white border border-slate-200 shadow-xs space-y-1">
          <span className="text-[11px] font-bold text-slate-500 uppercase tracking-wider block">
            Ventas Totales Cobradas
          </span>
          <div className="text-2xl sm:text-3xl font-black text-slate-900">
            {formatCurrency(stats.totalSales)}
          </div>
          <span className="text-[11px] text-slate-500 block">
            {periodReceipts.length} recibos emitidos en {activeDateRange.label}
          </span>
        </div>

        {/* 2. Costo de Mercancía */}
        <div className="p-5 rounded-2xl bg-white border border-slate-200 shadow-xs space-y-1">
          <span className="text-[11px] font-bold text-slate-500 uppercase tracking-wider block">
            Costo de Mercancía (OKEY)
          </span>
          <div className="text-2xl sm:text-3xl font-black text-slate-700">
            {showProfits ? formatCurrency(stats.totalCost) : '••••••'}
          </div>
          <span className="text-[11px] text-slate-500 block">
            Valuado a tu Precio de Empleado
          </span>
        </div>

        {/* 3. Ganancia Bruta en Bolsillo */}
        <div className="p-5 rounded-2xl bg-gradient-to-br from-emerald-500 to-teal-600 text-white shadow-md space-y-1 relative overflow-hidden">
          <span className="text-[11px] font-bold text-emerald-100 uppercase tracking-wider block">
            Ganancia Bruta Neta
          </span>
          <div className="text-2xl sm:text-3xl font-black text-white">
            {showProfits ? formatCurrency(stats.grossProfit) : '••••••'}
          </div>
          <span className="text-[11px] text-emerald-100 font-bold block">
            {showProfits ? `¡${stats.profitMargin.toFixed(1)}% de margen comercial!` : 'Margen oculto'}
          </span>
        </div>

        {/* 4. Ticket Promedio */}
        <div className="p-5 rounded-2xl bg-white border border-slate-200 shadow-xs space-y-1">
          <span className="text-[11px] font-bold text-slate-500 uppercase tracking-wider block">
            Ticket Promedio por Orden
          </span>
          <div className="text-2xl sm:text-3xl font-black text-blue-700">
            {formatCurrency(stats.averageTicket)}
          </div>
          <span className="text-[11px] text-slate-500 block">
            Cobrado: {formatCurrency(stats.totalCollected)}
          </span>
        </div>
      </div>

      {/* Top 5 Productos y Resumen de Cobranza */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Top 5 Productos */}
        <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-xs space-y-3">
          <div className="flex items-center justify-between border-b border-slate-100 pb-3">
            <h3 className="text-xs font-black text-slate-900 uppercase tracking-wider flex items-center gap-1.5">
              <Sparkles className="w-4 h-4 text-amber-500" />
              <span>Productos Más Vendidos en el Periodo</span>
            </h3>
            <span className="text-[11px] text-slate-500 font-bold">Por Unidades</span>
          </div>

          {stats.topProducts.length > 0 ? (
            <div className="divide-y divide-slate-100 text-xs">
              {stats.topProducts.map((p, idx) => (
                <div key={idx} className="py-2.5 flex items-center justify-between gap-2">
                  <div className="flex items-center gap-2 min-w-0">
                    <span className="w-5 h-5 rounded-full bg-slate-100 text-slate-700 font-bold text-[10px] flex items-center justify-center shrink-0">
                      {idx + 1}
                    </span>
                    <span className="font-extrabold text-slate-800 truncate" title={p.name}>
                      {p.name}
                    </span>
                  </div>
                  <div className="text-right shrink-0">
                    <span className="font-black text-slate-900 block">
                      {p.quantity} pza(s)
                    </span>
                    <span className="text-[10px] text-slate-500 block">
                      {formatCurrency(p.revenue)}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-xs text-slate-400 italic py-4 text-center">
              No hay productos registrados en este rango de fechas.
            </p>
          )}
        </div>

        {/* Resumen de Cobranza & Anticipos */}
        <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-xs space-y-3">
          <div className="flex items-center justify-between border-b border-slate-100 pb-3">
            <h3 className="text-xs font-black text-slate-900 uppercase tracking-wider flex items-center gap-1.5">
              <DollarSign className="w-4 h-4 text-emerald-600" />
              <span>Balance de Cobranza</span>
            </h3>
            <button
              type="button"
              onClick={handleCopySummary}
              className="text-[11px] text-blue-600 hover:text-blue-800 font-bold flex items-center gap-1"
            >
              <Copy className="w-3 h-3" />
              <span>Copiar</span>
            </button>
          </div>

          <div className="space-y-2.5 text-xs">
            <div className="p-3 rounded-xl bg-slate-50 flex items-center justify-between">
              <span className="text-slate-600 font-medium">Cobrado en efectivo / transferencia:</span>
              <span className="font-black text-slate-900 text-sm">
                {formatCurrency(stats.totalCollected)}
              </span>
            </div>

            <div className="p-3 rounded-xl bg-amber-50/80 border border-amber-200/60 flex items-center justify-between">
              <span className="text-amber-900 font-medium">Saldos pendientes contra entrega:</span>
              <span className="font-black text-amber-900 text-sm">
                {formatCurrency(stats.totalPending)}
              </span>
            </div>

            <div className="p-3 rounded-xl bg-emerald-50/80 border border-emerald-200/60 flex items-center justify-between">
              <span className="text-emerald-900 font-bold">Ventas Totales Proyectadas:</span>
              <span className="font-black text-emerald-950 text-base">
                {formatCurrency(stats.totalSales)}
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Tabla Detallada de Órdenes del Periodo */}
      <div className="bg-white rounded-2xl border border-slate-200 shadow-xs overflow-hidden">
        <div className="p-4 sm:p-5 border-b border-slate-100 flex items-center justify-between">
          <h3 className="text-xs sm:text-sm font-black text-slate-900 uppercase tracking-wider">
            Detalle de Recibos Emitidos en el Periodo ({periodReceipts.length})
          </h3>
        </div>

        {periodReceipts.length > 0 ? (
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead className="bg-slate-50 border-b border-slate-200 text-slate-500 font-bold text-[11px]">
                <tr>
                  <th className="py-3 px-4">Folio</th>
                  <th className="py-3 px-4">Fecha</th>
                  <th className="py-3 px-4">Cliente</th>
                  <th className="py-3 px-4">Artículos</th>
                  <th className="py-3 px-4 text-right">Total</th>
                  {showProfits && <th className="py-3 px-4 text-right">Ganancia</th>}
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {periodReceipts.map((r) => {
                  let orderCost = 0
                  if (Array.isArray(r.items)) {
                    r.items.forEach((it) => {
                      const matchP = products.find(
                        (p) => (it.productId && p.id === it.productId) || (it.sku && p.sku === it.sku)
                      )
                      const cost = matchP?.cost ?? (Number(it.price) * 0.55 || 0)
                      orderCost += cost * (Number(it.quantity) || 1)
                    })
                  }
                  const orderProfit = Math.max(0, (Number(r.total) || 0) - orderCost)

                  return (
                    <tr key={r.id || r.folio} className="hover:bg-slate-50 transition-colors">
                      <td className="py-3 px-4 font-mono font-bold text-blue-700">
                        {r.folio}
                      </td>
                      <td className="py-3 px-4 text-slate-600">
                        {r.date}
                      </td>
                      <td className="py-3 px-4 font-bold text-slate-900">
                        {r.customerName || 'Cliente Mostrador'}
                      </td>
                      <td className="py-3 px-4 text-slate-600">
                        {Array.isArray(r.items)
                          ? r.items.map((it) => `${it.quantity}x ${it.name}`).join(', ')
                          : '1 orden'}
                      </td>
                      <td className="py-3 px-4 font-black text-slate-900 text-right">
                        {formatCurrency(r.total)}
                      </td>
                      {showProfits && (
                        <td className="py-3 px-4 font-bold text-emerald-700 text-right">
                          +{formatCurrency(orderProfit)}
                        </td>
                      )}
                    </tr>
                  )
                })}
              </tbody>
            </table>
          </div>
        ) : (
          <div className="p-8 text-center text-xs text-slate-400">
            No se emitieron recibos en el periodo seleccionado.
          </div>
        )}
      </div>
    </div>
  )
}
