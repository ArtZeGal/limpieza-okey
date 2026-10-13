// Formateadores numéricos y de moneda para Limpieza OKEY

export const formatCurrency = (amount) => {
  const numeric = Number(amount) || 0
  return new Intl.NumberFormat('es-MX', {
    style: 'currency',
    currency: 'MXN',
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(numeric)
}

export const formatPercentage = (percentage) => {
  const numeric = Number(percentage) || 0
  return `${numeric.toFixed(1)}%`
}

/**
 * Calcula el margen comercial: ((Precio Venta - Costo) / Precio Venta) * 100
 */
export const calculateMargin = (cost, price) => {
  const c = Number(cost) || 0
  const p = Number(price) || 0
  if (p <= 0) return 0
  return ((p - c) / p) * 100
}

/**
 * Calcula la ganancia bruta unitaria: Precio Venta - Costo
 */
export const calculateProfit = (cost, price) => {
  const c = Number(cost) || 0
  const p = Number(price) || 0
  return p - c
}

/**
 * Retorna color y texto semántico para el badge de margen
 */
export const getMarginStatus = (margin) => {
  if (margin >= 45) {
    return {
      label: 'Margen Alto',
      color: 'bg-emerald-50 text-emerald-700 border-emerald-200',
      badge: 'bg-emerald-500',
    }
  }
  if (margin >= 25) {
    return {
      label: 'Margen Óptimo',
      color: 'bg-blue-50 text-blue-700 border-blue-200',
      badge: 'bg-blue-500',
    }
  }
  if (margin >= 15) {
    return {
      label: 'Margen Moderado',
      color: 'bg-amber-50 text-amber-700 border-amber-200',
      badge: 'bg-amber-500',
    }
  }
  return {
    label: 'Margen Bajo',
    color: 'bg-rose-50 text-rose-700 border-rose-200',
    badge: 'bg-rose-500',
  }
}
