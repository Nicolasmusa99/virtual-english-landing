# Virtual English — Landing Page

Sitio estático en HTML + JSX (React 18 vía CDN). No requiere build step ni Node.

## Estructura

```
/
├── index.html          # Entry point, carga React + Babel + scripts
├── styles.css          # Sistema de diseño completo
├── hooks.jsx           # Hooks reusables (useReveal, useCountUp, etc.)
├── components.jsx      # Todos los componentes de la landing
├── app.jsx             # Composición raíz
└── README.md
```

## Características

- Single typeface: Libre Baskerville
- Scroll animations con IntersectionObserver
- Contador animado en sección Validación
- Pricing con detección de ubicación opcional (USD por defecto, ARS si el usuario en Argentina lo solicita)
- Floating WhatsApp con pulse animation
- Mobile responsive

## Cómo correrlo localmente

Simplemente abrí `index.html` en el navegador. O usá un servidor estático:

```bash
npx serve .
# o
python3 -m http.server 8000
```

## Deploy

### Opción 1 — Vercel (recomendado, free, deploy automático)

1. Subí el proyecto a GitHub:
   ```bash
   git init
   git add .
   git commit -m "Initial commit"
   git remote add origin https://github.com/Nicolasmusa99/virtual-english-landing.git
   git branch -M main
   git push -u origin main
   ```

2. Andá a [vercel.com](https://vercel.com), iniciá sesión con GitHub.
3. "Add New → Project" → seleccionar el repo `virtual-english-landing`.
4. Framework Preset: **Other** (Vercel detecta HTML estático automáticamente).
5. Click "Deploy".

Listo. URL en menos de 1 minuto. Cada push a `main` redeploya solo.

### Opción 2 — GitHub Pages

1. Subí a GitHub (mismos comandos de arriba).
2. Repo → Settings → Pages.
3. Source: `Deploy from a branch`, Branch: `main`, Folder: `/ (root)`.
4. Save. URL disponible en 1-2 min: `https://nicolasmusa99.github.io/virtual-english-landing/`

### Opción 3 — Netlify

1. Andá a [netlify.com](https://netlify.com).
2. "Add new site → Import existing project" → conectar GitHub → seleccionar el repo.
3. Build command: vacío. Publish directory: `.` (raíz).
4. Deploy.

## Contacto

- WhatsApp: +54 9 11 3071-3390
- Email: virtualito.english@gmail.com

## Notas técnicas

- React y Babel se cargan desde CDN. Para producción de alto volumen, conviene migrar a Vite + bundling (queda pendiente).
- La detección de país usa `navigator.geolocation` + API de OpenStreetMap (Nominatim), gratis y sin API key.
- El sitio funciona sin JavaScript de terceros, sin tracking, sin cookies.
