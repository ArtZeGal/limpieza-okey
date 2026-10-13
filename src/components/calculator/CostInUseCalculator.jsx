import { useState, useMemo } from 'react'
import {
  Sparkles,
  Share2,
  X,
  Pencil,
  RotateCcw,
  Timer
} from 'lucide-react'
import { formatCurrency, formatPercentage } from '../../utils/formatters'

export const SIMPLE_PRESETS = [
  {
    id: 'paraiso',
    name: 'Pisos y Áreas Comunes',
    product: 'Key Paraíso (Galón 4 L)',
    icon: '🌸',
    keyCostPerLiter: 1.28,
    defaultMarketCostPerLiter: 20.00,
    yieldBucketsPerGalon: 32, // cubetas de 10L
    benefit: 'pH neutro que protege el mármol, granito y cantera sin desgastar el brillo ni dejar residuo resbaloso.',
    marketNote: 'Promedio multiusos comercial (Fabuloso / Pinol / Maestro Limpio)',
  },
  {
    id: 'brillante',
    name: 'Mármol de Alto Brillo',
    product: 'Key Brillante (Galón 4 L)',
    icon: '💎',
    keyCostPerLiter: 2.16,
    defaultMarketCostPerLiter: 26.00,
    yieldBucketsPerGalon: 24,
    benefit: 'Prolonga el cristalizado del mármol y evita costosos servicios correctivos de desbastado y pulido.',
    marketNote: 'Promedio limpiador especializado de pisos / mármol en autoservicio',
  },
  {
    id: 'limpiavidrios',
    name: 'Vidrios y Canceles',
    product: 'Key Limpiavidrios (Galón 4 L)',
    icon: '🪟',
    keyCostPerLiter: 16.68,
    defaultMarketCostPerLiter: 42.00,
    yieldBucketsPerGalon: 16, // litros listos
    benefit: 'Secado instantáneo sin marcas de jalador, grasa ni sombras en ventanales panorámicos y espejos.',
    marketNote: 'Promedio Windex / limpiador de vidrios comercial con pistola 650ml',
  },
  {
    id: 'desengrasante',
    name: 'Grasa y Asadores',
    product: 'Key Desengrasante Alisan (Galón 4 L)',
    icon: '🍳',
    keyCostPerLiter: 3.79,
    defaultMarketCostPerLiter: 38.00,
    yieldBucketsPerGalon: 12,
    benefit: 'Biodegradable sin solventes ni soda cáustica: no quema acero inoxidable ni emite vapores irritantes.',
    marketNote: 'Promedio desengrasante comercial de cocina / parrilla en pistola',
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
  
  // Precios de mercado personalizados por producto (permiten edición en tiempo real)
  const [customMarketPrices, setCustomMarketPrices] = useState({
    paraiso: 20.00,
    brillante: 26.00,
    limpiavidrios: 42.00,
    desengrasante: 38.00,
  })

  const [containerType, setContainerType] = useState('galon') // 'galon' | 'porron'

  const product = SIMPLE_PRESETS.find((p) => p.id === selectedProductId) || SIMPLE_PRESETS[0]
  const bucket = BUCKET_PRESETS.find((b) => b.id === selectedBucketPresetId) || BUCKET_PRESETS[1]

  // Duración estimada (Calculadora Inversa simple)
  const totalBucketsYield = containerType === 'galon' ? product.yieldBucketsPerGalon : product.yieldBucketsPerGalon * 5
  const bucketsPerDay = bucket.litersPerDay / 10
  const daysOfSupply = Math.round(totalBucketsYield / bucketsPerDay)
  const durationText = daysOfSupply < 30
    ? `${daysOfSupply} días (~${Math.max(1, Math.round(daysOfSupply / 7))} sem)`
    : `${Math.round(daysOfSupply / 30)} meses (~${daysOfSupply} días)`

  const currentMarketPrice = Number(customMarketPrices[product.id] ?? product.defaultMarketCostPerLiter)
  const isCustomPrice = currentMarketPrice !== product.defaultMarketCostPerLiter

  const handlePriceChange = (val) => {
    const num = val === '' ? '' : Math.max(0, parseFloat(val) || 0)
    setCustomMarketPrices((prev) => ({
      ...prev,
      [product.id]: num,
    }))
  }

  const handleResetPrice = () => {
    setCustomMarketPrices((prev) => ({
      ...prev,
      [product.id]: product.defaultMarketCostPerLiter,
    }))
  }

  // Cálculos matemáticos simples y contundentes
  const metrics = useMemo(() => {
    const marketPrice = typeof currentMarketPrice === 'number' && !isNaN(currentMarketPrice) ? currentMarketPrice : 0
    const monthlyLiters = bucket.litersPerDay * 30
    const monthlyKeyCost = monthlyLiters * product.keyCostPerLiter
    const monthlyMarketCost = monthlyLiters * marketPrice

    const monthlySavings = Math.max(0, monthlyMarketCost - monthlyKeyCost)
    const annualSavings = monthlySavings * 12
    const timesCheaper = product.keyCostPerLiter > 0 && marketPrice > 0
      ? (marketPrice / product.keyCostPerLiter).toFixed(1)
      : '0'
    const savingsPercent = monthlyMarketCost > 0
      ? Math.round((monthlySavings / monthlyMarketCost) * 100)
      : 0

    return {
      monthlyLiters,
      monthlyKeyCost,
      monthlyMarketCost,
      monthlySavings,
      annualSavings,
      timesCheaper,
      savingsPercent,
    }
  }, [product, bucket, currentMarketPrice])

  const handleShareWhatsApp = () => {
    const text = `📊 *ESTUDIO DE AHORRO REAL EN LIMPIEZA*
🏢 *OKEY Soluciones · Sistema Concentrado KEY®*

🔹 *Área / Producto:* ${product.name} (${product.product})
🔹 *Uso estimado:* ${bucket.label} (~${metrics.monthlyLiters} litros preparados al mes)
⏱️ *Duración del envase:* 1 ${containerType === 'galon' ? 'Galón (4L)' : 'Porrón (20L)'} te dura *${durationText}* de uso continuo (~${totalBucketsYield} cubetas).

💰 *COMPARATIVA DE COSTO EN USO:*
• ❌ *Limpiador convencional actual:* ${formatCurrency(currentMarketPrice)} MXN / litro
• ✅ *KEY® Concentrado:* *${formatCurrency(product.keyCostPerLiter)} MXN / litro*
⭐ *¡KEY cuesta ${metrics.timesCheaper}x menos (${metrics.savingsPercent}% de ahorro directo)!*

📈 *AHORRO DIRECTO PROYECTADO:*
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
            Compara en vivo lo que tu cliente paga hoy vs. el sistema concentrado KEY®.
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

          {/* Mini Calculadora Inversa: ¿Cuánto dura el envase? */}
          <div className="p-3 rounded-2xl bg-slate-50 border border-slate-200 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2 text-xs">
            <div className="flex items-center gap-2 text-slate-700 min-w-0">
              <Timer className="w-4 h-4 text-indigo-600 shrink-0" />
              <div>
                <span className="text-[11px] font-bold text-slate-800 block">
                  ¿Cuánto dura a este ritmo?
                </span>
                <span className="text-[10px] text-slate-500 block">
                  Rinde <strong>{totalBucketsYield} cubetas</strong> en total.
                </span>
              </div>
            </div>

            <div className="flex items-center gap-2 self-end sm:self-auto shrink-0">
              <div className="flex items-center bg-slate-200/80 p-0.5 rounded-xl text-[10px] font-bold">
                <button
                  type="button"
                  onClick={() => setContainerType('galon')}
                  className={`px-2 py-0.5 rounded-lg transition-all ${
                    containerType === 'galon'
                      ? 'bg-white shadow-xs text-slate-900 font-extrabold'
                      : 'text-slate-500 hover:text-slate-900'
                  }`}
                >
                  Galón 4L
                </button>
                <button
                  type="button"
                  onClick={() => setContainerType('porron')}
                  className={`px-2 py-0.5 rounded-lg transition-all ${
                    containerType === 'porron'
                      ? 'bg-white shadow-xs text-slate-900 font-extrabold'
                      : 'text-slate-500 hover:text-slate-900'
                  }`}
                >
                  Porrón 20L
                </button>
              </div>

              <span className="px-2 py-0.5 rounded-xl bg-emerald-100 text-emerald-800 font-extrabold text-[11px] border border-emerald-300/60 whitespace-nowrap">
                ⏳ {durationText}
              </span>
            </div>
          </div>
        </div>

        {/* Paso 3: Comparativa Cara a Cara */}
        <div className="grid grid-cols-2 gap-3 pt-1">
          {/* Lo que paga hoy (Supermercado / Distribuidor) - EDITABLE */}
          <div className="p-3.5 sm:p-4 rounded-2xl bg-rose-50/80 border border-rose-200 text-center space-y-1.5 relative">
            <div className="flex items-center justify-center gap-1">
              <span className="text-[10px] font-bold text-rose-700 uppercase tracking-wider">
                ❌ Paga hoy (Súper)
              </span>
              <Pencil className="w-2.5 h-2.5 text-rose-500" />
            </div>

            <div className="flex items-center justify-center gap-1">
              <span className="text-base sm:text-lg font-black text-rose-900">$</span>
              <input
                type="number"
                min="0"
                max="999"
                step="1"
                value={currentMarketPrice === '' ? '' : currentMarketPrice}
                onChange={(e) => handlePriceChange(e.target.value)}
                className="w-20 text-center text-xl sm:text-2xl font-black text-rose-900 bg-white border border-rose-300 rounded-xl py-0.5 px-1 shadow-inner focus:outline-none focus:ring-2 focus:ring-rose-500"
                title="Toca para ingresar lo que paga tu cliente hoy"
              />
              <span className="text-[11px] font-bold text-rose-700">/L</span>
            </div>

            <div className="flex items-center justify-center min-h-[16px]">
              {isCustomPrice ? (
                <button
                  type="button"
                  onClick={handleResetPrice}
                  className="text-[9px] text-rose-700 hover:text-rose-900 underline font-semibold flex items-center gap-0.5"
                  title="Restablecer al promedio de mercado sugerido"
                >
                  <RotateCcw className="w-2.5 h-2.5" />
                  <span>Sugerido (${product.defaultMarketCostPerLiter})</span>
                </button>
              ) : (
                <span className="text-[9px] text-rose-500 font-medium">
                  ✏️ Toca cifra para editar
                </span>
              )}
            </div>
          </div>

          {/* KEY Concentrado */}
          <div className="p-3.5 sm:p-4 rounded-2xl bg-emerald-50 border-2 border-emerald-500 text-center space-y-1.5 relative shadow-xs flex flex-col justify-between">
            <span className="absolute -top-2.5 left-1/2 -translate-x-1/2 px-2.5 py-0.5 rounded-full bg-emerald-600 text-white font-extrabold text-[9px] uppercase tracking-wider shadow-xs whitespace-nowrap">
              {Number(metrics.timesCheaper) > 1 ? `${metrics.timesCheaper}x más barato` : 'Más económico'}
            </span>
            <span className="text-[10px] font-bold text-emerald-800 uppercase tracking-wider block">
              ✅ KEY® Concentrado
            </span>
            <div className="text-xl sm:text-2xl font-black text-emerald-700">
              {formatCurrency(product.keyCostPerLiter)}
            </div>
            <span className="text-[10px] text-emerald-800 font-semibold block min-h-[16px]">
              por litro en cubeta
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
              {metrics.savingsPercent}% de ahorro directo
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
