import { useState, useMemo } from 'react'
import {
  Search,
  Plus,
  Users,
  RotateCcw,
  CheckCircle2,
  XCircle,
  ShoppingCart,
  MessageCircle,
  Building2,
  Sparkles
} from 'lucide-react'
import { useApp } from '../../context/AppContext'
import { CUSTOMER_TYPES } from '../../data/initialCustomers'
import CustomerCard from './CustomerCard'
import CustomerModal from './CustomerModal'

export default function CustomersView() {
  const {
    customers,
    selectedCustomer,
    clearSelectedCustomer,
    resetCustomers,
    setActiveTab,
    cartTotalItems
  } = useApp()

  const [searchQuery, setSearchQuery] = useState('')
  const [selectedType, setSelectedType] = useState('Todos')
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [customerToEdit, setCustomerToEdit] = useState(null)

  // Filtrado reactivo en tiempo real
  const filteredCustomers = useMemo(() => {
    return customers.filter((cust) => {
      // Filtro de tipo
      if (selectedType !== 'Todos' && cust.type !== selectedType) {
        return false
      }

      // Filtro de búsqueda (nombre, persona de contacto, whatsapp o dirección)
      if (searchQuery.trim()) {
        const query = searchQuery.toLowerCase().trim()
        const matchName = cust.name.toLowerCase().includes(query)
        const matchContact = cust.contactPerson?.toLowerCase().includes(query)
        const matchPhone = cust.whatsapp.replace(/\D/g, '').includes(query.replace(/\D/g, ''))
        const matchAddress = cust.address.toLowerCase().includes(query)
        const matchReferences = cust.references?.toLowerCase().includes(query)
        return matchName || matchContact || matchPhone || matchAddress || matchReferences
      }

      return true
    })
  }, [customers, selectedType, searchQuery])

  const handleOpenNew = () => {
    setCustomerToEdit(null)
    setIsModalOpen(true)
  }

  const handleEdit = (customer) => {
    setCustomerToEdit(customer)
    setIsModalOpen(true)
  }

  return (
    <div className="space-y-6 animate-in fade-in duration-200">
      {/* Header & Controls */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 bg-white p-5 rounded-2xl border border-slate-200 shadow-xs">
        <div>
          <div className="flex items-center gap-2">
            <h1 className="text-xl sm:text-2xl font-black text-slate-900 tracking-tight">
              Directorio de Clientes
            </h1>
            <span className="text-xs font-bold px-2.5 py-0.5 rounded-full bg-violet-100 text-violet-800">
              {filteredCustomers.length} de {customers.length}
            </span>
          </div>
          <p className="text-xs text-slate-500 mt-1">
            Búsqueda instantánea por nombre o WhatsApp y autocompletado automático de dirección de entrega.
          </p>
        </div>

        {/* Action Buttons */}
        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={handleOpenNew}
            className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs font-bold bg-blue-600 hover:bg-blue-700 text-white shadow-sm shadow-blue-500/20 transition-all active:scale-98"
          >
            <Plus className="w-4 h-4" />
            <span>Nuevo Cliente</span>
          </button>
        </div>
      </div>

      {/* Selected Customer Active Banner */}
      {selectedCustomer && (
        <div className="p-4 rounded-2xl bg-gradient-to-r from-blue-50 via-indigo-50 to-cyan-50 border border-blue-200 shadow-2xs flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 text-xs">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-blue-600 text-white flex items-center justify-center shrink-0 shadow-xs">
              <CheckCircle2 className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="font-bold text-slate-800">
                  Cliente Vinculado a la Cotización:
                </span>
                <span className="font-extrabold text-blue-900 text-sm">
                  {selectedCustomer.name}
                </span>
              </div>
              <p className="text-slate-600 mt-0.5">
                Dirección autocompletada: {selectedCustomer.address} &bull; WhatsApp: {selectedCustomer.whatsapp}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2 shrink-0">
            <button
              type="button"
              onClick={() => setActiveTab('quoter')}
              className="px-3.5 py-1.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs transition-colors shadow-xs flex items-center gap-1.5"
            >
              <ShoppingCart className="w-3.5 h-3.5" />
              <span>Ir al Carrito ({cartTotalItems})</span>
            </button>
            <button
              type="button"
              onClick={clearSelectedCustomer}
              className="p-1.5 rounded-xl text-slate-400 hover:text-slate-700 hover:bg-slate-200/50 transition-colors"
              title="Desvincular cliente"
            >
              <XCircle className="w-4 h-4" />
            </button>
          </div>
        </div>
      )}

      {/* Search and Filters */}
      <div className="space-y-3">
        {/* Search Bar */}
        <div className="relative">
          <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-3" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Buscar por nombre, persona de contacto, número de WhatsApp o dirección..."
            className="w-full pl-10 pr-4 py-2.5 text-xs sm:text-sm bg-white border border-slate-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none shadow-2xs"
          />
          {searchQuery && (
            <button
              type="button"
              onClick={() => setSearchQuery('')}
              className="absolute right-3 top-2.5 text-xs text-slate-400 hover:text-slate-600 font-bold"
            >
              Limpiar
            </button>
          )}
        </div>

        {/* Filter Pills */}
        <div className="flex items-center gap-1.5 overflow-x-auto pb-1 scrollbar-none text-xs">
          {CUSTOMER_TYPES.map((type) => {
            const isSelected = selectedType === type
            return (
              <button
                key={type}
                type="button"
                onClick={() => setSelectedType(type)}
                className={`whitespace-nowrap px-3.5 py-1.5 rounded-xl font-bold transition-all ${
                  isSelected
                    ? 'bg-slate-900 text-white shadow-xs'
                    : 'bg-white text-slate-600 border border-slate-200 hover:bg-slate-100 hover:text-slate-900'
                }`}
              >
                {type}
              </button>
            )
          })}
        </div>
      </div>

      {/* Customer Grid */}
      {filteredCustomers.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {filteredCustomers.map((cust) => (
            <CustomerCard
              key={cust.id}
              customer={cust}
              onEdit={handleEdit}
            />
          ))}
        </div>
      ) : (
        /* Empty State */
        <div className="text-center py-12 px-4 bg-white rounded-2xl border border-slate-200 space-y-3">
          <div className="w-12 h-12 mx-auto rounded-full bg-slate-100 flex items-center justify-center text-slate-400">
            <Users className="w-6 h-6" />
          </div>
          <h3 className="font-bold text-slate-800 text-sm">No se encontraron clientes</h3>
          <p className="text-xs text-slate-500 max-w-sm mx-auto">
            No hay registros que coincidan con la búsqueda "{searchQuery}".
          </p>
          <div className="flex justify-center gap-2 pt-2">
            <button
              type="button"
              onClick={() => {
                setSearchQuery('')
                setSelectedType('Todos')
              }}
              className="px-3 py-1.5 rounded-lg bg-slate-100 text-xs font-semibold text-slate-700 hover:bg-slate-200"
            >
              Limpiar búsqueda
            </button>
            <button
              type="button"
              onClick={handleOpenNew}
              className="px-3 py-1.5 rounded-lg bg-blue-600 text-xs font-semibold text-white hover:bg-blue-700"
            >
              Registrar nuevo cliente
            </button>
          </div>
        </div>
      )}

      {/* Reset directory button */}
      <div className="flex items-center justify-between text-xs text-slate-400 pt-4 border-t border-slate-200">
        <span>Directorio guardado en el almacenamiento local</span>
        <button
          type="button"
          onClick={() => {
            if (window.confirm('¿Deseas restablecer el directorio a los clientes de muestra iniciales?')) {
              resetCustomers()
            }
          }}
          className="hover:text-slate-700 flex items-center gap-1 transition-colors"
        >
          <RotateCcw className="w-3 h-3" />
          <span>Restablecer clientes iniciales</span>
        </button>
      </div>

      {/* Customer Modal */}
      <CustomerModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        customerToEdit={customerToEdit}
      />
    </div>
  )
}
