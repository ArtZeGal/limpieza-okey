import { useState, useMemo } from 'react'
import {
  X,
  Building2,
  CheckCircle2,
  Sparkles,
  Copy,
  Download,
  Share2,
  FileSpreadsheet,
  Users,
  Coffee,
  Check,
  ChevronRight,
  ArrowRight,
  ShieldCheck,
  BadgePercent
} from 'lucide-react'
import { formatCurrency } from '../../utils/formatters'
import { useApp } from '../../context/AppContext'

export const DEFAULT_OFFICE_SOLUTIONS = [
  {
    id: 'pisos',
    area: 'Pisos de Oficina y Recepción',
    productName: 'Key Paraíso (Aroma Lavanda)',
    sku: '6118',
    presentation: 'Galón (4 L)',
    unitPrice: 411.0,
    costPrice: 228.33,
    suggestedQty: 1,
    dilution: '1:60 (16 ml / litro de agua)',
    yieldReady: 'Hasta 240 a 320 litros preparados',
    benefit: 'pH neutro que no deja piso resbaloso ni daña porcelanato o madera.',
    category: 'Pisos',
    checked: true,
  },
  {
    id: 'banos',
    area: 'Sanitarios de Oficina y Clientes',
    productName: 'Key Baño (Fórmula 503 No Ácida)',
    sku: '503',
    presentation: 'Galón (4 L)',
    unitPrice: 495.0,
    costPrice: 275.0,
    suggestedQty: 1,
    dilution: '1:6 (167 ml / litro de agua)',
    yieldReady: 'Rinde 24 litros listos en atomizador',
    benefit: 'Previene sarro y manchas de jabón sin picar la grifería cromada ni canceles.',
    category: 'Baños',
    checked: true,
  },
  {
    id: 'vidrios',
    area: 'Puertas de Cristal y Ventanales',
    productName: 'Key Limpiavidrios',
    sku: '168',
    presentation: 'Galón (4 L)',
    unitPrice: 267.0,
    costPrice: 148.33,
    suggestedQty: 1,
    dilution: '300 ml / litro de agua o listo para usar',
    yieldReady: 'Rinde hasta 24 litros con atomizador',
    benefit: 'Secado instantáneo sin marcas de jalador ni sombras bajo luz de oficina.',
    category: 'Vidrios',
    checked: true,
  },
  {
    id: 'cocineta',
    area: 'Cocineta, Microondas y Café',
    productName: 'Key Desengrasante Alisan',
    sku: '15049',
    presentation: 'Galón (4 L)',
    unitPrice: 442.0,
    costPrice: 245.56,
    suggestedQty: 1,
    dilution: '1:20 para tarjas y hornos',
    yieldReady: 'Rinde hasta 80 litros de solución',
    benefit: 'Biodegradable grado alimenticio: limpia grasa y café sin vapores tóxicos.',
    category: 'Cocineta',
    checked: true,
  },
  {
    id: 'jabon',
    area: 'Lavado de Manos Ejecutivo',
    productName: 'Key Jabón Crema Almendras',
    sku: '15039',
    presentation: 'Galón (4 L)',
    unitPrice: 485.0,
    costPrice: 269.44,
    suggestedQty: 1,
    dilution: 'Listo para usar en despachador',
    yieldReady: 'Rinde más de 2,000 lavadas de manos',
    benefit: 'Con humectantes y aroma suave que no reseca las manos del personal.',
    category: 'Manos',
    checked: true,
  },
  {
    id: 'cloro',
    area: 'Desinfección de Baños y Vertederos',
    productName: 'Vanguard Cloro',
    sku: '70108',
    presentation: 'Galón (3.75 L)',
    unitPrice: 69.0,
    costPrice: 38.33,
    suggestedQty: 2,
    dilution: '1:100 para choque desinfectante',
    yieldReady: 'Hipoclorito estabilizado',
    benefit: 'Desinfección profunda bactericida de tazas y cuartos de basura.',
    category: 'Desinfección',
    checked: true,
  },
]

export default function OfficeProposalModal({ onClose }) {
  const { selectedCustomer, showToast } = useApp()

  // Datos de la oficina
  const [officeName, setOfficeName] = useState(selectedCustomer?.name || 'Oficina Corporativa')
  const [contactPerson, setContactPerson] = useState(selectedCustomer?.contactPerson || '')
  const [teamSize, setTeamSize] = useState('medium') // 'small' (1-10) | 'medium' (10-30) | 'large' (30+)
  const [frequency, setFrequency] = useState('monthly') // 'monthly' | 'bimonthly'

  // Items de la propuesta
  const [items, setItems] = useState(DEFAULT_OFFICE_SOLUTIONS)

  // Toggle de selección de producto
  const toggleItem = (id) => {
    setItems((prev) =>
      prev.map((item) => (item.id === id ? { ...item, checked: !item.checked } : item))
    )
  }

  // Modificar cantidad
  const updateQty = (id, delta) => {
    setItems((prev) =>
      prev.map((item) => {
        if (item.id === id) {
          const newQty = Math.max(1, item.suggestedQty + delta)
          return { ...item, suggestedQty: newQty }
        }
        return item
      })
    )
  }

  // Modificar presentación (Galón vs Porrón)
  const togglePresentation = (id) => {
    setItems((prev) =>
      prev.map((item) => {
        if (item.id === id && item.id === 'pisos') {
          const isGalon = item.presentation.includes('Galón')
          return {
            ...item,
            presentation: isGalon ? 'Porrón (20 L)' : 'Galón (4 L)',
            unitPrice: isGalon ? 1756.0 : 411.0,
            costPrice: isGalon ? 975.0 : 228.33,
            suggestedQty: 1,
          }
        }
        return item
      })
    )
  }

  // Cálculos de la propuesta
  const activeItems = useMemo(() => items.filter((it) => it.checked), [items])

  const subtotal = useMemo(() => {
    return activeItems.reduce((acc, it) => acc + it.unitPrice * it.suggestedQty, 0)
  }, [activeItems])

  const shippingCost = subtotal >= 1500 ? 0 : 120
  const total = subtotal + shippingCost

  // 1. Copiar al Portapapeles en Formato TSV para Google Sheets
  const handleCopyForGoogleSheets = async () => {
    const headers = [
      'Clave/SKU',
      'Área de la Oficina',
      'Producto Recomendado',
      'Presentación',
      'Cantidad',
      'Precio Unitario ($ MXN)',
      'Subtotal ($ MXN)',
      'Dilución / Rendimiento',
      'Beneficio Corporativo'
    ]

    const rows = activeItems.map((it) => [
      it.sku,
      it.area,
      it.productName,
      it.presentation,
      it.suggestedQty,
      it.unitPrice.toFixed(2),
      (it.unitPrice * it.suggestedQty).toFixed(2),
      it.dilution,
      it.benefit
    ])

    // Agregar filas de resumen
    rows.push(['', '', '', '', '', 'SUBTOTAL:', subtotal.toFixed(2), '', ''])
    rows.push(['', '', '', '', '', 'ENVÍO A DOMICILIO:', shippingCost.toFixed(2), shippingCost === 0 ? '¡GRATIS!' : '$120 MXN', ''])
    rows.push(['', '', '', '', '', 'INVERSIÓN TOTAL:', total.toFixed(2), `Suministro sugerido (${frequency === 'monthly' ? 'Mensual' : 'Bimestral'})`, ''])

    const tsvContent = [
      `PROPUESTA DE SUMINISTRO PARA OFICINA: ${officeName.toUpperCase()}`,
      `Fecha: ${new Date().toLocaleDateString('es-MX')} | Presentado por: Limpieza OKEY`,
      '',
      headers.join('\t'),
      ...rows.map((row) => row.join('\t'))
    ].join('\n')

    try {
      await navigator.clipboard.writeText(tsvContent)
      showToast('¡Tabla copiada! Abre Google Sheets y presiona Pegar (Ctrl+V)', 'success')
    } catch (err) {
      showToast('Error al copiar al portapapeles. Prueba descargando el archivo CSV.', 'error')
    }
  }

  // 2. Descargar como CSV compatible con Excel y Google Sheets
  const handleDownloadCSV = () => {
    const headers = [
      'Clave',
      'Área',
      'Producto',
      'Presentación',
      'Cantidad',
      'Precio_Unitario',
      'Total',
      'Dilución',
      'Beneficio'
    ]

    const escapeCSV = (str) => `"${String(str).replace(/"/g, '""')}"`

    const rows = activeItems.map((it) => [
      escapeCSV(it.sku),
      escapeCSV(it.area),
      escapeCSV(it.productName),
      escapeCSV(it.presentation),
      it.suggestedQty,
      it.unitPrice.toFixed(2),
      (it.unitPrice * it.suggestedQty).toFixed(2),
      escapeCSV(it.dilution),
      escapeCSV(it.benefit)
    ])

    rows.push(['', '', '', '', '', escapeCSV('SUBTOTAL:'), subtotal.toFixed(2), '', ''])
    rows.push(['', '', '', '', '', escapeCSV('ENVÍO:'), shippingCost.toFixed(2), '', ''])
    rows.push(['', '', '', '', '', escapeCSV('TOTAL:'), total.toFixed(2), '', ''])

    const csvContent =
      '\uFEFF' + // UTF-8 BOM para evitar caracteres raros en Excel en español
      [headers.join(','), ...rows.map((r) => r.join(','))].join('\r\n')

    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' })
    const url = URL.createObjectURL(blob)
    const link = document.createElement('a')
    const cleanOfficeName = officeName.replace(/[^a-zA-Z0-9]/g, '_')
    link.href = url
    link.setAttribute('download', `Propuesta_Oficina_${cleanOfficeName}_OKEY.csv`)
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
    URL.revokeObjectURL(url)

    showToast('Archivo CSV descargado listo para abrir en Google Sheets o Excel', 'success')
  }

  // 3. Compartir Resumen Ejecutivo por WhatsApp
  const handleShareWhatsApp = () => {
    const lines = activeItems.map(
      (it, idx) =>
        `${idx + 1}. *${it.productName}* (${it.presentation}) x ${it.suggestedQty} pza(s) — ${formatCurrency(it.unitPrice * it.suggestedQty)}\n   _Área: ${it.area} (${it.dilution})_`
    )

    const text = `🏢 *PROPUESTA DE LIMPIEZA & AHORRO PARA OFICINA*
📋 *Cliente:* ${officeName} ${contactPerson ? `(Atenc: ${contactPerson})` : ''}
📍 *Presenta:* Limpieza OKEY · Insumos KEY® Concentrados

Estimado equipo, les compartimos la propuesta optimizada de insumos de higiene corporativa:

${lines.join('\n\n')}

💰 *RESUMEN DE INVERSIÓN (${frequency === 'monthly' ? 'MENSUAL' : 'BIMESTRAL'}):*
• Subtotal Productos: *${formatCurrency(subtotal)} MXN*
• Entrega a domicilio: *${shippingCost === 0 ? 'GRATIS ($0.00)' : formatCurrency(shippingCost)}*
💎 *Inversión Total:* *${formatCurrency(total)} MXN*

🛡️ *VENTAJAS PARA SUS INSTALACIONES:*
• Fórmulas de alto rendimiento diluibles en sitio (ahorro del 60%+ vs supermercado).
• pH neutro que cuida pisos finos, canceles y grifería sin corrosión.
• Firma aromática profesional y hospitalaria en recepción y sanitarios.

_Generado con Limpieza OKEY · limpieza-okey.vercel.app_`

    const url = `https://wa.me/?text=${encodeURI(text)}`
    window.open(url, '_blank')
  }

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-3 sm:p-4 animate-fadeIn">
      <div className="bg-white rounded-3xl border border-slate-200 overflow-hidden shadow-2xl max-w-3xl w-full max-h-[92vh] flex flex-col my-auto">
        {/* Header */}
        <div className="bg-gradient-to-r from-blue-900 via-indigo-900 to-slate-900 text-white p-5 sm:p-6 flex items-center justify-between gap-4 shrink-0">
          <div>
            <div className="flex items-center gap-1.5 text-cyan-300 text-[11px] font-bold uppercase tracking-wider">
              <Building2 className="w-3.5 h-3.5" />
              <span>Propuesta para Clientes Oficina & Corporativos</span>
            </div>
            <h3 className="text-lg sm:text-xl font-black text-white tracking-tight mt-0.5">
              Cuestionario & Exportación a Google Sheets
            </h3>
            <p className="text-xs text-slate-300">
              Diagnostica en 30 segundos y genera una tabla editable lista para compartir.
            </p>
          </div>

          <button
            type="button"
            onClick={onClose}
            className="p-2 rounded-xl bg-white/10 hover:bg-white/20 text-white transition-colors"
            title="Cerrar"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content Body (Scrollable) */}
        <div className="p-5 sm:p-6 space-y-6 overflow-y-auto flex-1">
          {/* Paso 1: Datos de la Oficina */}
          <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200/90 space-y-3">
            <h4 className="text-xs font-black text-slate-900 uppercase tracking-wider flex items-center gap-2">
              <span className="w-5 h-5 rounded-full bg-blue-600 text-white flex items-center justify-center text-[10px]">
                1
              </span>
              <span>Datos de la Oficina o Empresa</span>
            </h4>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
              <div>
                <label className="font-bold text-slate-700 block mb-1">
                  Nombre de la Empresa / Oficina:
                </label>
                <input
                  type="text"
                  value={officeName}
                  onChange={(e) => setOfficeName(e.target.value)}
                  placeholder="Ej. Despacho Contable García & Asocs"
                  className="w-full px-3 py-2 bg-white border border-slate-300 rounded-xl font-semibold text-slate-900 focus:outline-none focus:ring-2 focus:ring-blue-500 shadow-2xs"
                />
              </div>

              <div>
                <label className="font-bold text-slate-700 block mb-1">
                  Atención / Encargado de Compras:
                </label>
                <input
                  type="text"
                  value={contactPerson}
                  onChange={(e) => setContactPerson(e.target.value)}
                  placeholder="Ej. Lic. Laura Ramos (Opcional)"
                  className="w-full px-3 py-2 bg-white border border-slate-300 rounded-xl font-semibold text-slate-900 focus:outline-none focus:ring-2 focus:ring-blue-500 shadow-2xs"
                />
              </div>
            </div>

            <div className="flex flex-wrap items-center justify-between gap-3 pt-2 border-t border-slate-200/60 text-xs">
              <div className="flex items-center gap-1.5">
                <span className="font-bold text-slate-600">Personal:</span>
                <div className="flex items-center bg-white p-0.5 rounded-xl border border-slate-200 text-[11px] font-bold">
                  {[
                    { id: 'small', label: '1–10 pers.' },
                    { id: 'medium', label: '10–30 pers.' },
                    { id: 'large', label: '30+ pers.' },
                  ].map((t) => (
                    <button
                      key={t.id}
                      type="button"
                      onClick={() => setTeamSize(t.id)}
                      className={`px-2.5 py-1 rounded-lg transition-all ${
                        teamSize === t.id
                          ? 'bg-blue-600 text-white shadow-xs'
                          : 'text-slate-600 hover:text-blue-600'
                      }`}
                    >
                      {t.label}
                    </button>
                  ))}
                </div>
              </div>

              <div className="flex items-center gap-1.5">
                <span className="font-bold text-slate-600">Frecuencia:</span>
                <div className="flex items-center bg-white p-0.5 rounded-xl border border-slate-200 text-[11px] font-bold">
                  {[
                    { id: 'monthly', label: 'Mensual' },
                    { id: 'bimonthly', label: 'Bimestral' },
                  ].map((f) => (
                    <button
                      key={f.id}
                      type="button"
                      onClick={() => setFrequency(f.id)}
                      className={`px-2.5 py-1 rounded-lg transition-all ${
                        frequency === f.id
                          ? 'bg-slate-900 text-white shadow-xs'
                          : 'text-slate-600 hover:text-slate-900'
                      }`}
                    >
                      {f.label}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Paso 2: Cuestionario de Soluciones y Productos */}
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <h4 className="text-xs font-black text-slate-900 uppercase tracking-wider flex items-center gap-2">
                <span className="w-5 h-5 rounded-full bg-blue-600 text-white flex items-center justify-center text-[10px]">
                  2
                </span>
                <span>Selección de Productos y Áreas de la Oficina</span>
              </h4>
              <span className="text-[11px] font-bold text-blue-700">
                {activeItems.length} de {items.length} áreas activas
              </span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              {items.map((it) => (
                <div
                  key={it.id}
                  className={`p-3.5 rounded-2xl border transition-all ${
                    it.checked
                      ? 'bg-white border-blue-500 ring-2 ring-blue-500/10 shadow-xs'
                      : 'bg-slate-50 border-slate-200 opacity-60'
                  }`}
                >
                  <div className="flex items-start justify-between gap-2">
                    <button
                      type="button"
                      onClick={() => toggleItem(it.id)}
                      className="flex items-start gap-2.5 text-left flex-1"
                    >
                      <div
                        className={`w-4 h-4 rounded-md mt-0.5 flex items-center justify-center border transition-colors ${
                          it.checked
                            ? 'bg-blue-600 border-blue-600 text-white'
                            : 'border-slate-300 bg-white'
                        }`}
                      >
                        {it.checked && <Check className="w-3 h-3 stroke-[3]" />}
                      </div>
                      <div>
                        <span className="font-extrabold text-xs text-slate-900 block leading-tight">
                          {it.area}
                        </span>
                        <span className="text-[11px] text-blue-700 font-semibold block">
                          {it.productName}
                        </span>
                      </div>
                    </button>

                    <div className="text-right">
                      <span className="text-xs font-black text-slate-900 block">
                        {formatCurrency(it.unitPrice)}
                      </span>
                      <span className="text-[10px] text-slate-500 block">
                        {it.presentation}
                      </span>
                    </div>
                  </div>

                  {it.checked && (
                    <div className="mt-2.5 pt-2 border-t border-slate-100 flex items-center justify-between text-[11px]">
                      <span className="text-slate-500 text-[10px] truncate max-w-[170px]" title={it.dilution}>
                        💧 {it.dilution}
                      </span>

                      <div className="flex items-center gap-1.5">
                        {it.id === 'pisos' && (
                          <button
                            type="button"
                            onClick={() => togglePresentation(it.id)}
                            className="text-[9px] px-1.5 py-0.5 rounded-md bg-indigo-50 hover:bg-indigo-100 text-indigo-700 font-bold border border-indigo-200"
                            title="Cambiar entre Galón 4L y Porrón 20L"
                          >
                            {it.presentation.includes('20L') ? '20L' : '4L'} 🔄
                          </button>
                        )}

                        <div className="flex items-center bg-slate-100 rounded-lg p-0.5 font-bold">
                          <button
                            type="button"
                            onClick={() => updateQty(it.id, -1)}
                            className="w-5 h-5 flex items-center justify-center text-slate-600 hover:text-slate-900 text-xs"
                          >
                            -
                          </button>
                          <span className="w-5 text-center text-xs font-black text-slate-900">
                            {it.suggestedQty}
                          </span>
                          <button
                            type="button"
                            onClick={() => updateQty(it.id, 1)}
                            className="w-5 h-5 flex items-center justify-center text-slate-600 hover:text-slate-900 text-xs"
                          >
                            +
                          </button>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* Tarjeta de Resumen Financiero */}
          <div className="p-4 rounded-2xl bg-gradient-to-br from-slate-900 via-indigo-950 to-blue-950 text-white space-y-2.5 shadow-md">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-cyan-300 uppercase tracking-wider">
                Inversión Estimada para {officeName}:
              </span>
              <span className="text-[11px] px-2.5 py-0.5 rounded-full bg-emerald-500/20 text-emerald-300 font-extrabold border border-emerald-500/40">
                {shippingCost === 0 ? 'Envío GRATIS ($0)' : 'Envío $120 MXN'}
              </span>
            </div>

            <div className="flex items-baseline justify-between pt-1">
              <div>
                <span className="text-[11px] text-slate-300 block">Subtotal Productos:</span>
                <span className="text-lg font-bold text-white">
                  {formatCurrency(subtotal)}
                </span>
              </div>
              <div className="text-right">
                <span className="text-[11px] text-slate-300 block">
                  Total Propuesta ({frequency === 'monthly' ? 'Mensual' : 'Bimestral'}):
                </span>
                <span className="text-2xl sm:text-3xl font-black text-emerald-400">
                  {formatCurrency(total)}
                </span>
              </div>
            </div>

            <p className="text-[11px] text-slate-300 pt-1 border-t border-white/10 leading-relaxed">
              💡 <em>Todos los productos vienen concentrados para diluirse en sitio. Rinden hasta 15 veces más que comprar botes individuales en supermercado o club de precios.</em>
            </p>
          </div>
        </div>

        {/* Footer con Acciones de Exportación */}
        <div className="bg-slate-50 border-t border-slate-200 p-4 sm:p-5 flex flex-wrap items-center justify-between gap-3 shrink-0">
          <div className="text-xs text-slate-500 font-medium">
            Exporta en 1 clic y edita en Google Sheets / Excel:
          </div>

          <div className="flex flex-wrap items-center gap-2">
            {/* Botón 1: Copiar para Google Sheets */}
            <button
              type="button"
              onClick={handleCopyForGoogleSheets}
              className="px-3.5 py-2.5 rounded-xl bg-white hover:bg-slate-100 text-slate-800 font-extrabold text-xs border border-slate-300 shadow-2xs transition-all flex items-center gap-1.5"
              title="Copia tabla con tabulaciones lista para pegar con Ctrl+V en Google Sheets"
            >
              <Copy className="w-4 h-4 text-emerald-600" />
              <span>Copiar para Google Sheets</span>
            </button>

            {/* Botón 2: Descargar CSV para Excel */}
            <button
              type="button"
              onClick={handleDownloadCSV}
              className="px-3.5 py-2.5 rounded-xl bg-white hover:bg-slate-100 text-slate-800 font-extrabold text-xs border border-slate-300 shadow-2xs transition-all flex items-center gap-1.5"
              title="Descarga archivo CSV compatible con Excel y Sheets"
            >
              <FileSpreadsheet className="w-4 h-4 text-blue-600" />
              <span>Descargar Excel / CSV</span>
            </button>

            {/* Botón 3: Enviar por WhatsApp */}
            <button
              type="button"
              onClick={handleShareWhatsApp}
              className="px-4 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 active:scale-98 text-white font-black text-xs shadow-md shadow-emerald-600/20 transition-all flex items-center gap-1.5"
            >
              <Share2 className="w-4 h-4" />
              <span>Enviar por WhatsApp</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
