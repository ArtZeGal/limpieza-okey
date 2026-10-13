import { useState, useEffect } from 'react'
import {
  X,
  Package,
  DollarSign,
  TrendingUp,
  Percent,
  AlertCircle
} from 'lucide-react'
import {
  calculateMargin,
  calculateProfit,
  formatCurrency,
  formatPercentage,
  getMarginStatus
} from '../../utils/formatters'
import { INITIAL_CATEGORIES } from '../../data/initialCatalog'
import { useApp } from '../../context/AppContext'

export default function ProductModal({ isOpen, onClose, productToEdit }) {
  const { addProduct, updateProduct } = useApp()

  const categories = INITIAL_CATEGORIES.filter((c) => c !== 'Todos')

  const [formData, setFormData] = useState({
    name: '',
    sku: '',
    category: categories[0] || 'ASEO GENERAL',
    isPackage: false,
    presentation: '1L',
    cost: '',
    price: '',
    description: '',
    suggestedGift: null,
    stock: 50,
    itemsIncluded: [],
  })

  const [error, setError] = useState('')

  useEffect(() => {
    if (productToEdit) {
      setFormData({
        name: productToEdit.name || '',
        sku: productToEdit.sku || '',
        category: productToEdit.category || categories[0],
        isPackage: false,
        presentation: productToEdit.presentation || '',
        cost: productToEdit.cost?.toString() || '',
        price: productToEdit.price?.toString() || '',
        description: productToEdit.description || '',
        suggestedGift: null,
        stock: productToEdit.stock ?? 50,
        itemsIncluded: [],
      })
    } else {
      setFormData({
        name: '',
        sku: '',
        category: categories[0] || 'ASEO GENERAL',
        isPackage: false,
        presentation: '4L',
        cost: '',
        price: '',
        description: '',
        suggestedGift: null,
        stock: 50,
        itemsIncluded: [],
      })
    }
    setError('')
  }, [productToEdit, isOpen])

  if (!isOpen) return null

  const costNum = Number(formData.cost) || 0
  const priceNum = Number(formData.price) || 0
  const margin = calculateMargin(costNum, priceNum)
  const profit = calculateProfit(costNum, priceNum)
  const marginStatus = getMarginStatus(margin)

  const handleSubmit = (e) => {
    e.preventDefault()
    if (!formData.name.trim()) {
      setError('Por favor ingresa el nombre del producto.')
      return
    }
    if (!formData.price || priceNum <= 0) {
      setError('Por favor especifica un precio de venta válido.')
      return
    }

    const payload = {
      ...formData,
      name: formData.name.trim(),
      sku: formData.sku.trim() || `SKU-${Date.now().toString().slice(-4)}`,
      cost: costNum,
      price: priceNum,
      stock: Number(formData.stock) || 0,
      isPackage: false,
      suggestedGift: null,
    }

    if (productToEdit) {
      updateProduct(productToEdit.id, payload)
    } else {
      addProduct(payload)
    }

    onClose()
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs animate-in fade-in duration-150">
      <div className="bg-white rounded-2xl w-full max-w-xl max-h-[90vh] flex flex-col shadow-2xl border border-slate-200 overflow-hidden">
        {/* Modal Header */}
        <div className="px-6 py-4 border-b border-slate-200 flex items-center justify-between bg-slate-50">
          <div className="flex items-center gap-2.5">
            <div className="p-2 rounded-xl bg-blue-600 text-white">
              <Package className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-base sm:text-lg font-bold text-slate-900">
                {productToEdit ? 'Editar Producto Oficial' : 'Registrar Nuevo Producto'}
              </h2>
              <p className="text-xs text-slate-500">
                Catálogo Puntos KEY® &bull; Precios y costos oficiales
              </p>
            </div>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="p-1.5 rounded-lg text-slate-400 hover:text-slate-700 hover:bg-slate-200/60 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Form Body */}
        <form onSubmit={handleSubmit} className="flex-1 overflow-y-auto p-6 space-y-4">
          {error && (
            <div className="p-3 rounded-xl bg-rose-50 border border-rose-200 flex items-center gap-2 text-rose-700 text-xs font-medium">
              <AlertCircle className="w-4 h-4 shrink-0" />
              <span>{error}</span>
            </div>
          )}

          {/* Nombre y SKU */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            <div className="sm:col-span-2">
              <label className="block text-xs font-bold text-slate-700 mb-1">
                Nombre del Producto *
              </label>
              <input
                type="text"
                required
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                placeholder="Ej. KEY PRELAVADOR 1L"
                className="w-full px-3.5 py-2 text-sm border border-slate-300 rounded-xl focus:ring-2 focus:ring-blue-500 outline-none"
              />
            </div>
            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">
                Código / SKU *
              </label>
              <input
                type="text"
                required
                value={formData.sku}
                onChange={(e) => setFormData({ ...formData, sku: e.target.value })}
                placeholder="Ej. 15114"
                className="w-full px-3.5 py-2 text-sm uppercase font-mono font-bold border border-slate-300 rounded-xl focus:ring-2 focus:ring-blue-500 outline-none"
              />
            </div>
          </div>

          {/* Categoría y Presentación */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">
                Categoría Oficial
              </label>
              <select
                value={formData.category}
                onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                className="w-full px-3.5 py-2 text-sm border border-slate-300 rounded-xl focus:ring-2 focus:ring-blue-500 outline-none bg-white font-medium"
              >
                {categories.map((cat) => (
                  <option key={cat} value={cat}>
                    {cat}
                  </option>
                ))}
              </select>
            </div>
            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">
                Presentación / Capacidad
              </label>
              <input
                type="text"
                value={formData.presentation}
                onChange={(e) => setFormData({ ...formData, presentation: e.target.value })}
                placeholder="Ej. 4L, 1L, 650ML, Pieza"
                className="w-full px-3.5 py-2 text-sm border border-slate-300 rounded-xl focus:ring-2 focus:ring-blue-500 outline-none"
              />
            </div>
          </div>

          {/* Costo, Precio y Margen */}
          <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 space-y-3">
            <div className="flex items-center gap-1.5 text-xs font-bold text-slate-700 uppercase tracking-wider">
              <DollarSign className="w-4 h-4 text-emerald-600" />
              <span>Precios y Costo Base</span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              <div>
                <label className="block text-xs font-medium text-slate-600 mb-1">
                  Costo Base / Empleado ($)
                </label>
                <div className="relative">
                  <span className="absolute left-3 top-2 text-sm text-slate-400 font-bold">$</span>
                  <input
                    type="number"
                    step="0.01"
                    min="0"
                    value={formData.cost}
                    onChange={(e) => setFormData({ ...formData, cost: e.target.value })}
                    placeholder="0.00"
                    className="w-full pl-7 pr-3 py-2 text-sm font-semibold border border-slate-300 rounded-xl focus:ring-2 focus:ring-blue-500 outline-none bg-white"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-medium text-slate-600 mb-1">
                  Precio al Público ($ MXN) *
                </label>
                <div className="relative">
                  <span className="absolute left-3 top-2 text-sm text-slate-400 font-bold">$</span>
                  <input
                    type="number"
                    step="0.01"
                    min="0"
                    required
                    value={formData.price}
                    onChange={(e) => setFormData({ ...formData, price: e.target.value })}
                    placeholder="0.00"
                    className="w-full pl-7 pr-3 py-2 text-sm font-bold border border-slate-300 rounded-xl focus:ring-2 focus:ring-blue-500 outline-none bg-white text-slate-900"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-medium text-slate-600 mb-1">
                  Inventario Inicial
                </label>
                <input
                  type="number"
                  min="0"
                  value={formData.stock}
                  onChange={(e) => setFormData({ ...formData, stock: e.target.value })}
                  placeholder="50"
                  className="w-full px-3 py-2 text-sm border border-slate-300 rounded-xl focus:ring-2 focus:ring-blue-500 outline-none bg-white"
                />
              </div>
            </div>

            {/* Live Margin & Profit Banner */}
            {priceNum > 0 && (
              <div className="mt-3 p-3 rounded-xl bg-white border border-slate-200/90 flex flex-wrap items-center justify-between gap-3 shadow-xs">
                <div className="flex items-center gap-2">
                  <div className={`p-1.5 rounded-lg border ${marginStatus.color}`}>
                    <TrendingUp className="w-4 h-4" />
                  </div>
                  <div>
                    <span className="text-xs text-slate-500 block">Margen Calculado:</span>
                    <strong className="text-sm font-black text-slate-900">
                      {formatPercentage(margin)} ({marginStatus.label})
                    </strong>
                  </div>
                </div>

                <div className="text-right">
                  <span className="text-xs text-slate-500 block">Ganancia Unitaria:</span>
                  <strong className="text-sm font-black text-emerald-700">
                    {formatCurrency(profit)}
                  </strong>
                </div>
              </div>
            )}
          </div>

          {/* Modal Footer */}
          <div className="pt-3 border-t border-slate-200 flex items-center justify-end gap-2.5">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 text-xs sm:text-sm font-semibold text-slate-600 hover:text-slate-800 hover:bg-slate-100 rounded-xl transition-colors"
            >
              Cancelar
            </button>
            <button
              type="submit"
              className="px-5 py-2 text-xs sm:text-sm font-bold bg-blue-600 hover:bg-blue-700 text-white rounded-xl shadow-md shadow-blue-500/20 transition-all active:scale-98"
            >
              {productToEdit ? 'Guardar Cambios' : 'Registrar Producto'}
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}
