import { useState, useMemo } from 'react'
import {
  Calculator,
  Sparkles,
  TrendingDown,
  DollarSign,
  ShieldCheck,
  Droplets,
  Share2,
  CheckCircle2,
  ArrowRight,
  Info,
  Layers,
  HelpCircle,
  X,
  ShoppingCart
} from 'lucide-react'
import { formatCurrency, formatPercentage } from '../../utils/formatters'
import { useApp } from '../../context/AppContext'

export const CALCULATOR_PRESETS = [
  {
    id: 'paraiso-galon',
    name: 'Key Paraíso (Galón 4 L)',
    category: 'Pisos / Aseo General',
    productSizeLitros: 4,
    containerPrice: 411.00,
    costPrice: 228.00,
    defaultRatio: 60, // 1:60
    description: 'Limpiapisos concentrado neutro para mármol, porcelanato y granito.',
    supermarketPricePerLiter: 18.00,
    surfaceBenefit: 'Cero desgaste de mármol ni película opaca.',
  },
  {
    id: 'paraiso-porron',
    name: 'Key Paraíso (Porrón 20 L)',
    category: 'Pisos Institucional',
    productSizeLitros: 20,
    containerPrice: 1756.00,
    costPrice: 975.00,
    defaultRatio: 60, // 1:60
    description: 'Máximo rendimiento institucional para áreas comunes de torres.',
    supermarketPricePerLiter: 18.00,
    surfaceBenefit: 'Ahorro masivo en suministro de edificios residenciales.',
  },
  {
    id: 'brillante-galon',
    name: 'Key Brillante (Galón 4 L)',
    category: 'Mármol Alto Brillo',
    productSizeLitros: 4,
    containerPrice: 519.00,
    costPrice: 288.00,
    defaultRatio: 60,
    description: 'Especial para conservar y prolongar el cristalizado de mármol.',
    supermarketPricePerLiter: 22.00,
    surfaceBenefit: 'Alarga el tiempo entre costosos pulidos de mármol.',
  },
  {
    id: 'desengrasante-galon',
    name: 'Key Desengrasante Cocina Plus (Galón 4 L)',
    category: 'Cocina & Asadores',
    productSizeLitros: 4,
    containerPrice: 455.00,
    costPrice: 252.00,
    defaultRatio: 30, // 1:30
    description: 'Biodegradable sin solventes para asadores, palapas y campanas.',
    supermarketPricePerLiter: 25.00,
    surfaceBenefit: 'No quema acero inoxidable ni despide vapores tóxicos.',
  },
  {
    id: 'limpiavidrios-galon',
    name: 'Key Limpiavidrios (Galón 4 L)',
    category: 'Cristales & Canceles',
    productSizeLitros: 4,
    containerPrice: 267.00,
    costPrice: 148.00,
    defaultRatio: 3, // 1:3
    description: 'Fórmula evaporable antiestática para ventanales de doble altura.',
    supermarketPricePerLiter: 20.00,
    surfaceBenefit: 'Secado instantáneo sin marcas de jalador ni sombras.',
  },
  {
    id: 'cloro-porron',
    name: 'Vanguard Cloro (Porrón 20 L)',
    category: 'Desinfección & Basuras',
    productSizeLitros: 20,
    containerPrice: 397.00,
    costPrice: 220.00,
    defaultRatio: 100, // 1:100
    description: 'Choque sanitario para cuartos de basura y vertederos.',
    supermarketPricePerLiter: 14.00,
    surfaceBenefit: 'Desinfección hospitalaria con costo casi nulo por litro.',
  },
]

export default function CostInUseCalculator({ onClose, initialPresetId = 'paraiso-galon' }) {
  const { addToCart, showToast } = useApp()

  const [selectedPresetId, setSelectedPresetId] = useState(initialPresetId)
  const preset = CALCULATOR_PRESETS.find((p) => p.id === selectedPresetId) || CALCULATOR_PRESETS[0]

  // Parámetros interactivos
  const [ratio, setRatio] = useState(preset.defaultRatio)
  const [bucketsPerDay, setBucketsPerDay] = useState(4) // ej. 4 cubetas
  const [litersPerBucket, setLitersPerBucket] = useState(10) // 10 litros cada cubeta
  const [daysPerMonth, setDaysPerMonth] = useState(30)
  const [marketPrice, setMarketPrice] = useState(preset.supermarketPricePerLiter)

  // Al cambiar preset, restablecer ratio
  const handlePresetChange = (presetId) => {
    setSelectedPresetId(presetId)
    const p = CALCULATOR_PRESETS.find((item) => item.id === presetId)
    if (p) {
      setRatio(p.defaultRatio)
      setMarketPrice(p.supermarketPricePerLiter)
    }
  }

  // Cálculos matemáticos de rendimiento y costo en uso
  const calculation = useMemo(() => {
    // 1 litro de concentrado rinde (1 + ratio) litros de solución
    const totalSolutionLiters = preset.productSizeLitros * (ratio + 1)
    const keyCostPerLiter = preset.containerPrice / totalSolutionLiters

    const dailySolutionLiters = bucketsPerDay * litersPerBucket
    const monthlySolutionLiters = dailySolutionLiters * daysPerMonth

    const monthlyCostKey = monthlySolutionLiters * keyCostPerLiter
    const monthlyCostMarket = monthlySolutionLiters * marketPrice

    const monthlySavings = Math.max(0, monthlyCostMarket - monthlyCostKey)
    const annualSavings = monthlySavings * 12
    const savingsPercent = monthlyCostMarket > 0 ? (monthlySavings / monthlyCostMarket) * 100 : 0

    // Cuántos galones/porrones se necesitan al mes
    const containersPerMonth = Math.ceil(monthlySolutionLiters / totalSolutionLiters)

    return {
      totalSolutionLiters,
      keyCostPerLiter,
      dailySolutionLiters,
      monthlySolutionLiters,
      monthlyCostKey,
      monthlyCostMarket,
      monthlySavings,
      annualSavings,
      savingsPercent,
      containersPerMonth
    }
  }, [preset, ratio, bucketsPerDay, litersPerBucket, daysPerMonth, marketPrice])

  const handleShareWhatsApp = () => {
    const text = `📊 *ESTUDIO DE COSTO EN USO Y AHORRO ESTIMADO*
🏢 *OKEY Soluciones de Limpieza · Sistema Profesional KEY®*

🔹 *Producto evaluado:* ${preset.name}
🔹 *Dilución sugerida:* 1:${ratio} (${Math.round((1000 / (ratio + 1)))} ml por litro de agua)
🔹 *Rendimiento total por envase:* ${calculation.totalSolutionLiters.toLocaleString()} litros listos para usar

💰 *COMPARATIVA DE COSTO REAL EN USO:*
• *Costo por litro preparado con KEY:* ${formatCurrency(calculation.keyCostPerLiter)} MXN / L
• *Costo tradicional de supermercado:* ${formatCurrency(marketPrice)} MXN / L
• *Ahorro por litro:* ${formatPercentage(calculation.savingsPercent)}

📈 *PROYECCIÓN DE AHORRO:*
• Consumo mensual estimado: ${calculation.monthlySolutionLiters.toLocaleString()} litros
• Gasto tradicional mensual: ${formatCurrency(calculation.monthlyCostMarket)} MXN
• Gasto con KEY Concentrado: ${formatCurrency(calculation.monthlyCostKey)} MXN
⭐ *AHORRO MENSUAL:* *${formatCurrency(calculation.monthlySavings)} MXN*
💎 *AHORRO ANUAL ESTIMADO:* *${formatCurrency(calculation.annualSavings)} MXN*

🛡️ *PROTECCIÓN PATRIMONIAL:*
${preset.surfaceBenefit} (Fórmulas sin ácidos que evitan gastos correctivos en pulido de mármol y cancelería).

_Presentado por Limpieza OKEY_`

    const url = `https://wa.me/?text=${encodeURI(text)}`
    window.open(url, '_blank')
  }

  return (
    <div className="bg-white rounded-3xl border border-slate-200 overflow-hidden shadow-xl max-w-4xl mx-auto">
      {/* Header */}
      <div className="bg-gradient-to-r from-blue-900 via-indigo-900 to-slate-900 text-white p-6 sm:p-7 flex items-start justify-between gap-4">
        <div className="space-y-1.5">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-cyan-400/20 text-cyan-300 text-xs font-bold uppercase tracking-wider border border-cyan-400/30">
            <Calculator className="w-3.5 h-3.5" />
            <span>Herramienta Comercial de Cierre</span>
          </div>
          <h2 className="text-xl sm:text-2xl font-black tracking-tight text-white">
            Calculadora de Costo en Uso y Ahorro
          </h2>
          <p className="text-xs sm:text-sm text-slate-300">
            Demuestra al Administrador o Comité cuánto dinero ahorran mes con mes utilizando fórmulas concentradas KEY®.
          </p>
        </div>

        {onClose && (
          <button
            type="button"
            onClick={onClose}
            className="p-2 rounded-xl bg-white/10 hover:bg-white/20 text-white transition-colors"
            title="Cerrar calculadora"
          >
            <X className="w-5 h-5" />
          </button>
        )}
      </div>

      <div className="p-6 sm:p-8 space-y-8">
        {/* Selector de Producto */}
        <div className="space-y-2">
          <label className="text-xs font-bold text-slate-700 uppercase tracking-wider block">
            1. Selecciona el Producto Concentrado a Evaluar:
          </label>
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-2.5">
            {CALCULATOR_PRESETS.map((p) => {
              const isSelected = p.id === selectedPresetId
              return (
                <button
                  key={p.id}
                  type="button"
                  onClick={() => handlePresetChange(p.id)}
                  className={`p-3 rounded-2xl border text-left transition-all flex flex-col justify-between gap-2 ${
                    isSelected
                      ? 'bg-blue-50/70 border-blue-500 ring-2 ring-blue-500/20 text-blue-950 font-bold shadow-xs'
                      : 'bg-white border-slate-200 hover:border-slate-300 text-slate-700'
                  }`}
                >
                  <span className="text-xs font-extrabold leading-snug">{p.name}</span>
                  <div className="flex items-center justify-between text-[11px] text-slate-500 pt-1 border-t border-slate-100">
                    <span>{p.category}</span>
                    <strong className="text-slate-900 font-bold">{formatCurrency(p.containerPrice)}</strong>
                  </div>
                </button>
              )
            })}
          </div>
        </div>

        {/* Parámetros de Operación */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 p-5 rounded-2xl bg-slate-50 border border-slate-200">
          {/* Ratio de Dilución */}
          <div className="space-y-1.5">
            <div className="flex items-center justify-between">
              <label className="text-xs font-bold text-slate-700">
                Dilución (1 parte por X agua):
              </label>
              <span className="text-xs font-black text-blue-700 font-mono">
                1:{ratio}
              </span>
            </div>
            <input
              type="range"
              min="1"
              max="120"
              value={ratio}
              onChange={(e) => setRatio(Number(e.target.value))}
              className="w-full accent-blue-600"
            />
            <p className="text-[11px] text-slate-500">
              Usa ~<strong>{Math.round(1000 / (ratio + 1))} ml</strong> de químico por cada litro de agua.
            </p>
          </div>

          {/* Cubetas al día */}
          <div className="space-y-1.5">
            <label className="text-xs font-bold text-slate-700 block">
              Cubetas trapeadas al día:
            </label>
            <div className="flex items-center gap-2">
              <input
                type="number"
                min="1"
                max="50"
                value={bucketsPerDay}
                onChange={(e) => setBucketsPerDay(Math.max(1, Number(e.target.value)))}
                className="w-20 px-3 py-1.5 rounded-xl border border-slate-300 font-bold text-sm text-center"
              />
              <span className="text-xs text-slate-500">
                de <strong>{litersPerBucket}L</strong> ({bucketsPerDay * litersPerBucket}L diarios)
              </span>
            </div>
          </div>

          {/* Precio producto comercial de súper */}
          <div className="space-y-1.5">
            <label className="text-xs font-bold text-slate-700 block">
              Precio limpiador de súper ($/L):
            </label>
            <div className="flex items-center gap-2">
              <span className="text-xs text-slate-400 font-bold">$</span>
              <input
                type="number"
                min="5"
                max="100"
                value={marketPrice}
                onChange={(e) => setMarketPrice(Math.max(1, Number(e.target.value)))}
                className="w-24 px-3 py-1.5 rounded-xl border border-slate-300 font-bold text-sm text-center"
              />
              <span className="text-xs text-slate-500">MXN / litro</span>
            </div>
          </div>
        </div>

        {/* RESULTADO PRINCIPAL: Métricas de Costo en Uso */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {/* Métrica 1: Costo por litro KEY */}
          <div className="p-5 rounded-2xl bg-gradient-to-br from-blue-500 to-indigo-600 text-white shadow-md space-y-1">
            <span className="text-[11px] font-bold text-blue-100 uppercase tracking-wider block">
              Costo Litro con KEY
            </span>
            <div className="text-2xl sm:text-3xl font-black tracking-tight">
              {formatCurrency(calculation.keyCostPerLiter)}
            </div>
            <p className="text-[11px] text-blue-100 pt-1">
              vs {formatCurrency(marketPrice)} de un limpiador tradicional
            </p>
          </div>

          {/* Métrica 2: Rendimiento total */}
          <div className="p-5 rounded-2xl bg-slate-900 text-white shadow-md space-y-1">
            <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider block">
              Rendimiento por Envase
            </span>
            <div className="text-2xl sm:text-3xl font-black tracking-tight text-cyan-300">
              {calculation.totalSolutionLiters.toLocaleString()} L
            </div>
            <p className="text-[11px] text-slate-400 pt-1">
              de solución lista para trapear o limpiar
            </p>
          </div>

          {/* Métrica 3: Ahorro mensual */}
          <div className="p-5 rounded-2xl bg-emerald-50 border border-emerald-200 text-emerald-950 shadow-xs space-y-1">
            <span className="text-[11px] font-bold text-emerald-700 uppercase tracking-wider block">
              Ahorro Mensual Estimado
            </span>
            <div className="text-2xl sm:text-3xl font-black tracking-tight text-emerald-700">
              {formatCurrency(calculation.monthlySavings)}
            </div>
            <p className="text-[11px] text-emerald-800 font-bold pt-1">
              ¡Ahorro del {formatPercentage(calculation.savingsPercent)}!
            </p>
          </div>

          {/* Métrica 4: Ahorro anual */}
          <div className="p-5 rounded-2xl bg-amber-50 border border-amber-200 text-amber-950 shadow-xs space-y-1">
            <span className="text-[11px] font-bold text-amber-700 uppercase tracking-wider block">
              Ahorro Anual Proyectado
            </span>
            <div className="text-2xl sm:text-3xl font-black tracking-tight text-amber-700">
              {formatCurrency(calculation.annualSavings)}
            </div>
            <p className="text-[11px] text-amber-800 font-semibold pt-1">
              Dinero directo de vuelta al presupuesto
            </p>
          </div>
        </div>

        {/* Caja de Argumento Patrimonial */}
        <div className="p-4 rounded-2xl bg-indigo-50/70 border border-indigo-200 flex items-start gap-3 text-indigo-950 text-xs">
          <ShieldCheck className="w-5 h-5 text-indigo-600 shrink-0 mt-0.5" />
          <div className="space-y-1 leading-relaxed">
            <strong className="text-sm font-bold block text-indigo-900">
              Beneficio de Protección Patrimonial:
            </strong>
            <p>
              {preset.surfaceBenefit} Usar limpiadores tradicionales con pH ácido o sales abrasivas desgasta la película de brillo del mármol y mancha la cancelería de aluminio. El costo de volver a desbastar y pulir mármol importado supera los <strong>$50,000 MXN</strong> por área. Con fórmulas KEY el costo correctivo es <strong>$0</strong>.
            </p>
          </div>
        </div>

        {/* Acciones */}
        <div className="flex flex-wrap items-center justify-between gap-3 pt-2 border-t border-slate-100">
          <div className="text-xs text-slate-500">
            Suministro sugerido: <strong>{calculation.containersPerMonth} envase(s) al mes</strong> ({preset.name})
          </div>

          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={handleShareWhatsApp}
              className="px-4 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs shadow-xs transition-colors flex items-center gap-2"
            >
              <Share2 className="w-4 h-4" />
              <span>Enviar Análisis por WhatsApp</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
