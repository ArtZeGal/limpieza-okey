import { useState } from 'react'
import {
  Package,
  Plus,
  Minus,
  ShoppingCart,
  TrendingUp,
  DollarSign,
  Edit2,
  Trash2,
  CheckCircle,
  Layers,
  Sparkles,
  RefreshCw
} from 'lucide-react'
import {
  formatCurrency,
  formatPercentage,
  calculateMargin,
  calculateProfit,
  getMarginStatus
} from '../../utils/formatters'
import { useApp } from '../../context/AppContext'

export default function ProductCard({ product, onEdit }) {
  const { addToCart, viewMode, deleteProduct } = useApp()
  const [quantity, setQuantity] = useState(1)
  const [justAdded, setJustAdded] = useState(false)

  const margin = calculateMargin(product.cost, product.price)
  const profit = calculateProfit(product.cost, product.price)
  const marginStatus = getMarginStatus(margin)

  const handleAddToCart = () => {
    addToCart(product, quantity)
    setJustAdded(true)
    setTimeout(() => setJustAdded(false), 1200)
    setQuantity(1)
  }

  const handleDelete = () => {
    if (window.confirm(`¿Estás seguro de eliminar "${product.name}" del catálogo?`)) {
      deleteProduct(product.id)
    }
  }

  return (
    <div className="relative flex flex-col justify-between rounded-2xl bg-white border border-slate-200 shadow-2xs hover:border-slate-300 hover:shadow-sm transition-all duration-200 overflow-hidden">
      {/* Top Banner / Tags */}
      <div className="p-5 pb-3">
        <div className="flex items-start justify-between gap-2 mb-2">
          <div className="flex flex-wrap items-center gap-1.5">
            <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[11px] font-bold bg-slate-100 text-slate-700 border border-slate-200">
              <Layers className="w-3 h-3 text-slate-500" />
              <span>{product.category}</span>
            </span>
            <span className="text-[11px] font-mono text-slate-400 font-bold uppercase">
              CÓD: {product.sku}
            </span>
          </div>

          {/* Admin edit/delete buttons */}
          {viewMode === 'admin' && (
            <div className="flex items-center gap-1 text-slate-400">
              <button
                type="button"
                onClick={() => onEdit(product)}
                className="p-1 rounded-lg hover:text-blue-600 hover:bg-blue-50 transition-colors"
                title="Editar producto"
              >
                <Edit2 className="w-3.5 h-3.5" />
              </button>
              <button
                type="button"
                onClick={handleDelete}
                className="p-1 rounded-lg hover:text-rose-600 hover:bg-rose-50 transition-colors"
                title="Eliminar producto"
              >
                <Trash2 className="w-3.5 h-3.5" />
              </button>
            </div>
          )}
        </div>

        {/* Product Title */}
        <h3 className="font-extrabold text-slate-900 text-base leading-snug line-clamp-2">
          {product.name}
        </h3>

        {/* Presentation & Refill Badges */}
        <div className="flex flex-wrap items-center gap-1.5 mt-2">
          <span className="text-[11px] font-bold text-cyan-800 bg-cyan-50 px-2 py-0.5 rounded-md border border-cyan-200/60">
            {product.presentation}
          </span>
          {product.priceRefill && (
            <span className="inline-flex items-center gap-1 text-[11px] font-bold text-emerald-800 bg-emerald-50 px-2 py-0.5 rounded-md border border-emerald-200/60">
              <RefreshCw className="w-3 h-3 text-emerald-600" />
              <span>Relleno: {formatCurrency(product.priceRefill)}</span>
            </span>
          )}
        </div>
      </div>

      {/* Pricing and Margin Section */}
      <div className="p-5 pt-3 border-t border-slate-100 bg-slate-50/50 mt-auto space-y-3">
        {/* Price & Margins */}
        <div className="flex items-end justify-between gap-2">
          <div>
            <span className="text-[11px] font-semibold text-slate-500 block uppercase tracking-wider">
              Precio al Público
            </span>
            <div className="text-xl sm:text-2xl font-black text-slate-900 tracking-tight">
              {formatCurrency(product.price)}
            </div>
          </div>

          {/* Margins only visible in Admin Mode */}
          {viewMode === 'admin' ? (
            <div className="text-right">
              <div className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-md text-xs font-bold border ${marginStatus.color}`}>
                <TrendingUp className="w-3 h-3" />
                <span>{formatPercentage(margin)}</span>
              </div>
              <div className="text-[11px] text-slate-500 mt-0.5">
                Ganancia: <strong className="text-emerald-700 font-semibold">{formatCurrency(profit)}</strong>
              </div>
            </div>
          ) : (
            <div className="text-right">
              {/* Espacio reservado limpio */}
            </div>
          )}
        </div>

        {/* Detailed Cost Row for Admin */}
        {viewMode === 'admin' && (
          <div className="pt-2 border-t border-slate-200/60 flex items-center justify-between text-xs text-slate-500">
            <span>Costo Empleado: <strong>{formatCurrency(product.cost)}</strong></span>
          </div>
        )}

        {/* Add to Cart Actions */}
        <div className="flex items-center gap-2 pt-1">
          {/* Quantity Controls */}
          <div className="flex items-center border border-slate-300 rounded-xl bg-white shadow-xs">
            <button
              type="button"
              onClick={() => setQuantity((q) => Math.max(1, q - 1))}
              className="p-2 text-slate-500 hover:text-slate-800 hover:bg-slate-100 rounded-l-xl transition-colors disabled:opacity-40"
              disabled={quantity <= 1}
              title="Reducir cantidad"
            >
              <Minus className="w-3.5 h-3.5" />
            </button>
            <span className="w-8 text-center text-xs font-bold text-slate-800">
              {quantity}
            </span>
            <button
              type="button"
              onClick={() => setQuantity((q) => q + 1)}
              className="p-2 text-slate-500 hover:text-slate-800 hover:bg-slate-100 rounded-r-xl transition-colors"
              title="Aumentar cantidad"
            >
              <Plus className="w-3.5 h-3.5" />
            </button>
          </div>

          {/* Add to Cart Button */}
          <button
            type="button"
            onClick={handleAddToCart}
            className={`flex-1 flex items-center justify-center gap-1.5 py-2 px-3 rounded-xl text-xs sm:text-sm font-bold transition-all shadow-sm ${
              justAdded
                ? 'bg-emerald-600 text-white shadow-emerald-500/20'
                : 'bg-blue-600 hover:bg-blue-700 text-white shadow-blue-500/20 active:scale-98'
            }`}
          >
            {justAdded ? (
              <>
                <CheckCircle className="w-4 h-4" />
                <span>¡Agregado!</span>
              </>
            ) : (
              <>
                <ShoppingCart className="w-4 h-4" />
                <span>Agregar</span>
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  )
}
