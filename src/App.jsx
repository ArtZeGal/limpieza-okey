import { AppProvider, useApp } from './context/AppContext'
import Navbar from './components/common/Navbar'
import CatalogView from './components/catalog/CatalogView'
import QuoterView from './components/quoter/QuoterView'
import CustomersView from './components/customers/CustomersView'
import {
  Receipt,
  Sparkles,
  ArrowRight
} from 'lucide-react'

function AppContent() {
  const { activeTab, setActiveTab } = useApp()

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 flex flex-col font-sans">
      <Navbar />

      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-6">
        {/* Módulo 1: Catálogo */}
        {activeTab === 'catalog' && <CatalogView />}

        {/* Módulo 2: Cotizador / Carrito */}
        {activeTab === 'quoter' && <QuoterView />}

        {/* Módulo 3: Clientes */}
        {activeTab === 'customers' && <CustomersView />}

        {/* Placeholder para Módulo 4: Recibos */}
        {activeTab === 'receipts' && (
          <div className="max-w-2xl mx-auto my-12 bg-white rounded-3xl border border-slate-200 p-8 text-center space-y-4 shadow-sm animate-in fade-in duration-200">
            <div className="w-16 h-16 rounded-2xl bg-amber-50 text-amber-600 mx-auto flex items-center justify-center">
              <Receipt className="w-8 h-8" />
            </div>
            <div className="space-y-1">
              <span className="text-[11px] font-bold uppercase tracking-wider text-amber-700 bg-amber-100 px-2.5 py-0.5 rounded-full">
                Siguiente Módulo en la Lista
              </span>
              <h2 className="text-xl sm:text-2xl font-black text-slate-900">
                Generador de Recibos y WhatsApp
              </h2>
            </div>
            <p className="text-xs sm:text-sm text-slate-600 leading-relaxed max-w-md mx-auto">
              Folio oficial consecutivo tipo <strong>OK-001</strong>, desglose formal de pago, datos de transferencia bancaria BBVA y botón directo de emisión y envío por WhatsApp.
            </p>
            <div className="pt-2 flex justify-center gap-3">
              <button
                type="button"
                onClick={() => setActiveTab('quoter')}
                className="px-4 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold transition-all shadow-sm"
              >
                Revisar Cotizador
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
