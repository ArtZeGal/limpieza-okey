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

/**
 * Determina si un producto es líquido de ~4L susceptible a venta fraccionada por litro (Regla de Karen)
 */
export const isFractionalEligible = (product) => {
  if (!product) return false
  const cat = String(product.category || '').toUpperCase()
  if ([
    'ACCESORIOS',
    'VILEDA',
    'PAPEL PARA MANOS, SUPERFICIES Y SANITARIOS',
    'DESPACHADORES DE JABÓN DE MANOS',
    'DESPACHADORES DE PAPEL'
  ].includes(cat)) {
    return false
  }
  const pres = String(product.presentation || '').toUpperCase()
  const name = String(product.name || '').toUpperCase()
  // Excluir presentaciones que no sean galones líquidos (ej. 20L, piezas, pastillas, polvos de 3kg)
  if (pres.includes('20L') || pres.includes('PIEZA') || pres.includes('CAJA') || pres.includes('3KG') || pres.includes('4KG')) {
    return false
  }
  return (
    pres.includes('4L') ||
    pres.includes('3.8L') ||
    pres.includes('3.75L') ||
    name.includes(' 4L') ||
    name.includes(' 3.8L') ||
    name.includes(' 3.75L')
  )
}

/**
 * Calcula precios y costos para venta por litro fraccionado (Regla de Karen)
 * Fórmula oficial de Karen: (Precio Galón / 4) * 1.37 + costoEnvase
 * Bote estándar plástico (sin aspersor): +$11
 * Bote Key + aspersor Key: +$45
 */
export const calculateFractional1L = (product) => {
  if (!product || !product.price) return null
  const galonPrice = Number(product.price) || 0
  const galonCost = Number(product.cost) || 0

  const baseChemicalPrice = (galonPrice / 4) * 1.37
  const baseChemicalCost = (galonCost / 4)

  const priceBote = Math.round(baseChemicalPrice + 11)
  const priceAspersor = Math.round(baseChemicalPrice + 45)

  const costBote = Math.round(baseChemicalCost + 11)
  const costAspersor = Math.round(baseChemicalCost + 45)

  const cleanName = String(product.name || '')
    .replace(/\s*(4L|3\.8L|3\.75L)\b/gi, '')
    .replace(/\s*\((GALÓN|PORRÓN|ENVASE)\)/gi, '')
    .trim()

  return {
    cleanName,
    baseChemicalPrice,
    baseChemicalCost,
    bote: {
      id: `${product.id}-1L-BOTE`,
      sku: `${product.sku}-1L`,
      name: `${cleanName} 1L (Bote Estándar)`,
      category: product.category,
      presentation: '1L',
      price: priceBote,
      cost: costBote,
      packaging: 'Bote de plástico (sin aspersor)',
      isFractional: true,
      parentProductId: product.id
    },
    aspersor: {
      id: `${product.id}-1L-ASP`,
      sku: `${product.sku}-1L-ASP`,
      name: `${cleanName} 1L (Bote Key + Aspersor Key)`,
      category: product.category,
      presentation: '1L',
      price: priceAspersor,
      cost: costAspersor,
      packaging: 'Bote Key + Aspersor Key',
      isFractional: true,
      parentProductId: product.id
    }
  }
}

