import { useState } from 'react'
import {
  Package,
  ShoppingCart,
  Users,
  Receipt,
  Sparkles,
  Percent,
  Truck,
  MessageCircle,
  Building2,
  CheckCircle2
} from 'lucide-react'

function App() {
  const [activeTab, setActiveTab] = useState('catalog')

  const modules = [
    {
      id: 'catalog',
      title: 'Catálogo de Paquetes y Productos',
      icon: Package,
      badge: 'Precios & Margen',
      badgeColor: 'bg-blue-100 text-blue-800',
      description: 'Gestión de productos y paquetes de limpieza, visualización de costo vs. precio de venta, cálculo automático de margen de ganancia y regalos sugeridos promocionales.',
      features: ['Cálculo automático de margen (%) y ganancia ($)', 'Regalos sugeridos por paquete', 'Categorización por tipo de producto']
    },
    {
      id: 'quoter',
      title: 'Cotizador y Carrito Dinámico',
      icon: ShoppingCart,
      badge: 'Envío Gratis $1,500',
      badgeColor: 'bg-emerald-100 text-emerald-800',
      description: 'Armado rápido de cotizaciones, cálculo de subtotal, captura de anticipo, saldo pendiente y barra de meta para envío gratis a partir de $1,500 MXN.',
      features: ['Alerta y barra de progreso de envío gratis', 'Desglose de anticipo y saldo a contraentrega', 'Resumen rápido de artículos y cantidades']
    },
    {
      id: 'customers',
      title: 'Directorio de Clientes',
      icon: Users,
      badge: 'Búsqueda Rápida',
      badgeColor: 'bg-violet-100 text-violet-800',
      description: 'Búsqueda instantánea de clientes por nombre o WhatsApp, historial de pedidos y autocompletado inmediato de direcciones de entrega.',
      features: ['Búsqueda en tiempo real por teléfono o nombre', 'Autocompletado de dirección y referencias', 'Registro exprés de nuevos clientes']
    },
    {
      id: 'receipts',
      title: 'Generador de Recibos y Pedidos',
      icon: Receipt,
      badge: 'Folio OK-001 & WhatsApp',
      badgeColor: 'bg-amber-100 text-amber-800',
      description: 'Emisión inmediata de notas de venta con folio consecutivo, desglose detallado de pagos, datos bancarios BBVA y botón de envío directo a WhatsApp.',
      features: ['Folio consecutivo oficial (OK-001...)', 'Datos bancarios BBVA para transferencias', 'Mensaje formateado listo para WhatsApp']
    }
  ]

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 flex flex-col font-sans">
      {/* Top Navbar */}
      <header className="sticky top-0 z-30 bg-white/95 backdrop-blur border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-cyan-600 to-blue-600 flex items-center justify-center text-white shadow-md shadow-cyan-500/20">
              <Sparkles className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="font-extrabold text-lg tracking-tight bg-gradient-to-r from-cyan-700 to-blue-800 bg-clip-text text-transparent">
                  Limpieza OKEY
                </span>
                <span className="text-[10px] uppercase font-bold tracking-wider px-2 py-0.5 rounded-full bg-cyan-100 text-cyan-800">
                  App v1.0
                </span>
              </div>
              <p className="text-xs text-slate-500 hidden sm:block">Cotizaciones, Pedidos y Recibos Digitales</p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <div className="hidden md:flex items-center gap-1 bg-slate-100 p-1 rounded-lg border border-slate-200 text-xs font-medium">
              {modules.map((m) => {
                const Icon = m.icon
                const isActive = activeTab === m.id
                return (
                  <button
                    key={m.id}
                    onClick={() => setActiveTab(m.id)}
                    className={`flex items-center gap-1.5 px-3 py-1.5 rounded-md transition-all ${
                      isActive
                        ? 'bg-white text-blue-700 shadow-sm font-semibold'
                        : 'text-slate-600 hover:text-slate-900'
                    }`}
                  >
                    <Icon className="w-3.5 h-3.5" />
                    <span>{m.title.split(' ')[0]}</span>
                  </button>
                )
              })}
            </div>
            <a
              href="#rules"
              className="px-3 py-1.5 rounded-lg bg-blue-600 hover:bg-blue-700 text-white text-xs font-semibold shadow-sm transition-colors flex items-center gap-1.5"
            >
              <CheckCircle2 className="w-3.5 h-3.5" />
              <span>Reglas Activas</span>
            </a>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
        {/* Hero Section */}
        <div className="rounded-2xl bg-gradient-to-r from-blue-900 via-cyan-900 to-slate-900 text-white p-6 sm:p-8 shadow-xl relative overflow-hidden">
          <div className="absolute right-0 top-0 bottom-0 w-1/3 opacity-10 pointer-events-none flex items-center justify-center">
            <Sparkles className="w-96 h-96 text-white" />
          </div>
          <div className="relative z-10 max-w-3xl space-y-4">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-500/20 border border-cyan-400/30 text-cyan-200 text-xs font-medium backdrop-blur">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Proyecto Inicializado Exitosamente</span>
            </div>
            <h1 className="text-2xl sm:text-4xl font-extrabold tracking-tight text-white leading-tight">
              Sistema Comercial y Emisión de Recibos
            </h1>
            <p className="text-slate-300 text-sm sm:text-base leading-relaxed">
              Plataforma web ágil y responsiva para <strong>Limpieza OKEY</strong>, configurada con Vite, React,
              Tailwind CSS y Lucide Icons. Lista para implementar los 4 módulos de negocio con soporte móvil y escritorio.
            </p>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-2">
              <div className="bg-white/10 rounded-xl p-3 backdrop-blur border border-white/10">
                <div className="text-xs text-cyan-200">Envío Gratis</div>
                <div className="text-lg font-bold">A partir de $1,500</div>
              </div>
              <div className="bg-white/10 rounded-xl p-3 backdrop-blur border border-white/10">
                <div className="text-xs text-cyan-200">Formato Folio</div>
                <div className="text-lg font-bold">Tipo OK-001</div>
              </div>
              <div className="bg-white/10 rounded-xl p-3 backdrop-blur border border-white/10">
                <div className="text-xs text-cyan-200">Pagos</div>
                <div className="text-lg font-bold">BBVA & Efectivo</div>
              </div>
              <div className="bg-white/10 rounded-xl p-3 backdrop-blur border border-white/10">
                <div className="text-xs text-cyan-200">Envío Digital</div>
                <div className="text-lg font-bold">Vía WhatsApp</div>
              </div>
            </div>
          </div>
        </div>

        {/* Modules Grid */}
        <section className="space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-lg font-bold text-slate-900 tracking-tight flex items-center gap-2">
              <span>Módulos del Sistema</span>
              <span className="text-xs font-semibold px-2 py-0.5 rounded-full bg-slate-200 text-slate-700">
                4 principales
              </span>
            </h2>
            <span className="text-xs text-slate-500">Documentados en PROJECT_RULES.md</span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {modules.map((m) => {
              const Icon = m.icon
              const isSelected = activeTab === m.id
              return (
                <div
                  key={m.id}
                  onClick={() => setActiveTab(m.id)}
                  className={`rounded-xl border p-5 cursor-pointer transition-all ${
                    isSelected
                      ? 'border-blue-500 bg-blue-50/50 shadow-md ring-1 ring-blue-500'
                      : 'border-slate-200 bg-white hover:border-slate-300 hover:shadow-sm'
                  }`}
                >
                  <div className="flex items-start justify-between gap-3">
                    <div className="flex items-center gap-3">
                      <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${
                        isSelected ? 'bg-blue-600 text-white' : 'bg-slate-100 text-slate-700'
                      }`}>
                        <Icon className="w-5 h-5" />
                      </div>
                      <div>
                        <h3 className="font-bold text-slate-900 text-sm">{m.title}</h3>
                        <span className={`inline-block text-[11px] font-semibold px-2 py-0.5 rounded mt-1 ${m.badgeColor}`}>
                          {m.badge}
                        </span>
                      </div>
                    </div>
                  </div>
                  <p className="mt-3 text-xs text-slate-600 leading-relaxed">
                    {m.description}
                  </p>
                  <ul className="mt-3 pt-3 border-t border-slate-200/70 space-y-1.5">
                    {m.features.map((feat, i) => (
                      <li key={i} className="text-xs text-slate-700 flex items-center gap-2">
                        <div className="w-1.5 h-1.5 rounded-full bg-blue-500" />
                        <span>{feat}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )
            })}
          </div>
        </section>

        {/* Specifications and Directives summary */}
        <section id="rules" className="rounded-xl border border-slate-200 bg-white p-5 sm:p-6 space-y-4 shadow-sm">
          <div className="flex items-center gap-2 text-slate-900 font-bold text-base">
            <Building2 className="w-5 h-5 text-blue-600" />
            <span>Directrices del Negocio Guardadas</span>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 text-xs">
            <div className="p-3.5 rounded-lg bg-slate-50 border border-slate-200/80 space-y-1.5">
              <div className="font-semibold text-slate-800 flex items-center gap-1.5">
                <Percent className="w-4 h-4 text-cyan-600" />
                <span>Precios & Margen</span>
              </div>
              <p className="text-slate-500">
                Visualización transparente de márgenes de ganancia para paquetes y regalos de cortesía por volumen.
              </p>
            </div>

            <div className="p-3.5 rounded-lg bg-slate-50 border border-slate-200/80 space-y-1.5">
              <div className="font-semibold text-slate-800 flex items-center gap-1.5">
                <Truck className="w-4 h-4 text-emerald-600" />
                <span>Envío Gratis</span>
              </div>
              <p className="text-slate-500">
                Activación automática con subtotal &ge; $1,500 MXN con indicador de cuánto falta para desbloquearlo.
              </p>
            </div>

            <div className="p-3.5 rounded-lg bg-slate-50 border border-slate-200/80 space-y-1.5">
              <div className="font-semibold text-slate-800 flex items-center gap-1.5">
                <Users className="w-4 h-4 text-violet-600" />
                <span>Clientes Ágiles</span>
              </div>
              <p className="text-slate-500">
                Búsqueda predictiva por nombre o número de WhatsApp con autollenado de dirección de entrega.
              </p>
            </div>

            <div className="p-3.5 rounded-lg bg-slate-50 border border-slate-200/80 space-y-1.5">
              <div className="font-semibold text-slate-800 flex items-center gap-1.5">
                <MessageCircle className="w-4 h-4 text-green-600" />
                <span>Recibo WhatsApp</span>
              </div>
              <p className="text-slate-500">
                Generador de folios OK-001 con cuenta BBVA y envío instantáneo del desglose con un solo toque.
              </p>
            </div>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="border-t border-slate-200 bg-white py-4 mt-auto">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center text-xs text-slate-500 flex flex-col sm:flex-row items-center justify-between gap-2">
          <span>&copy; {new Date().getFullYear()} Limpieza OKEY &bull; Aplicación Comercial</span>
          <span>Configurado con Vite + React + Tailwind CSS + Lucide Icons</span>
        </div>
      </footer>
    </div>
  )
}

export default App
