import {NavLink} from 'react-router-dom'

export default function Navbar() {
  return (
    /* NAVEGACIÓN LATERAL: ocupa el lado izquierdo de la aplicación */
    <aside className="flex min-h-screen w-64 shrink-0 flex-col border-r border-violet-400/20 bg-slate-950 text-slate-200">

      {/* LOGO Y NOMBRE DE LA APLICACIÓN */}
      <div className="flex items-center justify-center gap-3 border-b border-white/10 px-6 py-7">
        <span className="text-4xl">⚔️</span>

        <h1 className="text-2xl font-black tracking-tight text-white">
          Quest<span className="text-amber-400">Log</span>
        </h1>
      </div>

      {/* MENÚ PRINCIPAL: conecta estos enlaces con React Router más adelante */}
      <nav className="flex-1 space-y-2 px-4 py-7">
        {/* Enlace activo: página principal */}
        <NavLink
          to="/"
          className={({isActive})=>
            isActive ? "flex items-center gap-4 rounded-xl border border-violet-400/30 bg-violet-600/30 px-4 py-3 font-semibold text-white shadow-lg shadow-violet-950/20 transition hover:bg-violet-600/40" : "flex items-center gap-4 rounded-xl px-4 py-3 transition hover:bg-white/5 hover:text-white"
          }
        >
          <span className="text-xl">⌂</span>
          <span>Home</span>
        </NavLink>

        {/* Página de misiones */}
        <NavLink
          to="/quests"
          className={({isActive})=>
            isActive ? "flex items-center gap-4 rounded-xl border border-violet-400/30 bg-violet-600/30 px-4 py-3 font-semibold text-white shadow-lg shadow-violet-950/20 transition hover:bg-violet-600/40" : "flex items-center gap-4 rounded-xl px-4 py-3 transition hover:bg-white/5 hover:text-white"
          }
        >
          <span className="text-xl">☑</span>
          <span>Quests</span>
        </NavLink>

        {/* Colección de personajes */}
        {/* <NavLink
          to="/characters"
          className={({isActive})=>
            isActive ? "flex items-center gap-4 rounded-xl border border-violet-400/30 bg-violet-600/30 px-4 py-3 font-semibold text-white shadow-lg shadow-violet-950/20 transition hover:bg-violet-600/40" : "flex items-center gap-4 rounded-xl px-4 py-3 transition hover:bg-white/5 hover:text-white"
          }
        >
          <span className="text-xl">♟</span>
          <span>Characters</span>
        </NavLink>
 */}
        {/* Estadísticas y progreso: puedes conectar esta opción a tu página de progreso */}
        {/* <NavLink
          to="/progress"
          className={({isActive})=>
            isActive ? "flex items-center gap-4 rounded-xl border border-violet-400/30 bg-violet-600/30 px-4 py-3 font-semibold text-white shadow-lg shadow-violet-950/20 transition hover:bg-violet-600/40" : "flex items-center gap-4 rounded-xl px-4 py-3 transition hover:bg-white/5 hover:text-white"
          }
        >
          <span className="text-xl">▥</span>
          <span>Progreso</span>
        </NavLink> */}

        {/* Perfil y configuración */}
        <NavLink
          to="/profile"
          className={({isActive})=>
            isActive ? "flex items-center gap-4 rounded-xl border border-violet-400/30 bg-violet-600/30 px-4 py-3 font-semibold text-white shadow-lg shadow-violet-950/20 transition hover:bg-violet-600/40" : "flex items-center gap-4 rounded-xl px-4 py-3 transition hover:bg-white/5 hover:text-white"
          }
        >
          <span className="text-xl">⚙</span>
          <span>My Profile</span>
        </NavLink>
      </nav>

      {/* PANEL INFERIOR DECORATIVO: no tiene funcionalidad por ahora */}
      <div className="m-4 rounded-2xl border border-violet-400/20 bg-linear-to-br from-violet-950/80 to-slate-900 p-4">
        <p className="text-sm font-bold text-amber-300">
          ✨ Your adventure begins
        </p>

        <p className="mt-2 text-xs leading-5 text-slate-400">
          Complete quests, earn rewards and become a legend.
        </p>
      </div>

      {/* PIE DEL MENÚ LATERAL */}
      <div className="border-t border-white/10 px-6 py-4 text-xs text-slate-500">
        QuestLog · Your adventure, your way
      </div>
    </aside>
  );
}
