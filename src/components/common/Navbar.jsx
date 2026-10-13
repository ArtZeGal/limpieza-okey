import {
  Package,
  ShoppingCart,
  Users,
  Receipt,
  Sparkles,
  CheckCircle,
  Info,
  AlertTriangle,
  Menu,
  X,
  DownloadCloud,
  Boxes,
  BookOpen
} from 'lucide-react'
import { useState, useEffect } from 'react'
import { useApp } from '../../context/AppContext'
import { formatCurrency } from '../../utils/formatters'

export default function Navbar() {
  const { activeTab, setActiveTab, cartTotalItems, cartSubtotal, toast, receipts, customers, showToast } = useApp()
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [installPrompt, setInstallPrompt] = useState(null)
  const [isInstalled, setIsInstalled] = useState(false)

  useEffect(() => {
    // Detectar si ya está en modo standalone (instalada)
    if (window.matchMedia('(display-mode: standalone)').matches || window.navigator.standalone) {
      setIsInstalled(true)
    }

    const handleBeforeInstall = (e) => {
      e.preventDefault()
      setInstallPrompt(e)
    }

    window.addEventListener('beforeinstallprompt', handleBeforeInstall)
    window.addEventListener('appinstalled', () => {
      setIsInstalled(true)
      setInstallPrompt(null)
      showToast('¡Limpieza OKEY instalada con éxito!')
    })

    return () => {
      window.removeEventListener('beforeinstallprompt', handleBeforeInstall)
    }
  }, [showToast])

  const handleInstallClick = async () => {
    if (!installPrompt) {
      showToast('Para instalar en iPhone: presiona Compartir y "Agregar a pantalla de inicio"', 'info')
      return
    }
    installPrompt.prompt()
    const { outcome } = await installPrompt.userChoice
    if (outcome === 'accepted') {
      setInstallPrompt(null)
    }
  }

  const navItems = [
    {
      id: 'catalog',
      label: 'Catálogo',
      icon: Package,
      badge: null,
    },
    {
      id: 'inventory',
      label: 'Inventario',
      icon: Boxes,
      badge: null,
    },
    {
      id: 'quoter',
      label: 'Cotizador / Carrito',
      icon: ShoppingCart,
      badge: cartTotalItems > 0 ? `${cartTotalItems}` : null,
      badgeHighlight: true,
    },
    {
      id: 'customers',
      label: 'Clientes',
      icon: Users,
      badge: customers.length > 0 ? `${customers.length}` : null,
      badgeHighlight: false,
    },
    {
      id: 'receipts',
      label: 'Recibos & WhatsApp',
      icon: Receipt,
      badge: receipts.length > 0 ? `${receipts.length}` : null,
      badgeHighlight: false,
    },
    {
      id: 'manual',
      label: 'Manual de Uso',
      icon: BookOpen,
      badge: null,
      badgeHighlight: false,
    },
  ]

  const handleSelectTab = (tabId) => {
    setActiveTab(tabId)
    setMobileMenuOpen(false)
  }

  return (
    <>
      <header className="sticky top-0 z-40 bg-white/95 backdrop-blur border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between gap-4">
          {/* Logo & Title */}
          <div
            onClick={() => setActiveTab('catalog')}
            className="flex items-center gap-2.5 cursor-pointer select-none"
          >
            <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-cyan-600 to-blue-600 flex items-center justify-center text-white shadow-md shadow-cyan-500/20">
              <Sparkles className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-1.5">
                <span className="font-extrabold text-base sm:text-lg tracking-tight bg-gradient-to-r from-cyan-700 to-blue-800 bg-clip-text text-transparent">
                  Limpieza OKEY
                </span>
                <span className="text-[10px] uppercase font-bold tracking-wider px-1.5 py-0.5 rounded-full bg-cyan-100 text-cyan-800">
                  v1.0
                </span>
              </div>
              <p className="text-[11px] text-slate-400 hidden sm:block">
                Cotizaciones, Pedidos y Recibos
              </p>
            </div>
          </div>

          {/* Desktop Navigation Tabs */}
          <nav className="hidden md:flex items-center gap-1 bg-slate-100/90 p-1 rounded-xl border border-slate-200 text-xs font-semibold">
            {navItems.map((item) => {
              const Icon = item.icon
              const isActive = activeTab === item.id
              return (
                <button
                  key={item.id}
                  type="button"
                  onClick={() => handleSelectTab(item.id)}
                  className={`flex items-center gap-2 px-3.5 py-2 rounded-lg transition-all ${
                    isActive
                      ? 'bg-white text-blue-700 shadow-xs font-bold'
                      : 'text-slate-600 hover:text-slate-900 hover:bg-slate-200/50'
                  }`}
                >
                  <Icon className="w-4 h-4" />
                  <span>{item.label}</span>
                  {item.badge && (
                    <span
                      className={`text-[10px] px-1.5 py-0.2 rounded-full font-bold ${
                        item.badgeHighlight
                          ? 'bg-blue-600 text-white'
                          : 'bg-slate-200 text-slate-600'
                      }`}
                    >
                      {item.badge}
                    </span>
                  )}
                </button>
              )
            })}
          </nav>

          {/* Right Action / Mobile Menu Toggle */}
          <div className="flex items-center gap-2">
            {/* Install PWA Button (si no está instalada) */}
            {!isInstalled && (
              <button
                type="button"
                onClick={handleInstallClick}
                className="hidden sm:flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-700 hover:to-cyan-700 text-white text-xs font-bold shadow-xs transition-all active:scale-95"
                title="Instalar app en este dispositivo"
              >
                <DownloadCloud className="w-3.5 h-3.5" />
                <span>Instalar App</span>
              </button>
            )}

            {/* Quick Cart Pill */}
            {cartTotalItems > 0 && (
              <button
                type="button"
                onClick={() => setActiveTab('quoter')}
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-blue-50 border border-blue-200 text-blue-700 text-xs font-bold shadow-2xs hover:bg-blue-100 transition-colors"
              >
                <ShoppingCart className="w-3.5 h-3.5" />
                <span className="hidden sm:inline">{cartTotalItems} arts &bull;</span>
                <span>{formatCurrency(cartSubtotal)}</span>
              </button>
            )}

            {/* Mobile Hamburger Button */}
            <button
              type="button"
              onClick={() => setMobileMenuOpen((prev) => !prev)}
              className="md:hidden p-2 rounded-xl text-slate-600 hover:bg-slate-100 transition-colors"
              aria-label="Abrir menú"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>

        {/* Mobile Dropdown Menu */}
        {mobileMenuOpen && (
          <div className="md:hidden border-t border-slate-200 bg-white px-4 py-3 space-y-1 animate-in slide-in-from-top-2 duration-150">
            {navItems.map((item) => {
              const Icon = item.icon
              const isActive = activeTab === item.id
              return (
                <button
                  key={item.id}
                  type="button"
                  onClick={() => handleSelectTab(item.id)}
                  className={`w-full flex items-center justify-between px-3 py-2.5 rounded-xl text-xs font-bold transition-all ${
                    isActive
                      ? 'bg-blue-50 text-blue-700 border border-blue-200'
                      : 'text-slate-700 hover:bg-slate-50'
                  }`}
                >
                  <div className="flex items-center gap-2.5">
                    <Icon className="w-4 h-4 text-slate-500" />
                    <span>{item.label}</span>
                  </div>
                  {item.badge && (
                    <span
                      className={`text-[10px] px-2 py-0.5 rounded-full font-bold ${
                        item.badgeHighlight
                          ? 'bg-blue-600 text-white'
                          : 'bg-slate-100 text-slate-500'
                      }`}
                    >
                      {item.badge}
                    </span>
                  )}
                </button>
              )
            })}

            {!isInstalled && (
              <button
                type="button"
                onClick={() => {
                  setMobileMenuOpen(false)
                  handleInstallClick()
                }}
                className="w-full mt-2 py-2.5 px-3 rounded-xl bg-gradient-to-r from-blue-600 to-cyan-600 text-white text-xs font-bold shadow-xs flex items-center justify-center gap-2"
              >
                <DownloadCloud className="w-4 h-4" />
                <span>Instalar Limpieza OKEY en Celular</span>
              </button>
            )}
          </div>
        )}
      </header>

      {/* Floating Global Toast Notification */}
      {toast && (
        <div className="fixed bottom-5 right-5 z-50 animate-in slide-in-from-bottom-3 duration-200">
          <div className="flex items-center gap-2 px-4 py-3 rounded-2xl bg-slate-900 text-white text-xs font-semibold shadow-2xl border border-slate-800">
            {toast.type === 'info' ? (
              <Info className="w-4 h-4 text-cyan-400 shrink-0" />
            ) : toast.type === 'warn' ? (
              <AlertTriangle className="w-4 h-4 text-amber-400 shrink-0" />
            ) : (
              <CheckCircle className="w-4 h-4 text-emerald-400 shrink-0" />
            )}
            <span>{toast.message}</span>
          </div>
        </div>
      )}
    </>
  )
}
