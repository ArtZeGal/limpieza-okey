import { useState } from 'react'
import { Building2, Copy, Check, ShieldCheck } from 'lucide-react'
import { useApp } from '../../context/AppContext'

export default function BBVAInfoCard() {
  const { showToast } = useApp()
  const [copiedField, setCopiedField] = useState(null)

  const bankData = {
    bank: 'BBVA',
    holder: 'Limpieza OKEY',
    account: '048 673 9415',
    clabe: '012580004867394159',
    card: '4152 3143 1334 7307',
  }

  const handleCopy = (field, value, label) => {
    navigator.clipboard.writeText(value).then(() => {
      setCopiedField(field)
      showToast(`${label} copiado al portapapeles`)
      setTimeout(() => setCopiedField(null), 2000)
    })
  }

  return (
    <div className="rounded-2xl p-4 bg-gradient-to-r from-blue-900 to-indigo-950 text-white shadow-md border border-blue-800/60 space-y-3">
      <div className="flex items-center justify-between pb-2 border-b border-blue-800/80">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-lg bg-blue-500/20 border border-blue-400/30 flex items-center justify-center text-cyan-300">
            <Building2 className="w-4 h-4" />
          </div>
          <div>
            <h4 className="font-extrabold text-sm tracking-tight">Datos Bancarios BBVA</h4>
            <span className="text-[10px] text-cyan-200">
              Impresos oficialmente al pie de la plantilla
            </span>
          </div>
        </div>
        <div className="flex items-center gap-1 text-[11px] font-bold text-emerald-400 bg-emerald-950/60 px-2 py-0.5 rounded-full border border-emerald-800/50">
          <ShieldCheck className="w-3.5 h-3.5" />
          <span>Verificado</span>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5 text-xs">
        {/* Cuenta */}
        <div className="bg-white/5 rounded-xl p-2.5 border border-white/10 flex items-center justify-between">
          <div>
            <span className="text-[10px] text-slate-300 block uppercase font-semibold">Cuenta BBVA</span>
            <span className="font-mono font-bold text-white tracking-wide">{bankData.account}</span>
          </div>
          <button
            type="button"
            onClick={() => handleCopy('account', bankData.account.replace(/\s/g, ''), 'Cuenta')}
            className="p-1.5 rounded-lg bg-white/10 hover:bg-white/20 text-slate-200 transition-colors"
            title="Copiar Cuenta"
          >
            {copiedField === 'account' ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
          </button>
        </div>

        {/* CLABE */}
        <div className="bg-white/5 rounded-xl p-2.5 border border-white/10 flex items-center justify-between">
          <div>
            <span className="text-[10px] text-slate-300 block uppercase font-semibold">CLABE Interbancaria</span>
            <span className="font-mono font-bold text-white tracking-wide">{bankData.clabe}</span>
          </div>
          <button
            type="button"
            onClick={() => handleCopy('clabe', bankData.clabe, 'CLABE')}
            className="p-1.5 rounded-lg bg-white/10 hover:bg-white/20 text-slate-200 transition-colors"
            title="Copiar CLABE"
          >
            {copiedField === 'clabe' ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
          </button>
        </div>

        {/* Tarjeta */}
        <div className="bg-white/5 rounded-xl p-2.5 border border-white/10 flex items-center justify-between">
          <div>
            <span className="text-[10px] text-slate-300 block uppercase font-semibold">Tarjeta de Débito</span>
            <span className="font-mono font-bold text-white tracking-wide">{bankData.card}</span>
          </div>
          <button
            type="button"
            onClick={() => handleCopy('card', bankData.card.replace(/\s/g, ''), 'Tarjeta')}
            className="p-1.5 rounded-lg bg-white/10 hover:bg-white/20 text-slate-200 transition-colors"
            title="Copiar Tarjeta"
          >
            {copiedField === 'card' ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
          </button>
        </div>
      </div>
    </div>
  )
}
