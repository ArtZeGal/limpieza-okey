import {
  X,
  Droplets,
  ShieldCheck,
  Sparkles,
  Calculator,
  Share2,
  CheckCircle2,
  AlertTriangle,
  Layers,
  ArrowRight
} from 'lucide-react'
import { getProductSpec } from '../../data/productSpecs'
import { formatCurrency } from '../../utils/formatters'

export default function TechnicalSpecModal({ product, onClose, onOpenCalculator }) {
  if (!product) return null

  const spec = getProductSpec(product)

  const handleShareWhatsApp = () => {
    const tableHeader = (spec.tableTitle || 'Tabla de Dilución y Rendimiento Oficial').toUpperCase()
    const dilutionsText = (spec.dilutions || [])
      .map((d) => `• *${d.level}:* ${d.ratio} (${d.mlPerLiter}) → ${d.yieldGalon} [${d.costPerLiter}]`)
      .join('\n')

    const instructionsText = (spec.instructions || [])
      .map((ins, i) => `${i + 1}. ${ins}`)
      .join('\n')

    const text = `🧪 *FICHA TÉCNICA Y GUÍA OFICIAL*
🏢 *Limpieza OKEY · Soluciones Profesionales KEY®*

📌 *Producto:* ${product.name}
🔢 *Código/SKU:* ${product.sku}
🏷️ *Categoría:* ${product.category}

💡 *Naturaleza y Beneficios:*
${spec.nature || 'Fórmula profesional oficial KEY® Química.'}

${spec.isHardwareOrPaper ? '📋' : '💧'} *${tableHeader}:*
${dilutionsText}

📋 *MODO DE EMPLEO / RECOMENDACIONES:*
${instructionsText}

🛡️ *Compatibilidad / Superficies:* ${(spec.safeSurfaces || []).join(', ')}

_Consulte asesoría técnica especializada con Limpieza OKEY_`

    const url = `https://wa.me/?text=${encodeURI(text)}`
    window.open(url, '_blank')
  }

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4">
      <div className="relative w-full max-w-3xl rounded-3xl bg-white border border-slate-200 shadow-2xl overflow-hidden animate-in fade-in zoom-in-95 duration-200">
        {/* Header */}
        <div className="bg-gradient-to-r from-slate-900 via-indigo-950 to-blue-900 text-white p-6 flex items-start justify-between gap-4">
          <div className="space-y-1">
            <div className="inline-flex items-center gap-1.5 px-3 py-0.5 rounded-full bg-cyan-400/20 text-cyan-300 text-[11px] font-bold uppercase tracking-wider border border-cyan-400/30">
              {spec.isHardwareOrPaper ? (
                <>
                  <Layers className="w-3.5 h-3.5" />
                  <span>Ficha Técnica Oficial & Especificación</span>
                </>
              ) : (
                <>
                  <Droplets className="w-3.5 h-3.5" />
                  <span>Ficha Técnica Oficial & Dosificación</span>
                </>
              )}
            </div>
            <h3 className="text-xl sm:text-2xl font-black tracking-tight text-white">
              {product.name}
            </h3>
            <p className="text-xs text-slate-300 font-mono">
              SKU: {product.sku} &bull; Categoría: {product.category} &bull; Presentación: {product.presentation}
            </p>
          </div>

          <button
            type="button"
            onClick={onClose}
            className="p-2 rounded-xl bg-white/10 hover:bg-white/20 text-white transition-colors"
            title="Cerrar ficha técnica"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Contenido */}
        <div className="p-6 sm:p-7 space-y-6 max-h-[75vh] overflow-y-auto">
          {/* Descripción / Naturaleza */}
          <div className="p-4 rounded-2xl bg-blue-50/60 border border-blue-200/80 space-y-2">
            <h4 className="text-xs font-bold text-blue-900 uppercase tracking-wider flex items-center gap-1.5">
              <Sparkles className="w-3.5 h-3.5 text-blue-600" />
              <span>Propósito y Beneficios Profesionales</span>
            </h4>
            <p className="text-xs text-slate-700 leading-relaxed">
              {spec.nature}
            </p>
            {spec.benefits && spec.benefits.length > 0 && (
              <ul className="space-y-1 pt-1 text-xs text-slate-600">
                {spec.benefits.map((b, i) => (
                  <li key={i} className="flex items-start gap-2">
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0 mt-0.5" />
                    <span>{b}</span>
                  </li>
                ))}
              </ul>
            )}
          </div>

          {/* Tabla de Dilución o Rendimiento Oficial */}
          <div className="space-y-2.5">
            <h4 className="text-xs font-extrabold text-slate-900 uppercase tracking-wider flex items-center gap-1.5">
              {spec.isHardwareOrPaper ? (
                <Layers className="w-4 h-4 text-cyan-600" />
              ) : (
                <Droplets className="w-4 h-4 text-cyan-600" />
              )}
              <span>{spec.tableTitle || 'Tabla de Dilución y Rendimiento Oficial'}</span>
            </h4>

            <div className="overflow-x-auto border border-slate-200 rounded-2xl">
              <table className="w-full text-left text-xs border-collapse">
                <thead>
                  <tr className="bg-slate-100 text-slate-700 font-bold border-b border-slate-200">
                    {(spec.tableHeaders || [
                      'Nivel de Limpieza',
                      'Ratio',
                      'Dosis en Agua',
                      'Rendimiento (Galón)',
                      'Costo en Uso'
                    ]).map((th, idx) => (
                      <th key={idx} className="p-3">{th}</th>
                    ))}
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 text-slate-600">
                  {(spec.dilutions || []).map((d, idx) => (
                    <tr key={idx} className="hover:bg-slate-50/70">
                      <td className="p-3 font-bold text-slate-900">{d.level}</td>
                      <td className="p-3 font-mono font-bold text-blue-700">{d.ratio}</td>
                      <td className="p-3">{d.mlPerLiter}</td>
                      <td className="p-3 font-bold text-emerald-700">{d.yieldGalon}</td>
                      <td className="p-3 font-bold text-slate-800">{d.costPerLiter}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Modo de Empleo Paso a Paso */}
          <div className="space-y-2.5">
            <h4 className="text-xs font-extrabold text-slate-900 uppercase tracking-wider flex items-center gap-1.5">
              <Layers className="w-4 h-4 text-indigo-600" />
              <span>Modo de Empleo Paso a Paso</span>
            </h4>
            <div className="space-y-2">
              {(spec.instructions || []).map((step, idx) => (
                <div key={idx} className="flex items-start gap-3 p-3 rounded-xl bg-slate-50 border border-slate-200/70 text-xs text-slate-700">
                  <span className="w-5 h-5 rounded-full bg-blue-600 text-white font-extrabold flex items-center justify-center shrink-0 text-[11px]">
                    {idx + 1}
                  </span>
                  <span className="leading-relaxed">{step}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Superficies Aptas & Áreas Recomendadas */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="p-4 rounded-2xl bg-emerald-50/50 border border-emerald-200 space-y-1.5">
              <h5 className="text-xs font-bold text-emerald-900 uppercase tracking-wider flex items-center gap-1.5">
                <ShieldCheck className="w-4 h-4 text-emerald-600" />
                <span>Superficies Compatibles</span>
              </h5>
              <div className="flex flex-wrap gap-1.5 pt-1">
                {(spec.safeSurfaces || []).map((s, idx) => (
                  <span key={idx} className="text-[11px] font-semibold bg-white border border-emerald-300 px-2 py-0.5 rounded-lg text-emerald-800">
                    {s}
                  </span>
                ))}
              </div>
            </div>

            <div className="p-4 rounded-2xl bg-amber-50/50 border border-amber-200 space-y-1.5">
              <h5 className="text-xs font-bold text-amber-900 uppercase tracking-wider flex items-center gap-1.5">
                <Sparkles className="w-4 h-4 text-amber-600" />
                <span>Área de Aplicación Ideal</span>
              </h5>
              <p className="text-xs text-amber-950 leading-relaxed pt-1">
                {spec.idealFor || 'Instalaciones residenciales, comerciales e industriales.'}
              </p>
            </div>
          </div>

          {/* Presentaciones y Precios Oficiales */}
          {spec.presentations && spec.presentations.length > 0 && (
            <div className="space-y-2">
              <h4 className="text-xs font-extrabold text-slate-900 uppercase tracking-wider">
                Presentaciones Disponibles Oficiales (Catálogo KEY®)
              </h4>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                {spec.presentations.map((pres, idx) => (
                  <div key={idx} className="p-2.5 rounded-xl border border-slate-200 bg-slate-50 flex items-center justify-between text-xs">
                    <div>
                      <strong className="text-slate-900 block">{pres.size}</strong>
                      <span className="text-[10px] text-slate-400 font-mono">SKU: {pres.sku}</span>
                    </div>
                    <span className="font-extrabold text-slate-900">{formatCurrency(pres.price)}</span>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Footer Actions */}
        <div className="p-4 sm:p-5 bg-slate-50 border-t border-slate-200 flex flex-wrap items-center justify-between gap-3">
          <button
            type="button"
            onClick={onClose}
            className="px-4 py-2 rounded-xl text-slate-600 font-bold text-xs hover:bg-slate-200 transition-colors"
          >
            Cerrar
          </button>

          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={handleShareWhatsApp}
              className="px-4 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs flex items-center gap-1.5 shadow-xs transition-colors"
            >
              <Share2 className="w-3.5 h-3.5" />
              <span>Enviar Ficha por WhatsApp</span>
            </button>

            {onOpenCalculator && !spec.isHardwareOrPaper && (
              <button
                type="button"
                onClick={() => {
                  onClose()
                  onOpenCalculator(product)
                }}
                className="px-4 py-2 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs flex items-center gap-1.5 shadow-xs transition-colors cursor-pointer"
              >
                <Calculator className="w-3.5 h-3.5" />
                <span>Calcular Costo en Uso</span>
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
