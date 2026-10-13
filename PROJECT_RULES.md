# 🧼 Reglas del Proyecto y Negocio - Limpieza OKEY

Este documento establece las directrices fundamentales, la arquitectura técnica y las reglas del negocio para el desarrollo de la aplicación web de **Limpieza OKEY**.

---

## 1. 🎯 Objetivo del Proyecto

Construir una aplicación web moderna, ágil, intuitiva y 100% responsiva (optimizada para dispositivos móviles y computadoras de escritorio) diseñada para agilizar el proceso comercial de **Limpieza OKEY**:
- Levantamiento de cotizaciones rápidas en campo y tienda.
- Gestión ágil de pedidos y carritos de compra.
- Emisión inmediata y profesional de recibos digitales listos para enviar por WhatsApp.

---

## 2. 💻 Stack Tecnológico

- **Entorno y Bundler:** [Vite](https://vite.dev/) (Rápido, moderno y ligero).
- **Framework UI:** [React](https://react.dev/) (Componentes funcionales, hooks personalizados).
- **Estilos:** [Tailwind CSS](https://tailwindcss.com/) (Diseño utility-first responsivo y estética limpia).
- **Iconografía:** [Lucide React](https://lucide.dev/) (Iconos nítidos, consistentes y modernos).
- **Almacenamiento Local (Persistencia inicial):** `localStorage` para persistencia de datos (clientes, catálogo, cotizaciones/recibos generados) sin dependencias obligatorias de backend inicial.

---

## 3. 🧩 Módulos Principales y Reglas de Negocio

### 3.1. Catálogo de Paquetes y Productos
- **Estructura de Artículos:**
  - Código / SKU del producto o paquete.
  - Nombre descriptivo y categoría (ej. Paquetes de Limpieza, Detergentes, Desinfectantes, Accesorios).
  - Costo base y Precio de venta al público.
- **Cálculo de Margen:**
  - Cálculo automático del margen de ganancia por producto y paquete:
    $$\text{Margen (\%)} = \left(\frac{\text{Precio Venta} - \text{Costo}}{\text{Precio Venta}}\right) \times 100$$
    $$\text{Ganancia (\$) } = \text{Precio Venta} - \text{Costo}$$
- **Regalos Sugeridos e Incentivos:**
  - Configuración y visualización de artículos promocionales o regalos sugeridos al adquirir ciertos paquetes o llegar a metas de compra (ej. microfibra de regalo, atomizador de cortesía).

### 3.2. Cotizador / Carrito de Compras
- **Cálculo Financiero Dinámico:**
  - **Subtotal:** Suma de productos y cantidades seleccionadas.
  - **Anticipo:** Monto o porcentaje abonado por el cliente.
  - **Saldo Pendiente:** $\text{Saldo} = \text{Total} - \text{Anticipo}$.
- **Alerta de Envío Gratis:**
  - Umbral: **\$1,500 MXN**.
  - Si el subtotal es menor a \$1,500 MXN: mostrar barra de progreso visual indicando cuánto falta para obtener envío gratis (ej. *"¡Agrega \$350 más para obtener Envío Gratis!"*).
  - Si el subtotal es igual o mayor a \$1,500 MXN: mostrar badge destacado de **"¡Felicidades! Tienes Envío Gratis activado"**.

### 3.3. Gestión de Clientes
- **Búsqueda Ultrarrápida:**
  - Búsqueda en tiempo real por **Nombre** o número de **WhatsApp / Teléfono**.
- **Autocompletado de Información:**
  - Selección de cliente existente para rellenar automáticamente sus datos de contacto, dirección de entrega, notas especiales y referencias.
- **Captura Rápida de Nuevos Clientes:**
  - Modal o formulario exprés para registrar clientes sobre la marcha sin interrumpir el flujo de cotización.

### 3.4. Generador de Recibos y Órdenes
- **Folio Consecutivo:**
  - Nomenclatura oficial con formato tipo `OK-001`, `OK-002`, etc.
- **Desglose Claro de Pago:**
  - Lista de productos con cantidades y precios unitarios.
  - Subtotal, costo de envío (o gratis), descuento si aplica.
  - Monto total.
  - Anticipo recibido y Saldo a liquidar contra entrega.
- **Datos Bancarios Oficiales para Transferencia (BBVA):**
  - Banco: **BBVA**
  - Beneficiario: *Limpieza OKEY*
  - CLABE Interbancaria y/o Número de Cuenta (configurables).
- **Acción Rápida de Envío por WhatsApp:**
  - Botón directo que genera el enlace `https://wa.me/<telefono>?text=<mensaje_formateado>` con un mensaje estructurado y limpio:
    - Saludo personalizado con el nombre del cliente.
    - Folio y resumen de la compra.
    - Totales, anticipo recibido y saldo pendiente.
    - Datos de transferencia BBVA.
    - Opción de vista o descarga del recibo digital.

---

## 4. 🎨 Lineamientos de UI / UX

- **Mobile-First y Responsividad:**
  - La interfaz debe funcionar de manera impecable en smartphones para el personal de reparto y ventas de campo, así como en laptops/desktops en mostrador.
- **Paleta de Colores Limpieza OKEY:**
  - Azules y turquesas/aguamarina (sensación de frescura, limpieza y profesionalismo).
  - Tonos esmeralda / verdes para indicadores de éxito y WhatsApp.
  - Alertas ámbar para saldo pendiente y márgenes estrechos.
- **Feedback Inmediato:**
  - Toasts / notificaciones al agregar al carrito, copiar datos bancarios o generar el recibo.

---

## 5. 🚀 Flujo de Desarrollo

1. **Configuración Base:** Vite + React + Tailwind CSS + Lucide Icons.
2. **Estado Global / Hooks:** Manejo predecible de carrito, catálogo de productos, listado de clientes y recibos.
3. **Componentes Modulares:**
   - `Navbar` / Menú de navegación móvil y escritorio.
   - `CatalogView` / Tarjetas de productos y paquetes con badges de regalo y margen.
   - `CartQuoterView` / Carrito, cálculo de anticipo, saldo y barra de envío gratis.
   - `CustomerModal` / Búsqueda y selección de clientes.
   - `ReceiptModal` / Vista previa de recibo con folio, datos BBVA y botón WhatsApp.
