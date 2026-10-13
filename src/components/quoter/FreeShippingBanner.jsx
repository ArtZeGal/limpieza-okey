import { Truck, Sparkles, CheckCircle2, ArrowRight } from 'lucide-react'
import { formatCurrency } from '../../utils/formatters'
import { useApp } from '../../context/AppContext'

export default function FreeShippingBanner() {
  const {
    hasFreeShipping,
    amountForFreeShipping,
    freeShippingProgress,
    FREE_SHIPPING_THRESHOLD,
    setActiveTab,
    cartSubtotal,
  } = useApp()

  if (cartSubtotal <= 0) return null

  return (
    <div className="rounded-2xl overflow-hidden transition-all duration-300">
      {hasFreeShipping ? (
        <div className="p-4 sm:p-5 bg-gradient-to-r from-emerald-600 via-teal-600 to-emerald-700 text-white shadow-md shadow-emerald-600/10 flex flex-col sm:flex-row items-center justify-between gap-3">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-white/20 backdrop-blur flex items-center justify-center shrink-0">
              <Sparkles className="w-5 h-5 text-emerald-100" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="font-black text-sm sm:text-base tracking-tight">
                  ¡Felicidades! Tienes Envío Gratis Activado
                </span>
                <span className="text-[10px] uppercase font-bold tracking-wider px-2 py-0.5 rounded-full bg-white/20 text-white">
                  Ahorras $120.00
                </span>
              </div>
              <p className="text-xs text-emerald-100 mt-0.5">
                Tu cotización supera los {formatCurrency(FREE_SHIPPING_THRESHOLD)} MXN. La entrega a domicilio corre por cuenta de Limpieza OKEY.
              </p>
            </div>
          </div>

          <div className="shrink-0 flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-white text-emerald-800 font-bold text-xs shadow-xs">
            <CheckCircle2 className="w-4 h-4 text-emerald-600" />
            <span>Envío $0.00 MXN</span>
          </div>
        </div>
      ) : (
        <div className="p-4 sm:p-5 bg-white border border-blue-200/90 rounded-2xl shadow-xs space-y-3">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
            <div className="flex items-center gap-2.5">
              <div className="w-9 h-9 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center shrink-0 border border-blue-100">
                <Truck className="w-4 h-4" />
              </div>
              <div>
                <div className="text-xs font-bold text-slate-800">
                  Meta para <span className="text-blue-700">Envío Gratis a Domicilio</span>
                </div>
                <div className="text-xs text-slate-500">
                  ¡Agrega <strong className="text-blue-600 font-bold">{formatCurrency(amountForFreeShipping)}</strong> más a tu carrito para no pagar envío!
                </div>
              </div>
            </div>

            <button
              type="button"
              onClick={() => setActiveTab('catalog')}
              className="self-start sm:self-auto inline-flex items-center gap-1.5 text-xs font-bold text-blue-700 hover:text-blue-800 bg-blue-50 hover:bg-blue-100/80 px-3 py-1.5 rounded-xl transition-colors"
            >
              <span>Ver Catálogo</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>

          {/* Progress Bar */}
          <div className="space-y-1">
            <div className="w-full bg-slate-100 h-2.5 rounded-full overflow-hidden p-0.5 border border-slate-200/70">
              <div
                className="bg-gradient-to-r from-blue-500 to-cyan-500 h-full rounded-full transition-all duration-500 ease-out"
                style={{ width: `${freeShippingProgress}%` }}
              />
            </div>
            <div className="flex justify-between text-[11px] font-semibold text-slate-400">
              <span>Actual: {formatCurrency(cartSubtotal)}</span>
              <span>Meta: {formatCurrency(FREE_SHIPPING_THRESHOLD)}</span>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
