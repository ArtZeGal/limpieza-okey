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
  BadgePercent,
  Plus,
  Trash2,
  Search,
  Filter,
  Stethoscope,
  UtensilsCrossed,
  Factory,
  Layers
} from 'lucide-react'
import { formatCurrency } from '../../utils/formatters'
import { useApp } from '../../context/AppContext'

// Plantillas temáticas predefinidas según el giro de la empresa
export const INDUSTRY_TEMPLATES = {
  office: {
    id: 'office',
    name: '🏢 Oficina / Corporativo',
    description: 'Pisos, sanitarios ejecutivos, cocineta de café y canceles de cristal.',
    defaultItems: [
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
        benefit: 'pH neutro que no deja piso resbaloso ni daña porcelanato o madera.',
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
        benefit: 'Previene sarro y manchas de jabón sin picar la grifería cromada ni canceles.',
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
        benefit: 'Secado instantáneo sin marcas de jalador ni sombras bajo luz LED.',
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
        benefit: 'Biodegradable grado alimenticio: limpia grasa y café sin vapores tóxicos.',
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
        benefit: 'Con humectantes y aroma suave que no reseca las manos del personal.',
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
        benefit: 'Desinfección profunda bactericida de tazas y cuartos de basura.',
        checked: true,
      },
    ],
  },
  medical: {
    id: 'medical',
    name: '🏥 Consultorios / Salud / Spa',
    description: 'Máxima desinfección, jabón antibacterial, aroma limpio y sanitización de aire.',
    defaultItems: [
      {
        id: 'aerosan',
        area: 'Salas de Espera y Consultorios',
        productName: 'Aerosan Desinfectante de Ambiente',
        sku: '2895',
        presentation: 'Aerosol (300 g)',
        unitPrice: 159.0,
        costPrice: 88.33,
        suggestedQty: 2,
        dilution: 'Aspersión directa al ambiente',
        benefit: '99.999% de efectividad bactericida hospitalaria en el aire.',
        checked: true,
      },
      {
        id: 'jabon_espuma',
        area: 'Lavado Frecuente de Manos Médico',
        productName: 'Key Jabón Espuma Almendras',
        sku: '6123',
        presentation: 'Galón (4 L)',
        unitPrice: 503.0,
        costPrice: 279.0,
        suggestedQty: 1,
        dilution: 'Listo para usar en espumador (8,000 lavadas)',
        benefit: 'Ahorro del 50% de agua y jabón; ultra suave con piel sensible.',
        checked: true,
      },
      {
        id: 'pisos_med',
        area: 'Pisos de Quirófano / Consultorios',
        productName: 'Key Paraíso (Aroma Lavanda)',
        sku: '6118',
        presentation: 'Galón (4 L)',
        unitPrice: 411.0,
        costPrice: 228.33,
        suggestedQty: 1,
        dilution: '1:40 desinfección hospitalaria',
        benefit: 'Desinfección profunda que no deja películas grasas ni residuos.',
        checked: true,
      },
      {
        id: 'cloro_med',
        area: 'Desinfección Sanitaria',
        productName: 'Vanguard Cloro',
        sku: '70108',
        presentation: 'Galón (3.75 L)',
        unitPrice: 69.0,
        costPrice: 38.33,
        suggestedQty: 2,
        dilution: '1:50 choque desinfectante',
        benefit: 'Hipoclorito estabilizado de acción rápida contra patógenos.',
        checked: true,
      },
    ],
  },
  restaurant: {
    id: 'restaurant',
    name: '🍽️ Restaurante / Alimentos',
    description: 'Desengrase pesado, loza, trampa de grasa, control de plagas y cocina.',
    defaultItems: [
      {
        id: 'desengrasante_alisan',
        area: 'Campanas, Parrillas y Hornos',
        productName: 'Key Desengrasante Alisan',
        sku: '15049',
        presentation: 'Galón (4 L)',
        unitPrice: 442.0,
        costPrice: 245.56,
        suggestedQty: 2,
        dilution: '1:10 grasa carbonizada / 1:20 grasa media',
        benefit: 'Desprende grasa quemada sin solventes ni vapores tóxicos.',
        checked: true,
      },
      {
        id: 'pisos_porron',
        area: 'Comedor y Salón de Clientes',
        productName: 'Key Paraíso 20L (Porrón)',
        sku: '0182',
        presentation: 'Porrón (20 L)',
        unitPrice: 1756.0,
        costPrice: 975.0,
        suggestedQty: 1,
        dilution: '1:60 (rinde hasta 1,600 L de trapeado)',
        benefit: 'Aroma limpio continuo y máximo rendimiento en áreas de alto tráfico.',
        checked: true,
      },
      {
        id: 'biokey_rest',
        area: 'Cuarto de Basura y Perímetro',
        productName: 'Biokey 100ml (Insecticida)',
        sku: '0586',
        presentation: 'Frasco (100 ml)',
        unitPrice: 275.0,
        costPrice: 153.0,
        suggestedQty: 1,
        dilution: '20 ml por 1 L de agua (rinde 5 L listos)',
        benefit: 'Derribe inmediato de cucarachas y plagas con acción residual prolongada.',
        checked: true,
      },
      {
        id: 'cloro_rest',
        area: 'Desinfección de Pisos de Cocina',
        productName: 'Vanguard Cloro 20L (Porrón)',
        sku: '70111',
        presentation: 'Porrón (20 L)',
        unitPrice: 397.0,
        costPrice: 220.0,
        suggestedQty: 1,
        dilution: '1:50 choque desinfectante',
        benefit: 'Hipoclorito institucional de alta concentración para vertederos y cocina.',
        checked: true,
      },
    ],
  },
  industrial: {
    id: 'industrial',
    name: '🏭 Industrial / Taller / Bodega',
    description: 'Presentaciones institucionales en porrón de 20L y desengrase rudo.',
    defaultItems: [
      {
        id: 'desengrasante_20l',
        area: 'Pisos de Taller y Maquinaria',
        productName: 'Key Desengrasante Alisan 20L (Porrón)',
        sku: '15050',
        presentation: 'Porrón (20 L)',
        unitPrice: 2014.0,
        costPrice: 1118.0,
        suggestedQty: 1,
        dilution: '1:10 a 1:20 desengrase de concreto',
        benefit: 'Emulsiona aceites y lubricantes sin atacar superficies ni selladores.',
        checked: true,
      },
      {
        id: 'paraiso_20l',
        area: 'Almacén y Oficinas de Planta',
        productName: 'Key Paraíso 20L (Porrón)',
        sku: '0182',
        presentation: 'Porrón (20 L)',
        unitPrice: 1756.0,
        costPrice: 975.0,
        suggestedQty: 1,
        dilution: '1:60 (rinde 1,600 cubetas de trapeador)',
        benefit: 'Costo por litro de apenas $1.09 MXN; máxima economía en volumen.',
        checked: true,
      },
      {
        id: 'biokey_ind',
        area: 'Bodega y Control Perimetral',
        productName: 'Biokey 100ml (Insecticida)',
        sku: '0586',
        presentation: 'Frasco (100 ml)',
        unitPrice: 275.0,
        costPrice: 153.0,
        suggestedQty: 2,
        dilution: '20 ml por 1 L de agua',
        benefit: 'Elimina insectos rastreros y voladores en almacenes y pallets.',
        checked: true,
      },
    ],
  },
}

export default function OfficeProposalModal({ onClose }) {
  const { selectedCustomer, products, showToast } = useApp()

  // Datos de la empresa
  const [selectedIndustry, setSelectedIndustry] = useState('office')
  const [officeName, setOfficeName] = useState(selectedCustomer?.name || 'Oficina Corporativa')
  const [contactPerson, setContactPerson] = useState(selectedCustomer?.contactPerson || '')
  const [teamSize, setTeamSize] = useState('medium') // 'small' | 'medium' | 'large'
  const [frequency, setFrequency] = useState('monthly') // 'monthly' | 'bimonthly'

  // Items de la propuesta (inicia con la plantilla seleccionada)
  const [proposalItems, setProposalItems] = useState(INDUSTRY_TEMPLATES.office.defaultItems)

  // Buscador para agregar CUALQUIER producto del catálogo
  const [isCatalogSearchOpen, setIsCatalogSearchOpen] = useState(false)
  const [catalogQuery, setCatalogQuery] = useState('')

  // Cambiar de plantilla industrial
  const handleSelectIndustry = (indId) => {
    setSelectedIndustry(indId)
    const tpl = INDUSTRY_TEMPLATES[indId]
    if (tpl) {
      setProposalItems(tpl.defaultItems)
      showToast(`Plantilla "${tpl.name}" aplicada`)
    }
  }

  // Toggle de selección de item en la propuesta
  const toggleItem = (id) => {
    setProposalItems((prev) =>
      prev.map((it) => (it.id === id ? { ...it, checked: !it.checked } : it))
    )
  }

  // Modificar cantidad
  const updateQty = (id, delta) => {
    setProposalItems((prev) =>
      prev.map((it) => {
        if (it.id === id) {
          const newQty = Math.max(1, it.suggestedQty + delta)
          return { ...it, suggestedQty: newQty }
        }
        return it
      })
    )
  }

  // Eliminar producto de la propuesta
  const removeItem = (id) => {
    setProposalItems((prev) => prev.filter((it) => it.id !== id))
    showToast('Producto removido de la propuesta', 'info')
  }

  // Filtrar productos del catálogo para el buscador de adición
  const catalogResults = useMemo(() => {
    if (!catalogQuery.trim()) {
      return (products || []).slice(0, 10)
    }
    const q = catalogQuery.toLowerCase().trim()
    return (products || [])
      .filter((p) => {
        const matchName = p.name?.toLowerCase().includes(q)
        const matchSku = p.sku?.toLowerCase().includes(q)
        const matchCat = p.category?.toLowerCase().includes(q)
        return matchName || matchSku || matchCat
      })
      .slice(0, 15)
  }, [products, catalogQuery])

  // Agregar un producto del catálogo general a la propuesta
  const handleAddProductFromCatalog = (product) => {
    const existing = proposalItems.find((it) => it.sku === product.sku)
    if (existing) {
      updateQty(existing.id, 1)
      showToast(`Cantidad de "${product.name}" incrementada`, 'info')
      return
    }

    const newItem = {
      id: `prod-${product.sku || Date.now()}`,
      area: `Área General / ${product.category}`,
      productName: product.name,
      sku: product.sku || 'N/A',
      presentation: product.presentation || 'Pieza',
      unitPrice: Number(product.price) || 0,
      costPrice: Number(product.cost) || 0,
      suggestedQty: 1,
      dilution: product.presentation?.includes('20L')
        ? 'Presentación Institucional Porrón'
        : 'Dilución según ficha técnica oficial',
      benefit: product.description || 'Producto profesional oficial KEY® Química.',
      checked: true,
    }

    setProposalItems((prev) => [...prev, newItem])
    showToast(`"${product.name}" añadido a la propuesta`, 'success')
    setCatalogQuery('')
  }

  // Cálculos de la propuesta
  const activeItems = useMemo(() => proposalItems.filter((it) => it.checked), [proposalItems])

  const subtotal = useMemo(() => {
    return activeItems.reduce((acc, it) => acc + it.unitPrice * it.suggestedQty, 0)
  }, [activeItems])

  const shippingCost = subtotal >= 1500 ? 0 : 120
  const total = subtotal + shippingCost

  // 1. Copiar al Portapapeles en Formato TSV para Google Sheets
  const handleCopyForGoogleSheets = async () => {
    const headers = [
      'Clave/SKU',
      'Área Asignada',
      'Producto Recomendado',
      'Presentación',
      'Cantidad Sugerida',
      'Precio Unitario ($ MXN)',
      'Subtotal ($ MXN)',
      'Dilución / Rendimiento',
      'Beneficio Operativo'
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

    // Filas de totales
    rows.push(['', '', '', '', '', 'SUBTOTAL:', subtotal.toFixed(2), '', ''])
    rows.push(['', '', '', '', '', 'ENVÍO A DOMICILIO:', shippingCost.toFixed(2), shippingCost === 0 ? '¡GRATIS!' : '$120 MXN', ''])
    rows.push(['', '', '', '', '', 'INVERSIÓN TOTAL:', total.toFixed(2), `Suministro (${frequency === 'monthly' ? 'Mensual' : 'Bimestral'})`, ''])

    const tsvContent = [
      `PROPUESTA DE SUMINISTRO: ${officeName.toUpperCase()}`,
      `Fecha: ${new Date().toLocaleDateString('es-MX')} | Presenta: Limpieza OKEY`,
      '',
      headers.join('\t'),
      ...rows.map((row) => row.join('\t'))
    ].join('\n')

    try {
      await navigator.clipboard.writeText(tsvContent)
      showToast('¡Tabla copiada! Abre Google Sheets y presiona Pegar (Ctrl+V)', 'success')
    } catch {
      showToast('Error al copiar. Usa el botón de Descargar Excel / CSV.', 'error')
    }
  }

  // 2. Descargar como CSV compatible con Excel y Google Sheets
  const handleDownloadCSV = () => {
    const headers = [
      'Clave',
      'Area',
      'Producto',
      'Presentacion',
      'Cantidad',
      'Precio_Unitario',
      'Total',
      'Dilucion',
      'Beneficio'
    ]

    const escapeCSV = (str) => `"${String(str || '').replace(/"/g, '""')}"`

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
    rows.push(['', '', '', '', '', escapeCSV('ENVIO:'), shippingCost.toFixed(2), '', ''])
    rows.push(['', '', '', '', '', escapeCSV('TOTAL:'), total.toFixed(2), '', ''])

    const csvContent =
      '\uFEFF' + // UTF-8 BOM para acentos en Excel
      [headers.join(','), ...rows.map((r) => r.join(','))].join('\r\n')

    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' })
    const url = URL.createObjectURL(blob)
    const link = document.createElement('a')
    const cleanOfficeName = officeName.replace(/[^a-zA-Z0-9]/g, '_')
    link.href = url
    link.setAttribute('download', `Propuesta_${cleanOfficeName}_OKEY.csv`)
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
    URL.revokeObjectURL(url)

    showToast('Archivo CSV descargado listo para abrir en Google Sheets o Excel', 'success')
  }

  // 3. Compartir por WhatsApp
  const handleShareWhatsApp = () => {
    const lines = activeItems.map(
      (it, idx) =>
        `${idx + 1}. *${it.productName}* (${it.presentation}) x ${it.suggestedQty} pza(s) — ${formatCurrency(it.unitPrice * it.suggestedQty)}\n   _Área: ${it.area} (${it.dilution})_`
    )

    const text = `🏢 *PROPUESTA DE LIMPIEZA & AHORRO CORPORATIVO*
📋 *Cliente:* ${officeName} ${contactPerson ? `(Atenc: ${contactPerson})` : ''}
📍 *Presenta:* Limpieza OKEY · Insumos KEY® Concentrados

Estimado equipo, les compartimos la propuesta optimizada de insumos de higiene:

${lines.join('\n\n')}

💰 *RESUMEN DE INVERSIÓN (${frequency === 'monthly' ? 'MENSUAL' : 'BIMESTRAL'}):*
• Subtotal Productos: *${formatCurrency(subtotal)} MXN*
• Entrega a domicilio: *${shippingCost === 0 ? 'GRATIS ($0.00)' : formatCurrency(shippingCost)}*
💎 *Inversión Total:* *${formatCurrency(total)} MXN*

🛡️ *VENTAJAS PARA SUS INSTALACIONES:*
• Concentrados puros para diluir en sitio (ahorro del 60%+ vs supermercado).
• pH neutro que cuida pisos finos, canceles y grifería sin corrosión ni sarro.
• Entrega programada directa con factura y soporte continuo.

_Generado con Limpieza OKEY · limpieza-okey.vercel.app_`

    const url = `https://wa.me/?text=${encodeURI(text)}`
    window.open(url, '_blank')
  }

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-3 sm:p-4 animate-fadeIn">
      <div className="bg-white rounded-3xl border border-slate-200 overflow-hidden shadow-2xl max-w-4xl w-full max-h-[92vh] flex flex-col my-auto">
        {/* Header */}
        <div className="bg-gradient-to-r from-blue-900 via-indigo-900 to-slate-900 text-white p-5 sm:p-6 flex items-center justify-between gap-4 shrink-0">
          <div>
            <div className="flex items-center gap-1.5 text-cyan-300 text-[11px] font-bold uppercase tracking-wider">
              <Building2 className="w-3.5 h-3.5" />
              <span>Propuesta para Empresas & Oficinas 100% Personalizable</span>
            </div>
            <h3 className="text-lg sm:text-xl font-black text-white tracking-tight mt-0.5">
              Cuestionario & Exportación a Google Sheets / Excel
            </h3>
            <p className="text-xs text-slate-300">
              Elige una plantilla o agrega cualquier producto de los 275 del catálogo oficial.
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
          {/* Selector de Giro / Plantillas Rápidas */}
          <div className="space-y-2">
            <label className="text-[11px] font-black text-slate-500 uppercase tracking-wider block">
              Plantillas Rápidas según Giro de la Empresa:
            </label>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 text-xs">
              {Object.values(INDUSTRY_TEMPLATES).map((tpl) => {
                const isSelected = selectedIndustry === tpl.id
                return (
                  <button
                    key={tpl.id}
                    type="button"
                    onClick={() => handleSelectIndustry(tpl.id)}
                    className={`p-2.5 rounded-2xl border text-left transition-all ${
                      isSelected
                        ? 'bg-blue-50 border-blue-600 ring-2 ring-blue-600/20 text-blue-950 font-bold shadow-xs'
                        : 'bg-white border-slate-200 hover:border-slate-300 text-slate-700'
                    }`}
                  >
                    <span className="font-extrabold block text-xs truncate">
                      {tpl.name}
                    </span>
                    <span className="text-[10px] text-slate-500 block truncate mt-0.5">
                      {tpl.description}
                    </span>
                  </button>
                )
              })}
            </div>
          </div>

          {/* Datos de la Empresa */}
          <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200/90 space-y-3">
            <h4 className="text-xs font-black text-slate-900 uppercase tracking-wider flex items-center gap-2">
              <span className="w-5 h-5 rounded-full bg-blue-600 text-white flex items-center justify-center text-[10px]">
                1
              </span>
              <span>Datos del Cliente y Frecuencia de Suministro</span>
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
                  placeholder="Ej. Despacho Contable García, Clínica Dental, etc."
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

          {/* Paso 2: Productos Seleccionados & Botón para Agregar del Catálogo */}
          <div className="space-y-3">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
              <h4 className="text-xs font-black text-slate-900 uppercase tracking-wider flex items-center gap-2">
                <span className="w-5 h-5 rounded-full bg-blue-600 text-white flex items-center justify-center text-[10px]">
                  2
                </span>
                <span>Productos Seleccionados para la Propuesta ({activeItems.length})</span>
              </h4>

              {/* Botón para desplegar buscador del catálogo */}
              <button
                type="button"
                onClick={() => setIsCatalogSearchOpen(!isCatalogSearchOpen)}
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-extrabold text-xs shadow-xs transition-all active:scale-98 self-start sm:self-auto"
              >
                <Plus className="w-3.5 h-3.5" />
                <span>+ Agregar Cualquier Producto del Catálogo</span>
              </button>
            </div>

            {/* Buscador Integrado del Catálogo Completo */}
            {isCatalogSearchOpen && (
              <div className="p-4 rounded-2xl bg-gradient-to-r from-blue-50 to-indigo-50 border border-blue-200 space-y-3 animate-fadeIn">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold text-blue-900 flex items-center gap-1.5">
                    <Search className="w-3.5 h-3.5 text-blue-600" />
                    <span>Buscar en los 275 productos del catálogo KEY®:</span>
                  </span>
                  <button
                    type="button"
                    onClick={() => setIsCatalogSearchOpen(false)}
                    className="text-xs text-slate-500 hover:text-slate-800 font-bold"
                  >
                    Cerrar buscador
                  </button>
                </div>

                <div className="relative">
                  <Search className="w-4 h-4 text-slate-400 absolute left-3 top-2.5" />
                  <input
                    type="text"
                    value={catalogQuery}
                    onChange={(e) => setCatalogQuery(e.target.value)}
                    placeholder="Escribe producto, clave o categoría (ej. BioKey, Alfombra, Acero, Porrón, Sanitas...)"
                    className="w-full pl-9 pr-3 py-2 bg-white border border-blue-300 rounded-xl text-xs font-medium text-slate-900 focus:outline-none focus:ring-2 focus:ring-blue-500 shadow-2xs"
                    autoFocus
                  />
                </div>

                {/* Resultados rápidos de búsqueda */}
                <div className="max-h-48 overflow-y-auto divide-y divide-blue-100 bg-white rounded-xl border border-blue-200 text-xs">
                  {catalogResults.length > 0 ? (
                    catalogResults.map((p) => (
                      <div
                        key={p.id || p.sku}
                        className="p-2.5 flex items-center justify-between gap-2 hover:bg-blue-50/60 transition-colors"
                      >
                        <div className="min-w-0">
                          <span className="font-extrabold text-slate-900 block truncate">
                            {p.name}
                          </span>
                          <span className="text-[10px] text-slate-500 block">
                            SKU: {p.sku} &bull; {p.category} &bull; {p.presentation}
                          </span>
                        </div>
                        <div className="flex items-center gap-2 shrink-0">
                          <span className="font-black text-slate-900">
                            {formatCurrency(p.price)}
                          </span>
                          <button
                            type="button"
                            onClick={() => handleAddProductFromCatalog(p)}
                            className="px-2.5 py-1 rounded-lg bg-blue-600 hover:bg-blue-700 text-white font-extrabold text-[11px] shadow-2xs flex items-center gap-1"
                          >
                            <Plus className="w-3 h-3" />
                            <span>Agregar</span>
                          </button>
                        </div>
                      </div>
                    ))
                  ) : (
                    <p className="p-4 text-center text-xs text-slate-400 italic">
                      No se encontraron productos coincidentes en el catálogo.
                    </p>
                  )}
                </div>
              </div>
            )}

            {/* Listado de Productos en la Propuesta */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              {proposalItems.map((it) => (
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
                      <div className="min-w-0">
                        <span className="font-extrabold text-xs text-slate-900 block leading-tight truncate">
                          {it.productName}
                        </span>
                        <span className="text-[10px] text-blue-700 font-semibold block truncate">
                          Área: {it.area}
                        </span>
                      </div>
                    </button>

                    <div className="text-right shrink-0">
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
                      <span className="text-slate-500 text-[10px] truncate max-w-[180px]" title={it.dilution}>
                        💧 {it.dilution}
                      </span>

                      <div className="flex items-center gap-2">
                        {/* Control de Cantidad */}
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

                        {/* Botón Eliminar Fila */}
                        <button
                          type="button"
                          onClick={() => removeItem(it.id)}
                          className="p-1 rounded-lg text-slate-400 hover:text-rose-600 hover:bg-rose-50 transition-colors"
                          title="Eliminar de la propuesta"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
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
              💡 <em>Todos los productos vienen en alta concentración profesional para dilución en sitio. Ahorro de más del 60% comparado con la compra tradicional en supermercados.</em>
            </p>
          </div>
        </div>

        {/* Footer con Acciones de Exportación */}
        <div className="bg-slate-50 border-t border-slate-200 p-4 sm:p-5 flex flex-wrap items-center justify-between gap-3 shrink-0">
          <div className="text-xs text-slate-500 font-medium">
            Exporta tus productos seleccionados en 1 clic:
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
