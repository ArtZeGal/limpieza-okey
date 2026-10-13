import { AppProvider, useApp } from './context/AppContext'
import Navbar from './components/common/Navbar'
import CatalogView from './components/catalog/CatalogView'
import {
  ShoppingCart,
  Users,
  Receipt,
  Sparkles,
  ArrowRight,
  PackageCheck,
  CheckCircle2
} from 'lucide-react'

function AppContent() {
  const { activeTab, setActiveTab } = useApp()

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 flex flex-col font-sans">
      <Navbar />

      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-6">
        {/* Módulo 1: Catálogo */}
        {activeTab === 'catalog' && <CatalogView />}

        {/* Placeholder para Módulo 2: Cotizador / Carrito */}
        {activeTab === 'quoter' && (
          <div className="max-w-2xl mx-auto my-12 bg-white rounded-3xl border border-slate-200 p-8 text-center space-y-4 shadow-sm animate-in fade-in duration-200">
            <div className="w-16 h-16 rounded-2xl bg-emerald-50 text-emerald-600 mx-auto flex items-center justify-center">
              <ShoppingCart className="w-8 h-8" />
            </div>
            <div className="space-y-1">
              <span className="text-[11px] font-bold uppercase tracking-wider text-emerald-700 bg-emerald-100 px-2.5 py-0.5 rounded-full">
                Siguiente Módulo en la Lista
              </span>
              <h2 className="text-xl sm:text-2xl font-black text-slate-900">
                Cotizador / Carrito Dinámico
              </h2>
            </div>
            <p className="text-xs sm:text-sm text-slate-600 leading-relaxed max-w-md mx-auto">
              Aquí construiremos el desglose financiero: cálculo de subtotal, anticipo, saldo pendiente y la alerta de <strong>envío gratis</strong> a partir de $1,500 MXN.
            </p>
            <div className="pt-2 flex justify-center gap-3">
              <button
                type="button"
                onClick={() => setActiveTab('catalog')}
                className="px-4 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold transition-all shadow-sm"
              >
                Volver al Catálogo
              </button>
            </div>
          </div>
        )}

        {/* Placeholder para Módulo 3: Clientes */}
        {activeTab === 'customers' && (
          <div className="max-w-2xl mx-auto my-12 bg-white rounded-3xl border border-slate-200 p-8 text-center space-y-4 shadow-sm animate-in fade-in duration-200">
            <div className="w-16 h-16 rounded-2xl bg-violet-50 text-violet-600 mx-auto flex items-center justify-center">
              <Users className="w-8 h-8" />
            </div>
            <div className="space-y-1">
              <span className="text-[11px] font-bold uppercase tracking-wider text-violet-700 bg-violet-100 px-2.5 py-0.5 rounded-full">
                Módulo 3
              </span>
              <h2 className="text-xl sm:text-2xl font-black text-slate-900">
                Directorio y Búsqueda de Clientes
              </h2>
            </div>
            <p className="text-xs sm:text-sm text-slate-600 leading-relaxed max-w-md mx-auto">
              Búsqueda rápida por nombre o WhatsApp, historial de pedidos y autocompletado de dirección de entrega.
            </p>
            <div className="pt-2 flex justify-center gap-3">
              <button
                type="button"
                onClick={() => setActiveTab('catalog')}
                className="px-4 py-2.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-bold transition-colors"
              >
                Explorar Catálogo
              </button>
            </div>
          </div>
        )}

        {/* Placeholder para Módulo 4: Recibos */}
        {activeTab === 'receipts' && (
          <div className="max-w-2xl mx-auto my-12 bg-white rounded-3xl border border-slate-200 p-8 text-center space-y-4 shadow-sm animate-in fade-in duration-200">
            <div className="w-16 h-16 rounded-2xl bg-amber-50 text-amber-600 mx-auto flex items-center justify-center">
              <Receipt className="w-8 h-8" />
            </div>
            <div className="space-y-1">
              <span className="text-[11px] font-bold uppercase tracking-wider text-amber-700 bg-amber-100 px-2.5 py-0.5 rounded-full">
                Módulo 4
              </span>
              <h2 className="text-xl sm:text-2xl font-black text-slate-900">
                Generador de Recibos y WhatsApp
              </h2>
            </div>
            <p className="text-xs sm:text-sm text-slate-600 leading-relaxed max-w-md mx-auto">
              Folio tipo OK-001, desglose de pagos, datos bancarios BBVA y botón de envío directo a WhatsApp.
            </p>
            <div className="pt-2 flex justify-center gap-3">
              <button
                type="button"
                onClick={() => setActiveTab('catalog')}
                className="px-4 py-2.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-bold transition-colors"
              >
                Explorar Catálogo
              </button>
            </div>
          </div>
        )}
      </main>

      {/* Footer */}
      <footer className="border-t border-slate-200 bg-white py-4 mt-auto">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center text-xs text-slate-500 flex flex-col sm:flex-row items-center justify-between gap-2">
          <span>&copy; {new Date().getFullYear()} Limpieza OKEY &bull; Sistema Comercial & Recibos</span>
          <span>Desarrollado con Vite + React + Tailwind CSS</span>
        </div>
      </footer>
    </div>
  )
}

export default function App() {
  return (
    <AppProvider>
      <AppContent />
    </AppProvider>
  )
}
