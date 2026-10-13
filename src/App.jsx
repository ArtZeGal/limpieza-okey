import { AppProvider, useApp } from './context/AppContext'
import Navbar from './components/common/Navbar'
import CatalogView from './components/catalog/CatalogView'
import QuoterView from './components/quoter/QuoterView'
import CustomersView from './components/customers/CustomersView'
import ReceiptsView from './components/receipts/ReceiptsView'

function AppContent() {
  const { activeTab } = useApp()

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

        {/* Módulo 4: Recibos */}
        {activeTab === 'receipts' && <ReceiptsView />}
      </main>

      {/* Footer */}
      <footer className="border-t border-slate-200 bg-white py-4 mt-auto">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center text-xs text-slate-500 flex flex-col sm:flex-row items-center justify-between gap-2">
          <span>&copy; {new Date().getFullYear()} Limpieza OKEY &bull; Sistema Comercial & Recibos Digitales</span>
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
