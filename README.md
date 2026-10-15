# Saga Tech Management

Aplicaci?n de inventario de laptops con Vue, Pinia, Axios y PrimeVue (preset Aura).

Autor: Mateo Caldas Bravo

## Ejecuci?n

Instala las dependencias con npm install.
En una terminal ejecuta npm run server (puerto 3100).
En otra terminal ejecuta npm run dev.
Para compilar ejecuta npm run build.

## Configuraci?n

Copia .env.example como .env.local y configura VITE_LOGO_DEV_TOKEN con tu token p?blico de Logo.dev. Sin token se muestra el nombre de Falabella como alternativa.
VITE_INVENTORY_API_URL permite cambiar la direcci?n del servidor local.

## Rutas

- /home: tarjetas de secciones y capacidad disponible.
- /laptop/items/new: registro de laptops usando el cat?logo de DummyJSON.
- /: redirecci?n a /home.
- Otras rutas: p?gina no encontrada.

El precio se muestra en USD, la moneda de los valores del cat?logo. La fecha se registra autom?ticamente en formato ISO.
Las capas domain, application, infrastructure y presentation siguen la organizaci?n de la plantilla base.
