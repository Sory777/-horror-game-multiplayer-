# La Casa Sin Luz 🔦💀

Juego de terror para navegador, jugable **solo** o **en equipo**. Explora un
caserón generado proceduralmente, iluminado solo por tu linterna, recoge las
llaves y escapa antes de que un monstruo te atrape o tu cordura se apague.

Todo el sonido (drone ambiental, susurros, pasos, latidos y los gritos de los
sustos) se genera en tiempo real con Web Audio API — no hay archivos de audio
externos. Incluye sustos repentinos aleatorios además de los que provoca el
monstruo al alcanzarte.

Este proyecto es independiente: no comparte código ni base de datos con
ninguna otra aplicación.

## Correrlo en local

```bash
npm install
npm run dev
```

Abre la URL que imprime Vite (normalmente `http://localhost:5173`). El modo
**solo** funciona sin ninguna configuración adicional.

## Modo en equipo (multijugador)

El modo en equipo usa [Supabase Realtime](https://supabase.com/docs/guides/realtime)
(presence + broadcast) para sincronizar sala, posiciones, llaves recolectadas
y la posición del monstruo entre jugadores. **No requiere crear ninguna
tabla** en la base de datos.

1. Crea un proyecto en [supabase.com](https://supabase.com) dedicado solo a
   este juego (recomendado: no reutilices el de otra app).
2. Copia `.env.example` a `.env` y llena los valores con la URL y la
   `anon key` de ese proyecto (Project Settings → API):
   ```bash
   cp .env.example .env
   ```
3. Reinicia `npm run dev`.

Sin estas variables configuradas, los botones "Crear sala" / "Unirse" quedan
deshabilitados y el juego lo avisa en el menú; el modo solo sigue funcionando
igual.

## Scripts

- `npm run dev` — servidor de desarrollo
- `npm run build` — build de producción a `dist/`
- `npm run preview` — sirve el build de producción localmente
- `npm run typecheck` — chequeo de tipos con TypeScript
- `npm run lint` — ESLint

## Despliegue

Es una app estática (Vite + React), así que se puede desplegar en cualquier
hosting de sitios estáticos (Cloudflare Pages/Workers, Vercel, Netlify,
GitHub Pages, etc.). Solo asegúrate de configurar las variables de entorno
`VITE_SUPABASE_URL` y `VITE_SUPABASE_ANON_KEY` en la plataforma elegida si
quieres habilitar el modo en equipo.

## Estructura

```
src/
  lib/horrorGame/   # generación del laberinto, motor de audio, motor de
                     # movimiento y capa de sincronización multijugador
  components/       # overlay de susto (jumpscare) y sistema de toasts
  pages/            # pantalla única del juego (menú, sala, partida)
```
