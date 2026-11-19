import { useContext } from "react";
import type { Context } from "../interfaces/context";
import { ContextData } from "../context/Context";
import { Link } from "react-router-dom";

export function QuestCards({ currentMissionId }: { currentMissionId: string }) {
  const data = useContext<Context>(ContextData).mission.data;
  const actualMission = data.find(({ id }) => id === currentMissionId);
  let borderHoverDesign = "";
  let iconDesign = "";
  let difficultyDesign = "";

  if (actualMission != undefined) {
    if (actualMission.difficulty == "easy") {
      borderHoverDesign ="hover:border-emerald-400/40 hover:shadow-emerald-950/10";
      iconDesign = "border-emerald-400/20 bg-emerald-500/10";
      difficultyDesign ="border-emerald-400/20 bg-emerald-400/10 text-emerald-300";
    } else if (actualMission.difficulty == "medium") {
      borderHoverDesign = "hover:border-amber-400/40 hover:shadow-amber-950/10";
      iconDesign = "border-amber-400/20 bg-amber-500/10";
      difficultyDesign = "border-amber-400/20 bg-amber-400/10 text-amber-300";
    } else if (actualMission.difficulty == "hard") {
      borderHoverDesign = "hover:border-rose-400/40 hover:shadow-rose-950/10";
      iconDesign = "border-rose-400/20 bg-rose-500/10";
      difficultyDesign = "border-rose-400/20 bg-rose-400/10 text-rose-300";
    } else {
      borderHoverDesign = "hover:border-purple-400/40 hover:shadow-purple-950/10";
      iconDesign = "border-purple-400/20 bg-purple-500/10";
      difficultyDesign = "border-purple-400/20 bg-purple-400/10 text-purple-300";
    }
  } else {
    return <h1>No hay Mision</h1>;
  }

  return (
    <article
      className={`group flex flex-col rounded-2xl border border-white/10 bg-linear-to-br from-slate-900 to-[#111225] p-5 transition hover:-translate-y-1 hover:shadow-xl ${borderHoverDesign}`}
    >
      <div className="mb-4 flex items-start justify-between gap-3">
        <div
          className={`flex h-12 w-12 items-center justify-center rounded-xl border ${iconDesign} text-2xl`}
        >
          🐉
        </div>

        <span
          className={`rounded-full border px-3 py-1 text-xs font-semibold ${difficultyDesign}`}
        >
          {actualMission.difficulty}
        </span>
      </div>

      <h3 className="text-lg font-bold text-white">
        {actualMission.title}
      </h3>

      <p className="mt-2 flex-1 text-sm leading-6 text-slate-400">
        {actualMission.description}
      </p>

      {/* METADATOS DE LA MISIÓN */}
      <div className="mt-4 flex flex-wrap gap-2 text-xs">
        <span className="rounded-lg bg-violet-500/10 px-2.5 py-1.5 text-violet-300">
          {actualMission.category}
        </span>

        <span className="rounded-lg bg-white/5 px-2.5 py-1.5 text-slate-400">
          {actualMission.deadline!=null ? actualMission.deadline :"No deadline"}
        </span>
      </div>

      {/* RECOMPENSAS: según las reglas definidas para QuestLog */}
      <div className="mt-4 flex items-center gap-4 border-t border-white/10 pt-4 text-sm">
        <span className="text-amber-300">✦ {actualMission.rewards.xp} XP</span>
        <span className="text-violet-300">◆ {actualMission.rewards.coins} coins</span>
      </div>

      {/* ESTADO Y ESPACIO PARA TUS ACCIONES */}
      <div className="mt-4 flex items-center justify-between gap-3">
        <span className="flex items-center gap-2 text-xs font-medium text-amber-300">
          <span className={actualMission.status=="pending" ? "h-2 w-2 rounded-full bg-amber-300" : "h-2 w-2 rounded-full bg-emerald-300"} />
          {actualMission.status}
        </span>

        {/* Tú conectarás esta acción con la lógica de la misión */}
        <Link
          to={`/quests/${actualMission.id}`}
          className="rounded-lg border border-violet-400/30 px-3 py-2 text-sm font-semibold text-violet-200 transition hover:bg-violet-500/15"
        >
          View details →
        </Link>
      </div>
    </article>
  );
}
