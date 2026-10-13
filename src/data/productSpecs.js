// Base de Datos de Fichas Técnicas, Diluciones Oficiales y Guías de Uso
// Basado en el Sistema Oficial KEY® Química y la Propuesta Ejecutiva Torre Árbol

export const PRODUCT_SPECS = {
  // 1. KEY PARAÍSO
  'paraiso': {
    title: 'Key Paraíso · Limpiapisos Concentrado y Aromatizante',
    sku: '0180 / 0182',
    category: 'PISOS / ASEO GENERAL',
    nature: 'Limpiador desinfectante concentrado biodegradable de alta gama aromática.',
    safeSurfaces: ['Mármol importado', 'Porcelanato', 'Granito', 'Pisos laminados', 'Cantera', 'Azulejos'],
    benefits: [
      'pH neutro balanceado que respeta el brillo natural del mármol sin desgastarlo.',
      'Rinde hasta 320 - 400 litros de solución preparada por galón de 4 L.',
      'Costo en uso de apenas ~$1.28 MXN por litro listo para trapear.',
      'Firma aromática duradera y poder bactericida/virucida del 99.999%.'
    ],
    dilutions: [
      {
        level: 'Mantenimiento Ligero (Trapeado diario mármol/porcelanato)',
        ratio: '1:80 a 1:60',
        mlPerLiter: '12 a 16 ml por litro de agua',
        yieldGalon: '320 a 400 litros',
        yieldPorron: '1,600 a 2,000 litros',
        costPerLiter: '$1.02 - $1.28 MXN',
      },
      {
        level: 'Limpieza Media (Pasillos de alto tráfico y lobby)',
        ratio: '1:40',
        mlPerLiter: '25 ml por litro de agua',
        yieldGalon: '160 litros',
        yieldPorron: '800 litros',
        costPerLiter: '$2.56 MXN',
      },
      {
        level: 'Limpieza Pesada / Choque de Aroma',
        ratio: '1:20',
        mlPerLiter: '50 ml por litro de agua',
        yieldGalon: '80 litros',
        yieldPorron: '400 litros',
        costPerLiter: '$5.13 MXN',
      }
    ],
    instructions: [
      'Diluya de 12 a 16 ml de Key Paraíso por cada litro de agua limpia en su cubeta exprimidora.',
      'Sumerja el trapeador o mopa de microfibra, exprima el exceso de líquido.',
      'Trapee uniformemente la superficie. No requiere enjuague posterior; seca rápido sin dejar marcas ni película opaca.'
    ],
    presentations: [
      { size: 'Galón (4 L)', sku: '0180', price: 411.00, cost: 228.00 },
      { size: 'Porrón (20 L)', sku: '0182', price: 1756.00, cost: 975.00 },
    ],
    idealFor: 'Lobbies, pasillos de torres departamentales, amenidades y áreas comunes con mármol o granito.'
  },

  // 2. KEY BRILLANTE
  'brillante': {
    title: 'Key Brillante · Mármol y Pisos de Alto Brillo',
    sku: '1205 / 1206',
    category: 'PISOS ESPECIALIZADOS',
    nature: 'Limpiador no abrasivo formulado para prolongar el cristalizado y sellado del mármol.',
    safeSurfaces: ['Mármol cristalizado', 'Granito pulido', 'Terrazo fino', 'Piedra pulida'],
    benefits: [
      'No deja residuos que empañen o desgasten la película cristalizada del piso.',
      'Ayuda a alargar los intervalos de tiempo entre servicios de pulido profesional.',
      'Evita el uso de ácidos agresivos que quemen la piedra natural.'
    ],
    dilutions: [
      {
        level: 'Trapeado de conservación de brillo',
        ratio: '1:60',
        mlPerLiter: '16 ml por litro de agua',
        yieldGalon: '240 litros',
        yieldPorron: '1,200 litros',
        costPerLiter: '$2.16 MXN',
      },
      {
        level: 'Lavado con máquina rotativa',
        ratio: '1:40',
        mlPerLiter: '25 ml por litro de agua',
        yieldGalon: '160 litros',
        yieldPorron: '800 litros',
        costPerLiter: '$3.24 MXN',
      }
    ],
    instructions: [
      'Diluya a 1:60 en una cubeta con agua limpia y exprima la mopa.',
      'Para manchas localizadas, aplique una pequeña cantidad directamente sobre paño húmedo.',
      'Pase mopa seca para resaltar el brillo si es necesario.'
    ],
    presentations: [
      { size: 'Galón (4 L)', sku: '1205', price: 519.00, cost: 288.00 },
      { size: 'Porrón (20 L)', sku: '1206', price: 1900.00, cost: 1055.00 },
    ],
    idealFor: 'Lobbies residenciales con mármol de doble altura y áreas de recepción ejecutiva.'
  },

  // 3. VANGUARD CLORO
  'cloro': {
    title: 'Vanguard Cloro · Choque Sanitario y Blanqueo Institucional',
    sku: '70108 / 70111',
    category: 'DESINFECCIÓN',
    nature: 'Hipoclorito de sodio estabilizado para desinfección y sanitización profunda.',
    safeSurfaces: ['Vertederos de basura', 'Sanitarios', 'Cuartos de residuos', 'Superficies no porosas'],
    benefits: [
      'Concentración institucional superior a cloros comerciales de supermercado.',
      'Elimina olores fétidos y microorganismos patógenos al contacto.',
      'Excelente costo por litro para áreas de servicio y cuartos de basura.'
    ],
    dilutions: [
      {
        level: 'Superficies Duras y Pisos de Servicio',
        ratio: '1:250',
        mlPerLiter: '4 ml por litro de agua',
        yieldGalon: '937 litros',
        yieldPorron: '5,000 litros',
        costPerLiter: '$0.07 MXN',
      },
      {
        level: 'Vertederos y Cuartos de Basura',
        ratio: '1:50 a 1:100',
        mlPerLiter: '10 a 20 ml por litro de agua',
        yieldGalon: '187 a 375 litros',
        yieldPorron: '1,000 a 2,000 litros',
        costPerLiter: '$0.20 - $0.40 MXN',
      }
    ],
    instructions: [
      'Diluya en agua según el nivel de desinfección requerido.',
      'Deje actuar de 5 a 10 minutos para una sanitización completa.',
      'IMPORTANTE: Nunca mezclar con ácidos, vinagres o amoniaco.'
    ],
    presentations: [
      { size: 'Galón (3.75 L)', sku: '70108', price: 69.00, cost: 38.00 },
      { size: 'Porrón (20 L)', sku: '70111', price: 397.00, cost: 220.00 },
    ],
    idealFor: 'Cuartos de recolección de basura de torres residenciales, estacionamientos y drenajes.'
  },

  // 4. KEY DESENGRASANTE COCINA PLUS (ALISAN)
  'desengrasante': {
    title: 'Key Desengrasante Cocina Plus · Sistema Alisan®',
    sku: '6368 / 6369',
    category: 'COCINA PROFESIONAL / SISTEMA ALISAN',
    nature: 'Limpiador multiusos desengrasante biodegradable libre de solventes agresivos.',
    safeSurfaces: ['Asadores de amenidades', 'Campanas extractoras', 'Tarjas', 'Equipos de cocina', 'Pisos grasosos'],
    benefits: [
      'Disuelve grasa animal y vegetal carbonizada sin atacar superficies.',
      'No despide vapores tóxicos ni daña empaques o sellos.',
      'Certificado para áreas de alimentos (Sistema Alisan).'
    ],
    dilutions: [
      {
        level: 'Desengrase Ligero (Mantenimiento diario)',
        ratio: '1:50',
        mlPerLiter: '20 ml por litro de agua',
        yieldGalon: '200 litros',
        yieldPorron: '1,000 litros',
        costPerLiter: '$2.27 MXN',
      },
      {
        level: 'Desengrase Medio (Campanas y encimeras)',
        ratio: '1:30',
        mlPerLiter: '33 ml por litro de agua',
        yieldGalon: '120 litros',
        yieldPorron: '600 litros',
        costPerLiter: '$3.79 MXN',
      },
      {
        level: 'Desengrase Pesado (Asadores y cochambre)',
        ratio: '1:20',
        mlPerLiter: '50 ml por litro de agua',
        yieldGalon: '80 litros',
        yieldPorron: '400 litros',
        costPerLiter: '$5.68 MXN',
      }
    ],
    instructions: [
      'Retire el grueso de los restos de comida y enjuague con agua.',
      'Aplique la solución diluida con atomizador y cepille o talle con fibra hasta desprender la grasa.',
      'Enjuague con agua limpia o pase paño húmedo.'
    ],
    presentations: [
      { size: 'Gatillo (650 ml)', sku: '6367', price: 169.00, cost: 93.00 },
      { size: 'Galón (4 L)', sku: '6368', price: 455.00, cost: 252.00 },
      { size: 'Porrón (20 L)', sku: '6369', price: 2014.00, cost: 1118.00 },
    ],
    idealFor: 'Áreas de asadores en amenidades, palapas, salones polivalentes y cocinas de condominios.'
  },

  // 5. KEY BAÑO FORTE
  'forte': {
    title: 'Key Baño Forte · Sarricida Desinfectante No Corrosivo',
    sku: '15007 / 15113',
    category: 'BAÑOS',
    nature: 'Sarricida de última generación formulado con sales orgánicas (no ácido muriático).',
    safeSurfaces: ['Inodoros', 'Mingitorios', 'Canceles de cristal', 'Azulejos cerámicos', 'Tuberías de PVC'],
    benefits: [
      'Disuelve sarro mineral y óxido sin generar vapores tóxicos corrosivos.',
      'No ataca la tubería, empaques ni grifería fina.',
      'Rinde hasta 84 litros de solución diluida por galón.'
    ],
    dilutions: [
      {
        level: 'Mantenimiento Preventivo Diario de Sanitarios',
        ratio: '1:20',
        mlPerLiter: '48 ml por litro de agua',
        yieldGalon: '84 litros',
        yieldPorron: '420 litros',
        costPerLiter: '$9.27 MXN',
      },
      {
        level: 'Choque / Desincrustación Profunda de Sarro',
        ratio: 'Directo sin diluir',
        mlPerLiter: 'Uso directo en taza o mingitorio',
        yieldGalon: '4 litros',
        yieldPorron: '20 litros',
        costPerLiter: '$194.75 MXN / L',
      }
    ],
    instructions: [
      'Para choque: aplique directamente en la taza o cancel y deje reposar 2 a 3 minutos.',
      'Talle suavemente con fibra blanca (cero rayas) o cepillo sanitario.',
      'Enjuague con agua abundante o baje la palanca del sanitario.'
    ],
    presentations: [
      { size: 'Gatillo (650 ml)', sku: '15113', price: 189.00, cost: 85.00 },
      { size: 'Galón (4 L)', sku: '15007', price: 779.00, cost: 162.00 },
    ],
    idealFor: 'Baños de áreas comunes, vestidores de gimnasio, alberca y sanitarios de visitas en torres.'
  },

  // 6. KEY BAÑO FÓRMULA 503
  '503': {
    title: 'Key Baño (Fórmula 503) · Limpiador Diario No Ácido',
    sku: '0543',
    category: 'BAÑOS',
    nature: 'Limpiador desinfectante no ácido para grifería cromada, cancelería y lavabos.',
    safeSurfaces: ['Grifería cromada', 'Canceles de cristal', 'Lavabos de mármol', 'Azulejos'],
    benefits: [
      '100% libre de ácidos: no quema ni mancha el cromo o níquel cepillado de la grifería.',
      'Elimina residuos de jabón y sarro ligero diario.',
      'Rinde hasta 24 litros por galón.'
    ],
    dilutions: [
      {
        level: 'Limpieza Diaria de Canceles y Llaves',
        ratio: '1:6',
        mlPerLiter: '167 ml por litro de agua',
        yieldGalon: '24 litros',
        yieldPorron: '120 litros',
        costPerLiter: '$20.60 MXN',
      }
    ],
    instructions: [
      'Aplique la solución diluida con atomizador sobre la grifería o cancel.',
      'Frote suavemente con microfibra para retirar manchas de agua y jabón.',
      'Enjuague o pase paño húmedo y seque con paño limpio para un brillo espejo.'
    ],
    presentations: [
      { size: 'Litro (1 L)', sku: '0542', price: 189.00, cost: 95.00 },
      { size: 'Galón (4 L)', sku: '0543', price: 495.00, cost: 275.00 },
    ],
    idealFor: 'Limpieza diaria de grifos finos, canceles de baño en amenidades y lavabos delicados.'
  },

  // 7. KEY LIMPIAVIDRIOS
  'limpiavidrios': {
    title: 'Key Limpiavidrios · Cristales y Espejos Secado Rápido',
    sku: '0167 / 0168 / 0169',
    category: 'ASEO GENERAL / CRISTALES',
    nature: 'Limpiador desengrasante evaporable de alta tecnología que no deja marcas ni sombras.',
    safeSurfaces: ['Cristales de doble altura', 'Espejos de elevador y gimnasio', 'Canceles', 'Vitrinas'],
    benefits: [
      'Fórmula antiestática que retrasa la adherencia del polvo.',
      'Secado instantáneo sin marcas de jalador ni residuos opacos.',
      'Rendimiento sobresaliente por dilución hasta 1:3.'
    ],
    dilutions: [
      {
        level: 'Limpieza Ligera (Polvo diario y mantenimiento)',
        ratio: '1:3',
        mlPerLiter: '300 ml por litro de agua',
        yieldGalon: '16 litros',
        yieldPorron: '80 litros',
        costPerLiter: '$16.68 MXN',
      },
      {
        level: 'Limpieza Media (Grasa de huellas y exteriores)',
        ratio: '1:2',
        mlPerLiter: '500 ml por litro de agua',
        yieldGalon: '12 litros',
        yieldPorron: '60 litros',
        costPerLiter: '$22.25 MXN',
      }
    ],
    instructions: [
      'Rocíe la solución sobre el cristal utilizando atomizador.',
      'Pase jalador de hule de arriba a abajo o limpie con microfibra para vidrios.',
      'Seque los bordes con microfibra seca.'
    ],
    presentations: [
      { size: 'Litro (1 L)', sku: '0167', price: 90.00, cost: 42.00 },
      { size: 'Galón (4 L)', sku: '0168', price: 267.00, cost: 148.00 },
      { size: 'Porrón (20 L)', sku: '0169', price: 1335.00, cost: 741.00 },
    ],
    idealFor: 'Ventanales panorámicos de departamentos, espejos de elevadores y canceles de alberca.'
  },

  // 8. LÍNEA ACERO INOXIDABLE (ALISAN)
  'acero': {
    title: 'Línea Especializada Acero Inoxidable · Sistema Alisan®',
    sku: '6492 / 6383',
    category: 'ESPECIALIDADES / ELEVADORES',
    nature: 'Protección y restauración de cabinas de elevador, barandales y marcos de acero inox.',
    safeSurfaces: ['Elevadores de pasajeros', 'Barandales', 'Marcos de puertas', 'Electrodomésticos de amenidades'],
    benefits: [
      'Crea una película protectora invisible que repele huellas dactilares y grasa.',
      'Previene la corrosión y manchas de agua dura en el metal.',
      'El limpiador en polvo restaura y elimina manchas profundas sin rayar el pulido.'
    ],
    dilutions: [
      {
        level: 'Lustrador Líquido (Uso directo sin diluir)',
        ratio: 'Directo',
        mlPerLiter: 'Aplicar 3 a 5 ml en paño de microfibra',
        yieldGalon: 'Cientos de aplicaciones por litro',
        yieldPorron: 'N/A',
        costPerLiter: '$685.00 MXN / L',
      },
      {
        level: 'Limpiador en Polvo (Restauración)',
        ratio: 'Directo sobre esponja húmeda',
        mlPerLiter: 'Espolvorear sobre superficie',
        yieldGalon: 'Bote de 3 kg rinde meses',
        yieldPorron: 'N/A',
        costPerLiter: '$752.00 MXN / bote',
      }
    ],
    instructions: [
      'Lustrador: Aplique unas gotas en microfibra limpia y frote siguiendo la veta del acero.',
      'Polvo: Humedezca la superficie, espolvoree, frote en dirección de la veta y enjuague.'
    ],
    presentations: [
      { size: 'Lustrador 1 L (Líquido)', sku: '6492', price: 685.00, cost: 380.00 },
      { size: 'Limpiador en Polvo 3 kg', sku: '6383', price: 752.00, cost: 417.00 },
    ],
    idealFor: 'Cabinas y marcos exteriores de elevadores en torres residenciales y corporativas.'
  },

  // 9. JABONES DE MANOS (ESPUMA Y CREMA)
  'jabon': {
    title: 'Key Jabón de Manos · Espuma y Crema de Almendras',
    sku: '6123 / 0188',
    category: 'LAVADO DE MANOS',
    nature: 'Jabones dermoprotectores enriquecidos con humectantes naturales para tráfico constante.',
    safeSurfaces: ['Manos / Piel'],
    benefits: [
      'El sistema de espuma ahorra hasta un 50% de producto y agua de enjuague.',
      'Aroma almendras dulces con sensación de suavidad que previene resequedad.',
      'Rendimiento extraordinario: miles de pulsaciones por galón.'
    ],
    dilutions: [
      {
        level: 'Jabón Espuma 4 L',
        ratio: 'Uso directo en despachador espumador',
        mlPerLiter: '0.4 a 0.6 ml por disparo denso',
        yieldGalon: 'Hasta 8,000 lavados por galón',
        yieldPorron: 'N/A',
        costPerLiter: '$125.75 MXN / L',
      },
      {
        level: 'Jabón Crema 4 L / 20 L',
        ratio: 'Uso directo en jabonera líquida',
        mlPerLiter: '1 a 1.5 ml por lavado',
        yieldGalon: 'Hasta 3,500 lavados por galón',
        yieldPorron: 'Hasta 17,500 lavados por porrón',
        costPerLiter: '$110.25 MXN / L',
      }
    ],
    instructions: [
      'Vierta directo en el depósito de la jabonera dosificadora.',
      'Aplique una sola pulsación sobre las manos húmedas y frote durante 20 segundos.',
      'Enjuague con agua.'
    ],
    presentations: [
      { size: 'Jabón Espuma 4 L', sku: '6123', price: 503.00, cost: 279.00 },
      { size: 'Jabón Crema 4 L', sku: '0188', price: 441.00, cost: 245.00 },
      { size: 'Jabón Crema 20 L', sku: '0189', price: 2205.00, cost: 1225.00 },
      { size: 'Jabonera Oval Espuma 750ml', sku: 'JAB-OVAL', price: 300.00, cost: 166.00 },
      { size: 'Jabonera Aitana Crema 1L', sku: 'JAB-AIT', price: 286.00, cost: 158.00 },
    ],
    idealFor: 'Sanitarios de lobby, gimnasio, vestidores, alberca y oficinas de administración.'
  },

  // 10. ECO-CLIPS Y AROMATIZACIÓN
  'ecoclip': {
    title: 'Eco-Clips & Aerosan · Firma Olfativa Continua',
    sku: '11717 / 2895',
    category: 'CONTROL DE OLORES',
    nature: 'Aromatizantes poliméricos continuos de 30 días y aerosoles bactericidas grado médico.',
    safeSurfaces: ['Tazas de baño', 'Mingitorios', 'Ductos de aire', 'Recepción'],
    benefits: [
      'El Eco-Clip aromatiza 24/7 durante 30 días continuos sin requerir baterías ni cables.',
      'No se disuelve en agua ni contamina el drenaje.',
      'Aerosan desinfecta el aire con 99.999% de efectividad bactericida hospitalaria.'
    ],
    dilutions: [
      {
        level: 'Eco-Clip 30 Días',
        ratio: 'Listo para colocar',
        mlPerLiter: '1 clip por sanitario dura 30 días',
        yieldGalon: '30 días de aroma continuo',
        yieldPorron: 'N/A',
        costPerLiter: '$82.00 MXN / pieza',
      }
    ],
    instructions: [
      'Eco-Clip: Sujete el clip en el borde exterior de la taza, tubería o rejilla de ventilación.',
      'Aerosan: Rocíe durante 3 a 5 segundos hacia el centro de la habitación.'
    ],
    presentations: [
      { size: 'Eco-Clip Kiwi-Toronja', sku: '11717', price: 82.00, cost: 45.55 },
      { size: 'Eco-Clip Lavanda', sku: '11718', price: 82.00, cost: 45.55 },
      { size: 'Eco-Clip Citrus', sku: '11720', price: 82.00, cost: 45.55 },
      { size: 'Aerosan 300g Original', sku: '2895', price: 159.00, cost: 88.33 },
    ],
    idealFor: 'Sanitarios comunes, elevadores y pasillos cerrados con alto flujo peatonal.'
  },

  // 11. BIOKEY (CONTROL DE PLAGAS)
  'biokey': {
    title: 'Biokey · Insecticida Concentrado Oficial KEY® (100 ml)',
    sku: '0586',
    category: 'CONTROL DE PLAGAS',
    nature: 'Insecticida concentrado emulsionable para control de plagas urbanas (cucarachas, hormigas, arañas, moscas).',
    safeSurfaces: ['Zoclos', 'Grietas', 'Marcos de puertas', 'Cuartos de basura', 'Debajo de tarjas y muebles'],
    benefits: [
      'Efecto de derribe inmediato y efecto residual prolongado.',
      'Formulación oficial KEY® Química para uso profesional urbano.',
      'Un solo frasco de 100 ml rinde para 5 litros completos de solución lista para aspersión.'
    ],
    dilutions: [
      {
        level: 'Dosis Oficial Estándar (Cucarachas y rastreros)',
        ratio: '20 ml por 1 L de agua',
        mlPerLiter: '20 ml de Biokey en 1 L de agua limpia',
        yieldGalon: '1 frasco (100 ml) = 5 litros de mezcla lista',
        yieldPorron: 'N/A',
        costPerLiter: '$55.00 MXN por litro listo para aspersión',
      },
      {
        level: 'Mantenimiento Preventivo / Insectos Voladores',
        ratio: '10 ml por 1 L de agua',
        mlPerLiter: '10 ml de Biokey en 1 L de agua limpia',
        yieldGalon: '1 frasco (100 ml) = 10 litros de mezcla preventiva',
        yieldPorron: 'N/A',
        costPerLiter: '$27.50 MXN por litro preparado',
      }
    ],
    instructions: [
      'Vierta exactamente 20 ml de Biokey en una botella con atomizador y complete con 1 litro de agua limpia.',
      'Agite suavemente la botella para emulsionar la mezcla.',
      'Aspersione sobre zoclos, detrás de electrodomésticos, cuartos de basura y grietas.',
      'No aplicar sobre alimentos. Dejar ventilar el área durante 30 minutos tras aplicar.'
    ],
    presentations: [
      { size: 'Frasco 100 ml', sku: '0586', price: 275.00, cost: 153.00 },
    ],
    idealFor: 'Control de plagas en cuartos de basura, cocinetas, bodegas y perímetros de edificios y empresas.'
  }
}

// Función buscadora inteligente de ficha técnica para cualquier producto del catálogo
export function getProductSpec(product) {
  if (!product) return null
  const name = (product.name || '').toLowerCase()
  const cat = (product.category || '').toLowerCase()

  if (name.includes('paraiso') || name.includes('paraíso')) return PRODUCT_SPECS['paraiso']
  if (name.includes('brillante')) return PRODUCT_SPECS['brillante']
  if (name.includes('cloro') || name.includes('vanguard')) return PRODUCT_SPECS['cloro']
  if (name.includes('desengrasante') || name.includes('alisan')) return PRODUCT_SPECS['desengrasante']
  if (name.includes('forte') || name.includes('sarricida')) return PRODUCT_SPECS['forte']
  if (name.includes('503') || name.includes('f-503')) return PRODUCT_SPECS['503']
  if (name.includes('limpiavidrio') || name.includes('vidrio') || name.includes('cristal')) return PRODUCT_SPECS['limpiavidrios']
  if (name.includes('acero') || name.includes('lustrador')) return PRODUCT_SPECS['acero']
  if (name.includes('jabon') || name.includes('jabón') || name.includes('espuma')) return PRODUCT_SPECS['jabon']
  if (name.includes('clip') || name.includes('aerosan')) return PRODUCT_SPECS['ecoclip']
  if (name.includes('biokey') || name.includes('plaga') || name.includes('insecticida')) return PRODUCT_SPECS['biokey']

  // Fallback inteligente para productos generales según su categoría
  return {
    title: product.name,
    sku: product.sku,
    category: product.category,
    nature: `Producto concentrado profesional oficial KEY® Química para ${product.category}.`,
    safeSurfaces: ['Superficies recomendadas según ficha técnica'],
    benefits: [
      'Formulación concentrada de alto rendimiento institucional.',
      'Diseñado para diluirse en sitio con ahorro significativo de costo en uso.',
      'Máxima efectividad limpiadora y protección de superficies.'
    ],
    dilutions: [
      {
        level: 'Dilución Recomendada de Uso Diario',
        ratio: '1:40 a 1:20',
        mlPerLiter: '25 a 50 ml por litro de agua',
        yieldGalon: '80 a 160 litros',
        yieldPorron: '400 a 800 litros',
        costPerLiter: '$2.50 - $5.00 MXN',
      }
    ],
    instructions: [
      'Diluya la porción sugerida en un atomizador o cubeta con agua limpia.',
      'Aplique sobre la superficie deseada utilizando microfibra o mopa.',
      'Frote y deje secar o enjuague si el área lo requiere.'
    ],
    presentations: [
      { size: product.presentation || 'Galón', sku: product.sku, price: product.price, cost: product.cost }
    ],
    idealFor: `Uso profesional e institucional en instalaciones residenciales y comerciales.`
  }
}
