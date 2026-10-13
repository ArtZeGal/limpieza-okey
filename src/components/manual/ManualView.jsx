import { useState } from 'react'
import {
  BookOpen,
  Sparkles,
  Package,
  ShoppingCart,
  Receipt,
  Boxes,
  Users,
  Smartphone,
  MessageCircle,
  CheckCircle2,
  ArrowRight,
  Lightbulb,
  Truck,
  Percent,
  DownloadCloud,
  ChevronDown,
  ChevronUp,
  FileText,
  BadgePercent,
  HelpCircle
} from 'lucide-react'
import { useApp } from '../../context/AppContext'

export default function ManualView() {
  const { setActiveTab } = useApp()
  const [activeSection, setActiveSection] = useState('quickstart')
  const [openFaqIndex, setOpenFaqIndex] = useState(null)

  const toggleFaq = (index) => {
    setOpenFaqIndex(openFaqIndex === index ? null : index)
  }

  const sections = [
    {
      id: 'quickstart',
      label: '⚡ Venta en 1 Minuto',
      icon: Sparkles,
      color: 'from-amber-500 to-orange-500',
    },
    {
      id: 'inventory',
      label: '📦 Inventario (Para Karen)',
      icon: Boxes,
      color: 'from-emerald-500 to-teal-600',
    },
    {
      id: 'quoter',
      label: '🛒 Cotizador y Envíos',
      icon: ShoppingCart,
      color: 'from-blue-500 to-indigo-600',
    },
    {
      id: 'receipts',
      label: '🧾 Recibos Oficiales',
      icon: Receipt,
      color: 'from-violet-500 to-purple-600',
    },
    {
      id: 'customers',
      label: '👥 Clientes y WhatsApp',
      icon: Users,
      color: 'from-cyan-500 to-blue-600',
    },
    {
      id: 'install',
      label: '📱 Instalar en Celular',
      icon: Smartphone,
      color: 'from-rose-500 to-pink-600',
    },
  ]

  const faqs = [
    {
      q: '¿Cómo sabe el sistema en qué número de folio de recibo va Karen?',
      a: 'La app sugiere automáticamente el consecutivo oficial (ej. OK-001, OK-002). Si Karen necesita empezar en un número específico (ej. OK-015), sólo lo escribe manualmente en el campo de Folio una sola vez al generar el recibo; la app continuará automáticamente el consecutivo desde ahí para los siguientes pedidos.',
    },
    {
      q: '¿Cuándo se descuentan los productos del inventario?',
      a: 'El descuento es 100% automático al presionar "Generar Recibo Oficial". De esta manera el conteo físico de bodega siempre coincide con las ventas reales efectuadas.',
    },
    {
      q: '¿Cómo funciona la regla de costo de envío?',
      a: 'La app aplica automáticamente la política oficial: si el subtotal de compra es igual o mayor a $1,500.00 pesos, el envío es GRATIS ($0). Si es menor, se calcula la tarifa estándar de $120.00. También existe la opción "Recoge en sucursal" con costo $0.',
    },
    {
      q: '¿Qué costo se utiliza para sugerir compras a Puntos KEY®?',
      a: 'Todo el módulo de reposición está calculado exclusivamente sobre tu Precio de Empleado (Costo OKEY). Nunca se muestra el precio público en esa sección para que sepas con exactitud tu inversión neta requerida.',
    },
    {
      q: '¿Los clientes y el inventario se borran si cierro el navegador?',
      a: 'No. Todo se guarda de forma segura y permanente en el almacenamiento local del navegador (PWA). Podrás cerrar la app o tu teléfono y al volver a abrir todo estará exactamente como lo dejaste.',
    },
  ]

  return (
    <div className="space-y-8 max-w-5xl mx-auto pb-12">
      {/* Encabezado Principal */}
      <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-slate-900 via-indigo-950 to-blue-900 text-white p-6 sm:p-8 shadow-xl">
        <div className="absolute top-0 right-0 -mr-16 -mt-16 w-64 h-64 bg-cyan-500/20 rounded-full blur-3xl pointer-events-none" />
        <div className="relative z-10 flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
          <div className="space-y-2 max-w-2xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 backdrop-blur border border-white/20 text-cyan-300 text-xs font-bold uppercase tracking-wider">
              <BookOpen className="w-3.5 h-3.5" />
              <span>Guía Rápida & Manual Operativo</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-black tracking-tight text-white">
              Manual de Uso — Limpieza OKEY
            </h1>
            <p className="text-sm text-slate-300 leading-relaxed">
              Guía práctica y visual paso a paso para que <strong>Karen y Arturo</strong> le saquen el 100% de provecho a cada venta, recibo oficial, inventario físico y reposición de bodega.
            </p>
          </div>

          <div className="flex flex-wrap gap-2 sm:gap-3 shrink-0">
            <button
              type="button"
              onClick={() => setActiveTab('catalog')}
              className="px-4 py-2.5 rounded-xl bg-white text-slate-900 font-bold text-xs hover:bg-slate-100 transition-all shadow-md flex items-center gap-1.5"
            >
              <Package className="w-4 h-4 text-blue-600" />
              <span>Ir al Catálogo</span>
            </button>
            <button
              type="button"
              onClick={() => setActiveTab('inventory')}
              className="px-4 py-2.5 rounded-xl bg-cyan-500/20 border border-cyan-400/40 text-cyan-200 font-bold text-xs hover:bg-cyan-500/30 transition-all flex items-center gap-1.5"
            >
              <Boxes className="w-4 h-4 text-cyan-300" />
              <span>Hacer Inventario</span>
            </button>
          </div>
        </div>
      </div>

      {/* Selector de Sección del Manual */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-2">
        {sections.map((sec) => {
          const Icon = sec.icon
          const isSelected = activeSection === sec.id
          return (
            <button
              key={sec.id}
              type="button"
              onClick={() => setActiveSection(sec.id)}
              className={`p-3 rounded-2xl border text-left transition-all flex flex-col justify-between gap-3 ${
                isSelected
                  ? 'bg-white border-blue-500 shadow-md ring-2 ring-blue-500/20 text-slate-900 font-bold'
                  : 'bg-white border-slate-200 hover:border-slate-300 hover:bg-slate-50 text-slate-600'
              }`}
            >
              <div
                className={`w-8 h-8 rounded-xl bg-gradient-to-tr ${sec.color} text-white flex items-center justify-center shadow-xs`}
              >
                <Icon className="w-4 h-4" />
              </div>
              <span className="text-xs leading-tight font-extrabold">{sec.label}</span>
            </button>
          )
        })}
      </div>

      {/* Contenido de Cada Sección */}
      <div className="bg-white rounded-3xl border border-slate-200 p-6 sm:p-8 shadow-xs space-y-6">
        {/* 1. VENTA EN 1 MINUTO */}
        {activeSection === 'quickstart' && (
          <div className="space-y-6 animate-fadeIn">
            <div className="flex items-center gap-3 border-b border-slate-100 pb-4">
              <div className="w-10 h-10 rounded-2xl bg-amber-100 text-amber-700 flex items-center justify-center font-bold">
                <Sparkles className="w-5 h-5" />
              </div>
              <div>
                <h2 className="text-lg font-black text-slate-900">
                  Flujo de Venta Rápida en 4 Pasos (1 Minuto)
                </h2>
                <p className="text-xs text-slate-500">
                  El camino más rápido desde que el cliente pide productos hasta entregar el recibo.
                </p>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200/80 space-y-2">
                <span className="inline-flex items-center justify-center w-6 h-6 rounded-full bg-blue-600 text-white font-extrabold text-xs">
                  1
                </span>
                <h3 className="font-extrabold text-slate-900 text-sm">Elige Productos</h3>
                <p className="text-xs text-slate-600 leading-relaxed">
                  En la pestaña <strong>Catálogo</strong>, busca por nombre o categoría y toca <strong>"Agregar"</strong> (+1, +2...).
                </p>
              </div>

              <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200/80 space-y-2">
                <span className="inline-flex items-center justify-center w-6 h-6 rounded-full bg-blue-600 text-white font-extrabold text-xs">
                  2
                </span>
                <h3 className="font-extrabold text-slate-900 text-sm">Vincula al Cliente</h3>
                <p className="text-xs text-slate-600 leading-relaxed">
                  En el <strong>Cotizador</strong>, selecciona al cliente del menú desplegable para que su dirección y WhatsApp se auto-llenen.
                </p>
              </div>

              <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200/80 space-y-2">
                <span className="inline-flex items-center justify-center w-6 h-6 rounded-full bg-blue-600 text-white font-extrabold text-xs">
                  3
                </span>
                <h3 className="font-extrabold text-slate-900 text-sm">Anticipo y Envío</h3>
                <p className="text-xs text-slate-600 leading-relaxed">
                  Toca <strong>50%</strong> o <strong>100%</strong> de anticipo. El envío es <strong>GRATIS</strong> si la orden suma $1,500 o más.
                </p>
              </div>

              <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200/80 space-y-2">
                <span className="inline-flex items-center justify-center w-6 h-6 rounded-full bg-blue-600 text-white font-extrabold text-xs">
                  4
                </span>
                <h3 className="font-extrabold text-slate-900 text-sm">Genera y Comparte</h3>
                <p className="text-xs text-slate-600 leading-relaxed">
                  Toca <strong>"Generar Recibo Oficial"</strong>. Descarga la imagen en alta definición y compártela con 1 clic por WhatsApp.
                </p>
              </div>
            </div>

            <div className="p-4 rounded-2xl bg-amber-50 border border-amber-200 flex items-start gap-3 text-amber-900 text-xs">
              <Lightbulb className="w-5 h-5 text-amber-600 shrink-0 mt-0.5" />
              <div>
                <strong>Consejo Clave:</strong> Al generar el recibo, las piezas vendidas se <strong>descuentan solas del inventario físico</strong>. No tienes que hacer ninguna resta manual.
              </div>
            </div>
          </div>
        )}

        {/* 2. INVENTARIO FÍSICO */}
        {activeSection === 'inventory' && (
          <div className="space-y-6 animate-fadeIn">
            <div className="flex items-center gap-3 border-b border-slate-100 pb-4">
              <div className="w-10 h-10 rounded-2xl bg-emerald-100 text-emerald-700 flex items-center justify-center font-bold">
                <Boxes className="w-5 h-5" />
              </div>
              <div>
                <h2 className="text-lg font-black text-slate-900">
                  Módulo de Inventario Físico (Paso a Paso para Karen)
                </h2>
                <p className="text-xs text-slate-500">
                  Diseñado para ser intuitivo, rápido, táctil y cero abrumador.
                </p>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-4">
                <h3 className="font-extrabold text-slate-900 text-sm flex items-center gap-2">
                  <span className="px-2 py-0.5 rounded-lg bg-emerald-100 text-emerald-800 text-xs">Paso 1</span>
                  <span>Recorrer y Contar Estantes ("Hacer Inventario")</span>
                </h3>
                <ul className="space-y-2.5 text-xs text-slate-600">
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                    <span><strong>Todo inicia en 0 piezas:</strong> El catálogo arranca limpio para no inventar stock fantasma.</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                    <span><strong>Botones rápidos:</strong> Usa los botones <code className="bg-slate-100 px-1.5 py-0.5 rounded text-slate-800 font-bold">+1</code>, <code className="bg-slate-100 px-1.5 py-0.5 rounded text-slate-800 font-bold">+5</code> o <code className="bg-slate-100 px-1.5 py-0.5 rounded text-slate-800 font-bold">+10</code> para sumar cajas o paquetes al instante.</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                    <span><strong>Confirmación visual verde:</strong> Al contar un producto, se pinta de verde con la etiqueta <span className="text-emerald-700 font-bold">✅ ¡Contado: X pzas!</span> para saber de un vistazo qué estante ya quedó listo.</span>
                  </li>
                </ul>
              </div>

              <div className="space-y-4">
                <h3 className="font-extrabold text-slate-900 text-sm flex items-center gap-2">
                  <span className="px-2 py-0.5 rounded-lg bg-blue-100 text-blue-800 text-xs">Paso 2</span>
                  <span>Pedir Surtido a Puntos KEY® ("Sugerencias de Reposición")</span>
                </h3>
                <ul className="space-y-2.5 text-xs text-slate-600">
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="w-4 h-4 text-blue-600 shrink-0 mt-0.5" />
                    <span><strong>Detección automática:</strong> La app lista los productos que se agotaron con las ventas o que tienen 3 piezas o menos.</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="w-4 h-4 text-blue-600 shrink-0 mt-0.5" />
                    <span><strong>Costo Empleado (Costo OKEY):</strong> Calcula la inversión exacta requerida a tu precio de compra real.</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="w-4 h-4 text-blue-600 shrink-0 mt-0.5" />
                    <span><strong>Pedido por WhatsApp a 1 toque:</strong> Presiona <em>"Pedir por WhatsApp a Puntos KEY®"</em> y manda el listado formateado de claves y piezas directo a tu proveedor.</span>
                  </li>
                </ul>
              </div>
            </div>

            <div className="pt-2 flex justify-end">
              <button
                type="button"
                onClick={() => setActiveTab('inventory')}
                className="px-4 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs flex items-center gap-2 transition-colors"
              >
                <span>Abrir Módulo de Inventario</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        )}

        {/* 3. COTIZADOR Y ENVÍOS */}
        {activeSection === 'quoter' && (
          <div className="space-y-6 animate-fadeIn">
            <div className="flex items-center gap-3 border-b border-slate-100 pb-4">
              <div className="w-10 h-10 rounded-2xl bg-blue-100 text-blue-700 flex items-center justify-center font-bold">
                <ShoppingCart className="w-5 h-5" />
              </div>
              <div>
                <h2 className="text-lg font-black text-slate-900">
                  Cotizador, Políticas de Envío y Anticipos
                </h2>
                <p className="text-xs text-slate-500">
                  Cómo estructurar cotizaciones claras y profesionales para cerrar ventas por WhatsApp.
                </p>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 space-y-2">
                <div className="w-8 h-8 rounded-xl bg-emerald-100 text-emerald-800 flex items-center justify-center">
                  <Truck className="w-4 h-4" />
                </div>
                <h4 className="font-extrabold text-slate-900 text-sm">Política de Envío</h4>
                <p className="text-xs text-slate-600 leading-relaxed">
                  <strong>Envío GRATIS</strong> automático en compras $\ge \$1,500.00$. En compras menores se calcula la tarifa estándar de <strong>\$120.00</strong>.
                </p>
              </div>

              <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 space-y-2">
                <div className="w-8 h-8 rounded-xl bg-indigo-100 text-indigo-800 flex items-center justify-center">
                  <BadgePercent className="w-4 h-4" />
                </div>
                <h4 className="font-extrabold text-slate-900 text-sm">Botones de Anticipo</h4>
                <p className="text-xs text-slate-600 leading-relaxed">
                  Toca <strong>50%</strong>, <strong>70%</strong> o <strong>100%</strong> para que la app calcule al centavo cuánto pagar hoy y cuánto queda de saldo pendiente a liquidar contra entrega.
                </p>
              </div>

              <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 space-y-2">
                <div className="w-8 h-8 rounded-xl bg-emerald-100 text-emerald-800 flex items-center justify-center">
                  <MessageCircle className="w-4 h-4" />
                </div>
                <h4 className="font-extrabold text-slate-900 text-sm">WhatsApp Automático</h4>
                <p className="text-xs text-slate-600 leading-relaxed">
                  El botón verde <strong>"Enviar Cotización por WhatsApp"</strong> abre el chat con el mensaje listo: desglose de artículos, total, anticipo sugerido y datos de cuenta BBVA.
                </p>
              </div>
            </div>
          </div>
        )}

        {/* 4. RECIBOS OFICIALES */}
        {activeSection === 'receipts' && (
          <div className="space-y-6 animate-fadeIn">
            <div className="flex items-center gap-3 border-b border-slate-100 pb-4">
              <div className="w-10 h-10 rounded-2xl bg-violet-100 text-violet-700 flex items-center justify-center font-bold">
                <Receipt className="w-5 h-5" />
              </div>
              <div>
                <h2 className="text-lg font-black text-slate-900">
                  Recibos Oficiales Calibrados en Alta Resolución
                </h2>
                <p className="text-xs text-slate-500">
                  Estampados milimétricamente sobre la plantilla original de Limpieza OKEY (1024x1024 px).
                </p>
              </div>
            </div>

            <div className="space-y-4 text-xs text-slate-600 leading-relaxed">
              <div className="p-4 rounded-2xl bg-violet-50/60 border border-violet-200 space-y-2">
                <h4 className="font-extrabold text-violet-950 text-sm">¿Cómo funciona el número consecutivo de Folio?</h4>
                <p>
                  Por default, la app inicia en <code>OK-001</code>. Si Karen ya lleva folios emitidos en papel o en otro sistema (ej. va en el <code>OK-018</code>), simplemente teclea <code>OK-018</code> una sola vez en el formulario de emisión.
                </p>
                <p className="font-bold text-violet-900">
                  La app recordará el folio y los siguientes pedidos saldrán automáticamente como OK-019, OK-020, OK-021...
                </p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
                <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 space-y-1">
                  <h5 className="font-bold text-slate-900">Descarga Directa (JPG)</h5>
                  <p className="text-slate-500">
                    Se guarda directo en las descargas o galería de fotos de tu celular o computadora listo para enviar por WhatsApp.
                  </p>
                </div>
                <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 space-y-1">
                  <h5 className="font-bold text-slate-900">Historial de Recibos</h5>
                  <p className="text-slate-500">
                    En la pestaña <strong>"Recibos & WhatsApp"</strong> tienes el historial completo de todas las órdenes emitidas para reimprimir o consultar cuando quieras.
                  </p>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* 5. CLIENTES Y WHATSAPP */}
        {activeSection === 'customers' && (
          <div className="space-y-6 animate-fadeIn">
            <div className="flex items-center gap-3 border-b border-slate-100 pb-4">
              <div className="w-10 h-10 rounded-2xl bg-cyan-100 text-cyan-700 flex items-center justify-center font-bold">
                <Users className="w-5 h-5" />
              </div>
              <div>
                <h2 className="text-lg font-black text-slate-900">
                  Directorio de Clientes Reales
                </h2>
                <p className="text-xs text-slate-500">
                  Directorio oficial sincronizado con tu base de datos de Google Sheets.
                </p>
              </div>
            </div>

            <div className="space-y-3 text-xs text-slate-600">
              <p>
                Tus clientes habituales (<strong>Sra. Herminia, Mónica Gutiérrez, Arlena Galván, Grupo 23, Daniel Lara, Amelia Cortez...</strong>) ya están precargados.
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-2">
                <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200 space-y-1">
                  <strong className="text-slate-900 block">Vincular en 1 Clic</strong>
                  <span>Toca "Vincular a la Orden" y se lleva su nombre, teléfono y dirección al cotizador.</span>
                </div>
                <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200 space-y-1">
                  <strong className="text-slate-900 block">WhatsApp Directo</strong>
                  <span>Toca el botón verde de teléfono para chatear con el cliente sin tener que guardarlo en contactos.</span>
                </div>
                <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200 space-y-1">
                  <strong className="text-slate-900 block">Completar Domicilios</strong>
                  <span>Pulsa el icono de lápiz para editar y guardar calles, colonias o referencias de entrega cuando el cliente las pase.</span>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* 6. INSTALAR EN CELULAR */}
        {activeSection === 'install' && (
          <div className="space-y-6 animate-fadeIn">
            <div className="flex items-center gap-3 border-b border-slate-100 pb-4">
              <div className="w-10 h-10 rounded-2xl bg-rose-100 text-rose-700 flex items-center justify-center font-bold">
                <Smartphone className="w-5 h-5" />
              </div>
              <div>
                <h2 className="text-lg font-black text-slate-900">
                  Cómo Instalar la App en tu Celular (iOS & Android)
                </h2>
                <p className="text-xs text-slate-500">
                  Convierte la página web en una aplicación instalada en tu pantalla principal.
                </p>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="p-5 rounded-2xl bg-slate-50 border border-slate-200 space-y-3">
                <div className="flex items-center gap-2">
                  <span className="w-7 h-7 rounded-lg bg-black text-white flex items-center justify-center font-black text-xs">
                    
                  </span>
                  <h4 className="font-extrabold text-slate-900 text-sm">En iPhone o iPad (Safari)</h4>
                </div>
                <ol className="list-decimal pl-5 space-y-2 text-xs text-slate-600">
                  <li>Abre <strong>Safari</strong> y ve a <span className="text-blue-600 font-semibold">limpieza-okey.vercel.app</span></li>
                  <li>Toca el botón <strong>Compartir</strong> (icono de cuadrado con flecha hacia arriba).</li>
                  <li>Desliza hacia abajo y presiona <strong>"Agregar al inicio"</strong>.</li>
                  <li>Toca <strong>"Agregar"</strong> arriba a la derecha.</li>
                </ol>
              </div>

              <div className="p-5 rounded-2xl bg-slate-50 border border-slate-200 space-y-3">
                <div className="flex items-center gap-2">
                  <span className="w-7 h-7 rounded-lg bg-emerald-600 text-white flex items-center justify-center font-black text-xs">
                    🤖
                  </span>
                  <h4 className="font-extrabold text-slate-900 text-sm">En Android (Google Chrome)</h4>
                </div>
                <ol className="list-decimal pl-5 space-y-2 text-xs text-slate-600">
                  <li>Abre <strong>Chrome</strong> y ve a <span className="text-blue-600 font-semibold">limpieza-okey.vercel.app</span></li>
                  <li>Toca los <strong>tres puntos verticales</strong> en la esquina superior derecha.</li>
                  <li>Selecciona <strong>"Instalar aplicación"</strong> o <strong>"Agregar a pantalla principal"</strong>.</li>
                  <li>Confirma en <strong>"Instalar"</strong>.</li>
                </ol>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Preguntas Frecuentes y Atajos (Acordeón) */}
      <div className="bg-white rounded-3xl border border-slate-200 p-6 sm:p-8 shadow-xs space-y-4">
        <div className="flex items-center gap-2 mb-2">
          <HelpCircle className="w-5 h-5 text-blue-600" />
          <h3 className="font-black text-slate-900 text-base">Preguntas Frecuentes y Atajos Rápidos</h3>
        </div>

        <div className="divide-y divide-slate-100">
          {faqs.map((faq, idx) => {
            const isOpen = openFaqIndex === idx
            return (
              <div key={idx} className="py-3.5">
                <button
                  type="button"
                  onClick={() => toggleFaq(idx)}
                  className="w-full flex items-center justify-between text-left gap-4 font-bold text-xs sm:text-sm text-slate-800 hover:text-blue-600 transition-colors"
                >
                  <span>{faq.q}</span>
                  {isOpen ? (
                    <ChevronUp className="w-4 h-4 text-blue-600 shrink-0" />
                  ) : (
                    <ChevronDown className="w-4 h-4 text-slate-400 shrink-0" />
                  )}
                </button>
                {isOpen && (
                  <p className="mt-2.5 text-xs text-slate-600 leading-relaxed pr-6 bg-slate-50 p-3.5 rounded-xl border border-slate-200/60 animate-fadeIn">
                    {faq.a}
                  </p>
                )}
              </div>
            )
          })}
        </div>
      </div>
    </div>
  )
}
