import { useState } from 'react'
import {
  User,
  Users,
  MapPin,
  MessageCircle,
  CheckCircle2,
  X,
  Search,
  Plus,
  ArrowRight
} from 'lucide-react'
import { useApp } from '../../context/AppContext'
import CustomerModal from '../customers/CustomerModal'

export default function CustomerSelector() {
  const {
    customers,
    selectedCustomer,
    setSelectedCustomer,
    clearSelectedCustomer,
    setActiveTab,
  } = useApp()

  const [isSearchOpen, setIsSearchOpen] = useState(false)
  const [query, setQuery] = useState('')
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false)

  // Filtrar sugerencias de clientes
  const matchingCustomers = customers.filter((c) => {
    if (!query.trim()) return true
    const q = query.toLowerCase().trim()
    const matchName = c.name.toLowerCase().includes(q)
    const matchPhone = c.whatsapp.replace(/\D/g, '').includes(q.replace(/\D/g, ''))
    const matchAddress = c.address.toLowerCase().includes(q)
    return matchName || matchPhone || matchAddress
  }).slice(0, 5)

  const handleSelect = (cust) => {
    setSelectedCustomer(cust)
    setIsSearchOpen(false)
    setQuery('')
  }

  return (
    <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 space-y-3">
      <div className="flex items-center justify-between">
        <label className="text-xs font-bold text-slate-800 flex items-center gap-1.5">
          <User className="w-4 h-4 text-violet-600" />
          <span>Cliente y Dirección de Entrega</span>
        </label>
        {selectedCustomer && (
          <button
            type="button"
            onClick={clearSelectedCustomer}
            className="text-[11px] font-semibold text-slate-400 hover:text-rose-600 transition-colors"
          >
            Desvincular
          </button>
        )}
      </div>

      {selectedCustomer ? (
        /* Cliente Seleccionado con Dirección Autocompletada */
        <div className="p-3.5 rounded-xl bg-white border border-blue-200/90 shadow-2xs space-y-2">
          <div className="flex items-start justify-between gap-2">
            <div>
              <div className="flex items-center gap-2">
                <strong className="text-sm font-extrabold text-slate-900">
                  {selectedCustomer.name}
                </strong>
                <span className="text-[10px] px-2 py-0.2 rounded-full font-bold bg-violet-100 text-violet-800">
                  {selectedCustomer.type}
                </span>
              </div>
              <div className="flex items-center gap-1.5 text-xs text-emerald-700 font-semibold mt-0.5">
                <MessageCircle className="w-3.5 h-3.5" />
                <span>WhatsApp: {selectedCustomer.whatsapp}</span>
              </div>
            </div>
            <button
              type="button"
              onClick={() => setIsSearchOpen(true)}
              className="text-[11px] font-bold text-blue-600 hover:underline"
            >
              Cambiar
            </button>
          </div>

          {/* Dirección Autocompletada */}
          <div className="pt-2 border-t border-slate-100 text-xs space-y-1">
            <div className="flex items-start gap-1.5 text-slate-700 font-medium">
              <MapPin className="w-3.5 h-3.5 text-blue-600 shrink-0 mt-0.5" />
              <span>{selectedCustomer.address}</span>
            </div>
            {selectedCustomer.references && (
              <p className="text-[11px] text-slate-500 italic pl-5">
                Ref: {selectedCustomer.references}
              </p>
            )}
          </div>
        </div>
      ) : (
        /* Selector o Buscador Rápido */
        <div className="space-y-2">
          {!isSearchOpen ? (
            <div className="flex gap-2">
              <button
                type="button"
                onClick={() => setIsSearchOpen(true)}
                className="flex-1 py-2 px-3 rounded-xl border border-dashed border-slate-300 hover:border-blue-400 bg-white hover:bg-blue-50/30 text-xs font-semibold text-slate-600 hover:text-blue-700 transition-all flex items-center justify-center gap-2 shadow-2xs"
              >
                <Search className="w-3.5 h-3.5 text-slate-400" />
                <span>Buscar Cliente por Nombre / WhatsApp</span>
              </button>
              <button
                type="button"
                onClick={() => setIsCreateModalOpen(true)}
                className="py-2 px-3 rounded-xl bg-violet-600 hover:bg-violet-700 text-white text-xs font-bold transition-colors flex items-center gap-1 shadow-2xs"
                title="Registrar cliente express"
              >
                <Plus className="w-3.5 h-3.5" />
                <span>Nuevo</span>
              </button>
            </div>
          ) : (
            <div className="space-y-2 animate-in fade-in duration-150">
              <div className="relative">
                <Search className="w-3.5 h-3.5 text-slate-400 absolute left-3 top-2.5" />
                <input
                  type="text"
                  autoFocus
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  placeholder="Escribe nombre o teléfono..."
                  className="w-full pl-8 pr-8 py-2 text-xs border border-blue-400 rounded-xl outline-none focus:ring-2 focus:ring-blue-500 bg-white font-medium"
                />
                <button
                  type="button"
                  onClick={() => {
                    setIsSearchOpen(false)
                    setQuery('')
                  }}
                  className="absolute right-2.5 top-2.5 text-slate-400 hover:text-slate-600"
                >
                  <X className="w-3.5 h-3.5" />
                </button>
              </div>

              {/* Lista Desplegable de Resultados */}
              <div className="max-h-48 overflow-y-auto bg-white rounded-xl border border-slate-200 shadow-md divide-y divide-slate-100">
                {matchingCustomers.length > 0 ? (
                  matchingCustomers.map((cust) => (
                    <div
                      key={cust.id}
                      onClick={() => handleSelect(cust)}
                      className="p-2.5 hover:bg-blue-50 cursor-pointer transition-colors text-xs flex items-center justify-between"
                    >
                      <div className="min-w-0 pr-2">
                        <div className="font-bold text-slate-900 truncate">
                          {cust.name}
                        </div>
                        <div className="text-[11px] text-slate-500 truncate">
                          {cust.whatsapp} &bull; {cust.address}
                        </div>
                      </div>
                      <span className="text-[10px] font-bold text-blue-600 shrink-0">
                        Seleccionar
                      </span>
                    </div>
                  ))
                ) : (
                  <div className="p-3 text-center text-xs text-slate-500">
                    No se encontró "{query}".
                  </div>
                )}
                <div
                  onClick={() => {
                    setIsSearchOpen(false)
                    setIsCreateModalOpen(true)
                  }}
                  className="p-2.5 bg-slate-50 hover:bg-slate-100 text-center text-xs font-bold text-violet-700 cursor-pointer transition-colors flex items-center justify-center gap-1.5"
                >
                  <Plus className="w-3.5 h-3.5" />
                  <span>Registrar nuevo cliente</span>
                </div>
              </div>
            </div>
          )}
        </div>
      )}

      {/* Modal para alta rápida */}
      <CustomerModal
        isOpen={isCreateModalOpen}
        onClose={() => setIsCreateModalOpen(false)}
        customerToEdit={null}
      />
    </div>
  )
}
