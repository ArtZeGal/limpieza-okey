import { Plus, Minus, Trash2, Gift, Sparkles, Package } from 'lucide-react'
import { formatCurrency } from '../../utils/formatters'
import { useApp } from '../../context/AppContext'

export default function CartItemRow({ item }) {
  const { updateCartQuantity, removeFromCart } = useApp()
  const { product, quantity } = item

  const itemTotal = quantity * product.price

  return (
    <div className="p-4 sm:p-5 rounded-2xl bg-white border border-slate-200/90 shadow-2xs hover:border-slate-300 transition-all flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
      {/* Product Details */}
      <div className="flex items-start gap-3 flex-1 min-w-0">
        <div className={`w-11 h-11 rounded-xl flex items-center justify-center shrink-0 text-white ${
          product.isPackage
            ? 'bg-gradient-to-tr from-blue-600 to-cyan-600 shadow-sm'
            : 'bg-slate-800'
        }`}>
          {product.isPackage ? <Sparkles className="w-5 h-5" /> : <Package className="w-5 h-5" />}
        </div>

        <div className="min-w-0 flex-1">
          <div className="flex flex-wrap items-center gap-1.5 mb-1">
            {product.isPackage ? (
              <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-blue-100 text-blue-800 uppercase tracking-wider">
                Paquete
              </span>
            ) : (
              <span className="text-[10px] font-medium px-2 py-0.5 rounded-full bg-slate-100 text-slate-600">
                {product.category}
              </span>
            )}
            <span className="text-[10px] font-mono text-slate-400 uppercase">
              {product.sku}
            </span>
          </div>

          <h4 className="font-bold text-slate-900 text-sm sm:text-base leading-snug truncate">
            {product.name}
          </h4>
          <p className="text-xs text-slate-500 font-medium">
            {product.presentation} &bull; <span className="text-slate-700">{formatCurrency(product.price)} c/u</span>
          </p>

          {/* Suggested Gift Indicator */}
          {product.suggestedGift && (
            <div className="mt-2 inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-amber-50 border border-amber-200/80 text-[11px] font-semibold text-amber-800">
              <Gift className="w-3.5 h-3.5 text-amber-600 shrink-0" />
              <span>Regalo: {product.suggestedGift}</span>
            </div>
          )}
        </div>
      </div>

      {/* Quantity & Item Subtotal Controls */}
      <div className="w-full sm:w-auto flex items-center justify-between sm:justify-end gap-4 pt-3 sm:pt-0 border-t sm:border-t-0 border-slate-100">
        {/* Quantity Controls */}
        <div className="flex items-center border border-slate-300 rounded-xl bg-slate-50/50">
          <button
            type="button"
            onClick={() => updateCartQuantity(product.id, quantity - 1)}
            className="p-2 text-slate-500 hover:text-slate-800 hover:bg-slate-200/50 rounded-l-xl transition-colors disabled:opacity-40"
            disabled={quantity <= 1}
            title="Reducir cantidad"
          >
            <Minus className="w-3.5 h-3.5" />
          </button>
          <span className="w-9 text-center text-xs sm:text-sm font-bold text-slate-900">
            {quantity}
          </span>
          <button
            type="button"
            onClick={() => updateCartQuantity(product.id, quantity + 1)}
            className="p-2 text-slate-500 hover:text-slate-800 hover:bg-slate-200/50 rounded-r-xl transition-colors"
            title="Aumentar cantidad"
          >
            <Plus className="w-3.5 h-3.5" />
          </button>
        </div>

        {/* Total Price */}
        <div className="text-right min-w-[90px]">
          <span className="text-[10px] text-slate-400 block uppercase font-semibold">Subtotal</span>
          <span className="text-sm sm:text-base font-black text-slate-900">
            {formatCurrency(itemTotal)}
          </span>
        </div>

        {/* Delete Item */}
        <button
          type="button"
          onClick={() => removeFromCart(product.id)}
          className="p-2 text-slate-400 hover:text-rose-600 hover:bg-rose-50 rounded-xl transition-colors"
          title="Eliminar del cotizador"
        >
          <Trash2 className="w-4 h-4" />
        </button>
      </div>
    </div>
  )
}
