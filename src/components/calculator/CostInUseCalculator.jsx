import { useState, useMemo } from 'react'
import {
  Sparkles,
  TrendingDown,
  Share2,
  CheckCircle2,
  X,
  ShieldCheck,
  Check
} from 'lucide-react'
import { formatCurrency, formatPercentage } from '../../utils/formatters'

export const SIMPLE_PRESETS = [
  {
    id: 'paraiso',
    name: 'Pisos y Áreas Comunes',
    product: 'Key Paraíso (Galón 4 L)',
    icon: '🌸',
    keyCostPerLiter: 1.28,
    marketCostPerLiter: 18.00,
    yieldBucketsPerGalon: 32, // cubetas de 10L
    benefit: 'pH neutro que protege el mármol, granito y cantera sin desgastar el brillo.',
  },
  {
    id: 'brillante',
    name: 'Mármol de Alto Brillo',
    product: 'Key Brillante (Galón 4 L)',
    icon: '💎',
    keyCostPerLiter: 2.16,
    marketCostPerLiter: 24.00,
    yieldBucketsPerGalon: 24,
    benefit: 'Prolonga el cristalizado del mármol y evita costosos servicios de pulido.',
  },
  {
    id: 'limpiavidrios',
    name: 'Vidrios y Canceles',
    product: 'Key Limpiavidrios (Galón 4 L)',
    icon: '🪟',
    keyCostPerLiter: 16.68,
    marketCostPerLiter: 45.00,
    yieldBucketsPerGalon: 16, // litros listos
    benefit: 'Secado instantáneo sin marcas de jalador ni sombras en ventanales.',
  },
  {
    id: 'desengrasante',
    name: 'Grasa y Asadores',
    product: 'Key Desengrasante Alisan (Galón 4 L)',
    icon: '🍳',
    keyCostPerLiter: 3.79,
    marketCostPerLiter: 35.00,
    yieldBucketsPerGalon: 12,
    benefit: 'Biodegradable sin solventes: no quema acero inoxidable ni genera vapores.',
  },
]

export const BUCKET_PRESETS = [
  {
    id: 'small',
    label: '2 cubetas / día',
    sublabel: 'Casa / Oficina',
    litersPerDay: 20,
  },
  {
    id: 'medium',
    label: '4 cubetas / día',
    sublabel: 'Edificio mediano',
    litersPerDay: 40,
    recommended: true,
  },
  {
    id: 'large',
    label: '8 cubetas / día',
    sublabel: 'Torre completa',
    litersPerDay: 80,
  },
]

export default function CostInUseCalculator({ onClose }) {
  const [selectedProductId, setSelectedProductId] = useState('paraiso')
  const [selectedBucketPresetId, setSelectedBucketPresetId] = useState('medium')

  const product = SIMPLE_PRESETS.find((p) => p.id === selectedProductId) || SIMPLE_PRESETS[0]
  const bucket = BUCKET_PRESETS.find((b) => b.id === selectedBucketPresetId) || BUCKET_PRESETS[1]

  // Cálculos matemáticos simples y contundentes
  const metrics = useMemo(() => {
    const monthlyLiters = bucket.litersPerDay * 30
    const monthlyKeyCost = monthlyLiters * product.keyCostPerLiter
    const monthlyMarketCost = monthlyLiters * product.marketCostPerLiter

    const monthlySavings = Math.max(0, monthlyMarketCost - monthlyKeyCost)
    const annualSavings = monthlySavings * 12
    const timesCheaper = Math.round(product.marketCostPerLiter / product.keyCostPerLiter)

    return {
      monthlyLiters,
      monthlyKeyCost,
      monthlyMarketCost,
      monthlySavings,
      annualSavings,
      timesCheaper,
    }
  }, [product, bucket])

  const handleShareWhatsApp = () => {
    const text = `📊 *ESTUDIO DE AHORRO REAL EN LIMPIEZA*
🏢 *OKEY Soluciones · Sistema Concentrado KEY®*

🔹 *Área / Producto:* ${product.name} (${product.product})
🔹 *Uso estimado:* ${bucket.label} (~${metrics.monthlyLiters} litros preparados al mes)

💰 *COMPARATIVA DE COSTO EN USO:*
• ❌ *Limpiador convencional:* ${formatCurrency(product.marketCostPerLiter)} MXN / litro
• ✅ *KEY® Concentrado:* *${formatCurrency(product.keyCostPerLiter)} MXN / litro*
⭐ *¡Cuesta ${metrics.timesCheaper} veces menos!*

📈 *AHORRO DIRECTO:*
• Ahorro estimado al mes: *${formatCurrency(metrics.monthlySavings)} MXN*
💎 *AHORRO PROYECTADO AL AÑO:* *${formatCurrency(metrics.annualSavings)} MXN*

🛡️ *PROTECCIÓN PATRIMONIAL:*
${product.benefit}

_Presentado por Limpieza OKEY · limpieza-okey.vercel.app_`

    const url = `https://wa.me/?text=${encodeURI(text)}`
    window.open(url, '_blank')
  }

  return (
    <div className="bg-white rounded-3xl border border-slate-200 overflow-hidden shadow-2xl max-w-xl mx-auto">
      {/* Header Limpio */}
      <div className="bg-gradient-to-r from-blue-900 via-indigo-900 to-slate-900 text-white p-5 sm:p-6 flex items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-1.5 text-cyan-300 text-[11px] font-bold uppercase tracking-wider">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Calculadora Rápida</span>
          </div>
          <h3 className="text-lg sm:text-xl font-black text-white tracking-tight mt-0.5">
            Costo en Uso y Ahorro Real
          </h3>
          <p className="text-xs text-slate-300">
            Compara en 3 toques el costo por litro listo para usar.
          </p>
        </div>

        {onClose && (
          <button
            type="button"
            onClick={onClose}
            className="p-2 rounded-xl bg-white/10 hover:bg-white/20 text-white transition-colors"
            title="Cerrar"
          >
            <X className="w-5 h-5" />
          </button>
        )}
      </div>

      <div className="p-5 sm:p-6 space-y-5">
        {/* Paso 1: ¿Qué producto comparas? */}
        <div className="space-y-2">
          <label className="text-[11px] font-bold text-slate-500 uppercase tracking-wider block">
            1. ¿Qué área o producto deseas comparar?
          </label>
          <div className="grid grid-cols-2 gap-2">
            {SIMPLE_PRESETS.map((p) => {
              const isSelected = p.id === selectedProductId
              return (
                <button
                  key={p.id}
                  type="button"
                  onClick={() => setSelectedProductId(p.id)}
                  className={`p-3 rounded-2xl border text-left transition-all flex items-center gap-2.5 ${
                    isSelected
                      ? 'bg-blue-50 border-blue-600 ring-2 ring-blue-600/20 text-blue-950 font-bold shadow-xs'
                      : 'bg-white border-slate-200 hover:border-slate-300 hover:bg-slate-50 text-slate-700'
                  }`}
                >
                  <span className="text-xl shrink-0">{p.icon}</span>
                  <div className="min-w-0">
                    <span className="text-xs font-extrabold block truncate leading-tight">
                      {p.name}
                    </span>
                    <span className="text-[10px] text-slate-500 block truncate">
                      {p.product}
                    </span>
                  </div>
                </button>
              )
            })}
          </div>
        </div>

        {/* Paso 2: ¿Cuánto trapean al día? */}
        <div className="space-y-2">
          <label className="text-[11px] font-bold text-slate-500 uppercase tracking-wider block">
            2. ¿Cuánto trapean o limpian al día?
          </label>
          <div className="grid grid-cols-3 gap-2">
            {BUCKET_PRESETS.map((b) => {
              const isSelected = b.id === selectedBucketPresetId
              return (
                <button
                  key={b.id}
                  type="button"
                  onClick={() => setSelectedBucketPresetId(b.id)}
                  className={`p-2.5 rounded-2xl border text-center transition-all ${
                    isSelected
                      ? 'bg-slate-900 border-slate-900 text-white font-bold shadow-xs'
                      : 'bg-slate-50 border-slate-200 hover:border-slate-300 text-slate-700'
                  }`}
                >
                  <span className="text-xs font-extrabold block leading-tight">
                    {b.label}
                  </span>
                  <span
                    className={`text-[10px] block mt-0.5 ${
                      isSelected ? 'text-cyan-300 font-medium' : 'text-slate-400'
                    }`}
                  >
                    {b.sublabel}
                  </span>
                </button>
              )
            })}
          </div>
        </div>

        {/* Paso 3: Comparativa Cara a Cara */}
        <div className="grid grid-cols-2 gap-3 pt-1">
          {/* Súper / Tradicional */}
          <div className="p-4 rounded-2xl bg-rose-50/70 border border-rose-200 text-center space-y-1">
            <span className="text-[10px] font-bold text-rose-700 uppercase tracking-wider block">
              ❌ Supermercado / Común
            </span>
            <div className="text-xl sm:text-2xl font-black text-rose-900">
              {formatCurrency(product.marketCostPerLiter)}
            </div>
            <span className="text-[10px] text-rose-600 block">
              por litro preparado
            </span>
          </div>

          {/* KEY Concentrado */}
          <div className="p-4 rounded-2xl bg-emerald-50 border-2 border-emerald-500 text-center space-y-1 relative shadow-xs">
            <span className="absolute -top-2.5 left-1/2 -translate-x-1/2 px-2 py-0.5 rounded-full bg-emerald-600 text-white font-extrabold text-[9px] uppercase tracking-wider shadow-xs">
              {metrics.timesCheaper}x más barato
            </span>
            <span className="text-[10px] font-bold text-emerald-800 uppercase tracking-wider block">
              ✅ KEY® Concentrado
            </span>
            <div className="text-xl sm:text-2xl font-black text-emerald-700">
              {formatCurrency(product.keyCostPerLiter)}
            </div>
            <span className="text-[10px] text-emerald-800 font-semibold block">
              por litro listo en cubeta
            </span>
          </div>
        </div>

        {/* Tarjeta de Ahorro Destacado */}
        <div className="p-4 rounded-2xl bg-gradient-to-br from-slate-900 to-indigo-950 text-white space-y-2 shadow-md">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-cyan-300 uppercase tracking-wider">
              Ahorro Estimado para el Cliente:
            </span>
            <span className="text-[11px] px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-300 font-bold border border-emerald-500/40">
              90%+ de ahorro
            </span>
          </div>

          <div className="flex items-baseline justify-between pt-1">
            <div>
              <span className="text-[11px] text-slate-300 block">Al mes:</span>
              <span className="text-2xl font-black text-white">
                {formatCurrency(metrics.monthlySavings)}
              </span>
            </div>
            <div className="text-right">
              <span className="text-[11px] text-slate-300 block">Proyección al año:</span>
              <span className="text-2xl font-black text-emerald-400">
                {formatCurrency(metrics.annualSavings)}
              </span>
            </div>
          </div>

          <p className="text-[11px] text-slate-300 pt-1 border-t border-white/10 leading-relaxed">
            📦 Un solo galón te rinde para <strong>{product.yieldBucketsPerGalon} cubetas completas</strong>. {product.benefit}
          </p>
        </div>

        {/* Botón de Compartir */}
        <button
          type="button"
          onClick={handleShareWhatsApp}
          className="w-full py-3 px-4 rounded-2xl bg-emerald-600 hover:bg-emerald-700 active:scale-98 text-white font-extrabold text-xs sm:text-sm shadow-md shadow-emerald-600/20 transition-all flex items-center justify-center gap-2"
        >
          <Share2 className="w-4 h-4" />
          <span>Enviar Estudio de Ahorro por WhatsApp</span>
        </button>
      </div>
    </div>
  )
}
