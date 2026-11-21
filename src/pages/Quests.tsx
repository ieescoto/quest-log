import {useState, useContext, type ChangeEvent } from "react";
import type {Context} from "../interfaces/context";
import { ContextData} from "../context/Context";
import Navbar from "../components/Navbar";
import QuestModal from '../components/QuestModal'
import {QuestCards} from "../components/QuestCards"

export default function Quests() {
  const context: Context = useContext<Context>(ContextData);
  const [open, setOpen] = useState<boolean>(false)

  //Filtros
  const [searchMission, setSearchMission] = useState("")
  const [searchStatus, setSearchStatus] = useState("all")
  const [searchCategory, setSearchCategory] = useState("all")
  const [searchDifficulty, setSearchDifficulty] = useState("all")
  
  const missions = context.mission.data.filter(({title,category,difficulty,status})=>{
    const filterName = title.toLowerCase().includes(searchMission)
    const filterStatus = searchStatus === "all" || status.toLowerCase() === searchStatus
    const filterCategory = searchCategory === "all" || category.toLowerCase() === searchCategory
    const filterDifficulty = searchDifficulty === "all" || difficulty.toLowerCase() === searchDifficulty

    return filterName && filterStatus && filterCategory && filterDifficulty
  })

  function getSearchName(e: ChangeEvent<HTMLInputElement>){
    const searchMission = e.target.value.toLowerCase()
    setSearchMission(searchMission)
  }
  
  function getSearchStatus(e: ChangeEvent<HTMLSelectElement>){
    const searchStatus = e.target.value.toLowerCase()
    setSearchStatus(searchStatus)
  }
  
  function getSearchCategory(e: ChangeEvent<HTMLSelectElement>){
    const searchCategory = e.target.value.toLowerCase()
    setSearchCategory(searchCategory)
  }
  
  function getSearchDifficulty(e: ChangeEvent<HTMLSelectElement>){
    const searchDifficulty = e.target.value.toLowerCase()
    setSearchDifficulty(searchDifficulty)
  }

  return (

    /* CONTENEDOR GENERAL: menú lateral y contenido */
    <div className="min-h-screen bg-[#090b18] pb-[calc(68px+env(safe-area-inset-bottom))] text-slate-100 lg:pb-0">
      <div className="flex min-h-screen">

        {/* MENÚ LATERAL COMPARTIDO CON EL RESTO DE LA APLICACIÓN */}
        <Navbar />

        {/* CONTENIDO PRINCIPAL DE LA PÁGINA */}
        <main className="min-w-0 flex-1">

          {open && <QuestModal setOpen={setOpen}/>}

          {/* ENCABEZADO SUPERIOR */}
          <header className="border-b border-white/10 bg-[#0b0d1b]/80 px-5 py-6 md:px-8">
            <p className="mb-2 text-xs font-bold uppercase tracking-[0.25em] text-violet-300">
              Your adventure awaits
            </p>

            <div className="flex flex-wrap items-center justify-between gap-4">
              <div>
                <h1 className="text-3xl font-black tracking-tight md:text-4xl">
                  Quest Book
                </h1>

                <p className="mt-2 text-sm text-slate-400 md:text-base">
                  Each quest is an opportunity to grow and earn rewards.
                </p>
              </div>

              {/* BOTÓN VISUAL: tú implementarás la apertura del formulario */}
              <button
                type="button"
                className="inline-flex w-full items-center justify-center gap-2 rounded-xl bg-linear-to-r from-violet-500 to-purple-600 px-5 py-3 font-bold text-white shadow-lg shadow-violet-950/30 transition hover:brightness-110 sm:w-auto"
                onClick={()=> setOpen(true)}
              >
                <span className="text-xl">+</span>
                New Quest
              </button>
            </div>
          </header>

          {/* RESTO DEL CONTENIDO */}
          <div className="space-y-7 p-5 md:p-8">

            {/* RESUMEN: valores estáticos de ejemplo, luego los conectarás a tus datos */}
            <section className="grid grid-cols-1 gap-4 sm:grid-cols-3">

              {/* TOTAL DE MISIONES */}
              <article className="rounded-2xl border border-violet-400/25 bg-linear-to-br from-violet-500/10 to-slate-900 p-5">
                <div className="flex items-center justify-between">
                  <p className="text-sm text-slate-400">Total Quests</p>
                  <span className="text-2xl">📜</span>
                </div>

                <p className="mt-3 text-3xl font-black">{context.mission.data.length}</p>
                <p className="mt-1 text-xs text-slate-500">
                  All your adventures
                </p>
              </article>

              {/* MISIONES PENDIENTES */}
              <article className="rounded-2xl border border-amber-400/25 bg-linear-to-br from-amber-500/10 to-slate-900 p-5">
                <div className="flex items-center justify-between">
                  <p className="text-sm text-slate-400">Pending</p>
                  <span className="text-2xl">⚔️</span>
                </div>

                <p className="mt-3 text-3xl font-black">
                  {context.mission.data.filter(({status})=>status=="pending").length}
                </p>
                <p className="mt-1 text-xs text-slate-500">
                  Adventures to complete
                </p>
              </article>

              {/* MISIONES COMPLETADAS */}
              <article className="rounded-2xl border border-emerald-400/25 bg-linear-to-br from-emerald-500/10 to-slate-900 p-5">
                <div className="flex items-center justify-between">
                  <p className="text-sm text-slate-400">Completed</p>
                  <span className="text-2xl">🏆</span>
                </div>

                <p className="mt-3 text-3xl font-black">
                  {context.mission.data.filter(({status})=>status=="completed").length}
                </p>
                <p className="mt-1 text-xs text-slate-500">
                  Completed adventures
                </p>
              </article>
            </section>

            {/* BUSCADOR Y FILTROS */}
            <section className="rounded-2xl border border-white/10 bg-white/3 p-4 md:p-5">
              <div className="grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-4">

                {/* BUSCAR POR TÍTULO */}
                <div className="xl:col-span-1">
                  <label
                    htmlFor="quest-search"
                    className="mb-2 block text-sm font-semibold text-slate-300"
                  >
                    Search Quest
                  </label>

                  <div className="flex items-center gap-3 rounded-xl border border-white/10 bg-slate-950/70 px-3">
                    <span className="text-lg text-violet-300">⌕</span>

                    <input
                      id="quest-search"
                      type="text"
                      placeholder="Enter a title..."
                      className="min-w-0 flex-1 bg-transparent py-3 text-sm outline-none placeholder:text-slate-500"
                      onChange = {getSearchName}
                    />
                  </div>
                </div>

                {/* FILTRO POR ESTADO */}
                <div>
                  <label
                    htmlFor="quest-status"
                    className="mb-2 block text-sm font-semibold text-slate-300"
                  >
                    Status
                  </label>

                  <select
                    id="quest-status"
                    defaultValue="all"
                    className="w-full rounded-xl border border-white/10 bg-slate-950 px-3 py-3 text-sm text-slate-300 outline-none focus:border-violet-400"
                    onChange={getSearchStatus}
                  >
                    <option value="all">All statuses</option>
                    <option value="pending">Pending</option>
                    <option value="completed">Completed</option>
                  </select>
                </div>

                {/* FILTRO POR CATEGORÍA */}
                <div>
                  <label
                    htmlFor="quest-category"
                    className="mb-2 block text-sm font-semibold text-slate-300"
                  >
                    Category
                  </label>

                  <select
                    id="quest-category"
                    defaultValue="all"
                    className="w-full rounded-xl border border-white/10 bg-slate-950 px-3 py-3 text-sm text-slate-300 outline-none focus:border-violet-400"
                    onChange={getSearchCategory}
                  >
                    <option value="all">All categories</option>
                    <option value="study">Study</option>
                    <option value="adventure">Adventure</option>
                    <option value="combat">Combat</option>
                    <option value="exploration">Exploration</option>
                  </select>
                </div>

                {/* FILTRO POR DIFICULTAD */}
                <div>
                  <label
                    htmlFor="quest-difficulty"
                    className="mb-2 block text-sm font-semibold text-slate-300"
                  >
                    Difficulty
                  </label>

                  <select
                    id="quest-difficulty"
                    defaultValue="all"
                    className="w-full rounded-xl border border-white/10 bg-slate-950 px-3 py-3 text-sm text-slate-300 outline-none focus:border-violet-400"
                    onChange={getSearchDifficulty}
                  >
                    <option value="all">All difficulties</option>
                    <option value="easy">Easy</option>
                    <option value="medium">Medium</option>
                    <option value="hard">Hard</option>
                    <option value="epic">Epic</option>
                  </select>
                </div>
              </div>
            </section>

            {/* CABECERA DE LA LISTA DE MISIONES */}
            <section>
              <div className="mb-4 flex flex-wrap items-center justify-between gap-3">
                <div>
                  <h2 className="text-xl font-bold">Your quests</h2>
                  <p className="mt-1 text-sm text-slate-400">
                    Prepare for your next adventure.
                  </p>
                </div>

                {/* Indicador visual de la cantidad de resultados */}
                <span className="rounded-full border border-white/10 bg-white/5 px-3 py-2 text-xs text-slate-400">
                  {missions.length} quests
                </span>
              </div>

              {/* CUADRÍCULA DE TARJETAS */}
              <div className="grid grid-cols-1 gap-4 lg:grid-cols-2 2xl:grid-cols-3">

                {missions.map(({id})=>{
                  return <QuestCards key={id} currentQuestID={id}></QuestCards>
                })}

                {missions.length === 0 && (
                  <div className="col-span-full rounded-2xl border border-white/10 bg-linear-to-br from-slate-900 to-[#111225] p-5 text-center text-sm text-slate-400">
                    No quests found.
                  </div>
                )}

              </div>
            </section>

            {/* PIE DE PÁGINA */}
            <footer className="border-t border-white/10 pt-5 text-center text-xs text-slate-500">
              QuestLog · Each quest counts.
            </footer>

          </div>
        </main>
      </div>
    </div>
  );
}
