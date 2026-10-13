import { formatCurrency } from './formatters'

/**
 * Dibuja el recibo completo de Limpieza OKEY exactamente sobre la plantilla oficial de 1024x1024 px.
 * 
 * @param {HTMLCanvasElement} canvas
 * @param {Object} receiptData - Datos del recibo (folio, fecha, customerName, items, subtotal, shippingCost, discount, total, downPayment, pendingBalance, notes)
 * @returns {Promise<string>} dataURL de la imagen generada
 */
export async function renderReceiptOnCanvas(canvas, receiptData) {
  const ctx = canvas.getContext('2d')
  canvas.width = 1024
  canvas.height = 1024

  // Cargar imagen de la plantilla
  const templateImg = new Image()
  templateImg.crossOrigin = 'anonymous'
  templateImg.src = '/recibo-template.jpg'

  await new Promise((resolve, reject) => {
    templateImg.onload = resolve
    templateImg.onerror = reject
  })

  // 1. Dibujar imagen de fondo de la plantilla
  ctx.drawImage(templateImg, 0, 0, 1024, 1024)

  // Configuración de estilos tipográficos
  const fontPrimary = 'system-ui, -apple-system, "Segoe UI", Roboto, sans-serif'
  const colorNavy = '#0a3264'
  const colorDark = '#1e293b'
  const colorMuted = '#475569'

  // 2. FOLIO (Top Izquierda)
  ctx.font = `bold 22px ${fontPrimary}`
  ctx.fillStyle = '#0284c7' // Azul cielo distintivo OKEY
  ctx.textAlign = 'left'
  ctx.fillText(receiptData.folio || 'OK-001', 148, 131)

  // 3. FECHA (Top Derecha)
  ctx.font = `bold 20px ${fontPrimary}`
  ctx.fillStyle = colorNavy
  ctx.textAlign = 'left'
  ctx.fillText(receiptData.date || new Date().toLocaleDateString('es-MX'), 815, 131)

  // 4. NOMBRE DEL CLIENTE
  ctx.font = `bold 23px ${fontPrimary}`
  ctx.fillStyle = colorNavy
  ctx.textAlign = 'left'
  const customerDisplayName = receiptData.customerName || 'Cliente Mostrador'
  // Truncar si es demasiado largo para la línea
  const truncatedName = customerDisplayName.length > 52 
    ? customerDisplayName.slice(0, 50) + '...' 
    : customerDisplayName
  ctx.fillText(truncatedName, 260, 356)

  // 5. CONTENIDO DEL PEDIDO (Dentro del recuadro blanco de PEDIDO)
  // Caja: x=75 a x=945 (ancho ~870px), y=465 a y=745 (alto ~280px)
  let currentY = 472
  const leftX = 85
  const rightX = 935

  // Listado de Artículos
  const items = receiptData.items || []
  const maxDisplayItems = 5
  const itemsToRender = items.slice(0, maxDisplayItems)

  itemsToRender.forEach((item, index) => {
    if (currentY > 640) return

    // Cantidad y Nombre del Producto
    ctx.font = `bold 16px ${fontPrimary}`
    ctx.fillStyle = colorDark
    ctx.textAlign = 'left'
    const itemTitle = `${item.quantity}x ${item.name}`
    const truncatedTitle = itemTitle.length > 48 ? itemTitle.slice(0, 46) + '...' : itemTitle
    ctx.fillText(truncatedTitle, leftX, currentY)

    // Precio subtotal del renglón
    ctx.font = `bold 16px ${fontPrimary}`
    ctx.fillStyle = colorDark
    ctx.textAlign = 'right'
    const lineTotal = formatCurrency((item.quantity || 1) * (item.price || 0))
    ctx.fillText(lineTotal, rightX, currentY)

    currentY += 21

    // Regalo o detalle de empaque (si tiene)
    if (item.gift) {
      ctx.font = `italic 13px ${fontPrimary}`
      ctx.fillStyle = '#b45309' // Tono ámbar/dorado de regalo
      ctx.textAlign = 'left'
      ctx.fillText(`   🎁 Regalo: ${item.gift}`, leftX, currentY)
      currentY += 19
    } else if (item.presentation) {
      ctx.font = `normal 13px ${fontPrimary}`
      ctx.fillStyle = colorMuted
      ctx.textAlign = 'left'
      ctx.fillText(`   (${item.presentation})`, leftX, currentY)
      currentY += 19
    }
  })

  // Si hay más artículos que no cupieron
  if (items.length > maxDisplayItems) {
    ctx.font = `italic bold 13px ${fontPrimary}`
    ctx.fillStyle = '#0284c7'
    ctx.textAlign = 'left'
    ctx.fillText(`+ ${items.length - maxDisplayItems} artículo(s) adicional(es) en pedido...`, leftX, currentY)
    currentY += 20
  }

  // Línea divisoria tenue antes del desglose
  currentY = Math.max(currentY + 4, 642)
  ctx.strokeStyle = '#e2e8f0'
  ctx.lineWidth = 1.5
  ctx.beginPath()
  ctx.moveTo(leftX, currentY)
  ctx.lineTo(rightX, currentY)
  ctx.stroke()
  currentY += 18

  // Desglose de Subtotal, Envío y Anticipo / Saldo
  ctx.font = `14px ${fontPrimary}`
  ctx.fillStyle = colorMuted

  // Columna Izquierda: Subtotal y Envío
  ctx.textAlign = 'left'
  const shippingText = receiptData.shippingCost === 0 
    ? 'Envío: ¡GRATIS!' 
    : `Envío: ${formatCurrency(receiptData.shippingCost)}`
  ctx.fillText(`Subtotal: ${formatCurrency(receiptData.subtotal)}   |   ${shippingText}`, leftX, currentY)

  // Columna Derecha: Anticipo y Saldo
  ctx.textAlign = 'right'
  if (receiptData.downPayment > 0) {
    const balanceText = receiptData.pendingBalance <= 0 
      ? '¡LIQUIDADO 100%!' 
      : `Saldo Contra Entrega: ${formatCurrency(receiptData.pendingBalance)}`
    
    ctx.font = `bold 14px ${fontPrimary}`
    ctx.fillStyle = receiptData.pendingBalance <= 0 ? '#15803d' : '#b45309'
    ctx.fillText(`Anticipo: ${formatCurrency(receiptData.downPayment)}   |   ${balanceText}`, rightX, currentY)
  } else {
    ctx.font = `bold 14px ${fontPrimary}`
    ctx.fillStyle = colorNavy
    ctx.fillText(`Pago: Contra entrega al recibir`, rightX, currentY)
  }

  // Notas adicionales si existen
  if (receiptData.notes) {
    currentY += 18
    ctx.font = `italic 12px ${fontPrimary}`
    ctx.fillStyle = colorMuted
    ctx.textAlign = 'left'
    const noteText = `Nota: ${receiptData.notes.slice(0, 95)}`
    ctx.fillText(noteText, leftX, currentY)
  }

  // 6. TOTAL (Pill inferior al lado de "$ TOTAL: $")
  // Coordenadas del número del total: x ~ 535 a 665, y ~ 840
  ctx.font = `900 28px ${fontPrimary}`
  ctx.fillStyle = '#0a3264'
  ctx.textAlign = 'left'
  const totalAmountStr = new Intl.NumberFormat('es-MX', {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(receiptData.total || 0)
  ctx.fillText(totalAmountStr, 535, 839)

  return canvas.toDataURL('image/jpeg', 0.95)
}
