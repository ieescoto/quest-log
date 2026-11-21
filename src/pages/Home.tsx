import { useEffect, useState, useContext } from "react";
import Navbar from "../components/Navbar";
import {ProgressBar} from "../components/ProgressBar";
import type {UserContextType} from "../interfaces/user";
import type {MissionContextType} from "../interfaces/missions";
import type {Context} from "../interfaces/context";
import { ContextData } from "../context/Context";
import { Link } from "react-router-dom";
import {RecentQuestCard} from "../components/RecentQuestCard"

export default function Home() {
  const context: Context = useContext<Context>(ContextData);
  const userData: UserContextType = context.user
  const missions: MissionContextType = context.mission 

  return (
    /* CONTENEDOR GENERAL: menú lateral + contenido de la página */
    <div className="min-h-screen bg-[#090b18] text-slate-100">

      <div className="flex min-h-screen">

        {/* MENÚ LATERAL */}
        <Navbar />

        {/* ÁREA PRINCIPAL: todo lo que aparece a la derecha del menú */}
        <main className="min-w-0 flex-1">

          {/* BARRA SUPERIOR: buscador y perfil del usuario */}
          <header className="sticky top-0 z-10 flex flex-wrap items-center justify-between gap-4 border-b border-white/10 bg-[#0b0d1b]/95 px-6 py-4 backdrop-blur-lg md:px-8">

            {/* Buscador visual: después puedes conectar el filtrado de misiones */}
            {/* <div className="flex min-w-0 flex-1 items-center gap-3 rounded-full border border-violet-300/30 bg-white/3 px-4 py-3 md:max-w-xl">
              <span className="text-lg text-violet-300">⌕</span>

              <input
                type="text"
                placeholder="Search quests..."
                className="w-full bg-transparent text-sm text-white outline-none placeholder:text-slate-500"
              />
            </div> */}

            {/* PERFIL DEL USUARIO: contenido estático de ejemplo */}
            <div className="flex items-center gap-3">
              {/* <button
                type="button"
                aria-label="Notificaciones"
                className="rounded-full p-2 text-xl text-slate-300 transition hover:bg-white/10"
              >
                ♧
              </button> */}

              <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-full border border-violet-300/60 bg-violet-600/30 text-xl">
                  {userData.data?.avatar}
                </div>

                <div className="hidden sm:block">
                  <p className="text-sm font-semibold text-white">
                    {userData.data?.username}
                  </p>
                  <p className="text-xs text-slate-400">Level {userData.data?.level}</p>
                </div>

                {/* <span className="text-slate-500">⌄</span> */}
              </div>
            </div>
          </header>

          {/* CONTENIDO DEL DASHBOARD */}
          <div className="space-y-8 p-5 md:p-8">

            {/* BANNER PRINCIPAL: mensaje de bienvenida y acceso a las misiones */}
            <section className="relative isolate overflow-hidden rounded-3xl border border-amber-300/40 bg-linear-to-r from-violet-950 via-[#30205b] to-slate-900 shadow-2xl shadow-violet-950/20">

              {/* Decoración ambiental: no contiene lógica */}
              <div className="pointer-events-none absolute -right-12 -top-24 -z-10 h-80 w-80 rounded-full bg-fuchsia-500/20 blur-3xl" />
              <div className="pointer-events-none absolute -bottom-32 right-1/3 -z-10 h-72 w-72 rounded-full bg-violet-500/20 blur-3xl" />

              <div className="grid items-center gap-6 p-7 md:grid-cols-[1.3fr_0.7fr] md:p-10">

                {/* TEXTO DE BIENVENIDA */}
                <div>
                  <p className="mb-3 text-xs font-bold uppercase tracking-[0.25em] text-amber-300">
                    Your story begins here
                  </p>

                  <h2 className="text-3xl font-black leading-tight tracking-tight md:text-5xl">
                    Welcome,
                    <span className="text-amber-300"> {userData.data?.username}!</span>
                  </h2>

                  <p className="mt-4 max-w-xl text-sm leading-7 text-slate-300 md:text-base">
                    Your next adventure awaits. Complete quests,
                    earn rewards, level up and become
                    a legend.
                  </p>

                  {/* BOTÓN VISUAL: conecta la navegación a Misiones después */}
                  <Link
                    to="/quests"
                    className="mt-6 inline-flex items-center gap-3 rounded-xl bg-linear-to-r from-amber-300 to-orange-400 px-5 py-3 font-bold text-slate-950 shadow-lg shadow-amber-950/20 transition hover:brightness-110"
                  >
                    See quests
                    <span aria-hidden="true">→</span>
                  </Link>
                </div>

                {/* ILUSTRACIÓN DECORATIVA: puedes sustituir el emoji por una imagen */}
                <div
                  aria-hidden="true"
                  className="hidden min-h-48 items-center justify-center md:flex"
                >
                  <div className="flex h-44 w-44 items-center justify-center rounded-full border border-amber-300/20 bg-slate-950/20 text-8xl shadow-inner shadow-violet-300/10">
                    🏰
                  </div>
                </div>
              </div>
            </section>

            {/* ESTADÍSTICAS DEL JUGADOR: valores provisionales */}
            <section>
              {/* Título de sección */}
              <div className="mb-4 flex items-center justify-between">
                <h2 className="text-lg font-bold text-white">
                  Your adventure summary
                </h2>

                <span className="text-xs text-slate-500">
                  Your statistics
                </span>
              </div>

              {/* Cuatro tarjetas de estadísticas */}
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">

                {/* ESTADÍSTICA: nivel y experiencia */}
                <article className="rounded-2xl border border-amber-300/30 bg-linear-to-br from-amber-400/10 to-slate-900 p-5">
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-slate-300">Level</span>
                    <span className="text-3xl">⭐</span>
                  </div>

                  <p className="mt-3 text-3xl font-black">{userData.data?.level}</p>

                  <ProgressBar design=" bg-amber-300" />

                  <p className="mt-2 text-right text-xs text-slate-400">
                    {userData.data?.xp} / {userData.data?.nextLevelXP} XP
                  </p>
                </article>

                {/* ESTADÍSTICA: monedas disponibles */}
                <article className="rounded-2xl border border-violet-400/30 bg-linear-to-br from-violet-500/10 to-slate-900 p-5">
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-slate-300">Coins</span>
                    <span className="text-3xl">💎</span>
                  </div>

                  <p className="mt-3 text-3xl font-black">{userData.data?.coins}</p>

                  <p className="mt-3 text-xs text-slate-500">
                    Your accumulated treasure
                  </p>
                </article>

                {/* ESTADÍSTICA: misiones pendientes */}
                <article className="rounded-2xl border border-orange-300/30 bg-linear-to-br from-orange-400/10 to-slate-900 p-5">
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-slate-300">Pending Quests</span>
                    <span className="text-3xl">🏆</span>
                  </div>

                  <p className="mt-3 text-3xl font-black">
                    {missions.data.filter(({status})=>status=="pending").length}
                  </p>

                  <p className="mt-3 text-xs text-slate-500">
                    Your next adventure awaits
                  </p>
                </article>

                {/* ESTADÍSTICA: misiones completadas */}
                <article className="rounded-2xl border border-emerald-400/30 bg-linear-to-br from-emerald-500/10 to-slate-900 p-5">
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-slate-300">
                      Completed Quests
                    </span>
                    <span className="text-3xl">✅</span>
                  </div>

                  <p className="mt-3 text-3xl font-black">{missions.data.filter(({status})=>status=="completed").length}</p>

                  <p className="mt-3 text-xs text-slate-500">
                    Your completed adventures
                  </p>
                </article>

              </div>
            </section>

            {/* ZONA INFERIOR: misiones a la izquierda, personaje a la derecha */}
            <section className="grid grid-cols-1 items-start gap-6 xl:grid-cols-[1.4fr_0.9fr]">

              {/* LISTA DE MISIONES DESTACADAS */}
              <div className="overflow-hidden rounded-2xl border border-white/10 bg-white/3">

                {/* CABECERA DE LA LISTA */}
                <div className="flex items-center justify-between border-b border-white/10 px-5 py-5">
                  <h2 className="text-lg font-bold">
                    <span className="mr-2 text-violet-300">✦</span>
                    Recent Quests
                  </h2>

                  {/* Enlace visual a la lista completa */}
                  <Link
                    to="/quests"
                    className="text-sm font-semibold text-violet-300 transition hover:text-violet-200"
                  >
                    See all →
                  </Link>
                </div>

                {missions.data.slice(-3).map(({id})=> <RecentQuestCard questID={id} />)}
              </div>

              {/* COLUMNA DERECHA: personaje y accesos rápidos */}
              <div className="space-y-6">

                {/* TARJETA DEL PERSONAJE */}
                <article className="overflow-hidden rounded-2xl border border-violet-300/20 bg-linear-to-br from-violet-950/50 to-slate-900">

                  <div className="border-b border-white/10 px-5 py-5">
                    <h2 className="text-lg font-bold">
                      <span className="mr-2 text-amber-300">♟</span>
                      Your Character
                    </h2>
                  </div>

                  <div className="flex flex-col items-center gap-5 p-6 sm:flex-row">

                    {/* AVATAR DECORATIVO: después puedes permitir que el usuario lo cambie */}
                    <div className="flex h-28 w-28 shrink-0 items-center justify-center rounded-full border-4 border-amber-300/70 bg-violet-600/20 text-6xl shadow-lg shadow-violet-950/40">
                      {userData.data?.avatar}
                    </div>

                    {/* INFORMACIÓN DE NIVEL Y PROGRESO */}
                    <div className="w-full flex-1">
                      <h3 className="text-xl font-bold">{userData.data.username}</h3>

                      <p className="mt-1 text-sm text-violet-300">
                        Level {userData.data?.level}
                      </p>

                      {/* Barra de experiencia provisional */}
                      {/* <div className="mt-4 h-3 overflow-hidden rounded-full border border-violet-300/20 bg-slate-950">
                        <div className="h-full w-0 rounded-full bg-linear-to-r from-violet-500 to-fuchsia-400" />
                      </div> */}

                      <ProgressBar design="bg-linear-to-r from-violet-500 to-fuchsia-400" />

                      <p className="mt-2 text-right text-xs text-slate-400">
                        {userData.data?.xp} / {userData.data?.nextLevelXP} XP
                      </p>

                      {/* <div className="mt-4 flex flex-wrap gap-4 text-sm">
                        <span className="text-rose-300">♥ 100 / 100</span>
                        <span className="text-cyan-300">ϟ 50 / 50</span>
                      </div> */}
                    </div>
                  </div>
                </article>

                {/* ACCIONES RÁPIDAS: solo enlaces visuales */}
                {/* <div>
                  <h2 className="mb-4 text-lg font-bold">
                    <span className="mr-2 text-amber-300">ϟ</span>
                    Acciones rápidas
                  </h2>

                  <div className="grid grid-cols-1 gap-3 sm:grid-cols-3 xl:grid-cols-1 2xl:grid-cols-3">

                    {/* Acceso a misiones //}
                    <a
                      href="#"
                      className="flex flex-col items-center justify-center gap-2 rounded-xl border border-violet-400/30 bg-violet-600/20 p-4 text-center transition hover:bg-violet-600/30"
                    >
                      <span className="text-2xl">📜</span>
                      <span className="text-sm font-semibold">Misiones</span>
                    </a>

                    {/* Acceso al progreso //}
                    <a
                      href="#"
                      className="flex flex-col items-center justify-center gap-2 rounded-xl border border-amber-300/30 bg-amber-500/10 p-4 text-center transition hover:bg-amber-500/20"
                    >
                      <span className="text-2xl">📊</span>
                      <span className="text-sm font-semibold">Progreso</span>
                    </a>

                    {/* Acceso al perfil //}
                    <a
                      href="#"
                      className="flex flex-col items-center justify-center gap-2 rounded-xl border border-violet-400/30 bg-violet-600/20 p-4 text-center transition hover:bg-violet-600/30"
                    >
                      <span className="text-2xl">⚙️</span>
                      <span className="text-sm font-semibold">Perfil</span>
                    </a>
                  </div>
                </div> */}
              </div>
            </section>

            {/* PIE DE PÁGINA */}
            <footer className="flex flex-wrap items-center justify-between gap-3 border-t border-white/10 pt-5 text-sm text-slate-500">
              <p>
                <span className="font-bold text-slate-300">⚔ QuestLog</span>
                <span className="mx-2">·</span>
                Your adventure, your way.
              </p>

              <p className="text-xs">
                Every quest matters.
              </p>
            </footer>

          </div>
        </main>
      </div>
    </div>
  );
}