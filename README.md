# 🧼 Limpieza OKEY — Aplicación Oficial de Ventas, Recibos e Inventario

Aplicación web progresiva (PWA) de alto rendimiento diseñada a la medida para la operación diaria de **Limpieza OKEY** ([limpieza-okey.vercel.app](https://limpieza-okey.vercel.app/)).

Desarrollada con **React 19**, **Vite** y **Tailwind CSS**, optimizada para dispositivos móviles (iOS/Android) y computadoras de escritorio.

---

## 🚀 Acceso en Vivo
* **Web App Oficial:** [https://limpieza-okey.vercel.app/](https://limpieza-okey.vercel.app/)
* **Repositorio GitHub:** [https://github.com/ArtZeGal/limpieza-okey](https://github.com/ArtZeGal/limpieza-okey)

---

## 📖 Módulos y Funcionalidades

### 1. 🏷️ Catálogo Oficial 2026
* **275 Productos y 11 Paquetes:** Estructurados en 19 categorías oficiales de Puntos KEY®.
* **Costo Base:** Calculado con base en el **Costo de Empleado (Costo OKEY)**.
* **Búsqueda Instantánea:** Filtro reactivo en tiempo real por nombre, clave o categoría.
* **Tarjeta Limpia de Mostrador:** Muestra el precio público oficial y botones táctiles rápidos de adición sin exponer datos confidenciales al cliente.

### 2. 🛒 Cotizador y Carrito de Ventas
* **Cálculo Automático de Envío:** Tarifa de \$120.00 estándar, o **Envío GRATIS** a partir de \$1,500.00 de compra (o \$0 en entrega en sucursal).
* **Presets de Anticipo:** Botones rápidos para 50%, 70% o 100%, con cálculo en vivo de saldo pendiente.
* **Compartir por WhatsApp:** Genera automáticamente la cotización formateada con desglose de productos y formas de pago.

### 3. 🧾 Generador de Recibos Oficiales Calibrados
* **Plantilla Original en Alta Resolución:** Renderizado milimétrico sobre el canvas original de 1024x1024 px.
* **Consecutivo Inteligente:** Mantiene el consecutivo (`OK-001`, `OK-002`...). Si se cambia manualmente (ej. `OK-015`), el sistema continúa desde ahí automáticamente.
* **Descarga en 1 Clic (JPG):** Listo para enviar al cliente por WhatsApp o imprimir.
* **Descuento Automático de Inventario:** Al emitir el recibo, las piezas vendidas se descuentan automáticamente del stock físico.

### 4. 👥 Directorio de Clientes Reales
* Sincronizado con la base de datos de clientes habituales e institucionales (*Sra. Herminia, Mónica Gutiérrez, Arlena Galván, Grupo 23*, etc.).
* Búsqueda por nombre, teléfono o dirección.
* Botón de vinculación rápida a la orden actual y chat directo por WhatsApp sin necesidad de agendar el contacto.

### 5. 📦 Inventario Físico y Reposición a Puntos KEY®
* **Modo "Hacer Inventario":** Auditoría física estante por estante, todo en 0 piezas por defecto, con botones `+1`, `+5`, `+10` y confirmación visual verde (`✅ ¡Contado: X pzas!`).
* **Sugerencias de Reposición:** Detecta automáticamente artículos agotados o con stock bajo ($\le 3$ piezas).
* **Valuación de Compra:** Calcula la inversión necesaria a **Costo Empleado**.
* **Pedido a Puntos KEY® por WhatsApp:** Exporta la lista de surtido lista para enviar al proveedor.

---

## 📱 Instalación en Celulares (PWA)

### iPhone / iPad
1. Abre [limpieza-okey.vercel.app](https://limpieza-okey.vercel.app/) en **Safari**.
2. Toca el botón **Compartir** (icono con flecha hacia arriba).
3. Selecciona **"Agregar al inicio"**.

### Android
1. Abre el enlace en **Google Chrome**.
2. Toca el menú de opciones (tres puntos) y presiona **"Instalar aplicación"**.

---

## 🛠️ Tecnologías y Estructura
* **Framework:** React 19 + Vite
* **Estilos:** Tailwind CSS v4 + Lucide React Icons
* **Generación de Recibos:** HTML5 Canvas API calibrado
* **PWA:** Web App Manifest + Service Worker para caché offline
* **Despliegue:** Vercel Continuous Deployment sincronizado con rama `main` en GitHub.
