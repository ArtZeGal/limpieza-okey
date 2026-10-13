import { useState } from 'react'
import {
  Truck,
  Store,
  DollarSign,
  Tag,
  Copy,
  Check,
  ArrowRight,
  Gift,
  AlertCircle,
  CheckCircle2,
  FileText,
  Sparkles
} from 'lucide-react'
import { formatCurrency, formatPercentage } from '../../utils/formatters'
import { useApp } from '../../context/AppContext'

export default function QuotationSummary() {
  const {
    cart,
    cartSubtotal,
    orderTotal,
    quoteParams,
    updateQuoteParam,
    effectiveShippingCost,
    hasFreeShipping,
    downPaymentAmount,
    pendingBalance,
    isFullyPaid,
    accumulatedGifts,
    setActiveTab,
    showToast,
  } = useApp()

  const [copied, setCopied] = useState(false)
  const [showDiscountInput, setShowDiscountInput] = useState(Boolean(quoteParams.discount))

  // Botones de porcentaje de anticipo rápido
  const handleQuickDownPayment = (percentage) => {
    if (percentage === 0) {
      updateQuoteParam('downPayment', '')
    } else {
      const calculated = Math.round((orderTotal * percentage) / 100)
      updateQuoteParam('downPayment', calculated.toString())
    }
  }

  // Generar texto para compartir por WhatsApp o copiar al portapapeles
  const handleCopyQuoteText = () => {
    if (cart.length === 0) return

    const dateStr = new Date().toLocaleDateString('es-MX', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
    })

    let text = `🧼 *COTIZACIÓN LIMPIEZA OKEY*\n`
    text += `📅 Fecha: ${dateStr}\n`
    text += `--------------------------------\n`
    text += `📦 *PRODUCTOS Y PAQUETES:*\n`

    cart.forEach((item) => {
      text += `• ${item.quantity}x ${item.product.name} (${item.product.presentation}) - ${formatCurrency(
        item.quantity * item.product.price
      )}\n`
      if (item.product.suggestedGift) {
        text += `  🎁 _Regalo: ${item.product.suggestedGift}_\n`
      }
    })

    text += `--------------------------------\n`
    text += `💵 *Subtotal:* ${formatCurrency(cartSubtotal)}\n`

    if (quoteParams.shippingType === 'delivery') {
      text += hasFreeShipping
        ? `🚚 *Envío a Domicilio:* ¡GRATIS! ($0.00)\n`
        : `🚚 *Envío a Domicilio:* ${formatCurrency(effectiveShippingCost)}\n`
    } else {
      text += `🏬 *Entrega:* Recolección en Sucursal / Mostrador ($0.00)\n`
    }

    if (Number(quoteParams.discount) > 0) {
      text += `🏷️ *Descuento:* -${formatCurrency(quoteParams.discount)}\n`
    }

    text += `⭐ *TOTAL:* ${formatCurrency(orderTotal)}\n`

    if (downPaymentAmount > 0) {
      text += `💰 *Anticipo abonado:* ${formatCurrency(downPaymentAmount)}\n`
      text += `⚠️ *Saldo contra entrega:* ${formatCurrency(pendingBalance)}\n`
    } else {
      text += `💳 *Pago:* Total a liquidar contra entrega\n`
    }

    if (accumulatedGifts.length > 0) {
      text += `--------------------------------\n`
      text += `🎁 *REGALOS DE CORTESÍA INCLUIDOS:*\n`
      accumulatedGifts.forEach((g) => {
        text += `• ${g.gift}\n`
      })
    }

    text += `--------------------------------\n`
    text += `*Limpieza OKEY* • ¡Calidad, rendimiento y ahorro garantizado!`

    navigator.clipboard.writeText(text).then(() => {
      setCopied(true)
      showToast('Cotización copiada al portapapeles para WhatsApp')
      setTimeout(() => setCopied(false), 2500)
    })
  }

  return (
    <div className="bg-white rounded-3xl border border-slate-200/90 shadow-sm p-6 space-y-6 sticky top-20">
      <div className="flex items-center justify-between pb-3 border-b border-slate-100">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-lg bg-blue-50 text-blue-600 flex items-center justify-center font-bold">
            <DollarSign className="w-4 h-4" />
          </div>
          <h3 className="font-bold text-slate-900 text-base">Resumen Financiero</h3>
        </div>
        <span className="text-xs font-semibold px-2 py-0.5 rounded-full bg-slate-100 text-slate-600">
          Cotización
        </span>
      </div>

      {/* Tipo de Entrega */}
      <div className="space-y-2">
        <label className="text-xs font-bold text-slate-700 block">
          Método de Entrega
        </label>
        <div className="grid grid-cols-2 gap-2">
          <button
            type="button"
            onClick={() => updateQuoteParam('shippingType', 'delivery')}
            className={`p-3 rounded-2xl border text-left transition-all ${
              quoteParams.shippingType === 'delivery'
                ? 'border-blue-600 bg-blue-50/70 text-blue-900 ring-1 ring-blue-600'
                : 'border-slate-200 text-slate-700 hover:bg-slate-50'
            }`}
          >
            <div className="flex items-center gap-2 mb-1">
              <Truck className="w-4 h-4 text-blue-600" />
              <span className="text-xs font-bold">A Domicilio</span>
            </div>
            <span className="text-[11px] block text-slate-500 font-medium">
              {hasFreeShipping ? (
                <strong className="text-emerald-600 font-bold">¡Envío Gratis!</strong>
              ) : (
                `${formatCurrency(quoteParams.deliveryFee || 120)} MXN`
              )}
            </span>
          </button>

          <button
            type="button"
            onClick={() => updateQuoteParam('shippingType', 'pickup')}
            className={`p-3 rounded-2xl border text-left transition-all ${
              quoteParams.shippingType === 'pickup'
                ? 'border-blue-600 bg-blue-50/70 text-blue-900 ring-1 ring-blue-600'
                : 'border-slate-200 text-slate-700 hover:bg-slate-50'
            }`}
          >
            <div className="flex items-center gap-2 mb-1">
              <Store className="w-4 h-4 text-blue-600" />
              <span className="text-xs font-bold">En Sucursal</span>
            </div>
            <span className="text-[11px] block text-emerald-600 font-bold">
              Sin costo ($0.00)
            </span>
          </button>
        </div>
      </div>

      {/* Descuento Adicional Toggle */}
      <div>
        {!showDiscountInput ? (
          <button
            type="button"
            onClick={() => setShowDiscountInput(true)}
            className="text-xs font-semibold text-blue-600 hover:text-blue-700 flex items-center gap-1 transition-colors"
          >
            <Tag className="w-3.5 h-3.5" />
            <span>+ Aplicar descuento especial</span>
          </button>
        ) : (
          <div className="space-y-1.5 p-3 rounded-xl bg-slate-50 border border-slate-200">
            <div className="flex items-center justify-between">
              <label className="text-xs font-bold text-slate-700 flex items-center gap-1">
                <Tag className="w-3.5 h-3.5 text-blue-600" />
                <span>Descuento ($ MXN)</span>
              </label>
              <button
                type="button"
                onClick={() => {
                  setShowDiscountInput(false)
                  updateQuoteParam('discount', '')
                }}
                className="text-[11px] text-slate-400 hover:text-rose-600"
              >
                Quitar
              </button>
            </div>
            <input
              type="number"
              min="0"
              step="1"
              value={quoteParams.discount}
              onChange={(e) => updateQuoteParam('discount', e.target.value)}
              placeholder="0.00"
              className="w-full px-3 py-1.5 text-xs font-bold border border-slate-300 rounded-lg outline-none bg-white"
            />
          </div>
        )}
      </div>

      {/* Desglose Numérico */}
      <div className="space-y-2 pt-2 border-t border-slate-100 text-xs text-slate-600">
        <div className="flex justify-between">
          <span>Subtotal de artículos</span>
          <strong className="text-slate-900 font-bold">{formatCurrency(cartSubtotal)}</strong>
        </div>

        <div className="flex justify-between items-center">
          <span>Costo de envío</span>
          {quoteParams.shippingType === 'pickup' ? (
            <span className="text-emerald-600 font-bold">Gratis (Sucursal)</span>
          ) : hasFreeShipping ? (
            <span className="text-emerald-600 font-bold">¡Gratis! ($0.00)</span>
          ) : (
            <strong className="text-slate-900 font-bold">
              {formatCurrency(effectiveShippingCost)}
            </strong>
          )}
        </div>

        {Number(quoteParams.discount) > 0 && (
          <div className="flex justify-between text-rose-600">
            <span>Descuento aplicado</span>
            <strong>-{formatCurrency(quoteParams.discount)}</strong>
          </div>
        )}

        {/* Total Final */}
        <div className="flex justify-between items-baseline pt-3 border-t border-slate-200">
          <span className="text-sm font-extrabold text-slate-900">Total Cotizado</span>
          <span className="text-2xl font-black text-slate-900 tracking-tight">
            {formatCurrency(orderTotal)}
          </span>
        </div>
      </div>

      {/* Sección de Anticipo y Saldo Pendiente */}
      <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 space-y-3">
        <div className="flex items-center justify-between">
          <label className="text-xs font-bold text-slate-800 flex items-center gap-1.5">
            <DollarSign className="w-4 h-4 text-emerald-600" />
            <span>Anticipo / Abono Recibido</span>
          </label>
          <span className="text-[11px] text-slate-500">
            {downPaymentAmount > 0 && orderTotal > 0
              ? formatPercentage((downPaymentAmount / orderTotal) * 100)
              : 'Sin abono'}
          </span>
        </div>

        {/* Input Anticipo */}
        <div className="relative">
          <span className="absolute left-3 top-2.5 text-xs text-slate-400 font-bold">$</span>
          <input
            type="number"
            min="0"
            max={orderTotal}
            value={quoteParams.downPayment}
            onChange={(e) => updateQuoteParam('downPayment', e.target.value)}
            placeholder="0.00 (opcional)"
            className="w-full pl-7 pr-3 py-2 text-sm font-bold border border-slate-300 rounded-xl outline-none focus:ring-2 focus:ring-blue-500 bg-white"
          />
        </div>

        {/* Quick Percent Buttons */}
        <div className="grid grid-cols-4 gap-1.5 pt-1">
          <button
            type="button"
            onClick={() => handleQuickDownPayment(0)}
            className="py-1 px-1.5 rounded-lg border border-slate-200 text-[10px] font-bold text-slate-600 hover:bg-slate-200/60 transition-colors"
          >
            0%
          </button>
          <button
            type="button"
            onClick={() => handleQuickDownPayment(30)}
            className="py-1 px-1.5 rounded-lg border border-slate-200 text-[10px] font-bold text-slate-600 hover:bg-slate-200/60 transition-colors"
          >
            30%
          </button>
          <button
            type="button"
            onClick={() => handleQuickDownPayment(50)}
            className="py-1 px-1.5 rounded-lg border border-slate-200 text-[10px] font-bold text-slate-600 hover:bg-slate-200/60 transition-colors"
          >
            50%
          </button>
          <button
            type="button"
            onClick={() => handleQuickDownPayment(100)}
            className="py-1 px-1.5 rounded-lg border border-slate-200 text-[10px] font-bold text-slate-600 hover:bg-slate-200/60 transition-colors"
          >
            100%
          </button>
        </div>

        {/* Indicador de Saldo Pendiente */}
        <div className="pt-2 border-t border-slate-200">
          {isFullyPaid ? (
            <div className="p-2.5 rounded-xl bg-emerald-50 border border-emerald-200 flex items-center gap-2 text-emerald-800 text-xs font-bold">
              <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
              <span>¡Pedido Totalmente Liquidado! ($0.00 de saldo)</span>
            </div>
          ) : (
            <div className="flex items-center justify-between p-2.5 rounded-xl bg-amber-50 border border-amber-200 text-amber-900 text-xs">
              <div>
                <span className="text-[10px] uppercase font-bold text-amber-700 block">
                  Saldo Contra Entrega
                </span>
                <span className="text-base font-black text-amber-950">
                  {formatCurrency(pendingBalance)}
                </span>
              </div>
              <span className="text-[10px] px-2 py-0.5 rounded-full bg-amber-200/70 text-amber-900 font-bold">
                Pendiente
              </span>
            </div>
          )}
        </div>
      </div>

      {/* Regalos Promocionales Acumulados */}
      {accumulatedGifts.length > 0 && (
        <div className="p-3.5 rounded-2xl bg-gradient-to-r from-amber-50 to-orange-50 border border-amber-200 space-y-1.5">
          <div className="flex items-center gap-1.5 text-xs font-bold text-amber-900">
            <Gift className="w-4 h-4 text-amber-600" />
            <span>Regalos de Cortesía en esta Cotización</span>
          </div>
          <ul className="text-xs text-amber-800 space-y-1 pl-1">
            {accumulatedGifts.map((g, idx) => (
              <li key={idx} className="flex items-start gap-1.5">
                <span className="w-1.5 h-1.5 rounded-full bg-amber-500 mt-1.5 shrink-0" />
                <span>
                  <strong>{g.gift}</strong> (por {g.productName})
                </span>
              </li>
            ))}
          </ul>
        </div>
      )}

      {/* Botones de Acción */}
      <div className="space-y-2 pt-2">
        {/* Continuar a Clientes */}
        <button
          type="button"
          onClick={() => setActiveTab('customers')}
          className="w-full py-3 px-4 rounded-xl font-bold text-xs sm:text-sm bg-blue-600 hover:bg-blue-700 text-white shadow-md shadow-blue-500/20 transition-all flex items-center justify-center gap-2 active:scale-98"
        >
          <span>Continuar con Datos del Cliente</span>
          <ArrowRight className="w-4 h-4" />
        </button>

        {/* Copiar cotización para WhatsApp */}
        <button
          type="button"
          onClick={handleCopyQuoteText}
          className={`w-full py-2.5 px-4 rounded-xl font-semibold text-xs border transition-all flex items-center justify-center gap-2 ${
            copied
              ? 'bg-emerald-50 border-emerald-300 text-emerald-700'
              : 'border-slate-300 hover:bg-slate-50 text-slate-700'
          }`}
        >
          {copied ? (
            <>
              <Check className="w-4 h-4 text-emerald-600" />
              <span>¡Copiado para WhatsApp!</span>
            </>
          ) : (
            <>
              <Copy className="w-4 h-4 text-slate-500" />
              <span>Copiar Cotización para WhatsApp</span>
            </>
          )}
        </button>
      </div>
    </div>
  )
}
