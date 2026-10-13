import { useState, useMemo } from 'react'
import {
  Receipt,
  MessageCircle,
  Download,
  Calendar,
  User,
  DollarSign,
  CheckCircle2,
  AlertCircle,
  ArrowRight,
  History,
  PlusCircle,
  Copy,
  Trash2,
  FileCheck,
  Search,
  ShoppingCart,
  Sparkles
} from 'lucide-react'
import { useApp } from '../../context/AppContext'
import { formatCurrency } from '../../utils/formatters'
import ReceiptCanvasPreview from './ReceiptCanvasPreview'
import BBVAInfoCard from './BBVAInfoCard'
import CashClosureView from './CashClosureView'

export default function ReceiptsView() {
  const {
    cart,
    cartSubtotal,
    orderTotal,
    effectiveShippingCost,
    downPaymentAmount,
    pendingBalance,
    isFullyPaid,
    quoteParams,
    selectedCustomer,
    nextFolio,
    receipts,
    saveReceipt,
    deleteReceipt,
    setActiveTab,
    showToast,
  } = useApp()

  const [activeTab, setActiveTabState] = useState('create') // 'create' | 'history'
  const [historySearch, setHistorySearch] = useState('')

  // Formulario de emisión del recibo
  const [formData, setFormData] = useState({
    folio: nextFolio,
    date: new Date().toLocaleDateString('es-MX', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
    }),
    customerName: selectedCustomer ? selectedCustomer.name : 'Cliente Mostrador',
    customerPhone: selectedCustomer ? selectedCustomer.whatsapp : '',
    deliveryAddress: selectedCustomer ? selectedCustomer.address : '',
    notes: quoteParams.notes || '',
  })

  // Sincronizar folio o cliente cuando cambian
  useMemo(() => {
    if (selectedCustomer) {
      setFormData((prev) => ({
        ...prev,
        customerName: selectedCustomer.name,
        customerPhone: selectedCustomer.whatsapp,
        deliveryAddress: selectedCustomer.address,
      }))
    }
  }, [selectedCustomer])

  // Datos estructurados para renderizar en la plantilla canvas
  const currentReceiptData = useMemo(() => {
    const items = cart.map((item) => ({
      productId: item.product.id,
      sku: item.product.sku,
      name: item.product.name,
      quantity: item.quantity,
      price: item.product.price,
      presentation: item.product.presentation,
      gift: item.product.suggestedGift,
    }))

    return {
      folio: formData.folio || nextFolio,
      date: formData.date,
      customerName: formData.customerName,
      customerPhone: formData.customerPhone,
      deliveryAddress: formData.deliveryAddress,
      items,
      subtotal: cartSubtotal,
      shippingCost: effectiveShippingCost,
      discount: Number(quoteParams.discount) || 0,
      total: orderTotal,
      downPayment: downPaymentAmount,
      pendingBalance: pendingBalance,
      isFullyPaid,
      notes: formData.notes,
      customerId: selectedCustomer?.id || null,
    }
  }, [
    formData,
    cart,
    cartSubtotal,
    effectiveShippingCost,
    quoteParams.discount,
    orderTotal,
    downPaymentAmount,
    pendingBalance,
    isFullyPaid,
    nextFolio,
    selectedCustomer,
  ])

  // Enviar mensaje estructurado por WhatsApp
  const handleSendWhatsApp = (receiptToUse = currentReceiptData) => {
    const phone = receiptToUse.customerPhone?.replace(/\D/g, '') || ''

    let msg = `🧼 *RECIBO OFICIAL - LIMPIEZA OKEY*\n`
    msg += `🧾 *Folio:* ${receiptToUse.folio}\n`
    msg += `📅 *Fecha:* ${receiptToUse.date}\n`
    msg += `👤 *Cliente:* ${receiptToUse.customerName}\n`

    if (receiptToUse.deliveryAddress) {
      msg += `📍 *Dirección de Entrega:* ${receiptToUse.deliveryAddress}\n`
    }

    msg += `------------------------------------\n`
    msg += `📦 *DETALLE DE TU PEDIDO:*\n`

    if (receiptToUse.items && receiptToUse.items.length > 0) {
      receiptToUse.items.forEach((it) => {
        msg += `• ${it.quantity}x ${it.name} - ${formatCurrency(it.quantity * it.price)}\n`
        if (it.gift) {
          msg += `  🎁 _Regalo incluido: ${it.gift}_\n`
        }
      })
    } else {
      msg += `• Pedido de productos y paquetes de limpieza OKEY\n`
    }

    msg += `------------------------------------\n`
    msg += `💵 *Subtotal:* ${formatCurrency(receiptToUse.subtotal)}\n`

    if (receiptToUse.shippingCost === 0) {
      msg += `🚚 *Envío:* ¡GRATIS! ($0.00)\n`
    } else {
      msg += `🚚 *Envío:* ${formatCurrency(receiptToUse.shippingCost)}\n`
    }

    if (receiptToUse.discount > 0) {
      msg += `🏷️ *Descuento:* -${formatCurrency(receiptToUse.discount)}\n`
    }

    msg += `⭐ *TOTAL:* ${formatCurrency(receiptToUse.total)}\n`

    if (receiptToUse.downPayment > 0) {
      msg += `💰 *Anticipo recibido:* ${formatCurrency(receiptToUse.downPayment)}\n`
      if (receiptToUse.pendingBalance > 0) {
        msg += `⚠️ *Saldo contra entrega:* ${formatCurrency(receiptToUse.pendingBalance)}\n`
      } else {
        msg += `✅ *Estatus:* ¡Totalmente liquidado!\n`
      }
    } else {
      msg += `💳 *Pago:* Total a liquidar contra entrega\n`
    }

    msg += `------------------------------------\n`
    msg += `🏦 *DATOS DE TRANSFERENCIA BBVA:*\n`
    msg += `• *Banco:* BBVA\n`
    msg += `• *Titular:* Limpieza OKEY\n`
    msg += `• *Cuenta:* 048 673 9415\n`
    msg += `• *CLABE:* 012580004867394159\n`
    msg += `• *Tarjeta:* 4152 3143 1334 7307\n`
    msg += `------------------------------------\n`
    msg += `📎 _(Te adjuntamos también la imagen oficial de tu recibo con folio)_\n`
    msg += `*¡Muchas gracias por tu compra y confianza en Limpieza OKEY!* 🧼✨`

    const encoded = encodeURIComponent(msg)
    const url = phone ? `https://wa.me/52${phone}?text=${encoded}` : `https://wa.me/?text=${encoded}`

    window.open(url, '_blank')
    showToast('Abriendo WhatsApp con el recibo oficial formateado')
  }

  // Guardar en el historial
  const handleSaveToHistory = () => {
    saveReceipt(currentReceiptData)
    // Actualizar folio al siguiente consecutivo
    setFormData((prev) => ({
      ...prev,
      folio: nextFolio,
    }))
  }

  // Filtrado del historial
  const filteredHistory = useMemo(() => {
    if (!historySearch.trim()) return receipts
    const q = historySearch.toLowerCase().trim()
    return receipts.filter((r) => {
      const matchFolio = r.folio?.toLowerCase().includes(q)
      const matchName = r.customerName?.toLowerCase().includes(q)
      const matchPhone = r.customerPhone?.includes(q)
      const matchDate = r.date?.includes(q)
      return matchFolio || matchName || matchPhone || matchDate
    })
  }, [receipts, historySearch])

  return (
    <div className="space-y-6 animate-in fade-in duration-200">
      {/* Module Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 bg-white p-5 rounded-2xl border border-slate-200 shadow-xs">
        <div>
          <div className="flex items-center gap-2">
            <h1 className="text-xl sm:text-2xl font-black text-slate-900 tracking-tight">
              Generador de Recibos y Pedidos
            </h1>
            <span className="text-xs font-mono font-bold px-2.5 py-0.5 rounded-full bg-amber-100 text-amber-800">
              Plantilla Oficial 1024x1024
            </span>
          </div>
          <p className="text-xs text-slate-500 mt-1">
            Impresión y renderizado digital sobre la plantilla oficial de Limpieza OKEY, datos BBVA y envío por WhatsApp.
          </p>
        </div>

        {/* Tab Toggle */}
        <div className="flex items-center gap-1 bg-slate-100 p-1 rounded-xl border border-slate-200 text-xs font-bold">
          <button
            type="button"
            onClick={() => setActiveTabState('create')}
            className={`flex items-center gap-1.5 px-3.5 py-2 rounded-lg transition-all ${
              activeTab === 'create'
                ? 'bg-white text-blue-700 shadow-xs font-bold'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            <PlusCircle className="w-4 h-4" />
            <span>Emitir Recibo</span>
          </button>
          <button
            type="button"
            onClick={() => setActiveTabState('history')}
            className={`flex items-center gap-1.5 px-3.5 py-2 rounded-lg transition-all ${
              activeTab === 'history'
                ? 'bg-white text-blue-700 shadow-xs font-bold'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            <History className="w-4 h-4" />
            <span>Historial ({receipts.length})</span>
          </button>
          <button
            type="button"
            onClick={() => setActiveTabState('closure')}
            className={`flex items-center gap-1.5 px-3.5 py-2 rounded-lg transition-all ${
              activeTab === 'closure'
                ? 'bg-white text-emerald-700 shadow-xs font-bold'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            <DollarSign className="w-4 h-4 text-emerald-600" />
            <span>Cierre de Caja & Ganancia</span>
          </button>
        </div>
      </div>

      {activeTab === 'create' && (
        /* VISTA: EMITIR RECIBO */
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
          {/* Columna Izquierda: Datos y Formulario del Recibo (5 columnas) */}
          <div className="lg:col-span-5 space-y-4">
            {/* Tarjeta de Datos del Recibo */}
            <div className="bg-white rounded-3xl border border-slate-200/90 shadow-sm p-5 space-y-4">
              <div className="flex items-center justify-between pb-2 border-b border-slate-100">
                <span className="text-xs font-bold text-slate-800 uppercase tracking-wider flex items-center gap-1.5">
                  <Receipt className="w-4 h-4 text-blue-600" />
                  <span>Datos de la Nota de Venta</span>
                </span>
                <span className="text-[11px] font-bold text-blue-600">
                  {cart.length} productos en orden
                </span>
              </div>

              {/* Folio y Fecha */}
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">
                    Folio Oficial
                  </label>
                  <input
                    type="text"
                    value={formData.folio}
                    onChange={(e) => setFormData({ ...formData, folio: e.target.value })}
                    placeholder="OK-001"
                    className="w-full px-3 py-2 text-sm font-mono font-bold uppercase text-blue-800 bg-blue-50/50 border border-blue-200 rounded-xl outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">
                    Fecha de Emisión
                  </label>
                  <input
                    type="text"
                    value={formData.date}
                    onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                    className="w-full px-3 py-2 text-sm font-semibold border border-slate-300 rounded-xl outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
              </div>

              {/* Cliente */}
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  Nombre del Cliente *
                </label>
                <input
                  type="text"
                  value={formData.customerName}
                  onChange={(e) => setFormData({ ...formData, customerName: e.target.value })}
                  placeholder="Ej. Restaurante Los Compadres"
                  className="w-full px-3.5 py-2 text-sm font-bold border border-slate-300 rounded-xl outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">
                    WhatsApp para Envío
                  </label>
                  <input
                    type="tel"
                    value={formData.customerPhone}
                    onChange={(e) => setFormData({ ...formData, customerPhone: e.target.value })}
                    placeholder="55 1234 5678"
                    className="w-full px-3.5 py-2 text-sm font-semibold border border-slate-300 rounded-xl outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">
                    Dirección de Entrega
                  </label>
                  <input
                    type="text"
                    value={formData.deliveryAddress}
                    onChange={(e) => setFormData({ ...formData, deliveryAddress: e.target.value })}
                    placeholder="Colonia, calle..."
                    className="w-full px-3.5 py-2 text-sm border border-slate-300 rounded-xl outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
              </div>

              {/* Resumen Financiero en Vivo */}
              <div className="p-3.5 rounded-2xl bg-slate-50 border border-slate-200 text-xs space-y-1.5">
                <div className="flex justify-between text-slate-600">
                  <span>Subtotal Artículos:</span>
                  <strong className="text-slate-900">{formatCurrency(cartSubtotal)}</strong>
                </div>
                <div className="flex justify-between text-slate-600">
                  <span>Envío:</span>
                  <span className="font-bold text-emerald-700">
                    {effectiveShippingCost === 0 ? '¡Gratis!' : formatCurrency(effectiveShippingCost)}
                  </span>
                </div>
                <div className="flex justify-between text-slate-600">
                  <span>Anticipo Abonado:</span>
                  <strong className="text-blue-700">{formatCurrency(downPaymentAmount)}</strong>
                </div>
                <div className="flex justify-between text-slate-600">
                  <span>Saldo Contra Entrega:</span>
                  <strong className={pendingBalance > 0 ? 'text-amber-700 font-bold' : 'text-emerald-700 font-bold'}>
                    {pendingBalance > 0 ? formatCurrency(pendingBalance) : '¡Liquidado!'}
                  </strong>
                </div>
                <div className="pt-1.5 border-t border-slate-200 flex justify-between items-baseline">
                  <span className="font-bold text-slate-900 text-sm">Total Oficial:</span>
                  <span className="font-black text-slate-900 text-lg">{formatCurrency(orderTotal)}</span>
                </div>
              </div>

              {/* Botones de Envío y Guardado */}
              <div className="space-y-2 pt-1">
                {/* Botón WhatsApp */}
                <button
                  type="button"
                  onClick={() => handleSendWhatsApp(currentReceiptData)}
                  className="w-full py-3 px-4 rounded-xl font-bold text-xs sm:text-sm bg-emerald-600 hover:bg-emerald-700 text-white shadow-md shadow-emerald-500/20 transition-all flex items-center justify-center gap-2 active:scale-98"
                >
                  <MessageCircle className="w-4 h-4" />
                  <span>Enviar Recibo por WhatsApp</span>
                </button>

                {/* Botón Guardar en Historial */}
                <button
                  type="button"
                  onClick={handleSaveToHistory}
                  className="w-full py-2.5 px-4 rounded-xl font-semibold text-xs bg-slate-900 hover:bg-slate-800 text-white transition-colors flex items-center justify-center gap-2"
                >
                  <FileCheck className="w-4 h-4 text-cyan-400" />
                  <span>Guardar en Historial de Recibos</span>
                </button>
              </div>
            </div>

            {/* Datos Bancarios BBVA */}
            <BBVAInfoCard />
          </div>

          {/* Columna Derecha: Vista Previa Exacta sobre la Plantilla Oficial (7 columnas) */}
          <div className="lg:col-span-7">
            <ReceiptCanvasPreview receiptData={currentReceiptData} />
          </div>
        </div>
      )}

      {activeTab === 'history' && (
        /* VISTA: HISTORIAL DE RECIBOS EMITIDOS */
        <div className="space-y-4">
          {/* Buscador de Historial */}
          <div className="flex flex-col sm:flex-row gap-3">
            <div className="relative flex-1">
              <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-3" />
              <input
                type="text"
                value={historySearch}
                onChange={(e) => setHistorySearch(e.target.value)}
                placeholder="Buscar en historial por Folio (OK-001), Cliente o Fecha..."
                className="w-full pl-10 pr-4 py-2.5 text-xs sm:text-sm bg-white border border-slate-300 rounded-xl focus:ring-2 focus:ring-blue-500 outline-none"
              />
            </div>
            {historySearch && (
              <button
                type="button"
                onClick={() => setHistorySearch('')}
                className="px-3 py-2 rounded-xl text-xs font-semibold text-slate-500 hover:text-slate-800 bg-white border border-slate-200"
              >
                Limpiar
              </button>
            )}
          </div>

          {/* Lista de Recibos Guardados */}
          {filteredHistory.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {filteredHistory.map((rec) => (
                <div
                  key={rec.id}
                  className="bg-white rounded-2xl border border-slate-200/90 p-5 shadow-xs flex flex-col justify-between space-y-3 hover:shadow-md transition-shadow"
                >
                  <div>
                    <div className="flex items-center justify-between gap-2">
                      <span className="font-mono font-black text-sm text-blue-700 bg-blue-50 px-2.5 py-0.5 rounded-lg border border-blue-200">
                        {rec.folio}
                      </span>
                      <span className="text-xs text-slate-400 font-medium">
                        {rec.date}
                      </span>
                    </div>

                    <h4 className="font-extrabold text-slate-900 text-sm mt-2 leading-snug">
                      {rec.customerName}
                    </h4>
                    {rec.customerPhone && (
                      <span className="text-xs text-slate-500 block mt-0.5">
                        WhatsApp: {rec.customerPhone}
                      </span>
                    )}

                    <div className="mt-3 p-3 rounded-xl bg-slate-50 border border-slate-100 text-xs space-y-1">
                      <div className="flex justify-between">
                        <span className="text-slate-500">Total:</span>
                        <strong className="text-slate-900">{formatCurrency(rec.total)}</strong>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-slate-500">Anticipo:</span>
                        <strong className="text-blue-700">{formatCurrency(rec.downPayment)}</strong>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-slate-500">Saldo:</span>
                        <span className={`font-bold ${rec.pendingBalance > 0 ? 'text-amber-700' : 'text-emerald-700'}`}>
                          {rec.pendingBalance > 0 ? formatCurrency(rec.pendingBalance) : '¡Liquidado!'}
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Acciones */}
                  <div className="pt-2 border-t border-slate-100 flex items-center justify-between gap-2">
                    <button
                      type="button"
                      onClick={() => handleSendWhatsApp(rec)}
                      className="flex-1 py-1.5 px-3 rounded-xl bg-emerald-50 hover:bg-emerald-100 text-emerald-800 font-bold text-xs border border-emerald-200 transition-colors flex items-center justify-center gap-1.5"
                    >
                      <MessageCircle className="w-3.5 h-3.5 text-emerald-600" />
                      <span>WhatsApp</span>
                    </button>
                    <button
                      type="button"
                      onClick={() => {
                        if (window.confirm(`¿Eliminar el recibo ${rec.folio} del historial?`)) {
                          deleteReceipt(rec.id)
                        }
                      }}
                      className="p-2 text-slate-400 hover:text-rose-600 hover:bg-rose-50 rounded-xl transition-colors"
                      title="Eliminar recibo"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-16 px-4 bg-white rounded-3xl border border-slate-200 max-w-md mx-auto space-y-3">
              <div className="w-12 h-12 rounded-2xl bg-slate-100 text-slate-400 mx-auto flex items-center justify-center">
                <Receipt className="w-6 h-6" />
              </div>
              <h3 className="font-bold text-slate-800 text-sm">
                No hay recibos en el historial
              </h3>
              <p className="text-xs text-slate-500">
                Los recibos que emitas y guardes aparecerán aquí con su folio consecutivo.
              </p>
              <button
                type="button"
                onClick={() => setActiveTabState('create')}
                className="px-4 py-2 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs"
              >
                Emitir primer recibo
              </button>
            </div>
          )}
        </div>
      )}

      {/* VISTA: CIERRE DE CAJA & GANANCIA */}
      {activeTab === 'closure' && (
        <CashClosureView />
      )}
    </div>
  )
}
