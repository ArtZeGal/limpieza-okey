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
  FileText,
  Bell
} from 'lucide-react'
import { useApp } from '../../context/AppContext'

export default function CustomerCard({ customer, onEdit }) {
  const { selectedCustomer, setSelectedCustomer, deleteCustomer, setActiveTab, showToast, receipts } = useApp()

  const isSelected = selectedCustomer?.id === customer.id

  // Formato para WhatsApp
  const cleanPhone = customer.whatsapp ? customer.whatsapp.replace(/\D/g, '') : ''
  const whatsappUrl = cleanPhone ? `https://wa.me/52${cleanPhone}` : '#'

  // Cálculo de Reorden Inteligente (30 días)
  const customerReceipts = (receipts || []).filter(
    (r) =>
      (r.customerName && r.customerName.toLowerCase().trim() === customer.name.toLowerCase().trim()) ||
      (r.customerPhone && cleanPhone && r.customerPhone.replace(/\D/g, '') === cleanPhone)
  )
  const lastReceipt = customerReceipts[0]
  const lastDateStr = lastReceipt?.date || lastReceipt?.createdAt || customer.lastPurchaseDate || customer.createdAt || '2026-09-01'

  const parseCustomerDate = (str) => {
    if (!str) return new Date(2026, 8, 1)
    if (str.includes('/')) {
      const parts = str.split('/')
      if (parts.length === 3) {
        return new Date(Number(parts[2]), Number(parts[1]) - 1, Number(parts[0]))
      }
    }
    const d = new Date(str)
    return isNaN(d.getTime()) ? new Date(2026, 8, 1) : d
  }

  const lastPurchaseDateObj = parseCustomerDate(lastDateStr)
  const now = new Date()
  const daysSinceLastPurchase = Math.max(0, Math.floor((now - lastPurchaseDateObj) / (1000 * 60 * 60 * 24)))
  const isReorderDue = daysSinceLastPurchase >= 30

  const handleSendReorderWhatsApp = () => {
    if (!cleanPhone) {
      showToast('Este cliente no tiene teléfono o WhatsApp registrado', 'error')
      return
    }
    const contact = customer.contactPerson || customer.name
    const text = `¡Hola ${contact}! 🌸 Buenas tardes de Limpieza OKEY.

Esperamos que se encuentre muy bien. Notamos que hace aprox. ${daysSinceLastPurchase} días le surtimos sus productos de limpieza y queríamos ver cómo van en sus instalaciones (pisos, jabón de manos, desengrasante, etc.).

Esta semana tenemos entregas programadas en su zona, ¿gusta que le llevemos algo a domicilio? 🚚✨

Quedamos a sus órdenes con mucho gusto.
_Limpieza OKEY · Atención personalizada_`

    const url = `https://wa.me/52${cleanPhone}?text=${encodeURIComponent(text)}`
    window.open(url, '_blank')
  }

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
          {cleanPhone ? (
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
          ) : (
            <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-xl bg-slate-100 text-slate-500 text-[11px] font-medium border border-slate-200">
              <Phone className="w-3 h-3 text-slate-400" />
              <span>Sin WhatsApp registrado</span>
            </span>
          )}
        </div>

        {/* Banner de Reorden Inteligente (+30 días) */}
        {isReorderDue && (
          <div className="mt-3 p-2.5 rounded-xl bg-amber-50 border border-amber-200/90 flex items-center justify-between gap-2 text-xs">
            <div className="flex items-center gap-1.5 text-amber-900 min-w-0">
              <Bell className="w-3.5 h-3.5 text-amber-600 shrink-0" />
              <div className="min-w-0">
                <span className="font-extrabold text-[11px] block text-amber-900 truncate">
                  🔔 Reorden sugerido (+30 días)
                </span>
                <span className="text-[10px] text-amber-700 block">
                  Última compra hace {daysSinceLastPurchase} días
                </span>
              </div>
            </div>

            {cleanPhone && (
              <button
                type="button"
                onClick={handleSendReorderWhatsApp}
                className="px-2.5 py-1 rounded-lg bg-emerald-600 hover:bg-emerald-700 active:scale-95 text-white font-black text-[10px] shadow-2xs flex items-center gap-1 shrink-0 transition-all"
                title="Enviar recordatorio de recompra cordial por WhatsApp"
              >
                <MessageCircle className="w-3 h-3" />
                <span>Recordar</span>
              </button>
            )}
          </div>
        )}

        {/* Delivery Address & References */}
        <div className="mt-3.5 pt-3 border-t border-slate-100 space-y-2 text-xs">
          {customer.address ? (
            <div className="flex items-start gap-2 text-slate-700">
              <MapPin className="w-4 h-4 text-blue-600 shrink-0 mt-0.5" />
              <span className="font-medium leading-relaxed">
                {customer.address}
              </span>
            </div>
          ) : (
            <div className="flex items-center gap-2 text-slate-400 italic text-[11px]">
              <MapPin className="w-3.5 h-3.5 text-slate-300 shrink-0" />
              <span>Dirección pendiente de registrar</span>
            </div>
          )}

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
