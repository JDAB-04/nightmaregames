Nightmare Games 

Tecnologías
- Next.js(https://nextjs.org/)
- TypeScript (https://www.typescriptlang.org/)
- Lucide React (https://lucide.dev/) — iconos
- FreeToGame API (https://www.freetogame.com/api-doc) — datos de juegos

Requisitos 
- Node.js 18 o superior
- npm
  
 Pasos
1. Clonar el repositorio
git clone https://github.com/tu-usuario/nightmare-games.git


2. Entrar a la carpeta
cd nightmare-games


3. Instalar las dependencias
npm install


4. Iniciar el servidor 
npm run dev

5. Abrir el navegador en
http://localhost:3000

Estructura del proyecto

app/
├── layout.tsx          → estructura base, navbar y footer
├── page.tsx            → página de inicio
├── not-found.tsx       → página 404
├── catalog/
│   └── page.tsx        → catálogo con filtros por categoría
└── games/
    └── [id]/
        └── page.tsx    → detalle de cada juego

components/
├── Navbar.tsx
├── Hero.tsx
└── Footer.tsx

lib/
└── api.ts              → funciones de conexión a la API

types/
└── game.ts             → tipos TypeScript


