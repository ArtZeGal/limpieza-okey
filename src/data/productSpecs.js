// Base de Datos Integral de Fichas Técnicas, Diluciones Oficiales y Guías de Uso
// Basado en el Sistema Oficial KEY® Química, Tiendas KEY y Propuestas Técnicas Profesionales OKEY

export const PRODUCT_SPECS = {
  // 1. KEY PARAÍSO
  'paraiso': {
    title: 'Key Paraíso · Limpiapisos Concentrado y Aromatizante',
    sku: '0180 / 0182 / 6118',
    category: 'PISOS / ASEO GENERAL',
    nature: 'Limpiador desinfectante concentrado biodegradable de alta gama aromática y pH neutro.',
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
      { size: 'Galón (4 L)', sku: '0180 / 6118', price: 411.00, cost: 228.00 },
      { size: 'Porrón (20 L)', sku: '0182', price: 1756.00, cost: 975.00 },
    ],
    idealFor: 'Lobbies, pasillos de torres departamentales, amenidades y áreas comunes con mármol o granito.'
  },

  // 2. KEY BRILLANTE / PIEDRA NATURAL
  'brillante': {
    title: 'Key Brillante / Limpiapisos Piedra Natural',
    sku: '1205 / 1206 / 15041',
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
      { size: 'Galón (4 L)', sku: '1205 / 15041', price: 519.00, cost: 288.00 },
      { size: 'Porrón (20 L)', sku: '1206', price: 1900.00, cost: 1055.00 },
    ],
    idealFor: 'Lobbies residenciales con mármol de doble altura y áreas de recepción ejecutiva.'
  },

  // 3. KEY GLOX CRISTALIZADOR
  'glox': {
    title: 'Key Glox · Cristalizador Termoquímico para Mármol y Terrazo',
    sku: '1863',
    category: 'PISOS / CRISTALIZADO',
    nature: 'Tratamiento termo-químico vitrificador que reacciona con el carbonato de calcio de la piedra para sellar poros y generar brillo espejo.',
    safeSurfaces: ['Mármol blanco', 'Travertino', 'Terrazo pulido', 'Piedra caliza'],
    benefits: [
      'Produce un brillo espejo húmedo de alta resistencia al tráfico peatonal intenso.',
      'Endurece la superficie del mármol, haciéndola más resistente al rayado y a la absorción de manchas.',
      'No forma una capa plástica que se descarapele; la reacción es química e integral.'
    ],
    tableTitle: 'Dosificación y Rendimiento en Cristalizado',
    tableHeaders: ['Nivel de Tratamiento', 'Método / Disco', 'Dosis por m²', 'Rendimiento (Galón 4 L)', 'Costo por m²'],
    dilutions: [
      {
        level: 'Cristalizado Inicial de Alto Tráfico',
        ratio: 'Uso directo con máquina rotativa (175 RPM)',
        mlPerLiter: '15 a 20 ml por m² (rociar con aspersor)',
        yieldGalon: '200 a 250 m² por galón',
        costPerLiter: '~$7.50 MXN / m²',
      },
      {
        level: 'Recristalizado de Mantenimiento Periódico',
        ratio: 'Disco de lana de acero #0 o #1',
        mlPerLiter: '10 ml por m²',
        yieldGalon: 'Hasta 400 m² por galón',
        costPerLiter: '~$4.20 MXN / m²',
      }
    ],
    instructions: [
      'Asegúrese de que el piso esté completamente limpio, desengrasado y seco.',
      'Rocíe ligeramente Key Glox sobre un área de 2x2 metros.',
      'Pase la máquina rotativa con disco de lana de acero #0 hasta secar por completo el producto y levantar brillo.',
      'Aspire o pase mopa con tratamiento para retirar los residuos de lana de acero.'
    ],
    presentations: [
      { size: 'Galón (4 L)', sku: '1863', price: 749.00, cost: 416.00 }
    ],
    idealFor: 'Lobbies residenciales, pasillos de torres ejecutivas, hoteles y centros comerciales.'
  },

  // 4. KEY LIMÓN (TRIPLE ACCIÓN)
  'limon': {
    title: 'Key Limón (Triple Acción) · Detergente Desinfectante Cítrico',
    sku: '0143',
    category: 'PISOS / ASEO GENERAL',
    nature: 'Detergente germicida concentrado formulado con esencias cítricas que limpia, desinfecta y aromatiza en una sola operación.',
    safeSurfaces: ['Pisos cerámicos', 'Porcelanato', 'Azulejos', 'Muros lavables', 'Sanitarios'],
    benefits: [
      'Elimina el 99.999% de gérmenes y bacterias al contacto.',
      'Rendimiento extraordinario: rinde hasta 320 litros de trapeado por galón de 4 L.',
      'Aroma fresco y natural a limón que neutraliza malos olores al instante.'
    ],
    dilutions: [
      {
        level: 'Trapeado Diario Preventivo',
        ratio: '1:80',
        mlPerLiter: '12 ml por litro de agua',
        yieldGalon: '320 litros',
        yieldPorron: '1,600 litros',
        costPerLiter: '$1.15 MXN',
      },
      {
        level: 'Desinfección Estándar (Pasillos y sanitarios)',
        ratio: '1:40',
        mlPerLiter: '25 ml por litro de agua',
        yieldGalon: '160 litros',
        yieldPorron: '800 litros',
        costPerLiter: '$2.30 MXN',
      },
      {
        level: 'Limpieza Pesada y Choque de Olor',
        ratio: '1:20',
        mlPerLiter: '50 ml por litro de agua',
        yieldGalon: '80 litros',
        yieldPorron: '400 litros',
        costPerLiter: '$4.60 MXN',
      }
    ],
    instructions: [
      'Diluya 25 ml de producto en 1 litro de agua dentro de su cubeta de trapeado.',
      'Sumerja el trapeador, exprima y aplique uniformemente sobre la superficie.',
      'Deje secar al aire sin enjuague para conservar el poder desinfectante residual.'
    ],
    presentations: [
      { size: 'Galón (4 L)', sku: '0143', price: 368.00, cost: 204.00 }
    ],
    idealFor: 'Pisos de oficinas, sanitarios de personal, vestidores y áreas de mantenimiento.'
  },

  // 5. KEY PINO
  'pino': {
    title: 'Key Pino · Limpiador Desinfectante con Aceite Puro de Pino',
    sku: '0186',
    category: 'PISOS / ASEO GENERAL',
    nature: 'Limpiador desinfectante concentrado formulado con aceite esencial de pino y tensoactivos biodegradables de penetración profunda.',
    safeSurfaces: ['Pisos de concreto', 'Patios', 'Cuartos de basura', 'Azulejos', 'Mosaicos'],
    benefits: [
      'Poder desengrasante natural derivado del aceite de pino.',
      'Acción desodorizante penetrante que disfraza y destruye olores fétidos.',
      'Rinde hasta 228 litros de solución lista por envase de 3.8 L.'
    ],
    dilutions: [
      {
        level: 'Trapeado Diario de Áreas de Servicio',
        ratio: '1:60',
        mlPerLiter: '16 ml por litro de agua',
        yieldGalon: '228 litros',
        yieldPorron: '1,140 litros',
        costPerLiter: '$1.45 MXN',
      },
      {
        level: 'Lavado Profundo de Patios y Cuartos de Basura',
        ratio: '1:40',
        mlPerLiter: '25 ml por litro de agua',
        yieldGalon: '152 litros',
        yieldPorron: '760 litros',
        costPerLiter: '$2.18 MXN',
      },
      {
        level: 'Choque Sanitario y Remoción de Grasa',
        ratio: '1:20',
        mlPerLiter: '50 ml por litro de agua',
        yieldGalon: '76 litros',
        yieldPorron: '380 litros',
        costPerLiter: '$4.36 MXN',
      }
    ],
    instructions: [
      'Diluya la porción indicada en agua tibia o a temperatura ambiente.',
      'Talle con cepillo o mopa según la rugosidad del piso.',
      'Enjuague con agua si se retira suciedad extrema o deje secar al aire.'
    ],
    presentations: [
      { size: 'Envase 3.8 L', sku: '0186', price: 331.00, cost: 184.00 }
    ],
    idealFor: 'Pisos de estacionamientos, talleres, cuartos de máquinas y áreas de recolección de basura.'
  },

  // 6. KEY FIESTA FRUTAL
  'fiesta_frutal': {
    title: 'Key Fiesta Frutal · Limpiapisos Aromatizante Frutas Silvestres',
    sku: '6908 / 70038',
    category: 'PISOS / CONTROL DE OLORES',
    nature: 'Limpiador neutralizador de olores formulado con fijadores de perfume frutal de larga duración y pH neutro.',
    safeSurfaces: ['Pisos cerámicos', 'Porcelanato', 'Laminados', 'Mármol', 'Vinil'],
    benefits: [
      'Aromatización continua que permanece en el ambiente durante horas tras el trapeado.',
      'No opaca ni raya pisos pulidos gracias a sus tensoactivos sin sal.',
      'Rinde hasta 240 litros por galón de 4 L.'
    ],
    dilutions: [
      {
        level: 'Trapeado Frecuente y Perfumado',
        ratio: '1:60',
        mlPerLiter: '16 ml por litro de agua',
        yieldGalon: '240 litros',
        yieldPorron: '1,200 litros',
        costPerLiter: '$1.38 MXN',
      },
      {
        level: 'Aromatización Intensiva en Pasillos',
        ratio: '1:40',
        mlPerLiter: '25 ml por litro de agua',
        yieldGalon: '160 litros',
        yieldPorron: '800 litros',
        costPerLiter: '$2.06 MXN',
      }
    ],
    instructions: [
      'Agregue 16 a 25 ml por litro de agua en la cubeta exprimidora.',
      'Pase la mopa de microfibra de manera uniforme.',
      'Permita el secado natural para la fijación del perfume.'
    ],
    presentations: [
      { size: 'Galón (4 L)', sku: '6908 / 70038', price: 330.00, cost: 183.00 }
    ],
    idealFor: 'Pasillos de departamentos, áreas comunes, oficinas corporativas y escuelas.'
  },

  // 7. VANGUARD IMPREGNADOR BASE AGUA
  'impregnador': {
    title: 'Vanguard Impregnador Base Agua · Hidrofugante para Cantera y Barro',
    sku: '70101',
    category: 'PISOS / PROTECCIÓN DE PIEDRA',
    nature: 'Protector oleofóbico e hidrofugante nanotecnológico que penetra los capilares de la piedra natural sin sellar los poros ni alterar su tono natural.',
    safeSurfaces: ['Cantera', 'Barro cocido', 'Fachaleta', 'Concreto arquitectónico', 'Ladrillo aparente', 'Piedra laja'],
    benefits: [
      'Evita la absorción de agua, humedad, grasas y aceites, previniendo eflorescencias salinas y manchas.',
      'Permite la transpiración del sustrato sin crear películas plásticas que se vuelvan amarillas con el sol.',
      'Fórmula base agua, no inflamable y segura para interiores y exteriores.'
    ],
    tableTitle: 'Cobertura y Rendimiento Oficial',
    tableHeaders: ['Sustrato / Superficie', 'Modo de Aplicación', 'Dosis / Manos', 'Rendimiento por Galón (4 L)', 'Costo por m²'],
    dilutions: [
      {
        level: 'Cantera y Piedras de Alta Porosidad',
        ratio: 'Uso directo sin diluir',
        mlPerLiter: 'Aplicar 2 manos húmedo sobre húmedo',
        yieldGalon: '24 a 32 m² por galón',
        costPerLiter: '~$24.50 MXN / m²',
      },
      {
        level: 'Barro Cocido y Concreto Aparente',
        ratio: 'Uso directo sin diluir',
        mlPerLiter: 'Aplicar 1 a 2 manos con brocha o aspersor',
        yieldGalon: '32 a 48 m² por galón',
        costPerLiter: '~$16.30 MXN / m²',
      }
    ],
    instructions: [
      'La superficie debe estar limpia, desmanchada y completamente seca (mínimo 24 h sin lluvia).',
      'Aplique con brocha, rodillo o aspersor de baja presión de manera uniforme.',
      'Aplique la segunda mano antes de que la primera seque totalmente (húmedo sobre húmedo).',
      'Deje curar durante 24 horas antes de permitir el tráfico o contacto con agua.'
    ],
    presentations: [
      { size: 'Galón (4 L)', sku: '70101', price: 785.00, cost: 436.00 }
    ],
    idealFor: 'Fachadas de cantera en torres, terrazas de barro, muros llorones y andadores exteriores.'
  },

  // 8. VANGUARD CLORO
  'cloro': {
    title: 'Vanguard Cloro · Hipoclorito de Sodio Institucional Estabilizado',
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

  // 9. KEY TOTAL
  'total': {
    title: 'Key Total · Limpiador Desinfectante Multisuperficies Listo para Usar',
    sku: '0523 / 15078',
    category: 'DESINFECCIÓN DE SUPERFICIES Y AMBIENTE',
    nature: 'Limpiador desinfectante germicida de acción ultrarrápida listo para pulverizar en puntos críticos sin requerir dilución.',
    safeSurfaces: ['Escritorios', 'Manijas', 'Barandales', 'Botones de elevador', 'Mesas', 'Teclados'],
    benefits: [
      'Fórmula lista para usar (RTU): elimina errores de dilución en el personal.',
      'Acción bactericida y virucida en 30 segundos de tiempo de contacto.',
      'No deja residuo pegajoso ni mancha plásticos o metales.'
    ],
    tableTitle: 'Dosificación y Modo de Aplicación',
    tableHeaders: ['Aplicación', 'Modo de Empleo', 'Tiempo de Contacto', 'Rendimiento', 'Costo en Uso'],
    dilutions: [
      {
        level: 'Puntos Críticos de Alto Contacto',
        ratio: 'Uso directo sin diluir (Listo para usar)',
        mlPerLiter: 'Atomizar 2 a 3 disparos por m²',
        yieldGalon: 'Miles de aplicaciones por galón (4 L)',
        costPerLiter: '$0.25 MXN / aplicación',
      },
      {
        level: 'Teclados, Teléfonos y Pantallas',
        ratio: 'Rociar sobre microfibra limpia y frotar',
        mlPerLiter: '1 disparo en paño seco',
        yieldGalon: 'Seguro para electrónicos',
        costPerLiter: '$0.10 MXN / limpieza',
      }
    ],
    instructions: [
      'Rocíe directamente sobre la superficie limpia a una distancia de 20 cm.',
      'Deje actuar de 30 a 60 segundos.',
      'Pase un paño de microfibra limpio y seco.'
    ],
    presentations: [
      { size: 'Gatillo (650 ml)', sku: '15078', price: 119.00, cost: 66.00 },
      { size: 'Galón (4 L)', sku: '0523', price: 395.00, cost: 219.00 }
    ],
    idealFor: 'Desinfección continua en recepciones de oficinas, gimnasios, salas de juntas y elevadores.'
  },

  // 10. KEY GERMOQUAT
  'germoquat': {
    title: 'Key Germoquat · Germicida Detergente Cuaternario de Amonio (1:100)',
    sku: '2628',
    category: 'DESINFECCIÓN DE SUPERFICIES Y AMBIENTE',
    nature: 'Germicida concentrado a base de sales cuaternarias de amonio de 5ta generación con tensoactivos biodegradables.',
    safeSurfaces: ['Pisos', 'Paredes', 'Camillas', 'Superficies plásticas', 'Inodoros', 'Acero inox'],
    benefits: [
      'Rinde 400 litros por galón de 4 L (dilución oficial 1:100).',
      'Costo en uso imbatible: ~$1.48 MXN por litro de desinfectante listo.',
      'No se enjuaga: deja una película bacteriostática residual que previene la proliferación de hongos y virus.'
    ],
    dilutions: [
      {
        level: 'Desinfección Diaria Institucional (Sin Enjuagar)',
        ratio: '1:100',
        mlPerLiter: '10 ml por 1 litro de agua',
        yieldGalon: '400 litros',
        yieldPorron: '2,000 litros',
        costPerLiter: '$1.48 MXN',
      },
      {
        level: 'Choque Sanitario en Áreas de Alto Tráfico',
        ratio: '1:50',
        mlPerLiter: '20 ml por 1 litro de agua',
        yieldGalon: '200 litros',
        yieldPorron: '1,000 litros',
        costPerLiter: '$2.96 MXN',
      }
    ],
    instructions: [
      'Agregue 10 ml de Key Germoquat en un atomizador de 1 litro y complete con 990 ml de agua limpia.',
      'Aplique con atomizador o trapeador.',
      'NO enjuagar para permitir que actúe su película protectora continua.'
    ],
    presentations: [
      { size: 'Galón (4 L)', sku: '2628', price: 592.00, cost: 329.00 }
    ],
    idealFor: 'Consultorios médicos, spas, gimnasios de torres, áreas infantiles y oficinas.'
  },

  // 11. KEY PEROXIPRO
  'peroxipro': {
    title: 'Key PeroxiPro · Limpiador Desinfectante de Peróxido de Hidrógeno Acelerado',
    sku: '7696',
    category: 'DESINFECCIÓN DE SUPERFICIES Y AMBIENTE',
    nature: 'Limpiador, desinfectante y desodorizante multipropósito con tecnología AHP (Accelerated Hydrogen Peroxide).',
    safeSurfaces: ['Juntas de piso', 'Porcelanato', 'Azulejos', 'Superficies plásticas', 'Vidrios', 'Canceles'],
    benefits: [
      'Desinfecta y blanquea juntas de piso sin cloro ni emanaciones tóxicas.',
      'Se degrada en agua y oxígeno: máximo perfil ecológico y seguro para mascotas.',
      'Rinde hasta 256 litros de solución por galón.'
    ],
    dilutions: [
      {
        level: 'Limpieza y Desinfección Diaria Preventiva',
        ratio: '1:64',
        mlPerLiter: '15 ml por litro de agua',
        yieldGalon: '256 litros',
        yieldPorron: '1,280 litros',
        costPerLiter: '$2.85 MXN',
      },
      {
        level: 'Desinfección Clínica y Virucida de Choque',
        ratio: '1:32',
        mlPerLiter: '30 ml por litro de agua',
        yieldGalon: '128 litros',
        yieldPorron: '640 litros',
        costPerLiter: '$5.70 MXN',
      },
      {
        level: 'Blanqueo de Juntas y Desmanchado Profundo',
        ratio: '1:16',
        mlPerLiter: '60 ml por litro de agua',
        yieldGalon: '64 litros',
        yieldPorron: '320 litros',
        costPerLiter: '$11.40 MXN',
      }
    ],
    instructions: [
      'Diluya a 1:64 para trapeado o limpieza en atomizador.',
      'Para juntas sucias: aplique a 1:16, deje reposar 5 minutos y talle con cepillo de cerdas duras.',
      'Pase paño húmedo o trapee normalmente.'
    ],
    presentations: [
      { size: 'Galón (4 L)', sku: '7696', price: 730.00, cost: 405.00 }
    ],
    idealFor: 'Clínicas, vestidores húmedos, áreas de alberca, regaderas y sanitarios ejecutivos.'
  },

  // 12. KEY AEROSAN
  'aerosan': {
    title: 'Key Aerosan · Desinfectante Ambiental y Superficies Grado Quirúrgico',
    sku: '2892 / 2894 / 2895 / 15052',
    category: 'DESINFECCIÓN AMBIENTAL',
    nature: 'Aerosol y líquido desinfectante germicida con 99.999% de efectividad virucida y bactericida certificado para ambientes críticos.',
    safeSurfaces: ['Ambiente / Aire', 'Ductos de aire acondicionado', 'Mobiliario', 'Colchones', 'Sanitarios'],
    benefits: [
      'Elimina virus y bacterias suspendidos en el aire y sobre superficies al contacto.',
      'Neutraliza olores de humedad, drenaje y humo de tabaco al descomponer las moléculas causantes.',
      'Disponible en aerosol de 300g (Original, Eucalipto, Lima-Limón) y galón de 4 L para nebulizar.'
    ],
    tableTitle: 'Aplicación Oficial y Cobertura',
    tableHeaders: ['Presentación / Uso', 'Modo de Empleo', 'Tiempo de Rociado', 'Rendimiento Estimado', 'Costo por Servicio'],
    dilutions: [
      {
        level: 'Aerosol 300g (Original / Eucalipto / Lima)',
        ratio: 'Aspersión hacia el centro de la habitación',
        mlPerLiter: 'Rociado de 3 a 5 segundos',
        yieldGalon: 'Hasta 120 aplicaciones por lata',
        costPerLiter: '$1.32 MXN / disparo',
      },
      {
        level: 'Galón 4 L Líquido (Nebulización ULV)',
        ratio: 'Uso directo en equipo nebulizador',
        mlPerLiter: '10 a 15 ml por cada 10 m³ de volumen',
        yieldGalon: 'Rinde 300 a 400 habitaciones completas',
        costPerLiter: '$1.80 MXN / servicio',
      }
    ],
    instructions: [
      'Cierre ventanas y puertas del área.',
      'Pulverice hacia el centro y parte superior de la habitación durante 3 a 5 segundos.',
      'Mantenga cerrado de 10 a 15 minutos para permitir que el agente activo precipite y desinfecte el ambiente.'
    ],
    presentations: [
      { size: 'Aerosol 300g (Original/Eucalipto/Lima)', sku: '2892 / 2894 / 2895', price: 159.00, cost: 88.33 },
      { size: 'Galón (4 L)', sku: '15052', price: 620.00, cost: 344.00 }
    ],
    idealFor: 'Salas de juntas, consultorios, elevadores cerrados, cabinas y cuartos de amenidades.'
  },

  // 13. SANI 950 & SANI 950 XP / WIPES
  'sani950': {
    title: 'Sani 950 & Sani 950 XP / Wipes · Sanitizante Grado Alimenticio y Médico',
    sku: '6768 / 6769 / 15105',
    category: 'DESINFECCIÓN / SISTEMA ALISAN',
    nature: 'Sanitizante cuaternario de amonio de 5ta generación libre de enjuague para contacto seguro con alimentos y superficies clínicas.',
    safeSurfaces: ['Mesas de preparación', 'Tablas de picar', 'Básculas', 'Rebanadoras', 'Equipos médicos', 'Estetoscopios'],
    benefits: [
      'No requiere enjuague posterior: permite acelerar tiempos operativos en cocinas y consultorios.',
      'No transmite sabores ni olores residuales a los alimentos.',
      'Rendimiento en galón: dilución 1:200 rinde 800 litros listos para uso.'
    ],
    tableTitle: 'Dosificación y Rendimiento Oficial',
    tableHeaders: ['Formato', 'Modo de Empleo', 'Tiempo de Contacto', 'Rendimiento', 'Costo en Uso'],
    dilutions: [
      {
        level: 'Galón 4 L Concentrado (Mesas y equipo)',
        ratio: '1:200 en agua limpia',
        mlPerLiter: '5 ml por 1 litro de agua',
        yieldGalon: '800 litros de solución preparada',
        costPerLiter: '$0.98 MXN / L',
      },
      {
        level: 'Gatillo XP 650 ml Listo para Usar',
        ratio: 'Uso directo inmediato',
        mlPerLiter: 'Atomizar y dejar actuar 60 segundos',
        yieldGalon: 'Cientos de metros cuadrados',
        costPerLiter: '$0.35 MXN / aplicación',
      },
      {
        level: 'Sani 950 XP Wipes (Bote c/80 toallas)',
        ratio: 'Toalla preimpregnada descartable',
        mlPerLiter: '1 toallita desinfecta 2 m²',
        yieldGalon: '80 servicios certificados',
        costPerLiter: '$3.50 MXN / toallita',
      }
    ],
    instructions: [
      'Limpie previamente los residuos gruesos o grasa de la superficie.',
      'Aplique la solución de Sani 950 por aspersión o con paño/wipe.',
      'Deje secar al aire sin enjuagar con agua.'
    ],
    presentations: [
      { size: 'Gatillo 650 ml XP', sku: '15105', price: 169.00, cost: 93.00 },
      { size: 'Galón (4 L)', sku: '6768', price: 785.00, cost: 436.00 },
      { size: 'Wipes Bote c/80 toallas', sku: '6769', price: 280.00, cost: 155.00 }
    ],
    idealFor: 'Cocinas de restaurantes, cafeterías de oficina, comedores industriales y consultorios.'
  },

  // 14. KEY DESENGRASANTE COCINA PLUS (ALISAN)
  'desengrasante_alisan': {
    title: 'Key Desengrasante Cocina Plus · Sistema Alisan®',
    sku: '6367 / 6368 / 6369 / 15058 / 15111',
    category: 'COCINA PROFESIONAL - SISTEMA ALISAN',
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
      { size: 'Gatillo (650 ml)', sku: '6367 / 15111', price: 169.00, cost: 93.00 },
      { size: 'Galón (4 L)', sku: '6368 / 15058', price: 455.00, cost: 252.00 },
      { size: 'Porrón (20 L)', sku: '6369', price: 2014.00, cost: 1118.00 },
    ],
    idealFor: 'Áreas de asadores en amenidades, palapas, salones polivalentes y cocinas de condominios.'
  },

  // 15. KEY LAVALOZA CONCENTRADO
  'lavaloza': {
    title: 'Key Lavaloza Concentrado · Lavado Manual de Loza y Cristalería',
    sku: '0123',
    category: 'COCINA / LAVADO DE LOZA',
    nature: 'Detergente líquido neutro de alto poder espumante y corte instantáneo de grasa sin dejar residuo opaco ni rayar la cristalería.',
    safeSurfaces: ['Copas de cristal', 'Vajillas', 'Cubiertos', 'Ollas de acero inoxidable', 'Policarbonato'],
    benefits: [
      'Galón altamente concentrado: rinde hasta 80 litros de solución jabonosa en tina de lavado.',
      'Corta la grasa animal y salsas al instante con baja espuma que ahorra agua de enjuague.',
      'Fórmula con dermoprotectores que no resecan ni agrietan las manos de los lavadores.'
    ],
    dilutions: [
      {
        level: 'Tina de Lavado Profesional de Loza',
        ratio: '1:20',
        mlPerLiter: '50 ml por 1 litro de agua en tarja',
        yieldGalon: '80 litros de solución espumosa',
        yieldPorron: '400 litros',
        costPerLiter: '$3.45 MXN',
      },
      {
        level: 'Dosificación Directa en Esponja',
        ratio: 'Uso directo en fibra',
        mlPerLiter: '5 ml en fibra humedecida',
        yieldGalon: 'Miles de platos limpios por galón',
        yieldPorron: 'N/A',
        costPerLiter: '$0.05 MXN / pieza lavada',
      }
    ],
    instructions: [
      'Dosifique 50 ml por cada litro de agua en la tina o tarja de lavado.',
      'Sumerja los trastes y talle con esponja suave o fibra cero rayas.',
      'Enjuague con agua limpia a chorro y deje escurrir para secado espontáneo.'
    ],
    presentations: [
      { size: 'Galón (4 L)', sku: '0123', price: 276.00, cost: 153.00 }
    ],
    idealFor: 'Cocinas de condominios, amenidades, salones de eventos y cafeterías de corporativos.'
  },

  // 16. KEY LIMPIAHORNOS GEL
  'limpiahornos': {
    title: 'Key Limpiahornos Gel · Desincrustante de Cochambre y Grasa Carbonizada',
    sku: '0287',
    category: 'COCINA / HORNOS Y PARRILLAS',
    nature: 'Gel cáustico desincrustante de alta viscosidad que se adhiere a paredes verticales disolviendo cochambre petrificado.',
    safeSurfaces: ['Interiores de hornos', 'Comales de fierro', 'Parrillas', 'Campanas de extracción', 'Quemadores'],
    benefits: [
      'Consistencia en gel que no escurre: máxima adherencia y tiempo de acción en paredes de hornos.',
      'Disuelve carbón y cochambre quemado sin necesidad de raspar agresivamente con espátula.',
      'Fórmula segura que no desprende vapores asfixiantes como productos comerciales.'
    ],
    tableTitle: 'Modo de Empleo y Rendimiento',
    tableHeaders: ['Equipo / Superficie', 'Modo de Aplicación', 'Tiempo de Reposo', 'Rendimiento (1 L)', 'Costo por Limpieza'],
    dilutions: [
      {
        level: 'Hornos y Comales con Cochambre Pesado',
        ratio: 'Uso directo con brocha',
        mlPerLiter: 'Aplicar capa uniforme en superficie tibia (50°C)',
        yieldGalon: '8 a 10 limpiezas de horno completo',
        costPerLiter: '$22.00 MXN / horno',
      },
      {
        level: 'Parrillas y Quemadores de Estufa',
        ratio: 'Uso directo',
        mlPerLiter: 'Distribuir con brocha y dejar actuar 15 min',
        yieldGalon: '15 a 20 parrillas industriales',
        costPerLiter: '$12.00 MXN / parrilla',
      }
    ],
    instructions: [
      'Caliente ligeramente el horno o comal a unos 50°C y apáguelo antes de aplicar.',
      'Aplique el gel con brocha de manera uniforme cubriendo todo el cochambre.',
      'Deje actuar durante 20 minutos para que el químico saponifique la grasa.',
      'Retire con esponja o fibra humedecida en agua caliente y enjuague perfectamente.'
    ],
    presentations: [
      { size: 'Litro (1 L)', sku: '0287', price: 219.00, cost: 121.00 }
    ],
    idealFor: 'Asadores de amenidades en torres, cocinas industriales y hornos de restaurantes.'
  },

  // 17. KEY PARRILLAS PASO 1 Y PASO 2
  'parrillas': {
    title: 'Key Limpiador de Parrillas Paso 1 y Paso 2 · Sistema Bifásico Profesional',
    sku: '6423 / 6428',
    category: 'COCINA PROFESIONAL',
    nature: 'Sistema térmico para limpieza de planchas de cocina en caliente. Paso 1 (desincrustante a 150°C), Paso 2 (neutralizador pulidor).',
    safeSurfaces: ['Planchas de cocina de acero al carbón', 'Planchas de cromo', 'Parrillas industriales'],
    benefits: [
      'Permite limpiar la plancha en plena operación a 150°C en menos de 5 minutos.',
      'No raya el temple ni la superficie pulida de la plancha.',
      'El Paso 2 neutraliza cualquier residuo alcalino asegurando inocuidad alimentaria.'
    ],
    tableTitle: 'Protocolo de Limpieza Oficial',
    tableHeaders: ['Paso del Proceso', 'Modo de Aplicación', 'Tiempo de Acción', 'Rendimiento por Galón (4 L)', 'Costo por Servicio'],
    dilutions: [
      {
        level: 'Paso 1 (Desincrustante Térmico)',
        ratio: 'Vierta 100 ml directo sobre plancha caliente (150°C)',
        mlPerLiter: 'Raspar con jalador térmico de teflón',
        yieldGalon: '40 servicios completos por galón',
        costPerLiter: '$14.50 MXN / servicio',
      },
      {
        level: 'Paso 2 (Neutralizador y Brillo)',
        ratio: 'Vierta 50 ml tras retirar el Paso 1',
        mlPerLiter: 'Extender con paño térmico y retirar residuo',
        yieldGalon: '80 servicios completos por galón',
        costPerLiter: '$7.80 MXN / servicio',
      }
    ],
    instructions: [
      'Asegúrese de que la plancha esté caliente a 150°C y vierta el Paso 1.',
      'Empuje los residuos carbonizados hacia el depósito de grasa con el jalador de teflón.',
      'Vierta el Paso 2 para neutralizar el químico y resaltar el brillo del metal.',
      'Pase un paño limpio humedecido en agua para dejar la superficie lista para cocinar.'
    ],
    presentations: [
      { size: 'Paso 1 Galón (4 L)', sku: '6423', price: 580.00, cost: 322.00 },
      { size: 'Paso 2 Galón (4 L)', sku: '6428', price: 624.00, cost: 346.00 }
    ],
    idealFor: 'Planchas de asadores en amenidades de condominios y cocinas profesionales.'
  },

  // 18. KEY DESINFECTANTE DE FRUTAS Y VERDURAS
  'desinfectante_frutas': {
    title: 'Key Desinfectante de Frutas y Verduras · Grado Alimenticio Sin Enjuague',
    sku: '4633',
    category: 'COCINA / DESINFECCIÓN DE ALIMENTOS',
    nature: 'Sanitizante orgánico no clorado formulado para desinfección de vegetales, frutas y legumbres por inmersión.',
    safeSurfaces: ['Frutas', 'Verduras', 'Hortalizas', 'Tubérculos', 'Hielo'],
    benefits: [
      'Elimina bacterias patógenas, coliformes y quistes parasitarios sin cambiar olor ni sabor.',
      'No requiere enjuague posterior: preserva la frescura y vida de anaquel de los vegetales.',
      'Rinde 800 litros de solución por galón (dilución oficial 1:200).'
    ],
    dilutions: [
      {
        level: 'Inmersión de Frutas y Verduras',
        ratio: '1:200',
        mlPerLiter: '5 ml por 1 litro de agua limpia',
        yieldGalon: '800 litros de solución lista',
        yieldPorron: '4,000 litros',
        costPerLiter: '$0.68 MXN',
      },
      {
        level: 'Sanitización de Cuchillos y Tablas de Picar',
        ratio: '1:100',
        mlPerLiter: '10 ml por 1 litro de agua',
        yieldGalon: '400 litros',
        yieldPorron: '2,000 litros',
        costPerLiter: '$1.36 MXN',
      }
    ],
    instructions: [
      'Lave previamente los vegetales con agua para retirar tierra o suciedad gruesa.',
      'Sumerja completamente en la solución de Key Frutas y Verduras durante 5 a 10 minutos.',
      'Retire y escurra. NO enjuague para mantener la protección microbiológica.'
    ],
    presentations: [
      { size: 'Galón (4 L)', sku: '4633', price: 545.00, cost: 302.00 }
    ],
    idealFor: 'Cocinetas corporativas, salones de eventos, cafeterías y comedores de empleados.'
  },

  // 19. KEY L-BIO
  'lbio': {
    title: 'Key L-Bio · Digestor Bacteriano Enzimático para Trampas de Grasa',
    sku: '0618',
    category: 'COCINA / BIOTECNOLOGÍA',
    nature: 'Inóculo biológico concentrado con bacterias y enzimas que digieren activamente grasas, aceites y residuos orgánicos en drenajes.',
    safeSurfaces: ['Trampas de grasa', 'Tarjas de lavado', 'Tuberías de drenaje de cocina', 'Cárcamos'],
    benefits: [
      'Licúa las capas duras de grasa en la trampa evitando costosos desazolves manuales de emergencia.',
      'Elimina de raíz los olores a drenaje y descomposición biológica en cocinas.',
      'Ecológico: no daña tuberías de PVC ni genera calor como la soda cáustica.'
    ],
    tableTitle: 'Dosis de Mantenimiento Preventivo',
    tableHeaders: ['Capacidad de la Trampa', 'Frecuencia de Dosificación', 'Dosis al Cierre de Turno', 'Rendimiento (Galón)', 'Costo Diario'],
    dilutions: [
      {
        level: 'Trampa Pequeña (Tarja de cocina hasta 50 L)',
        ratio: 'Dosificación directa nocturna',
        mlPerLiter: '50 a 100 ml directo al desagüe',
        yieldGalon: 'Rinde 40 a 80 aplicaciones',
        costPerLiter: '$11.50 MXN / día',
      },
      {
        level: 'Trampa Mediana/Grande (Comedores y restaurantes)',
        ratio: 'Dosificación directa al cierre',
        mlPerLiter: '150 a 200 ml directo a la trampa',
        yieldGalon: 'Rinde 20 a 30 días continuos',
        costPerLiter: '$23.00 MXN / día',
      }
    ],
    instructions: [
      'Dosifique siempre al finalizar la jornada de trabajo, cuando no haya flujo de agua caliente ni detergentes.',
      'Vierta la dosis recomendada directo en la tarja más cercana a la trampa de grasa.',
      'Deje correr un poco de agua tibia (apenas para transportar el producto a la trampa) y deje reposar toda la noche.'
    ],
    presentations: [
      { size: 'Galón (4 L)', sku: '0618', price: 920.00, cost: 511.00 }
    ],
    idealFor: 'Cocinas de torres residenciales, salones polivalentes con asadores y comedores de personal.'
  },

  // 20. KEY DESINCRUSTANTE COCINA PLUS
  'desincrustante_cocina': {
    title: 'Key Desincrustante Cocina Plus · Removedor de Sarro y Sales Minerales',
    sku: '15057',
    category: 'COCINA / DESINCRUSTACIÓN',
    nature: 'Ácido orgánico desincrustante formulado para retirar depósitos de sarro blanco calcáreo en lavavajillas y baños maría.',
    safeSurfaces: ['Lavavajillas automáticas', 'Baños maría', 'Cafeteras industriales', 'Marmitas'],
    benefits: [
      'Restaura la eficiencia térmica y el flujo de agua en tuberías de lavavajillas.',
      'Libre de vapores corrosivos y seguro para acero inoxidable si se usa según ficha.',
      'Rinde 16 ciclos completos de desincrustación por galón.'
    ],
    dilutions: [
      {
        level: 'Lavavajillas Automática (Ciclo en Vacío)',
        ratio: '250 ml por ciclo de lavado',
        mlPerLiter: 'Vierta directo a la tina con agua a 60°C',
        yieldGalon: '16 desincrustaciones completas',
        yieldPorron: '80 desincrustaciones',
        costPerLiter: '$32.00 MXN / ciclo',
      },
      {
        level: 'Baño María y Equipos Térmicos',
        ratio: '1:10 con agua tibia',
        mlPerLiter: '100 ml por 1 litro de agua',
        yieldGalon: '40 litros de solución desincrustante',
        yieldPorron: '200 litros',
        costPerLiter: '$8.00 MXN / L',
      }
    ],
    instructions: [
      'Llene el equipo con agua tibia a temperatura de operación.',
      'Agregue el producto y deje recircular de 15 a 30 minutos.',
      'Drene la solución y enjuague con agua limpia abundante.'
    ],
    presentations: [
      { size: 'Galón (4 L)', sku: '15057', price: 512.00, cost: 284.00 }
    ],
    idealFor: 'Lavavajillas de áreas de amenidades y equipos térmicos de cafeterías corporativas.'
  },

  // 21. KEY SANITIZANTE COCINA
  'sanitizante_cocina': {
    title: 'Key Sanitizante Cocina · Desinfección de Superficies Alimentarias',
    sku: '15054',
    category: 'COCINA PROFESIONAL',
    nature: 'Sanitizante libre de cloro para superficies de contacto con alimentos en áreas de preparación.',
    safeSurfaces: ['Barras de granito', 'Tablas de picar', 'Cuchillos', 'Refrigeradores', 'Encimeras'],
    benefits: [
      'No contamina alimentos ni deja olores químicos residuales.',
      'Fácil dosificación y secado rápido.',
      'Rendimiento por galón: hasta 400 litros diluidos.'
    ],
    dilutions: [
      {
        level: 'Sanitización Diaria de Mesas de Trabajo',
        ratio: '1:100',
        mlPerLiter: '10 ml por litro de agua',
        yieldGalon: '400 litros',
        yieldPorron: '2,000 litros',
        costPerLiter: '$1.45 MXN',
      }
    ],
    instructions: [
      'Aplique con atomizador sobre la superficie previamente lavada.',
      'Deje actuar 60 segundos y retire el exceso o deje secar al aire.'
    ],
    presentations: [
      { size: 'Galón (4 L)', sku: '15054', price: 580.00, cost: 322.00 }
    ],
    idealFor: 'Áreas de asadores en amenidades, cocinetas y cafeterías de empresas.'
  },

  // 22. KEY BAÑO FORTE
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

  // 23. KEY BAÑO FÓRMULA 503
  '503': {
    title: 'Key Baño (Fórmula 503) · Limpiador Diario No Ácido',
    sku: '0543 / 15023 / 15024',
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
      },
      {
        level: 'Lavabos de Mármol y Azulejos',
        ratio: '1:10',
        mlPerLiter: '100 ml por litro de agua',
        yieldGalon: '40 litros',
        yieldPorron: '200 litros',
        costPerLiter: '$12.37 MXN',
      }
    ],
    instructions: [
      'Aplique la solución diluida con atomizador sobre la grifería o cancel.',
      'Frote suavemente con microfibra para retirar manchas de agua y jabón.',
      'Enjuague o pase paño húmedo y seque con paño limpio para un brillo espejo.'
    ],
    presentations: [
      { size: 'Litro (1 L)', sku: '0542 / 15023', price: 189.00, cost: 95.00 },
      { size: 'Galón (4 L)', sku: '0543 / 15024', price: 495.00, cost: 275.00 },
    ],
    idealFor: 'Limpieza diaria de grifos finos, canceles de baño en amenidades y lavabos delicados.'
  },

  // 24. KEY BAÑO PIEDRA NATURAL
  'bano_piedra': {
    title: 'Key Baño Piedra Natural · Especial para Sanitarios con Mármol y Granito',
    sku: '15040',
    category: 'BAÑOS / MÁRMOL Y PIEDRA',
    nature: 'Limpiador desinfectante con pH neutro balanceado diseñado para baños de lujo revestidos en mármol, cantera o granito.',
    safeSurfaces: ['Muros de mármol', 'Placas de granito', 'Cubiertas de lavabo', 'Pisos de regadera de piedra'],
    benefits: [
      'pH estrictamente neutro: no produce corrosión ni manchas blancas en mármol.',
      'Disuelve grasa de jabón y sarro incipiente con agentes quelantes seguros.',
      'Rinde 80 litros de solución por galón.'
    ],
    dilutions: [
      {
        level: 'Mantenimiento Diario de Regaderas y Muros',
        ratio: '1:20',
        mlPerLiter: '50 ml por 1 litro de agua',
        yieldGalon: '80 litros',
        yieldPorron: '400 litros',
        costPerLiter: '$6.20 MXN',
      },
      {
        level: 'Limpieza de Choque en Canceles de Cristal',
        ratio: '1:10',
        mlPerLiter: '100 ml por 1 litro de agua',
        yieldGalon: '40 litros',
        yieldPorron: '200 litros',
        costPerLiter: '$12.40 MXN',
      }
    ],
    instructions: [
      'Atomice la solución diluida sobre los muros de mármol y canceles.',
      'Frote con esponja suave o microfibra.',
      'Enjuague con agua y seque con jalador o paño para prevenir marcas de agua.'
    ],
    presentations: [
      { size: 'Galón (4 L)', sku: '15040', price: 496.00, cost: 275.00 }
    ],
    idealFor: 'Baños de departamentos residenciales de lujo, vestidores y spas.'
  },

  // 25. KEY PLOMERO
  'plomero': {
    title: 'Key Plomero · Desatascador Líquido Concentrado de Tuberías y Drenajes',
    sku: '15037',
    category: 'BAÑOS / DRENAJES',
    nature: 'Fórmula líquida densa de acción cáustica concentrada que penetra el agua estancada hasta disolver el tapón orgánico.',
    safeSurfaces: ['Tuberías de PVC', 'Tuberías de fierro colado', 'Sifones de lavabo', 'Coladeras de regadera'],
    benefits: [
      'Densidad superior al agua: viaja directo al tapón sin diluirse en el espejo de agua.',
      'Disuelve cabellos, grasa corporal, restos de jabón y materia orgánica en minutos.',
      'Seguro para tuberías de PVC cuando se siguen las instrucciones de aplicación.'
    ],
    tableTitle: 'Protocolo de Desobstrucción Oficial',
    tableHeaders: ['Problema / Grado', 'Dosis al Sifón', 'Tiempo de Reposo', 'Rendimiento (1 L)', 'Costo por Servicio'],
    dilutions: [
      {
        level: 'Desagüe Lento / Mantenimiento Preventivo',
        ratio: 'Uso directo sin diluir',
        mlPerLiter: '200 a 250 ml directo a la coladera',
        yieldGalon: '4 a 5 servicios por botella',
        costPerLiter: '$44.00 MXN / servicio',
      },
      {
        level: 'Tapón Severo de Cabellos o Grasa',
        ratio: 'Uso directo sin diluir',
        mlPerLiter: '500 ml directo a la tubería',
        yieldGalon: '2 servicios completos por botella',
        costPerLiter: '$88.00 MXN / servicio',
      }
    ],
    instructions: [
      'Retire el agua acumulada si es posible y vierta de 250 a 500 ml directo al orificio del desagüe.',
      'Deje actuar durante 20 a 30 minutos sin usar la instalación.',
      'Deje correr abundante agua caliente del grifo durante 2 minutos para arrastrar los residuos disueltos.'
    ],
    presentations: [
      { size: 'Litro (1 L)', sku: '15037', price: 176.00, cost: 98.00 }
    ],
    idealFor: 'Coladeras de regadera en gimnasios, departamentos, tarjas de cocina y sanitarios de visitas.'
  },

  // 26. KEY LIMPIAVIDRIOS
  'limpiavidrios': {
    title: 'Key Limpiavidrios · Cristales y Espejos Secado Rápido',
    sku: '0167 / 0168 / 0169 / 15112',
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

  // 27. KEY 1000 (USOS)
  'key1000': {
    title: 'Key 1000 (Usos) · Detergente Líquido Neutro Biodegradable Multipropósito',
    sku: '0173',
    category: 'ASEO GENERAL',
    nature: 'Detergente líquido biodegradable de uso múltiple formulado para penetrar, emulsionar y desprender mugre ligera y polvo en cualquier superficie.',
    safeSurfaces: ['Muros pintados', 'Pisos cerámicos', 'Plásticos', 'Mobiliario de oficina', 'Cancelería de aluminio'],
    benefits: [
      'No es abrasivo ni irrita las manos del personal operativo.',
      'Seguro para pinturas, maderas selladas y superficies sensibles.',
      'Rinde hasta 160 litros de solución limpiadora por galón de 4 L.'
    ],
    dilutions: [
      {
        level: 'Mantenimiento General y Trapeado Neutro',
        ratio: '1:40',
        mlPerLiter: '25 ml por 1 litro de agua',
        yieldGalon: '160 litros',
        yieldPorron: '800 litros',
        costPerLiter: '$1.90 MXN',
      },
      {
        level: 'Limpieza Media (Paredes, puertas y escritorios)',
        ratio: '1:20',
        mlPerLiter: '50 ml por 1 litro de agua',
        yieldGalon: '80 litros',
        yieldPorron: '400 litros',
        costPerLiter: '$3.80 MXN',
      },
      {
        level: 'Limpieza Pesada de Mobiliario y Equipos',
        ratio: '1:10',
        mlPerLiter: '100 ml por 1 litro de agua',
        yieldGalon: '40 litros',
        yieldPorron: '200 litros',
        costPerLiter: '$7.60 MXN',
      }
    ],
    instructions: [
      'Diluya de 25 a 50 ml en un litro de agua.',
      'Aplique con paño de microfibra, esponja o mopa.',
      'Frote suavemente y deje secar o pase paño limpio.'
    ],
    presentations: [
      { size: 'Galón (4 L)', sku: '0173', price: 304.00, cost: 169.00 }
    ],
    idealFor: 'Limpieza general de oficinas, mobiliario escolar, corporativos y departamentos.'
  },

  // 28. KEY ÚNICO DESENGRASANTE
  'unico_desengrasante': {
    title: 'Key Único Desengrasante · Desengrasante Concentrado Base Agua',
    sku: '0533',
    category: 'ASEO GENERAL / DESENGRASE INDUSTRIAL',
    nature: 'Desengrasante base agua libre de solventes agresivos formulado para disolver grasas de origen mineral y vegetal.',
    safeSurfaces: ['Pisos de estacionamiento', 'Maquinaria', 'Herramientas', 'Andenes de carga', 'Concreto'],
    benefits: [
      'Sustituye solventes inflamables peligrosos (thinner, gasolina) con máxima seguridad.',
      'Biodegradable: no ataca el medio ambiente ni emite vapores irritantes.',
      'Rinde 80 litros de solución por galón.'
    ],
    dilutions: [
      {
        level: 'Pisos de Estacionamiento y Áreas de Tráfico',
        ratio: '1:20',
        mlPerLiter: '50 ml por 1 litro de agua',
        yieldGalon: '80 litros',
        yieldPorron: '400 litros',
        costPerLiter: '$5.10 MXN',
      },
      {
        level: 'Maquinaria y Grasa Pesada Mecánica',
        ratio: '1:10',
        mlPerLiter: '100 ml por 1 litro de agua',
        yieldGalon: '40 litros',
        yieldPorron: '200 litros',
        costPerLiter: '$10.20 MXN',
      }
    ],
    instructions: [
      'Diluya a 1:20 para lavado con máquina o cepillo.',
      'Talle sobre las manchas de grasa y deje reposar 5 minutos.',
      'Enjuague con agua a presión o jalador de pisos.'
    ],
    presentations: [
      { size: 'Galón (4 L)', sku: '0533', price: 408.00, cost: 227.00 }
    ],
    idealFor: 'Sótanos de estacionamiento en torres, cuartos de generadores y andenes.'
  },

  // 29. KEY ENVIRO D
  'enviro_d': {
    title: 'Key Enviro D · Desengrasante Ecológico con D-Limoneno Cítrico',
    sku: '2501',
    category: 'ASEO GENERAL / DESENGRASE ECOLÓGICO',
    nature: 'Desengrasante de alta potencia a base de terpenos naturales de naranja (D-Limoneno) que disuelve gomas, asfalto y grasa.',
    safeSurfaces: ['Pisos epóxicos', 'Metales', 'Herramientas', 'Cancelería', 'Vidrios'],
    benefits: [
      'Poder solvente natural del D-Limoneno: disuelve grasa pesada, ceras y chapopote.',
      'Aroma cítrico natural refrescante en el área de trabajo.',
      'Rinde hasta 120 litros por galón.'
    ],
    dilutions: [
      {
        level: 'Limpieza y Desengrase General',
        ratio: '1:30',
        mlPerLiter: '33 ml por 1 litro de agua',
        yieldGalon: '120 litros',
        yieldPorron: '600 litros',
        costPerLiter: '$4.20 MXN',
      },
      {
        level: 'Remoción de Chapopote, Asfalto y Resinas',
        ratio: '1:15',
        mlPerLiter: '66 ml por 1 litro de agua',
        yieldGalon: '60 litros',
        yieldPorron: '300 litros',
        costPerLiter: '$8.40 MXN',
      }
    ],
    instructions: [
      'Aplique con aspersor o trapo sobre la suciedad.',
      'Deje que los terpenos cítricos disuelvan la mancha durante 3 minutos.',
      'Retire con paño de microfibra o agua.'
    ],
    presentations: [
      { size: 'Galón (4 L)', sku: '2501', price: 504.00, cost: 280.00 }
    ],
    idealFor: 'Mantenimiento de áreas comunes, talleres, remoción de ceras viejas y andadores.'
  },

  // 30. KEY DESENGRASANTE FORTE
  'desengrasante_forte': {
    title: 'Key Desengrasante Forte · Desengrasante Alcalino de Choque Pesado',
    sku: '15000',
    category: 'ASEO GENERAL / GRASA PESADA',
    nature: 'Desengrasante industrial de alta alcalinidad formulado para remoción de películas de grasa petrificada en concreto y metal.',
    safeSurfaces: ['Pisos de concreto rudo', 'Fierro fundido', 'Rampas de acceso', 'Talleres'],
    benefits: [
      'Saponificación inmediata de aceites minerales y grasas pesadas.',
      'Excelente poder de arrastre para lavado a presión.',
      'Rinde 80 litros por galón.'
    ],
    dilutions: [
      {
        level: 'Pisos de Concreto y Talleres',
        ratio: '1:20',
        mlPerLiter: '50 ml por litro de agua',
        yieldGalon: '80 litros',
        yieldPorron: '400 litros',
        costPerLiter: '$6.50 MXN',
      },
      {
        level: 'Manchas Directas de Aceite de Motor',
        ratio: '1:10 a Directo',
        mlPerLiter: '100 ml por litro de agua',
        yieldGalon: '40 litros',
        yieldPorron: '200 litros',
        costPerLiter: '$13.00 MXN',
      }
    ],
    instructions: [
      'Aplique con cepillo de cerdas duras sobre la mancha.',
      'Talle enérgicamente y enjuague con agua abundante.'
    ],
    presentations: [
      { size: 'Galón (4 L)', sku: '15000', price: 520.00, cost: 289.00 }
    ],
    idealFor: 'Estacionamientos subterráneos de torres y talleres mecánicos.'
  },

  // 31. KEY BRILLO CREMA
  'brillo': {
    title: 'Key Brillo Crema · Pulidor y Desmanchador Micro-Abrasivo No Rayante',
    sku: '0387 / 0388 / 15018',
    category: 'ASEO GENERAL / PULIDO DE SUPERFICIES',
    nature: 'Crema limpiadora pulidora con partículas minerales ultrafinas suspendidas que desmanchan sin rayar superficies delicadas.',
    safeSurfaces: ['Acero inoxidable', 'Porcelana sanitaria', 'Azulejos', 'Melamina', 'Cromados'],
    benefits: [
      'Restaura el lustre original de llaves cromadas y tarjas de acero sin micro-rayones.',
      'Elimina sarro fino, grasa seca y óxido incipiente con mínimo esfuerzo mecánico.',
      'Rinde meses de uso continuo por botella gracias a su textura cremosa concentrada.'
    ],
    tableTitle: 'Modo de Empleo y Rendimiento',
    tableHeaders: ['Superficie', 'Modo de Aplicación', 'Dosis Recomendada', 'Rendimiento', 'Costo en Uso'],
    dilutions: [
      {
        level: 'Porcelana, Azulejos y Grifería Cromada',
        ratio: 'Uso directo en paño o fibra blanca',
        mlPerLiter: '5 a 10 g frotando en círculos',
        yieldGalon: 'Cientos de muebles de baño por litro',
        costPerLiter: '$0.80 MXN / aplicación',
      },
      {
        level: 'Muebles de Melamina y Acero Inoxidable',
        ratio: 'Uso directo en microfibra húmeda',
        mlPerLiter: 'Frotar suavemente y retirar con paño limpio',
        yieldGalon: 'Meses de rendimiento continuo',
        costPerLiter: '$0.50 MXN / limpieza',
      }
    ],
    instructions: [
      'Agite el envase y aplique una pequeña porción sobre una esponja suave o paño húmedo.',
      'Frote la superficie con movimientos circulares ligeros.',
      'Enjuague con agua o retire el residuo con paño húmedo, finalizando con paño seco para abrillantar.'
    ],
    presentations: [
      { size: 'Bote Crema 320g', sku: '15018', price: 95.00, cost: 52.00 },
      { size: 'Litro (1 L)', sku: '0387', price: 175.00, cost: 97.00 },
      { size: 'Galón (4 L)', sku: '0388', price: 580.00, cost: 322.00 }
    ],
    idealFor: 'Lavabos de mármol, cancelería, barras de recepción de formica y cocinetas.'
  },

  // 32. KEY LCM PLUS
  'lcm_plus': {
    title: 'Key LCM Plus · Limpiador Antiestático para Equipos de Cómputo y Oficina',
    sku: '15083',
    category: 'ASEO GENERAL / ELECTRÓNICA Y OFICINA',
    nature: 'Espuma en aerosol formulada con agentes antiestáticos para la limpieza exterior de equipos informáticos sin riesgo eléctrico.',
    safeSurfaces: ['Carcasas de PC y laptops', 'Teclados', 'Impresoras', 'Teléfonos y conmutadores', 'Mobiliario de oficina'],
    benefits: [
      'Espuma densa controlada: no escurre líquido hacia el interior de los componentes electrónicos.',
      'Crea una capa antiestática que repele la fijación de polvo.',
      'Disuelve grasa dactilar, tinta de pluma y polvo adherido.'
    ],
    tableTitle: 'Aplicación en Equipos de Oficina',
    tableHeaders: ['Equipo / Objeto', 'Modo de Empleo', 'Dosis por Limpieza', 'Rendimiento por Lata (340g)', 'Costo por Servicio'],
    dilutions: [
      {
        level: 'Teclados, Carcasas de Cómputo e Impresoras',
        ratio: 'Rociar sobre paño de microfibra (no directo al equipo)',
        mlPerLiter: '1 disparo corto en paño',
        yieldGalon: '120 a 150 equipos completos por lata',
        costPerLiter: '$1.20 MXN / equipo',
      },
      {
        level: 'Escritorios de Melamina y Conmutadores',
        ratio: 'Rociar en paño y frotar',
        mlPerLiter: 'Disparo suave',
        yieldGalon: 'Meses de servicio corporativo',
        costPerLiter: '$0.80 MXN / servicio',
      }
    ],
    instructions: [
      'Agite la lata y rocíe la espuma sobre un paño de microfibra limpio y seco.',
      'Frote la superficie del equipo con el paño humedecido.',
      'Pase el lado seco de la microfibra para un acabado impecable.'
    ],
    presentations: [
      { size: 'Aerosol 340g', sku: '15083', price: 169.00, cost: 94.00 }
    ],
    idealFor: 'Oficinas corporativas, centros de cómputo, cabinas de seguridad y recepciones.'
  },

  // 33. KEY LX-100 & REMOVEDOR DE ETIQUETAS Y GRAFFITI
  'lx100_etiquetas': {
    title: 'Key LX-100 & Removedor de Etiquetas y Graffiti · Solvente Dieléctrico de Alta Evaporación',
    sku: '0557 / 15081 / 15082 / 4213',
    category: 'ASEO GENERAL / SOLVENTES ESPECIALES',
    nature: 'Solvente desengrasante puro de secado rápido formulado para desintegrar adhesivos de etiquetas, silicones frescos y marcas de graffiti.',
    safeSurfaces: ['Cristales', 'Metales pintados', 'Canceles de aluminio', 'Cerámica', 'Motores eléctricos apagados'],
    benefits: [
      'Disuelve el pegamento de etiquetas y cintas sin dejar mancha gomosa ni rayar el sustrato.',
      'Elimina rayones de plumón indeleble y pintura de aerosol fresca en cristales y metales.',
      'Dieléctrico: seguro para limpieza de contactos y tarjetas electrónicas fuera de línea.'
    ],
    tableTitle: 'Protocolo de Remoción Oficial',
    tableHeaders: ['Tipo de Residuo', 'Modo de Aplicación', 'Tiempo de Contacto', 'Rendimiento', 'Costo en Uso'],
    dilutions: [
      {
        level: 'Etiquetas Adhesivas y Cintas en Vidrio / Metal',
        ratio: 'Uso directo con algodón o paño',
        mlPerLiter: 'Aplicar sobre la etiqueta, esperar 1 min y retirar',
        yieldGalon: 'Cientos de etiquetas removidas',
        costPerLiter: '$0.40 MXN / etiqueta',
      },
      {
        level: 'Marcas de Plumón Permanente y Graffiti Fresco',
        ratio: 'Uso directo en microfibra',
        mlPerLiter: 'Frotar hasta disolver el pigmento',
        yieldGalon: 'Decenas de m² de metal/vidrio',
        costPerLiter: '$3.50 MXN / m²',
      }
    ],
    instructions: [
      'Aplique una pequeña cantidad directamente sobre la etiqueta o mancha de pegamento.',
      'Deje penetrar durante 60 segundos.',
      'Retire el residuo con espátula plástica o paño de microfibra.'
    ],
    presentations: [
      { size: 'Envase 250 ml', sku: '15081 / 15082', price: 145.00, cost: 80.00 },
      { size: 'Litro (1 L)', sku: '0557', price: 340.00, cost: 189.00 },
      { size: 'Galón (4 L)', sku: '4213', price: 1190.00, cost: 661.00 }
    ],
    idealFor: 'Entrega de departamentos nuevos, cristales con calcomanías de obra, elevadores y marcos.'
  },

  // 34. KEY DESINCRUSTANTE POST OBRA
  'desincrustante_post_obra': {
    title: 'Key Desincrustante Post Obra · Limpiador Final de Obra para Restos de Cemento',
    sku: '15100 / 15101',
    category: 'ASEO GENERAL / FINAL DE OBRA',
    nature: 'Solución desincrustante ácida formulada para remover restos de fraguado, cemento, boquilla, salitre y mortero en pisos nuevos.',
    safeSurfaces: ['Pisos de porcelanato', 'Azulejos cerámicos', 'Fachadas de ladrillo', 'Cantera no pulida', 'Concreto'],
    benefits: [
      'Elimina el velo blanco de boquilla y restos de yeso sin quemar el color original de las piezas.',
      'No genera emanaciones de gas cloro como el ácido muriático común.',
      'Rinde hasta 24 litros por galón de 4 L.'
    ],
    dilutions: [
      {
        level: 'Velo Blanco de Boquilla y Salitre en Pisos Nuevos',
        ratio: '1:5 con agua limpia',
        mlPerLiter: '167 ml por 1 litro de agua',
        yieldGalon: '24 litros de solución activa',
        yieldPorron: '120 litros',
        costPerLiter: '$16.50 MXN',
      },
      {
        level: 'Salpicaduras Gruesas de Cemento y Mezcla',
        ratio: '1:3 con agua limpia',
        mlPerLiter: '250 ml por 1 litro de agua',
        yieldGalon: '16 litros de solución de choque',
        yieldPorron: '80 litros',
        costPerLiter: '$24.75 MXN',
      }
    ],
    instructions: [
      'Humedezca previamente el piso con agua limpia para saturar los poros de las juntas.',
      'Aplique la solución diluida y talle con cepillo de cerdas duras o máquina rotativa.',
      'Deje actuar de 3 a 5 minutos (evite que se seque en la superficie).',
      'Enjuague con abundante agua limpia para neutralizar y retire con jalador de hule.'
    ],
    presentations: [
      { size: 'Litro (1 L)', sku: '15100', price: 135.00, cost: 75.00 },
      { size: 'Galón (4 L)', sku: '15101', price: 396.00, cost: 220.00 }
    ],
    idealFor: 'Limpieza de entrega de departamentos en preventa, remodelaciones y fachadas nuevas.'
  },

  // 35. KEY REMOVEDOR DE ÓXIDO
  'removedor_oxido': {
    title: 'Key Gel / Líquido Removedor de Óxido & Cápsula Anti-Óxido',
    sku: '15107 / 15108 / 15109',
    category: 'ESPECIALIDADES / CONTROL DE CORROSIÓN',
    nature: 'Tratamiento desoxidante químico fosfatizante que disuelve la corrosión ferrosa protegiendo el metal contra futura oxidación.',
    safeSurfaces: ['Barandales de fierro', 'Tornillería', 'Herrajes', 'Manchas de óxido en pisos cerámicos'],
    benefits: [
      'Elimina el óxido sin desgastar mecánicamente el metal con lija.',
      'Fosfatiza la superficie metálica, dejándola lista para pintura o sellado.',
      'Versión en gel que se sostiene en barrotes y superficies verticales.'
    ],
    tableTitle: 'Modo de Empleo y Rendimiento',
    tableHeaders: ['Aplicación / Pieza', 'Modo de Empleo', 'Tiempo de Reposo', 'Rendimiento (1 L)', 'Costo en Uso'],
    dilutions: [
      {
        level: 'Barandales y Metales Oxidados',
        ratio: 'Uso directo con brocha',
        mlPerLiter: 'Aplicar capa uniforme sobre el óxido (5 a 10 min)',
        yieldGalon: '15 a 20 m² de superficie metálica',
        costPerLiter: '$12.00 MXN / m²',
      },
      {
        level: 'Manchas de Óxido en Pisos Cerámicos',
        ratio: 'Uso directo sobre la mancha',
        mlPerLiter: 'Reposar 3 minutos y retirar con paño húmedo',
        yieldGalon: 'Cientos de manchas por botella',
        costPerLiter: '$0.50 MXN / mancha',
      }
    ],
    instructions: [
      'Aplique el producto con brocha sobre la pieza oxidada.',
      'Deje actuar de 5 a 10 minutos mientras el óxido se disuelve químicamente.',
      'Retire con trapo húmedo y enjuague con agua limpia.'
    ],
    presentations: [
      { size: 'Gel Removedor de Óxido 1 L', sku: '15107', price: 219.00, cost: 121.00 },
      { size: 'Líquido Removedor de Óxido 1 L', sku: '15108', price: 195.00, cost: 108.00 },
      { size: 'Cápsula Anti-Óxido 1 pz', sku: '15109', price: 89.00, cost: 49.00 }
    ],
    idealFor: 'Mantenimiento de barandales en amenidades, escaleras de emergencia y cancelería expuesta.'
  },

  // 36. KEY REMOVEDOR DE CONCRETO
  'removedor_concreto': {
    title: 'Key Removedor de Concreto · Desincrustante Orgánico Biodegradable',
    sku: '15103',
    category: 'ESPECIALIDADES / REMOCIÓN DE CONCRETO',
    nature: 'Ácido orgánico biodegradable no corrosivo que reacciona con la matriz calcárea del concreto desprendiéndolo sin atacar pintura ni vidrio.',
    safeSurfaces: ['Cancelería de aluminio', 'Cristales', 'Vehículos y camiones', 'Herramientas de obra'],
    benefits: [
      'Seguro para pinturas horneadas y plásticos: no decolora ni mancha.',
      'Disuelve salpicaduras de cemento duro sin raspar con navajas que rayen los vidrios.',
      '100% biodegradable y seguro para el operador.'
    ],
    tableTitle: 'Modo de Empleo y Rendimiento',
    tableHeaders: ['Superficie / Equipo', 'Modo de Aplicación', 'Tiempo de Reposo', 'Rendimiento (1 L)', 'Costo por Servicio'],
    dilutions: [
      {
        level: 'Canceles de Aluminio y Ventanales Salpicados',
        ratio: 'Atomizar directo sin diluir',
        mlPerLiter: 'Dejar actuar 10 a 15 min y enjuagar a chorro',
        yieldGalon: '10 a 15 m² de superficie limpia',
        costPerLiter: '$18.00 MXN / m²',
      },
      {
        level: 'Herramientas y Revolvedoras de Obra',
        ratio: 'Uso directo con brocha',
        mlPerLiter: 'Aplicar y cepillar al reblandecer',
        yieldGalon: 'Limpieza completa de equipo de obra',
        costPerLiter: '$25.00 MXN / equipo',
      }
    ],
    instructions: [
      'Atomice directamente sobre las salpicaduras de concreto en seco.',
      'Deje actuar de 10 a 15 minutos mientras el producto espuma y ablanda el cemento.',
      'Enjuague con agua a presión o pase una esponja para retirar el residuo.'
    ],
    presentations: [
      { size: 'Litro (1 L)', sku: '15103', price: 245.00, cost: 136.00 }
    ],
    idealFor: 'Retiro de cemento en ventanales de departamentos nuevos, cancelería y herramientas.'
  },

  // 37. LÍNEA ACERO INOXIDABLE (ALISAN)
  'acero': {
    title: 'Línea Especializada Acero Inoxidable · Sistema Alisan®',
    sku: '6383 / 6492 / 15063',
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
        costPerLiter: '$685.00 MXN / L (~$1.50 / cabina)',
      },
      {
        level: 'Limpiador en Polvo (Restauración profunda)',
        ratio: 'Directo sobre esponja húmeda',
        mlPerLiter: 'Espolvorear sobre superficie y frotar a la veta',
        yieldGalon: 'Bote de 3 kg rinde meses',
        costPerLiter: '$752.00 MXN / bote',
      }
    ],
    instructions: [
      'Lustrador: Aplique unas gotas en microfibra limpia y frote siguiendo la veta del acero.',
      'Polvo: Humedezca la superficie, espolvoree, frote en dirección de la veta y enjuague.'
    ],
    presentations: [
      { size: 'Lustrador 1 L (Líquido)', sku: '6492 / 15063', price: 685.00, cost: 380.00 },
      { size: 'Limpiador en Polvo 3 kg', sku: '6383', price: 752.00, cost: 417.00 },
    ],
    idealFor: 'Cabinas y marcos exteriores de elevadores en torres residenciales y corporativas.'
  },

  // 38. KEY M-CONTROL
  'm_control': {
    title: 'Key M-Control · Tratamiento Atrapa-Polvo para Mopas y Microfibras',
    sku: '2240',
    category: 'ASEO GENERAL / MOPING',
    nature: 'Tratamiento electrostático líquido formulado para magnetizar polvo, pelusas y cabellos en fundas de mopa seca y paños sin dejar residuo grasoso.',
    safeSurfaces: ['Fundas de mopa de algodón', 'Paños de microfibra', 'Pisos de mármol', 'Porcelanato', 'Madera'],
    benefits: [
      'Multiplica la retención de polvo fino en un 300% respecto a una mopa seca sin tratamiento.',
      'No resbala ni deja películas aceitosas en mármol pulido.',
      'Rinde 20 a 30 impregnaciones completas de funda de mop por litro.'
    ],
    tableTitle: 'Dosificación para Fundas de Mop',
    tableHeaders: ['Medida de Mop / Paño', 'Modo de Impregnación', 'Dosis Recomendada', 'Frecuencia de Uso', 'Costo en Uso'],
    dilutions: [
      {
        level: 'Mop Seco de 60 cm a 90 cm',
        ratio: 'Atomizar sobre la funda limpia y seca',
        mlPerLiter: '30 a 50 ml (dejar reposar 8 horas)',
        yieldGalon: '20 a 30 impregnaciones por litro',
        costPerLiter: '$4.80 MXN / servicio',
      },
      {
        level: 'Paños de Microfibra de Mano',
        ratio: 'Atomizar 2 disparos sobre paño seco',
        mlPerLiter: '5 ml por microfibra',
        yieldGalon: '200 paños tratados por litro',
        costPerLiter: '$0.50 MXN / paño',
      }
    ],
    instructions: [
      'Lave y seque perfectamente la funda del mop antes de impregnar.',
      'Atomice de 30 a 50 ml de Key M-Control uniformemente sobre las fibras.',
      'Enrolle la funda en una bolsa plástica y deje reposar durante 8 horas para que el producto se absorba.',
      'Pase la mopa sobre el piso sin levantarla para barrer el polvo de forma magnética.'
    ],
    presentations: [
      { size: 'Litro (1 L)', sku: '2240', price: 145.00, cost: 80.00 }
    ],
    idealFor: 'Lobbies de doble altura, pasillos largos de torres, canchas y salones de eventos.'
  },

  // 39. KEY DLC DETERGENTE LAVANDERÍA
  'lavanderia_dlc': {
    title: 'Key DLC · Detergente Líquido Concentrado para Ropa y Textiles',
    sku: '15013',
    category: 'LAVANDERÍA',
    nature: 'Detergente líquido concentrado profesional de penetración rápida en fibras textiles que remueve suciedad y manchas sin decolorar.',
    safeSurfaces: ['Algodón', 'Fibras sintéticas', 'Toallas', 'Sábanas', 'Uniformes de personal', 'Mantelería'],
    benefits: [
      'Rinde hasta 54 cargas completas de 5 kg por galón de 4 L.',
      'Costo de apenas ~$5.80 MXN por carga de lavado.',
      'Baja espuma y fácil enjuague: previene incrustaciones de jabón en lavadoras automáticas.'
    ],
    tableTitle: 'Dosificación Oficial por Carga de Ropa',
    tableHeaders: ['Tipo de Carga', 'Capacidad de Lavadora', 'Dosis Oficial por Carga', 'Rendimiento por Galón (4 L)', 'Costo por Lavada'],
    dilutions: [
      {
        level: 'Carga Ligera / Mantenimiento Diario',
        ratio: 'Dosificar en depósito de detergente',
        mlPerLiter: '75 ml por carga de 5 kg',
        yieldGalon: '54 cargas completas',
        costPerLiter: '$5.80 MXN / carga',
      },
      {
        level: 'Carga Pesada / Blancos Institucionales',
        ratio: 'Dosificar en lavadora de alta capacidad',
        mlPerLiter: '125 ml por carga de 9 a 11 kg',
        yieldGalon: '27 a 32 cargas completas',
        costPerLiter: '$11.60 MXN / carga',
      }
    ],
    instructions: [
      'Clasifique la ropa por color y tipo de tejido.',
      'Vierta de 75 a 125 ml de Key DLC en el dispensador de la lavadora.',
      'Inicie el ciclo de lavado habitual.'
    ],
    presentations: [
      { size: 'Galón (4 L)', sku: '15013', price: 314.00, cost: 174.00 }
    ],
    idealFor: 'Lavanderías de condominios, uniformes de intendencia y mantenimiento, y toallas de amenidades.'
  },

  // 40. KEY SLC SUAVIZANTE LAVANDERÍA
  'lavanderia_slc': {
    title: 'Key SLC · Suavizante Líquido Concentrado Antiestático',
    sku: '15014',
    category: 'LAVANDERÍA',
    nature: 'Suavizante textil concentrado que ablanda las fibras de toallas y sábanas, eliminando la estática y aportando frescura aromática duradera.',
    safeSurfaces: ['Toallas de gimnasio y alberca', 'Sábanas', 'Ropa de cama', 'Uniformes'],
    benefits: [
      'Rinde hasta 100 cargas de 5 kg por galón de 4 L.',
      'Elimina la fricción y rigidez en toallas de amenidades, haciéndolas sumamente agradables al tacto.',
      'Reduce arrugas facilitando el planchado de sábanas y uniformes.'
    ],
    tableTitle: 'Dosificación en Ciclo de Enjuague',
    tableHeaders: ['Tipo de Carga', 'Capacidad de Lavadora', 'Dosis en Último Enjuague', 'Rendimiento por Galón (4 L)', 'Costo por Carga'],
    dilutions: [
      {
        level: 'Carga Regular de Ropa',
        ratio: 'Dosificar en ciclo de enjuague',
        mlPerLiter: '40 ml por carga de 5 kg',
        yieldGalon: '100 cargas completas',
        costPerLiter: '$3.10 MXN / carga',
      },
      {
        level: 'Carga Pesada de Toallas y Blancos',
        ratio: 'Dosificar en ciclo de enjuague',
        mlPerLiter: '80 ml por carga de 9 a 11 kg',
        yieldGalon: '50 cargas completas',
        costPerLiter: '$6.20 MXN / carga',
      }
    ],
    instructions: [
      'Agregue el producto en el cajón de suavizante de la lavadora en el último ciclo de enjuague.',
      'Para lavado manual: diluya 30 ml por cada 10 litros de agua de enjuague y remoje 5 minutos.'
    ],
    presentations: [
      { size: 'Galón (4 L)', sku: '15014', price: 310.00, cost: 172.00 }
    ],
    idealFor: 'Toallas de alberca y gimnasio en torres residenciales, uniformes y mantelería.'
  },

  // 41. KEY OXI DESMANCHADOR LAVANDERÍA
  'lavanderia_oxi': {
    title: 'Key Oxi Desmanchador · Potenciador de Lavado con Oxígeno Activo',
    sku: '15002',
    category: 'LAVANDERÍA',
    nature: 'Quitamanchas y blanqueador para ropa formulado con oxígeno activo (sin cloro), 100% seguro para ropa blanca y de color.',
    safeSurfaces: ['Ropa blanca', 'Ropa de color', 'Prendas delicadas', 'Toallas', 'Mantelería'],
    benefits: [
      'Elimina manchas persistentes de vino, café, sangre y comida sin dañar las fibras.',
      'Potencia la acción del detergente resaltando los colores y recuperando el blanco puro.',
      'Rinde hasta 33 cargas por galón.'
    ],
    tableTitle: 'Dosificación y Rendimiento Oficial',
    tableHeaders: ['Nivel de Manchas', 'Modo de Empleo', 'Dosis Recomendada', 'Rendimiento por Galón (4 L)', 'Costo por Carga'],
    dilutions: [
      {
        level: 'Potenciador de Lavado Diario',
        ratio: 'Junto con el detergente',
        mlPerLiter: '120 ml (1/2 taza) para carga de 5 kg',
        yieldGalon: '33 cargas completas',
        costPerLiter: '$8.90 MXN / carga',
      },
      {
        level: 'Carga de Blancos con Manchas Pesadas',
        ratio: 'Lavado automático intensivo',
        mlPerLiter: '240 ml (1 taza) para carga de 9 kg',
        yieldGalon: '17 cargas completas',
        costPerLiter: '$17.80 MXN / carga',
      },
      {
        level: 'Remojo Previo de Manchas Difíciles',
        ratio: 'Tina de agua tibia (10 L)',
        mlPerLiter: '120 ml en 10 litros de agua (30 min)',
        yieldGalon: 'Decenas de remojos',
        costPerLiter: '$8.90 MXN / remojo',
      }
    ],
    instructions: [
      'Para lavado normal: agregue 120 ml junto con Key DLC en el dispensador de la lavadora.',
      'Para manchas localizadas: aplique directo sobre la mancha, frote suavemente y lave de inmediato.'
    ],
    presentations: [
      { size: 'Galón (4 L)', sku: '15002', price: 294.00, cost: 163.00 }
    ],
    idealFor: 'Blancos de amenidades, mantelería de salones de eventos y uniformes de personal.'
  },

  // 42. KEY PRELAVADOR LAVANDERÍA
  'lavanderia_prelavador': {
    title: 'Key Prelavador · Quitamanchas Dirigido para Cuellos, Puños y Grasa',
    sku: '0107 / 15114',
    category: 'LAVANDERÍA',
    nature: 'Desmanchador líquido enzimático de aplicación directa diseñado para disolver grasa corporal, maquillaje y sudor en cuellos y puños.',
    safeSurfaces: ['Cuellos de camisas', 'Puños', 'Prendas con manchas de grasa', 'Mantelería'],
    benefits: [
      'Penetra las capas profundas de grasa corporal y mugre antes del ciclo de lavado.',
      'Evita el tallado manual agresivo que deshilacha las costuras de las camisas.',
      'Rinde 150 a 200 camisas por litro.'
    ],
    tableTitle: 'Modo de Empleo y Rendimiento',
    tableHeaders: ['Tipo de Mancha', 'Modo de Aplicación', 'Tiempo de Reposo', 'Rendimiento (1 L)', 'Costo por Prenda'],
    dilutions: [
      {
        level: 'Cuellos y Puños de Camisas',
        ratio: 'Atomizar directo sin diluir',
        mlPerLiter: '2 a 3 atomizaciones sobre la zona sucia',
        yieldGalon: '150 a 200 camisas por litro',
        costPerLiter: '$0.65 MXN / camisa',
      },
      {
        level: 'Manchas de Grasa y Alimentos en Manteles',
        ratio: 'Uso directo localizado',
        mlPerLiter: 'Rociar directo sobre la mancha',
        yieldGalon: 'Cientos de desmanchados',
        costPerLiter: '$0.80 MXN / mancha',
      }
    ],
    instructions: [
      'Rocíe directamente sobre el cuello, puño o mancha de grasa.',
      'Deje reposar de 3 a 5 minutos para que las enzimas degraden la suciedad.',
      'Coloque la prenda en la lavadora con su ciclo habitual.'
    ],
    presentations: [
      { size: 'Gatillo (650 ml)', sku: '15114', price: 139.00, cost: 77.00 },
      { size: 'Litro (1 L)', sku: '0107', price: 185.00, cost: 103.00 }
    ],
    idealFor: 'Uniformes ejecutivos de recepción, seguridad, intendencia y mantelería de banquetes.'
  },

  // 43. KEY AUTOSHAMPOO SECO
  'auto_shampoo': {
    title: 'Key Autoshampoo Seco · Lavado y Brillo de Carrocería Sin Agua',
    sku: '15110',
    category: 'AUTOS',
    nature: 'Fórmula encapsuladora polimérica que levanta el polvo sin rayar la pintura, aportando brillo y repelencia hidrofóbica sin gastar una gota de agua.',
    safeSurfaces: ['Pintura automotriz', 'Metales esmaltados', 'Rines y copas', 'Cristales y espejos exteriores'],
    benefits: [
      'Lava y encera un automóvil completo en 15 minutos sin manguera ni cubetas.',
      'Ahorra hasta 150 litros de agua por vehículo lavado.',
      'Rinde de 6 a 8 lavadas completas por envase de 650 ml.'
    ],
    tableTitle: 'Modo de Empleo y Rendimiento',
    tableHeaders: ['Tamaño de Vehículo', 'Modo de Empleo', 'Consumo por Lavada', 'Rendimiento por Botella (650 ml)', 'Costo por Auto'],
    dilutions: [
      {
        level: 'Automóvil Sedán / Compacto',
        ratio: 'Uso directo con atomizador',
        mlPerLiter: '80 a 100 ml por auto',
        yieldGalon: '6 a 8 lavadas completas',
        costPerLiter: '$22.00 MXN / auto',
      },
      {
        level: 'Camioneta SUV / Pick-up',
        ratio: 'Uso directo sección por sección',
        mlPerLiter: '120 a 150 ml por vehículo',
        yieldGalon: '4 a 5 lavadas completas',
        costPerLiter: '$33.00 MXN / camioneta',
      }
    ],
    instructions: [
      'Agite el producto antes de usar.',
      'Atomice sobre la carrocería seca sección por sección (ej. cofre, puerta).',
      'Pase un paño de microfibra doblado en 4 para retirar la suciedad en una sola dirección.',
      'Pase una segunda microfibra limpia y seca para pulir y resaltar el brillo espejo.'
    ],
    presentations: [
      { size: 'Gatillo 650 ml', sku: '15110', price: 169.00, cost: 94.00 }
    ],
    idealFor: 'Flotillas vehiculares de condominios, autos de administración y servicios de concierge.'
  },

  // 44. KEY PROTECTOR Y ABRILLANTADOR DE LLANTAS
  'auto_llantas': {
    title: 'Key Protector y Abrillantador de Llantas · Acabado Negro Húmedo Duradero',
    sku: '2250',
    category: 'AUTOS',
    nature: 'Emulsión de silicones especiales de penetración profunda que humecta el caucho protegiéndolo de los rayos solares y otorgando acabado negro brillante.',
    safeSurfaces: ['Neumáticos / Llantas de caucho', 'Tapetes de hule', 'Defensas de plástico negro'],
    benefits: [
      'Evita la resequedad y el agrietamiento prematuro de las llantas causado por el sol.',
      'No se escurre ni salpica los rines o la carrocería al rodar el vehículo.',
      'Rinde de 130 a 200 autos completos (4 llantas) por galón de 4 L.'
    ],
    tableTitle: 'Rendimiento y Dosificación',
    tableHeaders: ['Aplicación', 'Modo de Empleo', 'Dosis por Auto (4 Llantas)', 'Rendimiento por Galón (4 L)', 'Costo por Auto'],
    dilutions: [
      {
        level: '4 Neumáticos de Automóvil Sedán',
        ratio: 'Uso directo con esponja o brocha',
        mlPerLiter: '20 a 30 ml por juego de 4 llantas',
        yieldGalon: '130 a 200 autos completos',
        costPerLiter: '$2.80 MXN / auto',
      },
      {
        level: 'Llantas de Camioneta Todo Terreno',
        ratio: 'Uso directo con aplicador',
        mlPerLiter: '40 ml por vehículo',
        yieldGalon: '100 camionetas completas',
        costPerLiter: '$4.20 MXN / camioneta',
      }
    ],
    instructions: [
      'Asegúrese de que las llantas estén limpias y completamente secas.',
      'Aplique el producto con esponja aplicadora o brocha sobre el contorno del neumático.',
      'Deje secar durante 5 minutos para que el silicón penetre el hule.'
    ],
    presentations: [
      { size: 'Galón (4 L)', sku: '2250', price: 420.00, cost: 233.00 }
    ],
    idealFor: 'Mantenimiento vehicular corporativo, flotillas de mantenimiento y servicio automotriz.'
  },

  // 45. KEY ABRILLANTADOR VINIL / TABLEROS
  'auto_abrillantador': {
    title: 'Key Abrillantador · Restaurador de Molduras, Vinil y Tableros',
    sku: '2252',
    category: 'AUTOS',
    nature: 'Lustrador y acondicionador antiestático formulado para restaurar el tono original y brillo de tableros, vinil y plásticos de automóviles.',
    safeSurfaces: ['Tableros de automóvil', 'Molduras de puertas', 'Vestiduras de vinil', 'Consolas centrales'],
    benefits: [
      'No deja sensación grasosa ni pegajosa que ensucie las manos o la ropa.',
      'Filtro UV que protege plásticos contra decoloración y resequedad.',
      'Rinde más de 100 interiores completos por litro.'
    ],
    tableTitle: 'Modo de Empleo y Rendimiento',
    tableHeaders: ['Área del Vehículo', 'Modo de Aplicación', 'Dosis por Servicio', 'Rendimiento por Litro (1 L)', 'Costo por Servicio'],
    dilutions: [
      {
        level: 'Tablero y Puertas Interiores',
        ratio: 'Uso directo sobre microfibra',
        mlPerLiter: '5 a 10 ml por interior completo',
        yieldGalon: '100 a 150 interiores',
        costPerLiter: '$1.20 MXN / auto',
      },
      {
        level: 'Defensas y Plásticos Exteriores',
        ratio: 'Uso directo con esponja',
        mlPerLiter: '10 a 15 ml',
        yieldGalon: '70 a 100 autos',
        costPerLiter: '$1.80 MXN / auto',
      }
    ],
    instructions: [
      'Limpie el polvo de la superficie antes de aplicar.',
      'Vierta unas gotas sobre un paño de microfibra limpio.',
      'Extienda uniformemente en círculos sobre el vinil o plástico.'
    ],
    presentations: [
      { size: 'Litro (1 L)', sku: '2252', price: 165.00, cost: 92.00 }
    ],
    idealFor: 'Interiores de vehículos ejecutivos, carros de golf de condominios y autos de mantenimiento.'
  },

  // 46. KEY ALFOMBRAS Y TAPICERÍAS (LAVALFOMBRAS)
  'alfombras': {
    title: 'Key Alfombras y Tapicerías (Lavalfombras) · Shampoo Neutro de Espuma Seca',
    sku: '15005',
    category: 'ALFOMBRAS Y TAPICERÍAS',
    nature: 'Shampoo neutro concentrado que produce abundante espuma seca de alta estabilidad para limpiar tapetes, tapicerías y alfombras sin empapar.',
    safeSurfaces: ['Alfombras de oficina', 'Tapetes decorativos', 'Tapicería de sillas y sillones', 'Interiores de autos'],
    benefits: [
      'Espuma seca: encapsula la suciedad sin humedecer la base de la alfombra, secando en tiempo récord.',
      'Evita malos olores a humedad y moho debajo del piso alfombrado.',
      'Rinde 28 litros de solución espumosa por galón de 4 L (1:7) o hasta 200 L en máquina (1:50).'
    ],
    dilutions: [
      {
        level: 'Lavado Manual con Cepillo (Espuma Seca)',
        ratio: '1:7 con agua limpia',
        mlPerLiter: '140 ml por 1 litro de agua (batir hasta hacer espuma)',
        yieldGalon: '28 litros de solución espumosa',
        yieldPorron: '140 litros',
        costPerLiter: '$14.50 MXN',
      },
      {
        level: 'Máquina de Inyección-Succión / Lavado Automático',
        ratio: '1:50 en el tanque de la máquina',
        mlPerLiter: '20 ml por 1 litro de agua',
        yieldGalon: '200 litros de solución para máquina',
        yieldPorron: '1,000 litros',
        costPerLiter: '$2.90 MXN',
      }
    ],
    instructions: [
      'Aspire perfectamente el área para retirar polvo y tierra suelta.',
      'Bata la solución diluida (140 ml en 1 L de agua) vigorosamente hasta generar abundante espuma.',
      'Aplique ÚNICAMENTE la espuma con un cepillo de cerdas suaves y talle en círculos.',
      'Recoja la espuma sucia con un paño limpio y deje secar.'
    ],
    presentations: [
      { size: 'Galón (4 L)', sku: '15005', price: 406.00, cost: 225.00 }
    ],
    idealFor: 'Salas de juntas alfombradas, pasillos de torres, sillas de oficina y salas de estar.'
  },

  // 47. KEY QUITAMANCHAS ALFOMBRAS
  'quitamanchas_alfombras': {
    title: 'Key Quitamanchas Alfombras · Desmanchador Localizado de Tapicería',
    sku: '15045',
    category: 'ALFOMBRAS',
    nature: 'Limpiador de acción localizada diseñado para disolver manchas puntuales de café, vino, tinta, grasa y calzado en textiles sin decolorar.',
    safeSurfaces: ['Tapicería de sillas ejecutivas', 'Sillones de salas de espera', 'Alfombras de alto tráfico'],
    benefits: [
      'Remueve manchas secas sin necesidad de lavar la alfombra o mueble completo.',
      'Fórmula no decolorante: protege tonos oscuros y claros.',
      'Rinde cientos de servicios de desmanchado puntual por galón.'
    ],
    tableTitle: 'Modo de Empleo y Rendimiento',
    tableHeaders: ['Tipo de Mancha', 'Modo de Aplicación', 'Tiempo de Contacto', 'Rendimiento', 'Costo en Uso'],
    dilutions: [
      {
        level: 'Manchas de Café, Refresco y Alimentos',
        ratio: 'Atomizar directo sin diluir',
        mlPerLiter: '2 a 3 disparos sobre la mancha',
        yieldGalon: 'Cientos de desmanchados',
        costPerLiter: '$0.90 MXN / mancha',
      },
      {
        level: 'Grasa y Manchas Negras de Zapatos',
        ratio: 'Uso directo con cepillo suave',
        mlPerLiter: 'Cepillar suavemente de afuera hacia adentro',
        yieldGalon: 'Cientos de áreas tratadas',
        costPerLiter: '$1.20 MXN / mancha',
      }
    ],
    instructions: [
      'Retire el exceso de líquido con una toalla de papel absorbente.',
      'Rocíe el quitamanchas directamente sobre la zona manchada.',
      'Presione con un paño blanco limpio de afuera hacia el centro (sin frotar con fuerza).',
      'Deje secar y aspire si es necesario.'
    ],
    presentations: [
      { size: 'Galón (4 L)', sku: '15045', price: 435.00, cost: 242.00 }
    ],
    idealFor: 'Sillas de salas de juntas corporativas, lobbies residenciales y alfombras de pasillo.'
  },

  // 48. BIOKEY (CONTROL DE PLAGAS)
  'biokey': {
    title: 'Biokey · Insecticida Concentrado Oficial KEY® (100 ml)',
    sku: '0586 / 0621',
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
      { size: 'Frasco 100 ml', sku: '0586 / 0621', price: 275.00, cost: 153.00 },
    ],
    idealFor: 'Control de plagas en cuartos de basura, cocinetas, bodegas y perímetros de edificios y empresas.'
  },

  // 49. MAXFORCE GEL CUCARACHAS
  'maxforce': {
    title: 'Maxforce Gel Cucarachas (30g) · Cebo Insecticida Grado Profesional',
    sku: '0626',
    category: 'CONTROL DE PLAGAS',
    nature: 'Cebo cucarachicida profesional en jeringa formulado con hidrametilnona de máxima palatabilidad y efecto dominó de eliminación en nido.',
    safeSurfaces: ['Bisagras de gabinetes', 'Detrás de refrigeradores', 'Marcos de puertas', 'Motores de equipos'],
    benefits: [
      'Efecto dominó: las cucarachas consumen el cebo, regresan al nido y contagian al resto de la colonia.',
      'No requiere desocupar áreas ni genera olores ni nubes químicas.',
      'Rinde hasta 300 puntos de cebo por jeringa de 30g.'
    ],
    tableTitle: 'Dosificación Oficial por Jeringa',
    tableHeaders: ['Grado de Infestación', 'Método de Colocación', 'Dosis Recomendada', 'Rendimiento por Jeringa (30g)', 'Costo por Punto'],
    dilutions: [
      {
        level: 'Mantenimiento Preventivo (Oficinas / Cocinetas)',
        ratio: 'Puntos de gel de 5 mm de diámetro',
        mlPerLiter: '1 gota por cada 2 metros lineales',
        yieldGalon: 'Hasta 300 puntos de cebo',
        costPerLiter: '$1.50 MXN / punto',
      },
      {
        level: 'Infestación Alta (Cuartos de basura y cocinas)',
        ratio: 'Puntos de gel de 5 mm',
        mlPerLiter: '2 a 3 gotas por metro cerca de nidos',
        yieldGalon: '100 a 150 aplicaciones intensivas',
        costPerLiter: '$3.00 MXN / metro',
      }
    ],
    instructions: [
      'Retire la tapa protectora de la jeringa.',
      'Aplique pequeñas gotas de gel del tamaño de una lenteja (5 mm) en esquinas, bisagras y detrás de electrodomésticos.',
      'No aplique sprays insecticidas cerca del gel para no contaminar el cebo atrayente.',
      'Inspeccione y renueve los puntos de cebo cada 30 a 60 días si fueron consumidos.'
    ],
    presentations: [
      { size: 'Jeringa 30g', sku: '0626', price: 450.00, cost: 250.00 }
    ],
    idealFor: 'Cocinetas corporativas, cuartos de basura, elevadores y cuartos de control eléctrico.'
  },

  // 50. KLERAT ANT GEL HORMIGAS
  'klerat': {
    title: 'Klerat Ant Gel Hormigas (10g) · Cebo Formicida Específico',
    sku: '0630',
    category: 'CONTROL DE PLAGAS',
    nature: 'Cebo atrayente de alta apetencia formulado específicamente para eliminar colonias de hormigas de interiores y exteriores.',
    safeSurfaces: ['Senderos de hormigas', 'Bordes de ventanas', 'Zoclos', 'Jardineras interiores'],
    benefits: [
      'Elimina el hormiguero completo: las hormigas obreras llevan el gel a la reina.',
      'Fórmula limpia e inodora que se adhiere sin escurrir.',
      'Hasta 50 puntos de cebo por jeringa de 10g.'
    ],
    tableTitle: 'Dosificación y Rendimiento',
    tableHeaders: ['Área de Infestación', 'Método de Colocación', 'Dosis Recomendada', 'Rendimiento por Jeringa (10g)', 'Costo por Aplicación'],
    dilutions: [
      {
        level: 'Senderos Activos y Grietas',
        ratio: 'Puntos de gel a lo largo del sendero',
        mlPerLiter: '1 punto de 0.2g por metro lineal',
        yieldGalon: 'Hasta 50 puntos de cebo',
        costPerLiter: '$3.20 MXN / punto',
      }
    ],
    instructions: [
      'Identifique los senderos o caminos donde caminan las hormigas.',
      'Coloque pequeñas gotas de gel a lo largo de su camino.',
      'Permita que las hormigas se alimenten libremente sin molestarlas ni aplicar sprays.'
    ],
    presentations: [
      { size: 'Jeringa 10g', sku: '0630', price: 160.00, cost: 89.00 }
    ],
    idealFor: 'Oficinas, jardineras de lobby, terrazas y cocinetas con presencia de hormigas.'
  },

  // 51. KEY JABÓN ESPUMA (MANOS)
  'jabon_espuma': {
    title: 'Key Jabón de Manos Espuma · Almendras, Rocío y Antibacterial',
    sku: '2168 / 6123 / 6128 / 2194 / 2195 / 6980 / 6981 / 6982',
    category: 'LAVADO DE MANOS',
    nature: 'Jabón dermoprotector enriquecido con glicerina y emolientes formulado para generar microespuma densa al contacto con el aire.',
    safeSurfaces: ['Manos / Piel'],
    benefits: [
      'Ahorra hasta un 50% de producto y agua de enjuague comparado con jabón líquido tradicional.',
      'Un galón de 4 L rinde hasta 8,000 lavadas de manos completas.',
      'Costo de apenas ~$0.06 MXN por lavado de manos.',
      'Disponibilidad en galón rellenable y cartuchos cerrados higiénicos KOP de 1 L.'
    ],
    dilutions: [
      {
        level: 'Galón 4 L en Jabonera Espumadora',
        ratio: 'Uso directo en dosificador espumador',
        mlPerLiter: '0.4 a 0.6 ml por disparo denso',
        yieldGalon: 'Hasta 8,000 lavados por galón',
        yieldPorron: 'N/A',
        costPerLiter: '$0.06 MXN / lavado',
      },
      {
        level: 'Cartucho KOP 1 L Sellado',
        ratio: 'Instalación en jabonera KOP',
        mlPerLiter: '0.5 ml por disparo',
        yieldGalon: 'Hasta 2,000 lavados por cartucho',
        yieldPorron: 'N/A',
        costPerLiter: '$0.08 MXN / lavado',
      }
    ],
    instructions: [
      'Vierta el producto directamente en la jabonera espumadora (no diluir con agua).',
      'Presione una sola vez el dispensador sobre las manos secas o ligeramente húmedas.',
      'Frote la espuma entre los dedos y palmas durante 20 segundos y enjuague con agua.'
    ],
    presentations: [
      { size: 'Galón 4 L (Almendras/Rocío/Antibacterial)', sku: '6123 / 6128 / 2168', price: 503.00, cost: 279.00 },
      { size: 'Cartucho KOP 1 L', sku: '2194 / 2195 / 6980', price: 165.00, cost: 92.00 }
    ],
    idealFor: 'Sanitarios corporativos, baños de lobbies de doble altura, gimnasios y áreas infantiles.'
  },

  // 52. KEY JABÓN CREMA (MANOS)
  'jabon_crema': {
    title: 'Key Jabón Crema Almendras · Jabón Líquido Dermoprotector Suave',
    sku: '0188 / 0189',
    category: 'LAVADO DE MANOS',
    nature: 'Jabón líquido cremoso enriquecido con extractos de almendras dulces y pH balanceado para uso continuo.',
    safeSurfaces: ['Manos / Piel'],
    benefits: [
      'Humectación profunda que previene resequedad o irritaciones en pieles sensibles.',
      'Rinde 3,500 lavados por galón de 4 L y hasta 17,500 lavados por porrón de 20 L.',
      'Excelente relación costo-beneficio para áreas de alto tráfico de empleados.'
    ],
    dilutions: [
      {
        level: 'Galón 4 L en Jabonera Líquida',
        ratio: 'Uso directo en dosificador',
        mlPerLiter: '1.0 a 1.2 ml por pulsación',
        yieldGalon: 'Hasta 3,500 lavados por galón',
        yieldPorron: 'Hasta 17,500 lavados por porrón',
        costPerLiter: '$0.12 MXN / lavado',
      }
    ],
    instructions: [
      'Rellene el depósito de la jabonera con el producto puro.',
      'Accione el dosificador sobre las manos húmedas.',
      'Enjabone durante 20 segundos y enjuague.'
    ],
    presentations: [
      { size: 'Galón (4 L)', sku: '0188', price: 441.00, cost: 245.00 },
      { size: 'Porrón (20 L)', sku: '0189', price: 2205.00, cost: 1225.00 }
    ],
    idealFor: 'Sanitarios de personal, vestidores de intendencia y baños de alto flujo.'
  },

  // 53. KEY LIMPIAMANOS PASTA (MECÁNICO)
  'limpiamanos_pasta': {
    title: 'Key Limpiamanos Pasta (4 kg) · Pasta Exfoliante para Grasa Pesada',
    sku: '0160',
    category: 'LAVADO DE MANOS INDUSTRIAL',
    nature: 'Pasta desengrasante dermatológica con micropartículas minerales exfoliantes para remover carbón, hidrocarburos y tintas sin lastimar la piel.',
    safeSurfaces: ['Manos / Piel de trabajo pesado'],
    benefits: [
      'Disuelve grasa de motor, chapopote y hollín en segundos donde el jabón común falla.',
      'Contiene humectantes para no resecar ni agrietar la piel.',
      'Bote de 4 kg rinde hasta 800 lavadas intensivas.'
    ],
    tableTitle: 'Dosificación y Rendimiento Oficial',
    tableHeaders: ['Nivel de Grasa', 'Modo de Empleo', 'Dosis por Lavada', 'Rendimiento por Bote (4 kg)', 'Costo por Lavada'],
    dilutions: [
      {
        level: 'Taller Mecánico / Grasa Pesada',
        ratio: 'Frotar pasta en manos secas',
        mlPerLiter: '5 a 8 g de pasta',
        yieldGalon: '500 a 800 lavadas profesionales',
        costPerLiter: '$0.60 MXN / lavada',
      },
      {
        level: 'Mantenimiento General',
        ratio: 'Aplicar y enjuagar con agua',
        mlPerLiter: '3 a 5 g de pasta',
        yieldGalon: 'Hasta 1,200 lavadas',
        costPerLiter: '$0.38 MXN / lavada',
      }
    ],
    instructions: [
      'Tome una pequeña porción de pasta con las manos SECAS.',
      'Frote enérgicamente entre las palmas, nudillos y uñas hasta disolver la grasa.',
      'Enjuague con agua limpia o limpie con una toalla desechable.'
    ],
    presentations: [
      { size: 'Bote 4 kg', sku: '0160', price: 479.00, cost: 266.00 }
    ],
    idealFor: 'Talleres de mantenimiento de torres, cuartos de máquinas y áreas mecánicas.'
  },

  // 54. KEY SANODERM
  'sanoderm': {
    title: 'Key Sanoderm · Antiséptico de Manos Sin Alcohol con Aloe Vera',
    sku: '2668 / 6978',
    category: 'DESINFECCIÓN DE MANOS',
    nature: 'Solución antiséptica libre de alcohol formulada a base de sales cuaternarias de amonio y acondicionadores de aloe vera.',
    safeSurfaces: ['Manos / Piel'],
    benefits: [
      '100% libre de alcohol: no arde en piel irritada ni reseca las manos con el uso frecuente.',
      'No inflamable: ideal para escuelas, guarderías y áreas donde el gel de alcohol representa riesgo.',
      'Rinde 3,000 aplicaciones por galón.'
    ],
    dilutions: [
      {
        level: 'Galón 4 L en Dosificador',
        ratio: 'Uso directo sobre manos secas',
        mlPerLiter: '1.0 a 1.5 ml por disparo',
        yieldGalon: 'Hasta 3,000 aplicaciones',
        yieldPorron: 'N/A',
        costPerLiter: '$0.16 MXN / aplicación',
      },
      {
        level: 'Cartucho KOP 1 L',
        ratio: 'Instalación en dispensador KOP',
        mlPerLiter: '1.0 ml por disparo',
        yieldGalon: 'Hasta 1,000 aplicaciones',
        yieldPorron: 'N/A',
        costPerLiter: '$0.22 MXN / aplicación',
      }
    ],
    instructions: [
      'Aplique una dosis sobre las palmas de las manos limpias y secas.',
      'Frote cubriendo palmas, dorso y dedos durante 20 segundos hasta su completa evaporación.'
    ],
    presentations: [
      { size: 'Galón (4 L)', sku: '2668', price: 480.00, cost: 267.00 },
      { size: 'Cartucho KOP 1 L', sku: '6978', price: 165.00, cost: 92.00 }
    ],
    idealFor: 'Recepciones, guarderías de condominios, spas y comedores de empleados.'
  },

  // 55. KEY DERMOWIPE GEL 70%
  'dermowipe': {
    title: 'Key DermoWipe Gel 70% · Alcohol en Gel Sanitizante con Humectantes',
    sku: '6960 / 6964',
    category: 'DESINFECCIÓN DE MANOS',
    nature: 'Gel sanitizante formulado con 70% v/v de alcohol etílico de alta pureza y agentes emolientes de secado instantáneo.',
    safeSurfaces: ['Manos / Piel'],
    benefits: [
      'Elimina el 99.99% de gérmenes y virus patógenos en 15 segundos sin agua ni toalla.',
      'Glicerina humectante que previene la deshidratación cutánea.',
      'Disponibilidad en envase de 960 ml con válvula y galón de 4 L para rellenar estaciones.'
    ],
    dilutions: [
      {
        level: 'Envase 960 ml con Válvula Dosificadora',
        ratio: 'Uso directo en palmas de manos',
        mlPerLiter: '1.5 a 2.0 ml por disparo',
        yieldGalon: 'Hasta 500 aplicaciones por frasco',
        yieldPorron: 'N/A',
        costPerLiter: '$0.24 MXN / uso',
      },
      {
        level: 'Galón 4 L para Rellenado de Estaciones',
        ratio: 'Directo en tótems y estaciones de acceso',
        mlPerLiter: '1.5 a 2.0 ml',
        yieldGalon: 'Hasta 2,200 aplicaciones por galón',
        yieldPorron: 'N/A',
        costPerLiter: '$0.18 MXN / uso',
      }
    ],
    instructions: [
      'Presione la válvula para obtener una porción de gel en la palma de la mano.',
      'Frote ambas manos vigorosamente durante 15 a 20 segundos hasta que el producto seque por completo.'
    ],
    presentations: [
      { size: 'Frasco con Válvula 960 ml', sku: '6964', price: 119.00, cost: 66.00 },
      { size: 'Galón (4 L)', sku: '6960', price: 395.00, cost: 219.00 }
    ],
    idealFor: 'Tótems de acceso a torres, elevadores, recepciones y áreas de gimnasio.'
  },

  // 56. TOALLAS SANITIZANTES DE MANOS
  'toallas_sanitizantes': {
    title: 'Toallas Sanitizantes de Manos · Toallitas Desechables Antisépticas',
    sku: '1914',
    category: 'DESINFECCIÓN DE MANOS',
    nature: 'Toallitas húmedas individuales pre-impregnadas con fórmula germicida que elimina el 99.9% de gérmenes sin necesidad de agua ni jabón.',
    safeSurfaces: ['Manos / Piel'],
    benefits: [
      'Higiene inmediata en cualquier lugar sin necesidad de lavabo.',
      'Prácticas para eventos, amenidades al aire libre y salas de juntas.'
    ],
    tableTitle: 'Especificación y Rendimiento',
    tableHeaders: ['Formato', 'Modo de Uso', 'Tiempo de Contacto', 'Rendimiento', 'Costo Unitario'],
    dilutions: [
      {
        level: 'Higiene Personal Desechable',
        ratio: '1 toallita por servicio',
        mlPerLiter: 'Frotar manos y dedos durante 20 segundos',
        yieldGalon: 'Descartable individual',
        costPerLiter: '$1.20 MXN / toallita',
      }
    ],
    instructions: [
      'Extraiga la toallita y frote manos y dedos uniformemente.',
      'Deseche en el cesto de basura después de usar.'
    ],
    presentations: [
      { size: 'Pieza individual / Paquete', sku: '1914', price: 95.00, cost: 53.00 }
    ],
    idealFor: 'Salas de juntas, amenidades exteriores, asadores y áreas de piscina.'
  },

  // 57. KEY NEUTROLIM & FLOR DE CORAL
  'neutrolim': {
    title: 'Key Neutrolim & Flor de Coral · Jabón Neutro Dermoprotector',
    sku: '6993 / 15015 / 6975',
    category: 'LAVADO DE MANOS',
    nature: 'Jabón neutro hipoalergénico formulado con agentes limpiadores ultrasuaves para personal con piel sensible o lavados de manos frecuentes.',
    safeSurfaces: ['Manos / Piel sensible'],
    benefits: [
      'pH estrictamente neutro: no altera el manto ácido de la piel.',
      'Recomendado para consultorios, áreas de preparación y personal administrativo.'
    ],
    dilutions: [
      {
        level: 'Jabonera Institucional Líquida',
        ratio: 'Uso directo sin diluir',
        mlPerLiter: '1.0 ml por lavado',
        yieldGalon: 'Hasta 3,500 lavados por galón',
        yieldPorron: 'N/A',
        costPerLiter: '$0.11 MXN / lavado',
      }
    ],
    instructions: [
      'Dosifique en manos húmedas, frote durante 20 segundos y enjuague.'
    ],
    presentations: [
      { size: 'Botella 500 ml Flor de Coral', sku: '6993', price: 95.00, cost: 53.00 },
      { size: 'Galón (4 L) Neutrolim', sku: '15015', price: 385.00, cost: 214.00 }
    ],
    idealFor: 'Sanitarios ejecutivos, consultorios y áreas infantiles.'
  },

  // 58. KEY SPA SHAMPOO PREMIUM
  'spa_shampoo': {
    title: 'Key Spa Shampoo Premium · Shampoo Corporal y Capilar para Amenidades',
    sku: '7683',
    category: 'LAVADO DE MANOS / AMENIDADES',
    nature: 'Fórmula 2 en 1 enriquecida con acondicionadores para cabello y cuerpo con fragancia de aromaterapia.',
    safeSurfaces: ['Cuerpo y cabello en regaderas de amenidades'],
    benefits: [
      'Evita colocar jabones de barra que ensucian la loseta de regaderas.',
      'Fragancia herbal relajante de alta hotelería.',
      'Rinde 500 a 800 duchas por galón de 4 L.'
    ],
    dilutions: [
      {
        level: 'Dosificador de Pared en Regaderas',
        ratio: 'Uso directo en dispensador',
        mlPerLiter: '5 a 8 ml por ducha completa',
        yieldGalon: '500 a 800 duchas por galón',
        yieldPorron: 'N/A',
        costPerLiter: '$0.75 MXN / ducha',
      }
    ],
    instructions: [
      'Vierta directo en la jabonera de pared de la regadera.',
      'Aplique sobre cabello y cuerpo humedecidos y enjuague.'
    ],
    presentations: [
      { size: 'Galón (4 L)', sku: '7683', price: 460.00, cost: 255.00 }
    ],
    idealFor: 'Vestidores y regaderas de gimnasio, alberca y spas de condominios.'
  },

  // 59. ECO-CLIP
  'ecoclip': {
    title: 'Eco-Clips · Aromatización Continua de Polímero de 30 Días',
    sku: '11717 / 11718 / 11719 / 11720 / 11721',
    category: 'CONTROL DE OLORES',
    nature: 'Aromatizante de polímero infundido con 30 veces más fragancia pura que los desodorantes comunes.',
    safeSurfaces: ['Tazas de baño', 'Mingitorios', 'Ductos de aire', 'Rejillas'],
    benefits: [
      'Aromatiza 24/7 de manera continua durante 30 días sin requerir pilas ni cables.',
      'No se deshace ni contamina el agua de descarga.',
      'Fijación discreta en el reborde exterior de la porcelana.'
    ],
    tableTitle: 'Especificación y Rendimiento Oficial',
    tableHeaders: ['Ubicación Recomendada', 'Método de Instalación', 'Frecuencia de Reemplazo', 'Duración Activa', 'Costo Diario'],
    dilutions: [
      {
        level: 'Borde Exterior de Taza Sanitaria',
        ratio: 'Enganchar en el reborde de la porcelana',
        mlPerLiter: 'Reemplazar cada 30 días',
        yieldGalon: '30 días de aroma continuo 24/7',
        yieldPorron: 'N/A',
        costPerLiter: '$2.73 MXN / día',
      },
      {
        level: 'Rejillas de Ventilación o Tuberías',
        ratio: 'Sujetar en tubería o rejilla',
        mlPerLiter: 'Reemplazar cada 30 días',
        yieldGalon: '30 días continuos',
        yieldPorron: 'N/A',
        costPerLiter: '$2.73 MXN / día',
      }
    ],
    instructions: [
      'Coloque el Eco-Clip enganchado en el reborde EXTERIOR de la taza sanitaria (no adentro del agua).',
      'El producto comenzará a liberar fragancia de inmediato de forma continua.',
      'Reemplace por una pieza nueva a los 30 días.'
    ],
    presentations: [
      { size: 'Eco-Clip Kiwi-Toronja', sku: '11717', price: 82.00, cost: 45.55 },
      { size: 'Eco-Clip Lavanda', sku: '11718', price: 82.00, cost: 45.55 },
      { size: 'Eco-Clip Mango', sku: '11719', price: 82.00, cost: 45.55 },
      { size: 'Eco-Clip Citrus', sku: '11720', price: 82.00, cost: 45.55 },
      { size: 'Eco-Clip Pepino-Melón', sku: '11721', price: 82.00, cost: 45.55 },
    ],
    idealFor: 'Sanitarios comunes, elevadores y pasillos cerrados con alto flujo peatonal.'
  },

  // 60. PANTALLAS WAVE 3D & VANGUARD TAPETES ANTI-SPLASH
  'pantalla_wave': {
    title: 'Pantallas Wave 3D & Vanguard Tapetes Anti-Splash para Mingitorio (30 Días)',
    sku: '11712 - 11716 / 11736 - 11739',
    category: 'CONTROL DE OLORES / MINGITORIOS',
    nature: 'Pantalla de polímero con filamentos patentados que amortiguan y eliminan las salpicaduras de orina en un 99%, liberando bacterias bioactivas.',
    safeSurfaces: ['Mingitorios tradicionales con agua', 'Mingitorios secos ecológicos'],
    benefits: [
      'Elimina salpicaduras de orina en pantalones del usuario y en el piso circundante.',
      'Bacterias bioenzimáticas que limpian el drenaje y eliminan el mal olor a ácido úrico.',
      'Fragancia continua durante 30 días garantizados.'
    ],
    tableTitle: 'Especificación de Protección para Mingitorio',
    tableHeaders: ['Tipo de Mingitorio', 'Colocación', 'Acción Activa', 'Duración Garantizada', 'Costo Diario'],
    dilutions: [
      {
        level: 'Mingitorio Ecológico (Seco) o Tradicional',
        ratio: 'Colocar sobre el desagüe',
        mlPerLiter: 'Filamentos orientados hacia arriba',
        yieldGalon: '30 días continuos de aroma y protección',
        yieldPorron: 'N/A',
        costPerLiter: '$2.90 MXN / día',
      }
    ],
    instructions: [
      'Retire la pantalla de su empaque hermético.',
      'Coloque en el fondo del mingitorio con las cerdas hacia arriba centrada sobre la coladera.',
      'Reemplace cada 30 días.'
    ],
    presentations: [
      { size: 'Pantalla Wave 3D (Kiwi/Lavanda/Mango/Citrus/Pepino)', sku: '11712 - 11716', price: 89.00, cost: 49.00 },
      { size: 'Tapete Anti-Splash Vanguard 1PZ', sku: '11736 - 11739', price: 85.00, cost: 47.00 }
    ],
    idealFor: 'Sanitarios de hombres en lobbies, gimnasios, oficinas corporativas y amenidades.'
  },

  // 61. VC MICRO AROMAS (2.6 OZ)
  'micro_aroma': {
    title: 'VC Micro Aroma (2.6 oz) · Cartucho para Dispensador Automático Programable',
    sku: '11725 - 11731',
    category: 'CONTROL DE OLORES / DISPENSADORES AUTOMÁTICOS',
    nature: 'Cartucho de fragancia fina concentrada micro-atomizada para dispensadores automáticos programables por intervalos de tiempo.',
    safeSurfaces: ['Ambientes interiores / Baños / Pasillos'],
    benefits: [
      'Rinde 3,000 micro-disparos exactos por lata.',
      'Dura de 30 a 60 días según la programación configurada.',
      'Gotas microscópicas que flotan en el aire por más tiempo sin humedecer pisos.'
    ],
    tableTitle: 'Rendimiento de Disparos Oficial',
    tableHeaders: ['Programación del Dispensador', 'Intervalo de Disparo', 'Disparos Totales por Lata', 'Duración Estimada', 'Costo por Disparo'],
    dilutions: [
      {
        level: 'Horario Comercial (12 h / día a 15 min)',
        ratio: '4 disparos por hora',
        mlPerLiter: '3,000 micro-disparos por cartucho',
        yieldGalon: '60 días de aromatización continua',
        costPerLiter: '$0.05 MXN / disparo',
      },
      {
        level: 'Alto Tráfico 24/7 (24 h / día a 15 min)',
        ratio: '4 disparos por hora continuos',
        mlPerLiter: '3,000 micro-disparos por cartucho',
        yieldGalon: '30 días de aromatización continua',
        costPerLiter: '$0.05 MXN / disparo',
      }
    ],
    instructions: [
      'Inserte el cartucho en el dispensador automático.',
      'Configure el intervalo de tiempo (7.5, 15 o 30 minutos).',
      'Cierre el dispensador y disfrute de una ambientación continua.'
    ],
    presentations: [
      { size: 'Cartucho 2.6 oz (Manzana/Bergamota/Canela/Mango/Brisa)', sku: '11725 - 11731', price: 145.00, cost: 80.00 }
    ],
    idealFor: 'Pasillos de edificios, sanitarios de recepción y oficinas ejecutivas.'
  },

  // 62. KEY O2 SISTEMA ODOCONTROL
  'key_o2': {
    title: 'Key O2 Sistema Odocontrol · Difusor de Oxígeno Celular Continuo (60 Días)',
    sku: '80017 - 80023',
    category: 'CONTROL DE OLORES / TECNOLOGÍA PASIVA',
    nature: 'Sistema pasivo de neutralización de olores que opera mediante celda de combustible de oxígeno sin pilas, aerosoles ni conexiones eléctricas.',
    safeSurfaces: ['Ambiente interior / Sanitarios / Lobbies'],
    benefits: [
      '60 días continuos de aroma garantizados sin baterías.',
      'Tecnología celular ecológica 100% reciclable.',
      'Aroma constante desde el día 1 hasta el día 60 sin declinar.'
    ],
    tableTitle: 'Especificación Técnica Oficial',
    tableHeaders: ['Área / Ambiente', 'Tecnología', 'Cobertura por Difusor', 'Duración Activa', 'Costo Diario'],
    dilutions: [
      {
        level: 'Sanitarios Ejecutivos y Lobbies',
        ratio: 'Celda pasiva de oxígeno puro',
        mlPerLiter: 'Cobertura hasta 60 m³',
        yieldGalon: '60 días ininterrumpidos 24/7',
        costPerLiter: '$5.50 MXN / día',
      }
    ],
    instructions: [
      'Active el cartucho girando la perilla o retirando el sello de oxígeno.',
      'Coloque dentro del difusor de pared a una altura de 1.80 metros.',
      'Reemplace cada 60 días.'
    ],
    presentations: [
      { size: 'Difusor Key O2', sku: '80017', price: 295.00, cost: 164.00 },
      { size: 'Cartucho Recarga (Naranja/Spa/Glow/Crush/Charm)', sku: '80018 - 80023', price: 330.00, cost: 183.00 }
    ],
    idealFor: 'Lobbies residenciales, elevadores ejecutivos y baños de amenidades.'
  },

  // 63. KEY AIRE LIMPIO & AROMATIZANTES LÍQUIDOS
  'aire_limpio': {
    title: 'Key Aire Limpio (220g) & Vanguard Aromatizante 4L · Ambientación Profesional',
    sku: '15046 / 15059 - 15065 / 2178 / 7623 / 70038 / 70052',
    category: 'CONTROL DE OLORES',
    nature: 'Aerosol y líquido neutralizador de olores formulado para eliminar olores a tabaco, drenaje y encierro.',
    safeSurfaces: ['Ambiente', 'Cortinas', 'Alfombras', 'Tapicerías'],
    benefits: [
      'Neutraliza olores instantáneamente sin enmascararlos.',
      'Versión líquida para rociado en atomizador o aditivo de trapeado.'
    ],
    dilutions: [
      {
        level: 'Aerosol Aire Limpio 220g (Choque Ambiental)',
        ratio: 'Disparo de 3 segundos al centro',
        mlPerLiter: 'Rociado hacia arriba',
        yieldGalon: 'Hasta 120 aplicaciones por lata',
        yieldPorron: 'N/A',
        costPerLiter: '$0.95 MXN / aplicación',
      },
      {
        level: 'Aromatizante Líquido 4L (Atomizador)',
        ratio: '1:5 con agua limpia',
        mlPerLiter: '167 ml por 1 litro de agua',
        yieldGalon: '24 litros de aromatizante listo',
        yieldPorron: '120 litros',
        costPerLiter: '$2.40 MXN / L preparado',
      },
      {
        level: 'Aditivo para Cubeta de Trapeado',
        ratio: '50 ml en la cubeta',
        mlPerLiter: '5 ml por litro de agua',
        yieldGalon: '80 cubetas aromáticas',
        yieldPorron: '400 cubetas',
        costPerLiter: '$0.72 MXN / cubeta',
      }
    ],
    instructions: [
      'Aerosol: rocíe 3 segundos hacia arriba en el centro de la habitación.',
      'Líquido: diluya 1:5 en atomizador y rocíe telas, alfombras o cortinas.'
    ],
    presentations: [
      { size: 'Aerosol 220g (Lima/Canela/Alpino/Campos/Bosque)', sku: '15046 / 15059 - 15065', price: 115.00, cost: 64.00 },
      { size: 'Galón (4 L) Deodorizante / Vanguard', sku: '2178 / 7623 / 70052', price: 290.00, cost: 161.00 }
    ],
    idealFor: 'Salas de espera, recepciones, cuartos de basura y sanitarios.'
  },

  // 64. KEY MULTI-BIO
  'multi_bio': {
    title: 'Key Multi-Bio · Degradador Biológico de Olores y Materia Orgánica en Drenajes',
    sku: '0548 / 15080',
    category: 'CONTROL DE OLORES / COLADERAS',
    nature: 'Tratamiento bio-enzimático líquido con bacterias benéficas que consumen la suciedad orgánica acumulada en coladeras y orinales.',
    safeSurfaces: ['Coladeras de sanitarios', 'Paredes detrás de mingitorios', 'Sifones de desagüe'],
    benefits: [
      'Erradica el mal olor a cañería atacando la fuente biológica.',
      'Mantiene los desagües libres de sarro orgánico y tapones biológicos.'
    ],
    dilutions: [
      {
        level: 'Coladeras y Desagües con Mal Olor',
        ratio: 'Directo al desagüe',
        mlPerLiter: '50 ml al término de la jornada',
        yieldGalon: '80 aplicaciones por galón de 4 L',
        yieldPorron: 'N/A',
        costPerLiter: '$4.20 MXN / aplicación',
      },
      {
        level: 'Paredes y Pisos de Mingitorios (Gatillo 650 ml)',
        ratio: 'Uso directo con atomizador',
        mlPerLiter: 'Rociar en juntas y zoclos',
        yieldGalon: 'Cientos de aplicaciones',
        yieldPorron: 'N/A',
        costPerLiter: '$0.80 MXN / servicio',
      }
    ],
    instructions: [
      'Vierta 50 ml directo a la coladera por las noches.',
      'Para mingitorios: rocíe en el contorno y juntas de azulejo.'
    ],
    presentations: [
      { size: 'Gatillo 650 ml', sku: '15080', price: 145.00, cost: 80.00 },
      { size: 'Galón (4 L)', sku: '0548', price: 336.00, cost: 187.00 }
    ],
    idealFor: 'Sanitarios con coladeras secas, mingitorios y cuartos de basura.'
  },

  // 65. JABONERAS PROFESIONALES
  'jaboneras': {
    title: 'Línea de Jaboneras Profesionales · OV y KOP (Manuales y Automáticas)',
    sku: '80030 - 80033 / 80070 - 80072 / 0883 / 51628',
    category: 'DESPACHADORES DE JABÓN DE MANOS',
    isHardwareOrPaper: true,
    nature: 'Despachadores construidos en plástico ABS virgen de alta resistencia a impactos con cerradura de seguridad y visor de nivel.',
    safeSurfaces: ['Muros de sanitarios', 'Espejos', 'Mármol', 'Azulejos'],
    benefits: [
      'Dosificación exacta que reduce el desperdicio en hasta un 50%.',
      'Cerradura de seguridad antivandálica con llave maestra.',
      'Sistemas automáticos libres de contacto para máxima higiene.'
    ],
    tableTitle: 'Especificaciones Técnicas de Despachado',
    tableHeaders: ['Modelo / Sistema', 'Tipo de Accionamiento', 'Capacidad / Formato', 'Dosis por Pulsación', 'Compatibilidad'],
    dilutions: [
      {
        level: 'Jabonera OV Automática con Sensor (1 L)',
        ratio: 'Sensor infrarrojo libre de contacto',
        mlPerLiter: 'Depósito rellenable 1,000 ml',
        yieldGalon: '0.8 a 1.0 ml por descarga',
        costPerLiter: 'Jabón líquido, espuma o gel',
      },
      {
        level: 'Jabonera OV Manual Espuma (750 ml)',
        ratio: 'Pulsador frontal ergonómico',
        mlPerLiter: 'Depósito rellenable 750 ml',
        yieldGalon: '0.4 ml de micro-espuma densa',
        costPerLiter: 'Key Jabón Espuma Almendras',
      },
      {
        level: 'Jabonera Aitana Manual (1 L)',
        ratio: 'Palanca suave de bajo esfuerzo',
        mlPerLiter: 'Depósito rellenable 1,000 ml',
        yieldGalon: '1.0 ml por descarga',
        costPerLiter: 'Key Jabón Crema Almendras',
      },
      {
        level: 'Jabonera KOP Sellada (1 L Blanco/Negro)',
        ratio: 'Sistema cerrado higiénico',
        mlPerLiter: 'Cartucho sellado KOP 1,000 ml',
        yieldGalon: '0.5 a 1.0 ml exactos',
        costPerLiter: 'Cartuchos Key KOP oficiales',
      }
    ],
    instructions: [
      'Fije la placa de montaje a la pared con tornillos o cinta doble cara de alta resistencia a 1.20 m de altura.',
      'Cargue el producto o cartucho sellado en el compartimento.',
      'Cierre con la llave de seguridad para uso continuo.'
    ],
    presentations: [
      { size: 'Jabonera OV Automática 1 L', sku: '80070', price: 650.00, cost: 360.00 },
      { size: 'Jabonera OV Manual Espuma 750 ml', sku: '80071', price: 300.00, cost: 166.00 },
      { size: 'Jabonera Aitana Manual 1 L', sku: '80072', price: 286.00, cost: 158.00 },
      { size: 'Jabonera KOP 1 L (Manual/Auto)', sku: '80030 - 80033', price: 420.00, cost: 233.00 }
    ],
    idealFor: 'Sanitarios de corporativos, escuelas, amenidades de torres y plazas comerciales.'
  },

  // 66. DESPACHADORES DE PAPEL
  'despachadores_papel': {
    title: 'Despachadores de Papel Institucional · Kimberly-Clark y Marli',
    sku: '9346 / 9347 / 9348 / 9351',
    category: 'DESPACHADORES DE PAPEL',
    isHardwareOrPaper: true,
    nature: 'Dispensadores construidos en polímeros resistentes al impacto diseñados para dosificar hoja por hoja y controlar el consumo de papel.',
    safeSurfaces: ['Muros de sanitarios', 'Azulejos', 'Tablaroca'],
    benefits: [
      'Reducen hasta un 30% el desperdicio de papel en oficinas y condominios.',
      'Mecanismos libres de atascos para tráfico rudo.',
      'Cerradura antivandálica con llave de servicio.'
    ],
    tableTitle: 'Especificaciones Técnicas',
    tableHeaders: ['Modelo de Dispensador', 'Mecanismo de Despachado', 'Formato de Papel Soportado', 'Capacidad', 'Seguridad'],
    dilutions: [
      {
        level: 'Despachador Toalla en Rollo Marli Palanca',
        ratio: 'Palanca mecánica regulada',
        mlPerLiter: 'Rollos de 180 m a 213 m',
        yieldGalon: '1 rollo continuo de alto flujo',
        costPerLiter: 'Llave de seguridad antivandálica',
      },
      {
        level: 'Despachador Toalla Interdoblada Marli',
        ratio: 'Dispensado 1 a 1 por gravedad',
        mlPerLiter: 'Toallas Sanitas / Kleenex / Tork',
        yieldGalon: 'Hasta 400 toallas interdobladas',
        costPerLiter: 'Ventana visor de papel',
      },
      {
        level: 'Despachador Higiénico Jumbo Jr Marli',
        ratio: 'Freno interno regulador de tiro',
        mlPerLiter: 'Bobinas de 200 m a 250 m',
        yieldGalon: '1 rollo jumbo estándar (9")',
        costPerLiter: 'Carcasa resistente a impactos',
      }
    ],
    instructions: [
      'Instale en muro a la altura estándar recomendada.',
      'Abra con la llave oficial, coloque el rollo o fajilla de toallas y pase el papel por la boquilla de salida.',
      'Cierre la tapa asegurando el pestillo.'
    ],
    presentations: [
      { size: 'Desp. Toalla en Rollo Marli Palanca', sku: '9346', price: 680.00, cost: 377.00 },
      { size: 'Desp. Toalla Interdoblada Marli', sku: '9348', price: 340.00, cost: 189.00 },
      { size: 'Desp. Higiénico Jumbo Jr Marli', sku: '9347', price: 390.00, cost: 216.00 }
    ],
    idealFor: 'Sanitarios de oficinas, amenidades de condominios y centros de consumo.'
  },

  // 67. TOALLAS INTERDOBLADAS
  'toallas_interdobladas': {
    title: 'Toallas Interdobladas Institucionales · Sanitas, Petalo, Kleenex, Tork',
    sku: '5211 / 5213 / 5214 / 5512 / 5513 / 5516 / 9240',
    category: 'PAPEL INSTITUCIONAL',
    isHardwareOrPaper: true,
    nature: 'Toallas de papel 100% fibra virgen y ecológica con gofrado absorbente para secado de manos completo con 1 a 2 hojas.',
    safeSurfaces: ['Secado de manos y superficies'],
    benefits: [
      'Dispensado controlado hoja por hoja que evita el desperdicio masivo.',
      'Excelente absorción y resistencia en húmedo: no se desbarata en las manos.',
      'Presentaciones en caja institucional de 2,000 a 3,000 toallas.'
    ],
    tableTitle: 'Rendimiento y Especificaciones de Absorción',
    tableHeaders: ['Marca / Modelo', 'Tipo de Hoja', 'Contenido por Caja', 'Hojas Sugeridas por Secado', 'Costo por Secado'],
    dilutions: [
      {
        level: 'Sanitas Hoja Sencilla (100 hj c/20)',
        ratio: 'Fibra absorbente de secado rápido',
        mlPerLiter: '2,000 toallas por caja',
        yieldGalon: '2 hojas por usuario',
        costPerLiter: '$0.22 MXN / secado',
      },
      {
        level: 'Petalo Interdoblada (150 hj c/20)',
        ratio: 'Textura suave gofrada',
        mlPerLiter: '3,000 toallas por caja',
        yieldGalon: '1 a 2 hojas por usuario',
        costPerLiter: '$0.19 MXN / secado',
      },
      {
        level: 'Kleenex Cottonelle (200 hj c/10)',
        ratio: 'Hoja doble premium ultra absorbente',
        mlPerLiter: '2,000 toallas por caja',
        yieldGalon: '1 hoja por usuario',
        costPerLiter: '$0.26 MXN / secado',
      },
      {
        level: 'Tork Advanced / Universal',
        ratio: 'Doble hoja absorbente certificada',
        mlPerLiter: 'Paquetes de 200 a 250 hojas',
        yieldGalon: '1 hoja por secado',
        costPerLiter: '$0.24 MXN / secado',
      }
    ],
    instructions: [
      'Abra el despachador de toallas interdobladas.',
      'Coloque los paquetes con el doblez hacia abajo alineados.',
      'Jale la primera toalla para iniciar el dispensado en cascada.'
    ],
    presentations: [
      { size: 'Toalla Sanitas 100 hj c/20', sku: '5214', price: 440.00, cost: 244.00 },
      { size: 'Toalla Petalo 150 hj c/20', sku: '5211', price: 570.00, cost: 316.00 },
      { size: 'Toalla Kleenex 200 hj c/10', sku: '5213', price: 520.00, cost: 289.00 },
      { size: 'Toalla Tork Advanced c/12 paq', sku: '5513', price: 620.00, cost: 344.00 }
    ],
    idealFor: 'Sanitarios corporativos, consultorios, comedores y áreas de lavado de manos.'
  },

  // 68. TOALLAS EN ROLLO
  'toallas_rollo': {
    title: 'Toallas en Rollo Institucionales · Marli, Petalo, Vanguard, Tork Matic',
    sku: '5201 / 5205 / 5210 / 5503 / 6018 / 9301',
    category: 'PAPEL INSTITUCIONAL',
    isHardwareOrPaper: true,
    nature: 'Bobinas de papel continuo de alto metraje (180 m a 280 m) diseñadas para sanitarios con tráfico pesado.',
    safeSurfaces: ['Secado de manos institucional'],
    benefits: [
      'Hasta 1,400 servicios de secado por rollo: reduce la frecuencia de recambio.',
      'Excelente resistencia en húmedo y alta absorbencia.',
      'Cajas con 6 bobinas de gran rendimiento.'
    ],
    tableTitle: 'Metraje y Rendimiento Oficial',
    tableHeaders: ['Marca / Referencia', 'Metraje por Rollo', 'Presentación', 'Servicios Estimados por Rollo', 'Costo por Servicio'],
    dilutions: [
      {
        level: 'Toalla Marli 180 m (Caja c/6)',
        ratio: '180 metros lineales por rollo',
        mlPerLiter: '6 rollos (1,080 metros totales)',
        yieldGalon: '~900 secados por rollo (20 cm)',
        costPerLiter: '$0.15 MXN / secado',
      },
      {
        level: 'Toalla Petalo 180 m (Caja c/6)',
        ratio: '180 metros lineales',
        mlPerLiter: '6 rollos de alta resistencia',
        yieldGalon: '~900 secados por rollo',
        costPerLiter: '$0.16 MXN / secado',
      },
      {
        level: 'Vanguard Rollo 213 m (Caja c/6)',
        ratio: '213 metros lineales continuos',
        mlPerLiter: '6 rollos extra largos',
        yieldGalon: '~1,065 secados por rollo',
        costPerLiter: '$0.13 MXN / secado',
      },
      {
        level: 'Tork Matic 280 m (Caja c/6)',
        ratio: '280 metros de fibra avanzada',
        mlPerLiter: '6 rollos para dispensador Matic',
        yieldGalon: '~1,400 secados por rollo',
        costPerLiter: '$0.18 MXN / secado',
      }
    ],
    instructions: [
      'Monte la bobina en el eje del dispensador de palanca o automático.',
      'Pase el extremo de la toalla por los rodillos de arrastre y pruebe la palanca.'
    ],
    presentations: [
      { size: 'Toalla Marli 180 m c/6', sku: '5205', price: 810.00, cost: 450.00 },
      { size: 'Toalla Petalo 180 m c/6', sku: '5201', price: 890.00, cost: 494.00 },
      { size: 'Toalla Vanguard 213 m c/6', sku: '6018', price: 830.00, cost: 461.00 },
      { size: 'Toalla Tork Matic 280 m c/6', sku: '9301', price: 1520.00, cost: 844.00 }
    ],
    idealFor: 'Sanitarios de centros comerciales, torres de oficinas, plantas y escuelas.'
  },

  // 69. PAPEL HIGIÉNICO INSTITUCIONAL
  'papel_higienico': {
    title: 'Papel Higiénico Institucional Jumbo & SmartOne · Tork y Vanguard',
    sku: '5424 / 5425 / 5533 / 7100 / 9246 / 9247',
    category: 'PAPEL INSTITUCIONAL',
    isHardwareOrPaper: true,
    nature: 'Papel higiénico institucional de desintegración acelerada en agua que previene taponamientos en drenajes de torres y edificios corporativos.',
    safeSurfaces: ['Inodoros / Drenajes'],
    benefits: [
      '100% biodegradable: se desintegra en segundos al contacto con el agua del inodoro.',
      'Bobinas jumbo de 200 m a 620 m que reducen la necesidad de mantenimiento constante.',
      'Tecnología SmartOne de dispensado central hoja por hoja que ahorra hasta 40% de papel.'
    ],
    tableTitle: 'Especificaciones de Alto Rendimiento',
    tableHeaders: ['Línea / Formato', 'Metraje por Bobina', 'Presentación', 'Tecnología', 'Ventaja en Edificios'],
    dilutions: [
      {
        level: 'Tork Advanced Jumbo 200 m (c/6)',
        ratio: '200 metros hoja doble',
        mlPerLiter: 'Caja con 6 rollos (1,200 m)',
        yieldGalon: 'Suavidad premium y alta resistencia',
        costPerLiter: 'Reduce frecuencia de cambio de rollo',
      },
      {
        level: 'Tork SmartOne Fluido Céntrico (c/12)',
        ratio: '620 metros hoja doble',
        mlPerLiter: '12 rollos despachados centro 1 a 1',
        yieldGalon: 'Reduce hasta un 40% el consumo',
        costPerLiter: 'Máxima higiene sin contacto',
      },
      {
        level: 'Vanguard Maxirollo / Minirollo HD',
        ratio: 'Bobina de servicio rudo',
        mlPerLiter: 'Rollos de alto metraje continuo',
        yieldGalon: 'Desintegrable 100% en inodoro',
        costPerLiter: 'Excelente costo por metro',
      }
    ],
    instructions: [
      'Coloque el rollo en el despachador jumbo asegurando el freno de papel.',
      'Pase la punta por la ranura inferior y cierre con llave.'
    ],
    presentations: [
      { size: 'Tork Advanced 200 m HD c/6', sku: '7100 / 9246', price: 690.00, cost: 383.00 },
      { size: 'Tork SmartOne 620 m c/12', sku: '9247', price: 1890.00, cost: 1050.00 },
      { size: 'Vanguard Minirollo / Maxirollo', sku: '5424 / 5425', price: 480.00, cost: 266.00 }
    ],
    idealFor: 'Sanitarios de departamentos, oficinas corporativas, amenidades y áreas comunes.'
  },

  // 70. SERVILLETTAS INSTITUCIONALES
  'servilletas': {
    title: 'Servilletas Institucionales · Marli y Servi-Tork Xpressnap',
    sku: '5252 / 5601',
    category: 'PAPEL INSTITUCIONAL',
    isHardwareOrPaper: true,
    nature: 'Servilletas de papel absorbente diseñadas para dispensado individual controlado que evitan el desperdicio en comedores y cafeterías.',
    safeSurfaces: ['Comedores / Alimentos / Limpieza de manos'],
    benefits: [
      'Dispensado 1 a 1 que reduce el consumo en un 25% comparado con servilleteros abiertos.',
      'Excelente absorción de grasa y líquidos en comedores de empleados.'
    ],
    tableTitle: 'Rendimiento de Dispensado',
    tableHeaders: ['Línea / Modelo', 'Tipo de Servicio', 'Piezas por Caja', 'Ahorro Certificado', 'Recomendación'],
    dilutions: [
      {
        level: 'Servi Tork Xpressnap Advanced (c/24)',
        ratio: 'Dispensado individual controlado',
        mlPerLiter: '6,000 servilletas por caja',
        yieldGalon: 'Ahorro certificado de al menos 25%',
        costPerLiter: 'Comedores corporativos y cafeterías',
      },
      {
        level: 'Servilletas Marli c/500 (c/12 paq)',
        ratio: 'Servilleta doblada de uso rudo',
        mlPerLiter: '6,000 servilletas totales',
        yieldGalon: 'Excelente absorción para alimentos',
        costPerLiter: 'Áreas de descanso y cocina',
      }
    ],
    instructions: [
      'Cargue los paquetes de servilletas en el dispensador de resorte.',
      'Tome una servilleta a la vez.'
    ],
    presentations: [
      { size: 'Servi Tork Xpressnap 24/250 hs', sku: '5601', price: 1250.00, cost: 694.00 },
      { size: 'Servilletas Marli 12 paq c/500 hs', sku: '5252', price: 680.00, cost: 377.00 }
    ],
    idealFor: 'Comedores de empleados de torres, cocinetas y salones de eventos.'
  },

  // 71. WIPERS WYPALL & SHOPMAX
  'wypall': {
    title: 'Wipers Industriales WypAll L40 & ShopMax · Sustituto Profesional de Trapos y Franelas',
    sku: '5270 / 5641',
    category: 'ASEO GENERAL / PAÑOS ESPECIALIZADOS',
    isHardwareOrPaper: true,
    nature: 'Paños descartables reforzados con celulosa y aglutinantes sintéticos que absorben líquidos y aceites sin deshacerse ni soltar pelusas.',
    safeSurfaces: ['Herramientas', 'Maquinaria', 'Vidrios', 'Mesas de trabajo', 'Paredes'],
    benefits: [
      'Absorben hasta 3 veces su peso en agua y grasa.',
      'No sueltan pelusa ni rayan superficies delicadas.',
      'Reemplazan el uso insalubre de trapos o franelas sucias en áreas técnicas.'
    ],
    tableTitle: 'Capacidad de Absorción y Uso',
    tableHeaders: ['Modelo', 'Formato', 'Capacidad de Absorción', 'Resistencia a Solventes', 'Uso Recomendado'],
    dilutions: [
      {
        level: 'WypAll L40 (Paquete c/56 pz)',
        ratio: 'Hojas precortadas 33 x 31 cm',
        mlPerLiter: 'Absorbe 3x su peso en líquido',
        yieldGalon: 'Alta resistencia mecánica en húmedo',
        costPerLiter: 'Mantenimiento, talleres y vidrios',
      },
      {
        level: 'Tork ShopMax Rollo Azul (c/60 hjs)',
        ratio: 'Rollo extra resistente',
        mlPerLiter: 'Máxima resistencia a solventes',
        yieldGalon: 'Reutilizable durante la jornada',
        costPerLiter: 'Industria, cocinas y grasa pesada',
      }
    ],
    instructions: [
      'Tome un paño del paquete.',
      'Úselo en seco para absorber derrames o aplique con solvente/limpiador.',
      'Deseche al terminar la jornada o cuando esté saturado de grasa.'
    ],
    presentations: [
      { size: 'WypAll L40 Paq c/56 pz', sku: '5270', price: 145.00, cost: 80.00 },
      { size: 'Tork ShopMax Rollo c/60 hs', sku: '5641', price: 165.00, cost: 91.00 }
    ],
    idealFor: 'Mantenimiento de cuartos de máquinas, talleres, cocinas y limpieza de vidrios.'
  },

  // 72. VILEDA PROFESSIONAL (MICROFIBRAS, PURACTIVE, MIRACLEAN)
  'vileda_accesorios': {
    title: 'Vileda Professional · Microfibras MicronQuick, PurActive y Miraclean',
    sku: '7700 / 9061 / 9065 / 54013 / 54014 / 54027 / 54075 / 54113',
    category: 'VILEDA PROFESSIONAL',
    isHardwareOrPaper: true,
    nature: 'Tecnología alemana en microfibras continuas ultrafinas y fibras mecánicas de alta durabilidad para limpieza institucional.',
    safeSurfaces: ['Vidrios', 'Espejos', 'Mármol', 'Acero inoxidable', 'Teflón', 'Azulejos'],
    benefits: [
      'MicronQuick remueve el 99.99% de bacterias de superficies con pura agua.',
      'Lavable hasta 300 veces en máquina lavadora.',
      'PurActive remueve suciedad difícil sin rayar teflón, acero ni vidrio.',
      'Miraclean borra manchas de calzado y tintas con pura agua (espuma de melamina).'
    ],
    tableTitle: 'Especificaciones de Durabilidad y Certificación',
    tableHeaders: ['Producto Vileda', 'Tecnología', 'Efectividad Antibacterial', 'Ciclos de Lavado en Lavadora', 'Beneficio Principal'],
    dilutions: [
      {
        level: 'Bayeta MicronQuick (Azul / Roja)',
        ratio: 'Microfibra continua ultra dividida',
        mlPerLiter: '99.99% remoción de bacterias solo con agua',
        yieldGalon: 'Hasta 300 lavadas en lavadora',
        costPerLiter: 'Secado sin marcas en espejos y muebles',
      },
      {
        level: 'Salvaúñas PurActive (Verde / Azul)',
        ratio: 'Resina especial anti-rayas',
        mlPerLiter: 'Desprende cochambre sin rayar teflón ni acero',
        yieldGalon: 'Alta durabilidad sin desgajarse',
        costPerLiter: 'Protección salvaúñas ergonómica',
      },
      {
        level: 'Esponja Miraclean (Borrador Mágico)',
        ratio: 'Espuma de resina de melamina pura',
        mlPerLiter: 'Borra marcas de calzado y tintas',
        yieldGalon: 'Solo humedecer con agua limpia',
        costPerLiter: 'Cero químicos necesarios',
      },
      {
        level: 'Bayeta PVA Micro (Azul / Roja)',
        ratio: 'Microfibra impregnada en alcohol polivinílico',
        mlPerLiter: 'Absorbencia superior: seca de una pasada',
        yieldGalon: 'Cientos de ciclos de uso',
        costPerLiter: 'Brillo espejo instantáneo sin pelusa',
      }
    ],
    instructions: [
      'MicronQuick / PVA: humedezca con agua limpia, exprima perfectamente y limpie la superficie.',
      'PurActive: use con su limpiador habitual para tallar sin rayar.',
      'Miraclean: humedezca con agua, exprima y frote suavemente sobre la mancha.'
    ],
    presentations: [
      { size: 'MicronQuick (Azul/Roja) Vileda', sku: '9061 / 54075', price: 95.00, cost: 52.00 },
      { size: 'Salvaúñas PurActive (Verde/Azul)', sku: '7700 / 54027', price: 42.00, cost: 23.00 },
      { size: 'Esponja Miraclean Vileda', sku: '9065', price: 65.00, cost: 36.00 },
      { size: 'Bayeta PVA Micro (Roja/Azul)', sku: '54013 / 54014', price: 85.00, cost: 47.00 }
    ],
    idealFor: 'Limpieza de espejos, elevadores, canceles, muebles de baño y paredes de pasillo.'
  },

  // 73. MOPS SECOS PROFESIONALES
  'mops_secos': {
    title: 'Mops Secos Profesionales y Repuestos (40 cm a 125 cm)',
    sku: '1283 - 1288 / 1370 / 1371 / 5996 / 8033 / 8075',
    category: 'PISOS / MOPING SECO',
    isHardwareOrPaper: true,
    nature: 'Armazones metálicos articulados giratorios de 360° con fundas de hilaza de algodón y poliéster electrostático para barrido en seco.',
    safeSurfaces: ['Mármol', 'Granito', 'Porcelanato', 'Pisos laminados', 'Epóxicos', 'Concreto pulido'],
    benefits: [
      'Atrapa el polvo fino sin levantarlo al aire como las escobas tradicionales.',
      'Cubre claros amplios en una fracción del tiempo de barrido.',
      'Fundas lavables en lavadora con larga vida útil.'
    ],
    tableTitle: 'Especificaciones por Medida de Mop',
    tableHeaders: ['Medida del Mop', 'Área Recomendada', 'Capacidad de Barrido', 'Lavabilidad', 'Tratamiento Sugerido'],
    dilutions: [
      {
        level: 'Mop Completo 40 cm / 60 cm',
        ratio: 'Oficinas, baños y pasillos estrechos',
        mlPerLiter: 'Maniobrabilidad entre muebles',
        yieldGalon: 'Funda lavable en lavadora',
        costPerLiter: 'Impregnar con Key M-Control',
      },
      {
        level: 'Mop Completo 90 cm',
        ratio: 'Lobbies residenciales y gimnasios',
        mlPerLiter: 'Cubre grandes pasillos en menos pasadas',
        yieldGalon: 'Alta durabilidad',
        costPerLiter: 'Impregnar con Key M-Control',
      },
      {
        level: 'Mop Completo 125 cm (Uso Rudo)',
        ratio: 'Naves, salones de eventos y estacionamientos',
        mlPerLiter: 'Máximo rendimiento en m² por hora',
        yieldGalon: 'Hilaza de uso pesado',
        costPerLiter: 'Impregnar con Key M-Control',
      }
    ],
    instructions: [
      'Impregne la funda seca con Key M-Control unas horas antes de usar.',
      'Deslice el mop sobre el piso en forma de ochos o líneas continuas sin levantarlo.',
      'Sacuda el polvo acumulado en la zona de basura y peine los hilos.'
    ],
    presentations: [
      { size: 'Mop Completo 40 cm', sku: '1283', price: 285.00, cost: 158.00 },
      { size: 'Mop Completo 60 cm', sku: '1285', price: 345.00, cost: 191.00 },
      { size: 'Mop Completo 90 cm', sku: '1287', price: 420.00, cost: 233.00 },
      { size: 'Mop Seco Key 125 cm', sku: '1370', price: 590.00, cost: 327.00 }
    ],
    idealFor: 'Lobbies de doble altura, pasillos de torres departamentales, gimnasios y salones.'
  },

  // 74. ACCESORIOS Y EQUIPO ERGONÓMICO DE LIMPIEZA
  'accesorios_limpieza': {
    title: 'Accesorios y Equipo Ergonómico · Cubos con Pedal, Jaladores y Cepillos',
    sku: '5069 / 9068 / 54047 / 54048 / 54059 / 54092 / 54094 / 54113',
    category: 'ACCESORIOS / EQUIPO ERGONÓMICO',
    isHardwareOrPaper: true,
    nature: 'Herramientas profesionales diseñadas para reducir el esfuerzo físico del operador y aumentar la velocidad de limpieza y secado de pisos.',
    safeSurfaces: ['Pisos generales', 'Vidrios', 'Carrocerías'],
    benefits: [
      'El cubo con pedal exprime 40% más agua que un exprimidor manual: pisos secos en minutos.',
      'Jaladores de hule de celda cerrada que no retienen bacterias ni malos olores.',
      'Guantes de nitrilo profesionales con máxima resistencia química.'
    ],
    tableTitle: 'Especificaciones de Ergonomía y Rendimiento',
    tableHeaders: ['Herramienta / Equipo', 'Material / Sistema', 'Ergonomía / Capacidad', 'Vida Útil', 'Beneficio en Operación'],
    dilutions: [
      {
        level: 'Cubo UltraSpin Mini Azul con Pedal Vileda',
        ratio: 'Escurridor giratorio por pedal',
        mlPerLiter: 'Cubo de 10 L ergonómico',
        yieldGalon: 'Mecanismo de pedal de alta duración',
        costPerLiter: '40% más secado que mop tradicional',
      },
      {
        level: 'Jalador 45 cm Espuma Verde Vileda',
        ratio: 'Espuma de celda cerrada doble lámina',
        mlPerLiter: 'Ancho de 45 cm con rosca universal',
        yieldGalon: 'No retiene bacterias ni olores',
        costPerLiter: 'Secado en un solo jalón sin charcos',
      },
      {
        level: 'Guante Universal Nitrilo Verde Vileda',
        ratio: 'Nitrilo virgen resistente a químicos',
        mlPerLiter: 'Interior afelpado de algodón',
        yieldGalon: 'Alta resistencia a ponchaduras',
        costPerLiter: 'Protección de manos con tacto firme',
      },
      {
        level: 'Cepillo Carrocería 10" PVC',
        ratio: 'Cerdas suaves plumadas anti-rayas',
        mlPerLiter: 'Ancho de 10 pulgadas',
        yieldGalon: 'Resistente a detergentes',
        costPerLiter: 'Lavado rápido de camionetas y ventanales',
      }
    ],
    instructions: [
      'Enjuague las herramientas con agua limpia al finalizar cada jornada.',
      'Almacene colgadas o invertidas para prolongar la vida útil de las gomas y cerdas.'
    ],
    presentations: [
      { size: 'Cubo UltraSpin Mini Azul c/Pedal', sku: '54094', price: 980.00, cost: 544.00 },
      { size: 'Jalador 45 cm Espuma Vileda', sku: '54059', price: 215.00, cost: 119.00 },
      { size: 'Guante Nitrilo Verde Vileda', sku: '54047', price: 85.00, cost: 47.00 },
      { size: 'Cepillo Carrocería 10" PVC', sku: '5069', price: 195.00, cost: 108.00 }
    ],
    idealFor: 'Personal de limpieza y mantenimiento en torres, plazas y condominios.'
  },

  // 75. ACCESORIOS GENERALES (VALVULAS, GATILLOS, CONTENEDORES)
  'accesorios_generales': {
    title: 'Accesorios Institucionales de Aseo y Dosificación OKEY',
    sku: 'ACCESORIOS',
    category: 'ACCESORIOS',
    isHardwareOrPaper: true,
    nature: 'Equipos complementarios oficiales para la dosificación, aplicación y mantenimiento de soluciones KEY® Química.',
    safeSurfaces: ['Uso en envases institucionales de 4 L y 20 L'],
    benefits: [
      'Aseguran la dosificación exacta de concentrados evitando derrames y pérdidas.',
      'Gatillos de uso rudo compatibles con químicos desengrasantes y desinfectantes.'
    ],
    tableTitle: 'Especificaciones de Operación Institucional',
    tableHeaders: ['Componente', 'Función', 'Material', 'Recomendación de Uso', 'Beneficio'],
    dilutions: [
      {
        level: 'Válvulas y Dosificadores de Galón/Porrón',
        ratio: 'Extracción controlada de concentrados',
        mlPerLiter: 'Polietileno de alta resistencia química',
        yieldGalon: 'Instalar en envases de 4 L o 20 L',
        costPerLiter: 'Evita derrames y asegura dosis exacta',
      },
      {
        level: 'Botellas y Gatillos Atomizadores',
        ratio: 'Aplicación de soluciones diluidas',
        mlPerLiter: 'Boquilla graduable (chorro/niebla)',
        yieldGalon: 'Rotular con nombre y dilución',
        costPerLiter: 'Distribución uniforme sin desperdicio',
      }
    ],
    instructions: [
      'Rotule siempre las botellas con el nombre del producto diluido y su fecha de preparación.',
      'Enjuague los gatillos periódicamente con agua limpia para evitar que se tapen las boquillas.'
    ],
    presentations: [
      { size: 'Pieza institucional', sku: 'ACC', price: 65.00, cost: 36.00 }
    ],
    idealFor: 'Carritos de camarista, cuartos de aseo y estaciones de intendencia.'
  }
}

// Función buscadora inteligente de ficha técnica para CUALQUIER producto del catálogo (100% de cobertura)
export function getProductSpec(product) {
  if (!product) return null
  const name = (product.name || '').toLowerCase()
  const cat = (product.category || '').toLowerCase()
  const sku = String(product.sku || '')

  // 1. Detección por Nombre Específico y SKU Prioritario
  if (name.includes('biokey') || sku === '0586' || sku === '621') return PRODUCT_SPECS['biokey']
  if (name.includes('maxforce') || sku === '626') return PRODUCT_SPECS['maxforce']
  if (name.includes('klerat') || sku === '630') return PRODUCT_SPECS['klerat']
  if (name.includes('paraiso') || name.includes('paraíso') || sku === '0182' || sku === '6118') return PRODUCT_SPECS['paraiso']
  if (name.includes('glox') || name.includes('cristalizador') || sku === '1863') return PRODUCT_SPECS['glox']
  if (name.includes('brillante') || name.includes('piedra natural 4l') || sku === '1206' || sku === '15041') return PRODUCT_SPECS['brillante']
  if (name.includes('limon') || name.includes('limón') || sku === '143') return PRODUCT_SPECS['limon']
  if (name.includes('pino') || sku === '186') return PRODUCT_SPECS['pino']
  if (name.includes('fiesta frutal') || sku === '6908') return PRODUCT_SPECS['fiesta_frutal']
  if (name.includes('impregnador') || sku === '70101') return PRODUCT_SPECS['impregnador']
  if (name.includes('cloro') || name.includes('vanguard cloro') || sku === '70108' || sku === '70111') return PRODUCT_SPECS['cloro']
  if (name.includes('germoquat') || sku === '2628') return PRODUCT_SPECS['germoquat']
  if (name.includes('peroxipro') || sku === '7696') return PRODUCT_SPECS['peroxipro']
  if (name.includes('total 650') || name.includes('total 4l') || name.trim() === 'key total' || sku === '523' || sku === '15078') return PRODUCT_SPECS['total']
  if (name.includes('aerosan') || sku === '2892' || sku === '2894' || sku === '2895' || sku === '15052') return PRODUCT_SPECS['aerosan']
  if (name.includes('sani 950') || name.includes('sani950') || sku === '6768' || sku === '6769' || sku === '15105') return PRODUCT_SPECS['sani950']
  if (name.includes('lavaloza') || sku === '123') return PRODUCT_SPECS['lavaloza']
  if (name.includes('limpiahornos') || sku === '287') return PRODUCT_SPECS['limpiahornos']
  if (name.includes('parrillas') || sku === '6423' || sku === '6428') return PRODUCT_SPECS['parrillas']
  if (name.includes('frutas') || name.includes('verduras') || sku === '4633') return PRODUCT_SPECS['desinfectante_frutas']
  if (name.includes('l-bio') || name.includes('lbio') || sku === '618') return PRODUCT_SPECS['lbio']
  if (name.includes('desincrustante cocina') || sku === '15057') return PRODUCT_SPECS['desincrustante_cocina']
  if (name.includes('desengrasante cocina') || name.includes('alisan') && name.includes('desengrasante') || sku === '6369' || sku === '15058' || sku === '15111') return PRODUCT_SPECS['desengrasante_alisan']
  if (name.includes('sanitizante cocina') || sku === '15054') return PRODUCT_SPECS['sanitizante_cocina']
  if (name.includes('forte') || name.includes('sarricida') || sku === '15007' || sku === '15113') return PRODUCT_SPECS['forte']
  if (name.includes('503') || name.includes('f-503') || name.includes('baño 1l') || name.includes('baño 4l') || sku === '0543' || sku === '15023' || sku === '15024') return PRODUCT_SPECS['503']
  if (name.includes('baño piedra natural') || sku === '15040') return PRODUCT_SPECS['bano_piedra']
  if (name.includes('plomero') || sku === '15037') return PRODUCT_SPECS['plomero']
  if (name.includes('limpiavidrio') || name.includes('vidrio') || sku === '0169' || sku === '167' || sku === '168' || sku === '15112') return PRODUCT_SPECS['limpiavidrios']
  if (name.includes('1000') || sku === '173') return PRODUCT_SPECS['key1000']
  if (name.includes('unico') || name.includes('único') || sku === '533') return PRODUCT_SPECS['unico_desengrasante']
  if (name.includes('enviro d') || name.includes('enviro') || sku === '2501') return PRODUCT_SPECS['enviro_d']
  if (name.includes('desengrasante forte') || sku === '15000') return PRODUCT_SPECS['desengrasante_forte']
  if ((name.includes('brillo') && (name.includes('320') || name.includes('1l') || name.includes('4l'))) || sku === '387' || sku === '388' || sku === '15018') return PRODUCT_SPECS['brillo']
  if (name.includes('lcm plus') || sku === '15083') return PRODUCT_SPECS['lcm_plus']
  if (name.includes('lx-100') || name.includes('lx 100') || name.includes('etiquetas') || name.includes('graffiti') || sku === '557' || sku === '15081' || sku === '15082' || sku === '4213') return PRODUCT_SPECS['lx100_etiquetas']
  if (name.includes('post obra') || name.includes('postobra') || sku === '15100' || sku === '15101') return PRODUCT_SPECS['desincrustante_post_obra']
  if (name.includes('oxido') || name.includes('óxido') || sku === '15107' || sku === '15108' || sku === '15109') return PRODUCT_SPECS['removedor_oxido']
  if (name.includes('concreto') || sku === '15103') return PRODUCT_SPECS['removedor_concreto']
  if (name.includes('acero') || name.includes('lustrador') || sku === '6383' || sku === '6492' || sku === '15063') return PRODUCT_SPECS['acero']
  if (name.includes('m-control') || name.includes('m control') || sku === '2240') return PRODUCT_SPECS['m_control']
  if (name.includes('prelavador') || sku === '107' || sku === '15114') return PRODUCT_SPECS['lavanderia_prelavador']
  if (name.includes('oxi') || name.includes('desmanchador') && cat.includes('lavander') || sku === '15002') return PRODUCT_SPECS['lavanderia_oxi']
  if (name.includes('dlc') || sku === '15013') return PRODUCT_SPECS['lavanderia_dlc']
  if (name.includes('slc') || sku === '15014') return PRODUCT_SPECS['lavanderia_slc']
  if (name.includes('autoshampo') || sku === '15110') return PRODUCT_SPECS['auto_shampoo']
  if (name.includes('llantas') || sku === '2250') return PRODUCT_SPECS['auto_llantas']
  if (name.includes('abrillantador 1l') || (name.includes('abrillantador') && cat.includes('auto')) || sku === '2252') return PRODUCT_SPECS['auto_abrillantador']
  if (name.includes('lavalfombras') || name.includes('alfombras') || sku === '15005') return PRODUCT_SPECS['alfombras']
  if (name.includes('quitamanchas 4l') || sku === '15045') return PRODUCT_SPECS['quitamanchas_alfombras']
  if (name.includes('sanoderm') || sku === '2668' || sku === '6978') return PRODUCT_SPECS['sanoderm']
  if (name.includes('dermowipe') || sku === '6960' || sku === '6964') return PRODUCT_SPECS['dermowipe']
  if (name.includes('toallas sanitizantes') || sku === '1914') return PRODUCT_SPECS['toallas_sanitizantes']
  if (name.includes('antiseptica') || name.includes('antiséptica') || sku === '6780') return PRODUCT_SPECS['sanoderm']
  if (name.includes('limpiamanos') || name.includes('pasta 4kg') || sku === '160') return PRODUCT_SPECS['limpiamanos_pasta']
  if (name.includes('espuma') && (name.includes('almendras') || name.includes('rocio') || name.includes('rocío') || name.includes('antibacterial')) || sku === '6123' || sku === '6128' || sku === '2168' || sku === '2194' || sku === '2195' || sku === '6980' || sku === '6981' || sku === '6982') return PRODUCT_SPECS['jabon_espuma']
  if (name.includes('crema almendras') || sku === '0189' || sku === '188') return PRODUCT_SPECS['jabon_crema']
  if (name.includes('spa shampoo') || sku === '7683') return PRODUCT_SPECS['spa_shampoo']
  if (name.includes('neutrolim') || name.includes('flor de coral') || sku === '6993' || sku === '15015' || sku === '6975') return PRODUCT_SPECS['neutrolim']
  if (name.includes('multi-bio') || name.includes('multibio') || sku === '548' || sku === '15080') return PRODUCT_SPECS['multi_bio']
  if (name.includes('deodorizante') || name.includes('aire limpio') || name.includes('ambientador') || name.includes('aromatizante') || sku === '2178' || sku === '7623' || sku === '70038' || sku === '70052' || sku.startsWith('15059') || sku.startsWith('15060')) return PRODUCT_SPECS['aire_limpio']
  if (name.includes('wave 3d') || name.includes('anti-splash') || sku.startsWith('11712') || sku.startsWith('11713') || sku.startsWith('11714') || sku.startsWith('11715') || sku.startsWith('11716') || sku.startsWith('11736') || sku.startsWith('11737') || sku.startsWith('11738') || sku.startsWith('11739')) return PRODUCT_SPECS['pantalla_wave']
  if (name.includes('eco clip') || name.includes('ecoclip') || sku.startsWith('11717') || sku.startsWith('11718') || sku.startsWith('11719') || sku.startsWith('11720') || sku.startsWith('11721')) return PRODUCT_SPECS['ecoclip']
  if (name.includes('vc micro') || sku.startsWith('11725') || sku.startsWith('11726') || sku.startsWith('11727') || sku.startsWith('11728') || sku.startsWith('11729') || sku.startsWith('11730') || sku.startsWith('11731')) return PRODUCT_SPECS['micro_aroma']
  if (name.includes('odocontrol') || name.includes('key o2') || sku.startsWith('80017') || sku.startsWith('80018') || sku.startsWith('80020') || sku.startsWith('80021') || sku.startsWith('80022') || sku.startsWith('80023')) return PRODUCT_SPECS['key_o2']
  if (name.includes('jabonera') || name.includes('deposito con valvula') || sku.startsWith('80030') || sku.startsWith('80031') || sku.startsWith('80032') || sku.startsWith('80033') || sku.startsWith('80070') || sku.startsWith('80071') || sku.startsWith('80072') || sku === '883' || sku === '51628') return PRODUCT_SPECS['jaboneras']
  if (name.includes('desp ') || name.includes('despachador') || name.includes('kc desp') || sku.startsWith('9346') || sku.startsWith('9347') || sku.startsWith('9348') || sku.startsWith('9351')) return PRODUCT_SPECS['despachadores_papel']
  if (name.includes('toalla interdoblada') || sku === '5211' || sku === '5213' || sku === '5214' || sku === '5512' || sku === '5513' || sku === '5516' || sku === '9240') return PRODUCT_SPECS['toallas_interdobladas']
  if (name.includes('toalla en rollo') || name.includes('toalla ecologica en rollo') || name.includes('toalla rollo') || sku === '5201' || sku === '5205' || sku === '5210' || sku === '5503' || sku === '6018' || sku === '9301') return PRODUCT_SPECS['toallas_rollo']
  if (name.includes('higienico') || name.includes('higiénico') || name.includes('minirollo') || name.includes('maxirollo') || sku === '5424' || sku === '5425' || sku === '5533' || sku === '7100' || sku === '9246' || sku === '9247') return PRODUCT_SPECS['papel_higienico']
  if (name.includes('servilleta') || name.includes('servi tork') || sku === '5252' || sku === '5601') return PRODUCT_SPECS['servilletas']
  if (name.includes('wyall') || name.includes('wypall') || name.includes('wiper') || name.includes('shopmax') || sku === '5270' || sku === '5641') return PRODUCT_SPECS['wypall']
  if (name.includes('vileda') || name.includes('micronquick') || name.includes('puractive') || name.includes('miraclean') || name.includes('pva') || name.includes('inox pad') || sku === '7700' || sku === '9061' || sku === '9065' || sku === '54013' || sku === '54014' || sku === '54027' || sku === '54075' || sku === '54113') return PRODUCT_SPECS['vileda_accesorios']
  if (name.includes('mop') || name.includes('funda') || sku.startsWith('1283') || sku.startsWith('1284') || sku.startsWith('1285') || sku.startsWith('1286') || sku.startsWith('1287') || sku.startsWith('1288') || sku === '1370' || sku === '1371' || sku === '5996' || sku === '8033' || sku === '8075') return PRODUCT_SPECS['mops_secos']
  if (name.includes('cepillo') || name.includes('jalador') || name.includes('cubo') || sku === '5069' || sku === '9068' || sku === '54047' || sku === '54048' || sku === '54059' || sku === '54092' || sku === '54094') return PRODUCT_SPECS['accesorios_limpieza']
  if (cat === 'accesorios') return PRODUCT_SPECS['accesorios_generales']

  // 2. Detección por Categoría Genérica
  if (cat.includes('lavander')) return PRODUCT_SPECS['lavanderia_dlc']
  if (cat.includes('auto')) return PRODUCT_SPECS['auto_shampoo']
  if (cat.includes('alfombra')) return PRODUCT_SPECS['alfombras']
  if (cat.includes('plaga')) return PRODUCT_SPECS['biokey']
  if (cat.includes('pisos')) return PRODUCT_SPECS['paraiso']
  if (cat.includes('baño')) return PRODUCT_SPECS['forte']
  if (cat.includes('cocina')) return PRODUCT_SPECS['desengrasante_alisan']
  if (cat.includes('desinfección de superficies') || cat.includes('desinfeccion')) return PRODUCT_SPECS['total']
  if (cat.includes('manos') && cat.includes('desinfección')) return PRODUCT_SPECS['dermowipe']
  if (cat.includes('manos') && cat.includes('lavado')) return PRODUCT_SPECS['jabon_espuma']
  if (cat.includes('olor')) return PRODUCT_SPECS['aire_limpio']
  if (cat.includes('vileda')) return PRODUCT_SPECS['vileda_accesorios']
  if (cat.includes('papel')) return PRODUCT_SPECS['toallas_interdobladas']
  if (cat.includes('despachador')) return PRODUCT_SPECS['jaboneras']

  // Fallback seguro
  return {
    title: product.name,
    sku: product.sku,
    category: product.category,
    nature: `Formulación institucional oficial KEY® Química para ${product.category}.`,
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
    idealFor: 'Uso profesional e institucional en instalaciones residenciales y comerciales.'
  }
}
