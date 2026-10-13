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
  HelpCircle,
  Calculator,
  Droplets,
  Building2,
  FlaskConical
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
    {
      id: 'calculator',
      label: '🧮 Ahorro en Edificios',
      icon: Calculator,
      color: 'from-indigo-600 to-blue-700',
    },
    {
      id: 'fractional',
      label: '🧴 Venta por Litro (1L)',
      icon: FlaskConical,
      color: 'from-amber-500 to-yellow-600',
    },
  ]

  const faqs = [
    {
      q: '¿Cómo sabe el sistema en qué número de folio de recibo va Karen?',
      a: 'La app sugiere automáticamente el consecutivo oficial (ej. OK-001, OK-002). Si Karen necesita empezar en un número específico (ej. OK-015), sólo lo escribe manualmente en el campo de Folio una sola vez al generar el recibo; la app continuará automáticamente el consecutivo desde ahí para los siguientes pedidos.',
    },
    {
      q: '¿Cómo funciona la Venta Fraccionada por Litro (1 Litro)?',
      a: 'Para clientes que no requieren comprar el galón de 4L completo, la app calcula automáticamente el precio por litro con la regla oficial de Karen: (Precio Galón / 4) × 1.37. Si el cliente compra en bote estándar con tapa hermética se añaden +$11.00; si lleva el bote oficial Key con aspersor/gatillo profesional se añaden +$45.00. La app ajusta los márgenes y costos netos automáticamente en el recibo y en el corte de caja.',
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
      <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-4 xl:grid-cols-8 gap-2">
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
                <div className="p-4 rounded-2xl bg-emerald-50 border border-emerald-200 space-y-1 sm:col-span-2">
                  <h5 className="font-bold text-emerald-950 flex items-center gap-1.5">
                    <span>💰 Cierre de Caja & Ganancia Neta (Por Rango de Fechas)</span>
                  </h5>
                  <p className="text-emerald-800 text-xs">
                    Entra a la sub-pestaña <strong>"Cierre de Caja & Ganancia"</strong> dentro de Recibos para ver el total cobrado, costo oficial OKEY, ganancia en bolsillo y porcentaje de margen en cualquier fecha (Hoy, Esta Semana, Este Mes o Personalizado). Incluye un botón para <em>Ocultar Utilidad</em> si estás frente a un cliente y un botón para <em>Enviar Reporte por WhatsApp</em>.
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
                <div className="p-3.5 rounded-xl bg-amber-50 border border-amber-200 space-y-1 sm:col-span-3">
                  <strong className="text-amber-950 block flex items-center gap-1.5">
                    <span>🔔 Recordatorios de Recompra Automáticos (Cada 30 días)</span>
                  </strong>
                  <span className="text-amber-800 text-xs">
                    La app calcula los días transcurridos desde la última compra de cada cliente. Si ya pasaron 30 días o más, se ilumina una alerta en su tarjeta con un botón directo de <strong>"Recordar (WhatsApp)"</strong> que redacta un mensaje cordial preguntando cómo van con sus insumos y ofreciendo entrega en su zona.
                  </span>
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

        {/* 7. AHORRO EN EDIFICIOS, CUBETAS AL DÍA Y DILUCIONES */}
        {activeSection === 'calculator' && (
          <div className="space-y-6 animate-fadeIn">
            <div className="flex items-center gap-3 border-b border-slate-100 pb-4">
              <div className="w-10 h-10 rounded-2xl bg-indigo-100 text-indigo-700 flex items-center justify-center font-bold">
                <Calculator className="w-5 h-5" />
              </div>
              <div>
                <h2 className="text-lg font-black text-slate-900">
                  Calculadora de Ahorro, "Cubetas al Día" y Fichas de Dilución
                </h2>
                <p className="text-xs text-slate-500">
                  La herramienta de persuasión para administradores de torres, oficinas y comités vecinales.
                </p>
              </div>
            </div>

            {/* Bloque explicativo de Cubetas al Día */}
            <div className="p-5 rounded-2xl bg-gradient-to-br from-indigo-950 via-slate-900 to-blue-950 text-white space-y-3 shadow-md">
              <div className="flex items-center gap-2 text-cyan-300 font-bold text-xs uppercase tracking-wider">
                <Sparkles className="w-4 h-4" />
                <span>¿Por qué medimos en "Cubetas al Día"? (El Secreto de la Venta B2B)</span>
              </div>
              <p className="text-xs text-slate-200 leading-relaxed">
                Ningún administrador o encargado de intendencia sabe de memoria cuántos litros químicos consume al mes ni los metros cuadrados de sus pisos. Pero <strong>SÍ saben exactamente cuántas cubetas de agua preparan sus afanadores para trapear</strong> en su rutina diaria.
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-2 text-xs">
                <div className="p-3 rounded-xl bg-white/10 border border-white/10 space-y-1">
                  <span className="font-bold text-cyan-300 block">🪣 2 cubetas / día</span>
                  <span className="text-[11px] text-slate-300 block">Casa grande, departamento u oficina chica.</span>
                  <span className="text-[10px] text-emerald-300 font-bold block pt-1">~20 L/día = 600 L al mes</span>
                </div>
                <div className="p-3 rounded-xl bg-white/10 border border-white/10 space-y-1">
                  <span className="font-bold text-amber-300 block">🪣 4 cubetas / día (Típico)</span>
                  <span className="text-[11px] text-slate-300 block">Edificio mediano, privada o gimnasio.</span>
                  <span className="text-[10px] text-emerald-300 font-bold block pt-1">~40 L/día = 1,200 L al mes</span>
                </div>
                <div className="p-3 rounded-xl bg-white/10 border border-white/10 space-y-1">
                  <span className="font-bold text-purple-300 block">🪣 8 cubetas / día (Torres)</span>
                  <span className="text-[11px] text-slate-300 block">Torre completa (ej. Torre Árbol), hotel o club.</span>
                  <span className="text-[10px] text-emerald-300 font-bold block pt-1">~80 L/día = 2,400 L al mes</span>
                </div>
              </div>
              <p className="text-[11px] text-slate-300 pt-1 border-t border-white/10">
                💡 <em>Una cubeta estándar de trapeador de conserjería contiene 10 litros de agua. Preguntar "¿Cuántas cubetas preparan al día?" abre la puerta para demostrar ahorros de más de $20,000 pesos al mes al instante.</em>
              </p>
            </div>

            {/* Dos columnas de uso */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-xs text-slate-600">
              <div className="p-5 rounded-2xl bg-blue-50/70 border border-blue-200 space-y-3">
                <h4 className="font-extrabold text-blue-950 text-sm flex items-center gap-2">
                  <Calculator className="w-4 h-4 text-blue-600" />
                  <span>Cómo usar la Calculadora en 3 Toques</span>
                </h4>
                <ol className="space-y-2 list-decimal pl-4">
                  <li>
                    <strong>Toca "Calculadora de Ahorro":</strong> Disponible arriba en el Catálogo o en el Cotizador.
                  </li>
                  <li>
                    <strong>Elige el Producto:</strong> Pisos (<em>Key Paraíso</em>), Mármol (<em>Key Brillante</em>), Vidrios o Desengrasante.
                  </li>
                  <li>
                    <strong>Selecciona las Cubetas:</strong> Elige entre 2, 4 u 8 cubetas diarias.
                  </li>
                  <li>
                    <strong>✏️ Edita en Vivo el Precio del Súper:</strong> En la caja roja <em>"❌ Paga hoy"</em>, teclea el precio por litro que paga el cliente hoy para que vea el cálculo con su número real.
                  </li>
                  <li>
                    <strong>Enviar por WhatsApp:</strong> Envía un estudio financiero formal y personalizado en 1 solo clic.
                  </li>
                </ol>
              </div>

              <div className="p-5 rounded-2xl bg-emerald-50/70 border border-emerald-200 space-y-3">
                <h4 className="font-extrabold text-emerald-950 text-sm flex items-center gap-2">
                  <Droplets className="w-4 h-4 text-emerald-600" />
                  <span>Fichas Técnicas y Diluciones Oficiales al 100% del Catálogo</span>
                </h4>
                <p>
                  En cada tarjeta del catálogo verás el botón <strong>"Ficha & Dilución"</strong> (o <strong>"Ficha Técnica"</strong> para accesorios y papel). Los 282 productos cuentan con su ficha técnica oficial KEY® Química homologada:
                </p>
                <ul className="space-y-1.5 list-disc pl-4">
                  <li><strong>Línea de Químicos Concentrados:</strong> Proporciones oficiales (1:80, 1:60, 1:40, 1:20...), mililitros exactos por litro de agua, rendimiento por envase y costo en uso por litro.</li>
                  <li><strong>Control de Plagas (BioKey & Geles):</strong> Dosificación exacta de BioKey (20 ml en 1L de agua rinde 5L) y aplicación en puntos de cebo para Maxforce y Klerat.</li>
                  <li><strong>Lavandería Institucional (DLC, SLC, OXI):</strong> Dosis por carga de 5 kg y 11 kg, lavado automático y enjuague.</li>
                  <li><strong>Línea Automotriz & Aseo General:</strong> Autoshampoo seco en seco, abrillantadores de llantas y desengrasantes especializados.</li>
                  <li><strong>Accesorios, Papel y Dispensadores:</strong> Especificaciones de capacidad, compatibilidad, durabilidad y ahorro hoja por hoja.</li>
                  <li><strong>Política de Envases Sellados OKEY:</strong> OKEY comercializa productos en envases sellados originales de fábrica con sello de garantía, por lo que no aplica venta de relleno a granel.</li>
                </ul>
              </div>
            </div>

            {/* Nuevo Bloque: Propuesta para Oficinas & Google Sheets */}
            <div className="p-5 rounded-2xl bg-teal-50 border border-teal-200 space-y-2 text-xs">
              <h4 className="font-extrabold text-teal-950 text-sm flex items-center gap-2">
                <Building2 className="w-4 h-4 text-teal-700" />
                <span>🏢 Propuesta Ejecutiva para Clientes Oficina (Google Sheets / Excel)</span>
              </h4>
              <p className="text-teal-900 leading-relaxed">
                Ubicada en el Catálogo en el botón <strong>"Propuesta Oficinas (Sheets)"</strong>. Permite diagnosticar las necesidades de una oficina en 30 segundos (número de empleados, áreas de café, baños y ventanales), calcular su inversión mensual y exportar la tabla con un clic:
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5 pt-1">
                <div className="p-2.5 rounded-xl bg-white border border-teal-200">
                  <strong className="text-teal-950 block">📋 Copiar a Google Sheets</strong>
                  <span className="text-[11px] text-slate-600">Copia la tabla con celdas y tabulaciones exactas. Al darle Ctrl+V en Sheets queda lista.</span>
                </div>
                <div className="p-2.5 rounded-xl bg-white border border-teal-200">
                  <strong className="text-teal-950 block">📥 Descargar CSV / Excel</strong>
                  <span className="text-[11px] text-slate-600">Genera un archivo compatible con Excel en español con acentos limpios.</span>
                </div>
                <div className="p-2.5 rounded-xl bg-white border border-teal-200">
                  <strong className="text-teal-950 block">📲 WhatsApp Ejecutivo</strong>
                  <span className="text-[11px] text-slate-600">Redacta una propuesta formal con viñetas para el encargado de compras.</span>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* 8. VENTA FRACCIONADA POR LITRO (1L) */}
        {activeSection === 'fractional' && (
          <div className="space-y-6 animate-fadeIn">
            <div className="flex items-center gap-3 border-b border-slate-100 pb-4">
              <div className="w-10 h-10 rounded-2xl bg-amber-100 text-amber-800 flex items-center justify-center font-bold">
                <FlaskConical className="w-5 h-5" />
              </div>
              <div>
                <h2 className="text-lg font-black text-slate-900">
                  Venta Fraccionada por Litro (1 Litro) — Fórmula OKEY
                </h2>
                <p className="text-xs text-slate-500">
                  Cómo vender productos de 4L fraccionados por litro para clientes residenciales u oficinas sin pagar el galón entero.
                </p>
              </div>
            </div>

            {/* Tarjeta explicativa de la Fórmula de Karen */}
            <div className="p-5 rounded-2xl bg-gradient-to-br from-amber-950 via-slate-900 to-amber-900 text-white space-y-3 shadow-md">
              <div className="flex items-center gap-2 text-amber-300 font-bold text-xs uppercase tracking-wider">
                <Sparkles className="w-4 h-4" />
                <span>La Fórmula Oficial de Karen para Venta por Litro</span>
              </div>
              <p className="text-xs text-slate-200 leading-relaxed">
                Muchos clientes quieren probar un químico (como <em>Key Paraíso</em>, <em>Key Limón</em>, <em>Baño Forte</em>, <em>Fórmula 503</em>, etc.) o no desean adquirir los 4 litros de golpe. Para no perder la venta y proteger tu ganancia, la app calcula en automático el precio por litro:
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-2 text-xs">
                <div className="p-3 rounded-xl bg-white/10 border border-white/10 space-y-1">
                  <span className="font-bold text-amber-300 block">1. Químico Base (1L)</span>
                  <span className="text-[11px] text-slate-300 block font-mono">(Precio Galón ÷ 4) × 1.37</span>
                  <span className="text-[10px] text-emerald-300 font-bold block pt-1">Margen comercial de fraccionamiento</span>
                </div>
                <div className="p-3 rounded-xl bg-white/10 border border-white/10 space-y-1">
                  <span className="font-bold text-cyan-300 block">2. Bote Plástico Estándar</span>
                  <span className="text-[11px] text-slate-300 block font-mono">+ $11.00 MXN</span>
                  <span className="text-[10px] text-cyan-200 font-bold block pt-1">Envase estándar con tapa hermética</span>
                </div>
                <div className="p-3 rounded-xl bg-white/10 border border-white/10 space-y-1">
                  <span className="font-bold text-purple-300 block">3. Bote Key + Aspersor Key</span>
                  <span className="text-[11px] text-slate-300 block font-mono">+ $45.00 MXN</span>
                  <span className="text-[10px] text-purple-200 font-bold block pt-1">Envase oficial KEY® + gatillo profesional</span>
                </div>
              </div>
            </div>

            {/* Cómo usarlo en el Catálogo y Recibos */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-xs text-slate-600">
              <div className="p-5 rounded-2xl bg-amber-50/70 border border-amber-200 space-y-3">
                <h4 className="font-extrabold text-amber-950 text-sm flex items-center gap-2">
                  <Package className="w-4 h-4 text-amber-700" />
                  <span>En el Catálogo de Productos</span>
                </h4>
                <ol className="space-y-2 list-decimal pl-4">
                  <li>
                    <strong>Filtro Rápido en 1 Toque:</strong> Toca la píldora <strong>"🧴 Venta por Litro (1L)"</strong> en la barra de categorías para ver únicamente los 52 productos líquidos de 4L fraccionables.
                  </li>
                  <li>
                    <strong>Selector en la Tarjeta:</strong> En cada producto elegible verás 3 botones interactivos: <strong>[ Galón 4L ]</strong>, <strong>[ 1L Bote ]</strong> y <strong>[ 1L + Gatillo ]</strong>.
                  </li>
                  <li>
                    <strong>Precios y Márgenes en Tiempo Real:</strong> Al pulsar cualquiera de los 3 botones, el precio al público, el costo de empleado y el botón de agregar se adaptan inmediatamente.
                  </li>
                  <li>
                    <strong>Búsqueda Directa:</strong> Si escribes <em>"1L"</em> o <em>"litro"</em> en el buscador del catálogo, la app te muestra los productos fraccionables al instante.
                  </li>
                </ol>
              </div>

              <div className="p-5 rounded-2xl bg-blue-50/70 border border-blue-200 space-y-3">
                <h4 className="font-extrabold text-blue-950 text-sm flex items-center gap-2">
                  <Receipt className="w-4 h-4 text-blue-700" />
                  <span>En Cotizaciones, Recibos y Cierre de Caja</span>
                </h4>
                <ul className="space-y-2 list-disc pl-4">
                  <li>
                    <strong>Descripción Clara en el Recibo:</strong> Se agrega como <em>"Key Paraíso (1L - Bote Plástico)"</em> o <em>"Key Paraíso (1L - Bote + Aspersor Key)"</em> para que el cliente sepa exactamente qué tipo de envase se le entregó.
                  </li>
                  <li>
                    <strong>Costos y Ganancia Exacta:</strong> El costo empleado de los envases ($6.00 para el bote estándar, $25.00 para el bote + aspersor Key) queda contemplado en la ganancia neta.
                  </li>
                  <li>
                    <strong>Cierre de Caja sin Descuadres:</strong> Al emitir el recibo oficial, la utilidad neta del fraccionado se suma limpiamente al corte de caja de Karen y Arturo.
                  </li>
                </ul>
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
          {[
            ...faqs,
            {
              q: '¿Por qué la calculadora mide en "cubetas al día" en lugar de metros cuadrados o litros brutos?',
              a: 'Porque en la rutina real de intendencia, ningún administrador o afanador mide los metros cuadrados que limpia, pero todos saben cuántas cubetas de trapeador preparan al día (1 cubeta = 10 litros). Al preguntar esto, obtienes su consumo real de inmediato sin abrumarlo con fórmulas matemáticas complejas.',
            },
            {
              q: '¿Cómo explico que el galón de Key Paraíso sale a $1.28 el litro preparado?',
              a: 'Key Paraíso es un concentrado puro. Con una dilución ligera de mantenimiento diario (1:60, aprox. 16 ml por litro de agua), un galón de 4 litros rinde entre 240 y 320 litros de limpiador listo para trapear. Al dividir el precio del galón ($411) entre 320 litros, cada litro de solución cuesta apenas $1.28 MXN, contra los $20.00 o más que cobran en el súper por agua con aroma.',
            },
            {
              q: '¿Cómo funciona la exportación a Google Sheets de la propuesta para oficinas?',
              a: 'Al presionar "Copiar para Google Sheets", la app copia el desglose completo al portapapeles con formato tabular (TSV). Solo abres una hoja en blanco en sheets.new o Google Drive y presionas Ctrl+V (o Cmd+V en Mac); todas las columnas de productos, cantidades, precios y beneficios se acomodan automáticamente en sus celdas.',
            },
            {
              q: '¿Cómo se calculan las ganancias en el Cierre de Caja?',
              a: 'La app toma cada producto vendido en los recibos del periodo seleccionado y le resta su Precio de Empleado (Costo OKEY) registrado en el catálogo oficial 2026. La diferencia es tu utilidad bruta exacta.',
            },
          ].map((faq, idx) => {
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
