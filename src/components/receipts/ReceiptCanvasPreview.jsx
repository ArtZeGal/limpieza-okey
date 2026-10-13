import { useEffect, useRef, useState } from 'react'
import { Download, Printer, Copy, Check, Eye, Sparkles } from 'lucide-react'
import { renderReceiptOnCanvas } from '../../utils/receiptCanvas'
import { useApp } from '../../context/AppContext'

export default function ReceiptCanvasPreview({ receiptData }) {
  const canvasRef = useRef(null)
  const [dataUrl, setDataUrl] = useState('')
  const [isRendering, setIsRendering] = useState(true)
  const [copiedImage, setCopiedImage] = useState(false)
  const { showToast } = useApp()

  useEffect(() => {
    let isCancelled = false
    setIsRendering(true)

    if (canvasRef.current && receiptData) {
      renderReceiptOnCanvas(canvasRef.current, receiptData)
        .then((url) => {
          if (!isCancelled) {
            setDataUrl(url)
            setIsRendering(false)
          }
        })
        .catch((err) => {
          console.error('Error al generar canvas de recibo', err)
          if (!isCancelled) setIsRendering(false)
        })
    }

    return () => {
      isCancelled = true
    }
  }, [receiptData])

  // Descargar imagen JPG
  const handleDownloadImage = () => {
    if (!dataUrl) return
    const link = document.createElement('a')
    link.download = `Recibo-${receiptData.folio || 'OK-001'}.jpg`
    link.href = dataUrl
    link.click()
    showToast(`Imagen ${receiptData.folio}.jpg descargada`)
  }

  // Imprimir
  const handlePrint = () => {
    if (!dataUrl) return
    const printWindow = window.open('', '_blank')
    if (printWindow) {
      printWindow.document.write(`
        <html>
          <head>
            <title>Recibo ${receiptData.folio || 'OK-001'} - Limpieza OKEY</title>
            <style>
              body { margin: 0; display: flex; align-items: center; justify-content: center; min-height: 100vh; background: #fff; }
              img { max-width: 95vw; max-height: 95vh; object-fit: contain; }
              @media print {
                body { margin: 0; }
                img { width: 100%; height: auto; page-break-inside: avoid; }
              }
            </style>
          </head>
          <body>
            <img src="${dataUrl}" onload="window.print(); window.close();" />
          </body>
        </html>
      `)
      printWindow.document.close()
    }
  }

  // Copiar imagen al portapapeles
  const handleCopyImage = async () => {
    if (!canvasRef.current) return
    try {
      canvasRef.current.toBlob(async (blob) => {
        if (!blob) return
        await navigator.clipboard.write([
          new ClipboardItem({ 'image/png': blob })
        ])
        setCopiedImage(true)
        showToast('Imagen del recibo copiada al portapapeles')
        setTimeout(() => setCopiedImage(false), 2500)
      }, 'image/png')
    } catch (err) {
      console.warn('Portapapeles no soportó imagen directamente', err)
      handleDownloadImage()
    }
  }

  return (
    <div className="bg-white rounded-3xl border border-slate-200/90 shadow-sm p-5 space-y-4">
      {/* Header Preview */}
      <div className="flex items-center justify-between pb-2 border-b border-slate-100">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-lg bg-blue-50 text-blue-600 flex items-center justify-center font-bold">
            <Eye className="w-4 h-4" />
          </div>
          <div>
            <h3 className="font-bold text-slate-900 text-sm">Vista Previa sobre Plantilla Oficial</h3>
            <span className="text-[11px] text-slate-400">Escala exacta 1024x1024 px</span>
          </div>
        </div>
        <span className="text-xs font-mono font-extrabold px-2.5 py-0.5 rounded-full bg-blue-100 text-blue-800">
          {receiptData.folio || 'OK-001'}
        </span>
      </div>

      {/* Canvas Container */}
      <div className="relative aspect-square w-full rounded-2xl overflow-hidden bg-slate-100 border border-slate-200 shadow-md">
        {/* Hidden high-res canvas used for rendering */}
        <canvas
          ref={canvasRef}
          width={1024}
          height={1024}
          className="w-full h-full object-contain block select-none"
        />

        {isRendering && (
          <div className="absolute inset-0 bg-white/70 backdrop-blur-xs flex items-center justify-center gap-2 text-xs font-bold text-slate-700">
            <Sparkles className="w-4 h-4 text-blue-600 animate-spin" />
            <span>Generando recibo sobre la plantilla...</span>
          </div>
        )}
      </div>

      {/* Action Toolbar */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 pt-2">
        <button
          type="button"
          onClick={handleDownloadImage}
          className="py-2.5 px-3 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs shadow-sm shadow-blue-500/20 transition-all flex items-center justify-center gap-1.5 active:scale-98"
        >
          <Download className="w-4 h-4" />
          <span>Descargar JPG</span>
        </button>

        <button
          type="button"
          onClick={handleCopyImage}
          className={`py-2.5 px-3 rounded-xl font-semibold text-xs border transition-colors flex items-center justify-center gap-1.5 ${
            copiedImage
              ? 'bg-emerald-50 border-emerald-300 text-emerald-700'
              : 'border-slate-300 hover:bg-slate-50 text-slate-700'
          }`}
        >
          {copiedImage ? <Check className="w-4 h-4 text-emerald-600" /> : <Copy className="w-4 h-4 text-slate-500" />}
          <span>{copiedImage ? '¡Copiado!' : 'Copiar Imagen'}</span>
        </button>

        <button
          type="button"
          onClick={handlePrint}
          className="py-2.5 px-3 rounded-xl border border-slate-300 hover:bg-slate-50 text-slate-700 font-semibold text-xs transition-colors flex items-center justify-center gap-1.5"
        >
          <Printer className="w-4 h-4 text-slate-500" />
          <span>Imprimir</span>
        </button>
      </div>
    </div>
  )
}
