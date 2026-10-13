import { useState, useEffect } from 'react'
import {
  X,
  Package,
  Sparkles,
  Gift,
  DollarSign,
  TrendingUp,
  Percent,
  Plus,
  Trash2,
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
    category: 'Detergentes y Jabones',
    isPackage: false,
    presentation: 'Garrafa 5 Litros',
    cost: '',
    price: '',
    description: '',
    suggestedGift: '',
    stock: 20,
    itemsIncluded: [],
  })

  const [newItemText, setNewItemText] = useState('')
  const [error, setError] = useState('')

  useEffect(() => {
    if (productToEdit) {
      setFormData({
        name: productToEdit.name || '',
        sku: productToEdit.sku || '',
        category: productToEdit.category || 'Detergentes y Jabones',
        isPackage: Boolean(productToEdit.isPackage),
        presentation: productToEdit.presentation || '',
        cost: productToEdit.cost?.toString() || '',
        price: productToEdit.price?.toString() || '',
        description: productToEdit.description || '',
        suggestedGift: productToEdit.suggestedGift || '',
        stock: productToEdit.stock ?? 20,
        itemsIncluded: productToEdit.itemsIncluded ? [...productToEdit.itemsIncluded] : [],
      })
    } else {
      // Valor por defecto para nuevo
      setFormData({
        name: '',
        sku: `PROD-${Math.floor(100 + Math.random() * 900)}`,
        category: 'Detergentes y Jabones',
        isPackage: false,
        presentation: 'Garrafa 5 Litros',
        cost: '',
        price: '',
        description: '',
        suggestedGift: '',
        stock: 25,
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

  const handleAddItemIncluded = () => {
    if (!newItemText.trim()) return
    setFormData((prev) => ({
      ...prev,
      itemsIncluded: [...prev.itemsIncluded, newItemText.trim()],
    }))
    setNewItemText('')
  }

  const handleRemoveItemIncluded = (index) => {
    setFormData((prev) => ({
      ...prev,
      itemsIncluded: prev.itemsIncluded.filter((_, i) => i !== index),
    }))
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    if (!formData.name.trim()) {
      setError('Por favor ingresa el nombre del producto o paquete.')
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
      suggestedGift: formData.suggestedGift.trim() || null,
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
      <div className="bg-white rounded-2xl w-full max-w-2xl max-h-[90vh] flex flex-col shadow-2xl border border-slate-200 overflow-hidden">
        {/* Modal Header */}
        <div className="px-6 py-4 border-b border-slate-200 flex items-center justify-between bg-slate-50">
          <div className="flex items-center gap-2.5">
            <div className={`p-2 rounded-xl text-white ${
              formData.isPackage ? 'bg-gradient-to-r from-blue-600 to-cyan-600' : 'bg-blue-600'
            }`}>
              {formData.isPackage ? <Sparkles className="w-5 h-5" /> : <Package className="w-5 h-5" />}
            </div>
            <div>
              <h2 className="text-base sm:text-lg font-bold text-slate-900">
                {productToEdit ? 'Editar Producto o Paquete' : 'Nuevo Producto o Paquete'}
              </h2>
              <p className="text-xs text-slate-500">
                Limpieza OKEY &bull; Configuración de precios, margen y regalos
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
        <form onSubmit={handleSubmit} className="flex-1 overflow-y-auto p-6 space-y-5">
          {error && (
            <div className="p-3 rounded-xl bg-rose-50 border border-rose-200 flex items-center gap-2 text-rose-700 text-xs font-medium">
              <AlertCircle className="w-4 h-4 shrink-0" />
              <span>{error}</span>
            </div>
          )}

          {/* Toggle Es Paquete */}
          <div className="flex items-center justify-between p-3.5 rounded-xl bg-slate-50 border border-slate-200">
            <div>
              <span className="font-bold text-sm text-slate-800 block">
                ¿Es un Paquete / Combo Promocional?
              </span>
              <span className="text-xs text-slate-500">
                Los paquetes combinan múltiples productos con precio especial y regalos
              </span>
            </div>
            <label className="relative inline-flex items-center cursor-pointer">
              <input
                type="checkbox"
                checked={formData.isPackage}
                onChange={(e) =>
                  setFormData((prev) => ({
                    ...prev,
                    isPackage: e.target.checked,
                    category: e.target.checked ? 'Paquetes Promocionales' : prev.category,
                  }))
                }
                className="sr-only peer"
              />
              <div className="w-11 h-6 bg-slate-300 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-slate-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
            </label>
          </div>

          {/* Nombre y SKU */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            <div className="sm:col-span-2">
              <label className="block text-xs font-bold text-slate-700 mb-1">
                Nombre del Artículo / Paquete *
              </label>
              <input
                type="text"
                required
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                placeholder="Ej. Paquete Básico Hogar OKEY ó Cloro Concentrado 5L"
                className="w-full px-3.5 py-2 text-sm border border-slate-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
              />
            </div>
            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">
                SKU / Código
              </label>
              <input
                type="text"
                value={formData.sku}
                onChange={(e) => setFormData({ ...formData, sku: e.target.value })}
                placeholder="Ej. PAQ-01"
                className="w-full px-3.5 py-2 text-sm uppercase font-mono border border-slate-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
              />
            </div>
          </div>

          {/* Categoría y Presentación */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">
                Categoría
              </label>
              <select
                value={formData.category}
                onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                className="w-full px-3.5 py-2 text-sm border border-slate-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none bg-white"
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
                Presentación / Empaque
              </label>
              <input
                type="text"
                value={formData.presentation}
                onChange={(e) => setFormData({ ...formData, presentation: e.target.value })}
                placeholder="Ej. Garrafa 5L, Porrón 20L, Pieza, Combo 4x5L"
                className="w-full px-3.5 py-2 text-sm border border-slate-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
              />
            </div>
          </div>

          {/* Costo, Precio y Cálculo en Vivo de Margen */}
          <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 space-y-3">
            <div className="flex items-center gap-1.5 text-xs font-bold text-slate-700 uppercase tracking-wider">
              <DollarSign className="w-4 h-4 text-emerald-600" />
              <span>Finanzas y Cálculo de Margen</span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              <div>
                <label className="block text-xs font-medium text-slate-600 mb-1">
                  Costo Base ($ MXN)
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
                  Precio de Venta ($ MXN) *
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
                  placeholder="20"
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

          {/* Regalo Sugerido */}
          <div>
            <label className="block text-xs font-bold text-slate-700 mb-1 flex items-center gap-1.5">
              <Gift className="w-4 h-4 text-amber-500" />
              <span>Regalo Sugerido / Promoción OKEY</span>
            </label>
            <input
              type="text"
              value={formData.suggestedGift}
              onChange={(e) => setFormData({ ...formData, suggestedGift: e.target.value })}
              placeholder="Ej. 2 Microfibras de regalo ó 1 Atomizador 1L de cortesía"
              className="w-full px-3.5 py-2 text-sm border border-amber-300/80 rounded-xl focus:ring-2 focus:ring-amber-500 outline-none bg-amber-50/20"
            />
            <span className="text-[11px] text-slate-400 mt-1 block">
              Aparecerá destacado en la tarjeta y en la propuesta comercial del cotizador.
            </span>
          </div>

          {/* Desglose de Contenido (si es paquete) */}
          {formData.isPackage && (
            <div className="p-4 rounded-xl bg-blue-50/50 border border-blue-200/80 space-y-3">
              <label className="block text-xs font-bold text-blue-900 uppercase tracking-wider">
                Artículos incluidos en el combo
              </label>

              <div className="flex gap-2">
                <input
                  type="text"
                  value={newItemText}
                  onChange={(e) => setNewItemText(e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter') {
                      e.preventDefault()
                      handleAddItemIncluded()
                    }
                  }}
                  placeholder="Ej. 1x Detergente Líquido 5L"
                  className="flex-1 px-3 py-1.5 text-xs border border-blue-200 rounded-lg outline-none bg-white"
                />
                <button
                  type="button"
                  onClick={handleAddItemIncluded}
                  className="px-3 py-1.5 text-xs font-bold bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors flex items-center gap-1"
                >
                  <Plus className="w-3.5 h-3.5" />
                  <span>Agregar</span>
                </button>
              </div>

              {formData.itemsIncluded.length > 0 && (
                <ul className="space-y-1.5">
                  {formData.itemsIncluded.map((item, idx) => (
                    <li
                      key={idx}
                      className="flex items-center justify-between text-xs bg-white px-3 py-1.5 rounded-lg border border-blue-100"
                    >
                      <span className="font-medium text-slate-800">{item}</span>
                      <button
                        type="button"
                        onClick={() => handleRemoveItemIncluded(idx)}
                        className="text-slate-400 hover:text-rose-600 p-0.5"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </li>
                  ))}
                </ul>
              )}
            </div>
          )}

          {/* Descripción */}
          <div>
            <label className="block text-xs font-bold text-slate-700 mb-1">
              Descripción Adicional
            </label>
            <textarea
              rows={2}
              value={formData.description}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              placeholder="Beneficios, instrucciones de uso o notas clave..."
              className="w-full px-3.5 py-2 text-sm border border-slate-300 rounded-xl focus:ring-2 focus:ring-blue-500 outline-none resize-none"
            />
          </div>

          {/* Modal Footer / Buttons */}
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
              {productToEdit ? 'Guardar Cambios' : 'Crear Producto'}
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}
