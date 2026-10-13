import { formatCurrency } from './formatters'

/**
 * Dibuja el recibo completo de Limpieza OKEY con calibración milimétrica
 * sobre la plantilla oficial de 1024x1024 px.
 * 
 * @param {HTMLCanvasElement} canvas
 * @param {Object} receiptData - Datos del recibo (folio, fecha, customerName, items, subtotal, shippingCost, discount, total, downPayment, pendingBalance, notes)
 * @returns {Promise<string>} dataURL de la imagen generada
 */
export async function renderReceiptOnCanvas(canvas, receiptData) {
  const ctx = canvas.getContext('2d')
  canvas.width = 1024
  canvas.height = 1024

  // Cargar imagen de la plantilla oficial
  const templateImg = new Image()
  templateImg.crossOrigin = 'anonymous'
  templateImg.src = '/recibo-template.jpg'

  await new Promise((resolve, reject) => {
    templateImg.onload = resolve
    templateImg.onerror = reject
  })

  // 1. Dibujar fondo de la plantilla original
  ctx.drawImage(templateImg, 0, 0, 1024, 1024)

  // Configuración tipográfica consistente
  const fontPrimary = 'system-ui, -apple-system, "Segoe UI", Roboto, sans-serif'
  const colorNavy = '#0a3264'
  const colorDark = '#1e293b'
  const colorMuted = '#475569'

  // 2. FOLIO (Línea punteada superior izquierda)
  // "FOLIO:" termina en x=137. La línea punteada está en x=145..265, y=134.
  ctx.font = `bold 21px ${fontPrimary}`
  ctx.fillStyle = '#0284c7' // Azul cielo distintivo OKEY
  ctx.textAlign = 'left'
  ctx.fillText(receiptData.folio || 'OK-001', 152, 131)

  // 3. FECHA (Línea punteada superior derecha)
  // "FECHA:" termina en x=829. La línea punteada inicia en x=838, y=134.
  ctx.font = `bold 19px ${fontPrimary}`
  ctx.fillStyle = colorNavy
  ctx.textAlign = 'left'
  const dateStr = receiptData.date || new Date().toLocaleDateString('es-MX')
  ctx.fillText(dateStr, 840, 131)

  // 4. NOMBRE DEL CLIENTE
  // "NOMBRE:" termina en x=256. La línea punteada está en y=362.
  ctx.font = `bold 22px ${fontPrimary}`
  ctx.fillStyle = colorNavy
  ctx.textAlign = 'left'
  const customerDisplayName = receiptData.customerName || 'Cliente Mostrador'
  const truncatedName = customerDisplayName.length > 50
    ? customerDisplayName.slice(0, 48) + '...'
    : customerDisplayName
  ctx.fillText(truncatedName, 276, 358)

  // 5. CONTENIDO DEL PEDIDO (Dentro del recuadro blanco)
  // El icono del carrito y "PEDIDO:" terminan en y=462.
  // Los renglones comienzan a partir de y=495 para dejar espacio libre y limpio.
  const leftX = 98
  const rightX = 926
  let currentY = 496

  const items = receiptData.items || []
  const maxDisplayItems = 4
  const itemsToRender = items.slice(0, maxDisplayItems)

  itemsToRender.forEach((item) => {
    if (currentY > 645) return

    // Cantidad y Nombre del Producto
    ctx.font = `bold 16px ${fontPrimary}`
    ctx.fillStyle = colorDark
    ctx.textAlign = 'left'
    const itemTitle = `${item.quantity}x ${item.name}`
    const truncatedTitle = itemTitle.length > 46 ? itemTitle.slice(0, 44) + '...' : itemTitle
    ctx.fillText(truncatedTitle, leftX, currentY)

    // Subtotal del renglón alineado a la derecha
    ctx.font = `bold 16px ${fontPrimary}`
    ctx.fillStyle = colorDark
    ctx.textAlign = 'right'
    const lineTotal = formatCurrency((item.quantity || 1) * (item.price || 0))
    ctx.fillText(lineTotal, rightX, currentY)

    currentY += 19

    // Presentación o notas del empaque
    if (item.presentation) {
      ctx.font = `normal 13px ${fontPrimary}`
      ctx.fillStyle = colorMuted
      ctx.textAlign = 'left'
      ctx.fillText(`   (${item.presentation})`, leftX, currentY)
      currentY += 21
    } else {
      currentY += 14
    }
  })

  // Mensaje si hay artículos adicionales
  if (items.length > maxDisplayItems) {
    ctx.font = `italic bold 13px ${fontPrimary}`
    ctx.fillStyle = '#0284c7'
    ctx.textAlign = 'left'
    ctx.fillText(`+ ${items.length - maxDisplayItems} producto(s) adicional(es) en este pedido...`, leftX, currentY)
  }

  // Línea divisoria tenue antes del desglose financiero
  const dividerY = 678
  ctx.strokeStyle = '#e2e8f0'
  ctx.lineWidth = 1.5
  ctx.beginPath()
  ctx.moveTo(leftX, dividerY)
  ctx.lineTo(rightX, dividerY)
  ctx.stroke()

  // Desglose de Pago (Subtotal, Envío, Anticipo y Saldo)
  const summaryY = 705

  // Columna Izquierda: Subtotal y Envío
  ctx.font = `14px ${fontPrimary}`
  ctx.fillStyle = colorMuted
  ctx.textAlign = 'left'
  const shippingText = receiptData.shippingCost === 0
    ? 'Envío: ¡GRATIS!'
    : `Envío: ${formatCurrency(receiptData.shippingCost)}`
  ctx.fillText(`Subtotal: ${formatCurrency(receiptData.subtotal)}   |   ${shippingText}`, leftX, summaryY)

  // Columna Derecha: Estatus de Pago / Anticipo / Saldo
  ctx.textAlign = 'right'
  if (receiptData.downPayment > 0) {
    const balanceText = receiptData.pendingBalance <= 0
      ? '¡LIQUIDADO 100%!'
      : `Saldo Contra Entrega: ${formatCurrency(receiptData.pendingBalance)}`

    ctx.font = `bold 14px ${fontPrimary}`
    ctx.fillStyle = receiptData.pendingBalance <= 0 ? '#15803d' : '#b45309'
    ctx.fillText(`Anticipo: ${formatCurrency(receiptData.downPayment)}   |   ${balanceText}`, rightX, summaryY)
  } else {
    ctx.font = `bold 14px ${fontPrimary}`
    ctx.fillStyle = colorNavy
    ctx.fillText(`Pago: Contra entrega al recibir`, rightX, summaryY)
  }

  // Renglón adicional de notas si existe
  if (receiptData.notes) {
    ctx.font = `italic 12px ${fontPrimary}`
    ctx.fillStyle = colorMuted
    ctx.textAlign = 'left'
    const noteText = `Nota: ${receiptData.notes.slice(0, 95)}`
    ctx.fillText(noteText, leftX, 728)
  }

  // 6. TOTAL (Pill inferior al lado de "$ TOTAL: $")
  // El signo '$' de la plantilla termina en x=540.
  // La línea punteada corre en y=874..875.
  // Colocamos el número en x=552 con línea base y=870 (descansando 4px sobre los puntos).
  ctx.font = `900 34px ${fontPrimary}`
  ctx.fillStyle = colorNavy
  ctx.textAlign = 'left'
  const totalAmountStr = new Intl.NumberFormat('es-MX', {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(receiptData.total || 0)
  ctx.fillText(totalAmountStr, 552, 870)

  return canvas.toDataURL('image/jpeg', 0.95)
}
