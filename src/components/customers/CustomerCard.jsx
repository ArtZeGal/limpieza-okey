import {
  MapPin,
  Phone,
  MessageCircle,
  Building,
  Home,
  Utensils,
  Shirt,
  Wrench,
  Edit2,
  Trash2,
  CheckCircle,
  ArrowRight,
  FileText
} from 'lucide-react'
import { useApp } from '../../context/AppContext'

export default function CustomerCard({ customer, onEdit }) {
  const { selectedCustomer, setSelectedCustomer, deleteCustomer, setActiveTab, showToast } = useApp()

  const isSelected = selectedCustomer?.id === customer.id

  // Formato para WhatsApp
  const cleanPhone = customer.whatsapp.replace(/\D/g, '')
  const whatsappUrl = `https://wa.me/52${cleanPhone}`

  const getCustomerTypeIcon = (type) => {
    switch (type) {
      case 'Restaurante / Alimentos':
        return <Utensils className="w-3.5 h-3.5" />
      case 'Lavandería / Tintorería':
        return <Shirt className="w-3.5 h-3.5" />
      case 'Industrial / Taller':
        return <Wrench className="w-3.5 h-3.5" />
      case 'Oficinas / Corporativo':
        return <Building className="w-3.5 h-3.5" />
      default:
        return <Home className="w-3.5 h-3.5" />
    }
  }

  const handleSelectCustomer = () => {
    setSelectedCustomer(customer)
    showToast(`Cliente "${customer.name}" vinculado a la orden`)
  }

  const handleSelectAndGoToQuoter = () => {
    setSelectedCustomer(customer)
    setActiveTab('quoter')
  }

  const handleDelete = () => {
    if (window.confirm(`¿Estás seguro de eliminar a "${customer.name}" del directorio de clientes?`)) {
      deleteCustomer(customer.id)
    }
  }

  return (
    <div
      className={`rounded-2xl p-5 bg-white border transition-all duration-200 flex flex-col justify-between ${
        isSelected
          ? 'border-blue-500 shadow-md ring-2 ring-blue-500/20 bg-blue-50/20'
          : 'border-slate-200/90 shadow-2xs hover:border-slate-300 hover:shadow-sm'
      }`}
    >
      <div>
        {/* Header: Name, Type and Actions */}
        <div className="flex items-start justify-between gap-2 mb-2">
          <div className="flex flex-wrap items-center gap-1.5">
            <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[11px] font-bold bg-slate-100 text-slate-700 border border-slate-200">
              {getCustomerTypeIcon(customer.type)}
              <span>{customer.type}</span>
            </span>
            {customer.ordersCount > 0 && (
              <span className="text-[10px] px-2 py-0.5 rounded-full bg-blue-50 text-blue-700 font-semibold">
                {customer.ordersCount} pedidos
              </span>
            )}
          </div>

          {/* Edit & Delete Actions */}
          <div className="flex items-center gap-1 text-slate-400">
            <button
              type="button"
              onClick={() => onEdit(customer)}
              className="p-1 rounded-lg hover:text-blue-600 hover:bg-blue-50 transition-colors"
              title="Editar cliente"
            >
              <Edit2 className="w-3.5 h-3.5" />
            </button>
            <button
              type="button"
              onClick={handleDelete}
              className="p-1 rounded-lg hover:text-rose-600 hover:bg-rose-50 transition-colors"
              title="Eliminar cliente"
            >
              <Trash2 className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>

        {/* Customer Name */}
        <h3 className="font-extrabold text-slate-900 text-base leading-snug">
          {customer.name}
        </h3>
        {customer.contactPerson && customer.contactPerson !== customer.name && (
          <p className="text-xs text-slate-500 font-medium">
            Atención: <strong className="text-slate-700">{customer.contactPerson}</strong>
          </p>
        )}

        {/* WhatsApp & Phone */}
        <div className="mt-3 flex items-center gap-2">
          <a
            href={whatsappUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-emerald-50 hover:bg-emerald-100 text-emerald-800 text-xs font-bold border border-emerald-200 transition-colors"
            title="Abrir chat de WhatsApp"
          >
            <MessageCircle className="w-3.5 h-3.5 text-emerald-600" />
            <span>{customer.whatsapp}</span>
          </a>
        </div>

        {/* Delivery Address & References */}
        <div className="mt-3.5 pt-3 border-t border-slate-100 space-y-2 text-xs">
          <div className="flex items-start gap-2 text-slate-700">
            <MapPin className="w-4 h-4 text-blue-600 shrink-0 mt-0.5" />
            <span className="font-medium leading-relaxed">
              {customer.address}
            </span>
          </div>

          {customer.references && (
            <div className="pl-6 text-[11px] text-slate-500 italic bg-slate-50 p-2 rounded-xl border border-slate-200/60">
              <strong>Ref:</strong> {customer.references}
            </div>
          )}

          {customer.notes && (
            <div className="flex items-start gap-1.5 text-[11px] text-slate-500 pt-1">
              <FileText className="w-3.5 h-3.5 text-slate-400 shrink-0 mt-0.5" />
              <span>{customer.notes}</span>
            </div>
          )}
        </div>
      </div>

      {/* Select Customer Button */}
      <div className="mt-4 pt-3 border-t border-slate-100">
        {isSelected ? (
          <div className="flex items-center justify-between p-2 rounded-xl bg-blue-50 border border-blue-200 text-blue-800 text-xs font-bold">
            <div className="flex items-center gap-1.5">
              <CheckCircle className="w-4 h-4 text-blue-600" />
              <span>Cliente vinculado a la orden actual</span>
            </div>
            <button
              type="button"
              onClick={() => setActiveTab('quoter')}
              className="text-blue-700 hover:underline flex items-center gap-0.5 text-[11px]"
            >
              <span>Ver Carrito</span>
              <ArrowRight className="w-3 h-3" />
            </button>
          </div>
        ) : (
          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={handleSelectCustomer}
              className="flex-1 py-2 px-3 rounded-xl text-xs font-bold border border-slate-300 text-slate-700 hover:bg-slate-50 transition-colors"
            >
              Seleccionar Cliente
            </button>
            <button
              type="button"
              onClick={handleSelectAndGoToQuoter}
              className="py-2 px-3 rounded-xl text-xs font-bold bg-blue-600 hover:bg-blue-700 text-white shadow-xs transition-colors flex items-center gap-1"
              title="Seleccionar e ir al cotizador"
            >
              <span>Cotizar</span>
              <ArrowRight className="w-3 h-3" />
            </button>
          </div>
        )}
      </div>
    </div>
  )
}
