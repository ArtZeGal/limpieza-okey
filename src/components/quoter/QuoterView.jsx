import {
  ShoppingCart,
  ArrowLeft,
  Trash2,
  FileText,
  PackagePlus,
  AlertCircle,
  Calculator
} from 'lucide-react'
import { useState } from 'react'
import { useApp } from '../../context/AppContext'
import FreeShippingBanner from './FreeShippingBanner'
import CartItemRow from './CartItemRow'
import QuotationSummary from './QuotationSummary'
import CostInUseCalculator from '../calculator/CostInUseCalculator'

export default function QuoterView() {
  const [isCalculatorOpen, setIsCalculatorOpen] = useState(false)
  const {
    cart,
    cartTotalItems,
    clearCart,
    setActiveTab,
    quoteParams,
    updateQuoteParam,
  } = useApp()

  const handleClear = () => {
    if (window.confirm('¿Seguro que deseas vaciar todos los artículos del cotizador?')) {
      clearCart()
    }
  }

  return (
    <div className="space-y-6 animate-in fade-in duration-200">
      {/* View Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 bg-white p-5 rounded-2xl border border-slate-200 shadow-xs">
        <div className="flex items-center gap-3">
          <button
            type="button"
            onClick={() => setActiveTab('catalog')}
            className="p-2 rounded-xl text-slate-500 hover:text-slate-800 hover:bg-slate-100 transition-colors"
            title="Volver al catálogo"
          >
            <ArrowLeft className="w-5 h-5" />
          </button>
          <div>
            <div className="flex items-center gap-2">
              <h1 className="text-xl sm:text-2xl font-black text-slate-900 tracking-tight">
                Cotizador / Carrito
              </h1>
              <span className="text-xs font-bold px-2.5 py-0.5 rounded-full bg-blue-100 text-blue-800">
                {cartTotalItems} {cartTotalItems === 1 ? 'artículo' : 'artículos'}
              </span>
            </div>
            <p className="text-xs text-slate-500 mt-0.5">
              Cálculo de subtotal, anticipos, saldo pendiente y alerta de envío gratis.
            </p>
          </div>
        </div>

        {/* Header Actions */}
        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={() => setIsCalculatorOpen(true)}
            className="px-3.5 py-2 rounded-xl text-xs font-bold text-indigo-700 bg-indigo-50 hover:bg-indigo-100 border border-indigo-200 transition-colors flex items-center gap-1.5"
            title="Calcular ahorro y costo en uso por litro"
          >
            <Calculator className="w-4 h-4 text-indigo-600" />
            <span>Calculadora de Ahorro</span>
          </button>

          <button
            type="button"
            onClick={() => setActiveTab('catalog')}
            className="px-3.5 py-2 rounded-xl text-xs font-bold text-slate-700 bg-slate-100 hover:bg-slate-200 transition-colors flex items-center gap-1.5"
          >
            <PackagePlus className="w-4 h-4 text-blue-600" />
            <span>Agregar Más Productos</span>
          </button>

          {cart.length > 0 && (
            <button
              type="button"
              onClick={handleClear}
              className="p-2 rounded-xl text-slate-400 hover:text-rose-600 hover:bg-rose-50 transition-colors"
              title="Vaciar cotizador"
            >
              <Trash2 className="w-4 h-4" />
            </button>
          )}
        </div>
      </div>

      {/* Free Shipping Alert Banner */}
      <FreeShippingBanner />

      {/* Main Content Layout */}
      {cart.length > 0 ? (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
          {/* Left Column: List of items & Order Notes */}
          <div className="lg:col-span-7 space-y-4">
            <div className="flex items-center justify-between px-1">
              <h2 className="text-sm font-bold text-slate-800">
                Artículos en la Cotización ({cart.length})
              </h2>
              <span className="text-xs text-slate-500">
                Precios unitarios con IVA incluido
              </span>
            </div>

            {/* List of Cart Items */}
            <div className="space-y-3">
              {cart.map((item) => (
                <CartItemRow key={item.product.id} item={item} />
              ))}
            </div>

            {/* Order Notes / Special Instructions */}
            <div className="p-4 rounded-2xl bg-white border border-slate-200/90 shadow-2xs space-y-2">
              <label className="text-xs font-bold text-slate-700 flex items-center gap-1.5">
                <FileText className="w-4 h-4 text-slate-500" />
                <span>Notas o Acuerdos Especiales</span>
              </label>
              <textarea
                rows={2}
                value={quoteParams.notes}
                onChange={(e) => updateQuoteParam('notes', e.target.value)}
                placeholder="Ej. Entregar en horario matutino, cliente solicita factura, etc."
                className="w-full px-3 py-2 text-xs border border-slate-300 rounded-xl outline-none focus:ring-2 focus:ring-blue-500 resize-none bg-slate-50/50"
              />
            </div>
          </div>

          {/* Right Column: Financial Summary */}
          <div className="lg:col-span-5">
            <QuotationSummary />
          </div>
        </div>
      ) : (
        /* Empty Cart State */
        <div className="text-center py-16 px-4 bg-white rounded-3xl border border-slate-200 shadow-sm max-w-xl mx-auto space-y-4">
          <div className="w-16 h-16 rounded-2xl bg-blue-50 text-blue-600 mx-auto flex items-center justify-center">
            <ShoppingCart className="w-8 h-8" />
          </div>
          <div className="space-y-1">
            <h3 className="font-extrabold text-slate-900 text-lg">
              Tu cotizador está vacío
            </h3>
            <p className="text-xs text-slate-500 max-w-sm mx-auto">
              Aún no has agregado paquetes ni productos de limpieza a la cotización actual.
            </p>
          </div>
          <button
            type="button"
            onClick={() => setActiveTab('catalog')}
            className="px-5 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs sm:text-sm shadow-md shadow-blue-500/20 transition-all inline-flex items-center gap-2"
          >
            <PackagePlus className="w-4 h-4" />
            <span>Ir al Catálogo de Productos</span>
          </button>
        </div>
      )}

      {/* Modal Calculadora de Costo en Uso */}
      {isCalculatorOpen && (
        <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="w-full max-w-4xl max-h-[90vh] overflow-y-auto">
            <CostInUseCalculator onClose={() => setIsCalculatorOpen(false)} />
          </div>
        </div>
      )}
    </div>
  )
}
