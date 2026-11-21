import { useContext } from "react";
import type { Context } from "../interfaces/context";
import { ContextData } from "../context/Context";
import { Link } from "react-router-dom";

const DIFFICULTY_DESIGN = {
  easy: {
    border: "border-emerald-300/20 bg-linear-to-br from-emerald-900",
    text: "text-emerald-300",
    icon : "🌱"
  },
  medium: {
    border: "border-amber-300/20 bg-linear-to-br from-amber-950",
    text: "text-amber-300",
    icon : "🌿"
  },
  hard: {
    border: "border-rose-300/20 bg-linear-to-br from-rose-950",
    text: "text-rose-300",
    icon : "🌋"
  },
  epic: {
    border: "border-purple-300/20 bg-linear-to-br from-purple-950",
    text: "text-purple-300",
    icon: "👑"
  },
};

interface RecentQuestCardProps {
  questID : string
}

export function RecentQuestCard({ questID }: RecentQuestCardProps) {
  const questData = useContext<Context>(ContextData).mission.data;
  const actualMission = questData.find(({ id }) => id === questID);

  if (actualMission === undefined) {
    return <h1>No hay Mision</h1>;
  }

  return (
    <Link to={`/quests/${actualMission.id}`}>
    <article className="m-3 flex flex-wrap items-center gap-4 rounded-xl border border-white/5 bg-slate-900/70 p-4 transition hover:border-violet-400/30">
      <div
        className={`flex h-16 w-16 shrink-0 items-center justify-center rounded-xl border ${DIFFICULTY_DESIGN[actualMission.difficulty].border} to-slate-800 text-3xl`}
      >
        {DIFFICULTY_DESIGN[actualMission.difficulty].icon}
      </div>
      <div className="min-w-0 flex-1">
        <h3 className="font-bold text-white">{actualMission.title}</h3>
        <p className="mt-1 text-sm text-slate-400">
          {actualMission.description}
        </p>
      </div>
      <span
        className={`rounded-full bg-emerald-400/10 px-3 py-1 text-xs font-semibold ${DIFFICULTY_DESIGN[actualMission.difficulty].text}`}
      >
        {actualMission.difficulty}
      </span>
      {/* Indicador visual: tú añadirás la navegación al detalle */}
      <span className="text-xl text-slate-500">›</span>
    </article>
    </Link>
  );
}
