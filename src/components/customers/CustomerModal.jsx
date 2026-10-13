import { useState, useEffect } from 'react'
import {
  X,
  User,
  Phone,
  MapPin,
  Building,
  FileText,
  AlertCircle,
  MessageCircle
} from 'lucide-react'
import { CUSTOMER_TYPES } from '../../data/initialCustomers'
import { useApp } from '../../context/AppContext'

export default function CustomerModal({ isOpen, onClose, customerToEdit }) {
  const { addCustomer, updateCustomer } = useApp()

  const types = CUSTOMER_TYPES.filter((t) => t !== 'Todos')

  const [formData, setFormData] = useState({
    name: '',
    contactPerson: '',
    whatsapp: '',
    type: 'Hogar / Particular',
    address: '',
    references: '',
    notes: '',
  })

  const [error, setError] = useState('')

  useEffect(() => {
    if (customerToEdit) {
      setFormData({
        name: customerToEdit.name || '',
        contactPerson: customerToEdit.contactPerson || '',
        whatsapp: customerToEdit.whatsapp || '',
        type: customerToEdit.type || 'Hogar / Particular',
        address: customerToEdit.address || '',
        references: customerToEdit.references || '',
        notes: customerToEdit.notes || '',
      })
    } else {
      setFormData({
        name: '',
        contactPerson: '',
        whatsapp: '',
        type: 'Hogar / Particular',
        address: '',
        references: '',
        notes: '',
      })
    }
    setError('')
  }, [customerToEdit, isOpen])

  if (!isOpen) return null

  const handleSubmit = (e) => {
    e.preventDefault()

    if (!formData.name.trim()) {
      setError('Por favor ingresa el nombre del cliente o negocio.')
      return
    }
    if (!formData.whatsapp.trim()) {
      setError('Por favor ingresa el número de WhatsApp para contacto y recibos.')
      return
    }
    if (!formData.address.trim()) {
      setError('Por favor especifica la dirección de entrega para los repartos.')
      return
    }

    const payload = {
      ...formData,
      name: formData.name.trim(),
      contactPerson: formData.contactPerson.trim() || formData.name.trim(),
      whatsapp: formData.whatsapp.trim(),
      address: formData.address.trim(),
      references: formData.references.trim(),
      notes: formData.notes.trim(),
    }

    if (customerToEdit) {
      updateCustomer(customerToEdit.id, payload)
    } else {
      addCustomer(payload)
    }

    onClose()
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs animate-in fade-in duration-150">
      <div className="bg-white rounded-3xl w-full max-w-xl max-h-[90vh] flex flex-col shadow-2xl border border-slate-200 overflow-hidden">
        {/* Modal Header */}
        <div className="px-6 py-4 border-b border-slate-200 flex items-center justify-between bg-slate-50">
          <div className="flex items-center gap-2.5">
            <div className="p-2 rounded-xl bg-violet-600 text-white">
              <User className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-base sm:text-lg font-bold text-slate-900">
                {customerToEdit ? 'Editar Datos del Cliente' : 'Registrar Nuevo Cliente'}
              </h2>
              <p className="text-xs text-slate-500">
                Limpieza OKEY &bull; Directorio y autocompletado de entregas
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

        {/* Modal Body */}
        <form onSubmit={handleSubmit} className="flex-1 overflow-y-auto p-6 space-y-4">
          {error && (
            <div className="p-3 rounded-xl bg-rose-50 border border-rose-200 flex items-center gap-2 text-rose-700 text-xs font-medium">
              <AlertCircle className="w-4 h-4 shrink-0" />
              <span>{error}</span>
            </div>
          )}

          {/* Nombre y Contacto */}
          <div className="space-y-3">
            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">
                Nombre del Cliente o Razón Social *
              </label>
              <input
                type="text"
                required
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                placeholder="Ej. Restaurante El Portón ó Mariana López"
                className="w-full px-3.5 py-2 text-sm border border-slate-300 rounded-xl focus:ring-2 focus:ring-blue-500 outline-none"
              />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1 flex items-center gap-1">
                  <MessageCircle className="w-3.5 h-3.5 text-emerald-600" />
                  <span>WhatsApp / Teléfono *</span>
                </label>
                <input
                  type="tel"
                  required
                  value={formData.whatsapp}
                  onChange={(e) => setFormData({ ...formData, whatsapp: e.target.value })}
                  placeholder="Ej. 55 1234 5678"
                  className="w-full px-3.5 py-2 text-sm font-semibold border border-slate-300 rounded-xl focus:ring-2 focus:ring-blue-500 outline-none"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  Tipo de Cliente
                </label>
                <select
                  value={formData.type}
                  onChange={(e) => setFormData({ ...formData, type: e.target.value })}
                  className="w-full px-3.5 py-2 text-sm border border-slate-300 rounded-xl focus:ring-2 focus:ring-blue-500 outline-none bg-white"
                >
                  {types.map((t) => (
                    <option key={t} value={t}>
                      {t}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            <div>
              <label className="block text-xs font-medium text-slate-600 mb-1">
                Persona de Contacto o Encargado de Compras (opcional)
              </label>
              <input
                type="text"
                value={formData.contactPerson}
                onChange={(e) => setFormData({ ...formData, contactPerson: e.target.value })}
                placeholder="Ej. Don Roberto (Chef) o Claudia Mendoza"
                className="w-full px-3.5 py-2 text-sm border border-slate-300 rounded-xl focus:ring-2 focus:ring-blue-500 outline-none"
              />
            </div>
          </div>

          {/* Dirección y Referencias */}
          <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 space-y-3">
            <div className="flex items-center gap-1.5 text-xs font-bold text-slate-700 uppercase tracking-wider">
              <MapPin className="w-4 h-4 text-blue-600" />
              <span>Dirección de Entrega y Reparto</span>
            </div>

            <div>
              <label className="block text-xs font-medium text-slate-600 mb-1">
                Dirección Completa *
              </label>
              <input
                type="text"
                required
                value={formData.address}
                onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                placeholder="Calle, número ext/int, colonia, municipio y C.P."
                className="w-full px-3.5 py-2 text-sm border border-slate-300 rounded-xl focus:ring-2 focus:ring-blue-500 outline-none bg-white"
              />
            </div>

            <div>
              <label className="block text-xs font-medium text-slate-600 mb-1">
                Referencias para el Repartidor
              </label>
              <input
                type="text"
                value={formData.references}
                onChange={(e) => setFormData({ ...formData, references: e.target.value })}
                placeholder="Ej. Entre calles X y Y, portón blanco, zaguán con timbre 3"
                className="w-full px-3.5 py-2 text-xs border border-slate-300 rounded-xl focus:ring-2 focus:ring-blue-500 outline-none bg-white"
              />
            </div>
          </div>

          {/* Notas */}
          <div>
            <label className="block text-xs font-bold text-slate-700 mb-1">
              Notas Comerciales / Preferencias de Entrega
            </label>
            <textarea
              rows={2}
              value={formData.notes}
              onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
              placeholder="Preferencias de aroma, horarios de recepción, requerimiento de factura, etc."
              className="w-full px-3.5 py-2 text-xs border border-slate-300 rounded-xl focus:ring-2 focus:ring-blue-500 outline-none resize-none"
            />
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
              {customerToEdit ? 'Guardar Cambios' : 'Registrar Cliente'}
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}
